'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useMotionPreference } from '@/components/animations/useMotionPreference';

interface Department { id: string; space: string; title: string; tagline: string; desc: string; image: string; alt: string; roles: { name: string; desc: string }[] }
export default function DepartmentJournal({ departments }: { departments: Department[] }) {
  const [active, setActive] = useState(0);
  const reduced = useMotionPreference();
  useEffect(() => {
    const followFragment = () => {
      const index = departments.findIndex(department => `#${department.id}` === window.location.hash);
      if (index >= 0) setActive(index);
    };
    followFragment();
    window.addEventListener('hashchange', followFragment);
    return () => window.removeEventListener('hashchange', followFragment);
  }, [departments]);
  const current = departments[active];
  return <div className="department-journal">
    <div className="department-chapters">{departments.map((department, index) => <details className="department-chapter" id={department.id} key={department.id} open={active === index} onToggle={event => { if (event.currentTarget.open) setActive(index); }}>
      <summary><span>{department.space}</span><h3>{department.title}</h3><span aria-hidden="true">+</span></summary>
      <div className="department-detail"><p>{department.desc}</p><dl>{department.roles.map(role => <div key={role.name}><dt>{role.name}</dt><dd>{role.desc}</dd></div>)}</dl><Link className="collection-secondary" href="/contact">Discuss this department <span aria-hidden="true">↗</span></Link></div>
    </details>)}</div>
    <figure className="department-visual"><AnimatePresence initial={false}><motion.div key={current.id} className="department-image" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .35 }}><Image src={current.image} alt={current.alt} fill sizes="(max-width: 800px) 100vw, 48vw" /></motion.div></AnimatePresence><figcaption><span>Specialist hospitality expertise</span><strong>{current.tagline}</strong></figcaption></figure>
  </div>;
}
