'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RECRUITMENT_PROCESS_STEPS } from '@/lib/recruitment/constants';

export default function RecruitmentProcess() {
  return (
    <section className="scene-container" id="process-section" style={{ backgroundColor: 'var(--brand-forest-deep)', color: 'var(--text-inverse)', padding: 'var(--space-24) 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: 'var(--space-16)' }}>
          <span className="label-editorial" style={{ color: 'var(--champagne)' }}>Candidate Journey</span>
          <h2
            className="display-2"
            style={{
              margin: 'var(--space-4) 0 var(--space-4)',
              textTransform: 'uppercase',
              color: 'var(--champagne)'
            }}
          >
            A Simple Path to<br />
            <em>Professional Registration.</em>
          </h2>
          <p className="lead-text" style={{ color: 'var(--text-inverse-muted)' }}>
            We have designed a frictionless, structured candidate registration model without complicated dashboards or account creation.
          </p>
        </div>

        {/* 5-Step Process Timeline */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-6)',
            position: 'relative'
          }}
        >
          {RECRUITMENT_PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.stepNumber}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(237, 228, 211, 0.14)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.75rem',
                    fontWeight: 'var(--fw-bold)',
                    letterSpacing: '0.12em',
                    color: 'var(--champagne)',
                    marginBottom: 'var(--space-3)'
                  }}
                >
                  {step.stepLabel}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    lineHeight: 1,
                    color: 'rgba(237, 228, 211, 0.3)',
                    marginBottom: 'var(--space-4)'
                  }}
                >
                  {step.stepNumber}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.0625rem',
                    fontWeight: 'var(--fw-semibold)',
                    color: 'var(--text-inverse)',
                    marginBottom: 'var(--space-3)'
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    color: 'var(--text-inverse-muted)',
                    margin: 0
                  }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Realistic Expectations Notice */}
        <div
          style={{
            marginTop: 'var(--space-12)',
            padding: 'var(--space-5) var(--space-6)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(237, 228, 211, 0.12)',
            fontSize: '0.8125rem',
            lineHeight: 1.6,
            color: 'var(--text-inverse-muted)'
          }}
        >
          <strong>Notice Regarding Opportunity Matching:</strong> Submitting a candidate profile registers your credentials in our active recruitment talent pool. It does not imply or guarantee an interview, job offer, or placement. Candidate outreach occurs exclusively when verified employer requirements match your specific trade qualifications and regional preferences.
        </div>
      </div>
    </section>
  );
}
