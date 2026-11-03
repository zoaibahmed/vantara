'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TARGET_REGIONS } from '@/lib/recruitment/constants';

interface DestinationCardsProps {
  onSelectDestination?: (regionName: string) => void;
}

export default function DestinationCards({ onSelectDestination }: DestinationCardsProps) {
  const handleRegister = (regionName: string) => {
    if (onSelectDestination) {
      onSelectDestination(regionName);
    }
    const builder = document.getElementById('cv-builder');
    if (builder) {
      builder.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="scene-container" id="destinations-section" style={{ padding: 'var(--space-24) 0' }}>
      <div className="container">
        {/* Editorial Section Header */}
        <div style={{ maxWidth: '780px', marginBottom: 'var(--space-12)' }}>
          <span className="label-editorial">Target Recruitment Focus</span>
          <h2
            className="display-2"
            style={{
              margin: 'var(--space-4) 0 var(--space-4)',
              textTransform: 'uppercase'
            }}
          >
            Explore Global<br />
            <em>Opportunities.</em>
          </h2>
          <p className="lead-text">
            We evaluate international candidate pathways across key economic regions experiencing high demand for reliable, verified workforce personnel.
          </p>
        </div>

        {/* 4 Large Premium Destination Cards (2x2 Grid) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))',
            gap: 'var(--space-8)'
          }}
        >
          {TARGET_REGIONS.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              style={{
                backgroundColor: 'var(--bg-pure)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-warm)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform var(--duration-normal) var(--ease-smooth), box-shadow var(--duration-normal)'
              }}
            >
              {/* Image Banner */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '260px'
                }}
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(14, 39, 27, 0.75) 0%, transparent 60%)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 'var(--space-4)',
                    left: 'var(--space-6)',
                    right: 'var(--space-6)',
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.85rem',
                      fontWeight: 600,
                      color: 'var(--text-inverse)',
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase'
                    }}
                  >
                    {card.region}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: 'rgba(237, 228, 211, 0.25)',
                      color: 'var(--champagne)',
                      border: '1px solid rgba(237, 228, 211, 0.3)'
                    }}
                  >
                    Intended Corridor
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: 'var(--space-6) var(--space-8)',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8125rem',
                      fontWeight: 'var(--fw-semibold)',
                      color: 'var(--brand-forest)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      marginBottom: 'var(--space-2)'
                    }}
                  >
                    {card.tagline}
                  </div>
                  <p
                    style={{
                      fontSize: '0.965rem',
                      lineHeight: 1.6,
                      color: 'var(--text-secondary)',
                      margin: '0 0 var(--space-4)'
                    }}
                  >
                    {card.copy}
                  </p>

                  {/* Industries tags */}
                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 'var(--fw-semibold)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--text-muted)',
                        marginBottom: 'var(--space-2)'
                      }}
                    >
                      Relevant Industries:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                      {card.industries.map((ind) => (
                        <span
                          key={ind}
                          style={{
                            fontSize: '0.8125rem',
                            padding: '3px 9px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--bg-secondary)',
                            color: 'var(--brand-forest-deep)',
                            border: '1px solid var(--border-warm)'
                          }}
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div style={{ paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    type="button"
                    onClick={() => handleRegister(card.region)}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Register Your Interest ({card.region})</span>
                    <span className="btn-arrow" aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legal Disclaimer Box */}
        <div
          style={{
            marginTop: 'var(--space-10)',
            padding: 'var(--space-4) var(--space-6)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-secondary)',
            borderLeft: '3px solid var(--brand-forest)',
            fontSize: '0.8125rem',
            lineHeight: 1.55,
            color: 'var(--text-secondary)'
          }}
        >
          <strong>Governance Notice:</strong> All regions represent intended recruitment focus corridors and are subject to confirmed employer requirements, candidate eligibility, and lawful immigration procedures under host sovereign labor laws. Vantara does not guarantee job placement or visa approvals.
        </div>
      </div>
    </section>
  );
}
