'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function GlobalRecruitmentFinalCTA() {
  const scrollToCvBuilder = (e: React.MouseEvent) => {
    e.preventDefault();
    const builder = document.getElementById('cv-builder');
    if (builder) {
      builder.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="scene-container" style={{ backgroundColor: 'var(--brand-forest-deep)', color: 'var(--text-inverse)', padding: 'var(--space-32) 0 var(--space-24)' }}>
      <div className="container">
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
          >
            <span className="label-editorial" style={{ color: 'var(--champagne)', justifyContent: 'center' }}>
              Begin Your Registration
            </span>

            <h2
              className="display-1"
              style={{
                margin: 'var(--space-4) 0 var(--space-6)',
                textTransform: 'uppercase',
                color: 'var(--champagne)'
              }}
            >
              Your Next Opportunity<br />
              <em>Starts With Your Profile.</em>
            </h2>

            <p
              className="lead-text"
              style={{
                color: 'var(--text-inverse-muted)',
                maxWidth: '720px',
                margin: '0 auto var(--space-8)'
              }}
            >
              Create your professional CV and register your interest in international employment opportunities through Vantara.
            </p>

            <div
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <a
                href="#cv-builder"
                onClick={scrollToCvBuilder}
                className="btn btn-inverse-primary btn-lg"
              >
                <span>Create My CV</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </a>

              <Link
                href="/contact"
                className="btn btn-outline btn-lg"
                style={{
                  borderColor: 'rgba(237, 228, 211, 0.4)',
                  color: 'var(--text-inverse)'
                }}
              >
                <span>For Employers</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
