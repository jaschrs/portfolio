"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { experience } from "@/lib/data";
import SectionHeader from "../SectionHeader";

export default function Experience() {
  const [open, setOpen] = useState<number | null>(0);
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <SectionHeader
        index="02"
        label="Experience"
        title="Where I've been building."
        aside="Internships, research and teaching — click a role to see what I shipped."
      />

      <ol ref={listRef} className="relative">
        {/* timeline rail + scroll-driven fill */}
        <span aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-line md:left-[calc(25%+7px)]" />
        <motion.span
          aria-hidden
          style={{ scaleY: fill }}
          className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-accent md:left-[calc(25%+7px)]"
        />

        {experience.map((job, i) => {
          const isOpen = open === i;
          return (
            <motion.li
              key={job.company + job.role}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group relative grid gap-2 pb-4 pl-10 md:grid-cols-4 md:gap-0 md:pl-0"
            >
                <div className="label pt-6 md:pr-10 md:text-right">{job.period}</div>

                {/* node */}
                <span
                  aria-hidden
                  className={`absolute left-0 top-[1.55rem] size-[15px] rounded-full border-2 bg-bg transition-colors md:left-1/4 md:top-7 ${
                    isOpen ? "border-accent bg-accent" : "border-line-strong group-hover:border-accent"
                  }`}
                />

                <div className="md:col-span-3 md:pl-12">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className={`w-full rounded-xl border p-5 text-left transition-all duration-300 sm:p-6 ${
                      isOpen
                        ? "border-line-strong bg-surface"
                        : "border-transparent hover:-translate-y-0.5 hover:border-line hover:bg-surface"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
                          {job.role}
                        </h3>
                        <p className="mt-1 text-muted">
                          <span className="text-fg">{job.company}</span> · {job.location}
                        </p>
                      </div>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 22 }}
                        className={`grid size-9 shrink-0 place-items-center rounded-full border font-mono text-lg transition-colors ${
                          isOpen ? "border-accent bg-accent text-ink" : "border-line text-muted group-hover:text-fg"
                        }`}
                      >
                        +
                      </motion.span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="mt-5 text-muted">{job.summary}</p>
                          <ul className="mt-4 space-y-2.5">
                            {job.highlights.map((h, j) => (
                              <motion.li
                                key={h}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + j * 0.06 }}
                                className="flex gap-3 text-fg/90"
                              >
                                <span className="mt-[0.6em] size-1 shrink-0 bg-accent" />
                                {h}
                              </motion.li>
                            ))}
                          </ul>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {job.stack.map((t) => (
                              <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                                {t}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
