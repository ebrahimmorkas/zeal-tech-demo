import type { Leader } from '../types';
import { portrait } from '../lib/images';

/**
 * Fictional placeholder leadership profiles.
 * These people do not work for the client. Replace them with verified profiles and approved portraits.
 */
export const leaders: Leader[] = [
  {
    id: 'chairman',
    name: 'Alexander Hartwell',
    role: 'Chairman',
    group: 'Chairman',
    bio: 'Sample profile. Alexander provides strategic direction to the group and chairs the board. His career spans industrial manufacturing, capital projects and long-term partnership building across several international markets.',
    expertise: ['Corporate strategy', 'Governance', 'Industrial investment'],
    portrait: portrait('p-chairman'),
    quote: 'We measure success by the strength of the enterprises we leave to the next generation.',
  },
  {
    id: 'managing-director',
    name: 'Sophia Marlowe',
    role: 'Managing Director',
    group: 'Managing Director',
    bio: 'Sample profile. Sophia leads the group’s day-to-day performance, capital allocation and operating model. She has guided transformation programmes in engineering, energy and digital businesses.',
    expertise: ['Operations leadership', 'Transformation', 'Capital allocation'],
    portrait: portrait('p-md'),
    quote: 'Discipline in execution is what turns ambition into lasting value.',
  },
  {
    id: 'director-operations',
    name: 'Daniel Reyes',
    role: 'Director — Group Operations',
    group: 'Director',
    bio: 'Sample profile. Daniel oversees operational excellence, safety and quality standards across manufacturing and project businesses.',
    expertise: ['Lean operations', 'Health & safety', 'Quality systems'],
    portrait: portrait('p-dir1'),
  },
  {
    id: 'director-finance',
    name: 'Elena Voss',
    role: 'Director — Finance & Risk',
    group: 'Director',
    bio: 'Sample profile. Elena is responsible for financial planning, treasury, risk management and investor relations across the group.',
    expertise: ['Corporate finance', 'Risk management', 'Investor relations'],
    portrait: portrait('p-dir2'),
  },
  {
    id: 'director-strategy',
    name: 'Marcus Bennett',
    role: 'Director — Strategy & Partnerships',
    group: 'Director',
    bio: 'Sample profile. Marcus leads corporate development, strategic partnerships and new market entry for the group.',
    expertise: ['Corporate development', 'Partnerships', 'Market entry'],
    portrait: portrait('p-dir3'),
  },
  {
    id: 'director-technology',
    name: 'Amara Lindqvist',
    role: 'Director — Digital & Technology',
    group: 'Director',
    bio: 'Sample profile. Amara leads the group’s technology agenda, from enterprise systems to industrial data platforms and cybersecurity.',
    expertise: ['Digital transformation', 'Data platforms', 'Cybersecurity'],
    portrait: portrait('p-dir4'),
  },
  {
    id: 'advisor-engineering',
    name: 'Prof. Julian Okafor',
    role: 'Advisor — Engineering & Research',
    group: 'Advisor',
    bio: 'Sample profile. Julian advises the board on engineering research, academic collaboration and emerging technologies.',
    expertise: ['Applied research', 'Engineering standards', 'Academic partnerships'],
    portrait: portrait('p-adv1'),
  },
  {
    id: 'advisor-sustainability',
    name: 'Rohan Mehta',
    role: 'Advisor — Sustainability',
    group: 'Advisor',
    bio: 'Sample profile. Rohan advises on sustainability strategy, ESG reporting and community partnership programmes.',
    expertise: ['ESG strategy', 'Sustainability reporting', 'Community programmes'],
    portrait: portrait('p-adv2'),
  },
];

export const chairman = leaders[0];
export const managingDirector = leaders[1];
export const directors = leaders.filter((l) => l.group === 'Director');
export const advisors = leaders.filter((l) => l.group === 'Advisor');
