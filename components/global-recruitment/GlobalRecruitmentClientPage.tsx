'use client';

import React, { useState } from 'react';
import GlobalRecruitmentHero from '@/components/global-recruitment/GlobalRecruitmentHero';
import GlobalRecruitmentIntro from '@/components/global-recruitment/GlobalRecruitmentIntro';
import DestinationCards from '@/components/global-recruitment/DestinationCards';
import RecruitmentIndustries from '@/components/global-recruitment/RecruitmentIndustries';
import WorkforceCategories from '@/components/global-recruitment/WorkforceCategories';
import RecruitmentProcess from '@/components/global-recruitment/RecruitmentProcess';
import CandidateCVBuilder from '@/components/global-recruitment/CandidateCVBuilder';
import EmployerRecruitmentCTA from '@/components/global-recruitment/EmployerRecruitmentCTA';
import RecruitmentFAQ from '@/components/global-recruitment/RecruitmentFAQ';
import GlobalRecruitmentFinalCTA from '@/components/global-recruitment/GlobalRecruitmentFinalCTA';

export default function GlobalRecruitmentClientPage() {
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<'Skilled' | 'Semi-Skilled' | 'Entry-Level' | ''>('');

  return (
    <main id="main-content">
      {/* 01: Hero */}
      <GlobalRecruitmentHero />

      {/* 02: Introduction */}
      <GlobalRecruitmentIntro />

      {/* 03: Destinations with preselection trigger */}
      <DestinationCards onSelectDestination={(region) => setSelectedDestination(region)} />

      {/* 04: Industries We Serve with preselection trigger */}
      <RecruitmentIndustries onSelectIndustry={(industry) => setSelectedIndustry(industry)} />

      {/* 05: Workforce Categories with preselection trigger */}
      <WorkforceCategories onSelectCategory={(cat) => setSelectedCategory(cat)} />

      {/* 06: How It Works Timeline */}
      <RecruitmentProcess />

      {/* 07: Build Your Professional CV (Centerpiece) */}
      <CandidateCVBuilder
        preselectedDestination={selectedDestination}
        preselectedIndustry={selectedIndustry}
        preselectedCategory={selectedCategory}
      />

      {/* 08: Employer Section */}
      <EmployerRecruitmentCTA />

      {/* 09: FAQ Section */}
      <RecruitmentFAQ />

      {/* 10: Final CTA */}
      <GlobalRecruitmentFinalCTA />
    </main>
  );
}
