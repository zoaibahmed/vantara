import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'How It Works | Vantara Workforce Solutions',
  description:
    'A transparent 5-stage coordination process for international hospitality workforce sourcing and deployment. A venture of Ascentra Global Ltd.'
};

const stages = [
  {
    stage: 'STAGE 01',
    timing: 'Days 1 – 5',
    title: 'Requirement Definition & Alignment',
    summary: 'Employer defines headcounts, departments, language expectations, and deployment deadlines.',
    details: [
      'Detailed role profile definition (Culinary, F&B, Housekeeping, Front Desk)',
      'Establishment of destination regulatory quotas and employer sponsorship parameters',
      'Target deployment timeline and operational start date alignment'
    ]
  },
  {
    stage: 'STAGE 02',
    timing: 'Days 6 – 18',
    title: 'Targeted Sourcing & Academy Shortlisting',
    summary: 'Vantara identifies qualified candidates through accredited hospitality talent networks.',
    details: [
      'Direct sourcing across Bangladesh, Philippines, and Nepal training academies',
      'Practical trade assessments, food safety certifications, and background verification',
      'Curated candidate video dossiers and verified CV submissions'
    ]
  },
  {
    stage: 'STAGE 03',
    timing: 'Days 19 – 25',
    title: 'Employer Selection Gateway',
    summary: 'Employer conducts live interviews and retains 100% final hiring authority.',
    details: [
      'Scheduled video interviews with shortlisted candidates at your convenience',
      'Practical culinary or service portfolio reviews with department heads',
      'Final selection sign-off: you approve only the individuals who fit your team culture'
    ]
  },
  {
    stage: 'STAGE 04',
    timing: 'Days 26 – 50',
    title: 'Bilateral Documentation & Compliance',
    summary: 'Vantara coordinates all visa filings, medical clearances, and origin-country exits.',
    details: [
      'Comprehensive medical examinations and embassy attestations',
      'Destination work permit documentation and government compliance coordination',
      'Pre-departure hospitality orientation and island living adaptation briefing'
    ]
  },
  {
    stage: 'STAGE 05',
    timing: 'Days 51 – 60',
    title: 'Flight Routing & On-Property Arrival',
    summary: 'Coordinated deployment directly to your resort or hotel destination.',
    details: [
      'Flight booking, transit scheduling, and destination immigration clearance support',
      'Direct handoff to resort human resources team for property onboarding',
      'Post-arrival check-ins to ensure seamless operational integration'
    ]
  }
];

const responsibilityMatrix = [
  {
    aspect: 'Candidate Selection & Vetting',
    vantara: 'Sources, practical-tests, and verifies candidate credentials',
    employer: 'Conducts final interviews and makes 100% of hiring decisions'
  },
  {
    aspect: 'Documentation & Compliance',
    vantara: 'Coordinates bilateral attestations, medicals, and visa packets',
    employer: 'Issues formal employment contracts and sponsor approvals'
  },
  {
    aspect: 'Logistics & Flights',
    vantara: 'Arranges flight schedules, transit routing, and pre-departure briefs',
    employer: 'Provides on-island airport transfer and staff accommodation'
  },
  {
    aspect: 'On-Property Operations',
    vantara: 'Maintains open communication for performance check-ins',
    employer: 'Directs daily shift tasks, property training, and standard operating procedures'
  }
];

const faqs = [
  {
    q: 'How much lead time is typically required for deployment?',
    a: 'Depending on destination immigration processing (such as Seychelles GOP or Maldives work permit quotas), standard deployment typically ranges from 45 to 60 days from final employer candidate selection.'
  },
  {
    q: 'Can our department heads conduct live video interviews?',
    a: 'Yes. We actively encourage Executive Chefs, F&B Directors, and General Managers to interview shortlisted candidates via video call before extending offers.'
  },
  {
    q: 'What happens if an employee does not meet operational standards?',
    a: 'Vantara maintains a dedicated replacement guarantee period during initial deployment to ensure complete operational continuity and employer peace of mind.'
  },
  {
    q: 'How are travel and visa costs structured?',
    a: 'All government fees, visa costs, medicals, and flight expenditures are clearly detailed upfront with zero hidden coordination markups. Direct invoicing ensures complete financial clarity.'
  }
];

