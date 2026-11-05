import { getMailer } from '@/services/mailer';
import { escapeHtml } from './validation';

const labels: Record<string, string> = {
  companyName: 'Company', businessType: 'Business / industry', operatingCountry: 'Operating country', companyWebsite: 'Company website', contactName: 'Contact name', contactEmail: 'Contact email', contactPhone: 'Contact phone', rolesRequired: 'Roles required', workersCount: 'Number of workers', startDate: 'Requested start', contractDuration: 'Contract duration', additionalNotes: 'Additional notes',
  fullName: 'Full name', country: 'Country', city: 'City', phone: 'Phone / WhatsApp', email: 'Email', profession: 'Profession', experienceYears: 'Experience', preferredDestination: 'Preferred destination', nationality: 'Nationality', currentOccupation: 'Current occupation', preferredIndustry: 'Preferred industry', preferredRole: 'Preferred role', skillCategory: 'Skill category', additionalDestinations: 'Additional destinations', availability: 'Availability', yearsOfExperience: 'Years of experience', isEntryLevelNoExperience: 'Entry-level without formal experience', employmentHistory: 'Employment history', skills: 'Skills', highestEducation: 'Highest education', certifications: 'Certifications', languages: 'Languages', passportStatus: 'Passport available', drivingLicense: 'Driving licence', professionalNotes: 'Professional notes', hasExistingCVFile: 'Existing CV attached', consentGiven: 'Recruitment consent'
};
function valueText(value: unknown): string {
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (Array.isArray(value)) return value.map(item => typeof item === 'object' ? Object.entries(item).filter(([key]) => key !== 'id').map(([key, val]) => `${key}: ${valueText(val)}`).join('\n') : valueText(item)).join('\n\n') || 'Not specified';
  return String(value || 'Not specified');
}
export function renderSubmission(title: string, reference: string, data: Record<string, unknown>, attachmentNames: string[]) {
  const rows = Object.entries(data).filter(([key]) => key !== 'company_hp').map(([key, value]) => ({ label: labels[key] || key, value: valueText(value) }));
  const text = `${title}\nReference: ${reference}\n\n${rows.map(row => `${row.label}: ${row.value}`).join('\n\n')}\n\nUploaded documents: ${attachmentNames.join(', ') || 'None'}.\nGenerated browser CV PDFs are not attached automatically.\nViaferra — a venture of Ascentra Global Ltd.`;
  const html = `<div style="font-family:Arial,sans-serif;color:#19231E;max-width:680px;margin:auto"><header style="padding:24px;background:#0E271B;color:#FAF8F5"><h1 style="font-size:22px">${escapeHtml(title)}</h1><p>Reference: ${escapeHtml(reference)}</p></header><main style="padding:24px;background:#FAF8F5">${rows.map(row => `<section style="margin:0 0 18px"><strong>${escapeHtml(row.label)}</strong><div style="white-space:pre-wrap;margin-top:5px">${escapeHtml(row.value)}</div></section>`).join('')}<p>Uploaded documents: ${escapeHtml(attachmentNames.join(', ') || 'None')}.</p><p>Generated browser CV PDFs are not attached automatically.</p></main><footer style="padding:24px">Viaferra — Global Recruitment &amp; International Workforce Solutions<br>A venture of Ascentra Global Ltd</footer></div>`;
  return { text, html };
}

export async function deliverSubmission(options: { title: string; reference: string; email: string; name: string; data: Record<string, unknown>; attachments: { filename: string; content: Buffer; contentType: string }[]; candidate: boolean }) {
  const { transport, recipients, from } = getMailer();
  const body = renderSubmission(options.title, options.reference, options.data, options.attachments.map(file => file.filename));
  await transport.sendMail({ from, to: recipients, replyTo: options.email, subject: `${options.title} [${options.reference}]`, ...body, attachments: options.attachments, disableFileAccess: true, disableUrlAccess: true });
  let receiptSent = true;
  try {
    const message = options.candidate ? 'Your structured profile has been delivered to our recruitment team for review. Registration is an expression of interest, not an offer or guarantee of employment. Any CV you downloaded remains your local copy; only an uploaded document is attached to your registration.' : 'Your workforce requirements have been delivered to our team for review. We will contact you to discuss suitability and next steps. Timing depends on your requirements and the applicable process.';
    await transport.sendMail({ from, to: options.email, subject: `Viaferra submission received [${options.reference}]`, text: `Dear ${options.name},\n\n${message}\n\nReference: ${options.reference}\nViaferra — a venture of Ascentra Global Ltd`, html: `<div style="font-family:Arial,sans-serif;color:#19231E;max-width:600px"><h1 style="color:#183B2B;font-size:24px">Submission received</h1><p>Dear ${escapeHtml(options.name)},</p><p>${escapeHtml(message)}</p><p>Reference: ${escapeHtml(options.reference)}</p><p>Viaferra — a venture of Ascentra Global Ltd</p></div>`, disableFileAccess: true, disableUrlAccess: true });
  } catch { receiptSent = false; /* The main submission succeeded; never log candidate data or SMTP errors. */ }
  return { receiptSent };
}
