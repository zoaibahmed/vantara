'use client';

import React, { useCallback, useState } from 'react';
import Header from '@/components/navigation/Header';
import Footer from '@/components/footer/Footer';
import WorkerModal from '@/components/forms/WorkerModal';
import DesignSystemInspector from '@/components/dev/DesignSystemInspector';
import SmoothScrollProvider from '@/components/animations/SmoothScrollProvider';
import PageTransition from '@/components/animations/PageTransition';
import { MotionConfig } from 'framer-motion';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isWorkerModalOpen, setIsWorkerModalOpen] = useState(false);

  const closeWorkerModal = useCallback(() => setIsWorkerModalOpen(false), []);

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <Header onOpenWorkerModal={() => setIsWorkerModalOpen(true)} />
        <PageTransition>{children}</PageTransition>
        <Footer onOpenWorkerModal={() => setIsWorkerModalOpen(true)} />
        <WorkerModal
          isOpen={isWorkerModalOpen}
          onClose={closeWorkerModal}
        />
        <DesignSystemInspector />
      </SmoothScrollProvider>
    </MotionConfig>
  );
}
