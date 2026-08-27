'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMedia, setIsMedia] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only run on desktop/devices with fine pointer
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }
    
    setMounted(true);

    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cursorDotRef.current.style.opacity = '1';
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.opacity = '1';
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      if (
        target.closest('.hero-media-wrapper') ||
        target.closest('.page-hero-media') ||
        target.closest('.role-media-col')
      ) {
        setIsMedia(true);
        setIsHovered(false);
      } else if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('.btn') ||
        target.closest('.role-item') ||
        target.closest('.journey-step-item') ||
        target.closest('.corridor-market-card')
      ) {
        setIsHovered(true);
        setIsMedia(false);
      } else {
        setIsHovered(false);
        setIsMedia(false);
      }
    };

    const onMouseLeave = () => {
      if (cursorDotRef.current) cursorDotRef.current.style.opacity = '0';
      if (cursorRingRef.current) cursorRingRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      if (cursorDotRef.current) cursorDotRef.current.style.opacity = '1';
      if (cursorRingRef.current) cursorRingRef.current.style.opacity = '1';
    };

    // Smooth lerp loop for the trailing ring
    const renderLoop = () => {
      const ease = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    rafId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="custom-cursor-root" aria-hidden="true">
      {/* Outer Follower Ring / Halo */}
      <div
        ref={cursorRingRef}
        className={`luxury-cursor-ring ${isHovered ? 'is-hover' : ''} ${isMedia ? 'is-media' : ''} ${isClicking ? 'is-clicking' : ''}`}
      >
        {isMedia && <span className="cursor-explore-tag">EXPLORE</span>}
      </div>

      {/* Direct Precision Dot */}
      <div
        ref={cursorDotRef}
        className={`luxury-cursor-dot ${isHovered ? 'is-hover' : ''} ${isMedia ? 'is-media' : ''} ${isClicking ? 'is-clicking' : ''}`}
      />
    </div>
  );
}
