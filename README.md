# 🗂️ One Day One Code

A collection of daily web experiments — one day, one project. Each folder holds a single **self-contained** project that opens straight in the browser with no build step.

👉 Open **[`index.html`](index.html)** at the root for a **visual catalog** of every project (with screenshots, categories, a filter modal, and readable READMEs).

## Projects

| # | Project | Category | Summary |
| --- | --- | --- | --- |
| 01 | [Haystack Hunt](01.%20haystack-hunt%20/) | 🎮 Game 3D | Find the needle in a haystack — dig strand by strand (Three.js). |
| 02 | [Uchiha Itachi](02.%20itachi-landing-page/) | 🎬 Landing Page | Cinematic landing page with scroll-driven frame animation. |
| 03 | [Jangan Lupa Titik Koma](03.%20jangan-lupa-titik-koma/) | 🧩 Game Puzzle | Find the one line of code missing a `;` among thousands. |
| 04 | [Lab Coding Blok](04.%20block-coding-for-basic-logic-lab/) | 🎓 Education | Visual block-coding lab — snap blocks (move/loop/if) into a program and run it. 5 levels, 17 challenges. |
| 05 | [Check Khodam](05.%20check-khodam/) | 🎲 Fun / Toy | A tongue-in-cheek "cek khodam" generator — type a name, get a random guardian spirit. |
| 06 | [Pasar Saham Virtual](06.%20investment-simulator/) | 🎓 Education | Virtual investing simulator (SCORM/PWA) — manage Rp 10M across 5 rounds of economic news. |
| 07 | [Gizi Seimbang](07.%20nutrition-health-literacy-game/) | 🎓 Education | Drag-and-drop nutrition game — build balanced meals with live calorie & macro scoring. |
| 08 | [Foliage Coffee](08.%20coffee-shop/) | 🎬 Landing Page | Warm, editorial landing page for a slow coffee bar — floating cup hero, story, menu & beans. |
| 09 | [Luminary Studio](09.%20digital-agency/) | 🎬 Landing Page | Bold dark landing page for a creative digital agency, with animated stats. |
| 10 | [VELOURA](10.%20fashion-brand/) | 🎬 Landing Page | Editorial fashion landing page (AW 2025) — split hero, product grid & manifesto. |
| 11 | [Aurum](11.%20fine-dining/) | 🎬 Landing Page | Luxury fine-dining landing page — dark-and-gold hero, tasting menu & reservations. |
| 12 | [IRONFORGE Gym](12.%20fitness-gym/) | 🎬 Landing Page | High-energy gym landing page — oversized type, pricing tiers & class schedule. |
| 13 | [Axion AI](13.%20saas-ai-assistant/) | 🎬 Landing Page | Clean SaaS landing page for an AI assistant — dashboard-mockup hero, pricing & FAQ. |

## Running the catalog & projects

Everything is static HTML. The safest way to run it (so CDN modules & relative assets load) is a local server:

```bash
# from the repo root — to open the catalog
python3 -m http.server 8000
# then open http://localhost:8000

# or go straight into one project
cd "01. haystack-hunt " && python3 -m http.server 8000
```

Purely static projects (e.g. `03`, `04`, `05`, `07`, and the landing pages `08`–`13`) can also be opened by double-clicking `index.html`.

> **`06. investment-simulator`** needs an HTTP origin (Service Worker / PWA manifest), so run it through a local server rather than `file://`. It's still static — no backend required.

## Repo structure

```
one-day-one-code/
├── index.html                          # Visual catalog of all projects
├── README.md                           # This file
├── CLAUDE.md                           # Guidance for agents/contributors
├── favicon.svg                         # Catalog favicon
├── 01. haystack-hunt /                 # Game 3D (Three.js) + preview.png
├── 02. itachi-landing-page/            # Landing page + frames/ + preview.png
├── 03. jangan-lupa-titik-koma/         # Coding puzzle + preview.png
├── 04. block-coding-for-basic-logic-lab/  # Block-coding lab + preview.png
├── 05. check-khodam/                   # "Cek khodam" toy + preview.png
├── 06. investment-simulator/           # Virtual stock market (SCORM/PWA) + preview.png
├── 07. nutrition-health-literacy-game/ # Nutrition game + preview.png
├── 08. coffee-shop/                    # Coffee-bar landing page + preview.png
├── 09. digital-agency/                 # Agency landing page + preview.png
├── 10. fashion-brand/                  # Fashion landing page + preview.png
├── 11. fine-dining/                    # Restaurant landing page + preview.png
├── 12. fitness-gym/                    # Gym landing page + preview.png
└── 13. saas-ai-assistant/              # SaaS landing page + preview.png
```

## Categories

- **🎮 Game 3D** — interactive WebGL/Three.js projects.
- **🎬 Landing Page** — cinematic presentation pages with animation.
- **🧩 Game Puzzle** — lightweight DOM/JS logic games.
- **🧰 Tool / App** — utilities & apps that need a runtime (e.g. Electron).
- **🎓 Education** — interactive learning labs & games (Ruang Murid, Rumah Pendidikan).
- **🎲 Fun / Toy** — small novelty/meme web toys.

---

Each folder has its own `README.md` with technical details, controls, and how to run it.
