'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWorkerModal?: () => void;
}

export default function MobileDrawer({ isOpen, onClose, onOpenWorkerModal }: MobileDrawerProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

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
      <div
        className={`mobile-drawer-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`mobile-nav-drawer ${isOpen ? 'is-open' : ''}`}
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-header">
          <div className="brand-logo-wrap">
            <span className="brand-name">Vantara</span>
          </div>
          <button
            className="mobile-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        <nav>
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  style={{
                    color: pathname === link.href ? 'var(--brand-forest)' : undefined
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-drawer-actions">
          <Link href="/contact" className="btn btn-primary w-full" onClick={onClose}>
            <span>Request Workforce</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
          <button
            type="button"
            className="btn-ghost"
            onClick={onOpenWorkerModal}
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: 'var(--space-2) 0',
              border: 'none',
              cursor: 'pointer',
              background: 'transparent'
            }}
          >
            Join Our Workforce (Candidates)
          </button>
        </div>
      </aside>
    </>
  );
}
