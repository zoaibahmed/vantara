'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Scroll to top on route change smoothly
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Editorial Top Routing Indicator Line */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            className="page-route-progress-bar"
            initial={{ scaleX: 0, opacity: 0.8 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Main Page Fade & Elevate Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="page-transition-wrapper"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
