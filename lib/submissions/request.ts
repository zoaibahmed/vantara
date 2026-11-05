import { createHash } from 'crypto';
import { SubmissionError } from './validation';

const limits = new Map<string, { count: number; expires: number }>();
const WINDOW_MS = 60_000;
export function checkSubmissionRequest(req: Request, now = Date.now()) {
  const origin = req.headers.get('origin');
  if (req.headers.get('sec-fetch-site') === 'cross-site' || (origin && origin !== new URL(req.url).origin)) {
    throw new SubmissionError('Please submit the form from the Viaferra website.', 403);
  }
  // Best-effort per-instance limiter. Deployment must overwrite forwarded headers.
  const address = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  const key = createHash('sha256').update(address).digest('hex');
  limits.forEach((value, id) => { if (value.expires <= now) limits.delete(id); });
  const current = limits.get(key);
  if (current && current.count >= 10) throw new SubmissionError('Too many requests. Please wait a minute before trying again.', 429);
  if (!current && limits.size >= 2000) throw new SubmissionError('The registration service is busy. Please try again shortly.', 429);
  limits.set(key, { count: (current?.count || 0) + 1, expires: current?.expires || now + WINDOW_MS });
}

export const MAX_CV_BYTES = 6 * 1024 * 1024;
const MAX_JSON_BYTES = 160 * 1024;
const MAX_BODY_BYTES = MAX_CV_BYTES + MAX_JSON_BYTES + 64 * 1024;
export async function readSubmission(req: Request): Promise<{ data: unknown; file: File | null }> {
  const type = req.headers.get('content-type') || '';
  const multipart = type.toLowerCase().startsWith('multipart/form-data');
  if (!multipart && !type.toLowerCase().startsWith('application/json')) throw new SubmissionError('Please submit a JSON or multipart form.', 415);
  const max = multipart ? MAX_BODY_BYTES : MAX_JSON_BYTES;
  const declared = Number(req.headers.get('content-length'));
  if (declared > max) throw new SubmissionError('This submission is too large. Keep your CV under 6MB.', 413);
  if (!req.body) throw new SubmissionError('Please complete the form before submitting.');
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > max) { await reader.cancel(); throw new SubmissionError('This submission is too large. Keep your CV under 6MB.', 413); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = Buffer.concat(chunks);
  try {
    if (!multipart) return { data: JSON.parse(bytes.toString('utf8')), file: null };
    const parsed = await new Response(bytes, { headers: { 'content-type': type } }).formData();
    const rawData = parsed.get('data');
    if (typeof rawData === 'string' && Buffer.byteLength(rawData) > MAX_JSON_BYTES) throw new SubmissionError('The candidate profile is too large.', 413);
    const data = rawData === null ? Object.fromEntries(Array.from(parsed.entries()).filter(([, value]) => typeof value === 'string')) : (typeof rawData === 'string' ? JSON.parse(rawData) : null);
    const fileEntry = parsed.get('cvFile') ?? parsed.get('cv');
    if (fileEntry !== null && typeof fileEntry === 'string') throw new SubmissionError('Please select a valid CV document.');
    return { data, file: fileEntry && fileEntry.size ? fileEntry : null };
  } catch (error) {
    if (error instanceof SubmissionError) throw error;
    throw new SubmissionError('The submitted form could not be read. Please check the fields and try again.');
  }
}

export async function validateCV(file: File | null): Promise<{ filename: string; content: Buffer; contentType: string }[]> {
  if (!file) return [];
  if (file.size > MAX_CV_BYTES) throw new SubmissionError('Your CV exceeds the 6MB limit.', 400, 'cvFile');
  const extension = file.name.split('.').pop()?.toLowerCase();
  const content = Buffer.from(await file.arrayBuffer());
  const mimeTypes: Record<string, string> = { pdf: 'application/pdf', doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' };
  const contentType = extension ? mimeTypes[extension] : undefined;
  if (!contentType || (file.type && file.type !== 'application/octet-stream' && file.type !== contentType)) throw new SubmissionError('Please upload a PDF, DOC or DOCX document.', 400, 'cvFile');
  const pdf = extension === 'pdf' && content.subarray(0, 5).toString('ascii') === '%PDF-';
  const doc = extension === 'doc' && content.subarray(0, 8).equals(Buffer.from([0xd0,0xcf,0x11,0xe0,0xa1,0xb1,0x1a,0xe1]));
  const docx = extension === 'docx' && content.subarray(0, 4).equals(Buffer.from([0x50,0x4b,0x03,0x04])) && content.includes(Buffer.from('[Content_Types].xml')) && content.includes(Buffer.from('word/document.xml'));
  if (!pdf && !doc && !docx) throw new SubmissionError('The CV content does not match its document type. Please export a fresh PDF or Word document.', 400, 'cvFile');
  const filename = file.name.replace(/[\\/\r\n\u0000-\u001f]/g, '_').slice(-150);
  return [{ filename, content, contentType }];
}
