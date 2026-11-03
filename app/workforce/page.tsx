import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import WorkerForm from '@/components/forms/WorkerForm';

export const metadata: Metadata = {
  title: 'International Workforce | Vantara Workforce Solutions',
  description:
    'Discover verified international hospitality talent corridors across Bangladesh, Philippines, and Nepal. Rigorous screening and ethical deployment.'
};

const corridorDossiers = [
  {
    country: 'Bangladesh',
    region: 'South Asia Corridor',
    specialties: 'Culinary Support, Housekeeping Operations & Facilities Rigor',
    overview: 'Backed by a vast vocational training network and prestigious culinary institutes, Bangladeshi professionals are celebrated for work discipline, technical reliability, and rapid adaptation to high-volume kitchen environments.',
    image: 'https://images.openai.com/static-rsc-4/8EhmBqQu0jZZa3GoiEUkn3MAwQ12xTpbKLU-30IzM08lJjJXXUINfL5KDaSta-vRkCN4meG1TnciYUs2oVOcfqF_bX7620InEIum_hyjgrV7_zRt4vgr2R12z8BQg_Q86qQ880WDSRWWyk2KyKeUcoHNeI8BDsC7dS-X-r9uc68?purpose=inline',
    alt: 'Bangladeshi chef preparing food in professional kitchen',
    keyStrengths: [
      'Hot-line prep, butcher skills, and high-volume banquet cooking',
      'Pristine housekeeping execution and room presentation',
      'Facilities, maintenance, and technical plant assistance',
      'Strong institutional discipline and long-tenure commitment'
    ],
    tags: ['Culinary Arts', 'Housekeeping', 'Facilities Maintenance', 'Kitchen Stewarding']
  },
  {
    country: 'Philippines',
    region: 'Southeast Asia Corridor',
    specialties: 'Front Office, Guest Relations, F&B Service & Mixology',
    overview: 'The global benchmark for customer warmth, intuitive emotional intelligence, and fluent English communication. Filipino hospitality professionals integrate seamlessly into multinational five-star resort brands.',
    image: 'https://images.openai.com/static-rsc-4/rQI3sgbi_V2SFtZetfsMhnbK8xQiyJM0MeZq2omTyx6y-HsB5jNvEFY02LC0NtMd6kS9XMunPF3naJJZNmUdJiqS4slKXNe8r94N9A0A_VB0K50Rn3vIDTRe2UWaiNLZoiX4LN4V5Uu5cgA4V_mqLSKWUVzEgNluvST2KpPthdI?purpose=inline',
    alt: 'Filipino waiter providing attentive fine dining table service',
    keyStrengths: [
      'Native-level English fluency and natural hospitality warmth',
      'Formal silver service, fine dining etiquette, and wine presentation',
      'Front desk concierge, VIP guest relations, and reception leadership',
      'Creative mixology, cocktail bar craft, and barista operations'
    ],
    tags: ['Front Desk & Concierge', 'Food & Beverage', 'Guest Relations', 'Mixology']
  },
  {
    country: 'Nepal',
    region: 'Himalayan Corridor',
    specialties: 'Resort Operations, Villa Attendants, Dining & Kitchen Support',
    overview: 'Renowned worldwide for natural poise, calm hospitality temperament, and exceptional work integrity. Nepalese personnel excel in demanding private island and eco-lodge environments.',
    image: 'https://images.openai.com/static-rsc-4/1Bqye29oxMc7dHewcJO94o9vuqK6cBCNWYi1VjzqWnywDyIaZvsavn_CHyP6TcmurdcoD9TKupdAqOgSzSdv6D_dPdVWguHQazoqDdJWEcrmL1_t0qLDTmzde0Ky7i3JSvNU8-ubpw_1Z6jroh2w2lYysOn9wxEs93cte2Ei59U?purpose=inline',
    alt: 'Nepalese housekeeping attendant preparing oceanfront suite',
    keyStrengths: [
      'Attentive villa and suite attendance with meticulous detail',
      'Calm, courteous guest interaction and dining room support',
      'Adaptability to remote island living and tight-knit resort teams',
      'Kitchen support, pastry assistance, and banquet set-up'
    ],
    tags: ['Villa Attendance', 'Resort Operations', 'Dining Attendants', 'Culinary Prep']
  }
];

const vettingSteps = [
  {
    step: '01',
    title: 'Practical Trade Testing',
    desc: 'Candidates demonstrate practical cooking, table setting, bed-making, or guest greeting in certified hospitality simulation labs.'
  },
  {
    step: '02',
    title: 'English & Communication Assessment',
    desc: 'Direct oral proficiency evaluation assessing vocabulary, conversational confidence, and customer etiquette.'
  },
  {
    step: '03',
    title: 'Credential & Reference Verification',
    desc: 'Rigorous background screening, previous employer reference validation, and vocational certificate verification.'
  },
  {
    step: '04',
    title: 'Medical & Government Clearance',
    desc: 'Full medical examinations, police background checks, and official embassy clearance attestations.'
  }
];

