import nodemailer from 'nodemailer';

const smtpUser = process.env.SMTP_USER || 'britsyncuk@gmail.com';
const smtpPass = process.env.SMTP_PASS || 'epaegstxoxioqltb';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: smtpUser,
    pass: smtpPass
  }
});

export const ADMIN_RECIPIENTS = (
  process.env.ADMIN_EMAIL || 'britsyncuk@gmail.com,admin@britsync.co.uk'
)
  .split(',')
  .map((e) => e.trim())
  .filter(Boolean);

export const DEFAULT_FROM = process.env.EMAIL_FROM || `Vantara Workforce Solutions <${smtpUser}>`;
