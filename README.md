# 🌺 Pulitzer Blitz Fitness

A preppy, postpartum-friendly workout tracker — think Obé Fitness energy with a
Lilly Pulitzer × Tory Burch color palette (hot pink, citrus, navy & gold) and a
lot of fun emojis. Built as a static web app, no backend required.

## What it does

- **Onboarding**: enter your name, baby's birth date, and delivery type.
- **Phase-based programs**: workouts are grouped into four postpartum phases —
  Newborn Bliss (0–2 wks), Gentle Bloom (2–6 wks), Sunshine Strength (6–12 wks),
  and Full Bloom (12+ wks). Strength-focused phases stay locked until you check
  "cleared by my provider" in Settings, matching real postpartum return-to-exercise
  guidance (clearance typically ~6 weeks after a vaginal birth, ~8–12 weeks after
  a C-section).
- **Categories**: Breathe & Connect, Sunshine Walks, Pelvic Floor, Postnatal
  Pilates, Sculpt & Tone, Dance Cardio, Strength, Stretch & Restore — filterable
  like Obé's class library.
- **Visual, text-based routines** (no video needed): every exercise step has a
  small icon pictogram plus an interactive visual —
  a tap-to-track rep/set dot tracker, or a countdown timer ring for
  timed holds and walks — so a workout isn't just a wall of text.
- **Progress tracking**: streaks, total workouts, fun milestone badges, and a
  28-day calendar heatmap with recent-workout history (📅 button).
- **Safety-first**: an upfront medical-clearance disclaimer, phase gating, and
  a safety note on every single workout (stop for leaking, pelvic pressure,
  pain, or incision pulling).
- **Installable (PWA)**: has a manifest + service worker, so it can be added
  to a phone home screen and works offline once loaded.
- **Gentle nudge**: a soft "haven't moved today?" banner appears only after a
  day off (not every single day) — dismissible, never nagging.
- **A personal touch**: an editable "love notes" list (Settings → 💌) rotates
  in alongside the built-in affirmations as a sweet surprise on the dashboard.
- **Kettlebell & resistance band content**: dedicated workouts for a fuller
  home-gym setup, not just bodyweight/dumbbells.

## Running it

No build step — it's plain HTML/CSS/JS.

```bash
# from the project root
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just open `index.html` directly in a browser (the service worker/manifest
need `http(s)://`, so use the local server for the full installable experience).

### Getting a real link (GitHub Pages)

A workflow at `.github/workflows/deploy-pages.yml` deploys the site on every
push to `main`. One-time setup (can't be done via API, just a couple of clicks):
in the repo, go to **Settings → Pages → Build and deployment → Source**, and
select **GitHub Actions**. After that, merging this branch to `main` will
publish the site automatically and give you a `https://<owner>.github.io/<repo>/`
link she can open on her phone and "Add to Home Screen."

## Project structure

```
index.html          entry point
css/style.css        theme + layout
js/data.js           phases, categories, and all workout content
js/icons.js          inline SVG pictogram icons + step-metric parsing
js/app.js            app state, rendering, localStorage persistence
manifest.json        PWA manifest (installable, home screen icon)
sw.js                offline app-shell service worker
icons/               app icons (SVG source + rasterized PNGs)
.github/workflows/   GitHub Pages deployment
```

## Notes

- All workout content is original — it does not reproduce any licensed video
  or class content from Obé or other services.
- This app is not medical advice. Always get clearance from an OB/midwife
  before starting or progressing a postpartum exercise routine.
