import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { BRAND } from '../../data/brand';
import { ChatAssistant, type ChatSkin } from '../../components/common/ChatAssistant';
import { ConceptsLink } from '../../components/common/ConceptsLink';
import { SkipLink } from '../../components/common/SkipLink';
import { useOverlay } from '../../hooks/useOverlay';
import { Box, CONCEPT, P } from './ui';

const skin: ChatSkin = {
  accent: '#0f766e',
  accentText: '#ffffff',
  surface: '#ffffff',
  panel: '#fbf7f1',
  ink: '#14302d',
  muted: '#55706c',
  border: '#e6e1d8',
  userBubble: '#e8664a',
  userText: '#ffffff',
  radius: '26px',
  font: '"Plus Jakarta Sans", system-ui, sans-serif',
  launcher: 'pill',
  title: 'Hi! I’m the Nexora helper',
  launcherLabel: 'Chat with us',
};

const nav = [
  { label: 'Who we are', to: P.about },
  { label: 'Our companies', to: P.companies },
  { label: 'People', to: P.leadership },
  { label: 'Stories', to: P.news },
  { label: 'Our journey', to: P.roadmap },
  { label: 'Knowledge', to: P.resources },
  { label: 'Gallery', to: P.gallery },
];

function Logo() {
  return (
    <Link to={P.home} className="flex items-center gap-2.5 rounded-full focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-d5-sun" aria-label={`${BRAND.name} home`}>
      <svg width="38" height="38" viewBox="0 0 38 38" aria-hidden>
        <circle cx="14" cy="19" r="10" fill="none" stroke="#0f766e" strokeWidth="4" />
        <circle cx="24" cy="19" r="10" fill="none" stroke="#e8664a" strokeWidth="4" />
        <circle cx="19" cy="19" r="3" fill="#f4b740" />
      </svg>
      <span className="font-d5-sans font-extrabold text-[21px] tracking-[-0.02em] text-d5-ink whitespace-nowrap">
        Nexora <span className="font-semibold text-d5-mute">Group</span>
      </span>
    </Link>
  );
}

function MobilePanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useOverlay<HTMLDivElement>(open, onClose);
  return (
    <AnimatePresence>
      {open && (
        <div className="xl:hidden fixed inset-0 z-[66]" id="d5-menu">
          <motion.div className="absolute inset-0 bg-d5-ink/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute top-3 left-3 right-3 max-h-[calc(100dvh-24px)] overflow-y-auto rounded-[32px] bg-white p-5 shadow-2xl"
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button type="button" onClick={onClose} aria-label="Close menu" className="grid place-items-center w-11 h-11 rounded-full bg-d5-sand">
                <X size={20} />
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-6">
              <ul className="grid sm:grid-cols-2 gap-2">
                <li>
                  <NavLink to={P.home} end onClick={onClose} className={({ isActive }) => `block px-5 py-4 rounded-2xl text-[17px] font-bold ${isActive ? 'bg-d5-teal text-white' : 'bg-d5-sand text-d5-ink'}`}>
                    Home
                  </NavLink>
                </li>
                {[...nav, { label: 'Contact', to: P.contact }].map((n) => (
                  <li key={n.to}>
                    <NavLink to={n.to} onClick={onClose} className={({ isActive }) => `block px-5 py-4 rounded-2xl text-[17px] font-bold ${isActive ? 'bg-d5-teal text-white' : 'bg-d5-sand text-d5-ink'}`}>
                      {n.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <Link to={P.partner} onClick={onClose} className="mt-4 flex items-center justify-between px-6 h-14 rounded-full bg-d5-coral text-white font-bold">
                Partner with us <ArrowRight size={18} aria-hidden />
              </Link>
            </nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="mt-16 bg-d5-ink text-white rounded-t-[40px] sm:rounded-t-[56px]">
      <Box className="pt-16 pb-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="font-d5-sans font-extrabold text-[30px] leading-tight tracking-[-0.02em]">
              Let’s build something <span className="text-d5-sun">good</span> together.
            </p>
            <Link to={P.partner} className="mt-6 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-d5-coral font-bold hover:bg-[#d4553a]">
              Become a partner <ArrowRight size={17} aria-hidden />
            </Link>
          </div>
          <nav aria-label="Footer: explore">
            <p className="text-[14px] font-bold text-d5-sun">Explore</p>
            <ul className="mt-4 space-y-2.5 text-white/75">
              {nav.slice(0, 4).map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer: more">
            <p className="text-[14px] font-bold text-d5-sun">More</p>
            <ul className="mt-4 space-y-2.5 text-white/75">
              {[...nav.slice(4), { label: 'Partner with us', to: P.partner }, { label: 'Contact', to: P.contact }].map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-[14px] font-bold text-d5-sun">Say hello</p>
            <ul className="mt-4 space-y-2.5 text-white/75">
              <li>
                <a href={`mailto:${BRAND.contact.email}`} className="hover:text-white break-all">
                  {BRAND.contact.email}
                </a>
              </li>
              <li>
                <a href={BRAND.contact.phoneHref} className="hover:text-white">
                  {BRAND.contact.phone}
                </a>
              </li>
              <li className="flex gap-2 pt-2">
                {BRAND.social.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-9 px-3.5 rounded-full bg-white/10 text-[13px] font-semibold hover:bg-white/20">
                    {s.label}
                    <span className="sr-only"> (placeholder, opens in new tab)</span>
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-[13px] text-white/50">
          <p>© {new Date().getFullYear()} {BRAND.legalName}</p>
          <p>{BRAND.sampleNotice}</p>
        </div>
      </Box>
    </footer>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [ribbon, setRibbon] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 10);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  return (
    <div className="d5 min-h-screen flex flex-col bg-white font-d5-sans text-d5-ink text-[16.5px]" data-demo="demo5">
      <SkipLink className="bg-d5-teal text-white rounded-full" />
      {ribbon && (
        <div className="bg-d5-teal text-white text-[14px]">
          <Box className="flex items-center justify-center gap-3 h-11 relative">
            <span className="hidden sm:inline">🤝</span>
            <span className="truncate">
              We’re welcoming new partners across five programmes.{' '}
              <Link to={P.partner} className="font-bold underline underline-offset-4 decoration-d5-sun">
                Explore partnerships
              </Link>
            </span>
            <button type="button" onClick={() => setRibbon(false)} aria-label="Dismiss announcement" className="absolute right-3 sm:right-8 grid place-items-center w-7 h-7 rounded-full hover:bg-white/15">
              <X size={15} />
            </button>
          </Box>
        </div>
      )}
      <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow ${scrolled ? 'shadow-[0_6px_24px_-12px_rgba(20,48,45,0.25)]' : ''}`}>
        <Box className="flex items-center justify-between gap-4 h-[78px]">
          <Logo />
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {nav.map((n) => (
                <li key={n.to}>
                  <NavLink
                    to={n.to}
                    className={({ isActive }) =>
                      `inline-flex items-center h-11 px-3 2xl:px-4 rounded-full text-[14.5px] font-semibold whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-d5-sun ${isActive ? 'bg-d5-sky text-d5-teal' : 'text-d5-ink/75 hover:bg-d5-sand hover:text-d5-ink'}`
                    }
                  >
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <Link to={P.contact} className="hidden md:inline-flex xl:hidden 2xl:inline-flex items-center h-11 px-5 rounded-full text-[15px] font-bold text-d5-teal whitespace-nowrap hover:bg-d5-sky">
              Contact
            </Link>
            <Link to={P.partner} className="hidden sm:inline-flex items-center gap-2 h-11 px-5 rounded-full bg-d5-coral text-white text-[15px] font-bold whitespace-nowrap hover:bg-[#d4553a] shadow-[0_8px_20px_-10px_rgba(232,102,74,0.8)]">
              Partner with us
            </Link>
            <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="d5-menu" className="xl:hidden inline-flex items-center gap-2 h-11 px-4 rounded-full bg-d5-sand font-bold text-[15px]">
              <Menu size={19} aria-hidden /> Menu
            </button>
          </div>
        </Box>
      </header>
      <MobilePanel open={open} onClose={() => setOpen(false)} />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ConceptsLink concept={CONCEPT} />
      <ChatAssistant skin={skin} paths={P} />
    </div>
  );
}
