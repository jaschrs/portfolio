"use client";

import { links, profile } from "@/lib/data";
import { useUI } from "../UIProvider";

export default function Contact() {
  const { copyEmail } = useUI();
  const year = new Date().getFullYear();
  const { jet } = profile;

  return (
    <section id="contact" className="relative px-5 pb-12 pt-24 sm:px-8 md:pt-32 lg:px-12">
      <div className="label on-sky mb-8 flex items-center gap-3">
        <span>05</span>
        <span className="h-px w-8 bg-white/60" />
        Contact
      </div>

      <div>
        <h2 className="display on-sky text-[clamp(3rem,8vw,7rem)]">
          Let&apos;s build
          <br />
          <span className="text-white/75">something</span>
          <span className="text-accent">.</span>
        </h2>
      </div>

      <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <p className="on-sky max-w-md text-lg">
          I&apos;m looking for internships and interesting problems. My inbox is always open — whether it&apos;s
          an opportunity, a project, or just to say hi.
        </p>
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
      </div>

      <ul className="mt-20 overflow-hidden rounded-2xl border border-line bg-surface">
        {links.map((l, i) => (
          <li key={l.label}>
            <div>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group relative flex items-center justify-between overflow-hidden border-b border-line px-5 py-6 sm:px-8 sm:py-8"
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
            </div>
          </li>
        ))}
      </ul>

      <footer className="label on-sky mt-24 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <span>
          © {year} {profile.name}
        </span>
        <span>
          F-16 model:{" "}
          <a href={jet.credit.url} target="_blank" rel="noreferrer" className="underline underline-offset-4">
            {jet.credit.title}
          </a>{" "}
          by {jet.credit.author} ·{" "}
          <a href={jet.credit.licenseUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4">
            {jet.credit.license}
          </a>
        </span>
        <span title="try it">↑↑↓↓←→←→BA</span>
      </footer>
    </section>
  );
}
