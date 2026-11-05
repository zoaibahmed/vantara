'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function OperationalRealityScene() {
  const steps = [
    { num: 'PHASE 01', title: 'Requirement', desc: 'Hotel leadership defines exact headcounts, multilingual needs, and operational timeline.' },
    { num: 'PHASE 02', title: 'Sourcing', desc: 'Direct sourcing across accredited hospitality academies and verified talent pools in Asia.' },
    { num: 'PHASE 03', title: 'Screening', desc: 'Rigorous trade testing, English proficiency checks, and reference verification.' },
    { num: 'PHASE 04', title: 'Selection', desc: 'Employer interviews and shortlists candidates with full hiring discretion.' },
    { num: 'PHASE 05', title: 'Documentation', desc: 'Bespoke visa coordination, medical clearances, and destination compliance.' },
    { num: 'PHASE 06', title: 'Deployment', desc: 'Flight scheduling, pre-departure orientation, and on-property arrival onboarding.' }
  ];

  return (
    <section className="employer-problem-section section-spacing scene-container" id="challenge">
      <div className="container">
        
        <div className="reality-split-layout">
          <motion.div
            className="reality-text-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-editorial label-neutral">The Operational Reality</span>
            <h2 className="display-1" style={{ margin: 'var(--space-2) 0 var(--space-4)', textTransform: 'none' }}>
              Running a Hospitality Operation<br />Is Already Complex.
            </h2>
            <p className="lead-text" style={{ marginBottom: 'var(--space-4)' }}>
              Managing daily guest satisfaction, seasonal occupancy surges, and resort logistics demands your full attention. Finding and coordinating an international workforce should not become another operational burden.
            </p>
            <p style={{ color: 'rgba(250, 248, 245, 0.75)' }}>
              Viaferra takes on the multi-country logistics, credential verification, and administrative coordination—so your property receives ready-to-work professionals tailored to your standards.
            </p>
          </motion.div>

          <motion.div
            className="reality-media-col"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <div className="reality-image-wrapper">
              <Image
                src="/images/custom/resort-panorama.jpg"
                alt="Guests arriving at luxury hotel with uniformed front desk staff welcoming and checking them in"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="reality-img"
              />
              <div className="reality-caption">
                <span>Guest Arrival & Reception • Warm Front Office Hospitality</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Continuous Operational Stream Track */}
        <motion.div
          className="operational-stream-track"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {steps.map((step, idx) => (
            <div key={idx} className="stream-node">
              <span className="stream-node-num">{step.num}</span>
              <div className="stream-node-title">{step.title}</div>
              <p className="stream-node-desc">{step.desc}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
