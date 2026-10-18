import type { GalleryCategory, GalleryItem } from '../types';
import { img } from '../lib/images';

/** Representative stock photography (Unsplash) used as placeholders for client imagery. */
export const gallery: GalleryItem[] = [
  { id: 'g1', category: 'Events', caption: 'Annual Partner Summit — keynote session', image: img('keynote', 'Speaker on stage presenting to a large audience') },
  { id: 'g2', category: 'Facilities', caption: 'Automated assembly line', image: img('assembly-line', 'Robotic arms on an automated assembly line') },
  { id: 'g3', category: 'Offices', caption: 'Corporate headquarters — workspace', image: img('office-loft', 'Bright open-plan office with large windows') },
  { id: 'g4', category: 'Projects & Sites', caption: 'Infrastructure project site review', image: img('site-team', 'Engineers reviewing a large construction site') },
  { id: 'g5', category: 'Corporate Meetings', caption: 'Board strategy session', image: img('meeting-table', 'Executives in a meeting around a table') },
  { id: 'g6', category: 'Team Activities', caption: 'Cross-company innovation workshop', image: img('workshop-wall', 'Team working with sticky notes on a wall') },
  { id: 'g7', category: 'Facilities', caption: 'Process plant utilities', image: img('plant-pipes', 'Industrial pumps and stainless steel pipework') },
  { id: 'g8', category: 'Projects & Sites', caption: 'Solar installation', image: img('solar-aerial', 'Aerial view of a solar farm') },
  { id: 'g9', category: 'Events', caption: 'Industry forum participation', image: img('conference-dark', 'Audience at a conference') },
  { id: 'g10', category: 'Offices', caption: 'Regional office reception', image: img('office-corridor', 'Modern office corridor') },
  { id: 'g11', category: 'Facilities', caption: 'Distribution centre operations', image: img('warehouse', 'Warehouse filled with organised stock') },
  { id: 'g12', category: 'Corporate Meetings', caption: 'Partner agreement signing', image: img('handshake', 'Two business people shaking hands') },
  { id: 'g13', category: 'Team Activities', caption: 'Engineering team collaboration', image: img('team-laptops', 'Colleagues working together on laptops') },
  { id: 'g14', category: 'Projects & Sites', caption: 'Construction works in progress', image: img('construction', 'Construction workers on a building site') },
  { id: 'g15', category: 'Facilities', caption: 'Research and testing laboratory', image: img('lab-team', 'Scientists working in a laboratory') },
  { id: 'g16', category: 'Events', caption: 'Partner networking evening', image: img('event-hall', 'Prepared conference hall with screens') },
  { id: 'g17', category: 'Offices', caption: 'Boardroom, corporate headquarters', image: img('boardroom', 'Boardroom with leather chairs') },
  { id: 'g18', category: 'Team Activities', caption: 'Graduate programme induction', image: img('training', 'Training session in progress') },
];

export const galleryCategories: ('All' | GalleryCategory)[] = [
  'All',
  'Events',
  'Facilities',
  'Offices',
  'Projects & Sites',
  'Corporate Meetings',
  'Team Activities',
];
