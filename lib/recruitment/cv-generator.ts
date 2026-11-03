/**
 * Vantara Global Recruitment - Client-Side CV PDF Generator
 * Powered by jsPDF for crisp vector typography, standard A4 layout, and exact pagination.
 * A venture of Ascentra Global Ltd
 */

import { jsPDF } from 'jspdf';
import { CandidateRegistrationData } from './schema';

export function generateCandidateCVPdf(candidate: CandidateRegistrationData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 16;
  const contentWidth = pageWidth - marginX * 2; // 178mm
  const bottomMargin = 22;

  let currentY = 18;

  // Color constants (RGB)
  const forestGreen: [number, number, number] = [24, 59, 43];
  const deepEvergreen: [number, number, number] = [14, 39, 27];
  const charcoalText: [number, number, number] = [25, 35, 30];
  const slateText: [number, number, number] = [72, 87, 79];
  const mutedText: [number, number, number] = [113, 129, 120];
  const dividerLine: [number, number, number] = [226, 219, 208];
  const champagneBg: [number, number, number] = [247, 243, 234];

  // Helper: Check page overflow and add new page if needed
  const ensureSpace = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - bottomMargin) {
      doc.addPage();
      currentY = 20;
      // Draw subtle top running header on subsequent pages
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...mutedText);
      doc.text(`${candidate.fullName.toUpperCase()} — PROFESSIONAL CV`, marginX, 12);
      doc.text('VANTARA RECRUITMENT', pageWidth - marginX, 12, { align: 'right' });
      doc.setDrawColor(...dividerLine);
      doc.setLineWidth(0.2);
      doc.line(marginX, 14, pageWidth - marginX, 14);
    }
  };

  // Helper: Section Header
  const renderSectionHeading = (title: string) => {
    ensureSpace(14);
    currentY += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...forestGreen);
    doc.text(title.toUpperCase(), marginX, currentY);

    // Accent line next to heading
    currentY += 2;
    doc.setDrawColor(...forestGreen);
    doc.setLineWidth(0.4);
    doc.line(marginX, currentY, marginX + 28, currentY);
    doc.setDrawColor(...dividerLine);
    doc.setLineWidth(0.2);
    doc.line(marginX + 28, currentY, pageWidth - marginX, currentY);
    currentY += 5;
  };

  // =========================================================================
  // 1. TOP HEADER & BRAND LOCKUP
  // =========================================================================
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...deepEvergreen);
  const candidateName = candidate.fullName.trim() || 'Candidate Name';
  doc.text(candidateName, marginX, currentY);

  // Vantara watermark logo top right
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...forestGreen);
  doc.text('VANTARA', pageWidth - marginX, currentY - 2, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...mutedText);
  doc.text('Global Recruitment Gateway', pageWidth - marginX, currentY + 2, { align: 'right' });

  currentY += 6;

  // Professional Title / Headline
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(...slateText);
  const headline = candidate.preferredRole
    ? `${candidate.preferredRole} • ${candidate.preferredIndustry || 'International Workforce'}`
    : candidate.currentOccupation || 'International Workforce Candidate';
  doc.text(headline, marginX, currentY);

  currentY += 5;

  // Solid Brand Divider
  doc.setDrawColor(...forestGreen);
  doc.setLineWidth(0.8);
  doc.line(marginX, currentY, pageWidth - marginX, currentY);
  currentY += 4.5;

  // =========================================================================
  // 2. CONTACT & LOCATION STRIP
  // =========================================================================
  doc.setFillColor(...champagneBg);
  doc.roundedRect(marginX, currentY - 2.5, contentWidth, 12, 1.5, 1.5, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...charcoalText);

  const contactItems: string[] = [];
  if (candidate.email) contactItems.push(`Email: ${candidate.email}`);
  if (candidate.phone) contactItems.push(`Tel/WhatsApp: ${candidate.phone}`);
  const location = [candidate.city, candidate.country].filter(Boolean).join(', ');
  if (location) contactItems.push(`Location: ${location}`);
  if (candidate.nationality) contactItems.push(`Nationality: ${candidate.nationality}`);

  const contactText = contactItems.join('   |   ');
  const splitContact = doc.splitTextToSize(contactText, contentWidth - 6);
  doc.text(splitContact, marginX + 3, currentY + 2.5);

  currentY += 15;

  // =========================================================================
  // 3. PROFESSIONAL SUMMARY
  // =========================================================================
  renderSectionHeading('Professional Summary');

  let summaryText = '';
  if (candidate.professionalNotes && candidate.professionalNotes.trim().length > 10) {
    summaryText = candidate.professionalNotes.trim();
  } else {
    const skillTier = candidate.skillCategory || 'skilled';
    const role = candidate.preferredRole || 'operational candidate';
    const industry = candidate.preferredIndustry || 'essential industry';
    const exp = candidate.isEntryLevelNoExperience
      ? 'entry-level background with high motivation and readiness for structured workplace training'
      : `${candidate.yearsOfExperience} of practical occupational experience`;

    summaryText = `Dedicated ${skillTier.toLowerCase()} professional specializing in ${role} within the ${industry} sector. Demonstrates a solid ${exp}, an adaptable work ethic, and adherence to international occupational standards. Actively pursuing placement opportunities across ${candidate.preferredDestination || 'international markets'} where verified skills and disciplined performance directly support operational goals.`;
  }

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...charcoalText);
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
  ensureSpace(summaryLines.length * 4.5);
  doc.text(summaryLines, marginX, currentY);
  currentY += summaryLines.length * 4.5 + 4;

  // =========================================================================
  // 4. INTERNATIONAL RECRUITMENT PREFERENCES
  // =========================================================================
  renderSectionHeading('International Recruitment Preferences');

  ensureSpace(22);
  const colW = contentWidth / 2;

  // Left Column
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...slateText);
  doc.text('Primary Target Region:', marginX, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...charcoalText);
  doc.text(candidate.preferredDestination || 'Flexible / Open', marginX + 38, currentY);

  currentY += 5;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...slateText);
  doc.text('Additional Regions:', marginX, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...charcoalText);
  const addRegions = candidate.additionalDestinations && candidate.additionalDestinations.length > 0
    ? candidate.additionalDestinations.join(', ')
    : 'None specified';
  doc.text(addRegions, marginX + 38, currentY);

  currentY += 5;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...slateText);
  doc.text('Industry Focus:', marginX, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...charcoalText);
  doc.text(candidate.preferredIndustry || 'Open', marginX + 38, currentY);

  // Right Column (same Y block)
  let rightY = currentY - 10;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...slateText);
  doc.text('Skill Category:', marginX + colW, rightY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...charcoalText);
  doc.text(candidate.skillCategory || 'Unspecified', marginX + colW + 32, rightY);

  rightY += 5;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...slateText);
  doc.text('Target Role:', marginX + colW, rightY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...charcoalText);
  doc.text(candidate.preferredRole || 'Open', marginX + colW + 32, rightY);

  rightY += 5;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...slateText);
  doc.text('Deployment Availability:', marginX + colW, rightY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...charcoalText);
  doc.text(candidate.availability || 'Within 1 Month', marginX + colW + 38, rightY);

  currentY += 6;

  // =========================================================================
  // 5. EMPLOYMENT HISTORY / WORK EXPERIENCE
  // =========================================================================
  renderSectionHeading('Employment & Practical Experience');

  if (candidate.isEntryLevelNoExperience || candidate.employmentHistory.length === 0) {
    ensureSpace(14);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(...slateText);
    doc.text(
      'Entry-Level Candidate — Pursuing foundational operational roles. Ready for employer task onboarding and practical safety training.',
      marginX,
      currentY
    );
    currentY += 8;
  } else {
    candidate.employmentHistory.forEach((job, index) => {
      if (!job.jobTitle && !job.company) return;

      const title = job.jobTitle || 'Position';
      const company = job.company || 'Employer';
      const dates = `${job.startDate || 'N/A'} – ${job.isCurrent ? 'Present' : job.endDate || 'N/A'}`;

      ensureSpace(20);

      // Job Title and Date
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(...deepEvergreen);
      doc.text(title, marginX, currentY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...mutedText);
      doc.text(dates, pageWidth - marginX, currentY, { align: 'right' });

      currentY += 4.5;

      // Company name
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(...forestGreen);
      doc.text(company, marginX, currentY);

      currentY += 4;

      // Responsibilities
      if (job.responsibilities && job.responsibilities.trim()) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...charcoalText);
        const respLines = doc.splitTextToSize(job.responsibilities.trim(), contentWidth - 4);
        ensureSpace(respLines.length * 4);
        doc.text(respLines, marginX + 3, currentY);
        currentY += respLines.length * 4 + 2;
      }

      currentY += 3;
    });
  }

  // =========================================================================
  // 6. EDUCATION & CERTIFICATIONS
  // =========================================================================
  renderSectionHeading('Education & Qualifications');

  ensureSpace(16);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...deepEvergreen);
  doc.text('Highest Level of Education:', marginX, currentY);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...charcoalText);
  doc.text(candidate.highestEducation || 'High School Diploma', marginX + 46, currentY);
  currentY += 5;

  if (candidate.certifications && candidate.certifications.trim()) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...deepEvergreen);
    doc.text('Professional Certifications:', marginX, currentY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...charcoalText);
    const certLines = doc.splitTextToSize(candidate.certifications.trim(), contentWidth - 48);
    doc.text(certLines, marginX + 46, currentY);
    currentY += certLines.length * 4 + 4;
  } else {
    currentY += 3;
  }

  // =========================================================================
  // 7. KEY PRACTICAL SKILLS
  // =========================================================================
  if (candidate.skills && candidate.skills.length > 0) {
    renderSectionHeading('Core Skills & Practical Competencies');
    ensureSpace(12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...charcoalText);

    const skillsString = candidate.skills.join('  •  ');
    const skillLines = doc.splitTextToSize(skillsString, contentWidth);
    ensureSpace(skillLines.length * 4.5);
    doc.text(skillLines, marginX, currentY);
    currentY += skillLines.length * 4.5 + 4;
  }

  // =========================================================================
  // 8. LANGUAGES
  // =========================================================================
  if (candidate.languages && candidate.languages.length > 0) {
    renderSectionHeading('Language Proficiency');
    ensureSpace(12);

    const langText = candidate.languages
      .filter((l) => l.language.trim())
      .map((l) => `${l.language} (${l.proficiency})`)
      .join('   |   ');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...charcoalText);
    const langLines = doc.splitTextToSize(langText, contentWidth);
    doc.text(langLines, marginX, currentY);
    currentY += langLines.length * 4.5 + 4;
  }

  // =========================================================================
  // 9. PROFESSIONAL READINESS
  // =========================================================================
  renderSectionHeading('Professional Readiness');
  ensureSpace(16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...slateText);
  doc.text('Valid Passport Available:', marginX, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...charcoalText);
  doc.text(candidate.passportStatus || 'Not declared', marginX + 44, currentY);

  currentY += 5;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...slateText);
  doc.text('Driving Licence Category:', marginX, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...charcoalText);
  doc.text(candidate.drivingLicense || 'None', marginX + 44, currentY);

  currentY += 8;

  // =========================================================================
  // 10. RUNNING FOOTER ON ALL PAGES
  // =========================================================================
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(...dividerLine);
    doc.setLineWidth(0.2);
    doc.line(marginX, pageHeight - 12, pageWidth - marginX, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...mutedText);
    doc.text(
      'Confidential Candidate Profile • Vantara Global Recruitment • Ascentra Global Ltd',
      marginX,
      pageHeight - 8
    );
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - marginX, pageHeight - 8, {
      align: 'right'
    });
  }

  // Save the PDF directly to candidate's browser session
  const safeName = candidate.fullName.trim().replace(/[^a-zA-Z0-9]/g, '_') || 'Candidate';
  doc.save(`Vantara_CV_${safeName}.pdf`);
}
