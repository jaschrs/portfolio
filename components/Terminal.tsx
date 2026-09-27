"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { coursework, profile, projects, skillGroups } from "@/lib/data";
import { useUI } from "./UIProvider";

type Line = { kind: "cmd" | "out"; text: string };

const user = profile.shortName.toLowerCase();

const INTRO: { cmd: string; out: string[] }[] = [
  { cmd: "whoami", out: [`${profile.name} — ${profile.degree}, ${profile.school}`] },
  { cmd: "cat interests.txt", out: ["systems · compilers · distributed · web · ml"] },
  { cmd: "ls coursework/", out: [coursework.join("  ")] },
];

/** A tiny interactive shell: plays an intro, then accepts real commands. */
export default function Terminal() {
  const { copyEmail, cycleAccent } = useUI();
  const ref = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const [ready, setReady] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    (async () => {
      for (const step of INTRO) {
        if (!reduced) {
          for (let i = 1; i <= step.cmd.length; i++) {
            if (cancelled) return;
            setTyping(step.cmd.slice(0, i));
            await sleep(38 + Math.random() * 50);
          }
          await sleep(220);
        }
        if (cancelled) return;
        setTyping("");
        setLines((l) => [
          ...l,
          { kind: "cmd", text: step.cmd },
          ...step.out.map((text) => ({ kind: "out" as const, text })),
        ]);
        if (!reduced) await sleep(350);
      }
      if (!cancelled) {
        setLines((l) => [...l, { kind: "out", text: "type `help` to explore." }]);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [inView]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines, typing]);

  const exec = (raw: string) => {
    const cmd = raw.trim();
    const [name, ...args] = cmd.split(/\s+/);
    const out: string[] = [];
    switch (name.toLowerCase()) {
      case "":
        break;
      case "help":
        out.push("whoami  projects  skills  contact  resume  date  echo  clear  theme");
        break;
      case "whoami":
      case "about":
        out.push(...profile.bio);
        break;
      case "projects":
      case "ls":
        out.push(...projects.map((p) => `${p.slug.padEnd(12)} ${p.blurb}`));
        break;
      case "skills":
        out.push(...skillGroups.map((g) => `${g.name.toLowerCase()}: ${g.items.join(", ")}`));
        break;
      case "contact":
      case "email":
        copyEmail();
        out.push(`${profile.email}  (copied to clipboard)`);
        break;
      case "resume":
        window.open(profile.resume, "_blank", "noopener,noreferrer");
        out.push("opening résumé…");
        break;
      case "date":
        out.push(new Date().toString());
        break;
      case "echo":
        out.push(args.join(" "));
        break;
      case "theme":
        cycleAccent();
        out.push("accent color rotated.");
        break;
      case "sudo":
        out.push(`${user} is not in the sudoers file. This incident will be reported.`);
        break;
      case "rm":
        out.push("nice try.");
        break;
      case "clear":
        setLines([]);
        return;
      case "exit":
        out.push("there is no escape. try `help`.");
        break;
      default:
        out.push(`command not found: ${name}`);
    }
    setLines((l) => [...l, { kind: "cmd", text: cmd }, ...out.map((text) => ({ kind: "out" as const, text }))]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      exec(input);
      if (input.trim()) setHistory((h) => [input, ...h]);
      setInput("");
      setHIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(hIndex + 1, history.length - 1);
      if (history[next] !== undefined) {
        setHIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = hIndex - 1;
      setHIndex(Math.max(next, -1));
      setInput(next < 0 ? "" : history[next]);
    }
  };

  const prompt = (
    <span className="shrink-0 select-none">
      <span className="text-accent">{user}</span>
      <span className="text-dim">@portfolio</span>
      <span className="text-muted">&nbsp;~ $&nbsp;</span>
    </span>
  );

  return (
    <div
      ref={ref}
      onClick={() => inputRef.current?.focus()}
      className="flex h-[380px] flex-col overflow-hidden rounded-xl border border-line bg-surface font-mono text-[13px]"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-accent" />
        <span className="ml-3 text-[11px] text-dim">~/{user} — zsh</span>
      </div>
      <div ref={bodyRef} className="flex-1 space-y-1.5 overflow-y-auto p-4 leading-relaxed">
        {lines.map((l, i) =>
          l.kind === "cmd" ? (
            <div key={i} className="flex flex-wrap">
              {prompt}
              <span className="text-fg">{l.text}</span>
            </div>
          ) : (
            <div key={i} className="whitespace-pre-wrap break-words text-muted">
              {l.text}
            </div>
          ),
        )}
        <div className="flex items-center">
          {prompt}
          {ready ? (
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Terminal input"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent text-fg caret-[var(--accent)] outline-none"
            />
          ) : (
            <span className="text-fg">
              {typing}
              <span className="caret ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-accent" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
