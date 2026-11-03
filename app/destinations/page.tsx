import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Target Destinations | Vantara Workforce Solutions',
  description:
    "Explore Vantara's international hospitality destination focus across Seychelles, Maldives, Belize, and emerging tourism economies."
};

const destinationDossiers = [
  {
    country: 'Seychelles',
    tagline: 'Indian Ocean Luxury Resorts & Private Island Retreats',
    overview: 'Comprising 115 granite and coral islands, Seychelles is globally recognized for ultra-luxury private island retreats and prestigious five-star coastal properties requiring meticulous staff presentation.',
    image: '/images/custom/Gemini_Generated_Image_45fl3x45fl3x45fl.jpg',
    alt: 'Uniformed resort housekeeping specialist preparing luxury island suite',
    action: 'Seychelles • Island Suite Preparation',
    badge: 'Primary Focus Hub',
    logistics: [
      'Gainful Occupation Permit (GOP) coordination with immigration authorities',
      'French and English multilingual guest service requirements',
      'Private island staff accommodation and remote roster adaptation',
      'Culinary expertise tailored to seafood and international fusion dining'
    ],
    rolesInDemand: ['Chef de Partie', 'Villa Attendants', 'F&B Service Captains', 'Facilities Supervisors']
  },
  {
    country: 'Maldives',
    tagline: 'Overwater Villa Properties & Coral Atoll Resorts',
    overview: 'The global benchmark for one-island-one-resort hospitality. Remote atoll logistics require disciplined, uniformed culinary and service staff capable of delivering flawless guest experiences.',
    image: 'https://images.openai.com/static-rsc-4/xzJpS4qySbWbGRgVqdCBn7fK1W9tGuLS5JgDlqDm3L15RtxBsCFM2BI4lYck4_a5iTdwvN_-PIYyVHnb1C8Sy_CalvEl98_8kIvrEshPCSJPP1Cysc-4Nm8ynAZzvT9kLWV1dsle6eM4m5Lx8pFDAmhCZWPx1RDLFe7DDZ3C0co?purpose=inline',
    alt: 'Executive chef in white uniform jacket plating gourmet dishes for luxury resort guests',
    action: 'Maldives • Executive Culinary Brigade',
    badge: 'Primary Focus Hub',
    logistics: [
      'Expatriate work quota and employment visa clearance processing',
      'Speedboat and seaplane transfer coordination for deployed personnel',
      'High-volume seasonal holiday and dry-season staffing surges',
      'Water sports, diving center, and recreation guest assistance'
    ],
    rolesInDemand: ['Commis Chefs', 'Bartenders', 'Room Attendants', 'Guest Relations Officers']
  },
  {
    country: 'Belize & Central America',
    tagline: 'Boutique Eco-Lodges, Coastal Resorts & Barrier Reef Hubs',
    overview: 'A premier eco-tourism destination with growing boutique resorts across Ambergris Caye and Placencia requiring uniformed, high-touch hospitality service professionals.',
    image: 'https://images.openai.com/static-rsc-4/9kUoSlfdQuKvsN5XvzyZAVI67q5TELPsd73xnLUQuOlOJoWtMxxFnPRgVAc3o4vkZqT_X3MR0XCZkGc8Owp5XZ_tzTgcVWGNu6dc6P6CooTFoEuRcyaHjc_zvclS3JvaZQTmVljZFz6yIZTq5JRe_5meMhDMj_UbafnCUDq82L8?purpose=inline',
    alt: 'Uniformed waiter in formal attire serving guests dinner in luxury coastal dining room',
    action: 'Belize • Fine Dining Table Service',
    badge: 'Focus Destination',
    logistics: [
      'English-speaking destination integration and labor compliance',
      'Eco-lodge sustainability practices and low-impact operational training',
      'Caribbean coast and private caye seasonal workforce deployment',
      'Boutique hospitality cross-training across multiple guest touchpoints'
    ],
    rolesInDemand: ['Boutique Hotel Attendants', 'Line Cooks', 'Front Desk Agents', 'Event Porters']
  },
  {
    country: 'Expanding Destination Corridors',
    tagline: 'Mauritius, Zanzibar, UAE Coastal Resorts & Caribbean Basin',
    overview: 'Evaluating bespoke bilateral pipelines for tourism economies facing local talent shortages during rapid luxury hotel expansions.',
    image: 'https://images.openai.com/static-rsc-4/YEGLEvozf_spifu2PNk3DKoFd_bTgOh_uqr4w7Efg3LrH4aLN-CoKtsRBHme3rJLI7E0rV8Km75Cdb41T1CbbdcRypkh6YhCkSwveWxYZpFNXTCv6HchZbZHaF1z9IHADFSUdi9rwFHVrKJvLrkxWZew6mZQ3TZprbgikMNgRAE?purpose=inline',
    alt: 'Uniformed bartender in bar vest preparing craft drinks in ambient resort lounge',
    action: 'Expanding Corridors • Professional Bar & Mixology',
    badge: 'Expansion Territories',
    logistics: [
      'Tailored immigration review per target sovereign authority',
      'Custom academy sourcing matching regional language criteria',
      'Scalable recruitment batches for new property pre-openings',
      'Flexible deployment schedules aligned with regional tourist high seasons'
    ],
    rolesInDemand: ['Pre-Opening Teams', 'Specialty Chefs', 'Mixologists', 'Head Housekeepers']
  }
];

