'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RECRUITMENT_FAQS } from '@/lib/recruitment/constants';

export default function RecruitmentFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="scene-container" id="faq-section" style={{ padding: 'var(--space-24) 0', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <span className="label-editorial" style={{ justifyContent: 'center' }}>Knowledge & Clarity</span>
          <h2
            className="display-2"
            style={{
              margin: 'var(--space-4) 0 var(--space-4)',
              textTransform: 'uppercase'
            }}
          >
            Frequently Asked<br />
            <em>Questions.</em>
          </h2>
          <p className="lead-text">
            Clear, transparent answers about our international candidate registration and workforce coordination standards.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {RECRUITMENT_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.question}
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-warm)',
                  overflow: 'hidden',
                  transition: 'border-color var(--duration-fast)'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: 'var(--space-5) var(--space-6)',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--space-4)',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.0625rem',
                      fontWeight: 'var(--fw-semibold)',
                      color: isOpen ? 'var(--brand-forest)' : 'var(--text-primary)'
                    }}
                  >
                    {faq.question}
                  </span>

                  <span
                    style={{
                      fontSize: '1.25rem',
                      color: isOpen ? 'var(--brand-forest)' : 'var(--text-muted)',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform var(--duration-normal) var(--ease-smooth)',
                      flexShrink: 0
                    }}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          padding: '0 var(--space-6) var(--space-6)',
                          fontSize: '0.9375rem',
                          lineHeight: 1.65,
                          color: 'var(--text-secondary)',
                          borderTop: '1px solid var(--border-subtle)',
                          paddingTop: 'var(--space-4)'
                        }}
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
