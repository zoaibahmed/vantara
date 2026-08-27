/**
 * Animation & Motion Principles
 * Vantara Workforce Solutions
 * - Slow, cinematic, intentional
 * - Respects prefers-reduced-motion
 */

export function initAnimations() {
  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    const revealElements = document.querySelectorAll('.reveal-fade');
    revealElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  // Intersection Observer for graceful reveals
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal-fade');
  revealElements.forEach(el => revealObserver.observe(el));
}
