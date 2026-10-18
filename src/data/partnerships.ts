import type { FieldDef, PartnershipType } from '../types';
import { INDUSTRIES_SERVED } from './brand';

const COUNTRIES = [
  'Australia', 'Bahrain', 'Bangladesh', 'Canada', 'Egypt', 'France', 'Germany', 'India', 'Indonesia', 'Italy', 'Japan', 'Kenya',
  'Kuwait', 'Malaysia', 'Netherlands', 'Nigeria', 'Oman', 'Qatar', 'Saudi Arabia', 'Singapore', 'South Africa', 'Spain',
  'Sri Lanka', 'Thailand', 'Turkey', 'United Arab Emirates', 'United Kingdom', 'United States', 'Vietnam', 'Other',
];

const contactFields: FieldDef[] = [
  { name: 'fullName', label: 'Full name', type: 'text', required: true, half: true, autoComplete: 'name' },
  { name: 'designation', label: 'Designation', type: 'text', half: true, autoComplete: 'organization-title' },
  { name: 'companyName', label: 'Company name', type: 'text', required: true, half: true, autoComplete: 'organization' },
  { name: 'email', label: 'Business email', type: 'email', required: true, half: true, autoComplete: 'email' },
  { name: 'phone', label: 'Phone number', type: 'tel', required: true, half: true, autoComplete: 'tel', placeholder: '+00 000 000 0000' },
  { name: 'country', label: 'Country', type: 'select', required: true, half: true, options: COUNTRIES, autoComplete: 'country-name' },
  { name: 'city', label: 'City / location', type: 'text', required: true, half: true, autoComplete: 'address-level2' },
  { name: 'website', label: 'Company website', type: 'url', half: true, placeholder: 'https://', autoComplete: 'url' },
];

const closing: FieldDef[] = [
  { name: 'message', label: 'Additional message', type: 'textarea', placeholder: 'Anything else we should know?' },
  { name: 'consent', label: 'I understand this is a demonstration form and that no data will be transmitted.', type: 'consent', required: true },
];

