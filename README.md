# Let it Cast

The performance layer of global casting — pitch site, investor demo canvas, and clickable mobile demo.

## Pages

- **`landing.html`** — public marketing landing page (hero, problem, product, moat, traction, pricing, team, use of funds, CTA).
- **`index.html`** — investor demo canvas: pan/zoom design canvas with every screen of the product (talent mobile journey, 3 self-tape layouts, submission flow, production desktop back-end, social feed, talent recruiter, landing preview, design system).
- **`demo.html`** — clickable mobile demo for investor walkthroughs. End-to-end flow:
  1. Maya browses the casting feed and opens **Evermore**
  2. Reads the brief (sides, pay, deadline)
  3. Self-tapes using the **Director layout** (cam + sides split, AI framing/audio feedback)
  4. Reviews the take, submits, watches encoding, lands on confirmation

## Run locally

No build step — React loads via CDN and Babel compiles the JSX in-browser.

```bash
python3 -m http.server 5173
```

Then open one of:
- http://localhost:5173/landing.html
- http://localhost:5173/index.html
- http://localhost:5173/demo.html

Any static-file server works (`npx serve .`, `php -S localhost:5173`, etc).

## Source layout

| File | Purpose |
| --- | --- |
| `tokens.css` | Design tokens (colors, fonts, radii, shadows) |
| `lib.jsx` | Shared atoms: `LicLogo`, `Chip`, `Btn`, `Avatar`, `Portrait`, icons, copy dictionary (EN/FR), personas, sample castings |
| `screens-mobile.jsx` | Mobile screens: talent profile, casting feed, casting detail, my-auditions, submission flow (review/uploading/done) |
| `selftape.jsx` | Self-tape recorder — 3 interactive layouts (Classic, Teleprompter, **Director**) |
| `screens-desktop.jsx` | Desktop screens: casting dashboard, auditions review (classic + grid compare) |
| `screens-social.jsx` | LinkedIn-style social feed + talent recruiter back-office |
| `design-canvas.jsx` | Pan/zoom canvas wrapper used by `index.html` |
| `tweaks-panel.jsx` | Floating tweaks panel (language EN/FR, review layout) |
| `app.jsx` | Wires every screen into the investor demo canvas |
| `demo.jsx` | State machine for the clickable mobile demo (`demo.html`) |

## Stack

- React 18 (UMD via unpkg)
- Babel Standalone (compiles JSX in-browser)
- Plain CSS + design tokens, no preprocessor

For production, port each screen to your target framework. Match the visual
output; the prototype structure is not the production architecture.
