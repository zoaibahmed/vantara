import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/globals.css';
import ClientLayout from './ClientLayout';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap'
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Vantara Workforce Solutions | International Hospitality Workforce',
  description:
    'Vantara Workforce Solutions connects tourism businesses with international hospitality professionals and helps coordinate workforce recruitment and deployment. A venture of Ascentra Global Ltd.',
  openGraph: {
    title: 'Vantara Workforce Solutions | Your Hospitality Workforce. Coordinated.',
    description:
      'Connecting tourism businesses with hospitality professionals from established international workforce markets. Sourcing and deployment for island and resort destinations.',
    type: 'website'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
