'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
export default function PageTransition({ children }: { children: React.ReactNode }) {
 const pathname=usePathname();
 useEffect(()=>{if(!window.location.hash)window.scrollTo({top:0,behavior:'instant'});},[pathname]);
 return <div className="page-transition-wrapper">{children}</div>;
}