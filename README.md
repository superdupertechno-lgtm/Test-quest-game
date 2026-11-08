# Golden Star: Match Mayhem

A Volta Chronicles match-3 brawler by Super Duper Techno. **Beta 0.3 (prototype).**

Match tiles to fight. Every color has a power, the enemy takes turns on the same board, and your story choices change the ending.

## Features
- Animated intro (SDT breach sequence, then Volta Chronicles)
- Story mode: 6 chapters, 5 decisions with consequences, 3 endings
- Endless mode with upgrades and a boss every 10th wave
- Animated Golden Star and enemy sprites, strike animations for 3/4/5/6+ matches
- First-mission tutorial, sound effects, per-stage vibration, mobile portrait and landscape layouts
- Placeholders: Multiplayer, more characters, story update (coming soon)

## Play / test
It is a single self-contained file with no build step and no dependencies.

- **Locally:** open `index.html` in a browser, or run `python3 -m http.server 8000` and visit http://localhost:8000
- **GitHub Pages:** push to `main`. The included workflow (`.github/workflows/pages.yml`) deploys it. In the repo go to Settings > Pages and set Source to **GitHub Actions**. The site will be at `https://<user-or-org>.github.io/<repo>/`

Progress, best endless wave, and sound/vibration settings are stored in the browser (`localStorage`).

## Notes
- Sound starts after the first tap (browser autoplay rules). Phone vibration works on Android browsers only.
- Sprites, logos and story text are embedded in `index.html`.

(c) Super Duper Techno. License: to be decided.
