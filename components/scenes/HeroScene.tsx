'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroScene() {
  return (
    <section className="hero-editorial scene-container" id="hero">
      <div className="container-wide">
        <div className="hero-grid">
          
          {/* Left: Headline & Editorial Narrative */}
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-editorial">B2B International Hospitality Workforce</span>
            
            <h1 className="display-hero" style={{ margin: 'var(--space-4) 0 var(--space-5)', textTransform: 'uppercase' }}>
              Your Hospitality<br />
              Workforce.<br />
              <em>Coordinated.</em>
            </h1>
            
            <p className="lead-text max-w-prose" style={{ marginBottom: 'var(--space-8)' }}>
              Vantara helps tourism businesses access international hospitality professionals and coordinate the workforce they need.
            </p>

            <div className="flex items-center gap-4" style={{ flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-primary btn-lg">
                <span>Request Workforce</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
              <Link href="/how-it-works" className="btn btn-secondary btn-lg">
                <span>How It Works</span>
              </Link>
            </div>

            <div style={{ marginTop: 'var(--space-8)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <span className="caption" style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', letterSpacing: '0.04em' }}>
                A venture of <strong>Ascentra Global Ltd</strong>
              </span>
              <span style={{ color: 'var(--border-warm)' }}>•</span>
              <span className="caption" style={{ color: 'var(--brand-forest)', fontWeight: 600, fontSize: '0.8125rem' }}>
                Direct Employer Partnership
              </span>
            </div>
          </motion.div>

          {/* Right: Dedicated Hospitality Professionals in Uniform */}
          <motion.div
            className="hero-media-wrapper"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <Image
              src="/images/custom/hero-new.jpg"
              alt="Hospitality leadership and workforce coordination professionals"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="hero-image"
            />
            <div className="hero-media-caption">
              <span>Hospitality Workforce Coordination • Ready For Deployment</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
