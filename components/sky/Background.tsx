"use client";

import dynamic from "next/dynamic";

// WebGL scene is client-only; the sky-blue body color shows until it mounts.
const SkyScene = dynamic(() => import("./SkyScene"), { ssr: false });

export default function Background() {
  return <SkyScene />;
}
