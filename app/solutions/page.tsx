import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import DepartmentJournal from '@/components/inner/DepartmentJournal';
export const metadata: Metadata = { title: 'Hospitality Workforce Solutions | Viaferra', description: 'Specialist international workforce coordination for hotel operations, food and beverage, culinary teams, events and resorts. A Viaferra Global Recruitment service.', openGraph: { title: 'Hospitality Workforce Solutions | Viaferra', description: 'Specialist people for the details that define hospitality.' } };
const solutionsData = [
  {
    id: 'hotel-operations',
    space: 'Rooms & Front of House',
    title: 'Hotel & Resort Operations',
    tagline: 'Pristine Presentation & High-Touch Guest Reception',
    desc: 'From arrival concierge to pristine villa maintenance, our hotel operational talent is selected for professional discretion, grooming, and high-touch customer etiquette.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
    alt: 'Hotel guest room interior',
    action: 'Suite Care & Arrival Readiness',
    roles: [
      { name: 'Executive & Floor Housekeepers', desc: 'Detail-driven suite cleaning, turn-down standards, and inventory management.' },
      { name: 'Front Desk & Guest Relations', desc: 'Multilingual reception, check-in hospitality, and attentive VIP guest handling.' },
      { name: 'Concierge & Porters', desc: 'Luggage assistance, excursion coordination, and warm arrival greetings.' },
      { name: 'Villa & Butler Attendants', desc: 'Dedicated private villa services for high-end luxury resort properties.' }
    ],
    isReversed: false
  },
  {
    id: 'food-and-beverage',
    space: 'Dining & Service Excellence',
    title: 'Food & Beverage Service',
    tagline: 'Intuitive Table Service, Mixology & Banquet Coordination',
    desc: 'Specialized F&B service staff equipped to handle high-turnover beachfront venues, fine-dining restaurants, cocktail lounges, and intimate private villa dining.',
    image: '/images/custom/restaurant-terrace.jpg',
    alt: 'Restaurant terrace arranged for service',
    action: 'Fine Dining & Guest Table Service',
    roles: [
      { name: 'Fine Dining Waiters & Captains', desc: 'Formal silver service, menu presentation, and wine service etiquette.' },
      { name: 'Bartenders & Mixologists', desc: 'Craft cocktail preparation, beverage inventory, and ambient bar management.' },
      { name: 'Baristas & Cafe Specialists', desc: 'Specialty coffee brewing, breakfast buffet flow, and lounge service.' },
      { name: 'F&B Supervisors & Head Waiters', desc: 'Shift leadership, table rotation oversight, and service timing control.' }
    ],
    isReversed: true
  },
  {
    id: 'culinary-arts',
    space: 'Kitchen & Culinary Arts',
    title: 'Culinary & Back of House',
    tagline: 'High-Pace Hot Line Execution & Strict Hygiene Compliance',
    desc: 'Trained culinary professionals ready to integrate into hotel kitchens, banquet production lines, and specialty restaurants with rigorous hygiene standards.',
    image: '/images/custom/kitchen-brigade.jpg',
    alt: 'Chef working at a commercial kitchen station',
    action: 'Culinary Brigade Precision',
    roles: [
      { name: 'Sous Chefs & Chefs de Partie', desc: 'Section leadership, hot-line station mastery, and gourmet recipe execution.' },
      { name: 'Commis Chefs & Line Cooks', desc: 'Mise en place, butchery, vegetable preparation, and fast line support.' },
      { name: 'Pastry & Bakery Specialists', desc: 'Artisanal bread baking, delicate desserts, and banquet pastry production.' },
      { name: 'Stewarding & Sanitation Staff', desc: 'Role-specific food hygiene procedures, deep ware-washing, and kitchen sanitization.' }
    ],
    isReversed: false
  },
  {
    id: 'events-and-resorts',
    space: 'Guest Experiences & Banqueting',
    title: 'Events & Resort Operations',
    tagline: 'Dynamic Staffing for Destination Weddings, Galas & Retreats',
    desc: 'Flexible operational personnel to orchestrate destination weddings, seasonal corporate summits, and resort recreational experiences.',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1000&q=80',
    alt: 'Hospitality event setting',
    action: 'Event Coordination & Guest Experiences',
    roles: [
      { name: 'Banquet Servers & Set-up Crews', desc: 'Rapid ballroom transformation, buffet staging, and large-scale event flow.' },
      { name: 'Recreation & Pool Attendants', desc: 'Towel cabana management, poolside refreshment, and watersports support.' },
      { name: 'Event Hospitality Supervisors', desc: 'Direct timeline execution for weddings, galas, and VIP corporate retreats.' },
      { name: 'Logistics & Facility Support', desc: 'Property setup, lighting assistance, and seasonal operational surge support.' }
    ],
    isReversed: true
  }
];

const standards = [
 ['Communication','Discuss the languages and communication level required for each role and the appropriate assessment approach.'],
 ['Practical capability','Agree relevant skills reviews, interviews or practical trade assessments with the employer.'],
 ['Food safety & credentials','Identify the qualifications, food safety training and credentials required for the specific position and destination.'],
 ['Property readiness','Clarify service standards, guest privacy, accommodation, onboarding and the practical realities of the workplace.']
];
export default function SolutionsPage(){return <main id="main-content" className="inner-page hospitality-journal"><header className="hospitality-opening"><div className="container-wide"><span className="inner-kicker">A specialist Viaferra service</span><h1>Hospitality,<br/>through people.</h1><div className="hospitality-opening-copy"><p>From the first welcome to the final service. Specialist workforce coordination for the people who shape the guest experience.</p><div className="inner-actions"><Link href="/contact" className="btn btn-primary">Discuss your property ↗</Link><Link href="/global-recruitment" className="collection-secondary">Explore Global Recruitment</Link></div></div><figure><Image src="/images/custom/culinary-service.jpg" alt="Chef carefully finishing a plated dish" fill priority sizes="100vw"/><figcaption>Specialist attention. Every department.</figcaption></figure></div></header><section id="page-story" className="inner-section container-wide"><div className="inner-section-heading"><span className="inner-kicker">Departmental expertise</span><h2>Every role contributes<br/>to the experience.</h2><p>Explore the operational requirements of hotels, resorts, restaurants and events. Candidate suitability is considered against your property’s brief.</p></div><DepartmentJournal departments={solutionsData}/></section><section className="inner-section inner-sand"><div className="container-wide"><div className="inner-section-heading"><span className="inner-kicker">Building the right brief</span><h2>Readiness starts<br/>with clarity.</h2><p>Assessment and preparation requirements depend on the role, employer and destination. Agree what needs to be reviewed before recruitment begins.</p></div><div className="principles-ledger">{standards.map(([title,desc])=><article key={title}><h3>{title}</h3><p>{desc}</p></article>)}</div></div></section><section className="inner-closing"><div className="container-wide"><h2>The right conversation.<br/>The right starting point.</h2><div className="inner-actions"><Link className="btn btn-primary" href="/contact">Request Hospitality Workforce</Link><Link className="collection-secondary" href="/workforce#candidate-portal">Register your hospitality experience</Link></div></div></section></main>}
