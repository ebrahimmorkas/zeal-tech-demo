export interface Concept {
  id: string;
  number: string;
  path: string;
  name: string;
  direction: string;
  description: string;
  differentiators: string[];
  type: { display: string; displayFamily: string; body: string; bodyFamily: string };
  palette: { name: string; hex: string }[];
  navigation: string;
  bestFor: string;
}

export const concepts: Concept[] = [
  {
    id: 'demo1',
    number: '01',
    path: '/demo1',
    name: 'Refined Corporate Classic',
    direction: 'Established, polished and quietly confident.',
    description:
      'A traditional corporate group presentation with elegant serif typography, a full-bleed photographic hero slider, structured mega-menu navigation and balanced editorial layouts.',
    differentiators: ['Utility bar + mega-menu navigation', 'Crossfading photographic hero slider', 'Gold-ruled cards and classic editorial rhythm'],
    type: { display: 'Cormorant Garamond', displayFamily: '"Cormorant Garamond", serif', body: 'Source Sans 3', bodyFamily: '"Source Sans 3", sans-serif' },
    palette: [
      { name: 'Navy', hex: '#0f2340' },
      { name: 'Ivory', hex: '#f7f5f0' },
      { name: 'Muted gold', hex: '#a8844f' },
      { name: 'Stone', hex: '#e8e4dc' },
    ],
    navigation: 'Classic header with dropdowns and a company mega-menu',
    bestFor: 'Groups that want to signal heritage, stability and trust.',
  },
  {
    id: 'demo2',
    number: '02',
    path: '/demo2',
    name: 'Modern Industrial Powerhouse',
    direction: 'Scale, capability and engineering precision.',
    description:
      'Bold condensed typography, full-width industrial photography, strict grids with technical annotations and high-contrast calls to action for an operationally strong group.',
    differentiators: ['Full-screen hero with live operations panel', 'Indexed grids, data labels and spec tables', 'Signal-orange CTAs on graphite and steel'],
    type: { display: 'Barlow Condensed', displayFamily: '"Barlow Condensed", sans-serif', body: 'Barlow + IBM Plex Mono', bodyFamily: 'Barlow, sans-serif' },
    palette: [
      { name: 'Graphite', hex: '#121519' },
      { name: 'Deep navy', hex: '#0b1f3a' },
      { name: 'Steel plate', hex: '#eceff2' },
      { name: 'Signal', hex: '#ff5a1f' },
    ],
    navigation: 'Indexed uppercase bar with full-screen overlay menu',
    bestFor: 'Manufacturing, engineering and infrastructure-led groups.',
  },
  {
    id: 'demo3',
    number: '03',
    path: '/demo3',
    name: 'Contemporary Editorial Luxury',
    direction: 'Reputation, heritage and considered leadership.',
    description:
      'A magazine-inspired experience with large editorial headlines, warm paper tones, art-directed photography, refined timelines and elegant leadership portraits.',
    differentiators: ['Centred masthead with index-style navigation', 'Editorial cover hero and numbered company index', 'Drop caps, pull quotes and asymmetric journal grids'],
    type: { display: 'Fraunces', displayFamily: 'Fraunces, serif', body: 'Manrope', bodyFamily: 'Manrope, sans-serif' },
    palette: [
      { name: 'Paper', hex: '#f4efe6' },
      { name: 'Ink', hex: '#1c1a17' },
      { name: 'Oxblood', hex: '#6e2a20' },
      { name: 'Sand', hex: '#d9cdb8' },
    ],
    navigation: 'Masthead with centred wordmark and side-panel index',
    bestFor: 'Groups whose reputation and leadership are the brand.',
  },
  {
    id: 'demo4',
    number: '04',
    path: '/demo4',
    name: 'Next-Generation Technology Group',
    direction: 'Innovation, intelligent systems and future growth.',
    description:
      'Layered compositions, an interactive group-network hero, data-inspired motifs and a visual roadmap — technologically advanced yet credible to enterprise decision-makers.',
    differentiators: ['Floating capsule navigation', 'Interactive network diagram of business units', 'Mono data labels, layered panels, restrained gradients'],
    type: { display: 'Space Grotesk', displayFamily: '"Space Grotesk", sans-serif', body: 'Inter + JetBrains Mono', bodyFamily: 'Inter, sans-serif' },
    palette: [
      { name: 'Void', hex: '#080c18' },
      { name: 'Indigo', hex: '#6170ff' },
      { name: 'Teal', hex: '#2fc9b4' },
      { name: 'Mist', hex: '#f4f6fb' },
    ],
    navigation: 'Floating capsule bar with bottom-sheet mobile menu',
    bestFor: 'Groups positioning technology and R&D at the centre.',
  },
  {
    id: 'demo5',
    number: '05',
    path: '/demo5',
    name: 'Human-Centered Global Enterprise',
    direction: 'People, partnership and sustainable growth.',
    description:
      'Bright, welcoming and story-led, with a photographic mosaic hero, modular rounded layouts, partnership-first calls to action and approachable, polished forms.',
    differentiators: ['Photo-mosaic hero with people stories', 'Partnership pathways placed up front', 'Soft rounded modules and conversational forms'],
    type: { display: 'Plus Jakarta Sans', displayFamily: '"Plus Jakarta Sans", sans-serif', body: 'Plus Jakarta Sans + Lora', bodyFamily: '"Plus Jakarta Sans", sans-serif' },
    palette: [
      { name: 'Teal', hex: '#0f766e' },
      { name: 'Coral', hex: '#e8664a' },
      { name: 'Sky', hex: '#e7f3f1' },
      { name: 'Sand', hex: '#fbf7f1' },
    ],
    navigation: 'Friendly rounded header with prominent partner CTA',
    bestFor: 'Groups emphasising people, collaboration and impact.',
  },
];
