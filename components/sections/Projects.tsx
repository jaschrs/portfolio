"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { projects, type Project } from "@/lib/data";
import SectionHeader from "../SectionHeader";
import ProjectArt from "../ProjectArt";

const FILTERS = ["All", ...Array.from(new Set(projects.map((p) => p.category)))] as const;

function Arrow({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`inline-block font-mono ${className}`}>
      ↗
    </span>
  );
}

function ProjectCard({
  project,
  index,
  big,
  onOpen,
}: {
  project: Project;
  index: number;
  big: boolean;
  onOpen: () => void;
}) {
  const [hover, setHover] = useState(false);
  const rx = useSpring(useMotionValue(0), { stiffness: 250, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 250, damping: 20 });

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(-py * (big ? 5 : 8));
    ry.set(px * (big ? 5 : 8));
  };
  const onLeave = () => {
    setHover(false);
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div style={{ perspective: 1000 }} className="h-full">
      <motion.button
        type="button"
        onClick={onOpen}
        onPointerMove={onMove}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={onLeave}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={`group flex h-full w-full flex-col overflow-hidden rounded-xl border bg-surface text-left transition-colors duration-300 ${
          hover ? "border-accent" : "border-line"
        }`}
      >
        <div className={`relative flex-1 overflow-hidden border-b border-line ${big ? "min-h-64" : "min-h-36"}`}>
          <ProjectArt project={project} active={hover} />
          <span className="absolute left-4 top-4 rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted">
            {project.category}
          </span>
        </div>
        <div className="flex flex-col gap-3 p-5 sm:p-6">
          <div className="flex items-center justify-between font-mono text-xs text-dim">
            <span>
              {String(index + 1).padStart(2, "0")} — {project.year}
            </span>
            <Arrow
              className={`text-lg transition-all duration-300 ${
                hover ? "translate-x-0 translate-y-0 text-accent opacity-100" : "-translate-x-2 translate-y-2 opacity-0"
              }`}
            />
          </div>
          <h3 className={`font-medium tracking-tight ${big ? "text-4xl sm:text-5xl" : "text-2xl"}`}>
            {project.title}
          </h3>
          <p className="text-muted">{project.blurb}</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <span key={t} className="rounded-md bg-raised px-2 py-0.5 font-mono text-[11px] text-muted">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // Portaled to <body> so it sits above the nav dock's stacking context.
  return createPortal(
    <motion.div
      className="fixed inset-0 z-[75] flex items-end justify-center bg-black/75 p-3 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        layoutId={`project-${project.slug}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-line-strong bg-surface"
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
      >
        <div className="relative h-52 border-b border-line">
          <ProjectArt project={project} active />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-line bg-surface font-mono text-muted transition-colors hover:border-accent hover:text-fg"
          >
            ✕
          </button>
        </div>
        <div className="p-6 sm:p-8">
          <div className="label mb-4 flex gap-4">
            <span className="text-accent">{project.category}</span>
            <span>{project.year}</span>
          </div>
          <h3 id="project-title" className="display text-5xl sm:text-6xl">
            {project.title}
          </h3>
          <p className="mt-5 text-lg leading-relaxed text-muted">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-fg px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent"
              >
                Source code <Arrow />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line-strong px-5 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                Live demo <Arrow />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  // The featured project only gets the big tile when showing everything.
  const featuredSlug = filter === "All" ? projects.find((p) => p.featured)?.slug : undefined;
  const ordered = featuredSlug
    ? [...visible.filter((p) => p.slug === featuredSlug), ...visible.filter((p) => p.slug !== featuredSlug)]
    : visible;

  return (
    <section id="projects" className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <SectionHeader
        index="03"
        label="Projects"
        title="Things I've made."
        aside="Kernels, compilers, web apps and tools. Hover to wake them up, click for details."
      />

      <div role="tablist" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count = f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
          const active = filter === f;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f)}
              className={`relative rounded-full border px-4 py-2 text-sm transition-colors ${
                active ? "border-accent text-ink" : "border-line text-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">
                {f} <span className="font-mono text-xs opacity-60">{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid auto-rows-auto grid-cols-1 gap-4 md:grid-cols-6">
        <AnimatePresence mode="popLayout">
          {ordered.map((p) => {
            const big = p.slug === featuredSlug;
            return (
              <motion.div
                key={p.slug}
                layout
                layoutId={`project-${p.slug}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                className={big ? "md:col-span-4 md:row-span-2" : filter === "All" ? "md:col-span-2" : "md:col-span-3"}
              >
                <ProjectCard project={p} index={projects.indexOf(p)} big={big} onOpen={() => setSelected(p)} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
