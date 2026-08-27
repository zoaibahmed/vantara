import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Vantara | Vantara Workforce Solutions',
  description:
    'Vantara Workforce Solutions operates under Ascentra Global Ltd to provide transparent, employer-first international hospitality workforce coordination.'
};

const pillars = [
  {
    num: '01',
    title: 'Employer-First Philosophy',
    subtitle: '100% Final Selection Authority',
    desc: 'We design our coordination directly around the commercial and operational priorities of hospitality employers. You interview, evaluate, and approve every candidate before deployment. We never force placements or compromise on role criteria.'
  },
  {
    num: '02',
    title: 'International Reach & Scale',
    subtitle: 'Bilateral Cross-Border Pipelines',
    desc: 'We operate cross-border recruitment pipelines linking established workforce nations with tourism destinations, handling multi-country logistics, embassy attestations, and medical clearances seamlessly.'
  },
  {
    num: '03',
    title: 'Hospitality Specialization',
    subtitle: 'Exclusively Hotels, Resorts & Dining',
    desc: 'We concentrate strictly on hotels, resorts, dining establishments, and tourism operators. Our evaluation criteria focus on real operational readiness, trade skill mastery, and guest service etiquette.'
  },
  {
    num: '04',
    title: 'Practical Integrity & Clarity',
    subtitle: 'No Vague Promises or Hidden Markups',
    desc: 'Transparent pricing, honest visa timelines, and realistic lead times from day one. If a role requires 50 days of embassy processing, we state it upfront so you can plan operations with certainty.'
  }
];

const values = [
  {
    title: 'Respect for the Craft',
    desc: 'Hospitality is an art practiced by skilled artisans—from executive chefs to villa attendants. We honor their expertise through dignified placement.'
  },
  {
    title: 'Operational Dependability',
    desc: 'Resorts cannot pause operations. We deliver predictable recruitment pipelines that protect your service consistency during peak seasons.'
  },
  {
    title: 'Fair & Ethical Sourcing',
    desc: 'Zero candidate fees, transparent native-language contracts, and rigorous adherence to international labor standards across all origin corridors.'
  },
  {
    title: 'Bilateral Compliance',
    desc: 'Full regulatory alignment with host government labor departments and origin country exit documentation protocols.'
  }
];

