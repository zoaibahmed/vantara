'use client';
import Link from 'next/link';
import Image from 'next/image';
import Brand from '@/components/navigation/Brand';
import { navigationLinks } from '@/lib/navigation';

export default function Footer({ onOpenWorkerModal }: { onOpenWorkerModal?: () => void }) {
  return (
    <footer className="site-footer">
      <div className="container-wide">
        <div className="footer-invitation">
          <div className="footer-invitation-copy">
            <span className="footer-kicker">People make the difference.</span>
            <h2>Exceptional hospitality<br />begins with your people.</h2>
            <Link href="/contact" className="footer-consultation"><span>Let’s build your workforce</span><span aria-hidden="true">↗</span></Link>
          </div>
          <figure className="footer-portrait">
            <Image src="/images/custom/corridor-fb.jpg" alt="Food and beverage professionals in uniform" fill sizes="(max-width: 700px) 100vw, 30vw" />
            <figcaption>The people behind the standard.</figcaption>
          </figure>
        </div>
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <Brand />
            <p className="footer-parent-tag">A venture of <strong>Ascentra Global Ltd</strong></p>
            <p className="footer-tagline">International hospitality workforce sourcing and deployment, thoughtfully coordinated.</p>
          </div>
          <nav aria-label="Footer navigation">
            <h3 className="footer-col-title">Explore</h3>
            <ul className="footer-links">{navigationLinks.map(link => <li key={link.href}><Link href={link.href} className="footer-link">{link.label}</Link></li>)}</ul>
          </nav>
          <div>
            <h3 className="footer-col-title">For your next chapter</h3>
            <ul className="footer-links">
              <li><Link href="/global-recruitment#cv-builder" className="footer-link">Build Your CV</Link></li>
              <li><button type="button" className="footer-link" onClick={onOpenWorkerModal}>Join Our Workforce</button></li>
              <li><Link href="/destinations" className="footer-link">Destination Hubs</Link></li>
              <li><Link href="/solutions" className="footer-link">Operational Roles</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-col-title">Company</h3>
            <ul className="footer-links">
              <li><Link href="/about" className="footer-link">Ascentra Global Ltd</Link></li>
              <li><Link href="/contact" className="footer-link">Employer Consultation</Link></li>
            </ul>
            <span className="footer-service-note">Direct Employer Service</span>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">VANTARA</div>
        <div className="footer-bottom">
          <p className="footer-legal-note">Vantara Workforce Solutions operates as an international hospitality workforce coordinator under Ascentra Global Ltd. The employer retains ultimate hiring discretion and bears applicable employment and destination-side costs in accordance with bilateral agreements.</p>
          <p className="footer-copyright">© {new Date().getFullYear()} Vantara Workforce Solutions.<br />All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
