/**
 * Vantara Global Recruitment - Constants & Reference Content
 * A venture of Ascentra Global Ltd
 */

import {
  DestinationCardData,
  IndustryCardData,
  WorkforceCategoryData,
  ProcessStepData,
  FAQItemData,
  CandidateRegistrationData
} from './schema';

export const TARGET_REGIONS: DestinationCardData[] = [
  {
    id: 'europe',
    region: 'Europe',
    tagline: 'Industrial, Logistics & Hospitality Hubs',
    copy: 'Explore potential opportunities across industrial, construction, logistics and hospitality sectors.',
    industries: ['Construction & Infrastructure', 'Manufacturing & Factories', 'Logistics & Warehousing', 'Hospitality & Tourism'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    alt: 'Modern European commercial architecture and urban infrastructure',
    focusAreas: 'Western & Central European production centers, Nordic logistics corridors, and Mediterranean hospitality operations.'
  },
  {
    id: 'latin-america',
    region: 'Latin America',
    tagline: 'Manufacturing, Energy & Agribusiness Corridors',
    copy: 'Register your interest in international workforce opportunities across a diverse range of industries.',
    industries: ['Manufacturing & Factories', 'Agriculture & General Services', 'Construction & Infrastructure', 'Technical & Skilled Trades'],
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
    alt: 'Vibrant Latin American metropolitan infrastructure and logistics network',
    focusAreas: 'Industrial assembly corridors, civil engineering projects, commercial agriculture, and regional transport infrastructure.'
  },
  {
    id: 'australia',
    region: 'Australia',
    tagline: 'Skilled Trades, Civil Infrastructure & Primary Production',
    copy: 'Submit your professional profile for consideration where suitable employer requirements and eligibility conditions apply.',
    industries: ['Technical & Skilled Trades', 'Construction & Infrastructure', 'Agriculture & General Services', 'Hospitality & Tourism'],
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Australian architectural skyline and coastal civil infrastructure',
    focusAreas: 'Licensed electrical and mechanical trades, civil construction, commercial agribusiness, and luxury resort hospitality.'
  },
  {
    id: 'new-zealand',
    region: 'New Zealand',
    tagline: 'Construction Trades, Primary Industries & Tourism',
    copy: 'Connect your qualifications and experience with potential recruitment opportunities based on relevant employer demand.',
    industries: ['Construction & Infrastructure', 'Agriculture & General Services', 'Hospitality & Tourism', 'Technical & Skilled Trades'],
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=80',
    alt: 'New Zealand alpine landscape and sustainable infrastructure',
    focusAreas: 'Specialist construction trades, viticulture and dairy processing, electromechanical maintenance, and tourism operations.'
  }
];

export const RECRUITMENT_INDUSTRIES: IndustryCardData[] = [
  {
    id: 'construction',
    name: 'Construction & Infrastructure',
    description: 'Modern commercial, civil, and residential projects demanding technical craft, precision, and strict safety adherence.',
    exampleRoles: ['Electricians', 'Plumbers', 'Welders', 'Masons', 'Carpenters', 'General Workers'],
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=1000&q=80',
    alt: 'Professional construction team on modern civil engineering development'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Factories',
    description: 'High-precision assembly, food & beverage processing, industrial packaging lines, and component fabrication.',
    exampleRoles: ['Production Workers', 'Machine Operators', 'Packaging Assistants', 'Factory Technicians'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    alt: 'Advanced industrial production facility and assembly line operations'
  },
  {
    id: 'logistics',
    name: 'Logistics & Warehousing',
    description: 'Modern fulfillment facilities, cross-dock terminals, cold-chain distribution, and freight management.',
    exampleRoles: ['Warehouse Workers', 'Forklift Operators', 'Inventory Assistants', 'Logistics Personnel'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    alt: 'Automated warehouse distribution center and logistics management'
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Tourism',
    description: 'Luxury hotels, island resorts, commercial kitchens, beachfront dining, and high-touch guest relations.',
    exampleRoles: ['Chefs & Cooks', 'Housekeeping Workers', 'Restaurant Staff', 'Maintenance Stewards'],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    alt: 'Professional culinary and hospitality service team in luxury venue'
  },
  {
    id: 'agriculture',
    name: 'Agriculture & General Services',
    description: 'Commercial greenhouse cultivation, harvesting operations, livestock support, and property groundskeeping.',
    exampleRoles: ['Farm Workers', 'Agricultural Support Staff', 'Harvesting Staff', 'Grounds Attendants'],
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80',
    alt: 'Commercial sustainable agricultural operations and harvesting'
  },
  {
    id: 'technical',
    name: 'Technical & Skilled Trades',
    description: 'Industrial maintenance, electromechanical systems, climate control installations, and automotive care.',
    exampleRoles: ['HVAC Technicians', 'Mechanics', 'Electrical Technicians', 'Industrial Maintenance Workers'],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80',
    alt: 'Certified electrical and technical maintenance specialist at work'
  }
];

export const WORKFORCE_CATEGORIES: WorkforceCategoryData[] = [
  {
    id: 'skilled',
    title: 'Skilled Professionals',
    tagline: 'Accredited Qualifications & Verified Trade Mastery',
    description: 'For candidates with recognized tertiary qualifications, certified master trades, professional licenses, or extensive supervisory expertise in their discipline.',
    typicalRoles: [
      'Certified Welders & Fabricators',
      'Licensed Electricians & Plumbers',
      'HVAC & Electromechanical Engineers',
      'Executive & Sous Chefs',
      'Industrial Maintenance Supervisors'
    ],
    criteria: [
      'Formal trade certificate, diploma, or degree',
      'Minimum 3+ years of documented trade experience',
      'Proven ability to interpret technical drawings and standards'
    ]
  },
  {
    id: 'semi-skilled',
    title: 'Semi-Skilled Workers',
    tagline: 'Practical Occupational Competency & Job Training',
    description: 'For candidates with proven practical occupational experience, demonstrated trade competence, or vocational training ready for targeted employer integration.',
    typicalRoles: [
      'Production Line & Machine Operators',
      'Forklift Drivers & Warehouse Stewards',
      'Line Cooks & Prep Kitchen Assistants',
      'Site Carpenters & Masonry Assistants',
      'Commercial Housekeeping Specialists'
    ],
    criteria: [
      'Demonstrated practical on-the-job competency',
      '1 to 3 years of verified industry experience',
      'Safety awareness and disciplined execution'
    ]
  },
  {
    id: 'entry-level',
    title: 'Entry-Level Workers',
    tagline: 'Motivated Candidates Ready for Operational Onboarding',
    description: 'For driven candidates pursuing foundational operational roles that do not mandate prior specialist qualifications or extensive industry backgrounds.',
    typicalRoles: [
      'General Construction & Site Assistants',
      'Warehouse Packers & Material Handlers',
      'Kitchen Porters & Food Prep Helpers',
      'Agricultural & Harvesting Workers',
      'Facility & Property Maintenance Helpers'
    ],
    criteria: [
      'High work ethic, physical stamina, and punctuality',
      'Full readiness for employer onboarding and task training',
      'No mandatory previous employment history required'
    ]
  }
];

export const RECRUITMENT_PROCESS_STEPS: ProcessStepData[] = [
  {
    stepNumber: '01',
    stepLabel: 'STEP 01',
    title: 'Choose Industry & Destination',
    description: 'Select your preferred professional industry and indicate your target deployment regions (Europe, Latin America, Australia, or New Zealand).'
  },
  {
    stepNumber: '02',
    stepLabel: 'STEP 02',
    title: 'Enter Personal & Work Details',
    description: 'Provide your contact details, education, practical skills, and employment history. Entry-level candidates can apply without prior experience.'
  },
  {
    stepNumber: '03',
    stepLabel: 'STEP 03',
    title: 'Build & Review Your CV',
    description: 'Our system automatically formats a structured, international-standard professional CV. You can review and download a clean PDF copy for your own records.'
  },
  {
    stepNumber: '04',
    stepLabel: 'STEP 04',
    title: 'Submit to Vantara Recruitment',
    description: 'Securely submit your verified profile to the Vantara international recruitment database. Your information is protected under UK GDPR standards.'
  },
  {
    stepNumber: '05',
    stepLabel: 'STEP 05',
    title: 'Review & Opportunity Matching',
    description: 'The recruitment team evaluates incoming profiles and contacts potentially suitable candidates directly when matching employer requirements arise.'
  }
];

export const RECRUITMENT_FAQS: FAQItemData[] = [
  {
    question: 'What is Vantara Global Recruitment?',
    answer: 'Vantara Global Recruitment is an international workforce coordination service operated under Ascentra Global Ltd. We connect employers in key global markets with vetted candidates across skilled, semi-skilled, and entry-level positions in essential industries.'
  },
  {
    question: 'Who can register?',
    answer: 'Any individual over the age of majority seeking lawful international employment opportunities may register. We welcome skilled certified professionals, experienced semi-skilled workers, and motivated entry-level candidates looking to begin an international career.'
  },
  {
    question: 'Can I register without previous experience?',
    answer: 'Yes. Our platform includes a dedicated Entry-Level pathway. If you do not have formal previous employment history, you can highlight your education, foundational skills, language abilities, and willingness to learn.'
  },
  {
    question: 'Which destinations can I select?',
    answer: 'You may register your interest for Europe, Latin America, Australia, and New Zealand. You can select a primary target region as well as additional acceptable destinations. Deployment depends on confirmed employer requirements and lawful immigration clearance.'
  },
  {
    question: 'Can I register for more than one industry?',
    answer: 'You will select your primary preferred industry (e.g. Construction, Logistics, Manufacturing, Hospitality, Agriculture, or Technical Trades) and specific role. You can note secondary experience or cross-trade capabilities in the professional notes section.'
  },
  {
    question: 'Do I need to upload an existing CV?',
    answer: 'No, an existing CV is optional. Our built-in CV Builder automatically generates a comprehensive, internationally styled professional CV from the information you enter into the registration steps.'
  },
  {
    question: 'How is my professional CV generated?',
    answer: 'As you complete the registration steps, our engine formats your details into an internationally structured CV document with clean typography, contact information, work history, skill taxonomy, and recruitment preferences. You can preview it live and download an official PDF.'
  },
  {
    question: 'What happens after submission?',
    answer: 'Your submission is logged in our recruitment database and routed to our international coordination team. When an employer requirement matching your skill category and destination preference is confirmed, a coordinator will reach out to schedule an interview.'
  },
  {
    question: 'Does registering guarantee employment?',
    answer: 'No. Registering creates your professional candidate profile in our recruitment database. Placements depend entirely on confirmed employer job orders, candidate suitability, successful employer interviews, and lawful visa/work permit issuance.'
  },
  {
    question: 'How will my personal information be used?',
    answer: 'Your data is handled securely under strict data protection principles (including UK GDPR). It is used solely to evaluate your profile for relevant employment opportunities and to coordinate recruitment with authorized employers. We never sell your data, and we charge zero recruitment fees to candidates.'
  }
];

export const INITIAL_CANDIDATE_DATA: CandidateRegistrationData = {
  fullName: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  nationality: '',
  currentOccupation: '',
  preferredIndustry: '',
  preferredRole: '',
  skillCategory: '',
  preferredDestination: '',
  additionalDestinations: [],
  availability: '1 Month',
  yearsOfExperience: '1-2 years',
  isEntryLevelNoExperience: false,
  employmentHistory: [
    {
      id: 'job-1',
      company: '',
      jobTitle: '',
      startDate: '',
      endDate: '',
      isCurrent: true,
      responsibilities: ''
    }
  ],
  skills: [],
  highestEducation: 'High School Diploma',
  certifications: '',
  languages: [
    {
      id: 'lang-1',
      language: 'English',
      proficiency: 'Conversational'
    }
  ],
  passportStatus: '',
  drivingLicense: 'None',
  professionalNotes: '',
  hasExistingCVFile: false,
  consentGiven: false,
  company_hp: ''
};

export const COMMON_COUNTRIES = [
  'Albania', 'Algeria', 'Argentina', 'Armenia', 'Australia', 'Azerbaijan',
  'Bahrain', 'Bangladesh', 'Belarus', 'Belize', 'Bolivia', 'Bosnia and Herzegovina',
  'Brazil', 'Bulgaria', 'Cambodia', 'Canada', 'Chile', 'Colombia',
  'Costa Rica', 'Croatia', 'Cyprus', 'Czech Republic', 'Dominican Republic',
  'Ecuador', 'Egypt', 'Estonia', 'Fiji', 'Georgia', 'Ghana', 'Greece',
  'Guatemala', 'Guyana', 'Honduras', 'Hungary', 'India', 'Indonesia',
  'Ireland', 'Italy', 'Jamaica', 'Jordan', 'Kazakhstan', 'Kenya',
  'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Latvia', 'Lebanon', 'Lithuania',
  'Malaysia', 'Maldives', 'Malta', 'Mauritius', 'Mexico', 'Moldova',
  'Montenegro', 'Morocco', 'Nepal', 'New Zealand', 'Nicaragua', 'Nigeria',
  'North Macedonia', 'Oman', 'Pakistan', 'Panama', 'Paraguay', 'Peru',
  'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Saudi Arabia',
  'Serbia', 'Seychelles', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa',
  'Spain', 'Sri Lanka', 'Suriname', 'Tajikistan', 'Tanzania', 'Thailand',
  'Tunisia', 'Turkey', 'Uganda', 'Ukraine', 'United Arab Emirates',
  'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vietnam',
  'Zambia', 'Zimbabwe'
];
