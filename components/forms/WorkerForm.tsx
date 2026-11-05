'use client';

import React, { useState } from 'react';
import { submitCandidateApplication } from '@/services/candidateApplication';

export default function WorkerForm() {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    const submittedForm = e.currentTarget;
    setFeedback(null);
    setIsSubmitting(true);
    const res = await submitCandidateApplication(formData, cvFile);
    setIsSubmitting(false);
    setIsSuccess(res.success);
    setFeedback(res.message);
    if (res.success) {
      submittedForm.reset();
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
    <div className="form-card-container">
      <form onSubmit={handleSubmit} id="standaloneWorkerForm">
        <div className="form-grid-2col">
          <div className="form-group">
            <label htmlFor="wName" className="form-label">Full Name *</label>
            <input
              type="text" maxLength={200}
              id="wName" name="wName" autoComplete="name"
              className="form-input"
              placeholder="Your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="wCountry" className="form-label">Country of Origin / Residence *</label>
            <input
              type="text" maxLength={200}
              id="wCountry" name="wCountry" autoComplete="country-name"
              className="form-input"
              placeholder="e.g. Philippines, Bangladesh, Nepal"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-grid-2col" style={{ marginTop: 'var(--space-4)' }}>
          <div className="form-group">
            <label htmlFor="wPhone" className="form-label">Phone / WhatsApp *</label>
            <input
              type="tel" maxLength={60}
              id="wPhone" name="wPhone" autoComplete="tel"
              className="form-input"
              placeholder="+123 456 789"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="wEmail" className="form-label">Email Address *</label>
            <input
              type="email" maxLength={254} spellCheck={false}
              id="wEmail" name="wEmail" autoComplete="email"
              className="form-input"
              placeholder="you@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-grid-2col" style={{ marginTop: 'var(--space-4)' }}>
          <div className="form-group">
            <label htmlFor="wProfession" className="form-label">Primary Profession / Role *</label>
            <input
              type="text" maxLength={200}
              id="wProfession" name="wProfession"
              className="form-input"
              placeholder="e.g. Pastry Chef, Waiter, Front Desk"
              value={formData.profession}
              onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="wExp" className="form-label">Years of Hospitality Experience *</label>
            <input
              type="text" maxLength={200}
              id="wExp" name="wExp"
              className="form-input"
              placeholder="e.g. 3 Years"
              value={formData.experienceYears}
              onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
          <label htmlFor="wDest" className="form-label">Preferred Destination Region (Optional)</label>
          <input
            type="text" maxLength={200}
            id="wDest" name="wDest"
            className="form-input"
            placeholder="e.g. Seychelles, Maldives, Caribbean"
            value={formData.preferredDestination}
            onChange={(e) => setFormData({ ...formData, preferredDestination: e.target.value })}
          />
        </div>

        <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
          <label htmlFor="wCV" className="form-label">CV / Resume Upload (PDF / DOCX)</label>
          <input
            type="file"
            id="wCV" name="wCV"
            className="form-input"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              const selected = e.target.files?.[0] || null;
                  if (selected && (selected.size > 6 * 1024 * 1024 || !/\.(pdf|doc|docx)$/i.test(selected.name))) {
                    setFeedback('Choose a PDF, DOC or DOCX file smaller than 6MB.'); setIsSuccess(false); setCvFile(null); e.target.value = ''; return;
                  }
                  setFeedback(null); setCvFile(selected);
            }}
          />
        </div>

        <div style={{ marginTop: 'var(--space-6)' }}>
          <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
            <span>{isSubmitting ? 'Registering Application...' : "Join Viaferra's Workforce"}</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </button>
        </div>

        {feedback && (
          <div role={isSuccess ? "status" : "alert"} aria-live="polite"
            style={{
              marginTop: 'var(--space-4)',
              padding: 'var(--space-4)',
              backgroundColor: isSuccess ? 'var(--brand-forest-surface)' : '#FDEDEC',
              border: `1px solid ${isSuccess ? 'var(--brand-forest-border)' : '#F5B7B1'}`,
              borderRadius: 'var(--radius-sm)',
              color: isSuccess ? 'var(--brand-forest-deep)' : '#78281F',
              fontSize: '0.875rem'
            }}
          >
            <strong>{isSuccess ? 'Thank you.' : 'Notice:'}</strong> {feedback}
          </div>
        )}
      </form>
    </div>
  );
}
