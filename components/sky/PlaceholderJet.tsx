"use client";

import { useMemo } from "react";
import * as THREE from "three";

// A simple F-16-like silhouette built from primitives. Used until the real
// model is dropped into /public/models, and as a fallback if it fails to load.
// Nose points −X, span along Z, up is +Y.

function slab(points: [number, number][], depth: number) {
  const shape = new THREE.Shape(points.map(([x, y]) => new THREE.Vector2(x, y)));
  const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
  geo.translate(0, 0, -depth / 2);
  return geo;
}

export default function PlaceholderJet() {
  const geo = useMemo(
    () => ({
      // Cropped-delta main wing, drawn as the right half in the XY plane.
      wing: slab([[-0.55, 0], [0.85, 0], [0.75, 1.55], [0.45, 1.55]], 0.05),
      stab: slab([[1.25, 0], [1.9, 0], [1.85, 0.85], [1.65, 0.85]], 0.04),
      fin: slab([[0.85, 0], [1.75, 0], [1.85, 1.15], [1.55, 1.15]], 0.05),
    }),
    [],
  );

  const skin = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#9aa2ab", metalness: 0.05, roughness: 0.7, flatShading: true, side: THREE.DoubleSide }),
    [],
  );
  const dark = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#4a5059", metalness: 0.05, roughness: 0.7, flatShading: true }),
    [],
  );
  const glass = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#b8943c", metalness: 0.1, roughness: 0.25 }),
    [],
  );

  return (
    <group>
      {/* fuselage */}
      <mesh material={skin} rotation={[0, 0, Math.PI / 2]} position={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.27, 0.3, 3.3, 10]} />
      </mesh>
      {/* nose cone */}
      <mesh material={skin} rotation={[0, 0, Math.PI / 2]} position={[-2.0, 0, 0]}>
        <coneGeometry args={[0.3, 1.1, 10]} />
      </mesh>
      {/* bubble canopy (gold-tinted, like the real thing) */}
      <mesh material={glass} position={[-1.15, 0.26, 0]} scale={[0.75, 0.26, 0.22]}>
        <sphereGeometry args={[1, 16, 10]} />
      </mesh>
      {/* chin intake */}
      <mesh material={dark} position={[-0.35, -0.3, 0]}>
        <boxGeometry args={[1.3, 0.26, 0.42]} />
      </mesh>
      {/* nozzle */}
      <mesh material={dark} rotation={[0, 0, Math.PI / 2]} position={[1.95, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.22, 0.35, 10]} />
      </mesh>

      {/* wings + horizontal stabilisers, mirrored */}
      {[1, -1].map((side) => (
        <group key={side} scale={[1, 1, side]}>
          <mesh material={skin} geometry={geo.wing} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, -0.2]} />
          <mesh material={skin} geometry={geo.stab} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -0.2]} />
        </group>
      ))}

      {/* vertical tail */}
      <mesh material={skin} geometry={geo.fin} position={[0, 0.2, 0]} />
    </group>
  );
}
