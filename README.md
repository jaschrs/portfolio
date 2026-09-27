# Portfolio

Personal portfolio for Jasper Christian: a dark, gradient-free, interaction-heavy site built with Next.js (App Router), TypeScript, Tailwind CSS v4 and Motion.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Editing content

All text (profile, experience, projects, skills, links) lives in **`lib/data.ts`**. Replace the placeholder entries there; no component changes needed.

- Portrait: put your photo in `public/` (e.g. `public/me.jpg`) and set `photo: "/me.jpg"` in `lib/data.ts`. Until then the hero shows a placeholder silhouette.
- Résumé: drop a `resume.pdf` into `public/` (linked from the command menu and terminal).
- Accent color: `--accent` in `app/globals.css`.

## Things to try

- `⌘K` / `Ctrl+K`: command menu.
- Type `help` in the About terminal.
- Hover project cards, then click one for details.
- Type letters while the Skills keyboard is on screen.
- ↑ ↑ ↓ ↓ ← → ← → B A
