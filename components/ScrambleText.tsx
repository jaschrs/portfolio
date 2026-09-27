"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01ABCDEFXYZ";

/** Returns the scrambled display string and a function that replays the decode. */
export function useScramble(text: string, duration = 900) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    // Each character settles at a slightly randomized point in the timeline.
    const settle = [...text].map((_, i) => (i / text.length) * 0.7 + Math.random() * 0.3);
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " " || p >= settle[i]) out += ch;
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(out);
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [text, duration]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return [display, run] as const;
}

type Props = {
  text: string;
  className?: string;
  /** "mount": decode on load, "view": when scrolled into view, "hover": on pointer enter. */
  trigger?: "mount" | "view" | "hover";
  duration?: number;
  delay?: number;
};

export default function ScrambleText({ text, className, trigger = "view", duration, delay = 0 }: Props) {
  const [display, run] = useScramble(text, duration);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (trigger === "mount" || (trigger === "view" && inView)) {
      const t = setTimeout(run, delay);
      return () => clearTimeout(t);
    }
  }, [trigger, inView, run, delay]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      onPointerEnter={trigger === "hover" ? run : undefined}
    >
      <span aria-hidden>{display}</span>
    </span>
  );
}
