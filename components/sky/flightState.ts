// Mutable per-frame state shared by the sky scene and the jet. Kept outside
// React on purpose: it's written every animation frame and never rendered.
export const flight = {
  /** window.scrollY, sampled each frame */
  y: 0,
  /** section offsets from measureAnchors() */
  anchors: [] as number[],
  /** visible world width/height at the jet's plane */
  vw: 1,
  vh: 1,
};