export const partnershipTypes: PartnershipType[] = [
  {
    id: 'dealer',
    title: 'Become a Dealer / Distributor',
    shortTitle: 'Dealer / Distributor',
    icon: 'globe',
    summary: 'Represent group products and services in your territory, backed by training, technical support and marketing resources.',
    idealFor: 'Established trading and distribution businesses with regional customer relationships.',
    benefits: ['Defined territories', 'Product & sales training', 'Technical and service support', 'Co-marketing programmes'],
    sections: [
      { title: 'Contact details', fields: contactFields },
      {
        title: 'Business profile',
        fields: [
          { name: 'businessType', label: 'Business type', type: 'select', required: true, half: true, options: ['Distributor', 'Dealer', 'Stockist', 'Trading company', 'System integrator', 'Other'] },
          { name: 'yearsInBusiness', label: 'Years in business', type: 'select', required: true, half: true, options: ['Less than 2', '2 – 5', '5 – 10', '10 – 20', 'More than 20'] },
          { name: 'industry', label: 'Primary industry', type: 'select', required: true, half: true, options: INDUSTRIES_SERVED },
          { name: 'territory', label: 'Proposed territory', type: 'text', required: true, half: true, placeholder: 'Region, state or country' },
          { name: 'experience', label: 'Existing distribution experience', type: 'textarea', required: true, placeholder: 'Brands represented, customer segments, sales and service team size' },
          { name: 'interests', label: 'Product areas of interest', type: 'checkboxes', required: true, options: ['Automation systems', 'Precision components', 'Energy solutions', 'Digital / IoT products', 'Logistics services'] },
        ],
      },
      { title: 'Anything else', fields: closing },
    ],
  },
  {
    id: 'oem',
    title: 'OEM Partner',
    shortTitle: 'OEM Partner',
    icon: 'factory',
    summary: 'Work with our engineering and manufacturing companies on components, sub-assemblies and co-developed products.',
    idealFor: 'Original equipment manufacturers seeking a long-term engineering and supply partner.',
    benefits: ['Design-for-manufacture support', 'Quality & traceability', 'Scalable production', 'Dedicated programme management'],
    sections: [
      { title: 'Contact details', fields: contactFields },
      {
        title: 'Programme requirements',
        fields: [
          { name: 'industry', label: 'Industry', type: 'select', required: true, half: true, options: INDUSTRIES_SERVED },
          { name: 'annualVolume', label: 'Estimated annual volume', type: 'select', required: true, half: true, options: ['Prototype / low volume', 'Up to 10,000 units', '10,000 – 100,000 units', 'More than 100,000 units'] },
          { name: 'productCategory', label: 'Product or component category', type: 'text', required: true, half: true, placeholder: 'e.g. machined housings, control panels' },
          { name: 'timeline', label: 'Target start', type: 'select', required: true, half: true, options: ['Within 3 months', '3 – 6 months', '6 – 12 months', 'Exploratory'] },
          { name: 'certifications', label: 'Quality standards required', type: 'checkboxes', options: ['ISO 9001', 'IATF 16949', 'ISO 14001', 'ISO 45001', 'Customer-specific'] },
          { name: 'requirements', label: 'Technical requirements', type: 'textarea', required: true, placeholder: 'Materials, tolerances, finishes, testing requirements' },
        ],
      },
      { title: 'Anything else', fields: closing },
    ],
  },
  {
    id: 'technology',
    title: 'Technology Partner',
    shortTitle: 'Technology Partner',
    icon: 'cpu',
    summary: 'Collaborate on software, automation, data and energy technologies that can be deployed across group operations and customers.',
    idealFor: 'Technology companies, research organisations and start-ups with proven industrial solutions.',
    benefits: ['Pilot sites within group operations', 'Access to industrial customers', 'Joint solution development', 'Engineering collaboration'],
    sections: [
      { title: 'Contact details', fields: contactFields },
      {
        title: 'Technology profile',
        fields: [
          { name: 'technologyArea', label: 'Technology area', type: 'select', required: true, half: true, options: ['Industrial IoT', 'AI & analytics', 'Robotics & automation', 'Energy technology', 'Cybersecurity', 'Enterprise software', 'Other'] },
          { name: 'maturity', label: 'Solution maturity', type: 'select', required: true, half: true, options: ['Research / prototype', 'Pilot deployments', 'Commercially deployed', 'Scaled across multiple customers'] },
          { name: 'collaboration', label: 'Collaboration models of interest', type: 'checkboxes', required: true, options: ['Pilot project', 'Co-development', 'Reseller / integration', 'Licensing', 'Research collaboration'] },
          { name: 'solution', label: 'Describe your solution', type: 'textarea', required: true, placeholder: 'Problem solved, existing deployments, integration requirements' },
        ],
      },
      { title: 'Anything else', fields: closing },
    ],
  },
  {
    id: 'investment',
    title: 'Investment Partner',
    shortTitle: 'Investment Partner',
    icon: 'trending',
    summary: 'Explore co-investment, joint ventures and strategic partnerships aligned with the group’s long-term growth priorities.',
    idealFor: 'Institutional investors, family offices and strategic corporates with a long-term horizon.',
    benefits: ['Long-term alignment', 'Sector expertise', 'Strong governance', 'Diversified opportunities'],
    sections: [
      {
        title: 'Contact details',
        fields: contactFields.filter((f) => f.name !== 'website').concat({ name: 'website', label: 'Organisation website', type: 'url', half: true, placeholder: 'https://' }),
      },
      {
        title: 'Investment interest',
        fields: [
          { name: 'investorType', label: 'Investor type', type: 'select', required: true, half: true, options: ['Institutional investor', 'Family office', 'Private equity', 'Strategic / corporate', 'Development finance institution', 'Other'] },
          { name: 'ticketSize', label: 'Indicative investment range', type: 'select', required: true, half: true, options: ['Prefer to discuss', 'Under USD 5M', 'USD 5M – 25M', 'USD 25M – 100M', 'Above USD 100M'], helper: 'Indicative only. No commitment is implied.' },
          { name: 'horizon', label: 'Investment horizon', type: 'select', required: true, half: true, options: ['3 – 5 years', '5 – 10 years', '10+ years', 'Flexible'] },
          { name: 'structure', label: 'Preferred structure', type: 'select', half: true, options: ['Equity co-investment', 'Joint venture', 'Project-level investment', 'Debt / structured finance', 'Open to discussion'] },
          { name: 'sectors', label: 'Sectors of interest', type: 'checkboxes', required: true, options: ['Manufacturing', 'Infrastructure', 'Renewable energy', 'Digital & technology', 'Logistics'] },
          { name: 'message', label: 'Investment thesis or areas for discussion', type: 'textarea', placeholder: 'Optional — please do not include confidential information in this demonstration form.' },
        ],
      },
      { title: 'Confirmation', fields: closing.filter((f) => f.name !== 'message') },
    ],
  },
  {
    id: 'vendor',
    title: 'Vendor Registration',
    shortTitle: 'Vendor Registration',
    icon: 'truck',
    summary: 'Register to supply products and services to group companies through a fair and transparent procurement process.',
    idealFor: 'Suppliers of materials, equipment, services and contractors.',
    benefits: ['Transparent procurement', 'Access to multiple group companies', 'Timely payment processes', 'Supplier development support'],
    sections: [
      { title: 'Contact details', fields: contactFields },
      {
        title: 'Supplier information',
        fields: [
          { name: 'registrationNumber', label: 'Business registration number', type: 'text', required: true, half: true, placeholder: 'Sample: REG-000000' },
          { name: 'taxId', label: 'Tax / VAT registration number', type: 'text', required: true, half: true },
          { name: 'yearEstablished', label: 'Year established', type: 'text', half: true, placeholder: 'YYYY' },
          { name: 'employees', label: 'Number of employees', type: 'select', half: true, options: ['1 – 10', '11 – 50', '51 – 200', '201 – 1,000', '1,000+'] },
          { name: 'categories', label: 'Product / service categories', type: 'checkboxes', required: true, options: ['Raw materials', 'Mechanical components', 'Electrical & electronics', 'Industrial equipment', 'Construction services', 'IT & software', 'Logistics & transport', 'Professional services'] },
          { name: 'certifications', label: 'Certifications held', type: 'text', placeholder: 'e.g. ISO 9001, ISO 14001' },
          { name: 'capabilities', label: 'Capabilities summary', type: 'textarea', required: true, placeholder: 'Key products, capacity, major customers (no confidential details)' },
        ],
      },
      { title: 'Anything else', fields: closing },
    ],
  },
];

export const contactFormFields: FieldDef[] = [
  { name: 'fullName', label: 'Full name', type: 'text', required: true, half: true, autoComplete: 'name' },
  { name: 'companyName', label: 'Company', type: 'text', half: true, autoComplete: 'organization' },
  { name: 'email', label: 'Business email', type: 'email', required: true, half: true, autoComplete: 'email' },
  { name: 'phone', label: 'Phone number', type: 'tel', half: true, autoComplete: 'tel' },
  {
    name: 'enquiryType',
    label: 'Enquiry type',
    type: 'select',
    required: true,
    options: ['General enquiry', 'Products & services', 'Partnership opportunity', 'Media & communications', 'Careers', 'Investor relations', 'Supplier enquiry'],
  },
  { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'How can we help?' },
  { name: 'consent', label: 'I understand this is a demonstration form and that no data will be transmitted.', type: 'consent', required: true },
];

export const getPartnership = (id: string | null | undefined) => partnershipTypes.find((p) => p.id === id);
