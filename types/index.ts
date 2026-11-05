/**
 * Viaferra Workforce Solutions - TypeScript Domain Models
 * A venture of Ascentra Global Ltd
 */

export interface NavigationItem {
  label: string;
  href: string;
}

export interface WorkforceRole {
  title: string;
  category: 'hotel-operations' | 'food-beverage' | 'culinary' | 'events-operations';
  description: string;
  rolesList: string[];
  imageUrl: string;
  imageAlt: string;
}

export interface WorkforceMarket {
  country: string;
  region: string;
  specializations: string[];
  description: string;
  status: 'active' | 'expansion';
}

export interface DestinationMarket {
  destination: string;
  region: string;
  focusType: 'luxury-resort' | 'villa-operations' | 'eco-resort' | 'expansion-hub';
  description: string;
  status: 'focus' | 'target-expansion';
  imageUrl: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface TrustPillar {
  title: string;
  description: string;
}

export interface EmployerEnquiry {
  companyName: string;
  businessType: string;
  operatingCountry: string;
  companyWebsite?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  rolesRequired: string;
  workersCount: string;
  startDate: string;
  contractDuration: string;
  additionalNotes?: string;
}

export interface CandidateApplication {
  fullName: string;
  country: string;
  phone: string;
  email: string;
  profession: string;
  experienceYears: string;
  preferredDestination?: string;
  resumeFileName?: string;
}