const destinationChallenges = [
  {
    title: 'Remote Island Logistics',
    problem: 'Remote island properties struggle with staff isolation, roster management, and complex transport.',
    solution: 'Vantara conducts rigorous island-readiness screening to select candidates accustomed to secluded resort living.'
  },
  {
    title: 'Seasonal Occupancy Surges',
    problem: 'Sudden high-season surges cause understaffing and service strain without dependable pipelines.',
    solution: 'Pre-vetted candidate pools ready for rapid deployment within agreed 45 to 60-day operational windows.'
  },
  {
    title: 'Immigration & Quota Compliance',
    problem: 'Burdensome bilateral documentation, medical attestations, and changing visa regulations.',
    solution: 'Complete administrative coordination handling medicals, attestations, and compliance end-to-end.'
  },
  {
    title: 'Multilingual Guest Standards',
    problem: 'High-net-worth international guests demand effortless English and high-touch cultural etiquette.',
    solution: 'Standardized communication benchmarks and pre-departure resort etiquette orientation.'
  }
];

export default function DestinationsPage() {
  return (
    <main id="main-content">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-grid">
            <div>
              <span className="label-editorial">Tourism-Dependent Markets</span>
              <h1 className="display-hero" style={{ margin: 'var(--space-4) 0 var(--space-6)' }}>
                Where Hospitality<br />
                <em>Needs Working People.</em>
              </h1>
              <p className="lead-text max-w-prose">
                International hospitality workforce coordination for tourism economies. We focus on premier island and coastal destinations where seasonal surges and luxury developments require dependable, professional staff on the floor.
              </p>
              <div style={{ marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-primary btn-lg">
                  <span>Deploy To Your Destination</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </Link>
                <Link href="/how-it-works" className="btn btn-secondary btn-lg">
                  <span>Our Coordination Process</span>
                </Link>
              </div>
            </div>
            <div className="page-hero-media">
              <Image
                src="https://images.pexels.com/photos/6284908/pexels-photo-6284908.jpeg"
                alt="Uniformed hotel operations manager actively supervising guest service on property"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="media-overlay-badge">
                <span>Working Hospitality Staff • Deployed Personnel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In-Depth Destination Dossiers */}
      <section className="section-spacing bg-primary">
        <div className="container">

          <div className="max-w-editorial" style={{ marginBottom: 'var(--space-10)' }}>
            <span className="label-editorial">Destination Hubs</span>
            <h2 className="display-2" style={{ marginTop: 'var(--space-2)' }}>
              Staffed Focus & Expansion Corridors.
            </h2>
            <p className="lead-text">
              Deploying vetted, uniformed culinary, service, and room management teams into the operational environments of premier tourism hubs.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
            {destinationDossiers.map((dest, idx) => (
              <div
                key={idx}
                className={`role-composition-block ${idx % 2 !== 0 ? 'is-reversed' : ''}`}
                style={{ backgroundColor: 'var(--bg-surface)', padding: 'clamp(1.5rem, 3vw, 3rem)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-warm)' }}
              >
                <div className="role-media-col" style={{ minHeight: '360px' }}>
                  <Image
                    src={dest.image}
                    alt={dest.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="role-action-badge">
                    <span>{dest.action}</span>
                  </div>
                </div>

                <div className="role-text-col">
                  <div className="badge-pill badge-forest" style={{ marginBottom: 'var(--space-2)' }}>{dest.badge}</div>
                  <h3 className="display-2" style={{ margin: 'var(--space-1) 0 var(--space-2)' }}>{dest.country}</h3>
                  <p className="lead-text" style={{ fontSize: '1rem', color: 'var(--brand-forest)', marginBottom: 'var(--space-3)' }}>
                    <em>{dest.tagline}</em>
                  </p>
                  <p style={{ marginBottom: 'var(--space-4)' }}>{dest.overview}</p>

                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 'var(--fw-bold)', letterSpacing: '0.08em', color: 'var(--brand-forest-deep)', marginBottom: 'var(--space-2)' }}>
                    Regulatory & Operational Considerations:
                  </h4>
                  <ul style={{ paddingLeft: 'var(--space-5)', margin: '0 0 var(--space-4) 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {dest.logistics.map((log, lIdx) => (
                      <li key={lIdx} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{log}</li>
                    ))}
                  </ul>

                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 'var(--fw-bold)', letterSpacing: '0.08em', color: 'var(--brand-forest-deep)', marginBottom: 'var(--space-2)' }}>
                    High-Demand Roles:
                  </h4>
                  <div className="role-tags-list">
                    {dest.rolesInDemand.map((role, rIdx) => (
                      <span key={rIdx} className="role-tag">{role}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Destination Challenges vs Vantara Solutions */}
      <section className="section-spacing bg-secondary">
        <div className="container">
          <div className="max-w-editorial" style={{ marginBottom: 'var(--space-8)' }}>
            <span className="label-editorial">Operational Problem Solving</span>
            <h2 className="display-2" style={{ marginTop: 'var(--space-2)' }}>
              Solving Destination Staffing Friction.
            </h2>
            <p className="lead-text">
              How Vantara tackles the unique logistical hurdles faced by island and remote luxury resorts.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
            {destinationChallenges.map((ch, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--bg-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-warm)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--brand-forest-deep)', marginBottom: 'var(--space-2)' }}>
                  {ch.title}
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
                  <strong>Challenge:</strong> {ch.problem}
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--brand-forest)', fontWeight: 'var(--fw-medium)', lineHeight: 1.5, margin: 0 }}>
                  <strong>Vantara Solution:</strong> {ch.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Conversion Strip */}
      <section className="climax-statement-section">
        <div className="container-editorial">
          <span className="label-editorial" style={{ color: 'var(--champagne)' }}>Destination Consultation</span>
          <h2 style={{ textTransform: 'none' }}>Operating in a Tourism Hub?</h2>
          <p>Contact Vantara to discuss international workforce deployment for your specific island or coastal destination.</p>
          <Link href="/contact" className="btn btn-inverse-primary btn-lg">
            <span>Request Workforce Consultation</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
