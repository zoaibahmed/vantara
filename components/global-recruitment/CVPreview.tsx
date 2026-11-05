'use client';
import { useState } from 'react';
import { CandidateRegistrationData } from '@/lib/recruitment/schema';
interface Props { data: CandidateRegistrationData; onEditStep: (step: number) => void; onSubmit: () => void; isSubmitting: boolean; submitted?: boolean }
export default function CVPreview({ data, onEditStep, onSubmit, isSubmitting, submitted }: Props) {
  const [downloading, setDownloading] = useState(false), [error, setError] = useState('');
  async function download() {
    setDownloading(true); setError('');
    try { const { generateCandidateCVPdf } = await import('@/lib/recruitment/cv-generator'); await generateCandidateCVPdf(data); }
    catch (e) { setError(e instanceof Error ? e.message : 'Your PDF could not be created. Please try again.'); }
    finally { setDownloading(false); }
  }
  const edit = (n: number, label: string) => <button type="button" className="cv-text-button" onClick={() => onEditStep(n)}>Edit {label}</button>;
  return <div className="cv-preview-wrap"><div className="cv-preview-toolbar"><p>Review your details before sending. The PDF is your own downloadable copy; your structured profile is sent separately.</p><button type="button" className="btn btn-secondary" disabled={downloading} onClick={download}>{downloading ? 'Preparing PDF…' : 'Download CV (PDF)'} <span aria-hidden="true">↓</span></button></div>{error && <p role="alert" className="form-feedback is-error">{error}</p>}
    <article className="cv-document" aria-label="Professional CV preview"><header className="cv-document-header"><span className="journal-label">Viaferra / Candidate profile</span><h2>{data.fullName}</h2><p>{data.preferredRole} · {data.preferredIndustry}</p><p className="cv-contact-line">{[data.email, data.phone, data.city, data.country].filter(Boolean).join(' / ')}</p>{data.nationality && <p>Nationality: {data.nationality}</p>}{data.currentOccupation && <p>Current occupation: {data.currentOccupation}</p>}{edit(1, 'personal details')}</header>
    <section><div className="cv-section-heading"><h3>Professional profile</h3>{edit(4, 'objective')}</div><p>{data.professionalNotes?.trim() || `${data.skillCategory} candidate seeking ${data.preferredRole} opportunities in ${data.preferredIndustry}. ${data.isEntryLevelNoExperience ? 'Applying without prior formal employment experience.' : `Reported experience: ${data.yearsOfExperience}.`} Interested in ${data.preferredDestination}.`}</p></section>
    <section><div className="cv-section-heading"><h3>Recruitment preferences</h3>{edit(2, 'preferences')}</div><dl className="cv-facts"><div><dt>Primary region</dt><dd>{data.preferredDestination}</dd></div><div><dt>Additional regions</dt><dd>{data.additionalDestinations.join(', ') || 'None specified'}</dd></div><div><dt>Skill category</dt><dd>{data.skillCategory}</dd></div><div><dt>Availability</dt><dd>{data.availability}</dd></div></dl></section>
    <section><div className="cv-section-heading"><h3>Experience</h3>{edit(3, 'experience')}</div>{data.isEntryLevelNoExperience ? <p>Entry-level candidate; no prior formal employment reported.</p> : <><p>{data.yearsOfExperience} of reported experience.</p>{data.employmentHistory.filter(j => j.jobTitle || j.company).map(j => <div className="cv-employment" key={j.id}><h4>{j.jobTitle || 'Role not specified'}</h4><p>{j.company} / {j.startDate || 'Start date not specified'} — {j.isCurrent ? 'Present' : j.endDate || 'End date not specified'}</p><p className="cv-preserve-lines">{j.responsibilities}</p></div>)}</>}</section>
    <section><div className="cv-section-heading"><h3>Education, skills & languages</h3>{edit(3, 'qualifications')}</div><p>{data.highestEducation}</p>{data.certifications && <p className="cv-preserve-lines">{data.certifications}</p>}<p>{data.skills.join(' / ') || 'No practical skills listed.'}</p><p>{data.languages.filter(l => l.language).map(l => `${l.language} (${l.proficiency})`).join(' / ') || 'No languages listed.'}</p></section>
    <section><div className="cv-section-heading"><h3>Readiness</h3>{edit(4, 'readiness')}</div><p>Passport available: {data.passportStatus}. Driving licence: {data.drivingLicense}.</p><p>Existing CV attachment: {data.hasExistingCVFile ? 'Selected for submission' : 'None selected'}.</p></section>
    <footer>Prepared from candidate-provided information. Recruitment review and employer selection remain separate steps. A venture of Ascentra Global Ltd.</footer></article>
    {!submitted && <div className="cv-submit-bar"><p>Registration expresses interest. It is not an employment offer.</p><button type="button" className="btn btn-primary" disabled={isSubmitting} onClick={onSubmit}>{isSubmitting ? 'Submitting profile…' : 'Submit Profile to Viaferra'} <span aria-hidden="true">↗</span></button></div>}
  </div>;
}