export default function HowItWorksPage() {
  return (
    <main id="main-content">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-grid">
            <div>
              <span className="label-editorial">Coordination Workflow</span>
              <h1 className="display-hero" style={{ margin: 'var(--space-4) 0 var(--space-6)', textTransform: 'uppercase' }}>
                Tell Us What You Need.<br />
                <em>We Coordinate The Rest.</em>
              </h1>
              <p className="lead-text max-w-prose">
                A transparent, employer-first coordination process designed to eliminate international recruitment friction while keeping hiring decisions firmly in your hands.
              </p>
              <div style={{ marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-primary btn-lg">
                  <span>Start Workforce Request</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </Link>
                <Link href="/workforce" className="btn btn-secondary btn-lg">
                  <span>Explore Talent Corridors</span>
                </Link>
              </div>
            </div>
            <div className="page-hero-media">
              <Image
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1000&q=80"
                alt="Hospitality leadership coordinating operations on property"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="media-overlay-badge">
                <span>Operational Coordination • Transparent Milestones</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Stage Milestone Timeline */}
      <section className="section-spacing bg-primary">
        <div className="container-editorial">
          
          <div className="max-w-editorial" style={{ marginBottom: 'var(--space-10)' }}>
            <span className="label-editorial">End-to-End Roadmap</span>
            <h2 className="display-2" style={{ marginTop: 'var(--space-2)', textTransform: 'uppercase' }}>
              The 5-Stage Coordination Process.
            </h2>
            <p className="lead-text">
              Every stage is governed by clear timelines, transparent communication, and continuous employer visibility.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {stages.map((stage, idx) => (
              <div
                key={idx}
                className="journey-step-item"
                style={{ padding: 'var(--space-8)', borderLeft: '4px solid var(--brand-forest)', borderTop: 'none', backgroundColor: 'var(--bg-surface)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  <span className="label-editorial" style={{ margin: 0, color: 'var(--brand-forest)' }}>{stage.stage}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'var(--fw-bold)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {stage.timing}
                  </span>
                </div>
                <h3 className="display-3" style={{ margin: 'var(--space-1) 0 var(--space-2)', textTransform: 'uppercase' }}>{stage.title}</h3>
                <p className="lead-text" style={{ fontSize: '1rem', color: 'var(--brand-forest-deep)', marginBottom: 'var(--space-4)' }}>
                  {stage.summary}
                </p>
                <ul style={{ paddingLeft: 'var(--space-5)', margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {stage.details.map((detail, dIdx) => (
                    <li key={dIdx} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Responsibility Matrix */}
      <section className="section-spacing bg-secondary">
        <div className="container-editorial">
          <div className="max-w-editorial" style={{ marginBottom: 'var(--space-8)' }}>
            <span className="label-editorial">Partnership Roles</span>
            <h2 className="display-2" style={{ marginTop: 'var(--space-2)', textTransform: 'uppercase' }}>
              Who Does What.
            </h2>
            <p className="lead-text">
              We eliminate administrative ambiguity by delineating responsibilities clearly from day one.
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-warm)' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--brand-forest-deep)', color: 'var(--text-inverse)', textAlign: 'left' }}>
                  <th style={{ padding: 'var(--space-4)', fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Operational Aspect</th>
                  <th style={{ padding: 'var(--space-4)', fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Vantara Coordination</th>
                  <th style={{ padding: 'var(--space-4)', fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Employer Authority</th>
                </tr>
              </thead>
              <tbody>
                {responsibilityMatrix.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: 'var(--space-4)', fontWeight: 'var(--fw-bold)', fontSize: '0.875rem', color: 'var(--brand-forest-deep)' }}>
                      {row.aspect}
                    </td>
                    <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {row.vantara}
                    </td>
                    <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--brand-forest)', fontWeight: 'var(--fw-semibold)' }}>
                      {row.employer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section-spacing bg-primary">
        <div className="container-editorial">
          <div className="max-w-editorial" style={{ marginBottom: 'var(--space-8)' }}>
            <span className="label-editorial">Employer Inquiries</span>
            <h2 className="display-2" style={{ marginTop: 'var(--space-2)', textTransform: 'uppercase' }}>
              Frequently Asked Questions.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--bg-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-warm)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--brand-forest-deep)', marginBottom: 'var(--space-2)' }}>
                  {faq.q}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Strip */}
      <section className="climax-statement-section">
        <div className="container-editorial">
          <span className="label-editorial" style={{ color: 'var(--champagne)' }}>Take The Next Step</span>
          <h2 style={{ textTransform: 'uppercase' }}>Discuss Your Timeline With Us.</h2>
          <p>Tell us what your property needs. Our coordination team will review your parameters and provide a clear operational roadmap.</p>
          <Link href="/contact" className="btn btn-inverse-primary btn-lg">
            <span>Request Workforce Consultation</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
