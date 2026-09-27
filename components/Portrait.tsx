"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { profile } from "@/lib/data";

/** Framed portrait for the hero; shows a silhouette until `profile.photo` is set. */
export default function Portrait() {
  return (
    <figure className="group relative w-full">
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0% round 16px)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 16px)" }}
        transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface"
      >
        {profile.photo ? (
          <Image
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="object-cover grayscale transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        ) : (
          <svg
            viewBox="0 0 400 500"
            aria-hidden
            className="absolute inset-0 h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          >
            <circle cx="200" cy="190" r="78" fill="var(--color-raised)" />
            <path d="M40 500c0-110 72-190 160-190s160 80 160 190z" fill="var(--color-raised)" />
          </svg>
        )}

        {/* corner ticks */}
        {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map(
          (pos) => (
            <span
              key={pos}
              aria-hidden
              className={`absolute size-3 border-line-strong transition-colors duration-300 group-hover:border-accent ${pos}`}
            />
          ),
        )}

        <span className="label absolute left-6 top-5 !text-[10px]">Fig. 01</span>
        <span className="label absolute right-6 top-5 !text-[10px]">{profile.photo ? "" : "Photo soon"}</span>
      </motion.div>

      <motion.figcaption
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="label mt-3 flex items-center justify-between !text-[10px]">
        <span className="text-fg">{profile.name}</span>
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-accent" />
          {profile.school}
        </span>
      </motion.figcaption>
    </figure>
  );
}
