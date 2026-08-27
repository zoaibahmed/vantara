'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HospitalitySpacesScene() {
  const roles = [
    {
      space: 'The Hotel',
      title: 'Hotel Operations',
      desc: 'The backbone of guest satisfaction. Dedicated professionals engaged in meticulous room preparation, warm arrivals, and seamless property management.',
      tags: ['Housekeeping', 'Front Office', 'Guest Services', 'Porters'],
      image: '/images/custom/spaces-hotel.jpg',
      alt: 'Hotel operational housekeeping staff actively working in uniform',
      action: 'Suite Care & Room Readiness',
      isReversed: false
    },
    {
      space: 'The Restaurant',
      title: 'Food & Beverage',
      desc: 'Attentive service delivery for fine dining, beachside venues, poolside lounges, and private villa dining.',
      tags: ['Waiters', 'Bartenders', 'Restaurant Staff', 'Supervisors'],
      image: '/images/custom/spaces-fb.jpg',
      alt: 'Uniformed food and beverage staff actively serving in dining room',
      action: 'Fine Dining & Table Service',
      isReversed: true
    },
    {
      space: 'The Kitchen',
      title: 'Culinary',
      desc: 'Talented culinary personnel trained across international cuisines, hot-line brigade execution, pastry arts, and strict HACCP compliance.',
      tags: ['Chefs', 'Cooks', 'Commis Chefs', 'Kitchen Assistants', 'Stewards'],
      image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1000&q=80',
      alt: 'Executive chef and brigade collaborating on the hot line in a high-pace professional kitchen',
      action: 'High-Volume Culinary Precision',
      isReversed: false
    },
    {
      space: 'The Experience',
      title: 'Events & Resort Operations',
      desc: 'Adaptable operational personnel to orchestrate destination weddings, private island galas, and bespoke guest recreational experiences.',
      tags: ['Banqueting', 'Events', 'Bar Staff', 'Operational Staff'],
      image: '/images/custom/spaces-events.jpg',
      alt: 'Professional bar and event staff in uniform actively working at resort event',
      action: 'Event & Bar Coordination',
      isReversed: true
    }
  ];

  return (
    <section className="roles-narrative-section section-spacing scene-container" id="roles">
      <div className="container">
        
        <motion.div
          className="max-w-editorial"
          style={{ marginBottom: 'var(--space-8)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-editorial">Operational Spaces in Action</span>
          <h2 className="display-1" style={{ marginTop: 'var(--space-2)', textTransform: 'uppercase' }}>
            Hospitality Roles,<br />Connected To Your Operation.
          </h2>
          <p className="lead-text">
            From the front desk to the commercial kitchen, we coordinate skilled professionals across every functional department of your property.
          </p>
        </motion.div>

        {roles.map((role, idx) => (
          <motion.div
            key={idx}
            className={`role-composition-block ${role.isReversed ? 'is-reversed' : ''}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="role-media-col">
              <Image
                src={role.image}
                alt={role.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="role-action-badge">
                <span>{role.action}</span>
              </div>
            </div>
            <div className="role-text-col">
              <span className="label-editorial">{role.space}</span>
              <h3 className="display-2" style={{ margin: 'var(--space-2) 0 var(--space-3)' }}>{role.title}</h3>
              <p>{role.desc}</p>
              <div className="role-tags-list">
                {role.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="role-tag">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
