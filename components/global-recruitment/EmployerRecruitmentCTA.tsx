'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function EmployerRecruitmentCTA() {
  return (
    <section className="scene-container" id="employer-section" style={{ backgroundColor: 'var(--brand-forest)', color: 'var(--text-inverse)', padding: 'var(--space-20) 0' }}>
      <div className="container">
        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="label-editorial" style={{ color: 'var(--champagne)', justifyContent: 'center' }}>
              For Enterprises & Recruitment Partners
            </span>

            <h2
              className="display-2"
              style={{
                margin: 'var(--space-4) 0 var(--space-4)',
                textTransform: 'uppercase',
                color: 'var(--text-inverse)'
              }}
            >
              Looking for International<br />
              <em>Workforce Solutions?</em>
            </h2>

            <p
              className="lead-text"
              style={{
                color: 'var(--text-inverse-muted)',
                marginBottom: 'var(--space-8)'
              }}
            >
              Share your workforce requirements with Vantara and explore suitable recruitment coordination options for your business. We handle practical trade testing, bilateral documentation, and deployment logistics.
            </p>

            <div
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <Link href="/contact" className="btn btn-inverse-primary btn-lg">
                <span>Request Workforce</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>

              <Link
                href="/contact"
                className="btn btn-outline btn-lg"
                style={{
                  borderColor: 'rgba(237, 228, 211, 0.4)',
                  color: 'var(--text-inverse)'
                }}
              >
                <span>Contact Our Team</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
