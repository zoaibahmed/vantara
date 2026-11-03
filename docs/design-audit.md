# Vantara — design audit and implementation plan

## Scope and route inventory

Public routes: `/`, `/solutions`, `/workforce`, `/global-recruitment`, `/how-it-works`, `/destinations`, `/about`, `/contact`. Metadata route: `/sitemap.xml`.

`app/layout.tsx` loads fonts and global CSS. `ClientLayout` owns Lenis, page transitions, Header, Footer, candidate modal and the development inspector. Home composes seven narrative scenes. Supporting routes mostly repeat `page-hero` / `page-hero-grid`; Global Recruitment composes destination/industry selection, workforce categories, process, CV builder, employer CTA and FAQs.

Submission flows retained: EmployerRequestForm → employerRequest service → POST `/api/employer-request`; WorkerForm and WorkerModal → candidateApplication service → POST `/api/candidate-application` (JSON or multipart CV); CandidateCVBuilder → POST `/api/global-recruitment/candidates`, with CV preview/PDF generation. SMTP delivery remains server-side. No real applications are sent during visual QA.

## Findings

- **Typography:** Next font variables existed but the design tokens referenced family names instead of their generated font bindings. Uppercase multi-line headings, lightweight italics and repeated uppercase labels compete for attention. Body and interface hierarchy lacked enough differentiation.
- **Composition:** almost every supporting page uses the same evenly balanced text/image hero; home relies on repeated cards and split compositions. Card rounding, float shadows and repeated borders make distinct content feel interchangeable.
- **Navigation:** seven links plus candidate and employer actions share one desktop row until 1100px. Crowding precedes the mobile breakpoint. Mobile drawer was visually hidden rather than semantically closed, lacked focus containment and restoration, and had no current-page semantics.
- **Colour:** ivory dominates, sand surfaces repeat, forest mostly decorates controls. Radial washes soften the composition without adding meaning. Footer repeats the pale-page treatment rather than establishing a strong ending.
- **Images:** a useful local hospitality library exists, mixed with Unsplash, Pexels, Magnific and temporary OpenAI URLs. Rounded frames and generic meeting imagery weaken subject specificity. Image optimization is globally disabled in existing Next config. Asset ownership/authenticity and external availability require a separate content review; do not imply pictured people are actual placements.
- **Spacing:** existing containers are useful, but individually hardcoded spacing, type and grids inside TSX prevent a consistent rhythm. Fixed-height media and long uppercase headlines can unbalance smaller screens.
- **Interaction:** blocking preloader, replacement cursor, route movement and repeated scroll reveals add friction. CSS reduced-motion rules alone cannot govern Framer or imperative scrolling. Modal had no focus containment.
- **Forms:** sound functional separation of employer and candidate flows, but small field text, soft floating panels and weak grouping dilute clarity. Candidate modal needed keyboard focus management. CV builder has extensive inline styling that needs a dedicated pass.
- **Maintenance:** active styles are in `/styles`; `/src/styles` and `/src/js` are legacy duplicates, not imported by the App Router. Avoid editing both. Existing breakpoints: navigation 1100; layouts 1024/768; footer 960/640, plus local inline styling.

## Creative direction: people, precisely coordinated

A European editorial masthead and architectural hospitality journal. Keep Warm Ivory #FAF8F5, Forest #183B2B, Evergreen #0E271B, Sand #F3EFE8, Champagne #EDE4D3 and Charcoal #19231E. Cormorant Garamond carries measured display typography; Plus Jakarta Sans carries reading and controls. Champagne is an edge or highlight, not a decorative wash. Photography shows work and the people who perform it; lines indicate hierarchy and grouping. No invented statistics or endorsements.

Layout decision:

    [Vantara / Workforce Solutions] [brand thought] [candidate] [employer]
    [all seven route links                                  ] [parent]
    [editorial headline / narrative] [tall hospitality image          ]
    [...existing page narrative, now using shared foundations...     ]
    [large footer invitation                      ] [human photograph]
    [brand / parent] [explore] [candidate resources] [company         ]
    [                     VANTARA wordmark                          ]
    [operational/legal context                     ] [copyright      ]

The split masthead solves a real content-density constraint. The large footer wordmark is the signature gesture; avoid adding unrelated decorative motifs. Numbering belongs to process steps only. Desktop alignment uses existing container edges, responsive gutters and deliberate asymmetric columns. Mobile stacks content in reading order.

## Implemented foundation and shared components

- Single navigation data source, reusable Brand preserving the original triangular symbol and name, all seven links retained across desktop/mobile/footer.
- Two-level fixed masthead; subtle scroll shadow, active underline and `aria-current`; tablet/mobile layout at 1100px, compact layout at 560px. Employer action is available within the mobile menu at narrow sizes.
- Native mobile dialog: closed content leaves keyboard navigation, browser-managed focus containment, Escape/backdrop dismissal, focus return, internal scrolling and desktop-resize dismissal.
- Forest footer: editorial invitation, existing local people image, all existing routes/actions, resource groups, oversized wordmark and retained legal context.
- Bound Next font variables; fluid type and section-spacing tokens; readable muted text; reduced radii; grid, heading, image, divider and forest-section CSS primitives in `styles/editorial.css`.
- Shared image treatments, button microinteractions, form fields/grouping, mobile grids, global focus states and skip link. Replaced the broken contact hero image with an existing local hospitality asset. Home hero demonstrates the image/type direction; supporting page heroes adopt shared proportions.
- Framer Motion reduced-motion policy; retained Lenis; removed mounted blocking preloader and custom cursor. Route transition no longer hides initial content or resets hash navigation. Candidate modal gets focus containment, background inertness and focus restoration.

## Remaining page-level work

1. Recompose each supporting page around its specific story rather than repeating a split hero; migrate remaining inline styles into shared primitives.
2. Replace temporary and generic external photos with approved, licensed, locally hosted worker/industry/location imagery; establish consistent crop/focal points and asset provenance.
3. Redesign destination listings, workforce roles and recruitment categories as differentiated editorial structures, avoiding another uniform card system.
4. Give the CV builder, preview, FAQ and selection flows a dedicated visual and keyboard pass, including inline colours/spacing and reduced-motion imperative scrolling.
5. Audit existing content claims (fees, compliance, readiness and pipeline promises) with the business. This design pass adds no metrics, testimonials or partnerships.
6. Evaluate existing unoptimized remote image strategy separately; changing it requires verifying every host and image delivery path.

## Validation

See `docs/visual-qa.md` for rendered viewport checks, interaction results and build status. This phase establishes the shared design and first home-page application; it is not a claim that every page has received bespoke art direction.