export default function WorkforcePage() {
  return (
    <main id="main-content">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-grid">
            <div>
              <span className="label-editorial">International Talent Corridors</span>
              <h1 className="display-hero" style={{ margin: 'var(--space-4) 0 var(--space-6)' }}>
                International<br />
                <em>Hospitality Talent.</em>
              </h1>
              <p className="lead-text max-w-prose">
                Vantara connects tourism businesses with verified hospitality professionals from established international workforce markets. Every candidate is selected for craft competence, language fluency, and operational readiness.
              </p>
              <div style={{ marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-primary btn-lg">
                  <span>Request Workforce</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </Link>
                <a href="#candidate-portal" className="btn btn-secondary btn-lg">
                  <span>Join As Candidate</span>
                </a>
              </div>
            </div>
            <div className="page-hero-media">
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
                alt="Hospitality chef crafting culinary dishes in a professional resort kitchen"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="media-overlay-badge">
                <span>Environmental Workplace • Real Hospitality Talent</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Corridor Dossiers */}
      <section className="section-spacing bg-primary">
        <div className="container">

          <div className="max-w-editorial" style={{ marginBottom: 'var(--space-10)' }}>
            <span className="label-editorial">Origin Markets</span>
            <h2 className="display-2" style={{ marginTop: 'var(--space-2)' }}>
              Established Talent Corridors.
            </h2>
            <p className="lead-text">
              Deep regional relationships and accredited training partnerships across Asia’s primary hospitality workforce hubs.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            {corridorDossiers.map((corridor, idx) => (
              <div
                key={idx}
                className={`role-composition-block ${idx % 2 !== 0 ? 'is-reversed' : ''}`}
                style={{ backgroundColor: 'var(--bg-surface)', padding: 'clamp(1.5rem, 3vw, 3rem)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-warm)' }}
              >
                <div className="role-media-col" style={{ minHeight: '340px' }}>
                  <Image
                    src={corridor.image}
                    alt={corridor.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="role-action-badge">
                    <span>{corridor.country} • {corridor.region}</span>
                  </div>
                </div>

                <div className="role-text-col">
                  <span className="label-editorial">{corridor.region}</span>
                  <h3 className="display-2" style={{ margin: 'var(--space-1) 0 var(--space-2)' }}>{corridor.country}</h3>
                  <p className="lead-text" style={{ fontSize: '1rem', color: 'var(--brand-forest)', marginBottom: 'var(--space-3)' }}>
                    <em>{corridor.specialties}</em>
                  </p>
                  <p style={{ marginBottom: 'var(--space-4)' }}>{corridor.overview}</p>

                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 'var(--fw-bold)', letterSpacing: '0.08em', color: 'var(--brand-forest-deep)', marginBottom: 'var(--space-2)' }}>
                    Core Strengths:
                  </h4>
                  <ul style={{ paddingLeft: 'var(--space-5)', margin: '0 0 var(--space-4) 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {corridor.keyStrengths.map((str, sIdx) => (
                      <li key={sIdx} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{str}</li>
                    ))}
                  </ul>

                  <div className="role-tags-list">
                    {corridor.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="role-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4-Tier Candidate Vetting Pipeline */}
      <section className="section-spacing bg-secondary">
        <div className="container">
          <div className="max-w-editorial" style={{ marginBottom: 'var(--space-8)' }}>
            <span className="label-editorial">Vetting Standard</span>
            <h2 className="display-2" style={{ marginTop: 'var(--space-2)' }}>
              The 4-Tier Candidate Screening Framework.
            </h2>
            <p className="lead-text">
              Ensuring skill competence, personal integrity, and emotional readiness before any profile reaches an employer.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-6)' }}>
            {vettingSteps.map((v, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--bg-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-warm)' }}>
                <span className="journey-step-num" style={{ margin: '0 0 var(--space-2) 0' }}>{v.step}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--brand-forest-deep)', marginBottom: 'var(--space-2)' }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ethical Recruitment Charter */}
      <section className="section-spacing bg-primary">
        <div className="container-editorial">
          <span className="label-editorial">Social Responsibility</span>
          <h2 className="display-2" style={{ margin: 'var(--space-2) 0 var(--space-4)' }}>
            Our Ethical Recruitment Charter.
          </h2>
          <p className="lead-text" style={{ marginBottom: 'var(--space-6)' }}>
            Vantara strictly adheres to fair recruitment principles. We believe that professional dignity, transparent employment contracts, and zero candidate placement fees are foundational to long-term worker retention and exceptional guest service.
          </p>
          <div className="requirement-pill-grid">
            <span className="requirement-pill">Zero Placement Fees to Workers</span>
            <span className="requirement-pill">Transparent Native-Language Contracts</span>
            <span className="requirement-pill">Full Destination Legal Protections</span>
            <span className="requirement-pill">Verified Living & Accommodation Standards</span>
          </div>
        </div>
      </section>

      {/* Candidate Gateway Section */}
      <section className="enquiry-section section-spacing bg-secondary" id="candidate-portal">
        <div className="container-editorial">
          <div className="max-w-editorial">
            <span className="label-editorial">Candidate Registration</span>
            <h2 className="display-1" style={{ margin: 'var(--space-2) 0 var(--space-3)' }}>
              Are You A Hospitality<br />Professional?
            </h2>
            <p className="lead-text">
              Register your profile with Vantara to be considered for international resort and hotel placements across our destination corridors.
            </p>
          </div>

          <WorkerForm />
        </div>
      </section>
    </main>
  );
}
