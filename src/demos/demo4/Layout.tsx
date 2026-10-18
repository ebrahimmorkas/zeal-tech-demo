import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, LayoutGrid, X, Building2, Users, Map, Newspaper, Images, BookOpen, Handshake, Mail, Info } from 'lucide-react';
import { BRAND } from '../../data/brand';
import { ChatAssistant, type ChatSkin } from '../../components/common/ChatAssistant';
import { ConceptsLink } from '../../components/common/ConceptsLink';
import { SkipLink } from '../../components/common/SkipLink';
import { useOverlay } from '../../hooks/useOverlay';
import { CONCEPT, P, Shell, dots } from './ui';

const skin: ChatSkin = {
  accent: '#6170ff',
  accentText: '#ffffff',
  surface: '#0d1326',
  panel: '#080c18',
  ink: '#e8ecf8',
  muted: '#a9b3cc',
  border: '#24304f',
  userBubble: '#6170ff',
  userText: '#ffffff',
  radius: '20px',
  font: 'Inter, system-ui, sans-serif',
  launcher: 'circle',
  title: 'Nexora Assistant',
  launcherLabel: 'Assistant',
};

const groups = [
  {
    label: 'Group',
    items: [
      { label: 'About', to: P.about, icon: Info, note: 'Story, values, timeline' },
      { label: 'Leadership', to: P.leadership, icon: Users, note: 'Board and advisors' },
      { label: 'Roadmap', to: P.roadmap, icon: Map, note: 'Strategic horizons' },
    ],
  },
  {
    label: 'Insights',
    items: [
      { label: 'Newsroom', to: P.news, icon: Newspaper, note: 'News, events and video' },
      { label: 'Resources', to: P.resources, icon: BookOpen, note: 'Papers and articles' },
      { label: 'Gallery', to: P.gallery, icon: Images, note: 'Sites and people' },
    ],
  },
];
const flat = [
  { label: 'Business Units', to: P.companies, icon: Building2 },
  ...groups.flatMap((g) => g.items),
  { label: 'Partner With Us', to: P.partner, icon: Handshake },
  { label: 'Contact', to: P.contact, icon: Mail },
];

function Logo() {
  return (
    <Link to={P.home} className="flex items-center gap-2.5 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-d4-indigo" aria-label={`${BRAND.name} home`}>
      <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden>
        <defs>
          <linearGradient id="d4g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6170ff" />
            <stop offset="1" stopColor="#2fc9b4" />
          </linearGradient>
        </defs>
        <rect width="30" height="30" rx="9" fill="url(#d4g)" />
        <circle cx="9" cy="15" r="2.6" fill="#fff" />
        <circle cx="21" cy="9" r="2.6" fill="#fff" opacity=".85" />
        <circle cx="21" cy="21" r="2.6" fill="#fff" opacity=".85" />
        <path d="M9 15L21 9M9 15L21 21M21 9V21" stroke="#fff" strokeWidth="1.2" opacity=".7" />
      </svg>
      <span className="font-d4-display font-semibold text-[18px] tracking-[-0.02em] text-white">
        nexora<span className="text-d4-haze font-normal">.group</span>
      </span>
    </Link>
  );
}

