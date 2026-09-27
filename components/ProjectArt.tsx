"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/lib/data";

const CHARSETS: Record<Project["category"], string> = {
  Systems: " .01:x#",
  Web: " .-/<>{",
  ML: " .·oO0@",
  Tools: " .-=+$#",
};

// Glyph box of the 10px mono font below.
const CHAR_W = 6.02;
const CHAR_H = 11.5;

function hash(s: string) {
  let h = 2166136261;
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return (h >>> 0) / 4294967295;
}

/**
 * Generative ASCII field unique to each project, sized to fill its parent.
 * The densest glyphs are drawn on a separate accent layer; when `active`,
 * the field animates.
 */
export default function ProjectArt({ project, active }: { project: Project; active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ cols: 60, rows: 12 });
  const [t, setT] = useState(0);
  const seed = useMemo(() => hash(project.slug) * 100, [project.slug]);
  const chars = CHARSETS[project.category];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ cols: Math.ceil(width / CHAR_W) + 1, rows: Math.ceil(height / CHAR_H) + 1 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let last = 0;
    const loop = (now: number) => {
      if (now - last > 70) {
        setT((v) => v + 0.12);
        last = now;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  const [base, hot] = useMemo(() => {
    const { cols, rows } = size;
    const a = 0.15 + (seed % 1) * 0.25;
    const b = 0.2 + ((seed * 7) % 1) * 0.3;
    let baseOut = "";
    let hotOut = "";
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const v =
          Math.sin(x * a + t + seed) +
          Math.cos(y * b * 1.7 - t * 0.7 + seed) +
          Math.sin((x * 0.5 + y) * 0.23 + t * 0.5);
        const n = (v + 3) / 6; // 0..1
        const idx = Math.min(chars.length - 1, Math.floor(n * chars.length));
        const isHot = idx === chars.length - 1;
        baseOut += isHot ? " " : chars[idx];
        hotOut += isHot ? chars[idx] : " ";
      }
      baseOut += "\n";
      hotOut += "\n";
    }
    return [baseOut, hotOut];
  }, [t, seed, size, chars]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-0 select-none overflow-hidden font-mono text-[10px]"
      style={{ lineHeight: `${CHAR_H}px` }}
    >
      <pre className="text-line-strong">{base}</pre>
      <pre className="absolute inset-0 text-accent">{hot}</pre>
    </div>
  );
}
