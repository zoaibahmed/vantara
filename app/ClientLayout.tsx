'use client';

import React, { useState } from 'react';
import Header from '@/components/navigation/Header';
import Footer from '@/components/footer/Footer';
import WorkerModal from '@/components/forms/WorkerModal';
import DesignSystemInspector from '@/components/dev/DesignSystemInspector';
import CustomCursor from '@/components/animations/CustomCursor';
import SmoothScrollProvider from '@/components/animations/SmoothScrollProvider';
import Preloader from '@/components/animations/Preloader';
import PageTransition from '@/components/animations/PageTransition';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isWorkerModalOpen, setIsWorkerModalOpen] = useState(false);

  return (
    <SmoothScrollProvider>
      <Preloader />
      <CustomCursor />
      <Header onOpenWorkerModal={() => setIsWorkerModalOpen(true)} />
      <PageTransition>{children}</PageTransition>
      <Footer onOpenWorkerModal={() => setIsWorkerModalOpen(true)} />
      <WorkerModal
        isOpen={isWorkerModalOpen}
        onClose={() => setIsWorkerModalOpen(false)}
      />
      <DesignSystemInspector />
    </SmoothScrollProvider>
  );
}
