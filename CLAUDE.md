# CLAUDE.md

Guidance for Claude Code (and contributors) when working in this repository.

## Overview

`one-day-one-code` is a collection of daily web experiments. **Each numbered folder is a standalone project** — no cross-project dependencies, no workspace/monorepo tooling, and **no build step** (with one intentional exception: `04. pitek`, an Electron app). Everything else is static HTML/CSS/JS opened directly in the browser.

The repo root contains:
- `index.html` — the visual catalog that indexes every project. Project data lives in the `PROJECTS` array inside its `<script>`.
- Each project folder holds its own `preview.png` screenshot, referenced by the catalog via the `shot` field in `PROJECTS` (e.g. `"01. haystack-hunt /preview.png"`) and by that folder's `README.md` as `![Preview](preview.png)`.
- Per-folder `README.md` (and a root `README.md`).

## Projects

| Folder | Type | Stack | Entry |
| --- | --- | --- | --- |
| `01. haystack-hunt ` (note the trailing space) | Game 3D | Three.js + OrbitControls via CDN, single-file | `index.html` |
| `02. itachi-landing-page` | Cinematic landing page | Vanilla JS (`main.js`), CSS (`style.css`), frame sequence in `frames/` | `index.html` |
| `03. jangan-lupa-titik-koma` | Coding puzzle | Vanilla JS, single-file | `index.html` |
| `04. pitek` | Tool / App (Eagle-style asset manager) | **Electron + electron-vite + Svelte + TypeScript** (build step), sharp | `npm run dev` |

## Run / preview

Always use a local static server — do not rely on `file://` for projects that load modules or relative assets:

```bash
cd "<project folder>" && python3 -m http.server 8000   # open http://localhost:8000
```

- `01. haystack-hunt ` **needs an internet connection** (Three.js from a CDN, ES module imports).
- `02. itachi-landing-page` loads many images from `frames/` — run it through a server, not `file://`.
- `03` is fully static and safe to open directly.
- `04. pitek` is the **one project with a build step** — Electron + Vite + TypeScript, needs Node.js: `npm install`, then `npm run dev` (Electron window) or `npm run build` (→ `out/`). It is **not** a static-server project and is registered with `openable:false` in the catalog. `node_modules/`, `out/`, and `dist/` are git-ignored (via `04. pitek/.gitignore`).

## The catalog (`index.html`)

- **Language: English** for all catalog UI copy and project descriptions.
- **Views**: thumbnail (grid) and list. List view hides the screenshot and puts the action buttons on the right.
- **Filtering** lives in a **modal** (opened by the Filter button): single-select Category + multi-select Tech/Tags, plus free-text search. Active filters show as removable pills under the toolbar.
- **README modal**: the README button renders each project's README as markdown inside a modal. The markdown is **embedded** in `index.html` as `<script type="text/markdown" data-readme="<id>">…</script>` blocks so it renders even over `file://`. **Keep these blocks in sync** with the actual `README.md` files. Content must be flush-left (no indentation) inside the script block, and must not contain the literal `</script>`.
- **Mobile**: thumbnail grid is 2 columns; modals become bottom sheets.

## Adding a new project

1. Create a folder with the next number prefix (e.g. `04. project-name`).
2. Include an `index.html` entry and a `README.md` inside the folder (English).
3. Add a `preview.png` screenshot inside the project folder.
4. Register the project in the `PROJECTS` array in root `index.html` (`n`, `id`, `title`, `jp`, `cat`, `shot`, `folder`, `desc`, `tags`, `entry`, `openable`). If it's a new category, add it to `CATS`.
5. Add a matching `<script type="text/markdown" data-readme="<id>">` block with the README content.
6. Update the table in the root `README.md`.

### The `openable` field (the "Open project" button)

- Set `openable: true` **only** for static projects that open directly in the browser (HTML/CSS/JS) — the card shows an **Open project ↗** button.
- Set `openable: false` for projects that need a runtime/server (e.g. **Laravel**, **Node.js**, backends) — the Open button is **hidden** since they can't run from a file. Rely on the **README** button, and document the run command in the README.

## Screenshots

Screenshots are taken headless with Puppeteer (Chromium), 1280×800 @2x, each project served over local HTTP and captured after animation settles. Save each result as `preview.png` inside its project folder to match the `shot` field in `index.html`.

## Notes

- Don't add build/bundler tooling unless asked — "open directly in the browser" is part of the repo's design. **Exception:** `04. pitek` was intentionally built as an Electron app (electron-vite + Svelte + TypeScript) at the user's request; it's the one project with a build step. Keep new projects build-free unless the user explicitly asks otherwise.
- The folder name `01. haystack-hunt ` has a **trailing space** — quote the path in the shell.
