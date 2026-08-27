'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CoordinationScene() {
  const steps = [
    { num: '01', title: 'Tell Us', desc: 'You tell us the roles, number of workers, destination and required timeline.' },
    { num: '02', title: 'We Source', desc: 'We identify suitable candidates through our international workforce network.' },
    { num: '03', title: 'You Select', desc: 'The employer reviews candidates and makes the hiring decision.' },
    { num: '04', title: 'We Coordinate', desc: 'We help coordinate the recruitment and deployment process.' },
    { num: '05', title: 'Workforce Arrives', desc: 'The selected employees proceed toward deployment according to the agreed arrangement.' }
  ];

  return (
    <section className="how-it-works-section section-spacing scene-container" id="how-it-works">
      <div className="container">
        
        <motion.div
          className="max-w-editorial"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-editorial">Coordination Flow</span>
          <h2 className="display-1" style={{ marginTop: 'var(--space-2)', textTransform: 'uppercase' }}>
            How Vantara Works.
          </h2>
          <p className="lead-text">
            A structured, transparent workflow designed to give employers total hiring discretion without administrative exhaustion.
          </p>
        </motion.div>

        <div className="journey-steps-grid">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="journey-step-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
            >
              <span className="journey-step-num">{step.num}</span>
              <div className="journey-step-title">{step.title}</div>
              <p className="journey-step-desc">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Employer-First Principle & Transparent Cost Bridge */}
        <div className="narrative-split" style={{ marginTop: 'var(--space-16)' }}>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-editorial">Tailored Engagements</span>
            <h3 className="display-2" style={{ margin: 'var(--space-2) 0 var(--space-4)', textTransform: 'uppercase' }}>
              Built Around<br />Your Requirement.
            </h3>
            <p>
              Every hospitality operation is different. We start with the workforce you actually need, rather than forcing your requirement into a standard recruitment package.
            </p>
            
            <div className="requirement-pill-grid">
              <span className="requirement-pill">Roles</span>
              <span className="requirement-pill">Numbers</span>
              <span className="requirement-pill">Location</span>
              <span className="requirement-pill">Start date</span>
              <span className="requirement-pill">Contract duration</span>
              <span className="requirement-pill">Employment requirements</span>
              <span className="requirement-pill">Deployment requirements</span>
            </div>
          </motion.div>

          <motion.div
            style={{ backgroundColor: 'var(--bg-primary)', padding: 'clamp(2rem, 3.5vw, 3rem)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-warm)' }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <span className="label-editorial label-neutral">Clarity & Trust</span>
            <h4 className="display-3" style={{ margin: 'var(--space-2) 0 var(--space-3)', color: 'var(--brand-forest-deep)' }}>
              Clear expectations from the beginning.
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              International workforce deployment involves different employment, travel, immigration and destination-side requirements. Vantara works with employers to establish responsibilities and applicable costs before recruitment begins.
            </p>
            <div style={{ marginTop: 'var(--space-6)' }}>
              <Link href="/how-it-works" className="btn-ghost">Read our full coordination guide →</Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
