import type { RoadmapPhase } from '../types';

/**
 * Illustrative roadmap. These are NOT official commitments — every milestone
 * must be confirmed by the client before publication.
 */
export const roadmap: RoadmapPhase[] = [
  {
    id: 'short',
    label: 'Short term',
    horizon: '2026 – 2027',
    title: 'Strengthen the foundation',
    summary: 'Consolidate operations, unify group standards and deepen relationships with existing customers and partners.',
    initiatives: [
      { title: 'Group operating model', type: 'Operations', description: 'Roll out shared governance, finance and procurement services across all companies.' },
      { title: 'Connected facilities', type: 'Technology', description: 'Deploy asset monitoring across group manufacturing and logistics sites.' },
      { title: 'Partner network growth', type: 'Expansion', description: 'Appoint distributors in priority regions with structured onboarding.' },
      { title: 'Safety leadership', type: 'People', description: 'Group-wide safety leadership programme for supervisors and site managers.' },
    ],
  },
  {
    id: 'medium',
    label: 'Medium term',
    horizon: '2028 – 2030',
    title: 'Scale with discipline',
    summary: 'Expand capacity, enter selected new markets and build technology-led services on top of our core businesses.',
    initiatives: [
      { title: 'Regional manufacturing capacity', type: 'Expansion', description: 'Evaluate new production capacity close to key customer clusters.' },
      { title: 'Predictive services', type: 'Technology', description: 'Offer data-driven maintenance and performance services to external clients.' },
      { title: 'Renewable energy for operations', type: 'Sustainability', description: 'Increase the share of renewable power used by group facilities.' },
      { title: 'Engineering academy', type: 'People', description: 'Establish a technical academy to develop engineers and technicians.' },
    ],
  },
  {
    id: 'long',
    label: 'Long term',
    horizon: '2031 – 2035',
    title: 'An enduring, future-ready group',
    summary: 'Position the group as a trusted, international partner for resilient industry, infrastructure and energy systems.',
    initiatives: [
      { title: 'International presence', type: 'Expansion', description: 'Operate in additional regions through subsidiaries and joint ventures.' },
      { title: 'Intelligent operations', type: 'Technology', description: 'Embed automation and analytics across every group company.' },
      { title: 'Lower-carbon operations', type: 'Sustainability', description: 'Pursue a science-informed pathway to reduce operational emissions.' },
      { title: 'Partnership ecosystem', type: 'Operations', description: 'Build long-term alliances with OEMs, technology firms and investors.' },
    ],
  },
];

export const strategicPillars = [
  { title: 'Operational Excellence', description: 'Consistent quality, safety and efficiency across every company.' },
  { title: 'Responsible Growth', description: 'Expansion that is financially disciplined and well governed.' },
  { title: 'Technology Leadership', description: 'Digital capability embedded in products, services and operations.' },
  { title: 'Sustainability', description: 'Reducing environmental impact while creating long-term value.' },
];
