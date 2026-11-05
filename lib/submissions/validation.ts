import type { EmployerEnquiry, CandidateApplication } from '@/types';
import type { CandidateRegistrationData } from '@/lib/recruitment/schema';

export class SubmissionError extends Error {
  constructor(message: string, public status = 400, public field?: string) { super(message); }
}
type RecordValue = Record<string, unknown>;
export function object(value: unknown): RecordValue {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new SubmissionError('Please send a valid form object.');
  return value as RecordValue;
}
function string(data: RecordValue, field: string, required = false, max = 200): string {
  const value = data[field];
  if (value == null && !required) return '';
  if (typeof value !== 'string') throw new SubmissionError(`Please check ${field}.`, 400, field);
  const normalized = value.trim();
  if ((required && !normalized) || normalized.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(normalized)) throw new SubmissionError(`Please check ${field}${normalized.length > max ? ` (maximum ${max} characters)` : ''}.`, 400, field);
  return normalized;
}
function email(data: RecordValue, key: string) {
  const value = string(data, key, true, 254);
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value)) throw new SubmissionError('Please enter a valid email address.', 400, key);
  return value;
}
function boolean(data: RecordValue, key: string, fallback = false) {
  if (data[key] === undefined) return fallback;
  if (typeof data[key] !== 'boolean') throw new SubmissionError(`Please check ${key}.`, 400, key);
  return data[key] as boolean;
}
function choice(data: RecordValue, key: string, values: string[], required = true) {
  const value = string(data, key, required);
  if (value && !values.includes(value)) throw new SubmissionError(`Please select a valid ${key}.`, 400, key);
  return value;
}
function array(data: RecordValue, key: string, max: number): unknown[] {
  if (data[key] === undefined) return [];
  if (!Array.isArray(data[key]) || data[key].length > max) throw new SubmissionError(`Please check ${key} (maximum ${max} entries).`, 400, key);
  return data[key] as unknown[];
}
const regions = ['Europe', 'Latin America', 'Australia', 'New Zealand'];
const industries = ['Construction & Infrastructure', 'Manufacturing & Factories', 'Manufacturing & Industrial', 'Logistics & Warehousing', 'Hospitality & Tourism', 'Agriculture & General Services', 'Agriculture & Essential Services', 'Technical & Skilled Trades'];

export function normalizeEmployer(payload: unknown): EmployerEnquiry {
  const input = object(payload);
  const legacy = ['contactPerson', 'destinationCountry', 'estimatedHeadcount', 'timeline'].some(key => key in input);
  const data = { ...input, contactName: input.contactName ?? input.contactPerson, operatingCountry: input.operatingCountry ?? input.destinationCountry, workersCount: input.workersCount ?? input.estimatedHeadcount, startDate: input.startDate ?? input.timeline };
  const website = string(data, 'companyWebsite', false, 500);
  if (website) { try { if (!['https:', 'http:'].includes(new URL(website).protocol)) throw new Error(); } catch { throw new SubmissionError('Please enter an http or https company website.', 400, 'companyWebsite'); } }
  return {
    companyName: string(data, 'companyName', true), businessType: string(data, 'businessType', !legacy), operatingCountry: string(data, 'operatingCountry', true), companyWebsite: website,
    contactName: string(data, 'contactName', true), contactEmail: email(data, 'contactEmail'), contactPhone: string(data, 'contactPhone', true, 60),
    rolesRequired: string(data, 'rolesRequired', true, 2000), workersCount: string(data, 'workersCount', true, 100), startDate: string(data, 'startDate', true, 100), contractDuration: string(data, 'contractDuration', !legacy), additionalNotes: string(data, 'additionalNotes', false, 6000)
  };
}

export function normalizeCandidate(payload: unknown): CandidateApplication {
  const data = object(payload);
  return { fullName: string(data, 'fullName', true), country: string(data, 'country', true), phone: string(data, 'phone', true, 60), email: email(data, 'email'), profession: string(data, 'profession', true), experienceYears: string(data, 'experienceYears', true, 100), preferredDestination: string(data, 'preferredDestination') };
}

export function isHoneypot(payload: unknown): boolean {
  const data = object(payload);
  return !!string(data, 'company_hp', false, 200);
}

export function normalizeGlobalCandidate(payload: unknown): CandidateRegistrationData {
  const d = object(payload);
  const entry = boolean(d, 'isEntryLevelNoExperience');
  if (d.consentGiven !== true) throw new SubmissionError('Please accept the recruitment registration consent.', 400, 'consentGiven');
  const jobs = array(d, 'employmentHistory', 30).map(value => {
    const j = object(value);
    const startDate = string(j, 'startDate', false, 10), endDate = string(j, 'endDate', false, 10);
    if ([startDate, endDate].some(date => date && !/^\d{4}-\d{2}(-\d{2})?$/.test(date))) throw new SubmissionError('Please use a valid employment month or date.', 400, 'employmentHistory');
    return { id: string(j, 'id', false, 100), company: string(j, 'company'), jobTitle: string(j, 'jobTitle'), startDate, endDate, isCurrent: boolean(j, 'isCurrent'), responsibilities: string(j, 'responsibilities', false, 4000) };
  });
  const languages = array(d, 'languages', 20).map(value => {
    const l = object(value);
    return { id: string(l, 'id', false, 100), language: string(l, 'language', false, 100), proficiency: choice(l, 'proficiency', ['Basic', 'Conversational', 'Professional', 'Fluent', 'Native']) as CandidateRegistrationData['languages'][number]['proficiency'] };
  });
  return {
    fullName: string(d, 'fullName', true), email: email(d, 'email'), phone: string(d, 'phone', true, 60), country: string(d, 'country', true), city: string(d, 'city', true), nationality: string(d, 'nationality'), currentOccupation: string(d, 'currentOccupation'),
    preferredIndustry: choice(d, 'preferredIndustry', industries), preferredRole: string(d, 'preferredRole', true), skillCategory: choice(d, 'skillCategory', ['Skilled', 'Semi-Skilled', 'Entry-Level']) as CandidateRegistrationData['skillCategory'], preferredDestination: choice(d, 'preferredDestination', regions),
    additionalDestinations: Array.from(new Set(array(d, 'additionalDestinations', 4).map(value => choice({ region: value }, 'region', regions)))), availability: string(d, 'availability', false, 100),
    yearsOfExperience: string(d, 'yearsOfExperience', !entry, 100), isEntryLevelNoExperience: entry, employmentHistory: jobs, skills: array(d, 'skills', 60).map(value => string({ skill: value }, 'skill', true, 100)), highestEducation: string(d, 'highestEducation'), certifications: string(d, 'certifications', false, 4000), languages,
    passportStatus: choice(d, 'passportStatus', ['Yes', 'No', 'Prefer not to say']) as CandidateRegistrationData['passportStatus'], drivingLicense: string(d, 'drivingLicense'), professionalNotes: string(d, 'professionalNotes', false, 6000), hasExistingCVFile: boolean(d, 'hasExistingCVFile'), consentGiven: true, company_hp: ''
  };
}

export function escapeHtml(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!));
}
