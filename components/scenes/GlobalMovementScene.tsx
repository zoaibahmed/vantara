'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const corridorStories = [
  {
    role: 'Culinary Artistry',
    badge: 'CULINARY',
    origin: 'Bangladesh',
    destination: 'Maldives',
    action: 'Executive Chef & Brigade Line Prep',
    image: '/images/custom/culinary-service.jpg',
    alt: 'Executive chef in white jacket carefully plating a gourmet seafood dish',
    desc: 'Trained line chefs and kitchen leads bringing rigorous food safety and high-volume culinary excellence to private island resorts.'
  },
  {
    role: 'Food & Beverage Operations',
    badge: 'FOOD & BEVERAGE',
    origin: 'Philippines',
    destination: 'Seychelles',
    action: 'Uniformed Staff in Active Service',
    image: '/images/custom/corridor-fb.jpg',
    alt: 'Hotel operational staff working in uniform during food and beverage service',
    desc: 'Fluent, warm front-of-house professionals, bar staff, and dining servers delivering intuitive hospitality to international resort guests.'
  },
  {
    role: 'Hotel & Front Desk Operations',
    badge: 'HOTEL OPERATIONS',
    origin: 'Nepal',
    destination: 'Belize',
    action: 'Front Desk Receptionists Collaborating',
    image: '/images/custom/corridor-reception.jpg',
    alt: 'Happy hotel receptionists cooperating while working at the front desk',
    desc: 'Dedicated front office receptionists and guest service specialists managing arrivals, reservations, and attentive property hospitality.'
  }
];

export default function GlobalMovementScene() {
  return (
    <section className="corridor-story-section section-spacing scene-container" id="corridors">
      <div className="container">
        
        {/* First Human Moment Header - Preserved Culinary Section */}
        <div className="first-human-moment">
          <div className="human-moment-grid">
            <motion.div
              className="human-moment-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="label-editorial">People Behind the Standard</span>
              <h2 className="display-1" style={{ margin: 'var(--space-2) 0 var(--space-4)', textTransform: 'none' }}>
                Great Hospitality<br />
                <em>Starts With People.</em>
              </h2>
              <p className="lead-text max-w-prose" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                Behind every seamless guest experience—from the first morning pastry to the evening turndown—are dedicated hospitality professionals who make operations thrive.
              </p>
              <p style={{ color: 'var(--text-muted)' }}>
                Viaferra connects high-demand tourism properties directly with skilled hospitality talent across international workforce corridors.
              </p>
            </motion.div>

            <motion.div
              className="human-moment-media"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              <div className="moment-image-wrapper">
                <Image
                  src="/images/custom/people-behind-standard.jpg"
                  alt="Hospitality professional carefully preparing service station with dedication and focus"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="moment-image"
                />
                <div className="moment-badge">
                  <span>People Behind The Standard • Craft & Dedication</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Human-First Corridor Flow */}
        <div style={{ marginTop: 'var(--space-12)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: 'var(--space-8)', textAlign: 'center' }}
          >
            <span className="label-editorial">Human-First Workforce Corridors</span>
            <h3 className="display-2" style={{ textTransform: 'none', marginTop: 'var(--space-2)' }}>
              From Source Talent To Destination Excellence
            </h3>
          </motion.div>

          <div className="human-corridor-grid">
            {corridorStories.map((item, idx) => (
              <motion.div
                key={idx}
                className="human-corridor-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
              >
                <div className="corridor-card-media">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="corridor-card-img"
                  />
                  <div className="corridor-role-pill">{item.badge}</div>
                </div>

                <div className="corridor-card-content">
                  <div className="corridor-movement-tag">
                    <span className="source-name">{item.origin}</span>
                    <span className="arrow-sep">→</span>
                    <span className="dest-name">{item.destination}</span>
                  </div>

                  <h4 className="corridor-card-title">{item.role}</h4>
                  <p className="corridor-card-action"><em>{item.action}</em></p>
                  <p className="corridor-card-desc">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link href="/destinations" className="btn btn-secondary">
              <span>View All Destination Corridors</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
