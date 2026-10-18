/**
 * Global brand placeholders.
 * Replace these values when the client supplies the real company name and details —
 * every demo reads its brand text from here.
 */
export const BRAND = {
  name: 'NEXORA GROUP',
  shortName: 'Nexora',
  wordmark: 'NEXORA',
  descriptor: 'GROUP',
  legalName: 'Nexora Group (placeholder entity)',
  tagline: 'Building enduring enterprises across industry, infrastructure and technology.',
  /** Shown wherever sample content appears */
  sampleNotice: 'Sample content for design review. Names, figures and dates are illustrative.',
  contact: {
    email: 'enquiries@nexora-group.example',
    partnersEmail: 'partners@nexora-group.example',
    mediaEmail: 'media@nexora-group.example',
    phone: '+00 (0) 000 000 0000',
    phoneHref: 'tel:+000000000000',
    hours: 'Monday – Friday, 09:00 – 18:00 (placeholder)',
  },
  offices: [
    {
      label: 'Corporate Headquarters',
      lines: ['Placeholder Tower, Level 00', '100 Sample Avenue', 'Business District, City 00000'],
      country: 'Country (to be confirmed)',
    },
    {
      label: 'Operations & Manufacturing Office',
      lines: ['Plot 00, Industrial Estate', 'Sample Road, City 00000'],
      country: 'Country (to be confirmed)',
    },
    {
      label: 'International Liaison Office',
      lines: ['Suite 000, Placeholder Centre', 'City 00000'],
      country: 'Country (to be confirmed)',
    },
  ],
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'YouTube', href: 'https://www.youtube.com/' },
    { label: 'X', href: 'https://x.com/' },
  ],
} as const;

export const NAV_ITEMS = [
  { label: 'About Us', path: 'about-us' },
  { label: 'Group Companies', path: 'group-companies' },
  { label: 'Leadership', path: 'leadership' },
  { label: 'Future Roadmap', path: 'future-roadmap' },
  { label: 'News & Media', path: 'news' },
  { label: 'Gallery', path: 'gallery' },
  { label: 'Resource Centre', path: 'resource-centre' },
  { label: 'Partner With Us', path: 'partner-with-us' },
  { label: 'Contact', path: 'contact' },
] as const;

export const INDUSTRIES_SERVED = [
  'Manufacturing',
  'Energy & Utilities',
  'Infrastructure',
  'Logistics',
  'Automotive & Mobility',
  'Process Industries',
  'Public Sector',
  'Technology & Telecom',
];
