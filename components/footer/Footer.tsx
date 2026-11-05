'use client';
import Link from 'next/link';
import Brand from '@/components/navigation/Brand';
import { navigationLinks } from '@/lib/navigation';
export default function Footer({ onOpenWorkerModal }: { onOpenWorkerModal?: () => void }) {
 return <footer className="site-footer journal-footer"><div className="container-wide">
 <div className="journal-footer-heading"><Brand /><p>People with purpose.<br/>Work with possibility.</p><Link href="/contact" className="footer-consultation">Start a conversation <span aria-hidden="true">↗</span></Link></div>
 <div className="journal-footer-grid"><div><h2>Global recruitment.<br/>Human connection.</h2><p>A venture of Ascentra Global Ltd.</p><p>International workforce coordination across essential industries, with hospitality as a specialist service.</p></div>
 <nav aria-label="Footer navigation"><h3>Explore Viaferra</h3><ul className="footer-links">{navigationLinks.map(l=><li key={l.href}><Link href={l.href} className="footer-link">{l.label}</Link></li>)}</ul></nav>
 <div><h3>Your next step</h3><ul className="footer-links"><li><Link className="footer-link" href="/contact">Request Workforce</Link></li><li><Link className="footer-link" href="/global-recruitment#cv-builder">Build Your CV</Link></li><li><button className="footer-link" onClick={onOpenWorkerModal}>Hospitality candidate registration</button></li></ul><p className="footer-service-note">Selection remains with the employer.<br/>Registration is an expression of interest.</p></div></div>
 <div className="footer-bottom"><p>© {new Date().getFullYear()} Viaferra Workforce Solutions · Ascentra Global Ltd</p><p>Global outlook. Individual attention.</p></div>
 </div></footer>;
}