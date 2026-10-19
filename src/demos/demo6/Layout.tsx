import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Grid3x3, X } from 'lucide-react';
import { BRAND } from '../../data/brand';
import { ChatAssistant, type ChatSkin } from '../../components/common/ChatAssistant';
import { ConceptsLink } from '../../components/common/ConceptsLink';
import { SkipLink } from '../../components/common/SkipLink';
import { useOverlay } from '../../hooks/useOverlay';
import { CONCEPT, Frame, H, Label, P, narrow, wide } from './ui';

const skin: ChatSkin = {
  accent: '#e10600',
  accentText: '#ffffff',
  surface: '#ffffff',
  panel: '#f2f2f2',
  ink: '#0a0a0a',
  muted: '#6b6b6b',
  border: '#0a0a0a',
  userBubble: '#0a0a0a',
  userText: '#ffffff',
  radius: '0px',
  font: 'Archivo, "Helvetica Neue", Arial, sans-serif',
  launcher: 'square',
  title: 'Nexora Information Desk',
  launcherLabel: 'Ask',
};

export const nav = [
  { n: '01', label: 'About', to: P.about },
  { n: '02', label: 'Companies', to: P.companies },
  { n: '03', label: 'Leadership', to: P.leadership },
  { n: '04', label: 'Roadmap', to: P.roadmap },
  { n: '05', label: 'News', to: P.news },
  { n: '06', label: 'Gallery', to: P.gallery },
  { n: '07', label: 'Resources', to: P.resources },
  { n: '08', label: 'Partner', to: P.partner },
  { n: '09', label: 'Contact', to: P.contact },
];

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to={P.home} onClick={onClick} className="inline-flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-d6-red" aria-label={`${BRAND.name} home`}>
      <span className="grid grid-cols-2 w-7 h-7" aria-hidden>
        <span className="bg-d6-red" />
        <span />
        <span className="bg-d6-ink" />
        <span className="bg-d6-ink" />
      </span>
      <span className="font-d6-sans font-extrabold text-[20px] tracking-[-0.04em] leading-none" style={wide}>
        Nexora
      </span>
    </Link>
  );
}

