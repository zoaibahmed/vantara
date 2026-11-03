'use client';

import React, { useState } from 'react';
import { CandidateRegistrationData } from '@/lib/recruitment/schema';
import { generateCandidateCVPdf } from '@/lib/recruitment/cv-generator';

interface CVPreviewProps {
  data: CandidateRegistrationData;
  onEditStep: (stepNumber: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function CVPreview({ data, onEditStep, onSubmit, isSubmitting }: CVPreviewProps) {
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  const handleDownloadPdf = () => {
    setIsPdfGenerating(true);
    try {
      generateCandidateCVPdf(data);
    } catch (err) {
      console.error('PDF Generation Error:', err);
    } finally {
      setIsPdfGenerating(false);
    }
  };

  // Synthesize realistic professional summary
  const getSummary = () => {
    if (data.professionalNotes && data.professionalNotes.trim().length > 10) {
      return data.professionalNotes.trim();
    }
    const skillTier = data.skillCategory || 'skilled';
    const role = data.preferredRole || 'operational candidate';
    const industry = data.preferredIndustry || 'essential industry';
    const exp = data.isEntryLevelNoExperience
      ? 'entry-level background with high motivation and readiness for workplace task training'
      : `${data.yearsOfExperience} of practical occupational experience`;

    return `Dedicated ${skillTier.toLowerCase()} professional specializing in ${role} within the ${industry} sector. Demonstrates a solid ${exp}, adaptable work ethic, and adherence to international occupational standards. Actively pursuing placement opportunities across ${data.preferredDestination || 'international markets'} where verified skills and disciplined performance directly support operational goals.`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Action Header Strip */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          backgroundColor: 'var(--bg-secondary)',
          padding: 'var(--space-4) var(--space-6)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-warm)'
        }}
      >
        <div>
          <div style={{ fontWeight: 'var(--fw-semibold)', color: 'var(--brand-forest-deep)', fontSize: '0.9375rem' }}>
            International Professional CV Preview
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Review your information, download your PDF copy, or submit your profile for recruitment review.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isPdfGenerating}
            className="btn btn-secondary btn-sm"
          >
            <span>{isPdfGenerating ? 'Preparing PDF...' : 'Download CV (PDF)'}</span>
            <span aria-hidden="true">↓</span>
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="btn btn-primary btn-sm"
          >
            <span>{isSubmitting ? 'Submitting Application...' : 'Submit Profile to Vantara'}</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* Styled CV Sheet (Print-Accurate White Paper Presentation) */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-warm)',
          boxShadow: 'var(--shadow-md)',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          color: '#19231E',
          fontFamily: 'var(--font-sans)',
          maxWidth: '860px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        {/* CV Header */}
        <div
          style={{
            borderBottom: '2px solid var(--brand-forest)',
            paddingBottom: 'var(--space-5)',
            marginBottom: 'var(--space-6)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 'var(--space-4)'
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--brand-forest-deep)',
                margin: 0,
                lineHeight: 1.15
              }}
            >
              {data.fullName || 'Candidate Name'}
            </h1>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                fontStyle: 'italic',
                color: 'var(--brand-forest)',
                marginTop: 'var(--space-1)'
              }}
            >
              {data.preferredRole || 'Candidate Position'} • {data.preferredIndustry || 'General Industry'}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: 'var(--brand-forest-deep)',
                textTransform: 'uppercase'
              }}
            >
              Vantara
            </span>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Global Recruitment Gateway
            </div>
          </div>
        </div>

        {/* Contact Strip */}
        <div
          style={{
            backgroundColor: 'var(--bg-primary)',
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-warm)',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-6)'
          }}
        >
          <span><strong>Email:</strong> {data.email || 'N/A'}</span>
          <span>•</span>
          <span><strong>Phone:</strong> {data.phone || 'N/A'}</span>
          <span>•</span>
          <span><strong>Location:</strong> {[data.city, data.country].filter(Boolean).join(', ') || 'N/A'}</span>
          {data.nationality && (
            <>
              <span>•</span>
              <span><strong>Nationality:</strong> {data.nationality}</span>
            </>
          )}
        </div>

        {/* Section: Professional Summary */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border-warm)',
              paddingBottom: 'var(--space-1)',
              marginBottom: 'var(--space-3)'
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 'var(--fw-bold)',
                color: 'var(--brand-forest)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: 0
              }}
            >
              Professional Summary
            </h3>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Edit
            </button>
          </div>
          <p style={{ fontSize: '0.925rem', lineHeight: 1.6, color: 'var(--text-primary)', margin: 0 }}>
            {getSummary()}
          </p>
        </div>

        {/* Section: Recruitment Preferences */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border-warm)',
              paddingBottom: 'var(--space-1)',
              marginBottom: 'var(--space-3)'
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 'var(--fw-bold)',
                color: 'var(--brand-forest)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: 0
              }}
            >
              Recruitment & Deployment Preferences
            </h3>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Edit
            </button>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-3)',
              fontSize: '0.875rem'
            }}
          >
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Primary Destination: </span>
              <strong>{data.preferredDestination || 'Flexible'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Additional Regions: </span>
              <strong>{data.additionalDestinations?.join(', ') || 'None'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Industry: </span>
              <strong>{data.preferredIndustry || 'N/A'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Skill Category: </span>
              <strong>{data.skillCategory || 'N/A'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Availability: </span>
              <strong>{data.availability || 'Immediate'}</strong>
            </div>
          </div>
        </div>

        {/* Section: Work Experience */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border-warm)',
              paddingBottom: 'var(--space-1)',
              marginBottom: 'var(--space-3)'
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 'var(--fw-bold)',
                color: 'var(--brand-forest)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: 0
              }}
            >
              Work Experience ({data.yearsOfExperience || 'Entry-Level'})
            </h3>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Edit
            </button>
          </div>

          {data.isEntryLevelNoExperience || !data.employmentHistory?.length ? (
            <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              Entry-Level Pathway — Pursuing foundational operational roles. Ready for on-the-job training and safety onboarding.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {data.employmentHistory.map((job) => (
                <div key={job.id} style={{ paddingLeft: 'var(--space-2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <div style={{ fontWeight: 'var(--fw-bold)', color: 'var(--brand-forest-deep)', fontSize: '0.95rem' }}>
                      {job.jobTitle || 'Role'} <span style={{ fontWeight: 'var(--fw-normal)', color: 'var(--text-muted)' }}>at</span> {job.company || 'Company'}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                      {job.startDate || 'Start'} – {job.isCurrent ? 'Present' : job.endDate || 'End'}
                    </div>
                  </div>
                  {job.responsibilities && (
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 'var(--space-1)', lineHeight: 1.5 }}>
                      {job.responsibilities}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section: Education & Certifications */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border-warm)',
              paddingBottom: 'var(--space-1)',
              marginBottom: 'var(--space-3)'
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 'var(--fw-bold)',
                color: 'var(--brand-forest)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: 0
              }}
            >
              Education & Certifications
            </h3>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Edit
            </button>
          </div>
          <div style={{ fontSize: '0.875rem', lineHeight: 1.55 }}>
            <div><strong>Highest Education:</strong> {data.highestEducation || 'High School'}</div>
            {data.certifications && (
              <div style={{ marginTop: 'var(--space-1)' }}>
                <strong>Certifications:</strong> {data.certifications}
              </div>
            )}
          </div>
        </div>

        {/* Section: Practical Skills & Languages */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border-warm)',
              paddingBottom: 'var(--space-1)',
              marginBottom: 'var(--space-3)'
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 'var(--fw-bold)',
                color: 'var(--brand-forest)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: 0
              }}
            >
              Skills & Languages
            </h3>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Edit
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {data.skills && data.skills.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8125rem',
                      color: 'var(--brand-forest-deep)',
                      border: '1px solid var(--border-warm)'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
            {data.languages && data.languages.length > 0 && (
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <strong>Languages: </strong>
                {data.languages.map((l) => `${l.language} (${l.proficiency})`).join(' • ')}
              </div>
            )}
          </div>
        </div>

        {/* Section: Professional Readiness */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border-warm)',
              paddingBottom: 'var(--space-1)',
              marginBottom: 'var(--space-3)'
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 'var(--fw-bold)',
                color: 'var(--brand-forest)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: 0
              }}
            >
              Professional Readiness
            </h3>
            <button
              type="button"
              onClick={() => onEditStep(4)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Edit
            </button>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--space-3)',
              fontSize: '0.875rem'
            }}
          >
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Valid Passport: </span>
              <strong>{data.passportStatus || 'Not declared'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Driving Licence: </span>
              <strong>{data.drivingLicense || 'None'}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer Strip */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          backgroundColor: 'var(--bg-pure)',
          padding: 'var(--space-5) var(--space-6)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-warm)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <button
          type="button"
          onClick={() => onEditStep(4)}
          className="btn btn-outline btn-sm"
        >
          <span>← Back to Step 4</span>
        </button>

        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isPdfGenerating}
            className="btn btn-secondary"
          >
            <span>{isPdfGenerating ? 'Generating...' : 'Download My CV (PDF)'}</span>
            <span aria-hidden="true">↓</span>
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="btn btn-primary"
          >
            <span>{isSubmitting ? 'Submitting Application...' : 'Submit Profile to Vantara'}</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
