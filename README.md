# website

Personal site, project docs and blog, built with [Zensical](https://zensical.org).

## Develop

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/zensical serve
```

Open http://localhost:8000. `zensical build` writes the static site to `site/`.

## Layout

- `zensical.toml`: site config, navigation, theme and social links.
- `docs/index.md`, `experience.md`, `contact.md`: the portfolio pages.
- `docs/projects/index.md`: the project overview cards.
- `docs/projects/<project>/`: one folder per project, served at
  `/projects/<project>/`. To add a project, create
  `docs/projects/<slug>/index.md`, then add it to the nav in `zensical.toml`
  and to the cards in `docs/projects/index.md`.
- `docs/blog/posts/`: blog posts (front matter needs a `date`).

## Deploy

Vercel builds from `vercel.json`: it installs `requirements.txt`, runs
`zensical build --clean` and serves `site/`. Set `site_url` in `zensical.toml`
to the real domain.
