'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function GlobalRecruitmentIntro() {
  const pillars = [
    {
      num: '01',
      title: 'Structured Profiles',
      desc: 'Transparent verification of technical trade skills, vocational background, and real workplace competencies.'
    },
    {
      num: '02',
      title: 'Employer-Led Selection',
      desc: 'Direct employer interview gateways, ensuring complete alignment on cultural fit and role responsibilities.'
    },
    {
      num: '03',
      title: 'Ethical Standards',
      desc: 'Zero candidate placement fees, bilingual contractual clarity, and strict adherence to international labor standards.'
    }
  ];

  return (
    <section className="scene-container" style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-24) 0' }}>
      <div className="container">
        <div style={{ maxWidth: '820px', margin: '0 auto 4rem', textAlign: 'center' }}>
          <span className="label-editorial" style={{ justifyContent: 'center' }}>BEYOND BORDERS</span>
          <h2
            className="display-2"
            style={{
              margin: 'var(--space-4) 0 var(--space-6)',
              textTransform: 'none'
            }}
          >
            Connecting People, Skills<br />
            <em>and Opportunity.</em>
          </h2>
          <p className="lead-text">
            Viaferra connects employers seeking reliable workforce solutions with individuals pursuing international career opportunities. Our approach focuses on professional candidate profiles, relevant skills, experience and employer-led selection.
          </p>
        </div>

        {/* 3 Editorial Value Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-8)'
          }}
        >
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              style={{
                backgroundColor: 'var(--bg-primary)',
                padding: 'var(--space-8)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-warm)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 600,
                  color: 'var(--brand-forest)',
                  marginBottom: 'var(--space-3)'
                }}
              >
                {pillar.num}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.1875rem',
                  fontWeight: 'var(--fw-semibold)',
                  color: 'var(--brand-forest-deep)',
                  marginBottom: 'var(--space-2)'
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  margin: 0
                }}
              >
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
