export type IconKey =
  | 'shield'
  | 'compass'
  | 'handshake'
  | 'leaf'
  | 'lightbulb'
  | 'users'
  | 'factory'
  | 'cpu'
  | 'truck'
  | 'zap'
  | 'hardhat'
  | 'cog'
  | 'globe'
  | 'target'
  | 'trending';

export interface ImageAsset {
  /** Path to the large image in /public/images */
  src: string;
  /** Smaller variant for cards and thumbnails */
  sm: string;
  alt: string;
}

export interface GroupCompany {
  slug: string;
  name: string;
  shortName: string;
  monogram: string;
  sector: string;
  tagline: string;
  intro: string;
  description: string[];
  offerings: string[];
  industries: string[];
  image: ImageAsset;
  /** Accent color used for the company's sample visual identity */
  accent: string;
  /** Display label for the placeholder website domain */
  websiteLabel: string;
  /** Link target. Points to example.com until real websites are supplied. */
  websiteUrl: string;
  sampleMetrics: { label: string; value: string }[];
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  group: 'Chairman' | 'Managing Director' | 'Director' | 'Advisor';
  bio: string;
  expertise: string[];
  portrait: string;
  quote?: string;
}

export type NewsCategory = 'News' | 'Announcement' | 'Event' | 'Video';

export interface NewsItem {
  slug: string;
  title: string;
  category: NewsCategory;
  /** ISO date — illustrative only */
  date: string;
  excerpt: string;
  body: string[];
  image: ImageAsset;
  featured?: boolean;
  /** Video items show a poster with a placeholder player */
  duration?: string;
  company?: string;
}

export type GalleryCategory =
  | 'Events'
  | 'Facilities'
  | 'Offices'
  | 'Projects & Sites'
  | 'Corporate Meetings'
  | 'Team Activities';

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  caption: string;
  image: ImageAsset;
}

export type InitiativeType = 'Expansion' | 'Technology' | 'Sustainability' | 'Operations' | 'People';

export interface RoadmapInitiative {
  title: string;
  type: InitiativeType;
  description: string;
}

export interface RoadmapPhase {
  id: 'short' | 'medium' | 'long';
  label: string;
  horizon: string;
  title: string;
  summary: string;
  initiatives: RoadmapInitiative[];
}

export type ResourceType = 'Blog' | 'Whitepaper' | 'Technical Article';

export interface Resource {
  slug: string;
  type: ResourceType;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image: ImageAsset;
  sections: { heading: string; paragraphs: string[] }[];
  downloadable: boolean;
}

export type FieldType = 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'checkboxes' | 'url' | 'consent';

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  helper?: string;
  /** Layout hint: occupy half the row on wide screens */
  half?: boolean;
  autoComplete?: string;
}

export interface FormSectionDef {
  title: string;
  fields: FieldDef[];
}

export interface PartnershipType {
  id: 'dealer' | 'oem' | 'technology' | 'investment' | 'vendor';
  title: string;
  shortTitle: string;
  icon: IconKey;
  summary: string;
  idealFor: string;
  benefits: string[];
  sections: FormSectionDef[];
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  image?: ImageAsset;
}

export interface CoreValue {
  title: string;
  description: string;
  icon: IconKey;
}
