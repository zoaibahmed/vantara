'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HospitalitySpacesScene() {
  const [active, setActive] = useState(0);
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
      image: '/images/custom/kitchen-brigade.jpg',
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
          <h2 className="display-1" style={{ marginTop: 'var(--space-2)', textTransform: 'none' }}>
            Hospitality Roles,<br />Connected To Your Operation.
          </h2>
          <p className="lead-text">
            From the front desk to the commercial kitchen, we coordinate skilled professionals across every functional department of your property.
          </p>
        </motion.div>

        <div className="hospitality-atlas">
          <div className="atlas-tabs" role="tablist" aria-label="Hospitality departments">
            {roles.map((role, index) => <button key={role.title} id={`department-tab-${index}`} type="button" role="tab" aria-selected={active === index} aria-controls="department-panel" tabIndex={active === index ? 0 : -1} onKeyDown={event => { let next = index; if (event.key === 'ArrowRight') next = (index + 1) % roles.length; else if (event.key === 'ArrowLeft') next = (index + roles.length - 1) % roles.length; else if (event.key === 'Home') next = 0; else if (event.key === 'End') next = roles.length - 1; else return; event.preventDefault(); setActive(next); document.getElementById(`department-tab-${next}`)?.focus(); }} onClick={() => setActive(index)}>{role.space}<span aria-hidden="true">↗</span></button>)}
          </div>
          <div className="atlas-stage" role="tabpanel" id="department-panel" aria-labelledby={`department-tab-${active}`} tabIndex={0}>
            <Image src={roles[active].image} alt={roles[active].alt} fill sizes="100vw" style={{objectFit:'cover'}} />
            <div className="atlas-caption"><span>{roles[active].action}</span><h3>{roles[active].title}</h3><p>{roles[active].desc}</p><div className="atlas-tags">{roles[active].tags.join(' / ')}</div></div>
          </div>
        </div>

      </div>
    </section>
  );
}
