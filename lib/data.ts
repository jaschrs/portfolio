// Everything on the site is driven from this file.
// Replace the placeholder entries below with your own details.

export const profile = {
  name: "Jasper Christian",
  shortName: "Jasper",
  roles: [
    "software engineer",
    "systems tinkerer",
    "full-stack builder",
    "cs student",
  ],
  tagline:
    "I build fast, well-crafted software — from low-level systems to the interfaces people touch.",
  school: "University of Somewhere",
  degree: "B.S. Computer Science",
  graduation: "May 2028",
  location: "Earth, UTC−5",
  timezone: "America/New_York",
  status: "Open to Summer 2027 internships",
  email: "hello@example.com",
  resume: "/resume.pdf",
  // Portrait shown in the hero. Drop an image into /public (e.g. /public/me.jpg)
  // and set this to "/me.jpg". Leave empty to show the placeholder silhouette.
  photo: "",
  bio: [
    "I'm a computer science student who likes understanding how things work all the way down — compilers, networks, operating systems — and then using that to build software that feels effortless.",
    "Lately I've been writing systems code in Rust, shipping full-stack side projects, and spending too much time tuning my editor config.",
  ],
  stats: [
    { value: "6+", label: "years writing code" },
    { value: "20+", label: "projects shipped" },
    { value: "3.9", label: "GPA" },
  ],
};

export const links = [
  { label: "GitHub", href: "https://github.com/jaschrs", handle: "@jaschrs" },
  { label: "LinkedIn", href: "https://linkedin.com/in/your-handle", handle: "in/your-handle" },
  { label: "Email", href: `mailto:${profile.email}`, handle: profile.email },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Acme Cloud",
    role: "Software Engineering Intern",
    period: "May 2026 — Aug 2026",
    location: "Remote",
    summary: "Platform team — internal developer tooling and CI infrastructure.",
    highlights: [
      "Rebuilt the build-cache service in Go, cutting median CI time by 38%.",
      "Designed a flaky-test detector that quarantined 400+ unstable tests automatically.",
      "Shipped a CLI used daily by 120 engineers to spin up preview environments.",
    ],
    stack: ["Go", "Kubernetes", "PostgreSQL", "gRPC"],
  },
  {
    company: "University Systems Lab",
    role: "Undergraduate Researcher",
    period: "Jan 2026 — Present",
    location: "On campus",
    summary: "Research on memory-safe kernels and lightweight virtualization.",
    highlights: [
      "Prototyped a Rust-based scheduler achieving 1.4× throughput on I/O-bound workloads.",
      "Co-authoring a workshop paper on capability-based isolation.",
    ],
    stack: ["Rust", "C", "QEMU", "Linux"],
  },
  {
    company: "Department of Computer Science",
    role: "Teaching Assistant — Data Structures",
    period: "Aug 2025 — Dec 2025",
    location: "On campus",
    summary: "Led weekly labs for 40 students and built autograders.",
    highlights: [
      "Wrote an autograder in Python that cut grading turnaround from 5 days to minutes.",
      "Held office hours and ran exam review sessions for 200+ students.",
    ],
    stack: ["Java", "Python", "Docker"],
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "2023 — 2025",
    location: "Remote",
    summary: "Sites and small web apps for local businesses and student orgs.",
    highlights: [
      "Delivered 8 client sites with Next.js and headless CMS setups.",
      "Improved Lighthouse performance scores from ~50 to 95+ across projects.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
  },
];

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  description: string;
  category: "Systems" | "Web" | "ML" | "Tools";
  year: string;
  stack: string[];
  repo?: string;
  live?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "kestrel",
    title: "Kestrel",
    blurb: "A tiny x86-64 hobby kernel written in Rust.",
    description:
      "Preemptive multitasking, a buddy allocator, a VFS layer and a userspace shell — all in about 9k lines of Rust. Boots on QEMU and real hardware.",
    category: "Systems",
    year: "2026",
    stack: ["Rust", "x86-64", "QEMU"],
    repo: "https://github.com/jaschrs",
    featured: true,
  },
  {
    slug: "relay",
    title: "Relay",
    blurb: "Realtime collaborative whiteboard with CRDT sync.",
    description:
      "Multiplayer canvas using Yjs CRDTs over WebSockets with presence, offline edits and conflict-free merges. Handles 50+ concurrent editors per room.",
    category: "Web",
    year: "2026",
    stack: ["TypeScript", "Next.js", "Yjs", "WebSockets"],
    repo: "https://github.com/jaschrs",
    live: "https://example.com",
  },
  {
    slug: "lexa",
    title: "Lexa",
    blurb: "A compiler for a small functional language.",
    description:
      "Hand-written lexer and Pratt parser, Hindley–Milner type inference, and an LLVM backend. Includes a REPL and a test suite of 300+ programs.",
    category: "Systems",
    year: "2025",
    stack: ["OCaml", "LLVM"],
    repo: "https://github.com/jaschrs",
  },
  {
    slug: "sightline",
    title: "Sightline",
    blurb: "On-device image search with CLIP embeddings.",
    description:
      "Indexes a local photo library with CLIP, stores vectors in an HNSW index, and answers natural-language queries in under 30ms.",
    category: "ML",
    year: "2025",
    stack: ["Python", "PyTorch", "FAISS"],
    repo: "https://github.com/jaschrs",
  },
  {
    slug: "dotctl",
    title: "dotctl",
    blurb: "Declarative dotfile manager for multiple machines.",
    description:
      "Symlinks, templating and per-host overrides from a single TOML file. Single static binary with zero runtime dependencies.",
    category: "Tools",
    year: "2025",
    stack: ["Go", "TOML"],
    repo: "https://github.com/jaschrs",
  },
  {
    slug: "courseplan",
    title: "CoursePlan",
    blurb: "Degree planner used by 1,500+ students.",
    description:
      "Drag-and-drop semester planner that checks prerequisites and graduation requirements against scraped catalog data.",
    category: "Web",
    year: "2024",
    stack: ["React", "Node.js", "PostgreSQL"],
    live: "https://example.com",
  },
];

export const skillGroups: { name: string; items: string[] }[] = [
  {
    name: "Languages",
    items: ["TypeScript", "Python", "Rust", "Go", "C", "C++", "Java", "OCaml", "SQL", "Bash"],
  },
  {
    name: "Frameworks",
    items: ["React", "Next.js", "Node.js", "Tailwind", "FastAPI", "PyTorch", "Express", "gRPC"],
  },
  {
    name: "Tools",
    items: ["Git", "Linux", "Docker", "Kubernetes", "PostgreSQL", "Redis", "AWS", "Neovim", "Figma", "Vercel"],
  },
];

export const coursework = [
  "Operating Systems",
  "Compilers",
  "Distributed Systems",
  "Algorithms",
  "Computer Networks",
  "Machine Learning",
];
