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
  {
    id: 'demo6',
    number: '06',
    path: '/demo6',
    name: 'Swiss Precision',
    direction: 'Order, clarity and engineered confidence.',
    description:
      'International Typographic Style for a corporate group: a strict, visible twelve-column grid, oversized wide grotesque headlines, black and white with a single signal red, and clip-path wipe reveals.',
    differentiators: ['Fixed left index sidebar with numbered sections', 'Toggleable 12-column grid overlay', 'Company × industry coverage matrix and proportional time scale'],
    type: { display: 'Archivo (wide)', displayFamily: 'Archivo, sans-serif', body: 'Archivo (narrow labels)', bodyFamily: 'Archivo, sans-serif' },
    palette: [
      { name: 'Paper', hex: '#ffffff' },
      { name: 'Ink', hex: '#0a0a0a' },
      { name: 'Signal red', hex: '#e10600' },
      { name: 'Grey', hex: '#f2f2f2' },
    ],
    navigation: 'Fixed vertical index sidebar; full-screen index on mobile',
    bestFor: 'Groups that want to signal rigour, precision and engineering discipline.',
  },
  {
    id: 'demo7',
    number: '07',
    path: '/demo7',
    name: 'Living Earth',
    direction: 'Stewardship, sustainability and patient growth.',
    description:
      'A calm, nature-led presence: forest and lichen greens with a fresh lime accent, a soft serif display face, arch-shaped photography that unveils from the ground up, wave dividers and a “growth rings” roadmap.',
    differentiators: ['Split navigation around a centred wordmark', 'Arch-masked imagery with parallax', 'Interactive concentric “growth rings” roadmap'],
    type: { display: 'DM Serif Display', displayFamily: '"DM Serif Display", serif', body: 'DM Sans', bodyFamily: '"DM Sans", sans-serif' },
    palette: [
      { name: 'Forest', hex: '#1f3d2b' },
      { name: 'Lichen', hex: '#e6ecdc' },
      { name: 'Moss', hex: '#5f8a55' },
      { name: 'Lime', hex: '#d3e36b' },
    ],
    navigation: 'Split header around a centred logo; slide-in drawer on mobile',
    bestFor: 'Groups leading with sustainability, energy transition and long-term stewardship.',
  },
  {
    id: 'demo8',
    number: '08',
    path: '/demo8',
    name: 'Bold Studio',
    direction: 'Energy, confidence and memorability.',
    description:
      'A neo-brutalist, high-energy direction: thick ink outlines with hard offset shadows, a cream base with yellow, cobalt, pink and mint, rotated stickers, spinning badges, marquees and springy, tactile interactions.',
    differentiators: ['Polaroid hero collage and rotating text badge', 'Kanban-style Now / Next / Later roadmap', 'Speech-bubble leadership messages and ticket-stub timeline'],
    type: { display: 'Syne', displayFamily: 'Syne, sans-serif', body: 'Work Sans + Space Mono', bodyFamily: '"Work Sans", sans-serif' },
    palette: [
      { name: 'Cream', hex: '#fff8e7' },
      { name: 'Ink', hex: '#111111' },
      { name: 'Yellow', hex: '#ffd43b' },
      { name: 'Cobalt', hex: '#3d5afe' },
    ],
    navigation: 'Pill navigation with colour-coded active states; colour-tile mobile menu',
    bestFor: 'Groups that want to stand out, recruit young talent and feel approachable.',
  },
  {
    id: 'demo9',
    number: '09',
    path: '/demo9',
    name: 'Noir Cinema',
    direction: 'Prestige, drama and a long view.',
    description:
      'A cinematic, monochrome experience: black and bone, high-contrast Bodoni headlines, a letterboxed Ken Burns hero, film grain, scroll-linked word reveals and a pinned horizontal reel of companies.',
    differentiators: ['Full-screen menu with live image previews', 'Pinned horizontal-scroll company reel', 'Film-strip chronology and title-card page openings'],
    type: { display: 'Bodoni Moda', displayFamily: '"Bodoni Moda", serif', body: 'Jost', bodyFamily: 'Jost, sans-serif' },
    palette: [
      { name: 'Black', hex: '#0b0b0b' },
      { name: 'Carbon', hex: '#151515' },
      { name: 'Bone', hex: '#f3f1ec' },
      { name: 'Smoke', hex: '#8f8f8f' },
    ],
    navigation: 'Minimal blend-mode header with a full-screen menu on every device',
    bestFor: 'Groups that want an exclusive, premium, statement-making presence.',
  },
  {
    id: 'demo10',
    number: '10',
    path: '/demo10',
    name: 'Lumen Bento',
    direction: 'Modern, modular and effortless to explore.',
    description:
      'A soft product-style interface: a lilac canvas with drifting gradient orbs, frosted bento tiles that tilt in 3D, pastel accents, a macOS-style magnifying dock and a Ctrl/⌘K command palette.',
    differentiators: ['Floating dock navigation with magnification', 'Command-palette search for every page', 'Live form-completion meter and reading-progress bar'],
    type: { display: 'Sora', displayFamily: 'Sora, sans-serif', body: 'Figtree', bodyFamily: 'Figtree, sans-serif' },
    palette: [
      { name: 'Lilac', hex: '#f4f1ff' },
      { name: 'Violet', hex: '#6b4eff' },
      { name: 'Mint', hex: '#c6f4df' },
      { name: 'Peach', hex: '#ffdcc8' },
    ],
    navigation: 'Bottom dock on desktop; command palette on every device',
    bestFor: 'Groups that want to feel contemporary, digital-first and easy to navigate.',
  },
];
