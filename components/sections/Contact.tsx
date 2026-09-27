"use client";

import { links, profile } from "@/lib/data";
import { useUI } from "../UIProvider";
import Magnetic from "../Magnetic";
import Reveal from "../Reveal";
import ScrambleText from "../ScrambleText";

export default function Contact() {
  const { copyEmail } = useUI();
  const year = new Date().getFullYear();

  return (
    <section id="contact" className="relative px-5 pb-12 pt-24 sm:px-8 md:pt-32 lg:px-12">
      <div className="label mb-8 flex items-center gap-3">
        <span className="text-accent">05</span>
        <span className="h-px w-8 bg-line-strong" />
        <ScrambleText text="Contact" />
      </div>

      <Reveal>
        <h2 className="display text-[clamp(3rem,8vw,7rem)]">
          Let&apos;s build
          <br />
          <span className="text-dim">something</span>
          <span className="text-accent">.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <p className="max-w-md text-lg text-muted">
          I&apos;m looking for internships and interesting problems. My inbox is always open — whether it&apos;s
          an opportunity, a project, or just to say hi.
        </p>
        <Magnetic strength={0.25}>
          <button
            type="button"
            onClick={copyEmail}
            className="group flex items-center gap-4 rounded-full bg-accent py-2 pl-7 pr-2 text-lg font-medium text-ink sm:text-xl"
          >
            {profile.email}
            <span className="grid size-12 place-items-center rounded-full bg-ink text-fg transition-transform duration-300 group-hover:rotate-45">
              ↗
            </span>
          </button>
        </Magnetic>
      </Reveal>

      <ul className="mt-20 border-t border-line">
        {links.map((l, i) => (
          <li key={l.label}>
            <Reveal delay={i * 0.05}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group relative flex items-center justify-between overflow-hidden border-b border-line px-2 py-6 sm:py-8"
              >
                {/* solid wipe fill on hover */}
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                <span className="relative flex items-baseline gap-6 transition-colors duration-300 group-hover:text-ink">
                  <span className="font-mono text-xs text-dim group-hover:text-ink">0{i + 1}</span>
                  <span className="text-3xl font-medium tracking-tight sm:text-5xl">{l.label}</span>
                </span>
                <span className="relative flex items-center gap-4 font-mono text-sm text-muted transition-colors duration-300 group-hover:text-ink">
                  <span className="hidden sm:inline">{l.handle}</span>
                  <span className="text-2xl transition-transform duration-300 group-hover:rotate-45">↗</span>
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>

      <footer className="label mt-24 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {year} {profile.name}
        </span>
        <span className="text-dim">Designed &amp; built from scratch with Next.js</span>
        <span className="text-dim" title="try it">
          ↑↑↓↓←→←→BA
        </span>
      </footer>
    </section>
  );
}
