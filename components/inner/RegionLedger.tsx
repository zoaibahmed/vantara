'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useMotionPreference } from '@/components/animations/useMotionPreference';

const regions = [
  { name: 'Europe', image: '/images/journal/technical.jpg', alt: 'Electrical tradesperson working on an installation', description: 'Register your interest in opportunities across construction, manufacturing, logistics, hospitality and technical trades.', note: 'Requirements differ by country, occupation and employer.' },
  { name: 'Latin America', image: '/images/custom/region-latin-america.jpg', alt: 'Rio de Janeiro and its coastal landscape', description: 'Tell us about your experience in manufacturing, agriculture, construction or technical services and your interest in this region.', note: 'A regional preference is not an offer of work in a particular country.' },
  { name: 'Australia', image: '/images/custom/region-australia.jpg', alt: 'Sydney Opera House beside the harbour', description: 'Express an interest in skilled trades, construction, agriculture or hospitality where relevant employer requirements and eligibility conditions apply.', note: 'Occupational licensing and work eligibility must be assessed individually.' },
  { name: 'New Zealand', image: '/images/custom/region-new-zealand.jpg', alt: 'Mountains and water in Fiordland, New Zealand', description: 'Connect your background in construction, primary industries, hospitality or maintenance with a regional preference in your professional profile.', note: 'Recruitment depends on suitable employer demand and applicable permissions.' }
];
export default function RegionLedger() {
  const [active, setActive] = useState(0);
  const reduced = useMotionPreference();
  const current = regions[active];
  return <div className="region-ledger">
    <div className="region-ledger-tabs" role="tablist" aria-label="Candidate-interest regions">{regions.map((region, index) => <button key={region.name} id={`region-ledger-tab-${index}`} role="tab" type="button" tabIndex={active === index ? 0 : -1} aria-selected={active === index} aria-controls="region-ledger-panel" onClick={() => setActive(index)} onKeyDown={event => { let next = index; if (event.key === 'ArrowRight') next = (index + 1) % regions.length; else if (event.key === 'ArrowLeft') next = (index + regions.length - 1) % regions.length; else if (event.key === 'Home') next = 0; else if (event.key === 'End') next = regions.length - 1; else return; event.preventDefault(); setActive(next); document.getElementById(`region-ledger-tab-${next}`)?.focus(); }}>{region.name}<span aria-hidden="true">↗</span></button>)}</div>
    <div id="region-ledger-panel" role="tabpanel" tabIndex={0} aria-labelledby={`region-ledger-tab-${active}`} className="region-ledger-panel"><div className="region-ledger-photo"><AnimatePresence initial={false}><motion.div key={current.name} className="region-ledger-image" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .35 }}><Image src={current.image} alt={current.alt} fill sizes="(max-width: 800px) 100vw, 65vw" /></motion.div></AnimatePresence></div><div className="region-ledger-copy"><span className="inner-kicker">Candidate-interest region</span><h3>{current.name}</h3><p>{current.description}</p><p className="inner-note">{current.note}</p><Link href="/global-recruitment#cv-builder" className="collection-secondary">Build Your CV <span aria-hidden="true">↗</span></Link></div></div>
  </div>;
}
