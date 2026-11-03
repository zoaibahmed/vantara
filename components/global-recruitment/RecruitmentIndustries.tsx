'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { RECRUITMENT_INDUSTRIES } from '@/lib/recruitment/constants';

interface RecruitmentIndustriesProps {
  onSelectIndustry?: (industryName: string) => void;
}

export default function RecruitmentIndustries({ onSelectIndustry }: RecruitmentIndustriesProps) {
  const handleBuildCv = (industryName: string) => {
    if (onSelectIndustry) {
      onSelectIndustry(industryName);
    }
    const builder = document.getElementById('cv-builder');
    if (builder) {
      builder.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="scene-container" id="industries-section" style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-24) 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '780px', marginBottom: 'var(--space-12)' }}>
          <span className="label-editorial">Specialized Workforce Sectors</span>
          <h2
            className="display-2"
            style={{
              margin: 'var(--space-4) 0 var(--space-4)',
              textTransform: 'uppercase'
            }}
          >
            Your Skills.<br />
            <em>Multiple Industries.</em>
          </h2>
          <p className="lead-text">
            We coordinate candidate sourcing across critical industrial sectors where technical discipline, practical trade competency, and dependable work ethic are vital.
          </p>
        </div>

        {/* 6 Professional Industry Cards (3x2 Grid) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'var(--space-6)'
          }}
        >
          {RECRUITMENT_INDUSTRIES.map((ind, idx) => (
            <motion.div
              key={ind.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-warm)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {/* Media Thumbnail */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '190px'
                }}
              >
                <Image
                  src={ind.image}
                  alt={ind.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(14, 39, 27, 0.6) 0%, transparent 60%)'
                  }}
                />
              </div>

              {/* Card Content */}
              <div
                style={{
                  padding: 'var(--space-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.45rem',
                      fontWeight: 600,
                      color: 'var(--brand-forest-deep)',
                      margin: '0 0 var(--space-2)'
                    }}
                  >
                    {ind.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.55,
                      color: 'var(--text-secondary)',
                      margin: '0 0 var(--space-4)'
                    }}
                  >
                    {ind.description}
                  </p>

                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        fontWeight: 'var(--fw-semibold)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--text-muted)',
                        marginBottom: 'var(--space-2)'
                      }}
                    >
                      Key In-Demand Roles:
                    </span>
                    <p
                      style={{
                        fontSize: '0.825rem',
                        lineHeight: 1.5,
                        color: 'var(--text-primary)',
                        margin: 0
                      }}
                    >
                      {ind.exampleRoles.join(' • ')}
                    </p>
                  </div>
                </div>

                <div style={{ paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    type="button"
                    onClick={() => handleBuildCv(ind.name)}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Build Your CV in {ind.name}</span>
                    <span className="btn-arrow" aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
