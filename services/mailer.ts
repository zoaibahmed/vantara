import nodemailer from 'nodemailer';

export class MailConfigurationError extends Error {
  constructor() { super('Recruitment email is not configured.'); }
}

// Read only at send time: builds do not require secrets.
export function getMailer() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const recipients = process.env.ADMIN_EMAIL?.split(',').map(value => value.trim()).filter(Boolean);
  const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
  if (!user || !pass || !recipients?.length || !recipients.every(value => emailPattern.test(value))) throw new MailConfigurationError();
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || '587');
  if (host && (!Number.isInteger(port) || port < 1 || port > 65535)) throw new MailConfigurationError();
  const transport = nodemailer.createTransport(host ? {
    host, port, secure: port === 465, requireTLS: port !== 465,
    auth: { user, pass }, connectionTimeout: 10000, socketTimeout: 20000
  } : {
    service: 'gmail', auth: { user, pass }, connectionTimeout: 10000, socketTimeout: 20000
  });
  const from = process.env.EMAIL_FROM?.trim() || `Viaferra Workforce Solutions <${user}>`;
  if (/[\r\n]/.test(from)) throw new MailConfigurationError();
  return { transport, recipients, from };
}
