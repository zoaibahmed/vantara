import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAnimations();

  // 1. Worker Modal ("Join Our Workforce") Handling
  const workerModal = document.getElementById('workerModal');
  const workerClose = document.getElementById('workerModalClose');
  const workerBackdrop = document.querySelector('.worker-modal-backdrop');
  const workerTriggers = document.querySelectorAll('[data-open-worker-modal]');

  const openWorkerModal = (e) => {
    if (e) e.preventDefault();
    if (workerModal) {
      workerModal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeWorkerModal = () => {
    if (workerModal) {
      workerModal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  };

  workerTriggers.forEach(btn => btn.addEventListener('click', openWorkerModal));
  if (workerClose) workerClose.addEventListener('click', closeWorkerModal);
  if (workerBackdrop) workerBackdrop.addEventListener('click', closeWorkerModal);

  // 2. Employer Request Workforce Form Interactive Feedback
  const employerForm = document.getElementById('employerRequestForm');
  const formFeedback = document.getElementById('employerFormFeedback');

  if (employerForm) {
    employerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = employerForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Processing Request...</span>';

      setTimeout(() => {
        submitBtn.innerHTML = '<span>Workforce Request Received ✓</span>';
        submitBtn.style.backgroundColor = 'var(--brand-forest-light)';
        if (formFeedback) {
          formFeedback.style.display = 'block';
          formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 800);
    });
  }

  // 3. Candidate Worker Application Form Feedback
  const workerForm = document.getElementById('workerApplicationForm');
  const workerFeedback = document.getElementById('workerFormFeedback');

  if (workerForm) {
    workerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = workerForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Application Submitted ✓</span>';
      if (workerFeedback) {
        workerFeedback.style.display = 'block';
      }
    });
  }

  // 4. Design System Inspector Modal (DEV / QA Mode Only)
  const isDevMode = import.meta.env.DEV || 
                    window.location.search.includes('ds=true') || 
                    window.location.search.includes('dev=true');

  const dsToggle = document.getElementById('dsInspectorToggle');
  const dsModal = document.getElementById('dsModal');
  const dsClose = document.getElementById('dsModalClose');
  const dsBackdrop = document.querySelector('.ds-modal-backdrop');

  if (isDevMode && dsToggle && dsModal) {
    dsToggle.classList.add('is-active');

    dsToggle.addEventListener('click', () => {
      dsModal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });

    const closeDsModal = () => {
      dsModal.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    if (dsClose) dsClose.addEventListener('click', closeDsModal);
    if (dsBackdrop) dsBackdrop.addEventListener('click', closeDsModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (dsModal && dsModal.classList.contains('is-open')) closeDsModal();
        if (workerModal && workerModal.classList.contains('is-open')) closeWorkerModal();
      }
    });
  } else if (dsToggle) {
    dsToggle.style.display = 'none';
  }
});
