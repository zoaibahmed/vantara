'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function GlobalRecruitmentHero() {
  const scrollToCvBuilder = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('cv-builder');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToEmployer = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('employer-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-editorial scene-container" id="global-hero">
      <div className="container-wide">
        <div className="hero-grid">
          {/* Left: Headline & Editorial Narrative */}
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-editorial">VANTARA | INTERNATIONAL RECRUITMENT</span>

            <h1
              className="display-hero"
              style={{
                margin: 'var(--space-4) 0 var(--space-5)',
                textTransform: 'uppercase'
              }}
            >
              GLOBAL TALENT.<br />
              <em>GLOBAL OPPORTUNITY.</em>
            </h1>

            <p className="lead-text max-w-prose" style={{ marginBottom: 'var(--space-8)' }}>
              Connecting skilled, semi-skilled and entry-level workers with international recruitment opportunities across essential industries.
            </p>

            <div className="flex items-center gap-4" style={{ flexWrap: 'wrap' }}>
              <a
                href="#cv-builder"
                onClick={scrollToCvBuilder}
                className="btn btn-primary btn-lg"
              >
                <span>Build Your CV</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
              <a
                href="#employer-section"
                onClick={scrollToEmployer}
                className="btn btn-secondary btn-lg"
              >
                <span>Request Workforce</span>
              </a>
            </div>

            {/* Target Regions Sub-bar */}
            <div
              style={{
                marginTop: 'var(--space-8)',
                paddingTop: 'var(--space-6)',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)'
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  fontWeight: 'var(--fw-semibold)'
                }}
              >
                Focus Recruitment Regions
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9375rem',
                  fontWeight: 'var(--fw-semibold)',
                  color: 'var(--brand-forest-deep)',
                  letterSpacing: '0.08em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  flexWrap: 'wrap'
                }}
              >
                <span>EUROPE</span>
                <span style={{ color: 'var(--border-warm)' }}>|</span>
                <span>LATIN AMERICA</span>
                <span style={{ color: 'var(--border-warm)' }}>|</span>
                <span>AUSTRALIA</span>
                <span style={{ color: 'var(--border-warm)' }}>|</span>
                <span>NEW ZEALAND</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Workforce Editorial Image */}
          <motion.div
            className="hero-media-wrapper"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 'min(620px, 75vh)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-warm-float)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
                alt="International workforce collaboration and professional talent team"
                fill
                priority
                sizes="(max-width: 960px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(14, 39, 27, 0.82) 0%, rgba(14, 39, 27, 0.2) 50%, transparent 100%)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 'var(--space-6)',
                  left: 'var(--space-6)',
                  right: 'var(--space-6)',
                  color: 'var(--text-inverse)'
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'rgba(237, 228, 211, 0.2)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(237, 228, 211, 0.3)',
                    color: 'var(--champagne)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--space-2)'
                  }}
                >
                  Cross-Border Mobility
                </span>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.9375rem',
                    lineHeight: 1.5,
                    color: 'var(--text-inverse-muted)'
                  }}
                >
                  Verified profiles, practical trade screening, and structured B2B international recruitment pipelines.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
