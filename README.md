# Portfolio

Personal portfolio for Jasper Christian, built with Next.js (App Router), TypeScript, Tailwind CSS v4, Motion and React Three Fiber. An F-16 flies across a live sky as you scroll.

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
- F-16: download the [Low-Poly F-16 Fighting Falcon](https://sketchfab.com/3d-models/low-poly-f-16-fighting-falcon-f175493965f545bfa975575846151216) by Caelin (CC BY 4.0) as glTF/.glb and save it as `public/models/f16.glb`. Until then a placeholder jet flies. If its nose doesn't point left in the hero, change `jet.rotation` in `lib/data.ts` (degrees, e.g. `[0, 90, 0]`). Keep the footer credit; the license requires it.
- Résumé: drop a `resume.pdf` into `public/` (linked from the command menu and terminal).
- Accent color: `--accent` in `app/globals.css`.

## Things to try

- `⌘K` / `Ctrl+K`: command menu.
- Type `help` in the About terminal.
- Hover project cards, then click one for details.
- Type letters while the Skills keyboard is on screen.
- ↑ ↑ ↓ ↓ ← → ← → B A
