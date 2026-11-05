import { jsPDF } from 'jspdf';
import type { CandidateRegistrationData } from './schema';

let fontRequest: Promise<string> | undefined;
async function loadFont() {
  if (!fontRequest) fontRequest = fetch('/fonts/NotoSans-Regular.ttf').then(async response => {
    if (!response.ok) throw new Error('The CV font could not be loaded. Please check your connection and try again.');
    const bytes = new Uint8Array(await response.arrayBuffer());
    let binary = '';
    for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...Array.from(bytes.subarray(i, i + 8192)));
    return btoa(binary);
  }).catch(error => { fontRequest = undefined; throw error; });
  return fontRequest;
}

/** Pure document layout is exported for pagination and international-character tests. */
export function createCandidateCVPdf(candidate: CandidateRegistrationData, fontBase64: string) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', putOnlyUsedFonts: true });
  doc.addFileToVFS('NotoSans-Regular.ttf', fontBase64);
  doc.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal');
  doc.setFont('NotoSans', 'normal');
  const font = doc.getFont() as unknown as { metadata: { characterToGlyph?: (code: number) => number } };
  const checkText = (value: unknown): void => {
    if (typeof value === 'string') {
      for (const character of value.normalize('NFC')) {
        const cp = character.codePointAt(0)!;
        if (cp > 32 && font.metadata.characterToGlyph?.(cp) === 0) throw new Error('Some characters in your profile are not supported by this PDF font. Your original details can still be submitted. For a PDF copy, use Latin, Greek or Cyrillic text, or upload your own CV.');
      }
    } else if (Array.isArray(value)) value.forEach(checkText);
    else if (value && typeof value === 'object') Object.values(value).forEach(checkText);
  };
  checkText(candidate);
  const left = 18, width = 174, bottom = 274;
  let y = 24;
  const colour = (heading = false) => doc.setTextColor(...(heading ? [24, 59, 43] : [25, 35, 30]) as [number, number, number]);
  function page() {
    doc.addPage(); y = 23; doc.setFontSize(8); doc.setTextColor(72, 87, 79);
    doc.text('VIAFERRA / PROFESSIONAL PROFILE', left, 13); doc.setDrawColor(226, 219, 208); doc.line(left, 17, 192, 17);
  }
  function room(height: number) { if (y + height > bottom) page(); }
  function text(value: string, size = 10, heading = false) {
    if (!value.trim()) return;
    doc.setFontSize(size); colour(heading);
    const lines: string[] = doc.splitTextToSize(value.normalize('NFC').replace(/\t/g, ' '), width);
    const lineHeight = size * .45;
    for (const line of lines) { room(lineHeight); doc.setFontSize(size); colour(heading); doc.text(line, left, y); y += lineHeight; }
    y += 3;
  }
  function section(title: string) { room(22); y += 5; doc.setDrawColor(226, 219, 208); doc.line(left, y, 192, y); y += 8; text(title, 12, true); }
  function pair(label: string, value?: string) { text(`${label}: ${value || 'Not specified'}`, 9.5); }
  text('VIAFERRA / GLOBAL RECRUITMENT', 9, true);
  text(candidate.fullName.trim() || 'Candidate profile', 23, true);
  text([candidate.preferredRole, candidate.preferredIndustry].filter(Boolean).join(' / '), 11);
  text([candidate.email, candidate.phone, [candidate.city, candidate.country].filter(Boolean).join(', ')].filter(Boolean).join(' / '), 9);
  if (candidate.nationality) pair('Nationality', candidate.nationality);
  if (candidate.currentOccupation) pair('Current occupation', candidate.currentOccupation);
  section('Professional profile');
  text(candidate.professionalNotes?.trim() || `${candidate.skillCategory} candidate seeking ${candidate.preferredRole} opportunities in ${candidate.preferredIndustry}. ${candidate.isEntryLevelNoExperience ? 'Applying without prior formal employment experience.' : `Reported experience: ${candidate.yearsOfExperience}.`} Interested in ${candidate.preferredDestination}.`);
  section('Recruitment preferences');
  pair('Primary region', candidate.preferredDestination); pair('Additional regions', candidate.additionalDestinations.join(', ') || 'None specified'); pair('Skill category', candidate.skillCategory); pair('Availability', candidate.availability);
  section('Employment & practical experience');
  if (candidate.isEntryLevelNoExperience) text('Entry-level candidate; no prior formal employment reported.');
  else {
    pair('Reported experience', candidate.yearsOfExperience);
    for (const job of candidate.employmentHistory) {
      if (!job.jobTitle && !job.company) continue;
      room(24); text(job.jobTitle || 'Role not specified', 11, true); text(`${job.company || 'Employer not specified'} / ${job.startDate || 'Start date not specified'} — ${job.isCurrent ? 'Present' : job.endDate || 'End date not specified'}`, 9);
      text(job.responsibilities, 9.5); y += 3;
    }
  }
  section('Education & qualifications'); pair('Highest education', candidate.highestEducation); if (candidate.certifications) text(candidate.certifications);
  section('Skills & languages'); text(candidate.skills.join(' / ') || 'No practical skills listed.'); text(candidate.languages.filter(l => l.language).map(l => `${l.language} (${l.proficiency})`).join(' / ') || 'No languages listed.');
  section('Professional readiness'); pair('Passport available', candidate.passportStatus); pair('Driving licence', candidate.drivingLicense);
  const count = doc.getNumberOfPages();
  for (let i = 1; i <= count; i++) {
    doc.setPage(i); doc.setFontSize(7); doc.setTextColor(72, 87, 79); doc.setDrawColor(226, 219, 208); doc.line(left, 282, 192, 282);
    doc.text('Candidate-provided information / Viaferra / A venture of Ascentra Global Ltd', left, 287); doc.text(`${i} / ${count}`, 192, 287, { align: 'right' });
  }
  return doc;
}

export async function generateCandidateCVPdf(candidate: CandidateRegistrationData): Promise<void> {
  const doc = createCandidateCVPdf(candidate, await loadFont());
  const safeName = candidate.fullName.trim().normalize('NFKD').replace(/[^a-zA-Z0-9]/g, '_') || 'Candidate';
  doc.save(`Viaferra_CV_${safeName}.pdf`);
}
