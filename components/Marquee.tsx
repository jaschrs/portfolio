/** Infinite scrolling band of large text used as a section divider. */
export default function Marquee({ items }: { items: string[] }) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className={`display px-8 text-[clamp(2.5rem,5vw,4.5rem)] ${i % 2 ? "text-dim" : "text-fg"}`}>{t}</span>
          <span className="size-3 rotate-45 bg-accent sm:size-4" />
        </span>
      ))}
    </div>
  );
  return (
    <div aria-hidden className="group relative overflow-hidden border-y border-line bg-bg py-6">
      <div className="marquee flex w-max group-hover:[animation-play-state:paused]">
        {row}
        {row}
      </div>
    </div>
  );
}
