'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationLinks } from '@/lib/navigation';
import Brand from './Brand';
interface MobileDrawerProps { isOpen: boolean; onClose: () => void; onOpenWorkerModal?: () => void }
export default function MobileDrawer({ isOpen, onClose, onOpenWorkerModal }: MobileDrawerProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const element = dialog.current;
    if (!element || !isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    const media = window.matchMedia('(min-width: 1101px)');
    const onResize = () => { if (media.matches) onClose(); };
    media.addEventListener('change', onResize);
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      media.removeEventListener('change', onResize);
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);
  return (
    <dialog ref={dialog} id="mobile-navigation" className="mobile-nav-drawer" aria-labelledby="mobile-menu-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="mobile-drawer-inner" data-lenis-prevent>
        <div className="mobile-drawer-header"><Brand /><button type="button" className="mobile-close-btn" onClick={onClose} aria-label="Close navigation menu">×</button></div>
        <p className="mobile-menu-label" id="mobile-menu-title">Explore Vantara</p>
        <nav aria-label="Mobile navigation"><ul className="mobile-nav-links">{navigationLinks.map(link => (
          <li key={link.href}><Link href={link.href} onClick={onClose} aria-current={pathname === link.href ? 'page' : undefined}><span>{link.label}</span><span aria-hidden="true">↗</span></Link></li>
        ))}</ul></nav>
        <div className="mobile-drawer-actions">
          <Link href="/contact" className="btn btn-inverse-primary" onClick={onClose}>Request Workforce <span aria-hidden="true">↗</span></Link>
          <button type="button" className="mobile-candidate-link" onClick={onOpenWorkerModal}>Join Our Workforce</button>
          <p>A venture of Ascentra Global Ltd</p>
        </div>
      </div>
    </dialog>
  );
}
