'use client';

import Link from 'next/link';
import Image from 'next/image';
import HeroScene from '@/components/scenes/HeroScene';
import CoordinationScene from '@/components/scenes/CoordinationScene';
import IndustryExplorer from '@/components/journal/IndustryExplorer';
import RegionFocus from '@/components/journal/RegionFocus';
export default function HomePage(){return <main id="main-content">
<HeroScene/>
<section className="audience-band container-wide" aria-label="Choose your next step"><Link href="/contact"><span>For employers</span><strong>The right people for the work ahead.</strong><span>Discuss your workforce needs ↗</span></Link><Link href="/global-recruitment#cv-builder"><span>For candidates</span><strong>Your experience deserves a clear introduction.</strong><span>Create your professional profile ↗</span></Link></section>
<IndustryExplorer/><RegionFocus/><CoordinationScene/>
<section className="journal-section cv-feature"><div className="container-wide cv-feature-layout"><div><span className="journal-label">Your next chapter starts with you</span><h2>Experience.<br/>Potential.<br/>On the record.</h2><p>Bring your skills, work history and preferences together in a professional CV. Download your document and choose whether to send your profile for recruitment review.</p><Link className="btn btn-primary" href="/global-recruitment#cv-builder">Build Your CV ↗</Link></div><div className="cv-specimen" aria-label="Illustrative CV preview"><span className="cv-specimen-note">Fictional example / Your story goes here</span><h3>Alex Morgan</h3><p>Electrical technician</p><hr/><h4>Professional profile</h4><p>A practical introduction to your experience, specialist skills and the work you want to do next.</p><h4>Experience</h4><div className="cv-example-lines" aria-hidden="true"><i/><i/><i/></div><h4>Skills & qualifications</h4><p>Technical skills · Training · Languages</p><span className="cv-paper-mark">Viaferra / Candidate profile</span></div></div></section>
<section className="hospitality-feature"><Image src="/images/custom/kitchen-brigade.jpg" alt="Hospitality kitchen team preparing service" fill sizes="100vw"/><div className="container-wide"><span className="journal-label">Our hospitality specialism</span><h2>Behind every<br/>exceptional stay.</h2><p>People who understand the rhythm of service. Explore our dedicated hospitality workforce solutions, from the kitchen to the guest experience.</p><Link className="btn btn-inverse-primary" href="/solutions">Explore Hospitality ↗</Link></div></section>
<section className="journal-section responsible-close container-wide"><span className="journal-label">A conversation with purpose</span><h2>Let’s talk about<br/>what comes next.</h2><div><p>Tell us about the people you need, or introduce the skills you bring. We will help clarify the next steps.</p><Link href="/contact" className="btn btn-primary">Request Workforce ↗</Link><Link href="/global-recruitment#cv-builder" className="journal-text-link">Build Your CV ↗</Link><small>Registration expresses interest. It does not guarantee employment, placement or a visa.</small></div></section>
</main>}
