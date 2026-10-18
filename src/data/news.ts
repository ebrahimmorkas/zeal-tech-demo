import type { NewsItem } from '../types';
import { img } from '../lib/images';

/** Fictional news items with illustrative dates. Replace with approved announcements. */
export const news: NewsItem[] = [
  {
    slug: 'group-announces-integrated-operating-model',
    title: 'Group introduces an integrated operating model across all companies',
    category: 'Announcement',
    date: '2026-09-18',
    excerpt: 'A unified governance framework and shared services platform will support the next phase of growth across the group.',
    body: [
      'Nexora Group has introduced an integrated operating model that brings common governance, shared services and group-wide standards to all of its companies. (Sample announcement.)',
      'The model is designed to let each company focus on its customers while benefiting from group scale in finance, procurement, digital systems and talent development.',
      'Implementation will take place in phases, with regular updates shared through the group’s news channels.',
    ],
    image: img('boardroom', 'Empty boardroom with long table and city views'),
    featured: true,
  },
  {
    slug: 'energy-solutions-commissions-solar-site',
    title: 'Energy Solutions completes commissioning of a new solar installation',
    category: 'News',
    date: '2026-08-27',
    excerpt: 'The project supplies clean power to an industrial client and demonstrates the group’s captive energy model.',
    body: [
      'Nexora Energy Solutions has completed commissioning of a ground-mounted solar installation for an industrial customer. (Sample news item.)',
      'The site will be operated and maintained by the company’s operations team under a long-term service agreement.',
    ],
    image: img('solar', 'Solar panels in a field under a blue sky'),
    company: 'Nexora Energy Solutions',
  },
  {
    slug: 'annual-partner-summit',
    title: 'Highlights from the annual Partner Summit',
    category: 'Event',
    date: '2026-07-14',
    excerpt: 'Distributors, OEM partners and suppliers gathered to discuss market priorities and joint growth plans.',
    body: [
      'The group hosted its annual Partner Summit, bringing together distributors, OEMs and suppliers from several regions. (Sample event coverage.)',
      'Sessions covered product roadmaps, service standards, digital ordering tools and joint marketing programmes.',
    ],
    image: img('keynote', 'Speaker presenting on stage to an audience at a conference'),
    featured: true,
  },
  {
    slug: 'inside-our-precision-facility',
    title: 'Video: Inside our precision manufacturing facility',
    category: 'Video',
    date: '2026-06-30',
    excerpt: 'A short walkthrough of machining, quality inspection and assembly operations.',
    body: [
      'This video placeholder represents a facility walkthrough. The final film will be supplied by the client.',
      'Suggested content: machining cells, inspection lab, assembly areas and interviews with operations leaders.',
    ],
    image: img('welding', 'Sparks flying during industrial metal work'),
    duration: '3:42',
    company: 'Nexora Precision Components',
  },
  {
    slug: 'digital-platform-milestone',
    title: 'Digital Technologies expands its connected-asset platform',
    category: 'News',
    date: '2026-06-05',
    excerpt: 'New monitoring modules give operators earlier insight into equipment performance.',
    body: [
      'Nexora Digital Technologies has released new modules for its connected-asset platform, adding condition monitoring and maintenance planning features. (Sample news item.)',
      'The modules are being rolled out first across group facilities before becoming available to external customers.',
    ],
    image: img('dashboard', 'Laptop displaying an analytics dashboard'),
    company: 'Nexora Digital Technologies',
  },
  {
    slug: 'leadership-town-hall',
    title: 'Video: Leadership town hall on our long-term priorities',
    category: 'Video',
    date: '2026-05-22',
    excerpt: 'The Chairman and Managing Director discuss the group’s strategic direction with colleagues.',
    body: [
      'Video placeholder. The final recording will be supplied by the client.',
      'Suggested content: strategic priorities, safety commitments and questions from colleagues.',
    ],
    image: img('town-hall', 'Presenter speaking to a group of colleagues in an office'),
    duration: '12:08',
  },
  {
    slug: 'logistics-new-distribution-hub',
    title: 'Logistics & Supply Chain opens a new regional distribution hub',
    category: 'Announcement',
    date: '2026-04-16',
    excerpt: 'The facility increases storage capacity and shortens delivery times for regional customers.',
    body: [
      'Nexora Logistics & Supply Chain has opened a new regional distribution hub. (Sample announcement.)',
      'The hub integrates with the group’s inventory platform to give customers real-time visibility of stock and shipments.',
    ],
    image: img('warehouse-aisle', 'Long warehouse aisle with tall storage racks'),
    company: 'Nexora Logistics & Supply Chain',
  },
  {
    slug: 'engineering-safety-recognition',
    title: 'Engineering & Projects marks a safety milestone on a major site',
    category: 'News',
    date: '2026-03-09',
    excerpt: 'Project teams reached a significant milestone in safe working hours.',
    body: [
      'Nexora Engineering & Projects has reached a safety milestone on one of its largest active sites. (Sample news item.)',
      'The achievement reflects a culture of planning, supervision and shared responsibility among project teams and subcontractors.',
    ],
    image: img('site-team', 'Team of engineers in high-visibility clothing on a site'),
    company: 'Nexora Engineering & Projects',
  },
  {
    slug: 'industry-forum-panel',
    title: 'Group leaders join an industry forum on infrastructure and energy',
    category: 'Event',
    date: '2026-02-11',
    excerpt: 'Senior leaders shared perspectives on resilient infrastructure and the energy transition.',
    body: [
      'Members of the group leadership team participated in an industry forum on infrastructure resilience and energy transition. (Sample event coverage.)',
      'Discussion covered collaboration between public and private sectors and the role of digital tools in asset management.',
    ],
    image: img('conference-dark', 'Audience seated at a large conference event'),
  },
  {
    slug: 'graduate-engineering-programme',
    title: 'Group launches a graduate engineering programme',
    category: 'Announcement',
    date: '2026-01-20',
    excerpt: 'A structured programme will rotate graduates across group companies.',
    body: [
      'The group has launched a graduate engineering programme with rotations across manufacturing, projects, energy and digital businesses. (Sample announcement.)',
      'Participants will be supported by mentors from senior engineering teams.',
    ],
    image: img('training', 'Group of people attending a training session'),
  },
];

export const newsCategories = ['All', 'News', 'Announcement', 'Event', 'Video'] as const;

export const getNews = (slug: string | undefined) => news.find((n) => n.slug === slug);

export function formatDate(iso: string, style: 'long' | 'short' = 'long') {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-GB', style === 'long' ? { day: 'numeric', month: 'long', year: 'numeric' } : { day: '2-digit', month: 'short', year: 'numeric' });
}
