# Luxury editorial redesign — 4 November 2026

This iteration replaces the earlier shared-styling-only approach with route-specific compositions and interactions.

## References researched

- Aman, https://www.aman.com/hotels-and-resorts — destination hierarchy and hospitality-focused content.
- Rosewood, https://www.rosewoodhotels.com/en/default — stories, places and clear discovery pathways.
- Positioner, https://www.positioner.com/corporate/awards — hospitality portfolio including Constance, The Brecon and ROMEO; useful reference for balancing atmosphere with conversion.

These are creative references, not templates copied into Vantara. Original brand colours and fonts remain.

## Implemented across all routes

- Home: full photographic opening, inset introduction, centered people narrative, staggered corridor stories, operational panorama, interactive department gallery, numbered process and conversion flow.
- Solutions: editorial cover and panoramic image; expandable department chapters retain all role descriptions and employer links.
- Workforce: portrait cover, revised workforce dossiers, original candidate registration retained.
- Destinations: landscape cover, full photographic chapters with alternating inset editorial sheets; existing demand/logistics details retained.
- About: centered manifesto, hospitality portrait, long-form story, principles expressed as rows, forest corporate section.
- How It Works: manifesto cover, linear process, retained responsibility matrix and FAQs, compact conversion band.
- Contact: champagne invitation, compact photographic inset, spacious grouped consultation form with underlined fields.
- Global Recruitment: portrait opening, staggered regional collection, expandable industry directory, refined CV workspace. Region/industry selection remains connected to the original CV state.

## Motion

`PageOpening` uses restrained Framer scroll-linked image movement. `EditorialMotion` animates below-fold headings and major compositions as they enter view; content stays readable before JavaScript. Native details use brief entrance transitions. Lenis handles anchors and smooth wheel input, and now responds to changes in reduced-motion preferences. No scroll hijacking, timed preload screen, infinite animation or cursor replacement.

## Verification

Production build, TypeScript and all eight route response/layout checks passed. Viewports checked: 320, 390, 768, 1100, 1280 and 1920px. Mobile menu focus, Escape, candidate modal handoff and reduced-motion checks passed. Region and industry selection was exercised through CV step 2 with preview-only data; no application or email was sent. Service accordion expansion passed. Full-page desktop/mobile screenshots were captured in `artifacts/` and reviewed for crop, hierarchy and spacing.

## Image provenance

Existing local images were reused. Additional hospitality files are local copies of image endpoints already present in the project, requested at higher resolution:

- resort-panorama.jpg — https://images.unsplash.com/photo-1566073771259-6a8506099945
- culinary-service.jpg — https://images.unsplash.com/photo-1577219491135-ce391730fb2c
- kitchen-brigade.jpg — https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf
- restaurant-terrace.jpg — https://images.unsplash.com/photo-1559339352-11d035aa65de

New regional references verified through image search:

- region-latin-america.jpg — Davi Costa, Rio de Janeiro: https://unsplash.com/photos/6jjpJwU0JmY
- region-australia.jpg — Luke White, Sydney Opera House: https://unsplash.com/photos/FH4W08WmINA
- region-new-zealand.jpg — Jade Stephens, Fiordland: https://unsplash.com/photos/T-FSAK4Bv9c

Photography illustrates the service and destinations; it is not evidence of Vantara employees, placements or partnerships. Existing company claims and backend submission logic were retained. The source repository did not include a complete asset-rights ledger.
