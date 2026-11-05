'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMotionPreference } from '@/components/animations/useMotionPreference';

export default function HeroScene() {
  const hero = useRef<HTMLElement>(null);
  const reduced = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const photoOffset = useTransform(scrollYProgress, [0, .75], [0, 45]);

  return (
    <section ref={hero} className="journal-hero" id="hero" aria-labelledby="global-title">
      <div className="container-wide journal-hero-inner">
        <div className="hero-edition">
          <span>Viaferra / Global recruitment</span>
          <span>A venture of Ascentra Global Ltd</span>
        </div>
        <div className="journal-hero-composition">
          <div className="journal-hero-photo">
            <motion.div className="journal-hero-photo-inner" style={{ y: reduced ? 0 : photoOffset }}>
              <Image src="/images/journal/workforce.jpg" alt="Construction professionals discussing work on site"
                fill priority sizes="(max-width: 800px) 100vw, 70vw" />
            </motion.div>
            <span className="hero-photo-caption">The people behind essential work.</span>
          </div>
          <div className="journal-hero-copy">
            <h1 id="global-title">
              <span className="hero-line-mask"><span>Global talent.</span></span>{' '}
              <span className="hero-line-mask"><span>Without borders.</span></span>
            </h1>
            <div className="hero-support">
              <p>International recruitment and workforce solutions connecting employers with skilled, semi-skilled and entry-level talent across essential industries.</p>
              <div className="hero-actions">
                <Link href="/contact" className="btn btn-inverse-primary">
                  Request Workforce <span aria-hidden="true">↗</span>
                </Link>
                <Link href="/global-recruitment#cv-builder" className="hero-candidate-link">
                  Build Your CV <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-bottom-line">
          <span>People. Skills. Possibility.</span>
          <a href="#industries-section">Discover our industries <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  );
}
