import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import EmployerRequestForm from '@/components/forms/EmployerRequestForm';

export const metadata: Metadata = {
  title: 'Request Workforce | Vantara Workforce Solutions',
  description:
    'Submit your hospitality workforce requirements to Vantara Workforce Solutions. Sourcing and deployment for hotels, resorts, and tourism operators.'
};

const consultationBenefits = [
  {
    title: 'Rapid 24-Hour Review',
    desc: 'Our coordination team reviews your role specifications and headcount requirements within one business day.'
  },
  {
    title: 'Custom Deployment Proposal',
    desc: 'We provide a tailored operational schedule outlining origin academies, visa processing timelines, and transparent costs.'
  },
  {
    title: '100% Employer Authority',
    desc: 'You maintain complete hiring authority over candidate shortlists and final selection interviews.'
  }
];

export default function ContactPage() {
  return (
    <main id="main-content">
      {/* Page Hero with Approachable Hospitality Team Photography */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-grid">
            <div>
              <span className="label-editorial">Employer Consultation Portal</span>
              <h1 className="display-hero" style={{ margin: 'var(--space-4) 0 var(--space-6)' }}>
                Tell Us What<br />
                <em>Your Operation Needs.</em>
              </h1>
              <p className="lead-text max-w-prose">
                Submit your hospitality workforce requirements below. Our coordination team will review your parameters, headcount needs, and timeline, then discuss next steps with your management.
              </p>
              <div style={{ marginTop: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <span className="caption" style={{ color: 'var(--brand-forest)', fontWeight: 600 }}>
                  Direct B2B Partnership • Full Selection Discretion
                </span>
              </div>
            </div>
            <div className="page-hero-media">
              <Image
                src="/images/custom/corridor-reception.jpg"
                alt="Hospitality front office team welcoming guests warmly"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="media-overlay-badge">
                <span>Direct Employer Support • Transparent Coordination</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Highlights Grid */}
      <section className="section-spacing bg-primary" style={{ paddingBottom: 0 }}>
        <div className="container-editorial">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-6)' }}>
            {consultationBenefits.map((item, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--bg-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-warm)' }}>
                <span className="badge-dot" style={{ marginBottom: 'var(--space-2)' }}></span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--brand-forest-deep)', marginBottom: 'var(--space-2)' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Request Form Section */}
      <section className="section-spacing bg-secondary">
        <div className="container-editorial">
          <EmployerRequestForm />
        </div>
      </section>
    </main>
  );
}
