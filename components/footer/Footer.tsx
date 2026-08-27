'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  onOpenWorkerModal?: () => void;
}

export default function Footer({ onOpenWorkerModal }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container">
        
        <div className="footer-top-grid">
          
          {/* Brand Lockup */}
          <div className="footer-brand-col">
            <div className="footer-brand-title">Vantara</div>
            <div className="footer-parent-tag">A venture of <strong>Ascentra Global Ltd</strong></div>
            <p className="footer-tagline">
              Your Hospitality Workforce. Coordinated. Professional international workforce sourcing and deployment for premier resort destinations.
            </p>
          </div>

          {/* Explore Navigation */}
          <div>
            <h4 className="footer-col-title">Explore</h4>
            <ul className="footer-links">
              <li><Link href="/solutions" className="footer-link">Solutions</Link></li>
              <li><Link href="/how-it-works" className="footer-link">How It Works</Link></li>
              <li><Link href="/workforce" className="footer-link">Workforce</Link></li>
              <li><Link href="/destinations" className="footer-link">Destinations</Link></li>
              <li><Link href="/about" className="footer-link">About Vantara</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Opportunities */}
          <div>
            <h4 className="footer-col-title">Opportunities</h4>
            <ul className="footer-links">
              <li>
                <button
                  type="button"
                  className="footer-link"
                  onClick={onOpenWorkerModal}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  Join Our Workforce
                </button>
              </li>
              <li><Link href="/destinations" className="footer-link">Destination Hubs</Link></li>
              <li><Link href="/solutions" className="footer-link">Operational Roles</Link></li>
            </ul>
          </div>

          {/* Company & Governance */}
          <div>
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links">
              <li><Link href="/about" className="footer-link">Ascentra Global Ltd</Link></li>
              <li><Link href="/contact" className="footer-link">Employer Consultation</Link></li>
              <li><span className="footer-pill" style={{ marginTop: '8px' }}>Direct Employer Service</span></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Legal */}
        <div className="footer-bottom">
          <p className="footer-legal-note">
            Vantara Workforce Solutions operates as an international hospitality workforce coordinator under Ascentra Global Ltd. The employer retains ultimate hiring discretion and bears applicable employment and destination-side costs in accordance with bilateral agreements.
          </p>
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Vantara Workforce Solutions. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
