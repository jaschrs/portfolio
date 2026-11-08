"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Cloud, Clouds, Sky } from "@react-three/drei";
import * as THREE from "three";
import type { Sky as SkyImpl } from "three-stdlib";
import Jet from "./Jet";
import { measureAnchors, pageProgress } from "./flightPath";
import { flight } from "./flightState";

const CAMERA_Z = 12;
const FOV = 35;
// The camera tilts up so the deep-blue upper sky fills the frame instead of
// the pale horizon; scene content is counter-rotated to stay level.
const TILT = 0.6;

const MIDDAY = new THREE.Color("#ffffff");
const GOLDEN = new THREE.Color("#ffb46b");
// Over-bright so clouds read white after the sky's low tone-mapping exposure.
const CLOUD_COLOR = new THREE.Color(2.2, 2.2, 2.3);

/** Soft cloud puff texture, generated so nothing is fetched from a CDN. */
function useCloudTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d")!;
    const puffs: [number, number, number][] = [
      [128, 140, 90], [80, 150, 60], [176, 150, 62], [110, 105, 58], [150, 110, 55],
    ];
    for (const [x, y, r] of puffs) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(255,255,255,0.9)");
      g.addColorStop(0.6, "rgba(255,255,255,0.35)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 256);
    }
    return c.toDataURL();
  }, []);
}

function Scene() {
  const { size } = useThree();
  const sky = useRef<SkyImpl>(null);
  const sun = useRef<THREE.DirectionalLight>(null);
  const clouds = useRef<THREE.Group>(null);
  const cloudTexture = useCloudTexture();
  const sunPos = useMemo(() => new THREE.Vector3(), []);
  const tint = useMemo(() => new THREE.Color(), []);

  // Visible world size at the jet's plane (distance CAMERA_Z from the camera).
  const vh = 2 * CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(FOV / 2));
  const vw = vh * (size.width / size.height);
  useEffect(() => {
    flight.vw = vw;
    flight.vh = vh;
  }, [vw, vh]);

  useFrame(() => {
    flight.y = window.scrollY;
    const p = flight.anchors.length ? pageProgress(flight.y, flight.anchors) : 0;

    // Sun sinks from midday to golden hour over the length of the page.
    const elevation = THREE.MathUtils.lerp(40, 3, p);
    sunPos.setFromSphericalCoords(1, THREE.MathUtils.degToRad(90 - elevation), THREE.MathUtils.degToRad(30));
    const u = sky.current?.material.uniforms;
    if (u) {
      u.sunPosition.value.copy(sunPos);
      u.turbidity.value = THREE.MathUtils.lerp(1.2, 8, p);
      u.rayleigh.value = THREE.MathUtils.lerp(2, 3, p);
    }
    if (sun.current) {
      sun.current.position.copy(sunPos).multiplyScalar(50);
      sun.current.color.copy(tint.copy(MIDDAY).lerp(GOLDEN, p));
      sun.current.intensity = THREE.MathUtils.lerp(6, 4.5, p);
    }
    // Clouds drift up slower than the page for a sense of depth.
    if (clouds.current) clouds.current.position.y = (flight.y / window.innerHeight) * 2.2;
  });

  return (
    <>
      <Sky ref={sky} distance={1000} mieCoefficient={0.003} mieDirectionalG={0.8} />
      <hemisphereLight args={["#cfe3ff", "#8a7a66", 2.2]} />
      <directionalLight ref={sun} intensity={6} />

      {/* Level "camera space" rig: undo the tilt for everything but the sky. */}
      <group position={[0, 0, CAMERA_Z]} rotation={[TILT, 0, 0]}>
        <group position={[0, 0, -CAMERA_Z]}>
          <Jet />
          <group ref={clouds}>
            <Clouds material={THREE.MeshBasicMaterial} texture={cloudTexture} limit={120}>
              <Cloud seed={1} position={[-28, -6, -60]} bounds={[18, 3, 4]} volume={14} opacity={0.55} speed={0.05} color={CLOUD_COLOR} />
              <Cloud seed={2} position={[30, -14, -70]} bounds={[22, 4, 4]} volume={16} opacity={0.55} speed={0.05} color={CLOUD_COLOR} />
              <Cloud seed={3} position={[4, -26, -55]} bounds={[20, 3, 4]} volume={12} opacity={0.55} speed={0.05} color={CLOUD_COLOR} />
              <Cloud seed={4} position={[-18, -40, -65]} bounds={[24, 4, 4]} volume={16} opacity={0.55} speed={0.05} color={CLOUD_COLOR} />
              <Cloud seed={5} position={[22, -52, -60]} bounds={[18, 3, 4]} volume={14} opacity={0.55} speed={0.05} color={CLOUD_COLOR} />
              <Cloud seed={6} position={[-6, -66, -70]} bounds={[26, 4, 4]} volume={18} opacity={0.55} speed={0.05} color={CLOUD_COLOR} />
            </Clouds>
          </group>
        </group>
      </group>
    </>
  );
}

export default function SkyScene() {
  // Re-measure section anchors whenever layout changes (resize, accordions, fonts).
  useEffect(() => {
    const measure = () => {
      flight.anchors = measureAnchors();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, CAMERA_Z], fov: FOV, near: 0.1, far: 2000, rotation: [TILT, 0, 0] }}
        gl={{ antialias: true, powerPreference: "high-performance", toneMappingExposure: 0.42 }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
