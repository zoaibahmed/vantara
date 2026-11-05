'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import EmployerRequestForm from '@/components/forms/EmployerRequestForm';

interface FinalConversionSceneProps {
  onOpenWorkerModal?: () => void;
}

export default function FinalConversionScene({ onOpenWorkerModal }: FinalConversionSceneProps) {
  return (
    <section className="enquiry-section section-spacing scene-container" id="contact">
      <div className="container-editorial">
        
        {/* Whole Hospitality Team Standing and Cheering */}
        <motion.div
          className="conversion-banner-media"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="conversion-img-wrap">
            <Image
              src="/images/custom/team-cheering.jpg"
              alt="Complete hotel and resort hospitality team standing together in uniform smiling and cheering"
              fill
              sizes="(max-width: 768px) 100vw, 820px"
              className="conversion-img"
            />
            <div className="conversion-img-badge">
              <span>Ready-To-Deploy Hospitality Professionals • Complete Property Team</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="max-w-editorial"
          style={{ marginTop: 'var(--space-8)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-editorial">Start The Conversation</span>
          <h2 className="display-1" style={{ margin: 'var(--space-2) 0 var(--space-3)', textTransform: 'none' }}>
            Need People For<br />Your Operation?
          </h2>
          <p className="lead-text">
            Tell us what your hospitality business needs. We will review your requirement and discuss the next steps.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <EmployerRequestForm onOpenWorkerModal={onOpenWorkerModal} />
        </motion.div>

      </div>
    </section>
  );
}
