'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationLinks } from '@/lib/navigation';
import Brand from './Brand';
import MobileDrawer from './MobileDrawer';
export default function Header({ onOpenWorkerModal }: { onOpenWorkerModal?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`} id="siteHeader">
        <div className="header-container">
          <div className="header-masthead">
            <Brand />
            <p className="header-descriptor">International people.<br />Exceptional hospitality.</p>
            <div className="header-actions">
              <button type="button" className="header-worker-link" onClick={onOpenWorkerModal}>Join Our Workforce</button>
              <Link href="/contact" className="btn btn-primary btn-sm header-cta"><span>Request Workforce</span><span className="btn-arrow" aria-hidden="true">↗</span></Link>
              <button type="button" className="mobile-nav-toggle" onClick={() => setIsDrawerOpen(true)} aria-label="Open navigation menu" aria-expanded={isDrawerOpen} aria-controls="mobile-navigation">
                <span>Menu</span><span className="hamburger-icon" aria-hidden="true"><span /><span /></span>
              </button>
            </div>
          </div>
          <div className="header-navigation-row">
            <nav className="nav-desktop" aria-label="Primary navigation">
              <ul className="nav-links-list">{navigationLinks.map(link => (
                <li key={link.href}><Link href={link.href} aria-current={pathname === link.href ? 'page' : undefined} className={`nav-link ${pathname === link.href ? 'active' : ''}`}>{link.label}</Link></li>
              ))}</ul>
            </nav>
            <span className="header-venture">A venture of Ascentra Global Ltd</span>
          </div>
        </div>
      </header>
      <MobileDrawer isOpen={isDrawerOpen} onClose={closeDrawer} onOpenWorkerModal={() => { closeDrawer(); onOpenWorkerModal?.(); }} />
    </>
  );
}
