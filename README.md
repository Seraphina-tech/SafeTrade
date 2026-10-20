# SafeTrade

SafeTrade is a static, interactive concept website for **SafeTrade — Smart Connected Safety Helmet for Welding Trades**, by Team Abacus for Smart India Hackathon 2026.

## Run locally

No build step, package manager, backend, or framework is required.

1. Open `index.html` in a modern browser, or serve this folder with any static-file server.
2. For example, from this folder run `npx serve .` if Node.js is installed, then open the local URL printed by the server.

The website uses relative paths for its local CSS, JavaScript, and visual assets. It works without external font, image, or script requests.

## Deploy to Vercel

Import this folder as a project in Vercel and deploy it as a static site. No framework preset, build command, output directory, environment variables, or server-side functions are needed. The root `index.html` is the site entry point.

## Included interactions

- Responsive navigation with a mobile menu
- Selectable concept sensor explorer
- Interactive system diagram with local-alert and connected-path highlights
- Selectable five-stage workflow
- Browser-only concept simulation with editable example values and thresholds, validation, reset, and illustrative event preview
- Interactive connectivity demonstration showing illustrative gateway events queued while internet access is unavailable
- Scroll reveals and subtle motion, with `prefers-reduced-motion` support

## Local visuals and portraits

Image directories are organized under `assets/images/` for the hero, problem, solution, engineering, case study, team, and mentor areas. The hero, problem, solution, and case-study sections use the existing local JPEG assets. The engineering system overview is a local SVG concept illustration, not a photograph or a depiction of tested hardware. The case-study image is presented as workshop-visit context only; it does not represent prototype testing. Team and mentor sections use the supplied local portraits with their displayed names, team roles, mentor titles, and institution.

## Concept and safety notice

The architecture, sensor descriptions, sample values, and threshold comparisons are illustrative concepts only. The simulation runs entirely in the browser and is not connected to hardware; it does not demonstrate validated sensor performance or actual hazard detection. SafeTrade is intended to supplement certified protective equipment and established welding-safety procedures, not replace them.