function Capsule() {
  const [open, setOpen] = useState<string | null>(null);
  const { pathname } = useLocation();
  const t = useRef<number>();
  useEffect(() => setOpen(null), [pathname]);
  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        <li>
          <NavLink to={P.companies} className={({ isActive }) => `inline-flex items-center h-10 px-4 rounded-full text-[14px] transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-d4-haze hover:text-white'}`}>
            Business Units
          </NavLink>
        </li>
        {groups.map((g) => {
          const active = g.items.some((i) => pathname.startsWith(i.to));
          return (
            <li
              key={g.label}
              className="relative"
              onMouseEnter={() => {
                window.clearTimeout(t.current);
                setOpen(g.label);
              }}
              onMouseLeave={() => (t.current = window.setTimeout(() => setOpen(null), 150))}
            >
              <button
                type="button"
                aria-expanded={open === g.label}
                onClick={() => setOpen(open === g.label ? null : g.label)}
                onKeyDown={(e) => e.key === 'Escape' && setOpen(null)}
                className={`inline-flex items-center gap-1 h-10 px-4 rounded-full text-[14px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-d4-indigo ${active ? 'bg-white/10 text-white' : 'text-d4-haze hover:text-white'}`}
              >
                {g.label} <ChevronDown size={14} className={`transition-transform ${open === g.label ? 'rotate-180' : ''}`} aria-hidden />
              </button>
              <AnimatePresence>
                {open === g.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.16 }}
                    className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+14px)] w-[320px] p-2 rounded-2xl bg-d4-deep/95 backdrop-blur-xl ring-1 ring-white/10 shadow-2xl"
                  >
                    {g.items.map(({ label, to, icon: Icon, note }) => (
                      <Link key={to} to={to} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none">
                        <span className="grid place-items-center w-10 h-10 rounded-xl bg-white/5 ring-1 ring-white/10 text-d4-teal">
                          <Icon size={18} aria-hidden />
                        </span>
                        <span>
                          <span className="block text-[14px] text-white">{label}</span>
                          <span className="block text-[12.5px] text-d4-haze">{note}</span>
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
        <li>
          <NavLink to={P.contact} className={({ isActive }) => `inline-flex items-center h-10 px-4 rounded-full text-[14px] transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-d4-haze hover:text-white'}`}>
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

function Sheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useOverlay<HTMLDivElement>(open, onClose);
  return (
    <AnimatePresence>
      {open && (
        <div className="lg:hidden fixed inset-0 z-[66]" id="d4-sheet">
          <motion.div className="absolute inset-0 bg-d4-void/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="absolute bottom-0 inset-x-0 max-h-[88dvh] overflow-y-auto rounded-t-[28px] bg-d4-deep ring-1 ring-white/10 p-5 pb-8"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="mx-auto w-10 h-1.5 rounded-full bg-white/20" aria-hidden />
            <div className="mt-4 flex items-center justify-between">
              <Logo />
              <button type="button" onClick={onClose} aria-label="Close navigation" className="grid place-items-center w-10 h-10 rounded-full bg-white/5 text-white">
                <X size={18} />
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-6">
              <ul className="grid grid-cols-2 gap-2">
                <li className="col-span-2">
                  <Link to={P.home} onClick={onClose} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 ring-1 ring-white/10 text-white">
                    <LayoutGrid size={18} className="text-d4-teal" aria-hidden /> Overview
                  </Link>
                </li>
                {flat.map(({ label, to, icon: Icon }) => (
                  <li key={to}>
                    <NavLink to={to} onClick={onClose} className={({ isActive }) => `flex flex-col gap-3 p-4 rounded-2xl ring-1 h-full ${isActive ? 'bg-d4-indigo/20 ring-d4-indigo/60 text-white' : 'bg-white/5 ring-white/10 text-white/90'}`}>
                      <Icon size={18} className="text-d4-teal" aria-hidden />
                      <span className="text-[14px]">{label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="relative bg-d4-void text-white overflow-hidden">
      <div className="absolute inset-0" style={dots} aria-hidden />
      <Shell className="relative py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-d4-haze text-[15px] leading-relaxed">{BRAND.tagline}</p>
            <p className="mt-6 font-d4-mono text-[12px] text-d4-haze">
              <span className="inline-block w-2 h-2 rounded-full bg-d4-teal mr-2 animate-pulse" aria-hidden />
              all systems: demo mode
            </p>
          </div>
          {[
            { h: 'Group', l: [['About', P.about], ['Business Units', P.companies], ['Leadership', P.leadership], ['Roadmap', P.roadmap]] },
            { h: 'Insights', l: [['Newsroom', P.news], ['Resources', P.resources], ['Gallery', P.gallery]] },
            { h: 'Connect', l: [['Partner With Us', P.partner], ['Contact', P.contact]] },
          ].map((c) => (
            <div key={c.h}>
              <p className="font-d4-mono text-[12px] text-d4-teal">{c.h.toLowerCase()}/</p>
              <ul className="mt-4 space-y-2.5 text-[15px] text-d4-haze">
                {c.l.map(([l, to]) => (
                  <li key={to}>
                    <Link to={to} className="hover:text-white">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 grid gap-4 md:grid-cols-[1fr_auto] text-[13px] text-d4-haze">
          <p>
            {BRAND.contact.email} · {BRAND.contact.phone} · {BRAND.offices[0].lines.join(', ')}
          </p>
          <ul className="flex gap-4">
            {BRAND.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {s.label}
                  <span className="sr-only"> (placeholder, opens in new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="md:col-span-2 font-d4-mono text-[11.5px] text-d4-haze/70">
            © {new Date().getFullYear()} {BRAND.legalName} · {BRAND.sampleNotice}
          </p>
        </div>
      </Shell>
    </footer>
  );
}

export default function Layout() {
  const [sheet, setSheet] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setSheet(false), [pathname]);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  return (
    <div className="d4 min-h-screen flex flex-col bg-d4-mist font-d4-sans text-d4-deep text-[16px] antialiased" data-demo="demo4">
      <SkipLink className="bg-d4-indigo text-white rounded-full" />
      <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-5 pt-3 sm:pt-4">
        <div className={`mx-auto max-w-[1160px] flex items-center justify-between gap-4 h-[60px] pl-4 pr-2 rounded-full ring-1 transition-all duration-300 ${scrolled ? 'bg-d4-void/85 ring-white/10 backdrop-blur-xl shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)]' : 'bg-d4-void/40 ring-white/10 backdrop-blur-md'}`}>
          <Logo />
          <Capsule />
          <div className="flex items-center gap-2">
            <Link to={P.partner} className="hidden sm:inline-flex items-center h-11 px-5 rounded-full text-[14px] font-medium text-white bg-[linear-gradient(#0d1326,#0d1326)_padding-box,linear-gradient(90deg,#6170ff,#2fc9b4)_border-box] border border-transparent hover:bg-[linear-gradient(#162042,#162042)_padding-box,linear-gradient(90deg,#6170ff,#2fc9b4)_border-box]">
              Partner with us
            </Link>
            <button type="button" onClick={() => setSheet(true)} aria-expanded={sheet} aria-controls="d4-sheet" aria-label="Open navigation" className="lg:hidden grid place-items-center w-11 h-11 rounded-full bg-white/10 text-white">
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </header>
      <Sheet open={sheet} onClose={() => setSheet(false)} />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ConceptsLink concept={CONCEPT} />
      <ChatAssistant skin={skin} paths={P} />
    </div>
  );
}
