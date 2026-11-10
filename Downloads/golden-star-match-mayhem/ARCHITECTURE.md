# Project structure

The game is split into small files you can edit independently, then built into one file for release.

```
src/index.html        development page (loads every CSS/JS file below, in order)
src/css/              styles, loaded in this order
  00-keyframes.css      all @keyframes
  01-base.css           page, #app scaling shell, typography
  02-stage.css          battle stage: Golden Star, enemy, name card
  03-board.css          match board and the gem tiles
  04-hud.css            health bars, turn text, Nova Strike button
  05-menus.css          menus, pause, dialogue box, choices, tutorial card
  06-fx.css             letterbox, super-move title, burst, shakes, projectiles
  07-intro.css          animated intro (SDT breach + Volta Chronicles)
  08-layout.css         portrait / landscape / tablet / desktop overrides
  09-cutscene.css       cutscene stage
  10-progress.css       Upgrades page
src/js/               scripts, loaded in this order (all share one global scope)
  00-assets.js          GENERATED sprite/art data (see tools/gen-assets.js)
  10-core.js            helpers, layout scaling, pause flag
  20-audio.js           synthesized sound, vibration, music drone
  25-state.js           shared game state variables
  30-board.js           board engine, matching, enemy AI, HUD, fight setup
  35-effects.js         strike animations, projectiles, boss slam, Nova cameo
  40-dialogue.js        typewriter text, dialogue scenes, info panels
  45-tutorial.js        first-mission tutorial (hand animation + coach cards)
  50-story.js           chapters, decisions, endings, fight rewards flow
  55-endless.js         endless mode and run upgrades
  60-nav.js             screens, back/forward history, pause, keyboard/gamepad
  62-cutscenes.js       cutscene engine and the cutscene scripts
  65-progress.js        levels, XP, upgrade definitions, Upgrades menu
  70-intro.js           animated intro sequence
  99-main.js            event wiring and start-up
assets/               source images (sprites, menu art, intro pieces)
tools/gen-assets.js   rebuilds src/js/00-assets.js from /assets
build.js              inlines everything into dist/index.html
dist/                 release build (single file + PWA files)
store/                Android (Capacitor) and desktop (Electron) wrappers
```

## Common tasks
- **Run while developing:** `npm run dev` then open http://localhost:8000 (edits to src/ show on refresh)
- **Replace a sprite:** overwrite the file in `assets/sprites/`, run `npm run assets`, then `npm run build`
- **Release build:** `npm run build` (output in `dist/`)
- **Add a story beat:** edit the `ST` list in `src/js/50-story.js`
- **Add or edit a cutscene:** edit `CUTS` in `src/js/62-cutscenes.js` (steps are documented at the top of that file)
- **Tune levels and upgrades:** `UPG`, `xpNeed` and `baseMD` in `src/js/65-progress.js`
