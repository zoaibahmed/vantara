'use client';
import { useId, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { RECRUITMENT_INDUSTRIES } from '@/lib/recruitment/constants';
import { useMotionPreference } from '@/components/animations/useMotionPreference';

export default function IndustryExplorer({ onSelect, id = 'industries-section' }: { onSelect?: (industry: string) => void; id?: string }) {
  const [active, setActive] = useState(0), reduced = useMotionPreference(), uid = useId();
  const industries = ['construction','manufacturing','logistics','agriculture','hospitality','technical'].map(key=>RECRUITMENT_INDUSTRIES.find(i=>i.id===key)!);
  const current = industries[active];
  function choose(index: number, focus = false) { setActive(index); if(focus)document.getElementById(`${uid}-${index}`)?.focus(); }
  return <section className="journal-section industry-explorer" id={id}><div className="container-wide">
    <div className="journal-heading"><span className="journal-label">The industries that move us</span><h2>Different skills.<br/>A shared sense of purpose.</h2><p>From the foundations we build to the services we depend on. Find the people and possibilities behind essential work.</p></div>
    <div className="industry-layout"><div className="industry-tabs" role="tablist" aria-label="Explore industries" aria-orientation="vertical">{industries.map((industry,index)=><button key={industry.id} id={`${uid}-${index}`} type="button" role="tab" aria-selected={active===index} aria-controls={`${uid}-panel`} tabIndex={active===index?0:-1} onClick={()=>choose(index)} onKeyDown={e=>{let next=index;if(e.key==='ArrowDown'||e.key==='ArrowRight')next=(index+1)%industries.length;else if(e.key==='ArrowUp'||e.key==='ArrowLeft')next=(index+industries.length-1)%industries.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=industries.length-1;else return;e.preventDefault();choose(next,true);}}>
      {active===index&&<motion.span className="industry-active-line" layoutId={`${uid}-selection`} transition={{duration:reduced?0:.3}}/>}<span>{industry.name}</span><span aria-hidden="true">↗</span></button>)}</div>
    <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-${active}`} className="industry-panel" tabIndex={0}>
      <div className="industry-photo-stage"><AnimatePresence initial={false}><motion.div key={current.id} className="industry-photo-layer" initial={{opacity:reduced?1:0,scale:reduced?1:1.035}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:reduced?0:.38}}><Image src={current.image} alt={current.alt} fill sizes="(max-width:800px) 100vw, 60vw" /></motion.div></AnimatePresence><span className="industry-photo-note">Work in focus / {current.id}</span></div>
      <AnimatePresence mode="wait" initial={false}><motion.div key={current.id} className="industry-panel-copy" initial={{opacity:reduced?1:0,y:reduced?0:6}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:reduced?0:.18}}><h3>{current.name}</h3><p>{current.description}</p><p className="industry-role-list">{current.exampleRoles.join(' · ')}</p></motion.div></AnimatePresence>
      <div className="industry-panel-action">{onSelect?<button type="button" className="journal-text-link" onClick={()=>onSelect(current.name)}>Build your CV in this industry <span aria-hidden="true">↗</span></button>:<Link className="journal-text-link" href={`/global-recruitment?industry=${current.id}#cv-builder`}>Explore your next step <span aria-hidden="true">↗</span></Link>}</div>
    </div></div>
  </div></section>;
}
