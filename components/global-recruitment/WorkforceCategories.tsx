'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { WORKFORCE_CATEGORIES } from '@/lib/recruitment/constants';

interface WorkforceCategoriesProps {
  onSelectCategory?: (category: 'Skilled' | 'Semi-Skilled' | 'Entry-Level') => void;
}

export default function WorkforceCategories({ onSelectCategory }: WorkforceCategoriesProps) {
  const handleSelect = (tier: 'Skilled' | 'Semi-Skilled' | 'Entry-Level') => {
    if (onSelectCategory) {
      onSelectCategory(tier);
    }
    const builder = document.getElementById('cv-builder');
    if (builder) {
      builder.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="scene-container" id="categories-section" style={{ padding: 'var(--space-24) 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: 'var(--space-12)' }}>
          <span className="label-editorial">Candidate Competency Pathways</span>
          <h2
            className="display-2"
            style={{
              margin: 'var(--space-4) 0 var(--space-4)',
              textTransform: 'uppercase'
            }}
          >
            Opportunities Across<br />
            <em>Every Skill Level.</em>
          </h2>
          <p className="lead-text">
            International workforce ecosystems rely on a balanced hierarchy of technical leadership, practical execution, and motivated operational helpers. We evaluate and categorize every profile respectfully and accurately.
          </p>
        </div>

        {/* 3 Large Editorial Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'var(--space-8)'
          }}
        >
          {WORKFORCE_CATEGORIES.map((cat, idx) => {
            const tierMap: Record<string, 'Skilled' | 'Semi-Skilled' | 'Entry-Level'> = {
              skilled: 'Skilled',
              'semi-skilled': 'Semi-Skilled',
              'entry-level': 'Entry-Level'
            };
            const mappedTier = tierMap[cat.id];

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: idx * 0.12 }}
                style={{
                  backgroundColor: 'var(--bg-pure)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-warm)',
                  padding: 'var(--space-8)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.85rem',
                      fontWeight: 600,
                      color: 'var(--brand-forest-deep)',
                      marginBottom: 'var(--space-1)'
                    }}
                  >
                    {cat.title}
                  </div>
                  <div
                    style={{
                      fontSize: '0.8125rem',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 'var(--fw-semibold)',
                      color: 'var(--brand-forest)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      marginBottom: 'var(--space-4)'
                    }}
                  >
                    {cat.tagline}
                  </div>
                  <p
                    style={{
                      fontSize: '0.925rem',
                      lineHeight: 1.6,
                      color: 'var(--text-secondary)',
                      marginBottom: 'var(--space-6)'
                    }}
                  >
                    {cat.description}
                  </p>

                  {/* Typical Roles */}
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
                      Illustrative Positions:
                    </span>
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-2)'
                      }}
                    >
                      {cat.typicalRoles.map((role) => (
                        <li
                          key={role}
                          style={{
                            fontSize: '0.875rem',
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)'
                          }}
                        >
                          <span
                            style={{
                              width: '5px',
                              height: '5px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--brand-forest)',
                              flexShrink: 0
                            }}
                          />
                          <span>{role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Assessment Criteria */}
                  <div
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: 'var(--space-6)'
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        fontWeight: 'var(--fw-semibold)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--brand-forest)',
                        marginBottom: 'var(--space-1)'
                      }}
                    >
                      Evaluation Criteria:
                    </span>
                    <ul
                      style={{
                        paddingLeft: '1.25rem',
                        margin: 0,
                        fontSize: '0.8125rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5
                      }}
                    >
                      {cat.criteria.map((cr) => (
                        <li key={cr}>{cr}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    type="button"
                    onClick={() => handleSelect(mappedTier)}
                    className="btn btn-outline"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Register as {cat.title}</span>
                    <span className="btn-arrow" aria-hidden="true">→</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