/** Fixed vertical index — the concept's primary navigation on desktop. */
function Sidebar({ grid, setGrid }: { grid: boolean; setGrid: (v: boolean) => void }) {
  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-[264px] flex-col border-r-[3px] border-d6-ink bg-white">
      <div className="px-8 pt-8">
        <Logo />
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-d6-mid" style={narrow}>
          Group · Industry · Infrastructure
        </p>
      </div>
      <nav aria-label="Main" className="mt-10 flex-1 overflow-y-auto">
        <ul className="border-t border-d6-line">
          <li>
            <NavLink end to={P.home} className={({ isActive }) => `flex items-baseline gap-4 px-8 py-3 border-b border-d6-line text-[15px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-d6-red ${isActive ? 'bg-d6-ink text-white' : 'hover:bg-d6-grey'}`}>
              <span className="text-[11px] text-d6-red tabular-nums">00</span>
              Index
            </NavLink>
          </li>
          {nav.map((n) => (
            <li key={n.to}>
              <NavLink to={n.to} className={({ isActive }) => `flex items-baseline gap-4 px-8 py-3 border-b border-d6-line text-[15px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-d6-red ${isActive ? 'bg-d6-ink text-white' : 'hover:bg-d6-grey'}`}>
                <span className="text-[11px] text-d6-red tabular-nums">{n.n}</span>
                {n.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-8 pt-5 pb-16 border-t-[3px] border-d6-ink space-y-3">
        <button type="button" onClick={() => setGrid(!grid)} aria-pressed={grid} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] hover:text-d6-red" style={narrow}>
          <Grid3x3 size={14} aria-hidden /> {grid ? 'Hide' : 'Show'} grid
        </button>
        <a href={`mailto:${BRAND.contact.email}`} className="block text-[13px] break-all hover:text-d6-red">
          {BRAND.contact.email}
        </a>
      </div>
    </aside>
  );
}

function MobileIndex({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useOverlay<HTMLDivElement>(open, onClose);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="d6-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Index"
          className="lg:hidden fixed inset-0 z-[66] bg-white flex flex-col"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.5, ease: [0.77, 0, 0.18, 1] }}
        >
          <div className="flex items-center justify-between h-16 px-5 border-b-[3px] border-d6-ink">
            <Logo onClick={onClose} />
            <button type="button" onClick={onClose} aria-label="Close index" className="grid place-items-center w-11 h-11 bg-d6-ink text-white">
              <X size={20} />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto">
            <ul>
              {nav.map((n) => (
                <li key={n.to}>
                  <NavLink to={n.to} onClick={onClose} className={({ isActive }) => `flex items-baseline gap-4 px-5 py-4 border-b border-d6-line ${isActive ? 'bg-d6-red text-white' : ''}`}>
                    <span className="text-[12px] tabular-nums opacity-70">{n.n}</span>
                    <span className="font-d6-sans font-extrabold text-[30px] leading-none tracking-[-0.04em]" style={wide}>
                      {n.label}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="bg-d6-red text-white">
      <Frame className="py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <Label className="text-white/80">Enquiries</Label>
            <H as="p" className="mt-6 text-[56px] sm:text-[96px] xl:text-[132px]">
              Let’s talk.
            </H>
            <Link to={P.contact} className="mt-8 inline-flex items-center gap-3 border-b-2 border-white pb-1 text-[18px] font-bold hover:opacity-80">
              Start a conversation <ArrowUpRight size={20} aria-hidden />
            </Link>
          </div>
          <nav aria-label="Footer" className="lg:col-span-5 grid grid-cols-2 gap-x-6 content-start">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="flex items-baseline gap-3 py-2.5 border-b border-white/30 text-[15px] font-semibold hover:pl-2 transition-[padding]">
                <span className="text-[11px] tabular-nums opacity-70">{n.n}</span>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-16 pt-6 border-t-[3px] border-white grid sm:grid-cols-3 gap-4 text-[13px] text-white/85">
          <p>© {new Date().getFullYear()} {BRAND.legalName}</p>
          <p className="flex gap-4">
            {BRAND.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">
                {s.label}
                <span className="sr-only"> (placeholder, opens in new tab)</span>
              </a>
            ))}
          </p>
          <p className="sm:text-right">{BRAND.sampleNotice}</p>
        </div>
      </Frame>
    </footer>
  );
}

/** Twelve-column grid overlay, toggled from the sidebar — the concept's visible system. */
function GridOverlay({ show }: { show: boolean }) {
  return (
    <div aria-hidden className={`pointer-events-none fixed inset-y-0 right-0 left-0 lg:left-[264px] z-30 px-5 sm:px-8 lg:px-12 transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className="h-full grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={`h-full bg-d6-red/[0.06] border-x border-d6-red/20 ${i >= 4 ? 'hidden sm:block' : ''} ${i >= 6 ? 'sm:hidden lg:block' : ''}`} />
        ))}
      </div>
    </div>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [grid, setGrid] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="d6 min-h-screen bg-white font-d6-sans text-d6-ink text-[16px] selection:bg-d6-red selection:text-white" data-demo="demo6">
      <SkipLink className="bg-d6-red text-white" />
      <Sidebar grid={grid} setGrid={setGrid} />
      <header className="lg:hidden sticky top-0 z-50 bg-white border-b-[3px] border-d6-ink">
        <div className="flex items-center justify-between h-16 px-5">
          <Logo />
          <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="d6-menu" className="flex items-center gap-3 h-11 pl-4 pr-3 bg-d6-ink text-white text-[13px] font-bold uppercase tracking-[0.12em]" style={narrow}>
            Index
            <span className="grid grid-cols-2 gap-[3px]" aria-hidden>
              <span className="w-[5px] h-[5px] bg-d6-red" />
              <span className="w-[5px] h-[5px] bg-white" />
              <span className="w-[5px] h-[5px] bg-white" />
              <span className="w-[5px] h-[5px] bg-white" />
            </span>
          </button>
        </div>
      </header>
      <MobileIndex open={open} onClose={() => setOpen(false)} />
      <GridOverlay show={grid} />
      <div className="lg:pl-[264px] flex flex-col min-h-screen">
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ConceptsLink concept={CONCEPT} />
      <ChatAssistant skin={skin} paths={P} />
    </div>
  );
}
