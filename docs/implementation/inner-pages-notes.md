# Supporting page implementation

The six supporting routes now use scoped, semantic editorial layouts in `styles/inner-journal.css`. The global stylesheet must import this file after legacy page styles.

- About: forest manifesto, genuine work imagery, working principles, explicit Ascentra relationship without invented credentials.
- Workforce: three individual skill categories, practical role examples, sourcing context without nationality stereotypes. Existing WorkerForm and `#candidate-portal` retained.
- Contact: compact employer opening and immediately accessible EmployerRequestForm, separate global candidate CV CTA. No response-time guarantee.
- Destinations: keyboard-operable region selector with subtle image fades; candidate-interest regions explicitly separated from sourcing context and hospitality destination enquiries. No claim of active vacancies or guaranteed placements.
- How it works: distinct employer and candidate journeys, responsibility ledger, native FAQ disclosures. Removed universal deployment timings, blanket replacement guarantees and unsupported certification claims.
- Hospitality solutions: all four departments, sixteen role records and original department fragment IDs retained. Native details remain keyboard accessible. Department selection changes the adjacent photograph; reduced-motion preference disables fades. Readiness requirements are employer- and role-specific.

New components: RegionLedger, DepartmentJournal. Both use the shared motion preference hook. Typography remains Cormorant Garamond / Plus Jakarta Sans through the existing font tokens. CSS provides desktop, tablet and 480px mobile arrangements, scoped without positional selectors. No new dependencies, APIs or form submission changes.

Content limitations: destination illustrations are contextual, not evidence of operating offices or active programmes; regional interest is not work eligibility. Final scope, costs, documents and arrangements require the applicable recruitment agreement.

Validation: `npx tsc --noEmit` passes. Chrome rendered all six routes at 1440px and 390px with stylesheet injection while global integration was underway: no horizontal overflow, no page JavaScript errors. Department disclosure switching verified in both widths. Solutions desktop and Contact mobile screenshots visually reviewed. Department fragment navigation opens the matching disclosure.
