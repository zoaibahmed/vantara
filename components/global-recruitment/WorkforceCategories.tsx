'use client';

import { WORKFORCE_CATEGORIES } from '@/lib/recruitment/constants';

type SkillLevel = 'Skilled' | 'Semi-Skilled' | 'Entry-Level';
const levels: Record<string, SkillLevel> = {
  skilled: 'Skilled',
  'semi-skilled': 'Semi-Skilled',
  'entry-level': 'Entry-Level',
};

export default function WorkforceCategories({ onSelectCategory }: { onSelectCategory?: (level: SkillLevel) => void }) {
  function selectLevel(level: SkillLevel) {
    onSelectCategory?.(level);
    document.getElementById('cv-builder')?.scrollIntoView();
    document.querySelector<HTMLElement>('#cv-builder h2')?.focus({ preventScroll: true });
  }

  return (
    <section className="journal-section skill-ledger container-wide" id="categories-section">
      <div className="journal-heading">
        <span className="journal-label">Candidate pathways</span>
        <h2>Find your level.</h2>
        <p>See how experience and practical skills shape the kinds of roles you may want to explore.</p>
      </div>
      {WORKFORCE_CATEGORIES.map(category => (
        <article key={category.id}>
          <h3>{category.title}</h3>
          <div>
            <p>{category.description}</p>
            <button type="button" className="journal-text-link" onClick={() => selectLevel(levels[category.id])}>
              Choose {category.title} <span aria-hidden="true">↗</span>
            </button>
          </div>
          <div>
            <h4>Example roles</h4>
            <ul>{category.typicalRoles.map(role => <li key={role}>{role}</li>)}</ul>
            <h4>What may be assessed</h4>
            <ul>{category.criteria.map(criterion => <li key={criterion}>{criterion}</li>)}</ul>
          </div>
        </article>
      ))}
    </section>
  );
}
