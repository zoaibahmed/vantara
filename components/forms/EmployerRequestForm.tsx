'use client';

import React, { useState } from 'react';
import { submitEmployerRequest } from '@/services/employerRequest';
import { EmployerEnquiry } from '@/types';

interface EmployerRequestFormProps {
  onOpenWorkerModal?: () => void;
}

export default function EmployerRequestForm({ onOpenWorkerModal }: EmployerRequestFormProps) {
  const [formData, setFormData] = useState<EmployerEnquiry>({
    companyName: '',
    businessType: '',
    operatingCountry: '',
    companyWebsite: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    rolesRequired: '',
    workersCount: '',
    startDate: '',
    contractDuration: '',
    additionalNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await submitEmployerRequest(formData);
    setIsSubmitting(false);
    setIsSuccess(res.success);
    setFeedback(res.message);
    if (res.success) {
      setFormData({
        companyName: '',
        businessType: '',
        operatingCountry: '',
        companyWebsite: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        rolesRequired: '',
        workersCount: '',
        startDate: '',
        contractDuration: '',
        additionalNotes: ''
      });
    }
  };

  return (
    <div className="form-card-container">
      <form onSubmit={handleSubmit} id="employerRequestForm">
        
        {/* 1. YOUR BUSINESS */}
        <div className="form-section-title">1. Your Business</div>
        <div className="form-grid-2col">
          <div className="form-group">
            <label htmlFor="companyName" className="form-label">Property / Company Name *</label>
            <input
              type="text"
              id="companyName"
              className="form-input"
              placeholder="e.g. Coral Reef Luxury Resort"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="businessType" className="form-label">Business Type *</label>
            <select
              id="businessType"
              className="form-select"
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              required
            >
              <option value="">Select hospitality category...</option>
              <option value="luxury-resort">Luxury Resort / Island Property</option>
              <option value="hotel">City / Boutique Hotel</option>
              <option value="restaurant-fnb">Restaurant / F&B Group</option>
              <option value="catering-events">Events & Catering Operator</option>
              <option value="other">Other Hospitality Enterprise</option>
            </select>
          </div>
        </div>

        <div className="form-grid-2col" style={{ marginTop: 'var(--space-4)' }}>
          <div className="form-group">
            <label htmlFor="operatingCountry" className="form-label">Destination Country / Location *</label>
            <input
              type="text"
              id="operatingCountry"
              className="form-input"
              placeholder="e.g. Seychelles, Maldives, Belize"
              value={formData.operatingCountry}
              onChange={(e) => setFormData({ ...formData, operatingCountry: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="companyWebsite" className="form-label">Website (Optional)</label>
            <input
              type="url"
              id="companyWebsite"
              className="form-input"
              placeholder="https://"
              value={formData.companyWebsite}
              onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
            />
          </div>
        </div>

        {/* 2. YOUR REQUIREMENT */}
        <div className="form-section-title">2. Your Requirement</div>
        <div className="form-grid-2col">
          <div className="form-group">
            <label htmlFor="rolesRequired" className="form-label">Roles Required *</label>
            <input
              type="text"
              id="rolesRequired"
              className="form-input"
              placeholder="e.g. 10 Housekeepers, 5 Commis Chefs, 4 Waitstaff"
              value={formData.rolesRequired}
              onChange={(e) => setFormData({ ...formData, rolesRequired: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="workersCount" className="form-label">Number of Workers *</label>
            <input
              type="text"
              id="workersCount"
              className="form-input"
              placeholder="e.g. 15-20 workers"
              value={formData.workersCount}
              onChange={(e) => setFormData({ ...formData, workersCount: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-grid-2col" style={{ marginTop: 'var(--space-4)' }}>
          <div className="form-group">
            <label htmlFor="startDate" className="form-label">Required Start Date *</label>
            <input
              type="text"
              id="startDate"
              className="form-input"
              placeholder="e.g. Q3 2026 / October"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contractDuration" className="form-label">Contract Duration *</label>
            <select
              id="contractDuration"
              className="form-select"
              value={formData.contractDuration}
              onChange={(e) => setFormData({ ...formData, contractDuration: e.target.value })}
              required
            >
              <option value="">Select contract term...</option>
              <option value="seasonal-6m">Seasonal (3 - 6 Months)</option>
              <option value="annual-12m">1 Year Fixed</option>
              <option value="multi-year">2+ Years Renewable</option>
            </select>
          </div>
        </div>

        {/* 3. YOUR CONTACT */}
        <div className="form-section-title">3. Your Contact</div>
        <div className="form-grid-3col">
          <div className="form-group">
            <label htmlFor="contactName" className="form-label">Contact Name *</label>
            <input
              type="text"
              id="contactName"
              className="form-input"
              placeholder="Full name"
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactEmail" className="form-label">Work Email *</label>
            <input
              type="email"
              id="contactEmail"
              className="form-input"
              placeholder="name@property.com"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactPhone" className="form-label">Phone / WhatsApp *</label>
            <input
              type="tel"
              id="contactPhone"
              className="form-input"
              placeholder="+123 456 789"
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              required
            />
          </div>
        </div>

        {/* 4. ADDITIONAL INFORMATION */}
        <div className="form-section-title">4. Additional Information</div>
        <div className="form-group">
          <label htmlFor="additionalNotes" className="form-label">Requirements / Message</label>
          <textarea
            id="additionalNotes"
            className="form-textarea"
            placeholder="Detail any language requirements, on-site accommodation arrangements, or specific culinary certifications..."
            value={formData.additionalNotes}
            onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
          />
        </div>

        {/* Submit Action */}
        <div style={{ marginTop: 'var(--space-8)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
          <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
            <span>{isSubmitting ? 'Delivering Request...' : 'Send Workforce Request'}</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </button>

          {onOpenWorkerModal && (
            <button
              type="button"
              className="btn-ghost"
              onClick={onOpenWorkerModal}
              style={{ border: 'none', cursor: 'pointer', background: 'transparent' }}
            >
              Are you a job seeker? Join Our Workforce →
            </button>
          )}
        </div>

        {feedback && (
          <div
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
            <strong>{isSuccess ? 'Thank you for contacting Vantara.' : 'Notice:'}</strong> {feedback}
          </div>
        )}

        <p className="form-privacy-note">
          Vantara Workforce Solutions respects your privacy. All information submitted is held strictly confidential for employer workforce coordination under Ascentra Global Ltd.
        </p>

      </form>
    </div>
  );
}
