import type { GroupCompany } from '../types';
import { img } from '../lib/images';

/**
 * Sample group companies. Add or edit entries here — every demo renders this list.
 * Company names, domains and metrics are fictional placeholders.
 */
export const groupCompanies: GroupCompany[] = [
  {
    slug: 'nexora-industrial-systems',
    name: 'Nexora Industrial Systems',
    shortName: 'Industrial Systems',
    monogram: 'IS',
    sector: 'Manufacturing & Automation',
    tagline: 'Precision production lines and automation for modern factories.',
    intro:
      'Designs, builds and services automated production systems for manufacturers that need consistent quality at scale.',
    description: [
      'Nexora Industrial Systems brings mechanical, electrical and controls engineering together under one roof. The company partners with manufacturers from concept through commissioning, and stays involved for the life of the asset.',
      'Its teams specialise in line integration, robotic cells and retrofit programmes that extend the productive life of existing facilities.',
    ],
    offerings: ['Turnkey production lines', 'Robotic cells & integration', 'Retrofit & modernisation', 'Lifecycle service contracts'],
    industries: ['Automotive & Mobility', 'Consumer Goods', 'Process Industries'],
    image: img('assembly-line', 'Robotic arms working on an automated vehicle assembly line'),
    accent: '#1f4e8c',
    websiteLabel: 'industrial.nexora-group.example',
    websiteUrl: 'https://example.com/',
    sampleMetrics: [
      { label: 'Lines commissioned', value: '120+' },
      { label: 'Service regions', value: '6' },
    ],
  },
  {
    slug: 'nexora-engineering-projects',
    name: 'Nexora Engineering & Projects',
    shortName: 'Engineering & Projects',
    monogram: 'EP',
    sector: 'Infrastructure & EPC',
    tagline: 'Engineering, procurement and construction for critical infrastructure.',
    intro:
      'Delivers complex infrastructure projects with disciplined engineering, transparent reporting and an uncompromising approach to safety.',
    description: [
      'Nexora Engineering & Projects manages large capital projects from feasibility studies to handover. Its integrated project teams combine design, procurement and site execution.',
      'The company works with public and private clients on industrial facilities, utilities and commercial developments.',
    ],
    offerings: ['Feasibility & design', 'EPC project delivery', 'Project management consultancy', 'Site safety & quality assurance'],
    industries: ['Infrastructure', 'Energy & Utilities', 'Public Sector'],
    image: img('construction', 'Engineers in safety gear reviewing work on a construction site'),
    accent: '#a0522d',
    websiteLabel: 'projects.nexora-group.example',
    websiteUrl: 'https://example.com/',
    sampleMetrics: [
      { label: 'Projects delivered', value: '85+' },
      { label: 'Safe work hours', value: '10M+' },
    ],
  },
  {
    slug: 'nexora-energy-solutions',
    name: 'Nexora Energy Solutions',
    shortName: 'Energy Solutions',
    monogram: 'ES',
    sector: 'Renewable Energy & Power',
    tagline: 'Reliable, lower-carbon energy for industry and communities.',
    intro:
      'Develops and operates solar, wind and hybrid power assets, and helps industrial clients reduce energy cost and emissions.',
    description: [
      'Nexora Energy Solutions develops utility-scale and captive renewable power projects and provides operations and maintenance services.',
      'Its advisory team works with energy-intensive businesses on efficiency audits, power purchase structures and decarbonisation roadmaps.',
    ],
    offerings: ['Solar & wind development', 'Captive power solutions', 'Operations & maintenance', 'Energy efficiency advisory'],
    industries: ['Energy & Utilities', 'Manufacturing', 'Commercial Real Estate'],
    image: img('solar-aerial', 'Aerial view of rows of solar panels across green fields'),
    accent: '#2f7d4f',
    websiteLabel: 'energy.nexora-group.example',
    websiteUrl: 'https://example.com/',
    sampleMetrics: [
      { label: 'Capacity under management', value: '450 MW' },
      { label: 'Sites operated', value: '30+' },
    ],
  },
  {
    slug: 'nexora-digital-technologies',
    name: 'Nexora Digital Technologies',
    shortName: 'Digital Technologies',
    monogram: 'DT',
    sector: 'Industrial Software & IoT',
    tagline: 'Data, software and connected systems for intelligent operations.',
    intro:
      'Builds industrial software, IoT platforms and data services that give operators real-time visibility and better decisions.',
    description: [
      'Nexora Digital Technologies is the group’s technology company. It develops connected-asset platforms, analytics and enterprise integrations for industrial clients.',
      'The company also supports sister companies with digital tools, cybersecurity and data infrastructure.',
    ],
    offerings: ['IoT & asset monitoring', 'Industrial analytics', 'Enterprise systems integration', 'Cybersecurity services'],
    industries: ['Manufacturing', 'Technology & Telecom', 'Logistics'],
    image: img('datacenter-walk', 'Technology professional walking through a data centre corridor'),
    accent: '#4b4fd1',
    websiteLabel: 'digital.nexora-group.example',
    websiteUrl: 'https://example.com/',
    sampleMetrics: [
      { label: 'Connected assets', value: '25k+' },
      { label: 'Platform uptime', value: '99.9%' },
    ],
  },
  {
    slug: 'nexora-logistics',
    name: 'Nexora Logistics & Supply Chain',
    shortName: 'Logistics & Supply Chain',
    monogram: 'LS',
    sector: 'Logistics & Warehousing',
    tagline: 'Integrated warehousing, distribution and trade logistics.',
    intro:
      'Operates warehousing and distribution networks and manages inbound and outbound supply chains for industrial and retail clients.',
    description: [
      'Nexora Logistics & Supply Chain combines contract warehousing, transport management and trade services to keep goods moving reliably.',
      'Its operations are supported by the group’s digital platforms for inventory visibility and shipment tracking.',
    ],
    offerings: ['Contract warehousing', 'Distribution & fleet management', 'Import & export services', 'Supply chain consulting'],
    industries: ['Logistics', 'Retail & Distribution', 'Manufacturing'],
    image: img('warehouse', 'Large warehouse with organised inventory on industrial shelving'),
    accent: '#b7791f',
    websiteLabel: 'logistics.nexora-group.example',
    websiteUrl: 'https://example.com/',
    sampleMetrics: [
      { label: 'Warehouse space', value: '1.2M sq ft' },
      { label: 'Distribution hubs', value: '14' },
    ],
  },
  {
    slug: 'nexora-precision-components',
    name: 'Nexora Precision Components',
    shortName: 'Precision Components',
    monogram: 'PC',
    sector: 'Components & Materials',
    tagline: 'High-tolerance components engineered for demanding applications.',
    intro:
      'Manufactures precision-engineered components and sub-assemblies for OEMs that require tight tolerances and dependable supply.',
    description: [
      'Nexora Precision Components produces machined, fabricated and assembled parts for original equipment manufacturers.',
      'Its quality systems, traceability and engineering support make it a long-term supply partner rather than a transactional vendor.',
    ],
    offerings: ['CNC machining', 'Fabrication & sub-assembly', 'Design for manufacture support', 'Quality & traceability programmes'],
    industries: ['Automotive & Mobility', 'Industrial Equipment', 'Energy & Utilities'],
    image: img('machinery', 'Close-up of precision machinery components and springs'),
    accent: '#5b6472',
    websiteLabel: 'components.nexora-group.example',
    websiteUrl: 'https://example.com/',
    sampleMetrics: [
      { label: 'Part numbers in production', value: '3,000+' },
      { label: 'OEM customers', value: '60+' },
    ],
  },
];

export const getCompany = (slug: string | undefined) => groupCompanies.find((c) => c.slug === slug);
