'use client';

import React from 'react';
import HeroScene from '@/components/scenes/HeroScene';
import GlobalMovementScene from '@/components/scenes/GlobalMovementScene';
import OperationalRealityScene from '@/components/scenes/OperationalRealityScene';
import EmployerStatementScene from '@/components/scenes/EmployerStatementScene';
import HospitalitySpacesScene from '@/components/scenes/HospitalitySpacesScene';
import CoordinationScene from '@/components/scenes/CoordinationScene';
import FinalConversionScene from '@/components/scenes/FinalConversionScene';

export default function HomePage() {
  return (
    <main id="main-content">
      {/* Scene 1: Opening Immersion */}
      <HeroScene />

      {/* Scene 2: Global Workforce Movement & Corridor Flow */}
      <GlobalMovementScene />

      {/* Scene 3: Operational Reality & Pipeline Stream */}
      <OperationalRealityScene />

      {/* Scene 4: Climax Statement (You Run The Operation. We Help With The Workforce.) */}
      <EmployerStatementScene />

      {/* Scene 5: Hospitality Roles in Real Spaces */}
      <HospitalitySpacesScene />

      {/* Scene 6: 01-05 Journey & Transparent Cost Expectations */}
      <CoordinationScene />

      {/* Scene 7: Final Conversion & Employer Consultation Engine */}
      <FinalConversionScene />
    </main>
  );
}
