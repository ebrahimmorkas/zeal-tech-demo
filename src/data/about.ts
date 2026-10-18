import type { CoreValue, TimelineEntry } from '../types';
import { img } from '../lib/images';

/** Sample About Us content. All statements are illustrative pending client copy. */
export const about = {
  storyTitle: 'A group built around long-term enterprise',
  story: [
    'Nexora Group began as a single engineering workshop with a simple conviction: that well-run industrial businesses, built patiently, create value for customers, employees and communities for generations.',
    'Over time the group expanded into manufacturing, infrastructure delivery, energy, logistics and digital technology, each step taken where our capabilities could genuinely serve customers better.',
    'Today the group operates as a family of specialised companies that share common values, governance and a commitment to operational excellence, while each remains close to its own customers and markets.',
  ],
  vision: 'To be the most trusted industrial and technology group in the markets we serve, recognised for enduring enterprises, responsible growth and partnerships that last.',
  mission: 'We build and grow specialised businesses that deliver dependable solutions to industry and infrastructure, through engineering excellence, disciplined execution and genuine partnership.',
  philosophy: [
    'We think in decades, not quarters. Decisions are tested against a simple question: will this make the enterprise stronger for the next generation?',
    'Each group company is empowered to lead in its field, supported by shared governance, shared standards and shared capital.',
  ],
  whyWeExist:
    'Industry and infrastructure underpin everyday life. We exist to make those systems more reliable, more efficient and more sustainable, and to build businesses that people are proud to work with and work for.',
  chairmanMessage: {
    title: 'Chairman’s Message',
    paragraphs: [
      'When we founded this group, our ambition was not simply to grow, but to build something worthy of trust. That aspiration continues to guide every decision we make.',
      'Our companies operate in demanding sectors where reliability matters. Customers rely on us to keep production running, to deliver infrastructure safely and to supply energy and components they can depend on. We take that responsibility seriously.',
      'Looking ahead, we will continue to invest patiently in capability, in technology and above all in people. I thank our customers, partners and colleagues for their confidence in the group.',
    ],
  },
  mdMessage: {
    title: 'Managing Director’s Message',
    paragraphs: [
      'Our strength lies in the combination of specialised expertise and group-wide discipline. Each company knows its market deeply, and together we bring scale, governance and shared capability.',
      'Over the coming years our focus is clear: operational excellence, digital enablement across every business, and responsible growth in new markets alongside trusted partners.',
      'We welcome conversations with distributors, OEMs, technology firms and investors who share our long-term view.',
    ],
  },
};

export const coreValues: CoreValue[] = [
  { title: 'Integrity', description: 'We do what we say, transparently and ethically, in every market we operate in.', icon: 'shield' },
  { title: 'Excellence', description: 'We hold ourselves to rigorous engineering, quality and safety standards.', icon: 'target' },
  { title: 'Partnership', description: 'We build relationships that last longer than any single contract.', icon: 'handshake' },
  { title: 'Responsibility', description: 'We consider our impact on people, communities and the environment.', icon: 'leaf' },
  { title: 'Innovation', description: 'We adopt new technology where it creates real value for customers.', icon: 'lightbulb' },
  { title: 'People First', description: 'We invest in the safety, growth and wellbeing of our colleagues.', icon: 'users' },
];

/** Illustrative timeline — years and milestones are placeholders, not company history. */
export const timeline: TimelineEntry[] = [
  { year: '1998', title: 'Foundation', description: 'The group’s first engineering workshop opens, serving local manufacturers.', image: img('drafting', 'Engineer drafting technical drawings') },
  { year: '2004', title: 'First manufacturing facility', description: 'Investment in a dedicated production facility for precision components.', image: img('machinery', 'Precision machinery') },
  { year: '2009', title: 'Infrastructure projects', description: 'Engineering & Projects division formed to deliver larger capital projects.', image: img('site-team', 'Project team on a construction site') },
  { year: '2013', title: 'Logistics network', description: 'Warehousing and distribution operations launched to support group customers.', image: img('warehouse-aisle', 'Warehouse aisle') },
  { year: '2017', title: 'Energy transition', description: 'Entry into renewable energy development and operations.', image: img('wind-sunset', 'Wind turbines at sunset') },
  { year: '2020', title: 'Digital technologies', description: 'Digital Technologies company established to lead the group’s data and IoT strategy.', image: img('servers', 'Server racks in a data centre') },
  { year: '2023', title: 'International partnerships', description: 'New distributor and OEM partnerships extend the group’s regional presence.', image: img('handshake', 'Business handshake') },
  { year: '2025', title: 'Group integration', description: 'Unified governance, brand and shared services across all group companies.', image: img('boardroom', 'Corporate boardroom') },
];

export const capabilities = [
  { title: 'Engineering & Design', description: 'Multidisciplinary engineering from concept through detailed design.', icon: 'cog' as const },
  { title: 'Manufacturing', description: 'Precision components, systems and automated production.', icon: 'factory' as const },
  { title: 'Project Delivery', description: 'EPC execution with rigorous safety and quality control.', icon: 'hardhat' as const },
  { title: 'Energy', description: 'Renewable development, captive power and efficiency services.', icon: 'zap' as const },
  { title: 'Logistics', description: 'Warehousing, distribution and trade services.', icon: 'truck' as const },
  { title: 'Digital & Data', description: 'IoT, analytics and enterprise integration.', icon: 'cpu' as const },
];

/** Explicitly illustrative figures used only for layout demonstration. */
export const sampleStats = [
  { value: '6', label: 'Group companies', note: 'Sample' },
  { value: '25+', label: 'Years of enterprise', note: 'Illustrative' },
  { value: '4,500', label: 'Colleagues', note: 'Illustrative' },
  { value: '18', label: 'Countries served', note: 'Illustrative' },
];
