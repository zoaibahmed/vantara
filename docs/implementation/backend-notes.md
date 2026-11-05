# Submission stabilization — implemented

Date: 5 November 2026. No live email sent. All test transport calls are mocked before route modules load.

## Changed files

- `services/mailer.ts`: removes literal username/password/recipient fallbacks. `getMailer()` reads required SMTP_USER, SMTP_PASS and ADMIN_EMAIL only at send time. Missing/invalid configuration produces a safe 503 response, without making builds require credentials. EMAIL_FROM is optional; SMTP_HOST/SMTP_PORT support a TLS relay; otherwise existing Gmail service is retained. No secret or candidate data is logged.
- `app/api/employer-request/route.ts`, `app/api/candidate-application/route.ts`, `app/api/global-recruitment/candidates/route.ts`: preserve URLs and POST behavior, delegate to shared Node runtime handler.
- `lib/submissions/validation.ts`: runtime validation, maximum text/array lengths, email syntax, allowed enums, strict consent/booleans, employment-date shape and structured nested profile validation. Normalizes employer legacy aliases while keeping all twelve current fields.
- `lib/submissions/request.ts`: same-origin browser guard, bounded streaming request read, JSON/multipart parsing, process-local rate limit with expiry/cap, 6MiB uploaded CV limit, allowed MIME/extension and PDF/DOC/DOCX signature sniffing, safe filename. Accepts both existing `cv` and `cvFile` multipart keys.
- `lib/submissions/delivery.ts`: HTML escaping for every submitted value; readable complete structured profile/admin message and plain-text alternative; explicit generated-versus-uploaded PDF behavior. User confirmation no longer asserts a database exists or promises an SLA/placement. Admin failure returns delivery error; secondary receipt failure reports receiptSent=false while preserving successful submission.
- `lib/submissions/handler.ts`: shared validation/delivery orchestration, randomUUID reference, no-store responses, field error map, safe errors, honeypot behavior, Retry-After on throttling.
- `.env.example`: empty configuration placeholders only.
- `lib/submissions/submissions.test.cjs`: isolated mocked transport/route tests, no dependency added.

## Contract

Employer canonical keys: companyName, businessType, operatingCountry, companyWebsite, contactName, contactEmail, contactPhone, rolesRequired, workersCount, startDate, contractDuration, additionalNotes. contactPerson/destinationCountry/estimatedHeadcount/timeline are accepted aliases when their canonical keys are absent. Legacy payloads may omit businessType/contractDuration. Current canonical required fields are enforced. Website and notes optional. Every field appears in the admin message, escaped.

Legacy candidate accepts the existing JSON and multipart shape. Global candidate accepts JSON or multipart JSON `data` plus optional `cvFile`. Uploaded CV is attached. The generated browser PDF is **not** attached or stored. There is no new database, account, cloud storage or retention system.

Global industry validation accepts both existing names and new display-compatible alternatives Manufacturing & Industrial / Agriculture & Essential Services. Regions remain Europe, Latin America, Australia, New Zealand.

## Tests performed

`node lib/submissions/submissions.test.cjs`: **37 checks passed**. Tests cover all twelve employer fields; aliases/precedence; invalid types, email injection, website scheme, oversized text; nested candidate validation, enums, boolean consent and array bounds; cross-origin requests; limiter expiry; malformed/oversized streamed JSON; content types; signature-valid PDF/DOC and renamed/oversized/mismatched uploads; all three POST handlers through mocked SMTP; complete escaped messages; multipart upload; honeypot; configuration failure, primary send failure and secondary receipt failure; empty payload 400s.

`npx tsc --noEmit`: passed after initial backend implementation. Whole-site build/QA is coordinated separately.

## Remaining operational work and limitations

- **The previously exposed credential must be revoked/rotated by the authorized account owner.** Code removal does not invalidate a credential or remove earlier git history. Rotation is not claimed complete.
- Populate deployment secrets and approved sender/recipient settings. SMTP login and real deliverability are deliberately untested.
- Rate limiting is bounded best-effort **per process**, not distributed. Deployment must overwrite client-supplied forwarded-IP headers and add shared edge limits for multi-instance resilience. No false claim of comprehensive bot prevention.
- File signature/MIME checks are not malware scanning or a complete Office parser. Word/PDF attachments can contain active content; do not automatically execute/open them. File bytes are never decompressed on the server. A dedicated scanning workflow requires a separately approved service/retention decision.
- No production retention/deletion policy has been invented; data is sent through configured email. No candidate data is written to application storage.
