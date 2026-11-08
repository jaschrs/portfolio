
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
        <div className="label on-sky mb-5 flex items-center gap-3">
          <span>{index}</span>
          <span className="h-px w-8 bg-white/60" />
          {label}
        </div>
        <div>
          <h2 className="display on-sky max-w-4xl text-[clamp(2.5rem,5vw,4.5rem)]">{title}</h2>
        </div>
      </div>
      {aside && <div className="on-sky max-w-sm">{aside}</div>}
    </header>
  );
}
