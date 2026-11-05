'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function EmployerStatementScene() {
  return (
    <section className="climax-statement-section scene-container" id="philosophy">
      {/* Cinematic Background Atmosphere of Active Hospitality Team */}
      <div className="statement-bg-media">
        <Image
          src="/images/custom/kitchen-brigade.jpg"
          alt="Uniformed culinary brigade and hospitality professionals actively working during service"
          fill
          sizes="100vw"
          className="statement-bg-img"
        />
        <div className="statement-overlay-scrim"></div>
      </div>

      <div className="container-editorial statement-content-relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-editorial" style={{ color: 'var(--champagne)' }}>The Viaferra Principle</span>
          
          <h2 style={{ textTransform: 'none' }}>
            You Run<br />
            The Operation.<br />
            <em>We Help With<br />The Workforce.</em>
          </h2>

          <p>
            Tell us what your operation needs. We help source suitable hospitality professionals and coordinate the recruitment and deployment process around your requirements.
          </p>

          <div>
            <Link href="/contact" className="btn btn-inverse-primary btn-lg">
              <span>Request Workforce</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
