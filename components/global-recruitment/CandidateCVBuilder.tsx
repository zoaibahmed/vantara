'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CandidateRegistrationData,
  EmploymentRecord,
  LanguageRecord
} from '@/lib/recruitment/schema';
import {
  INITIAL_CANDIDATE_DATA,
  COMMON_COUNTRIES,
  TARGET_REGIONS,
  RECRUITMENT_INDUSTRIES
} from '@/lib/recruitment/constants';
import CVPreview from './CVPreview';

interface CandidateCVBuilderProps {
  preselectedDestination?: string;
  preselectedIndustry?: string;
  preselectedCategory?: 'Skilled' | 'Semi-Skilled' | 'Entry-Level' | '';
}

export default function CandidateCVBuilder({
  preselectedDestination,
  preselectedIndustry,
  preselectedCategory
}: CandidateCVBuilderProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<CandidateRegistrationData>(INITIAL_CANDIDATE_DATA);
  const [optionalCvFile, setOptionalCvFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    reference?: string;
    message?: string;
  } | null>(null);

  // Sync external preselection from destination/industry/category clicks
  useEffect(() => {
    if (preselectedDestination) {
      setFormData((prev) => ({ ...prev, preferredDestination: preselectedDestination }));
    }
  }, [preselectedDestination]);

  useEffect(() => {
    if (preselectedIndustry) {
      setFormData((prev) => ({ ...prev, preferredIndustry: preselectedIndustry }));
    }
  }, [preselectedIndustry]);

  useEffect(() => {
    if (preselectedCategory) {
      setFormData((prev) => ({ ...prev, skillCategory: preselectedCategory }));
    }
  }, [preselectedCategory]);

  const stepsList = [
    { num: 1, label: 'Personal Details' },
    { num: 2, label: 'Preferences' },
    { num: 3, label: 'Experience' },
    { num: 4, label: 'Readiness' },
    { num: 5, label: 'Review & Submit' }
  ];

  // Validation per step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = 'Please provide a valid email address';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone / WhatsApp is required';
      if (!formData.country.trim()) newErrors.country = 'Country of residence is required';
      if (!formData.city.trim()) newErrors.city = 'City / region is required';
    }

    if (step === 2) {
      if (!formData.preferredIndustry) newErrors.preferredIndustry = 'Please select a preferred industry';
      if (!formData.preferredRole.trim()) newErrors.preferredRole = 'Preferred job position / trade is required';
      if (!formData.skillCategory) newErrors.skillCategory = 'Please select your workforce skill tier';
      if (!formData.preferredDestination) newErrors.preferredDestination = 'Please select a primary destination region';
    }

    if (step === 3) {
      if (!formData.isEntryLevelNoExperience) {
        if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Please select total years of experience';
      }
    }

    if (step === 4) {
      if (!formData.passportStatus) newErrors.passportStatus = 'Please select passport availability status';
      if (!formData.consentGiven) newErrors.consentGiven = 'Consent to store and process your candidate data is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      const anchor = document.getElementById('cv-builder');
      if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    const anchor = document.getElementById('cv-builder');
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
  };

  // Add / Remove Employment Records
  const addEmploymentRecord = () => {
    const newRecord: EmploymentRecord = {
      id: `job-${Date.now()}`,
      company: '',
      jobTitle: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      responsibilities: ''
    };
    setFormData((prev) => ({
      ...prev,
      employmentHistory: [...prev.employmentHistory, newRecord]
    }));
  };

  const removeEmploymentRecord = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      employmentHistory: prev.employmentHistory.filter((j) => j.id !== id)
    }));
  };

  const updateEmploymentRecord = (id: string, field: keyof EmploymentRecord, val: any) => {
    setFormData((prev) => ({
      ...prev,
      employmentHistory: prev.employmentHistory.map((j) => (j.id === id ? { ...j, [field]: val } : j))
    }));
  };

  // Add / Remove Languages
  const addLanguage = () => {
    const newLang: LanguageRecord = {
      id: `lang-${Date.now()}`,
      language: '',
      proficiency: 'Conversational'
    };
    setFormData((prev) => ({
      ...prev,
      languages: [...prev.languages, newLang]
    }));
  };

  const removeLanguage = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l.id !== id)
    }));
  };

  const updateLanguage = (id: string, field: keyof LanguageRecord, val: any) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.map((l) => (l.id === id ? { ...l, [field]: val } : l))
    }));
  };

  // Submission handler
  const handleSubmitApplication = async () => {
    if (!validateStep(4)) {
      setCurrentStep(4);
      return;
    }

    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      let response: Response;

      if (optionalCvFile) {
        const payload = new FormData();
        payload.append('data', JSON.stringify(formData));
        payload.append('cvFile', optionalCvFile);

        response = await fetch('/api/global-recruitment/candidates', {
          method: 'POST',
          body: payload
        });
      } else {
        response = await fetch('/api/global-recruitment/candidates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSubmissionResult({
          success: true,
          reference: resData.reference,
          message: resData.message
        });
      } else {
        setSubmissionResult({
          success: false,
          message: resData.message || 'There was an issue submitting your registration. Please try again.'
        });
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmissionResult({
        success: false,
        message: 'Network error submitting candidate registration. Please verify your connection.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="scene-container" id="cv-builder" style={{ padding: 'var(--space-24) 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', margin: '0 auto var(--space-12)', textAlign: 'center' }}>
          <span className="label-editorial" style={{ justifyContent: 'center' }}>Candidate Portal System</span>
          <h2
            className="display-2"
            style={{
              margin: 'var(--space-4) 0 var(--space-4)',
              textTransform: 'uppercase'
            }}
          >
            Build Your Professional<br />
            <em>International CV.</em>
          </h2>
          <p className="lead-text">
            No accounts, passwords, or complex dashboards required. Enter your details to generate a structured international-standard CV and register for recruitment opportunities.
          </p>
        </div>

        {/* Form Container Card */}
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            backgroundColor: 'var(--bg-pure)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-warm)',
            boxShadow: 'var(--shadow-md)',
            padding: 'clamp(1.5rem, 4vw, 3rem)'
          }}
        >
          {/* Success Result View */}
          {submissionResult && submissionResult.success ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-8) var(--space-4)' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--brand-forest)',
                  color: 'var(--text-inverse)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  margin: '0 auto var(--space-6)'
                }}
              >
                ✓
              </div>

              <span className="label-editorial" style={{ justifyContent: 'center' }}>Registration Received</span>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)',
                  color: 'var(--brand-forest-deep)',
                  margin: 'var(--space-3) 0 var(--space-4)',
                  textTransform: 'uppercase'
                }}
              >
                Candidate Profile Logged
              </h3>

              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-warm)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-3) var(--space-6)',
                  marginBottom: 'var(--space-6)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.05rem',
                  color: 'var(--brand-forest-deep)',
                  fontWeight: 600
                }}
              >
                Reference: {submissionResult.reference}
              </div>

              <p
                style={{
                  fontSize: '1.0625rem',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  maxWidth: '640px',
                  margin: '0 auto var(--space-8)'
                }}
              >
                {submissionResult.message}
              </p>

              <div
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderLeft: '3px solid var(--brand-forest)',
                  padding: 'var(--space-4) var(--space-6)',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'left',
                  maxWidth: '600px',
                  margin: '0 auto var(--space-8)',
                  fontSize: '0.875rem',
                  lineHeight: 1.55,
                  color: 'var(--text-primary)'
                }}
              >
                <strong>Fair Recruitment Commitment:</strong> Vantara operates under strict ethical labor standards. We do not charge fees to candidates at any point during registration, interview, or placement.
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmissionResult(null);
                  setCurrentStep(1);
                  setFormData(INITIAL_CANDIDATE_DATA);
                }}
                className="btn btn-secondary"
              >
                <span>Register Another Profile</span>
              </button>
            </div>
          ) : (
            <>
              {/* Progress Indicator */}
              <div
                style={{
                  marginBottom: 'var(--space-8)',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: 'var(--space-6)'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 'var(--space-2)',
                    overflowX: 'auto',
                    paddingBottom: 'var(--space-2)'
                  }}
                >
                  {stepsList.map((st) => {
                    const isActive = currentStep === st.num;
                    const isDone = currentStep > st.num;

                    return (
                      <button
                        key={st.num}
                        type="button"
                        onClick={() => {
                          if (st.num < currentStep || validateStep(currentStep)) {
                            setCurrentStep(st.num);
                          }
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)',
                          padding: 'var(--space-1) var(--space-2)',
                          opacity: isActive ? 1 : isDone ? 0.85 : 0.45,
                          transition: 'opacity var(--duration-fast)'
                        }}
                      >
                        <div
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            backgroundColor: isActive
                              ? 'var(--brand-forest)'
                              : isDone
                              ? 'var(--brand-forest-light)'
                              : 'var(--border-warm)',
                            color: isActive || isDone ? '#FFFFFF' : 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 'var(--fw-bold)'
                          }}
                        >
                          {isDone ? '✓' : st.num}
                        </div>
                        <span
                          style={{
                            fontSize: '0.8125rem',
                            fontWeight: isActive ? 'var(--fw-bold)' : 'var(--fw-medium)',
                            color: isActive ? 'var(--brand-forest-deep)' : 'var(--text-secondary)',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {st.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Server or Global Error Banner */}
              {submissionResult && !submissionResult.success && (
                <div
                  style={{
                    backgroundColor: '#FDE8E8',
                    border: '1px solid #F8B4B4',
                    color: '#9B1C1C',
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: 'var(--space-6)',
                    fontSize: '0.875rem'
                  }}
                >
                  {submissionResult.message}
                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 1: PERSONAL INFORMATION */}
              {/* ========================================================= */}
              {currentStep === 1 && (
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.65rem',
                      color: 'var(--brand-forest-deep)',
                      marginBottom: 'var(--space-1)'
                    }}
                  >
                    1. Personal Information
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }}>
                    Your primary contact details for interview coordination. Full residential street address is not collected.
                  </p>

                  <div className="form-grid-2col">
                    <div className="form-group">
                      <label className="form-label">Full Legal Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Mateo Silva"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                      {errors.fullName && (
                        <span style={{ color: '#C81E1E', fontSize: '0.75rem', marginTop: '2px' }}>
                          {errors.fullName}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      {errors.email && (
                        <span style={{ color: '#C81E1E', fontSize: '0.75rem', marginTop: '2px' }}>
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-grid-2col" style={{ marginTop: 'var(--space-4)' }}>
                    <div className="form-group">
                      <label className="form-label">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="+351 912 345 678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                      {errors.phone && (
                        <span style={{ color: '#C81E1E', fontSize: '0.75rem', marginTop: '2px' }}>
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Country of Residence *</label>
                      <input
                        list="countries-list"
                        className="form-input"
                        placeholder="Select or type your country"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      />
                      <datalist id="countries-list">
                        {COMMON_COUNTRIES.map((c) => (
                          <option key={c} value={c} />
                        ))}
                      </datalist>
                      {errors.country && (
                        <span style={{ color: '#C81E1E', fontSize: '0.75rem', marginTop: '2px' }}>
                          {errors.country}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-grid-2col" style={{ marginTop: 'var(--space-4)' }}>
                    <div className="form-group">
                      <label className="form-label">City / Region *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Lisbon, São Paulo, Manila"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                      {errors.city && (
                        <span style={{ color: '#C81E1E', fontSize: '0.75rem', marginTop: '2px' }}>
                          {errors.city}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Nationality (Optional)</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Portuguese, Filipino, Brazilian"
                        value={formData.nationality || ''}
                        onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
                    <label className="form-label">Current Occupation / Trade (Optional)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Welder, Line Cook, Warehouse Associate"
                      value={formData.currentOccupation || ''}
                      onChange={(e) => setFormData({ ...formData, currentOccupation: e.target.value })}
                    />
                  </div>

                  {/* Honeypot field for bot protection */}
                  <input
                    type="text"
                    name="company_hp"
                    value={formData.company_hp || ''}
                    onChange={(e) => setFormData({ ...formData, company_hp: e.target.value })}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 2: EMPLOYMENT PREFERENCES */}
              {/* ========================================================= */}
              {currentStep === 2 && (
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.65rem',
                      color: 'var(--brand-forest-deep)',
                      marginBottom: 'var(--space-1)'
                    }}
                  >
                    2. Employment Preferences
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }}>
                    Define the industry, job position, skill category, and target regions for your deployment.
                  </p>

                  <div className="form-grid-2col">
                    <div className="form-group">
                      <label className="form-label">Preferred Industry *</label>
                      <select
                        className="form-select"
                        value={formData.preferredIndustry}
                        onChange={(e) => setFormData({ ...formData, preferredIndustry: e.target.value })}
                      >
                        <option value="">-- Select Industry --</option>
                        {RECRUITMENT_INDUSTRIES.map((ind) => (
                          <option key={ind.id} value={ind.name}>
                            {ind.name}
                          </option>
                        ))}
                      </select>
                      {errors.preferredIndustry && (
                        <span style={{ color: '#C81E1E', fontSize: '0.75rem', marginTop: '2px' }}>
                          {errors.preferredIndustry}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Preferred Job Position / Trade *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Certified Welder, Electrician, Line Cook"
                        value={formData.preferredRole}
                        onChange={(e) => setFormData({ ...formData, preferredRole: e.target.value })}
                      />
                      {errors.preferredRole && (
                        <span style={{ color: '#C81E1E', fontSize: '0.75rem', marginTop: '2px' }}>
                          {errors.preferredRole}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-grid-2col" style={{ marginTop: 'var(--space-4)' }}>
                    <div className="form-group">
                      <label className="form-label">Workforce Skill Tier *</label>
                      <select
                        className="form-select"
                        value={formData.skillCategory}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            skillCategory: e.target.value as any
                          })
                        }
                      >
                        <option value="">-- Select Skill Level --</option>
                        <option value="Skilled">Skilled Professional (Accredited qualifications/trade)</option>
                        <option value="Semi-Skilled">Semi-Skilled Worker (Practical experience/training)</option>
                        <option value="Entry-Level">Entry-Level Worker (Operational onboarding/trainee)</option>
                      </select>
                      {errors.skillCategory && (
                        <span style={{ color: '#C81E1E', fontSize: '0.75rem', marginTop: '2px' }}>
                          {errors.skillCategory}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Primary Destination Region *</label>
                      <select
                        className="form-select"
                        value={formData.preferredDestination}
                        onChange={(e) => setFormData({ ...formData, preferredDestination: e.target.value })}
                      >
                        <option value="">-- Select Primary Region --</option>
                        {TARGET_REGIONS.map((reg) => (
                          <option key={reg.id} value={reg.region}>
                            {reg.region}
                          </option>
                        ))}
                      </select>
                      {errors.preferredDestination && (
                        <span style={{ color: '#C81E1E', fontSize: '0.75rem', marginTop: '2px' }}>
                          {errors.preferredDestination}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Additional Destinations Multi-Select */}
                  <div className="form-group" style={{ marginTop: 'var(--space-6)' }}>
                    <label className="form-label">Additional Acceptable Regions (Optional)</label>
                    <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
                      {TARGET_REGIONS.map((reg) => {
                        const isChecked = formData.additionalDestinations.includes(reg.region);
                        return (
                          <label
                            key={reg.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 'var(--space-2)',
                              fontSize: '0.875rem',
                              cursor: 'pointer'
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData({
                                    ...formData,
                                    additionalDestinations: [...formData.additionalDestinations, reg.region]
                                  });
                                } else {
                                  setFormData({
                                    ...formData,
                                    additionalDestinations: formData.additionalDestinations.filter((r) => r !== reg.region)
                                  });
                                }
                              }}
                            />
                            <span>{reg.region}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
                    <label className="form-label">Availability to Deploy (Optional)</label>
                    <select
                      className="form-select"
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    >
                      <option value="Immediately">Immediately (Ready within 2 weeks)</option>
                      <option value="1 Month">Within 1 Month</option>
                      <option value="2 Months">Within 2 Months</option>
                      <option value="3+ Months">3+ Months / Scheduled Intake</option>
                    </select>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 3: EXPERIENCE AND QUALIFICATIONS */}
              {/* ========================================================= */}
              {currentStep === 3 && (
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.65rem',
                      color: 'var(--brand-forest-deep)',
                      marginBottom: 'var(--space-1)'
                    }}
                  >
                    3. Experience & Qualifications
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }}>
                    Detail your background. Entry-level candidates may apply without prior work history.
                  </p>

                  {/* Entry-level toggle */}
                  <div
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: 'var(--space-6)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)'
                    }}
                  >
                    <input
                      type="checkbox"
                      id="entryLevelToggle"
                      checked={formData.isEntryLevelNoExperience}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isEntryLevelNoExperience: e.target.checked,
                          yearsOfExperience: e.target.checked ? 'No experience (Entry-Level)' : '1-2 years'
                        })
                      }
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <label htmlFor="entryLevelToggle" style={{ fontSize: '0.9rem', cursor: 'pointer', margin: 0 }}>
                      <strong>I am an entry-level candidate with no prior formal experience</strong> (Skip previous employment records)
                    </label>
                  </div>

                  {!formData.isEntryLevelNoExperience && (
                    <>
                      <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                        <label className="form-label">Total Years of Experience *</label>
                        <select
                          className="form-select"
                          value={formData.yearsOfExperience}
                          onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                        >
                          <option value="Less than 1 year">Less than 1 year</option>
                          <option value="1-2 years">1 – 2 years</option>
                          <option value="3-5 years">3 – 5 years</option>
                          <option value="5-8 years">5 – 8 years</option>
                          <option value="8+ years">8+ years</option>
                        </select>
                      </div>

                      {/* Dynamic Employment Records */}
                      <div style={{ marginBottom: 'var(--space-6)' }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 'var(--space-4)'
                          }}
                        >
                          <span className="form-label" style={{ margin: 0 }}>
                            Previous Employment Records
                          </span>
                          <button
                            type="button"
                            onClick={addEmploymentRecord}
                            className="btn btn-secondary btn-sm"
                          >
                            + Add Another Position
                          </button>
                        </div>

                        {formData.employmentHistory.map((job, idx) => (
                          <div
                            key={job.id}
                            style={{
                              backgroundColor: 'var(--bg-primary)',
                              padding: 'var(--space-5)',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--border-warm)',
                              marginBottom: 'var(--space-4)',
                              position: 'relative'
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 'var(--space-3)'
                              }}
                            >
                              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--brand-forest)' }}>
                                Position #{idx + 1}
                              </span>
                              {formData.employmentHistory.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeEmploymentRecord(job.id)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#C81E1E',
                                    fontSize: '0.8125rem',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Remove
                                </button>
                              )}
                            </div>

                            <div className="form-grid-2col">
                              <div className="form-group">
                                <label className="form-label">Job Title</label>
                                <input
                                  type="text"
                                  className="form-input"
                                  placeholder="e.g. MIG/TIG Welder"
                                  value={job.jobTitle}
                                  onChange={(e) => updateEmploymentRecord(job.id, 'jobTitle', e.target.value)}
                                />
                              </div>
                              <div className="form-group">
                                <label className="form-label">Employer / Company Name</label>
                                <input
                                  type="text"
                                  className="form-input"
                                  placeholder="e.g. Alverca Fabrications"
                                  value={job.company}
                                  onChange={(e) => updateEmploymentRecord(job.id, 'company', e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="form-grid-2col" style={{ marginTop: 'var(--space-3)' }}>
                              <div className="form-group">
                                <label className="form-label">Start Date</label>
                                <input
                                  type="text"
                                  className="form-input"
                                  placeholder="e.g. Jan 2021"
                                  value={job.startDate}
                                  onChange={(e) => updateEmploymentRecord(job.id, 'startDate', e.target.value)}
                                />
                              </div>
                              <div className="form-group">
                                <label className="form-label">End Date (or 'Present')</label>
                                <input
                                  type="text"
                                  className="form-input"
                                  placeholder="e.g. Present, or Dec 2023"
                                  value={job.endDate}
                                  onChange={(e) => updateEmploymentRecord(job.id, 'endDate', e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="form-group" style={{ marginTop: 'var(--space-3)' }}>
                              <label className="form-label">Key Responsibilities & Achievements</label>
                              <textarea
                                className="form-textarea"
                                rows={2}
                                placeholder="Describe core tasks, equipment operated, or volume handled..."
                                value={job.responsibilities}
                                onChange={(e) => updateEmploymentRecord(job.id, 'responsibilities', e.target.value)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Skills Tag Input */}
                  <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                    <label className="form-label">Relevant Practical Skills (Comma-separated)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Blueprint Reading, MIG Welding, Forklift Operation, HACCP Hygiene, English"
                      value={formData.skills.join(', ')}
                      onChange={(e) => {
                        const parsed = e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean);
                        setFormData({ ...formData, skills: parsed });
                      }}
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px', display: 'block' }}>
                      Separate skills with commas (e.g. Site Safety, Electrical Wiring, Inventory Audit)
                    </span>
                  </div>

                  <div className="form-grid-2col" style={{ marginBottom: 'var(--space-6)' }}>
                    <div className="form-group">
                      <label className="form-label">Highest Education Level</label>
                      <select
                        className="form-select"
                        value={formData.highestEducation}
                        onChange={(e) => setFormData({ ...formData, highestEducation: e.target.value })}
                      >
                        <option value="High School Diploma">High School Diploma / Secondary</option>
                        <option value="Vocational / Trade Certificate">Vocational / Trade Certificate</option>
                        <option value="Technical Diploma (2-Year)">Technical Diploma (2-Year)</option>
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Post-Graduate / Master's">Post-Graduate / Master's</option>
                        <option value="Other / Self-Taught">Other / Practical Apprenticeship</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Professional Certifications</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. ISO 9606 Welding, OSHA 30, HACCP Level 2"
                        value={formData.certifications}
                        onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Languages section */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'var(--space-3)'
                      }}
                    >
                      <span className="form-label" style={{ margin: 0 }}>
                        Languages Spoken & Proficiency
                      </span>
                      <button
                        type="button"
                        onClick={addLanguage}
                        className="btn btn-secondary btn-sm"
                      >
                        + Add Language
                      </button>
                    </div>

                    {formData.languages.map((lang, idx) => (
                      <div
                        key={lang.id}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr auto',
                          gap: 'var(--space-3)',
                          alignItems: 'center',
                          marginBottom: 'var(--space-3)'
                        }}
                      >
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. English, Spanish, Tagalog"
                          value={lang.language}
                          onChange={(e) => updateLanguage(lang.id, 'language', e.target.value)}
                        />
                        <select
                          className="form-select"
                          value={lang.proficiency}
                          onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value as any)}
                        >
                          <option value="Basic">Basic</option>
                          <option value="Conversational">Conversational</option>
                          <option value="Professional">Professional</option>
                          <option value="Fluent">Fluent</option>
                          <option value="Native">Native</option>
                        </select>
                        {formData.languages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLanguage(lang.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#C81E1E',
                              cursor: 'pointer',
                              padding: 'var(--space-2)'
                            }}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 4: PROFESSIONAL READINESS */}
              {/* ========================================================= */}
              {currentStep === 4 && (
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.65rem',
                      color: 'var(--brand-forest-deep)',
                      marginBottom: 'var(--space-1)'
                    }}
                  >
                    4. Professional Readiness
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }}>
                    Readiness indicators for international travel logistics. Passport numbers or sensitive identity documents are strictly NOT collected.
                  </p>

                  <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                    <label className="form-label">Do you hold a currently valid international passport? *</label>
                    <div style={{ display: 'flex', gap: 'var(--space-6)', marginTop: 'var(--space-2)' }}>
                      {['Yes', 'No', 'Prefer not to say'].map((opt) => (
                        <label
                          key={opt}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                          }}
                        >
                          <input
                            type="radio"
                            name="passportStatus"
                            value={opt}
                            checked={formData.passportStatus === opt}
                            onChange={(e) => setFormData({ ...formData, passportStatus: e.target.value as any })}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                    {errors.passportStatus && (
                      <span style={{ color: '#C81E1E', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                        {errors.passportStatus}
                      </span>
                    )}
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                      Passport existence is an operational readiness indicator. Do not submit passport numbers or identity photos.
                    </span>
                  </div>

                  <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                    <label className="form-label">Driving Licence Category (Optional)</label>
                    <select
                      className="form-select"
                      value={formData.drivingLicense}
                      onChange={(e) => setFormData({ ...formData, drivingLicense: e.target.value })}
                    >
                      <option value="None">None</option>
                      <option value="Light Vehicle (Category B)">Light Vehicle (Category B / Passenger Car)</option>
                      <option value="Heavy Commercial (Category C/D)">Heavy Commercial (Category C/D / Truck / Bus)</option>
                      <option value="Forklift / Heavy Machinery">Forklift / Heavy Plant Operator</option>
                      <option value="Motorcycle (Category A)">Motorcycle (Category A)</option>
                      <option value="Multiple Licenses">Multiple Categories Held</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                    <label className="form-label">Professional Notes & Objective (Optional)</label>
                    <textarea
                      className="form-textarea"
                      rows={3}
                      placeholder="Highlight any additional strengths, machinery you are certified to operate, or specific career goals..."
                      value={formData.professionalNotes || ''}
                      onChange={(e) => setFormData({ ...formData, professionalNotes: e.target.value })}
                    />
                  </div>

                  {/* Optional CV File Upload */}
                  <div
                    style={{
                      border: '1px dashed var(--border-warm)',
                      borderRadius: 'var(--radius-sm)',
                      padding: 'var(--space-4)',
                      marginBottom: 'var(--space-6)',
                      backgroundColor: 'var(--bg-primary)'
                    }}
                  >
                    <label className="form-label" style={{ marginBottom: 'var(--space-1)' }}>
                      Attach Existing CV / Resume Document (Optional)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setOptionalCvFile(file);
                        setFormData({ ...formData, hasExistingCVFile: !!file });
                      }}
                      style={{ fontSize: '0.875rem' }}
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                      Accepted formats: PDF, DOC, DOCX up to 6MB. Our system will still generate your structured Vantara CV regardless.
                    </span>
                  </div>

                  {/* Mandatory Consent Checkbox */}
                  <div
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: '3px solid var(--brand-forest)'
                    }}
                  >
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--space-3)',
                        fontSize: '0.8125rem',
                        lineHeight: 1.5,
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.consentGiven}
                        onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                        style={{ marginTop: '2px' }}
                      />
                      <span>
                        <strong>Declaration & Consent:</strong> I confirm that the information provided is accurate and factual. I consent to Vantara Workforce Solutions (a venture of Ascentra Global Ltd) storing and processing my candidate profile for international recruitment matching in accordance with data privacy regulations.
                      </span>
                    </label>
                    {errors.consentGiven && (
                      <span style={{ color: '#C81E1E', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                        {errors.consentGiven}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 5: CV PREVIEW AND SUBMISSION */}
              {/* ========================================================= */}
              {currentStep === 5 && (
                <CVPreview
                  data={formData}
                  onEditStep={(step) => setCurrentStep(step)}
                  onSubmit={handleSubmitApplication}
                  isSubmitting={isSubmitting}
                />
              )}

              {/* Form Navigation Controls (Steps 1 to 4) */}
              {currentStep < 5 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'var(--space-8)',
                    paddingTop: 'var(--space-6)',
                    borderTop: '1px solid var(--border-subtle)'
                  }}
                >
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn btn-outline"
                    >
                      <span>← Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn btn-primary"
                  >
                    <span>{currentStep === 4 ? 'Review & Preview CV' : 'Next Step'}</span>
                    <span className="btn-arrow" aria-hidden="true">→</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
