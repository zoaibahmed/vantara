# Vantara visual and functional QA

## Browser coverage

Chrome rendered the eight public routes at 1440, 1024, 768, 390 and 360px. The matrix records each HTTP status, document overflow, image failures and page exceptions. Full-page and first-viewport PNGs are saved in artifacts/global-first with the route and viewport width in the filename. All 40 views returned HTTP 200 with no horizontal overflow, failed images or browser page exceptions. The 80 screenshots use reduced motion for stable route review. Normal-motion journey captures are separate.

Desktop review compared the cover scale and image treatment across routes. Mobile review checked the first-view actions and the order of the full-page sections. Refinements included a shorter candidate cover, an improved home image crop, a dedicated full-bleed Hospitality opening, and a compact contact introduction. Journey captions now render independently of the photo crossfade.

## Interaction and submission checks

- Desktop scroll reached stages 1, 3 and 5 and returned through 3 and 1. The story held at the 132px desktop header boundary during the sampled scroll range. Screenshots include the start, middle and end.
- Industry tabs selected with the arrow keys. The test verified that the selected industry and region reached the corresponding fields in the CV builder.
- At 360px the menu contained all seven routes, closed on Escape and returned focus to its trigger. Both home cover actions were within the first viewport and passed a hit test at 360px. The reduced-motion timeline rendered all five stages.
- At 390px, all four Hospitality departments opened by keyboard, each exposed four role entries, and the registration link reached the legacy candidate form. The candidate FAQ opened with Enter and the Contact employer form rendered.
- The mobile CV browser run exercised required-field feedback, focus on the first invalid field, all five steps, editing, data retention, PDF download and successful mocked submission. It checked employer form labels and legacy candidate file-type feedback.
- PDF checks covered international characters in the documented repertoire and a sixteen-page history, with text bounds checked and the first and last pages rendered for review.
- Thirty-seven mocked submission checks covered validation, field mapping, upload guards, all three API handlers and email delivery error paths. No live email was sent.
- The image endpoint returned WebP at four widths. A repeated request returned a cache hit. See image-http-measurements.json.

## Evidence and limits

The Next.js production build completed, including type validation and static generation for all public routes. The final browser pass also checked the latest route styling.

- Browser scripts: capture.cjs, check-interactions.cjs and test-forms-browser.cjs in this directory.
- Browser output: artifacts/global-first/matrix.json, interactions.json and the route screenshots.
- Forms and PDF evidence: forms-browser-results.json, pdf-test-results.json and the PDF render samples in this directory.
- Chrome used emulated viewports. Physical phones, Safari and Firefox were outside this run. The checks cover the tested interactions and viewport sizes. They are not a formal accessibility certification.
- Live SMTP delivery and production CDN performance were outside this run. The previously exposed credential still requires rotation by the account owner.