export default function AboutPage() {
  return (
    <main id="main-content">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-grid">
            <div>
              <span className="label-editorial">Brand Philosophy & Governance</span>
              <h1 className="display-hero" style={{ margin: 'var(--space-4) 0 var(--space-6)', textTransform: 'uppercase' }}>
                We Believe International<br />
                <em>Workforce Should Be Simpler.</em>
              </h1>
              <p className="lead-text max-w-prose">
                Vantara Workforce Solutions was founded to eliminate the opacity, delays, and friction of international hospitality staffing. We connect premier tourism destinations with world-class hospitality talent through structured, reliable B2B coordination.
              </p>
              <div style={{ marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-primary btn-lg">
                  <span>Speak With Our Team</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </Link>
                <Link href="/how-it-works" className="btn btn-secondary btn-lg">
                  <span>Our Coordination Model</span>
                </Link>
              </div>
            </div>
            <div className="page-hero-media">
              <Image
                src="https://images.unsplash.com/photo-1756885465373-bce82fd5c944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvc3BpdGFsaXR5JTIwdGVhbSUyMGhvdGVsfGVufDB8fDB8fHww"
                alt="International hospitality team interacting naturally at a luxury resort"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="media-overlay-badge">
                <span>People • Hospitality • Global Corridors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story & Vision */}
      <section className="section-spacing bg-secondary">
        <div className="container-editorial">
          <span className="label-editorial">The Vantara Story</span>
          <h2 className="display-2" style={{ margin: 'var(--space-3) 0 var(--space-4)', textTransform: 'uppercase' }}>
            Built For Hospitality Operators.
          </h2>
          <p className="lead-text" style={{ marginBottom: 'var(--space-4)' }}>
            Tourism-dependent destinations—from isolated atolls in the Maldives to private islands in the Seychelles—face a shared operational dilemma: local workforce limits during seasonal surges combined with the bureaucratic hurdles of cross-border hiring.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
            Traditional recruitment agencies often treat hospitality as an afterthought, sending generic resumes with little regard for culinary standards, fine dining etiquette, or remote island living readiness.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Vantara was created to change this. We operate as a dedicated B2B partner, managing the end-to-end corridor logistics while giving resort operators full visibility, vetting precision, and hiring control.
          </p>
        </div>
      </section>

      {/* 4 Core Pillars of Trust */}
      <section className="section-spacing bg-primary">
        <div className="container">

          <div className="max-w-editorial" style={{ marginBottom: 'var(--space-10)' }}>
            <span className="label-editorial">Guiding Principles</span>
            <h2 className="display-2" style={{ marginTop: 'var(--space-2)', textTransform: 'uppercase' }}>
              Four Pillars of Trust.
            </h2>
            <p className="lead-text">
              The foundational standards that guide our relationships with resort operators, destination authorities, and international professionals.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
            {pillars.map((pillar, idx) => (
              <div key={idx} className="trust-pillar-card" style={{ backgroundColor: 'var(--bg-surface)', padding: 'var(--space-8)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-warm)' }}>
                <span className="journey-step-num" style={{ margin: '0 0 var(--space-2) 0' }}>{pillar.num}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: 'var(--brand-forest-deep)', margin: 'var(--space-1) 0 var(--space-1)' }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--brand-forest)', fontWeight: 'var(--fw-semibold)', marginBottom: 'var(--space-3)' }}>
                  {pillar.subtitle}
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Corporate Governance & Ascentra Global Ltd */}
      <section className="section-spacing bg-secondary">
        <div className="container-editorial">
          <span className="label-editorial">Corporate Governance</span>
          <h2 className="display-2" style={{ margin: 'var(--space-3) 0 var(--space-4)', textTransform: 'uppercase' }}>
            A Venture of Ascentra Global Ltd.
          </h2>
          <p className="lead-text" style={{ marginBottom: 'var(--space-6)' }}>
            Vantara Workforce Solutions operates under the corporate governance of <strong>Ascentra Global Ltd</strong>. This structure provides robust legal compliance, international banking security, and bilateral contracting integrity across all origin and destination jurisdictions.
          </p>
          <div className="requirement-pill-grid">
            <span className="requirement-pill">Institutional Governance</span>
            <span className="requirement-pill">Bilateral Trade Compliance</span>
            <span className="requirement-pill">Transparent Contracting</span>
            <span className="requirement-pill">Audited Ethical Standards</span>
          </div>
        </div>
      </section>

      {/* Working Values Grid */}
      <section className="section-spacing bg-primary">
        <div className="container">
          <div className="max-w-editorial" style={{ marginBottom: 'var(--space-8)' }}>
            <span className="label-editorial">Core Values</span>
            <h2 className="display-2" style={{ marginTop: 'var(--space-2)', textTransform: 'uppercase' }}>
              How We Operate.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-6)' }}>
            {values.map((v, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--bg-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-warm)' }}>
                <span className="badge-dot" style={{ marginBottom: 'var(--space-2)' }}></span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--brand-forest-deep)', marginBottom: 'var(--space-2)' }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Conversion Strip */}
      <section className="climax-statement-section">
        <div className="container-editorial">
          <span className="label-editorial" style={{ color: 'var(--champagne)' }}>Executive Leadership</span>
          <h2 style={{ textTransform: 'uppercase' }}>Connect With Our Leadership.</h2>
          <p>Learn how Vantara can become your trusted workforce coordination partner.</p>
          <Link href="/contact" className="btn btn-inverse-primary btn-lg">
            <span>Request Consultation</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
