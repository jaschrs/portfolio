"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const WEEKS = 52;
const DAYS = 7;
// Discrete accent steps — flat fills at fixed opacities, never blended.
const LEVEL_OPACITY = [0, 0.3, 0.55, 0.8, 1];

// Deterministic PRNG so server and client render the same placeholder data.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function ContributionGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [hover, setHover] = useState<{ count: number; label: string } | null>(null);

  const cells = useMemo(() => {
    const rand = mulberry32(42);
    return Array.from({ length: WEEKS * DAYS }, (_, i) => {
      const week = Math.floor(i / DAYS);
      const weekend = i % DAYS === 0 || i % DAYS === 6;
      // Busier during the semester and in recent weeks.
      const bias = 0.35 + 0.4 * Math.sin((week / WEEKS) * Math.PI * 2.2) ** 2 + week / WEEKS / 3;
      const r = rand() * (weekend ? 0.7 : 1);
      const count = r < 1 - bias ? 0 : Math.floor(r * 14 * bias);
      const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4;
      return { count, level, week };
    });
  }, []);

  const total = cells.reduce((s, c) => s + c.count, 0);

  const describe = (i: number, count: number) => {
    const d = new Date();
    d.setDate(d.getDate() - (WEEKS * DAYS - 1 - i));
    const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    return { count, label: date };
  };

  return (
    <div ref={ref} className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <span className="label">Commit activity</span>
        <span className="font-mono text-xs text-muted">
          {hover ? (
            <>
              <span className="text-fg">{hover.count} commits</span> on {hover.label}
            </>
          ) : (
            <>
              <span className="text-fg">{total.toLocaleString()}</span> commits in the last year
            </>
          )}
        </span>
      </div>
      <div className="overflow-x-auto pb-1">
        <div
          className="grid min-w-[600px] grid-flow-col gap-[3px]"
          style={{ gridTemplateRows: `repeat(${DAYS}, auto)`, gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))` }}
          onPointerLeave={() => setHover(null)}
        >
          {cells.map((c, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: c.week * 0.012, type: "spring", stiffness: 400, damping: 20 }}
              onPointerEnter={() => setHover(describe(i, c.count))}
              className="relative aspect-square rounded-[2px] bg-raised transition-transform hover:scale-150 hover:outline hover:outline-1 hover:outline-fg"
            >
              {c.level > 0 && (
                <span className="absolute inset-0 rounded-[2px] bg-accent" style={{ opacity: LEVEL_OPACITY[c.level] }} />
              )}
            </motion.span>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-1.5 font-mono text-[10px] text-dim">
        less
        {LEVEL_OPACITY.map((o, i) => (
          <span key={i} className="relative size-[11px] rounded-[2px] bg-raised">
            {i > 0 && <span className="absolute inset-0 rounded-[2px] bg-accent" style={{ opacity: o }} />}
          </span>
        ))}
        more
      </div>
    </div>
  );
}
