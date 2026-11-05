'use client';
import {useRef,useState,useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {motion,useScroll,useTransform,useSpring,useMotionValueEvent} from 'framer-motion';
import {useMotionPreference} from '@/components/animations/useMotionPreference';
export const JOURNEY_STAGES=[
 {title:'Employer requirement',short:'Define the work.',copy:'The role, skills, headcount, location and timing. A clear employer brief is the starting point for a considered recruitment plan.',image:'/images/journal/workforce.jpg',alt:'Construction professionals discussing a site requirement',note:'The brief / Roles · People · Timing'},
 {title:'Candidate sourcing',short:'Find the potential.',copy:'Candidate profiles are considered against the requirement, with experience, practical skills and preferences brought into view.',image:'/images/journal/technical.jpg',alt:'Electrical worker installing a wall fitting',note:'The profile / Skills · Experience · Preferences'},
 {title:'Screening and employer selection',short:'Make a considered choice.',copy:'Relevant experience and role requirements guide the review. Employers conduct their selection process and retain the final hiring decision.',image:'/images/journal/manufacturing.jpg',alt:'Technician working with equipment at an industrial workstation',note:'The decision / Review · Interview · Selection'},
 {title:'Documentation and coordination',short:'Bring the details together.',copy:'The team helps coordinate the agreed documentation and next steps. Requirements and timing depend on the role, employer and destination.',image:'/images/journal/workforce.jpg',alt:'Site professionals coordinating their work',note:'The preparation / Documents · Responsibilities · Readiness'},
 {title:'Placement and onboarding',short:'A new working chapter.',copy:'Where selection and relevant permissions are confirmed, arrival and employer onboarding follow the agreed arrangements. The employer directs the workplace integration.',image:'/images/journal/logistics.jpg',alt:'Logistics facility with sorting and distribution lines',note:'The beginning / Arrival · Induction · Integration'}
];
export default function CoordinationScene(){
 const ref=useRef<HTMLElement>(null),reduced=useMotionPreference(),[mobile,setMobile]=useState(true),[active,setActive]=useState(0);
 useEffect(()=>{const m=matchMedia('(max-width: 800px), (max-height: 620px)');const u=()=>setMobile(m.matches);u();m.addEventListener('change',u);return()=>m.removeEventListener('change',u)},[]);
 const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']});
 const scale=useTransform(scrollYProgress,[0,1],[0,1]);const progress=useSpring(scale,{stiffness:160,damping:30,mass:.3});
 useMotionValueEvent(scrollYProgress,'change',value=>{if(!mobile&&!reduced)setActive(Math.min(4,Math.floor(value*5)))});
 const staticMode=mobile||reduced,stage=JOURNEY_STAGES[active];
 function seek(i:number){if(!ref.current)return;const top=ref.current.getBoundingClientRect().top+window.scrollY;window.scrollTo({top:top+(ref.current.offsetHeight-window.innerHeight)*((i+.12)/5),behavior:'auto'});setActive(i);}
 return <section ref={ref} id="how-it-works" className={'recruitment-story '+(staticMode?'story-static':'story-scroll')} aria-labelledby="journey-title"><div className="journey-sticky container-wide"><div className="journey-heading"><span className="journal-label">A considered journey</span><h2 id="journey-title">From requirement<br/>to a new beginning.</h2><Link href="/how-it-works" className="journal-text-link">Explore both journeys ↗</Link></div>
 {staticMode?<ol className="journey-mobile">{JOURNEY_STAGES.map((s,i)=><li key={s.title}><span className="journey-number">0{i+1}</span><div><h3>{s.title}</h3><p>{s.copy}</p></div></li>)}</ol>:<div className="journey-experience"><div className="journey-index"><p className="journey-instruction">Follow the process as you scroll,<br/>or choose a milestone.</p><ol>{JOURNEY_STAGES.map((s,i)=><li key={s.title}><button type="button" aria-current={active===i?'step':undefined} onClick={()=>seek(i)}><span>0{i+1}</span>{s.title}</button></li>)}</ol><div className="journey-progress" aria-hidden="true"><motion.span style={{scaleX:progress}}/></div><p className="journey-counter">0{active+1} <span>/ 05</span></p></div><div className="journey-visual" data-stage={active+1}>{JOURNEY_STAGES.map((item, index) => (
  <motion.div key={item.title} className="journey-visual-layer" initial={false}
    animate={{ opacity: active === index ? 1 : 0 }} transition={{ duration: .34 }}
    aria-hidden={active !== index}>
    <Image src={item.image} alt={item.alt} fill sizes="(max-width: 1100px) 63vw, 60vw" />
  </motion.div>
))}
<div className="journey-stage-note">{stage.note}</div>
<div className="journey-stage-sheet">
  <span aria-hidden="true">0{active + 1}</span>
  <div><h3>{stage.short}</h3><p>{stage.copy}</p></div>
</div></div></div>}
 <p className="journey-disclaimer">An overview of coordination, not a fixed deployment schedule. Selection and relevant permissions remain essential.</p></div></section>
}
