'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileDrawer from './MobileDrawer';

interface HeaderProps {
  onOpenWorkerModal?: () => void;
}

export default function Header({ onOpenWorkerModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Workforce', href: '/workforce' },
    { label: 'Global Recruitment', href: '/global-recruitment' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`} id="siteHeader">
        <div className="header-container">
          
          {/* Brand Identity */}
          <Link href="/" className="brand-identity" aria-label="Vantara Workforce Solutions - Home">
            <div className="brand-logo-wrap">
              <svg className="brand-symbol" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L3 20H21L12 3Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
                <path d="M12 8L7 18H17L12 8Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.25"/>
              </svg>
              <span className="brand-name">Vantara</span>
            </div>
            <div className="brand-subtext">A venture of <span>Ascentra Global Ltd</span></div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-desktop" aria-label="Primary Navigation">
            <ul className="nav-links-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Actions (Employer-First Hierarchy) */}
          <div className="header-actions">
            <button
              type="button"
              className="header-worker-link"
              onClick={onOpenWorkerModal}
            >
              Join Our Workforce
            </button>
            <Link href="/contact" className="btn btn-primary btn-sm">
              <span>Request Workforce</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>

            {/* Mobile Nav Toggle */}
            <button
              className="mobile-nav-toggle"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={isDrawerOpen}
            >
              <span className="hamburger-icon">
                <span></span>
                <span></span>
              </span>
              <span>Menu</span>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenWorkerModal={() => {
          setIsDrawerOpen(false);
          if (onOpenWorkerModal) onOpenWorkerModal();
        }}
      />
    </>
  );
}
