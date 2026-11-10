# Golden Star: Match Mayhem

A Volta Chronicles match-3 brawler by Super Duper Techno. **Beta 0.3 (prototype).**

Match tiles to fight. Every color has a power, the enemy takes turns on the same board, and your story choices change the ending.

## Features
- Animated intro (SDT breach sequence, then Volta Chronicles)
- Story mode: 6 chapters, 5 decisions with consequences, 3 endings; Endless mode with upgrades and bosses
- Animated sprites, strike animations for 3/4/5/6+ matches, tutorial, sound, vibration
- Character levels (up to 20), XP, and an Upgrades menu for Golden Star and Nova
- Animated cutscenes (opening, boss arrival, three endings)
- Pause menu, back/forward navigation, settings, keyboard and gamepad support
- Responsive from phones to ultrawide monitors; installable as a PWA (offline)
- Placeholders: Multiplayer, more characters, story update

## Run
- Play the release build: `npm run build`, then `npm run serve` and visit http://localhost:8000
- Develop: `npm run dev` (serves the split source in `src/`). See `ARCHITECTURE.md` for the file map.

Deploy: push to `main`; the workflow in `.github/workflows/pages.yml` builds and publishes to GitHub Pages (Settings > Pages > Source: GitHub Actions).

Store builds (Android, Steam/Epic desktop): see `PUBLISHING.md`.

(c) Super Duper Techno. License: to be decided.
