import type { Metadata } from 'next';
import GlobalRecruitmentClientPage from '@/components/global-recruitment/GlobalRecruitmentClientPage';

export const metadata: Metadata = {
  title: 'Global Recruitment | International Workforce Opportunities | Vantara',
  description:
    'Register your professional CV and explore international recruitment opportunities across Europe, Latin America, Australia and New Zealand with Vantara Workforce Solutions.',
  openGraph: {
    title: 'Global Recruitment | Vantara Workforce Solutions',
    description:
      'Connecting skilled, semi-skilled and entry-level workers with international recruitment opportunities across essential industries.'
  }
};

export default function GlobalRecruitmentPage() {
  return <GlobalRecruitmentClientPage />;
}
