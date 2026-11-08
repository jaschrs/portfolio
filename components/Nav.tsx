"use client";

import { useEffect, useState } from "react";
import { sections } from "@/lib/sections";
import { profile } from "@/lib/data";
import { useUI } from "./UIProvider";

/** Plain-text sticky nav: no background, underlined links. */
export default function Nav() {
  const { setCommandOpen } = useUI();
  const [active, setActive] = useState<string | null>(null);

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

  return (
    <header className="on-sky sticky top-0 z-50">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-5 text-sm sm:px-8 lg:px-12"
      >
        <a href="#top" className="shrink-0 font-medium tracking-tight">
          {profile.name}
        </a>

        <ul className="flex items-center gap-4 sm:gap-7">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={`underline underline-offset-[6px] transition-[text-decoration-color,text-decoration-thickness] ${
                  active === s.id
                    ? "decoration-white decoration-2"
                    : "decoration-white/40 decoration-1 hover:decoration-white"
                }`}
              >
                <span className="sm:hidden">{s.index}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setCommandOpen(true)}
          aria-label="Open command menu"
          className="hidden shrink-0 font-mono text-xs underline decoration-white/40 underline-offset-[6px] hover:decoration-white md:inline"
        >
          ⌘K
        </button>
      </nav>
    </header>
  );
}
