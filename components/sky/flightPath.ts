// Scroll-driven flight path for the jet.
//
// Keyframes are anchored to the page's sections, so each maneuver lines up
// with the content it accompanies. `at: [section, t]` means "t of the way
// from the top of `section` to the top of the next one".
//
// Pose units:
//   pos   [x, y, z] — x/y as fractions of half the visible width/height
//                     (+1 = right/top edge), z in world units (+ = closer)
//   rot   [roll, yaw, pitch] in radians; the jet's nose points −X at 0,
//                     negative pitch = nose up
//   scale multiplier on the base jet size

export const SECTION_IDS = ["top", "about", "experience", "projects", "skills", "contact"] as const;

export type Pose = { pos: [number, number, number]; rot: [number, number, number]; scale: number };
type Keyframe = Pose & { at: [number, number] };

const TAU = Math.PI * 2;

export const REST: Pose = { pos: [0.5, 0.02, 0], rot: [0.18, 0.5, 0.04], scale: 1 };

const KEYFRAMES: Keyframe[] = [
  // Hero: parked beside the name.
  { at: [0, 0], ...REST },
  // Banks left and closes in as the hero scrolls away.
  { at: [0, 0.65], pos: [0.12, -0.12, 1.4], rot: [-0.55, 0.25, -0.05], scale: 1.1 },
  // About: sweeps behind the cards on the left.
  { at: [1, 0.5], pos: [-0.6, -0.05, 0.4], rot: [-0.35, 0.65, 0], scale: 1.05 },
  // Experience: turns around and recedes, heading right beside the timeline.
  { at: [2, 0.15], pos: [-0.25, 0.25, -6], rot: [0.45, -2.5, 0.05], scale: 1 },
  { at: [2, 0.85], pos: [0.62, 0.22, -8], rot: [0.25, -2.85, 0], scale: 1 },
  // Projects: comes back around, then a full barrel roll right-to-left.
  { at: [3, 0.1], pos: [0.78, 0.05, -1.2], rot: [0.5, 0.3, 0], scale: 0.95 },
  { at: [3, 0.9], pos: [-0.78, 0.0, -1.2], rot: [0.5 + TAU, 0.3, 0], scale: 0.95 },
  // Skills: pitches up and climbs away.
  { at: [4, 0.2], pos: [-0.35, -0.15, 0], rot: [TAU, 0.2, -0.55], scale: 1 },
  { at: [4, 0.9], pos: [0.15, 0.95, -6], rot: [TAU, 0.2, -0.95], scale: 0.85 },
  // Contact: returns and settles beside the closing heading at golden hour.
  { at: [5, 0], pos: [0.85, 0.45, -3], rot: [TAU + 0.35, 0.55, 0], scale: 0.9 },
  { at: [6, 0], pos: [0.5, 0.1, 0], rot: [TAU + 0.18, 0.5, 0.04], scale: 1 },
];

const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Scroll offsets (px) of each section's top, plus the max scroll as a final
 * anchor. Anchors past the max scroll are clamped so the path always completes.
 */
export function measureAnchors(): number[] {
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const anchors = SECTION_IDS.map((id) => {
    const el = document.getElementById(id);
    return el ? Math.min(max, el.getBoundingClientRect().top + window.scrollY) : 0;
  });
  anchors.push(max);
  // Keep anchors monotonic even if a section is missing or clamped.
  for (let i = 1; i < anchors.length; i++) anchors[i] = Math.max(anchors[i], anchors[i - 1]);
  return anchors;
}

/** Overall 0..1 progress through the page — used for the sun's arc. */
export function pageProgress(scroll: number, anchors: number[]) {
  return Math.min(1, Math.max(0, scroll / anchors[anchors.length - 1]));
}

export function poseAt(scroll: number, anchors: number[]): Pose {
  const offsetOf = ([section, t]: [number, number]) => {
    const a = anchors[section];
    const b = anchors[Math.min(section + 1, anchors.length - 1)];
    return lerp(a, b, t);
  };

  let i = 0;
  while (i < KEYFRAMES.length - 2 && scroll > offsetOf(KEYFRAMES[i + 1].at)) i++;
  const from = KEYFRAMES[i];
  const to = KEYFRAMES[i + 1];
  const a = offsetOf(from.at);
  const b = offsetOf(to.at);
  const t = smooth(Math.min(1, Math.max(0, b > a ? (scroll - a) / (b - a) : 1)));

  return {
    pos: [lerp(from.pos[0], to.pos[0], t), lerp(from.pos[1], to.pos[1], t), lerp(from.pos[2], to.pos[2], t)],
    rot: [lerp(from.rot[0], to.rot[0], t), lerp(from.rot[1], to.rot[1], t), lerp(from.rot[2], to.rot[2], t)],
    scale: lerp(from.scale, to.scale, t),
  };
}
