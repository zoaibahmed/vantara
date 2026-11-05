/**
 * Viaferra Global Recruitment - Domain Schema & Interfaces
 * A venture of Ascentra Global Ltd
 */

export interface EmploymentRecord {
  id: string;
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  responsibilities: string;
}

export interface LanguageRecord {
  id: string;
  language: string;
  proficiency: 'Basic' | 'Conversational' | 'Professional' | 'Fluent' | 'Native';
}

export interface CandidateRegistrationData {
  // Step 1: Personal Information
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  nationality?: string;
  currentOccupation?: string;

  // Step 2: Employment Preferences
  preferredIndustry: string;
  preferredRole: string;
  skillCategory: 'Skilled' | 'Semi-Skilled' | 'Entry-Level' | '';
  preferredDestination: string;
  additionalDestinations: string[];
  availability: string;

  // Step 3: Experience & Qualifications
  yearsOfExperience: string;
  isEntryLevelNoExperience: boolean;
  employmentHistory: EmploymentRecord[];
  skills: string[];
  highestEducation: string;
  certifications: string;
  languages: LanguageRecord[];

  // Step 4: Professional Readiness
  passportStatus: 'Yes' | 'No' | 'Prefer not to say' | '';
  drivingLicense: string;
  professionalNotes?: string;
  hasExistingCVFile?: boolean;
  consentGiven: boolean;

  // Anti-spam honeypot
  company_hp?: string;
}

export interface DestinationCardData {
  id: string;
  region: string;
  tagline: string;
  copy: string;
  industries: string[];
  image: string;
  alt: string;
  focusAreas: string;
}

export interface IndustryCardData {
  id: string;
  name: string;
  description: string;
  exampleRoles: string[];
  image: string;
  alt: string;
}

export interface WorkforceCategoryData {
  id: string;
  title: string;
  tagline: string;
  description: string;
  typicalRoles: string[];
  criteria: string[];
}

export interface ProcessStepData {
  stepNumber: string;
  stepLabel: string;
  title: string;
  description: string;
}

export interface FAQItemData {
  question: string;
  answer: string;
}
