'use client';

import { useEffect, useState } from 'react';
import GlobalRecruitmentHero from './GlobalRecruitmentHero';
import WorkforceCategories from './WorkforceCategories';
import RecruitmentProcess from './RecruitmentProcess';
import CandidateCVBuilder from './CandidateCVBuilder';
import EmployerRecruitmentCTA from './EmployerRecruitmentCTA';
import RecruitmentFAQ from './RecruitmentFAQ';
import GlobalRecruitmentFinalCTA from './GlobalRecruitmentFinalCTA';
import IndustryExplorer from '@/components/journal/IndustryExplorer';
import RegionFocus from '@/components/journal/RegionFocus';
import { RECRUITMENT_INDUSTRIES, TARGET_REGIONS } from '@/lib/recruitment/constants';

export default function GlobalRecruitmentClientPage() {
  const [destination, setDestination] = useState('');
  const [industry, setIndustry] = useState('');
  const [category, setCategory] = useState<'Skilled' | 'Semi-Skilled' | 'Entry-Level' | ''>('');

  useEffect(() => {
    function applyPreferences() {
      const query = new URLSearchParams(window.location.search);
      const region = TARGET_REGIONS.find(item => item.id === query.get('region'));
      const sector = RECRUITMENT_INDUSTRIES.find(item => item.id === query.get('industry'));
      if (region) setDestination(region.region);
      if (sector) setIndustry(sector.name);
    }
    applyPreferences();
    window.addEventListener('popstate', applyPreferences);
    return () => window.removeEventListener('popstate', applyPreferences);
  }, []);

  function openBuilder() {
    document.getElementById('cv-builder')?.scrollIntoView();
    document.querySelector<HTMLElement>('#cv-builder h2')?.focus({ preventScroll: true });
  }

  return (
    <main id="main-content" className="page-global-recruitment">
      <GlobalRecruitmentHero />
      <nav className="container-wide global-section-nav" id="page-story" aria-label="On this page">
        <a href="#cv-builder">Build Your CV</a>
        <a href="#industries-section">Industries</a>
        <a href="#destinations-section">Regions</a>
        <a href="#employer-section">For employers</a>
      </nav>
      <CandidateCVBuilder preselectedDestination={destination} preselectedIndustry={industry} preselectedCategory={category} />
      <IndustryExplorer onSelect={name => { setIndustry(name); openBuilder(); }} />
      <RegionFocus onSelect={region => { setDestination(region); openBuilder(); }} />
      <WorkforceCategories onSelectCategory={setCategory} />
      <RecruitmentProcess />
      <EmployerRecruitmentCTA />
      <RecruitmentFAQ />
      <GlobalRecruitmentFinalCTA />
    </main>
  );
}
