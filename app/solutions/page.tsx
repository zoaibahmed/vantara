import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Hospitality Solutions | Vantara Workforce Solutions',
  description:
    'Tailored international hospitality workforce sourcing and deployment across Hotel Operations, Food & Beverage, Culinary Arts, and Events.'
};

const solutionsData = [
  {
    id: 'hotel-operations',
    space: 'Rooms & Front of House',
    title: 'Hotel & Resort Operations',
    tagline: 'Pristine Presentation & High-Touch Guest Reception',
    desc: 'From arrival concierge to pristine villa maintenance, our hotel operational talent is selected for professional discretion, grooming, and high-touch customer etiquette.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
    alt: 'Housekeeping specialist finishing luxury suite presentation',
    action: 'Suite Care & Arrival Readiness',
    roles: [
      { name: 'Executive & Floor Housekeepers', desc: 'Detail-driven suite cleaning, turn-down standards, and inventory management.' },
      { name: 'Front Desk & Guest Relations', desc: 'Multilingual reception, check-in hospitality, and attentive VIP guest handling.' },
      { name: 'Concierge & Porters', desc: 'Luggage assistance, excursion coordination, and warm arrival greetings.' },
      { name: 'Villa & Butler Attendants', desc: 'Dedicated private villa services for high-end luxury resort properties.' }
    ],
    isReversed: false
  },
  {
    id: 'food-and-beverage',
    space: 'Dining & Service Excellence',
    title: 'Food & Beverage Service',
    tagline: 'Intuitive Table Service, Mixology & Banquet Coordination',
    desc: 'Specialized F&B service staff equipped to handle high-turnover beachfront venues, fine-dining restaurants, cocktail lounges, and intimate private villa dining.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80',
    alt: 'Waiters serving dinner on luxury outdoor terrace',
    action: 'Fine Dining & Guest Table Service',
    roles: [
      { name: 'Fine Dining Waiters & Captains', desc: 'Formal silver service, menu presentation, and wine service etiquette.' },
      { name: 'Bartenders & Mixologists', desc: 'Craft cocktail preparation, beverage inventory, and ambient bar management.' },
      { name: 'Baristas & Cafe Specialists', desc: 'Specialty coffee brewing, breakfast buffet flow, and lounge service.' },
      { name: 'F&B Supervisors & Head Waiters', desc: 'Shift leadership, table rotation oversight, and service timing control.' }
    ],
    isReversed: true
  },
  {
    id: 'culinary-arts',
    space: 'Kitchen & Culinary Arts',
    title: 'Culinary & Back of House',
    tagline: 'High-Pace Hot Line Execution & Strict Hygiene Compliance',
    desc: 'Trained culinary professionals ready to integrate into hotel kitchens, banquet production lines, and specialty restaurants with rigorous hygiene standards.',
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1000&q=80',
    alt: 'Executive chef and brigade collaborating on commercial line',
    action: 'Culinary Brigade Precision',
    roles: [
      { name: 'Sous Chefs & Chefs de Partie', desc: 'Section leadership, hot-line station mastery, and gourmet recipe execution.' },
      { name: 'Commis Chefs & Line Cooks', desc: 'Mise en place, butchery, vegetable preparation, and fast line support.' },
      { name: 'Pastry & Bakery Specialists', desc: 'Artisanal bread baking, delicate desserts, and banquet pastry production.' },
      { name: 'Stewarding & Sanitation Staff', desc: 'HACCP hygiene adherence, deep ware-washing, and kitchen sanitization.' }
    ],
    isReversed: false
  },
  {
    id: 'events-and-resorts',
    space: 'Guest Experiences & Banqueting',
    title: 'Events & Resort Operations',
    tagline: 'Dynamic Staffing for Destination Weddings, Galas & Retreats',
    desc: 'Flexible operational personnel to orchestrate destination weddings, seasonal corporate summits, and resort recreational experiences.',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1000&q=80',
    alt: 'Hospitality banquet staff organizing oceanfront luxury event setup',
    action: 'Event Coordination & Guest Experiences',
    roles: [
      { name: 'Banquet Servers & Set-up Crews', desc: 'Rapid ballroom transformation, buffet staging, and large-scale event flow.' },
      { name: 'Recreation & Pool Attendants', desc: 'Towel cabana management, poolside refreshment, and watersports support.' },
      { name: 'Event Hospitality Supervisors', desc: 'Direct timeline execution for weddings, galas, and VIP corporate retreats.' },
      { name: 'Logistics & Facility Support', desc: 'Property setup, lighting assistance, and seasonal operational surge support.' }
    ],
    isReversed: true
  }
];

