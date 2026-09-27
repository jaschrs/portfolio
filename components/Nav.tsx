"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { sections } from "@/lib/sections";
import { profile } from "@/lib/data";
import { useUI } from "./UIProvider";

export default function Nav() {
  const { setCommandOpen } = useUI();
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const s of ["top", ...sections.map((s) => s.id)]) {
      const el = document.getElementById(s);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        scrolled ? "border-line bg-bg/85" : "border-transparent bg-bg/0"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-3 px-5 sm:px-8 lg:px-12"
      >
        <a href="#top" aria-label="Back to top" className="group flex shrink-0 items-center gap-3">
          <span className="grid size-8 place-items-center rounded-md bg-fg font-mono text-[11px] font-bold text-ink transition-colors group-hover:bg-accent">
            {initials}
          </span>
          <span className="label hidden !text-fg md:inline">
            {profile.shortName.toLowerCase()}
            <span className="text-accent">.</span>dev
          </span>
        </a>

        <ul className="flex items-center rounded-full border border-line bg-surface p-1">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`relative block rounded-full px-2.5 py-1.5 text-[13px] transition-colors sm:px-3.5 ${
                  active === s.id ? "text-ink" : "text-muted hover:text-fg"
                }`}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative font-mono text-[11px] sm:hidden">{s.index}</span>
                <span className="relative hidden sm:inline">{s.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setCommandOpen(true)}
          aria-label="Open command menu"
          className="flex h-8 shrink-0 items-center gap-1 rounded-md border border-line px-2.5 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-fg"
        >
          <span>⌘</span>
          <span>K</span>
        </button>
      </nav>

      <motion.div
        aria-hidden
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent"
        style={{ scaleX: progress }}
      />
    </motion.header>
  );
}
