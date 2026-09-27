"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { skillGroups } from "@/lib/data";
import SectionHeader from "../SectionHeader";

const TABS = ["All", ...skillGroups.map((g) => g.name)];
const ALL = skillGroups.flatMap((g) => g.items.map((item) => ({ item, group: g.name })));

function Keycap({
  label,
  dimmed,
  pressed,
}: {
  label: string;
  dimmed: boolean;
  pressed: boolean;
}) {
  const [down, setDown] = useState(false);
  const isDown = down || pressed;
  return (
    <button
      type="button"
      onPointerDown={() => setDown(true)}
      onPointerUp={() => setDown(false)}
      onPointerLeave={() => setDown(false)}
      aria-pressed={isDown}
      className={`group relative h-16 w-full rounded-lg border text-left transition-[transform,box-shadow,opacity,border-color,background-color] duration-100 sm:h-20 ${dimmed ? "opacity-25" : "opacity-100"} ${
        isDown
          ? "translate-y-[4px] border-accent bg-accent text-ink shadow-none"
          : "border-line-strong bg-raised shadow-[0_4px_0_0_var(--color-line-strong)] hover:-translate-y-[2px] hover:border-accent hover:shadow-[0_6px_0_0_var(--accent)]"
      }`}
    >
      <span className={`absolute left-2.5 top-2 font-mono text-[10px] ${isDown ? "text-ink" : "text-dim"}`}>
        {label[0].toUpperCase()}
      </span>
      <span className="absolute bottom-2 left-2.5 right-2 truncate text-[13px] font-medium sm:text-sm">{label}</span>
    </button>
  );
}

export default function Skills() {
  const [tab, setTab] = useState("All");
  const [pressed, setPressed] = useState<Set<string>>(new Set());
  const [lastKey, setLastKey] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });

  // Typing a letter while the keyboard is on screen presses matching keys.
  useEffect(() => {
    if (!inView) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, [contenteditable]") || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (!/^[a-z0-9]$/.test(k)) return;
      const matches = ALL.filter(({ item }) => item.toLowerCase().startsWith(k)).map(({ item }) => item);
      setLastKey(k.toUpperCase());
      setPressed(new Set(matches));
    };
    const onUp = () => setPressed(new Set());
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onUp);
    };
  }, [inView]);

  return (
    <section id="skills" className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <SectionHeader
        index="04"
        label="Skills"
        title="My toolkit."
        aside={
          <>
            Languages, frameworks and tools I reach for. Try typing a letter on your keyboard
            <span className="ml-2 inline-grid size-6 place-items-center rounded border border-line-strong font-mono text-xs text-fg">
              {lastKey ?? "R"}
            </span>
          </>
        }
      />

      <div role="tablist" aria-label="Skill categories" className="mb-6 flex flex-wrap gap-6 border-b border-line">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`relative pb-3 text-sm transition-colors ${tab === t ? "text-fg" : "text-muted hover:text-fg"}`}
          >
            {t}
            {tab === t && (
              <motion.span layoutId="skill-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-accent" />
            )}
          </button>
        ))}
      </div>

      <div ref={ref} className="rounded-2xl border border-line bg-surface p-3 sm:p-5">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3 lg:grid-cols-8">
          {ALL.map(({ item, group }, i) => (
            <motion.div
              key={item}
              className={i % 9 === 0 ? "col-span-2" : ""}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 8) * 0.03 + Math.floor(i / 8) * 0.06 }}
            >
              <Keycap label={item} dimmed={tab !== "All" && tab !== group} pressed={pressed.has(item)} />
            </motion.div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-widest text-dim">
          <span>{ALL.length} keys</span>
          <span className="hidden sm:inline">tactile · hot-swappable · always learning</span>
        </div>
      </div>
    </section>
  );
}
