'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Graceful luxury intro duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1400);

    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 800);
    };

    if (document.readyState === 'complete') {
      // Document already loaded
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="luxury-preloader-curtain"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
          }}
          aria-hidden="true"
        >
          <div className="preloader-content-wrap">
            {/* Animated Brand Emblem */}
            <motion.div
              className="preloader-symbol-wrap"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg className="preloader-symbol" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M16 4L4 28H28L16 4Z"
                  stroke="var(--brand-forest)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M16 11L9.5 24H22.5L16 11Z"
                  fill="var(--brand-forest)"
                  fillOpacity="0.2"
                  stroke="var(--brand-forest)"
                  strokeWidth="1.25"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
              </svg>
            </motion.div>

            {/* Brand Title & Subtext */}
            <motion.div
              className="preloader-brand-title"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              VANTARA
            </motion.div>
            
            <motion.div
              className="preloader-brand-subtext"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              WORKFORCE SOLUTIONS
            </motion.div>

            {/* Subtle Progress Track */}
            <div className="preloader-progress-track">
              <motion.div
                className="preloader-progress-bar"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <motion.div
              className="preloader-venture-tag"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              A venture of Ascentra Global Ltd
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
