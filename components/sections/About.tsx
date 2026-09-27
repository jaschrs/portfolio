import { profile } from "@/lib/data";
import SectionHeader from "../SectionHeader";
import Reveal from "../Reveal";
import Terminal from "../Terminal";
import ContributionGrid from "../ContributionGrid";
import CountUp from "../CountUp";

export default function About() {
  return (
    <section id="about" className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <SectionHeader index="01" label="About" title="Curious about how things work, all the way down." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <Reveal className="flex flex-col justify-between gap-10 rounded-xl border border-line bg-surface p-6 sm:p-8 lg:col-span-5">
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            {profile.bio.map((p, i) => (
              <p key={i} className={i === 0 ? "text-fg" : undefined}>
                {p}
              </p>
            ))}
          </div>
          <dl className="grid grid-cols-3 border-t border-line pt-6">
            {profile.stats.map((s) => (
              <div key={s.label} className="border-l border-line pl-4 first:border-l-0 first:pl-0">
                <dd className="display text-4xl sm:text-5xl">
                  <CountUp value={s.value} />
                </dd>
                <dt className="label mt-2 !text-[10px]">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <Terminal />
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-12">
          <ContributionGrid />
        </Reveal>
      </div>
    </section>
  );
}
