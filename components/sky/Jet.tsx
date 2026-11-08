"use client";

import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { profile } from "@/lib/data";
import PlaceholderJet from "./PlaceholderJet";
import { poseAt, REST } from "./flightPath";
import { flight } from "./flightState";

// Every model is normalized so its longest axis is this many units long.
const MODEL_LENGTH = 4;
const INTRO_SECONDS = 2.6;

/** Centers `object`, applies the configured rotation and scales it to MODEL_LENGTH. */
function useNormalized(object: THREE.Object3D, rotationDeg: readonly [number, number, number]) {
  return useMemo(() => {
    const inner = object.clone(true);
    inner.rotation.set(...(rotationDeg.map(THREE.MathUtils.degToRad) as [number, number, number]));
    const wrapper = new THREE.Group();
    wrapper.add(inner);
    wrapper.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(wrapper);
    const size = box.getSize(new THREE.Vector3());
    inner.position.sub(box.getCenter(new THREE.Vector3()));
    wrapper.scale.setScalar(MODEL_LENGTH / Math.max(size.x, size.y, size.z, 1e-6));
    return wrapper;
  }, [object, rotationDeg]);
}

function GltfJet({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const normalized = useNormalized(scene, profile.jet.rotation);
  return <primitive object={normalized} />;
}

/** Falls back to the placeholder if the model file is missing or broken. */
class ModelBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <PlaceholderJet /> : this.props.children;
  }
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/** Whether the configured model file exists, so a missing file never throws. */
function useModelAvailable(url: string) {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    if (!url) return;
    let alive = true;
    fetch(url, { method: "HEAD" })
      .then((r) => alive && setAvailable(r.ok))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [url]);
  return available;
}

export default function Jet() {
  const rig = useRef<THREE.Group>(null);
  const hasModel = useModelAvailable(profile.jet.model);
  const start = useRef<number | null>(null);
  const reduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useFrame((state, delta) => {
    const g = rig.current;
    if (!g) return;

    const { vw, vh } = flight;
    const pose = flight.anchors.length ? poseAt(flight.y, flight.anchors) : REST;
    // Portrait screens get a relatively bigger jet so it still reads as the hero.
    const base = Math.min(vw * (vw < vh ? 0.55 : 0.36), vh * 0.75) / MODEL_LENGTH;
    const t = state.clock.elapsedTime;

    // One-time fly-in from off-screen right.
    if (start.current === null) start.current = t;
    const intro = reduced ? 1 : easeOutCubic(Math.min(1, (t - start.current) / INTRO_SECONDS));
    const away = 1 - intro;

    const bob = reduced ? 0 : Math.sin(t * 1.1) * 0.05;
    // On portrait screens, keep the path nearer the center and above the text.
    const portrait = vw < vh;
    const px = portrait ? pose.pos[0] * 0.35 : pose.pos[0];
    const py = portrait ? pose.pos[1] * 0.8 + 0.3 : pose.pos[1];
    const x = (px * vw) / 2 + away * vw * 0.95;
    const y = (py * vh) / 2 + away * vh * 0.12 + bob;
    const z = pose.pos[2] - away * 2;
    const roll = pose.rot[0] + away * 0.8 + (reduced ? 0 : Math.sin(t * 0.7) * 0.03);
    const yaw = pose.rot[1] - away * 0.25;
    const pitch = pose.rot[2];
    const scale = pose.scale * base;

    if (reduced || g.userData.snapped !== true) {
      g.position.set(x, y, z);
      g.rotation.set(roll, yaw, pitch, "YZX");
      g.scale.setScalar(scale);
      g.userData.snapped = !reduced;
      return;
    }
    // Damped follow gives the scroll-scrubbed motion its smooth, weighty feel.
    const k = 5;
    const d = THREE.MathUtils.damp;
    g.position.set(d(g.position.x, x, k, delta), d(g.position.y, y, k, delta), d(g.position.z, z, k, delta));
    g.rotation.set(
      d(g.rotation.x, roll, k, delta),
      d(g.rotation.y, yaw, k, delta),
      d(g.rotation.z, pitch, k, delta),
      "YZX",
    );
    g.scale.setScalar(d(g.scale.x, scale, k, delta));
  });

  return (
    <group ref={rig}>
      {hasModel ? (
        <ModelBoundary>
          <Suspense fallback={null}>
            <GltfJet url={profile.jet.model} />
          </Suspense>
        </ModelBoundary>
      ) : (
        <PlaceholderJet />
      )}
    </group>
  );
}
