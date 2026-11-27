# Portfolio

Personal portfolio built with [Astro](https://astro.build), in Brazilian Portuguese (`/`) and English (`/en/`).
Published on GitHub Pages at https://antony-moreira.github.io.

## Editing content

All text lives in [`src/data/site.ts`](src/data/site.ts) (profile, skills, projects, both languages).
UI labels are in [`src/i18n/ui.ts`](src/i18n/ui.ts).

To add a project, append an entry to `projects` in `site.ts`; its pages are generated at
`/projetos/<slug>/` and `/en/projects/<slug>/`.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Deploy

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the
site and publishes it to GitHub Pages (Settings → Pages → Source: **GitHub Actions**).
