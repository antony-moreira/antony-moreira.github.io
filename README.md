# Portfolio

Personal portfolio built with [Astro](https://astro.build), in English (`/`) and Brazilian Portuguese (`/pt-br/`).
Published on GitHub Pages at https://antony-moreira.github.io.

## Editing content

| File | What |
|---|---|
| [`src/data/site.ts`](src/data/site.ts) | profile, stats, experience timeline (from the LinkedIn resume), education, skills |
| [`src/data/projects.ts`](src/data/projects.ts) | project pages: overview, highlights, architecture layers, how it works, design decisions (why / trade-off), challenges, apps, screenshot gallery |
| [`src/i18n/ui.ts`](src/i18n/ui.ts) | UI labels and the per-language routes (`home`, `projectBase`) |
| [`src/components/ClusterDiagram.astro`](src/components/ClusterDiagram.astro) | inline SVG diagram of the Kubernetes cluster (theme-aware), shown when a project has `diagram: 'cluster'` |

Every text field has both languages (`{ 'pt-br': …, en: … }`). To add a project, append an entry to `projects`;
its pages are generated at `/projects/<slug>/` and `/pt-br/projetos/<slug>/`.

Project content comes from the private `terraform-homelab` repo (`docs/decisions.md`, `docs/incidents/`,
`argocd/README.md`) and the public `homelab` repo README.

## Public site — what never goes in

This site is public. Never publish internal IPs, internal domains (`*.home.…`, `*.k8s.home.…`), email
addresses, phone numbers, Telegram chat IDs, tokens or other people's names. Keep the private repo unlinked.

## Screenshots

Served from `public/screens/*.webp` (max 1600 px wide, WebP q82). Workflow:

1. Raw captures go to `~/Downloads/portfolio-prints/` (not in git) — full-screen, address bar hidden.
2. Crop and blur with Pillow: crop to the useful area; blur IP columns (Headlamp nodes, Proxmox nodes),
   emails (Argo CD commit author) and drop address bars, torrent indexer lists and unrelated alerts.
3. Check every processed image visually before committing.
4. Add it to the project's `gallery` in `projects.ts` with `shot('<file>', 'pt caption', 'en caption', wide?)`.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Deploy

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the
site and publishes it to GitHub Pages (Settings → Pages → Source: **GitHub Actions**). A deploy takes ~1–2 min.
