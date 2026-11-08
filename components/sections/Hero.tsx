"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { profile } from "@/lib/data";

function Clock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: profile.timezone,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 10_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--"}</span>;
}

/** Each letter slides up into place on load, timed with the jet's arrival. */
function BigWord({ word, delay }: { word: string; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      {[...word].map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ delay: delay + i * 0.045, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [first, ...rest] = profile.name.split(" ");

  return (
    <section id="top" className="relative flex min-h-[calc(100svh-4rem)] flex-col px-5 pb-10 pt-6 sm:px-8 lg:px-12">
      <div className="label on-sky flex items-center justify-between gap-4">
        <span>{profile.location}</span>
        <span>
          Local <Clock />
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-end pb-10 pt-[38vh] sm:justify-center sm:pt-14 lg:max-w-[58%]">
        <div className="mb-8 flex w-max items-center gap-3 rounded-full bg-surface px-3.5 py-1.5 font-mono text-xs text-muted">
          <span className="relative flex size-2">
            <span className="pulse-ring absolute inset-0 rounded-full bg-accent" />
            <span className="relative size-2 rounded-full bg-accent" />
          </span>
          {profile.status}
        </div>

        <h1 className="display on-sky text-[clamp(3.5rem,16vw,8.5rem)]" aria-label={profile.name}>
          <BigWord word={first} delay={0.9} />
          <BigWord word={rest.join(" ")} delay={1.1} />
        </h1>

        <p className="on-sky mt-8 font-mono text-base sm:text-lg">
          <span className="text-accent">❯</span> {profile.roles.slice(0, 2).join(" · ")}
        </p>
        <p className="on-sky mt-3 max-w-lg text-lg leading-relaxed">{profile.tagline}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-fg"
          >
            View work
          </a>
          <a
            href="#contact"
            className="rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-fg transition-colors hover:bg-accent"
          >
            Get in touch
          </a>
        </div>
      </div>

      <div className="label on-sky grid grid-cols-2 gap-y-3 border-t border-white/40 pt-5 sm:grid-cols-4">
        <span>{profile.degree}</span>
        <span>{profile.school}</span>
        <span>Class of {profile.graduation.split(" ").pop()}</span>
        <a href="#about" className="hover:underline sm:text-right">
          Scroll ↓
        </a>
      </div>
    </section>
  );
}
