'use client';

import React, { useState, useEffect } from 'react';
import { submitCandidateApplication } from '@/services/candidateApplication';

interface WorkerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkerModal({ isOpen, onClose }: WorkerModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    country: '',
    phone: '',
    email: '',
    profession: '',
    experienceYears: '',
    preferredDestination: ''
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setFeedback(null);
      setIsSuccess(null);
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

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await submitCandidateApplication(formData, cvFile);
    setIsSubmitting(false);
    setIsSuccess(res.success);
    setFeedback(res.message);
    if (res.success) {
      setFormData({
        fullName: '',
        country: '',
        phone: '',
        email: '',
        profession: '',
        experienceYears: '',
        preferredDestination: ''
      });
      setCvFile(null);
    }
  };

  return (
    <div className="worker-modal-container" role="dialog" aria-modal="true" aria-labelledby="workerModalHeading">
      {/* Dark Frosted Backdrop */}
      <div className="worker-modal-backdrop" onClick={onClose} aria-hidden="true" />
      
      {/* Solid Elevated Dialog Card */}
      <div className="worker-modal-card">
        <div className="modal-card-header">
          <div>
            <span className="label-editorial" style={{ margin: 0, color: 'var(--brand-forest)' }}>Candidate Registration</span>
            <h3 className="display-3" id="workerModalHeading" style={{ color: 'var(--brand-forest-deep)', margin: 'var(--space-1) 0 0' }}>
              Join Our International Workforce
            </h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close candidate modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {isSuccess ? (
          <div className="modal-feedback-box">
            <div className="badge-pill badge-forest" style={{ marginBottom: 'var(--space-3)' }}>Application Received</div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--brand-forest-deep)', marginBottom: 'var(--space-2)' }}>
              Thank you for registering.
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, maxWidth: '440px', margin: '0 auto' }}>
              {feedback}
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClose}
              style={{ marginTop: 'var(--space-5)' }}
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form-body">
            <div className="form-grid-2col">
              <div className="form-group">
                <label htmlFor="mName" className="form-label">Full Name *</label>
                <input
                  type="text"
                  id="mName"
                  className="form-input"
                  placeholder="e.g. Maria Santos"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mCountry" className="form-label">Country of Origin / Residence *</label>
                <input
                  type="text"
                  id="mCountry"
                  className="form-input"
                  placeholder="e.g. Philippines, Bangladesh, Nepal"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-grid-2col">
              <div className="form-group">
                <label htmlFor="mPhone" className="form-label">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  id="mPhone"
                  className="form-input"
                  placeholder="+63 912 345 6789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mEmail" className="form-label">Email Address *</label>
                <input
                  type="email"
                  id="mEmail"
                  className="form-input"
                  placeholder="candidate@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-grid-2col">
              <div className="form-group">
                <label htmlFor="mProfession" className="form-label">Primary Profession / Role *</label>
                <input
                  type="text"
                  id="mProfession"
                  className="form-input"
                  placeholder="e.g. Pastry Chef, Head Waiter, Housekeeping"
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mExp" className="form-label">Hospitality Experience (Years) *</label>
                <input
                  type="text"
                  id="mExp"
                  className="form-input"
                  placeholder="e.g. 4 Years"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="mDest" className="form-label">Preferred Destination Region (Optional)</label>
              <input
                type="text"
                id="mDest"
                className="form-input"
                placeholder="e.g. Seychelles, Maldives, Belize"
                value={formData.preferredDestination}
                onChange={(e) => setFormData({ ...formData, preferredDestination: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mCV" className="form-label">CV / Resume Upload (PDF or DOCX)</label>
              <input
                type="file"
                id="mCV"
                className="form-input form-file-input"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setCvFile(e.target.files[0]);
                  }
                }}
              />
            </div>

            {feedback && !isSuccess && (
              <div
                style={{
                  padding: 'var(--space-3)',
                  backgroundColor: '#FDEDEC',
                  border: '1px solid #F5B7B1',
                  borderRadius: 'var(--radius-sm)',
                  color: '#78281F',
                  fontSize: '0.875rem'
                }}
              >
                {feedback}
              </div>
            )}

            <div style={{ marginTop: 'var(--space-4)' }}>
              <button type="submit" className="btn btn-primary w-full btn-lg" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Registering Profile...' : "Submit Candidate Registration"}</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </button>
            </div>

            <p className="form-privacy-note" style={{ textAlign: 'center', marginTop: 'var(--space-3)' }}>
              Zero recruitment fees charged to candidates. All applications are evaluated under Vantara’s Ethical Recruitment Charter.
            </p>
          </form>
        )}

      </div>
    </div>
  );
}
