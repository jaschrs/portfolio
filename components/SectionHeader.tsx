import ScrambleText from "./ScrambleText";
import Reveal from "./Reveal";

/** "02 / EXPERIENCE" label + large heading used at the top of every section. */
export default function SectionHeader({
  index,
  label,
  title,
  aside,
}: {
  index: string;
  label: string;
  title: string;
  aside?: React.ReactNode;
}) {
  return (
    <header className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="label mb-5 flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-line-strong" />
          <ScrambleText text={label} />
        </div>
        <Reveal>
          <h2 className="display max-w-4xl text-[clamp(2.5rem,5vw,4.5rem)]">{title}</h2>
        </Reveal>
      </div>
      {aside && <Reveal delay={0.1} className="max-w-sm text-muted">{aside}</Reveal>}
    </header>
  );
}
