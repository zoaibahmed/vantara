# Viaferra Workforce Solutions

Viaferra is an international recruitment and workforce coordination venture of Ascentra Global Ltd. The site serves employers and candidates across essential industries, with a dedicated hospitality service.

The application uses Next.js App Router, TypeScript, custom CSS, Framer Motion and Lenis. Candidate CVs are generated in the browser with jsPDF. Recruitment forms use Nodemailer for submission delivery.

## Local development

Run these commands from the project directory:

```bash
npm ci
npm run dev
```

The default preview is [localhost:3000](http://localhost:3000). For deployment, use `npm run build` and `npm run start`.

## Deployment configuration

Use `.env.example` as a template. Set `SITE_URL` to the confirmed public Viaferra origin before building for production. The sitemap emits public URLs when that origin is configured.

Supply the SMTP variables through the deployment secret manager. Set `EMAIL_FROM` to an authorized Viaferra sender if you want a branded address. Verify mailbox ownership and provider configuration before sending mail.

Run `node --test lib/submissions/submissions.test.cjs` to check the submission handlers with mocked mail transport.
