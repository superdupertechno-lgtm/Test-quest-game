# Publishing checklist: Google Play, Steam, Epic Games Store

The game is built from the split source in `src/` into one self-contained web build (`dist/index.html`) with `npm run build`. Store builds wrap it:
- **Google Play:** Capacitor Android app (see `store/android/README.md`)
- **Steam and Epic:** Electron desktop app (`store/desktop/main.js`, `npm run desktop:build`)
- **Web/PWA:** deployed via GitHub Pages or your own host

## What is already done
- Pause menu, in-game back handling (Android back / browser back opens Pause), main menu with sub-menus, settings, credits
- Keyboard (arrows/WASD, Enter, Esc, P) and gamepad (stick/D-pad, A, B, Start) controls
- Layout scales for phones (portrait and landscape), tablets, laptops and ultrawide monitors
- PWA manifest, service worker (offline), icons, social preview image, Play feature graphic
- Electron and Capacitor scaffolding

## What you still need (I cannot do these for you)
1. **Accounts and fees.** Google Play developer account, Steamworks partner account with an app fee, Epic developer account and game approval. Check current fees and review times on each store.
2. **Real-device testing.** I could only run logic tests here. Test on: Galaxy S23, iPhone 17 Pro Max, an iPad or Galaxy Tab (portrait and landscape), a 13 inch and a 16 inch laptop, and your ultrawide monitor. Fix anything that looks off using the matrix below.
3. **Legal and policy.** Privacy policy URL (the game stores progress locally only, no accounts or analytics). Age rating questionnaires. Content licensing: confirm you own or have licensed every sprite, logo and sound. **If any art, music or text was made with generative AI, disclose it:** Steam, Google Play and Epic all have AI-content disclosure rules. Avoid trademarked third-party names in store text.
4. **Store assets.** Screenshots per store, capsule/header art (Steam), trailer, descriptions. `icons/store-icon-1024.png`, `icons/play-feature-graphic-1024x500.png` and `og.png` are starting points.
5. **Signing and versions.** Android: create and back up your upload keystore (never commit it). Desktop: code-signing certificate for Windows/macOS to avoid SmartScreen/Gatekeeper warnings.
6. **Steam specifics.** Steamworks SDK is needed only for achievements, cloud saves or overlay. A basic Electron build can ship without it, but test the Steam overlay and controller config (Steam Input) before release.
7. **Epic specifics.** Epic requires an approved store page and a build uploaded with their tools. Online services (EOS) are optional.
8. **Multiplayer.** Currently a placeholder. Online play will need a server and anti-cheat/moderation planning; store pages should not advertise it until it exists.

## Display test matrix
| Device | Typical viewport | Expected layout |
|---|---|---|
| Galaxy S23 | 360 x ~740 portrait, ~780 x 340 landscape | fluid, no scaling |
| iPhone 17 Pro Max | 440 x ~800 portrait, ~950 x 400 landscape | fluid, no scaling |
| iPad / Galaxy Tab | 800 x 1200 portrait, 1280 x 800 landscape | scaled 1.3x to 1.5x |
| 13 inch laptop | 1440 x ~780 | landscape, scaled ~1.1x |
| 16 inch laptop | 1728 x ~990 | landscape, scaled ~1.4x |
| Ultrawide monitor | 5120 x ~1300 | landscape, scaled ~1.9x, content centered |

Quick check without devices: Chrome DevTools > device toolbar, pick each preset or enter custom sizes, rotate, and reload.
