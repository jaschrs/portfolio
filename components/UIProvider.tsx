"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import CommandMenu from "./CommandMenu";
import { profile } from "@/lib/data";

type UI = {
  toast: (message: string) => void;
  copyEmail: () => void;
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  cycleAccent: () => void;
};

const UIContext = createContext<UI | null>(null);

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}

// Flat accents cycled by the Konami code easter egg.
const ACCENTS = ["#4d7cff", "#ff5c39", "#c6ff3d", "#f5f5f5", "#b57bff"];
const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const accentIndex = useRef(0);

  const toast = useCallback((message: string) => {
    setToastMsg(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 2200);
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard?.writeText(profile.email).then(
      () => toast(`Copied ${profile.email}`),
      () => toast(profile.email),
    );
  }, [toast]);

  const cycleAccent = useCallback(() => {
    accentIndex.current = (accentIndex.current + 1) % ACCENTS.length;
    document.documentElement.style.setProperty("--accent", ACCENTS[accentIndex.current]);
    toast("Accent unlocked ✦");
  }, [toast]);

  // ⌘K / Ctrl+K and the Konami code.
  useEffect(() => {
    let progress = 0;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((v) => !v);
        return;
      }
      const expected = KONAMI[progress];
      if (e.key.toLowerCase() === expected.toLowerCase()) {
        progress++;
        if (progress === KONAMI.length) {
          progress = 0;
          cycleAccent();
        }
      } else {
        progress = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cycleAccent]);

  return (
    <UIContext.Provider
      value={{ toast, copyEmail, commandOpen, setCommandOpen, cycleAccent }}
    >
      {children}
      <CommandMenu />
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            key={toastMsg}
            role="status"
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className="fixed left-1/2 top-20 z-[70] -translate-x-1/2 rounded-full border border-line bg-raised px-4 py-2 font-mono text-xs text-fg"
          >
            <span className="mr-2 inline-block size-1.5 rounded-full bg-accent align-middle" />
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </UIContext.Provider>
  );
}
