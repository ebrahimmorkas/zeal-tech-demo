import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BRAND } from '../../data/brand';
import { ChatAssistant, type ChatSkin } from '../../components/common/ChatAssistant';
import { ConceptsLink } from '../../components/common/ConceptsLink';
import { SkipLink } from '../../components/common/SkipLink';
import { useOverlay } from '../../hooks/useOverlay';
import { CONCEPT, Cue, P, ROMAN, Stage } from './ui';

const skin: ChatSkin = {
  accent: '#f3f1ec',
  accentText: '#0b0b0b',
  surface: '#151515',
  panel: '#0b0b0b',
  ink: '#f3f1ec',
  muted: '#8f8f8f',
  border: '#2c2c2c',
  userBubble: '#f3f1ec',
  userText: '#0b0b0b',
  radius: '2px',
  font: 'Jost, system-ui, sans-serif',
  launcher: 'pill',
  title: 'Nexora Concierge',
  launcherLabel: 'Enquire',
};

const nav = [
  { label: 'The Group', to: P.about, img: '/images/office-corridor-sm.jpg' },
  { label: 'Companies', to: P.companies, img: '/images/port-aerial-sm.jpg' },
  { label: 'Leadership', to: P.leadership, img: '/images/boardtable-sm.jpg' },
  { label: 'Horizon', to: P.roadmap, img: '/images/skyline-construction-sm.jpg' },
  { label: 'Journal', to: P.news, img: '/images/keynote-sm.jpg' },
  { label: 'Gallery', to: P.gallery, img: '/images/city-night-sm.jpg' },
  { label: 'Archive', to: P.resources, img: '/images/drafting-sm.jpg' },
  { label: 'Partnerships', to: P.partner, img: '/images/partners-meeting-sm.jpg' },
  { label: 'Contact', to: P.contact, img: '/images/office-window-sm.jpg' },
];

/** Fine film grain over the whole concept. */
const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to={P.home} onClick={onClick} className="font-d9-serif text-[26px] tracking-[0.02em] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-d9-bone" aria-label={`${BRAND.name} home`}>
      Nexora<span className="italic text-d9-smoke"> group</span>
    </Link>
  );
}

function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useOverlay<HTMLDivElement>(open, onClose);
  const [hover, setHover] = useState(0);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="d9-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[66] bg-d9-black text-d9-bone overflow-y-auto"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(100% 0 0 0)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <Stage className="flex items-center justify-between h-24">
            <Logo onClick={onClose} />
            <button type="button" onClick={onClose} className="font-d9-sans text-[12px] uppercase tracking-[0.36em] h-11 px-1 hover:text-d9-smoke">
              Close
            </button>
          </Stage>
          <Stage className="grid lg:grid-cols-[1.3fr_1fr] gap-12 pb-16">
            <nav aria-label="Main">
              <ol>
                {nav.map((n, i) => (
                  <motion.li key={n.to} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.05 }}>
                    <NavLink
                      to={n.to}
                      onClick={onClose}
                      onMouseEnter={() => setHover(i)}
                      onFocus={() => setHover(i)}
                      className={({ isActive }) => `group flex items-baseline gap-5 py-1.5 font-d9-serif text-[40px] sm:text-[60px] leading-[1.05] transition-colors ${isActive ? 'italic text-d9-bone' : 'text-d9-smoke hover:text-d9-bone hover:italic'}`}
                    >
                      <span className="font-d9-sans text-[11px] tracking-[0.3em] text-d9-smoke w-8 not-italic">{ROMAN[i]}</span>
                      {n.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ol>
            </nav>
            <div className="hidden lg:block relative">
              <div className="sticky top-8 aspect-[4/5] overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.img key={nav[hover].img} src={nav[hover].img} alt="" className="absolute inset-0 w-full h-full object-cover saturate-[0.6]" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} />
                </AnimatePresence>
                <p className="absolute bottom-4 left-4 font-d9-sans text-[11px] uppercase tracking-[0.36em]">{nav[hover].label}</p>
              </div>
            </div>
          </Stage>
          <Stage className="pb-24 grid sm:grid-cols-3 gap-6 border-t border-d9-graphite pt-8 font-d9-sans text-[14px] text-d9-ash">
            <a href={`mailto:${BRAND.contact.email}`} className="hover:text-d9-bone break-all">
              {BRAND.contact.email}
            </a>
            <a href={BRAND.contact.phoneHref} className="hover:text-d9-bone">
              {BRAND.contact.phone}
            </a>
            <p>{BRAND.sampleNotice}</p>
          </Stage>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="border-t border-d9-graphite">
      <Stage className="py-20 lg:py-28 text-center">
        <Cue>Begin a conversation</Cue>
        <Link to={P.contact} className="group inline-block mt-8 font-d9-serif italic text-[52px] sm:text-[96px] lg:text-[128px] leading-none">
          Get in touch
          <span className="block h-px bg-d9-bone origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" aria-hidden />
        </Link>
        <nav aria-label="Footer" className="mt-16">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 font-d9-sans text-[11.5px] uppercase tracking-[0.32em] text-d9-smoke">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-d9-bone">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 font-d9-sans text-[12px] text-d9-smoke">
          <p>© {new Date().getFullYear()} {BRAND.legalName}</p>
          <p className="flex gap-6">
            {BRAND.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="uppercase tracking-[0.3em] hover:text-d9-bone">
                {s.label}
                <span className="sr-only"> (placeholder, opens in new tab)</span>
              </a>
            ))}
          </p>
          <p>{BRAND.sampleNotice}</p>
        </div>
      </Stage>
    </footer>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="d9 min-h-screen flex flex-col bg-d9-black font-d9-sans text-d9-bone text-[16.5px] selection:bg-d9-bone selection:text-d9-black" data-demo="demo9">
      <SkipLink className="bg-d9-bone text-d9-black" />
      <header className="fixed top-0 inset-x-0 z-50 mix-blend-difference text-white">
        <Stage className="flex items-center justify-between h-24">
          <Logo />
          <div className="flex items-center gap-8">
            <Link to={P.partner} className="hidden md:inline font-d9-sans text-[12px] uppercase tracking-[0.36em] hover:opacity-70">
              Partnerships
            </Link>
            <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="d9-menu" className="group flex items-center gap-4 h-11 font-d9-sans text-[12px] uppercase tracking-[0.36em]">
              Menu
              <span className="flex flex-col gap-[7px] w-8" aria-hidden>
                <span className="h-px w-full bg-current transition-all group-hover:w-1/2" />
                <span className="h-px w-full bg-current" />
              </span>
            </button>
          </div>
        </Stage>
      </header>
      <Menu open={open} onClose={() => setOpen(false)} />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[45] opacity-[0.06] mix-blend-screen" style={{ backgroundImage: grain }} />
      <ConceptsLink concept={CONCEPT} />
      <ChatAssistant skin={skin} paths={P} />
    </div>
  );
}
