"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useUI } from "./UIProvider";
import { links, profile } from "@/lib/data";
import { sections } from "@/lib/sections";

type Action = { id: string; group: string; label: string; hint?: string; run: () => void };

// Subsequence match: "exp" matches "Experience", "gth" matches "GitHub".
function fuzzy(query: string, text: string) {
  const q = query.toLowerCase().replace(/\s+/g, "");
  const t = text.toLowerCase();
  let i = 0;
  for (const ch of t) if (ch === q[i]) i++;
  return i === q.length;
}

export default function CommandMenu() {
  const { commandOpen, setCommandOpen, copyEmail, cycleAccent } = useUI();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const actions = useMemo<Action[]>(() => {
    const go = (id: string) => () =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const open = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");
    return [
      ...sections.map((s) => ({
        id: `go-${s.id}`,
        group: "Navigate",
        label: s.label,
        hint: s.index,
        run: go(s.id),
      })),
      { id: "copy", group: "Actions", label: "Copy email address", hint: profile.email, run: copyEmail },
      { id: "resume", group: "Actions", label: "Open résumé", hint: "PDF", run: open(profile.resume) },
      { id: "accent", group: "Actions", label: "Surprise me", hint: "↑↑↓↓←→←→BA", run: cycleAccent },
      ...links
        .filter((l) => !l.href.startsWith("mailto:"))
        .map((l) => ({ id: `link-${l.label}`, group: "Links", label: l.label, hint: l.handle, run: open(l.href) })),
    ];
  }, [copyEmail, cycleAccent]);

  const filtered = useMemo(
    () => actions.filter((a) => fuzzy(query, `${a.label} ${a.group} ${a.hint ?? ""}`)),
    [actions, query],
  );

  // Reset each time the palette opens.
  useEffect(() => {
    if (!commandOpen) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery("");
    setIndex(0);
    const t = setTimeout(() => inputRef.current?.focus(), 10);
    return () => clearTimeout(t);
  }, [commandOpen]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const runAt = (i: number) => {
    const action = filtered[i];
    if (!action) return;
    setCommandOpen(false);
    // Let the dialog close before scrolling/opening.
    setTimeout(action.run, 60);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (i + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAt(index);
    } else if (e.key === "Escape") {
      setCommandOpen(false);
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {commandOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/70 px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => setCommandOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="w-full max-w-xl overflow-hidden rounded-xl border border-line bg-surface"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 500, damping: 34 }}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <span className="font-mono text-sm text-accent">❯</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                placeholder="Type a command or search…"
                className="h-14 w-full bg-transparent font-mono text-sm text-fg outline-none placeholder:text-dim"
                aria-controls="command-list"
                aria-activedescendant={filtered[index] ? `cmd-${filtered[index].id}` : undefined}
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
            </div>
            <ul ref={listRef} id="command-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-8 text-center font-mono text-xs text-muted">No results for “{query}”</li>
              )}
              {filtered.map((a, i) => {
                const header = a.group !== lastGroup ? a.group : null;
                lastGroup = a.group;
                return (
                  <li key={a.id} role="presentation">
                    {header && <div className="label px-3 pb-1 pt-3 !text-[10px] text-dim">{header}</div>}
                    <div
                      id={`cmd-${a.id}`}
                      role="option"
                      aria-selected={i === index}
                      data-index={i}
                      onMouseMove={() => setIndex(i)}
                      onClick={() => runAt(i)}
                      className="relative flex cursor-pointer items-center justify-between rounded-md px-3 py-2.5 text-sm"
                    >
                      {i === index && (
                        <motion.span
                          layoutId="cmd-active"
                          className="absolute inset-0 rounded-md bg-raised"
                          transition={{ type: "spring", stiffness: 600, damping: 40 }}
                        />
                      )}
                      <span className="relative flex items-center gap-3">
                        <span
                          className={`size-1.5 rounded-full transition-colors ${i === index ? "bg-accent" : "bg-line-strong"}`}
                        />
                        {a.label}
                      </span>
                      {a.hint && <span className="relative font-mono text-xs text-muted">{a.hint}</span>}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] text-dim">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span className="ml-auto">⌘K toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
