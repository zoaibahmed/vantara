# Forms and CV implementation evidence

## Implemented
- Preserved employer, legacy worker and global candidate API field contracts. Employer business categories now include construction, manufacturing, logistics, agriculture and technical services alongside every existing hospitality option.
- Added associated input labels, autocomplete and length constraints, visible submission feedback, duplicate-submit protection and clear upload validation. Legacy forms keep native required/email validation and reset only on success.
- Rebuilt the five-step candidate workspace with persistent controlled state, accessible progress, required-field errors, first-error focus, step-heading focus, reduced-motion support and 180ms transitions. Back/edit preserves entered information. Review includes all candidate information and one submission action.
- Candidate PDF code is dynamically imported on download. The generated PDF is a personal download and is explicitly not attached to the structured registration. An uploaded original CV is separately sent only when selected.
- PDF text wraps line by line with page-break checks, repeated document identification and numbered footers. Included locally hosted Noto Sans under SIL OFL (public/fonts/OFL-NotoSans.txt), used only in PDF exports; website brand typefaces stay unchanged.

## Verification
- `npx tsc --noEmit`: passes.
- `node docs/implementation/test-cv-pdf.cjs`: short profile 2 pages; long 20-job international profile 16 pages; 873 text positions within printable bounds. Latin accents, Vietnamese, Greek and Cyrillic tested. First/last long-document pages rendered with Poppler and visually inspected.
- `node docs/implementation/test-forms-browser.cjs`: Chrome at 390px with reduced motion; required errors/ARIA/focus, full five-step path, edit/back persistence, actual PDF download, mocked submission/success, employer labels/category options and invalid legacy CV upload verified. No live application or email sent.
- Evidence: pdf-test-results.json, forms-browser-results.json, cv-long-first.png, cv-long-last.png, cv-mobile-success.png and sample PDFs in this directory. Test data is fictional.

## Honest limits
The bundled PDF font covers Latin, Greek and Cyrillic, including the tested Vietnamese accents. It does not cover every script. Unsupported glyphs (tested with CJK) produce an explicit export error instead of a corrupted PDF; the original Unicode profile remains available for submission, and candidates may upload their own CV. Full Arabic shaping, CJK and other-script PDF export remain future work.

## Integration
Import `styles/forms-refined.css` after the existing shared styles. No new JavaScript package dependency was added. Noto Sans source: https://github.com/notofonts/noto-fonts/blob/main/hinted/ttf/NotoSans/NotoSans-Regular.ttf (SIL OFL).
