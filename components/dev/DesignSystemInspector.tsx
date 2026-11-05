'use client';

import React, { useState, useEffect } from 'react';

export default function DesignSystemInspector() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    // Keep the inspector opt-in and local to development.
    const isDevEnv = process.env.NODE_ENV === 'development' && new URLSearchParams(window.location.search).get('ds') === 'true';
    setIsDev(isDevEnv);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isDev) return null;

  return (
    <>
      <button
        className="ds-inspector-toggle is-active"
        onClick={() => setIsOpen(true)}
        aria-label="Open Design System Token Specs"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
        <span>DEV: Design Specs</span>
      </button>

      {isOpen && (
        <div className="ds-modal is-open" role="dialog" aria-modal="true">
          <div className="ds-modal-backdrop" onClick={() => setIsOpen(false)} />
          <div className="ds-modal-card">
            <div className="ds-modal-header">
              <div>
                <h3 className="ds-modal-title">Viaferra Design System — Token Spec</h3>
                <div className="ds-modal-subtitle">Phase 4 Next.js + React Architecture • Warm Ivory & Forest Green</div>
              </div>
              <button className="ds-modal-close" onClick={() => setIsOpen(false)} aria-label="Close">&times;</button>
            </div>
            <div className="ds-modal-body">
              <section>
                <div className="ds-section-title">1. Curated Color Palette Tokens</div>
                <div className="ds-color-grid">
                  <div className="ds-swatch">
                    <div className="ds-swatch-color" style={{ backgroundColor: '#FAF8F5', borderBottom: '1px solid #E2DBD0' }} />
                    <div className="ds-swatch-info">
                      <div className="ds-swatch-name">Warm Ivory (Canvas)</div>
                      <div className="ds-swatch-hex">#FAF8F5</div>
                      <div className="ds-swatch-role">Primary Background</div>
                    </div>
                  </div>
                  <div className="ds-swatch">
                    <div className="ds-swatch-color" style={{ backgroundColor: '#183B2B' }} />
                    <div className="ds-swatch-info">
                      <div className="ds-swatch-name">Deep Forest Green</div>
                      <div className="ds-swatch-hex">#183B2B</div>
                      <div className="ds-swatch-role">Primary Brand Color</div>
                    </div>
                  </div>
                  <div className="ds-swatch">
                    <div className="ds-swatch-color" style={{ backgroundColor: '#0E271B' }} />
                    <div className="ds-swatch-info">
                      <div className="ds-swatch-name">Evergreen Deep</div>
                      <div className="ds-swatch-hex">#0E271B</div>
                      <div className="ds-swatch-role">High Contrast Display</div>
                    </div>
                  </div>
                  <div className="ds-swatch">
                    <div className="ds-swatch-color" style={{ backgroundColor: '#F3EFE8', borderBottom: '1px solid #E2DBD0' }} />
                    <div className="ds-swatch-info">
                      <div className="ds-swatch-name">Warm Sand Stone</div>
                      <div className="ds-swatch-hex">#F3EFE8</div>
                      <div className="ds-swatch-role">Secondary Surface</div>
                    </div>
                  </div>
                  <div className="ds-swatch">
                    <div className="ds-swatch-color" style={{ backgroundColor: '#EDE4D3', borderBottom: '1px solid #E2DBD0' }} />
                    <div className="ds-swatch-info">
                      <div className="ds-swatch-name">Natural Champagne</div>
                      <div className="ds-swatch-hex">#EDE4D3</div>
                      <div className="ds-swatch-role">Neutral Accent</div>
                    </div>
                  </div>
                  <div className="ds-swatch">
                    <div className="ds-swatch-color" style={{ backgroundColor: '#19231E' }} />
                    <div className="ds-swatch-info">
                      <div className="ds-swatch-name">Refined Charcoal</div>
                      <div className="ds-swatch-hex">#19231E</div>
                      <div className="ds-swatch-role">Primary Typography</div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
