"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { profile } from "@/lib/data";
import { useScramble } from "../ScrambleText";
import Magnetic from "../Magnetic";
import Portrait from "../Portrait";

function Clock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: profile.timezone,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--:--"}</span>;
}

function RoleCycler() {
  const [i, setI] = useState(0);
  const [display, run] = useScramble(profile.roles[i], 700);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2800);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    run();
  }, [run]);

  return (
    <span className="text-fg" aria-live="polite" aria-label={profile.roles[i]}>
      <span aria-hidden>{display}</span>
      <span className="caret ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-accent" />
    </span>
  );
}

/** Each letter slides up into place on load. */
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

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
});

export default function Hero() {
  const [first, ...rest] = profile.name.split(" ");

  return (
    <section id="top" className="relative flex min-h-[calc(100svh-4rem)] flex-col px-5 pb-10 pt-6 sm:px-8 lg:px-12">
      <motion.div {...fade(0.1)} className="label flex items-center justify-between gap-4">
        <span>{profile.location}</span>
        <Clock />
      </motion.div>

      <div className="grid flex-1 items-center gap-14 py-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <motion.div {...fade(0.2)} className="mb-8 flex w-max items-center gap-3 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-xs text-muted">
            <span className="relative flex size-2">
              <span className="pulse-ring absolute inset-0 rounded-full bg-accent" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            {profile.status}
          </motion.div>

          <h1 className="display text-[clamp(3.5rem,16vw,8.5rem)]" aria-label={profile.name}>
            <BigWord word={first} delay={0.25} />
            <BigWord word={rest.join(" ")} delay={0.45} />
          </h1>

          <motion.p {...fade(0.9)} className="mt-10 font-mono text-base text-muted sm:text-lg">
            <span className="text-accent">❯</span> I&apos;m a <RoleCycler />
          </motion.p>
          <motion.p {...fade(1)} className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
            {profile.tagline}
          </motion.p>
          <motion.div {...fade(1.1)} className="mt-9 flex flex-wrap gap-3">
            <Magnetic>
              <a
                href="#projects"
                className="block rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-accent"
              >
                View work
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="block rounded-full border border-line-strong px-6 py-3.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                Get in touch
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:col-span-4 lg:mr-0 lg:max-w-md">
          <Portrait />
        </div>
      </div>

      <motion.div
        {...fade(1.3)}
        className="label grid grid-cols-2 gap-y-3 border-t border-line pt-5 sm:grid-cols-4"
      >
        <span>{profile.degree}</span>
        <span>{profile.school}</span>
        <span>Class of {profile.graduation.split(" ").pop()}</span>
        <a href="#about" className="flex items-center gap-2 hover:text-fg sm:justify-end">
          Scroll
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
}
