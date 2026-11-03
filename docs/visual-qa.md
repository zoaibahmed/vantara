# Visual QA — 3 November 2026

## Passed

- Production build: `VANTARA_DIST_DIR=.next-build npm run build` (set with PowerShell `$env:VANTARA_DIST_DIR='.next-build'`). Compilation, lint/type checking, static generation and build traces completed; all eight public routes and three existing API routes retained.
- `npx tsc --noEmit` passed during implementation. `git diff --check` passed.
- Headless installed Chrome / Playwright rendered the actual Next application. Viewed and critiqued desktop home/footer, mobile home/menu/contact screenshots.
- All eight public routes returned HTTP 200. No document horizontal overflow at **320, 768, 1100, 1280 and 1920px**. Additional 390px checks passed on all routes.
- Confirmed generated Plus Jakarta Sans font is applied, desktop header height is 132px, and desktop home has no horizontal overflow at 1440px.
- Mobile menu retains all seven navigation links. Escape closes the native dialog; focus returns to the menu trigger. Keyboard focus stays inside the menu.
- Candidate registration opens from mobile navigation; focus stays in the modal, Escape dismisses it, and background inertness is restored.
- Reduced-motion emulation disables the mobile drawer animation. Framer Motion policy uses the user preference; Lenis retains its existing reduced-motion guard.
- No JavaScript runtime errors during the responsive/interaction sweep.

## Corrections made during rendered QA

- Narrow header CTA visibility needed a more specific selector to prevent the shared button rule from overriding it. Corrected; menu remains visible at 320px.
- Contact hero's existing external image failed to load. Replaced it with local `/images/custom/corridor-reception.jpg`.
- Footer image was changed to the existing local food-and-beverage staff portrait rather than a meeting composition.
- Browser automation now waits for hydration before interacting with freshly compiled routes.

## Evidence

- `artifacts/desktop-home.png`
- `artifacts/desktop-footer.png`
- `artifacts/mobile-home.png`
- `artifacts/mobile-menu.png`
- `artifacts/mobile-contact.png`
- `artifacts/preview.cjs` and `artifacts/responsive-qa.cjs` contain the browser checks. Playwright was installed in the system temporary directory (`vantara-preview`), not added to application dependencies.

Preview used port 3100 and an isolated `.next-preview` build directory because port 3000 already had a development server. `next.config.mjs` supports `VANTARA_DIST_DIR` for isolated verification; the normal default remains `.next`. Generated QA directories are ignored by Git.

## Limits and remaining work

No real applications or emails were submitted. SMTP delivery, CV upload/PDF generation and the entire CV wizard were not exercised end to end; their existing service/API logic is unchanged. External photography availability and licensing still need a content pass. These are Chrome layout and interaction checks, not a full cross-browser accessibility audit. Bespoke recomposition of supporting-page sections remains outlined in `docs/design-audit.md`.
