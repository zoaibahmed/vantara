import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/globals.css';
import ClientLayout from './ClientLayout';
import { getSiteUrl } from '@/lib/site-url';

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
  metadataBase: getSiteUrl(),
  applicationName: 'Viaferra Workforce Solutions',
  title: 'Viaferra | Global Recruitment & International Workforce Solutions',
  description:
    'Global recruitment and international workforce coordination across essential industries. Skilled, semi-skilled and entry-level talent. A venture of Ascentra Global Ltd.',
  openGraph: {
    title: 'Viaferra | Global Recruitment & International Workforce Solutions',
    description:
      'Connecting employers and international talent across essential industries. Hospitality workforce solutions is our specialist service.',
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