const standards = [
  {
    title: 'English & Communication Standards',
    desc: 'Every candidate undergoes comprehensive language assessment to ensure clear, courteous communication with international guests.'
  },
  {
    title: 'Practical Trade Verification',
    desc: 'Practical trade testing in accredited hospitality facilities prior to shortlisting, verifying real skills in cooking, service, and housekeeping.'
  },
  {
    title: 'HACCP & Food Safety Compliance',
    desc: 'Kitchen and F&B professionals are certified in international food safety standards, preventing cross-contamination and maintaining pristine cleanliness.'
  },
  {
    title: 'Resort Etiquette & Cultural Adaptability',
    desc: 'Pre-departure training covering island resort hospitality etiquette, guest privacy discretion, and multinational team integration.'
  }
];

export default function SolutionsPage() {
  return (
    <main id="main-content">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-grid">
            <div>
              <span className="label-editorial">Operational Scope</span>
              <h1 className="display-hero" style={{ margin: 'var(--space-4) 0 var(--space-6)', textTransform: 'uppercase' }}>
                Hospitality Workforce,<br />
                <em>Built Around Your Operation.</em>
              </h1>
              <p className="lead-text max-w-prose">
                Vantara helps tourism businesses source and coordinate international hospitality professionals across every key functional department. We match vetted candidates to your operational scale and service philosophy.
              </p>
              <div style={{ marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-primary btn-lg">
                  <span>Request Workforce</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </Link>
                <Link href="/how-it-works" className="btn btn-secondary btn-lg">
                  <span>How Coordination Works</span>
                </Link>
              </div>
            </div>
            <div className="page-hero-media">
              <Image
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"
                alt="Hospitality staff welcoming guests at premier luxury resort"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="media-overlay-badge">
                <span>Tailored Roles • Active Hospitality Personnel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Sectors Breakdown */}
      <section className="section-spacing bg-primary">
        <div className="container">
          
          <div className="max-w-editorial" style={{ marginBottom: 'var(--space-10)' }}>
            <span className="label-editorial">Departmental Coverage</span>
            <h2 className="display-2" style={{ marginTop: 'var(--space-2)', textTransform: 'uppercase' }}>
              Four Core Operational Pillars.
            </h2>
            <p className="lead-text">
              Comprehensive role coordination designed to support boutique lodges, 5-star island resorts, and high-volume F&B operators.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
            {solutionsData.map((sector) => (
              <div
                key={sector.id}
                id={sector.id}
                className={`role-composition-block ${sector.isReversed ? 'is-reversed' : ''}`}
              >
                <div className="role-media-col">
                  <Image
                    src={sector.image}
                    alt={sector.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="role-action-badge">
                    <span>{sector.action}</span>
                  </div>
                </div>

                <div className="role-text-col">
                  <span className="label-editorial">{sector.space}</span>
                  <h3 className="display-2" style={{ margin: 'var(--space-2) 0 var(--space-2)' }}>{sector.title}</h3>
                  <p className="lead-text" style={{ fontSize: '1.0625rem', color: 'var(--brand-forest)', marginBottom: 'var(--space-3)' }}>
                    <em>{sector.tagline}</em>
                  </p>
                  <p style={{ marginBottom: 'var(--space-6)' }}>{sector.desc}</p>

                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 'var(--fw-bold)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brand-forest-deep)', marginBottom: 'var(--space-3)' }}>
                    Specialized Roles Coordinated:
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-3)' }}>
                    {sector.roles.map((r, rIdx) => (
                      <div key={rIdx} style={{ backgroundColor: 'var(--bg-surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                        <strong style={{ display: 'block', fontSize: '0.875rem', color: 'var(--brand-forest-deep)', marginBottom: '2px' }}>{r.name}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>{r.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Operational Standards & Vetting Quality */}
      <section className="section-spacing bg-secondary">
        <div className="container">
          <div className="max-w-editorial" style={{ marginBottom: 'var(--space-8)' }}>
            <span className="label-editorial">Quality Assurance</span>
            <h2 className="display-2" style={{ marginTop: 'var(--space-2)', textTransform: 'uppercase' }}>
              The Vantara Readiness Standard.
            </h2>
            <p className="lead-text">
              We ensure every professional arriving at your property has undergone practical verification, language testing, and operational alignment.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-6)' }}>
            {standards.map((std, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--bg-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-warm)' }}>
                <span className="badge-dot" style={{ marginBottom: 'var(--space-3)' }}></span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--brand-forest-deep)', marginBottom: 'var(--space-2)' }}>
                  {std.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {std.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Conversion Strip */}
      <section className="climax-statement-section">
        <div className="container-editorial">
          <span className="label-editorial" style={{ color: 'var(--champagne)' }}>Direct Consultation</span>
          <h2 style={{ textTransform: 'uppercase' }}>Ready to Coordinate Your Team?</h2>
          <p>Tell us your property requirements, department headcounts, and start timeline. We will prepare an end-to-end workforce deployment overview.</p>
          <Link href="/contact" className="btn btn-inverse-primary btn-lg">
            <span>Request Workforce</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
