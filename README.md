# 🗂️ One Day One Code

A collection of daily web experiments — one day, one project. Each folder holds a single **self-contained** project that opens straight in the browser with no build step.

👉 Open **[`index.html`](index.html)** at the root for a **visual catalog** of every project (with screenshots, categories, a filter modal, and readable READMEs).

## Projects

| # | Project | Category | Summary |
| --- | --- | --- | --- |
| 01 | [Haystack Hunt](01.%20haystack-hunt%20/) | 🎮 Game 3D | Find the needle in a haystack — dig strand by strand (Three.js). |
| 02 | [Uchiha Itachi](02.%20itachi-landing-page/) | 🎬 Landing Page | Cinematic landing page with scroll-driven frame animation. |
| 03 | [Jangan Lupa Titik Koma](03.%20jangan-lupa-titik-koma/) | 🧩 Game Puzzle | Find the one line of code missing a `;` among thousands. |

## Running the catalog & projects

Everything is static HTML. The safest way to run it (so CDN modules & relative assets load) is a local server:

```bash
# from the repo root — to open the catalog
python3 -m http.server 8000
# then open http://localhost:8000

# or go straight into one project
cd "01. haystack-hunt " && python3 -m http.server 8000
```

Purely static projects (e.g. `03`) can also be opened by double-clicking `index.html`.

## Repo structure

```
one-day-one-code/
├── index.html                    # Visual catalog of all projects
├── README.md                     # This file
├── CLAUDE.md                     # Guidance for agents/contributors
├── favicon.svg                   # Catalog favicon
├── 01. haystack-hunt /           # Game 3D (Three.js) + preview.png
├── 02. itachi-landing-page/      # Landing page + frames/ + preview.png
└── 03. jangan-lupa-titik-koma/   # Coding puzzle + preview.png
```

## Categories

- **🎮 Game 3D** — interactive WebGL/Three.js projects.
- **🎬 Landing Page** — cinematic presentation pages with animation.
- **🧩 Game Puzzle** — lightweight DOM/JS logic games.

---

Each folder has its own `README.md` with technical details, controls, and how to run it.
