import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { MailConfigurationError } from '@/services/mailer';
import { deliverSubmission } from './delivery';
import { checkSubmissionRequest, readSubmission, validateCV } from './request';
import { SubmissionError, isHoneypot, normalizeCandidate, normalizeEmployer, normalizeGlobalCandidate } from './validation';

export function submissionHandler(kind: 'employer' | 'candidate' | 'global') {
  return async function POST(req: Request) {
    try {
      checkSubmissionRequest(req);
      const { data, file } = await readSubmission(req);
      const reference = `V${kind === 'employer' ? 'ER' : kind === 'global' ? 'GR' : 'CR'}-${new Date().getFullYear()}-${randomUUID().slice(0, 12).toUpperCase()}`;
      if (isHoneypot(data)) return NextResponse.json({ success: true, reference, message: 'Your submission has been received.' }, { headers: { 'Cache-Control': 'no-store' } });
      const normalized = kind === 'employer' ? normalizeEmployer(data) : kind === 'candidate' ? normalizeCandidate(data) : normalizeGlobalCandidate(data);
      if (kind === 'employer' && file) throw new SubmissionError('Employer enquiries do not accept attachments.');
      const attachments = await validateCV(file);
      if ('hasExistingCVFile' in normalized) normalized.hasExistingCVFile = attachments.length > 0;
      const email = 'contactEmail' in normalized ? normalized.contactEmail : normalized.email;
      const name = 'contactName' in normalized ? normalized.contactName : normalized.fullName;
      const { receiptSent } = await deliverSubmission({ title: kind === 'employer' ? 'Viaferra workforce request' : kind === 'global' ? 'Viaferra global candidate registration' : 'Viaferra hospitality candidate registration', reference, email, name, data: { ...normalized }, attachments, candidate: kind !== 'employer' });
      return NextResponse.json({ success: true, reference, receiptSent, message: kind === 'employer' ? 'Your workforce requirements have been delivered to our team for review.' : 'Your profile has been delivered to our recruitment team for review. We may contact you about suitable opportunities.' }, { headers: { 'Cache-Control': 'no-store' } });
    } catch (error) {
      const status = error instanceof SubmissionError ? error.status : error instanceof MailConfigurationError ? 503 : 502;
      const message = error instanceof SubmissionError ? error.message : status === 503 ? 'Online submissions are temporarily unavailable. Please try again later.' : 'Your submission could not be delivered. Please try again later.';
      const field = error instanceof SubmissionError ? error.field : undefined;
      return NextResponse.json({ success: false, message, ...(field ? { errors: { [field]: message } } : {}) }, { status, headers: { 'Cache-Control': 'no-store', ...(status === 429 ? { 'Retry-After': '60' } : {}) } });
    }
  };
}
