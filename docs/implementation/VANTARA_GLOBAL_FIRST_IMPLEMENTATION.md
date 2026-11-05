# Vantara global-first implementation

The audit found repeated oversized openings, hospitality-led imagery across general pages, weak separation between employer and candidate tasks, and motion that did little to explain the recruitment process. It also found an obscured mobile cover CTA, mismatched employer form fields, a mail credential fallback, and copy that implied persistent storage.

## Direction

The International Field Journal uses the established Vantara palette, Cormorant Garamond and Plus Jakarta Sans. Real work photography, large serif type and compact labels establish the hierarchy. Asymmetry, photo chapters, disclosures and process ledgers give each route its own rhythm. Studio Freight's approach to editorial publishing was a reference for presenting a business as a sequence of chapters. The design and assets are Vantara-specific. [Studio Freight project](https://studiofreight.com/work/studio-freight)

The homepage opens with a masked workforce photograph and employer and candidate CTAs. It continues through an audience index, six-industry photo explorer, four-region interest explorer, five-stage scroll story, fictional CV specimen, hospitality feature and consultation close. The full employer form lives on Contact. Region and industry selections link to the CV builder with validated preferences.

| Route | Composition and role |
| --- | --- |
| / | Global corporate cover, interactive field journal and separate conversion paths |
| /global-recruitment | Candidate cover, early CV workspace, region and industry selectors, skill and process ledgers |
| /workforce | Capabilities panorama, skill tiers, screening and existing hospitality candidate portal |
| /solutions | Full-bleed hospitality cover, four departmental disclosures and sixteen roles |
| /how-it-works | Separate employer and candidate journeys, responsibilities and FAQ |
| /destinations | Candidate interest selector, sourcing context and specialist destination dossiers |
| /about | Forest manifesto, working principles and Ascentra Global Ltd relationship |
| /contact | Compact employer introduction, structured inquiry form and separate candidate entry |

## Shared system

Header and footer retain the logo and all seven navigation destinations. The navigation separates the candidate and employer actions, indicates the current route and uses a native modal menu on smaller screens. The footer provides company context, route links and a separate legacy hospitality registration action. Section rhythm, rule colors, display scales, picture stages, actions, focus states and form controls are shared across routes. The design inspector requires development mode and the explicit ds=true query.

## Functional changes

The employer payload uses all twelve fields and recognizes prior aliases. All three submissions validate runtime types and bounded sizes, escape email content, check accepted CV upload signatures and return safe errors. Rate limiting is local to each process. User messages describe submission for recruitment review. The five-step CV flow retains structured input and supports review, back/edit, local PDF download and optional upload. The generated PDF is local. An existing uploaded CV can accompany the structured submission. The PDF renderer wraps and paginates long content.

Next serves responsive WebP using its built-in image optimizer. The 209,622-byte workforce JPEG produced a 12,210-byte 390px response and a 22,816-byte 640px response with WebP negotiation in the local HTTP check. No runtime package was added. Asset sources and the measured HTTP results are in this directory.

## Change inventory

- Routes and shared layout: app/page.tsx, app/layout.tsx, app/ClientLayout.tsx, and the page files for about, contact, destinations, how-it-works, solutions and workforce.
- Editorial experiences: components/scenes/HeroScene.tsx, components/scenes/CoordinationScene.tsx, components/journal/IndustryExplorer.tsx, components/journal/RegionFocus.tsx, components/inner/RegionLedger.tsx, components/inner/DepartmentJournal.tsx and components/editorial/PageOpening.tsx.
- Candidate route: GlobalRecruitmentClientPage, GlobalRecruitmentHero, CandidateCVBuilder, CVPreview, WorkforceCategories, RecruitmentProcess, EmployerRecruitmentCTA, RecruitmentFAQ and GlobalRecruitmentFinalCTA in components/global-recruitment.
- Shared navigation and motion: components/navigation/Header.tsx, components/navigation/MobileDrawer.tsx, components/footer/Footer.tsx, components/animations/PageTransition.tsx, components/animations/useMotionPreference.ts, components/dev/DesignSystemInspector.tsx and lib/navigation.ts.
- Forms and mail: EmployerRequestForm, WorkerForm and WorkerModal in components/forms, the three app/api route files, lib/submissions, lib/recruitment/constants.ts, lib/recruitment/cv-generator.ts, services/mailer.ts and .env.example.
- Styles and assets: styles/globals.css, styles/collection.css, styles/journal.css, styles/inner-journal.css, styles/forms-refined.css, next.config.mjs, public/favicon.ico, public/images/journal and the PDF font and license in public/fonts.

The audit and baseline are preserved in docs/audit and baseline.json. See backend-notes.md and forms-notes.md for validation contracts and limits.

## Operational follow-up

The account owner must revoke the previously exposed mail credential and configure a rotated credential in the deployment environment. Live delivery is unverified because all submissions were tested with mocked transport. Work authorization, availability, service scope and cost remain specific to each recruitment agreement. CV downloads support the documented font repertoire. Profiles can still be submitted when a script falls outside that repertoire.
