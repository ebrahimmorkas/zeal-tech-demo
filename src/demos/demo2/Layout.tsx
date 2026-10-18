import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { BRAND } from '../../data/brand';
import { ChatAssistant, type ChatSkin } from '../../components/common/ChatAssistant';
import { ConceptsLink } from '../../components/common/ConceptsLink';
import { SkipLink } from '../../components/common/SkipLink';
import { useOverlay } from '../../hooks/useOverlay';
import { CONCEPT, P, Wrap } from './ui';

const skin: ChatSkin = {
  accent: '#ff5a1f',
  accentText: '#ffffff',
  surface: '#ffffff',
  panel: '#eceff2',
  ink: '#121519',
  muted: '#5f6b78',
  border: '#d3d8de',
  userBubble: '#121519',
  userText: '#ffffff',
  radius: '0px',
  font: 'Barlow, system-ui, sans-serif',
  launcher: 'square',
  title: 'Nexora Operations Desk',
  launcherLabel: 'ASK NEXORA',
};

const primary = [
  { label: 'About', to: P.about },
  { label: 'Companies', to: P.companies },
  { label: 'Leadership', to: P.leadership },
  { label: 'Roadmap', to: P.roadmap },
  { label: 'Media', to: P.news },
  { label: 'Contact', to: P.contact },
];

const all = [
  { label: 'Home', to: P.home },
  { label: 'About Us', to: P.about },
  { label: 'Group Companies', to: P.companies },
  { label: 'Partner With Us', to: P.partner },
  { label: 'News & Videos', to: P.news },
  { label: 'Future Roadmap', to: P.roadmap },
  { label: 'Gallery', to: P.gallery },
  { label: 'Leadership', to: P.leadership },
  { label: 'Resource Centre', to: P.resources },
  { label: 'Contact', to: P.contact },
];

function Logo() {
  return (
    <Link to={P.home} className="flex items-center gap-3 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-d2-signal" aria-label={`${BRAND.name} home`}>
      <span className="grid place-items-center w-11 h-11 bg-d2-signal text-white font-d2-display font-extrabold text-[22px] leading-none">NX</span>
      <span className="leading-none">
        <span className="block font-d2-display font-bold text-[26px] tracking-[0.06em] text-white">{BRAND.wordmark}</span>
        <span className="block font-d2-mono text-[10px] tracking-[0.3em] text-white/60 mt-0.5">{BRAND.descriptor} · EST. 1998*</span>
      </span>
    </Link>
  );
}

function Overlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useOverlay<HTMLDivElement>(open, onClose);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="d2-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site index"
          className="fixed inset-0 z-[66] bg-d2-graphite text-white overflow-y-auto"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1] }}
        >
          <Wrap className="flex items-center justify-between h-[88px] border-b border-white/10">
            <Logo />
            <button type="button" onClick={onClose} className="flex items-center gap-3 h-12 px-4 font-d2-display uppercase text-[17px] tracking-[0.08em] border border-white/30 hover:bg-white hover:text-d2-graphite">
              Close <X size={18} aria-hidden />
            </button>
          </Wrap>
          <Wrap className="grid lg:grid-cols-[1.6fr_1fr] gap-12 py-10 lg:py-14">
            <nav aria-label="Site index">
              <ol className="grid sm:grid-cols-2 gap-x-10">
                {all.map((l, i) => (
                  <li key={l.to} className="border-b border-white/10">
                    <NavLink
                      to={l.to}
                      end={l.to === P.home}
                      onClick={onClose}
                      className={({ isActive }) => `group flex items-baseline gap-4 py-4 ${isActive ? 'text-d2-signal' : 'hover:text-d2-signal'}`}
                    >
                      <span className="font-d2-mono text-[12px] text-white/40 w-6">{String(i).padStart(2, '0')}</span>
                      <span className="font-d2-display font-bold uppercase text-[34px] sm:text-[42px] leading-none">{l.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ol>
            </nav>
            <aside className="space-y-8">
              <img src="/images/plant-pipes-sm.jpg" alt="" className="w-full aspect-[16/10] object-cover grayscale" />
              <div className="font-d2-mono text-[13px] text-white/70 space-y-2">
                <p className="text-d2-signal">// CORPORATE OFFICE</p>
                {BRAND.offices[0].lines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
                <p className="pt-2">{BRAND.contact.email}</p>
                <p>{BRAND.contact.phone}</p>
              </div>
            </aside>
          </Wrap>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="bg-d2-graphite text-white">
      <Wrap className="py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4 border-b border-white/10">
        <div className="lg:col-span-2">
          <p className="font-d2-mono text-[12px] tracking-[0.14em] text-d2-signal">// HEADQUARTERS</p>
          <address className="mt-4 not-italic font-d2-display uppercase text-[28px] leading-tight">
            {BRAND.offices[0].lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <p className="mt-4 font-d2-mono text-[13px] text-white/60">
            <a href={`mailto:${BRAND.contact.email}`} className="hover:text-d2-signal break-all">
              {BRAND.contact.email}
            </a>{' '}
            ·{' '}
            <a href={BRAND.contact.phoneHref} className="hover:text-d2-signal">
              {BRAND.contact.phone}
            </a>
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="font-d2-mono text-[12px] tracking-[0.14em] text-white/40">// INDEX</p>
          <ul className="mt-4 grid grid-cols-2 gap-y-2 gap-x-6 text-[15px] text-white/75">
            {all.slice(1).map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-d2-signal">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-d2-mono text-[12px] tracking-[0.14em] text-white/40">// CHANNELS</p>
          <ul className="mt-4 space-y-2">
            {BRAND.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between border-b border-white/10 py-2 font-d2-display uppercase text-[18px] tracking-[0.04em] hover:text-d2-signal">
                  {s.label} <ArrowUpRight size={16} aria-hidden />
                  <span className="sr-only">(placeholder link, opens in new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Wrap>
      <Wrap className="py-6 flex flex-col md:flex-row gap-3 justify-between font-d2-mono text-[11px] uppercase tracking-[0.1em] text-white/40">
        <p>© {new Date().getFullYear()} {BRAND.legalName}</p>
        <p>* {BRAND.sampleNotice}</p>
      </Wrap>
      <div className="overflow-hidden" aria-hidden>
        <p className="font-d2-display font-extrabold uppercase text-[22vw] leading-[0.78] tracking-[-0.02em] text-white/[0.04] whitespace-nowrap -mb-[2vw] select-none">{BRAND.wordmark}</p>
      </div>
    </footer>
  );
}

export default function Layout() {
  const [menu, setMenu] = useState(false);
  const [solid, setSolid] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 60);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  return (
    <div className="d2 min-h-screen flex flex-col bg-white font-d2-sans text-d2-graphite text-[16px]" data-demo="demo2">
      <SkipLink className="bg-d2-signal text-white" />
      <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${solid ? 'bg-d2-graphite/95 backdrop-blur border-b border-white/10' : 'bg-gradient-to-b from-black/50 to-transparent'}`}>
        <Wrap className="flex items-center justify-between gap-6 h-[88px]">
          <Logo />
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex">
              {primary.map((l, i) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `relative flex flex-col justify-center h-[88px] px-5 font-d2-display uppercase text-[17px] font-semibold tracking-[0.06em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-[18px] focus-visible:outline-d2-signal ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`font-d2-mono text-[10px] leading-none mb-1 ${isActive ? 'text-d2-signal' : 'text-white/40'}`}>0{i + 1}</span>
                        {l.label}
                        {isActive && <span className="absolute left-5 right-5 top-0 h-[3px] bg-d2-signal" aria-hidden />}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <Link to={P.partner} className="hidden sm:inline-flex items-center gap-3 h-12 px-5 bg-d2-signal text-white font-d2-display uppercase text-[16px] font-semibold tracking-[0.06em] hover:bg-d2-signaldark">
              Partner Program <ArrowUpRight size={17} aria-hidden />
            </Link>
            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-expanded={menu}
              aria-controls="d2-menu"
              className="flex items-center gap-3 h-12 px-4 border border-white/30 text-white font-d2-display uppercase text-[16px] tracking-[0.08em] hover:bg-white hover:text-d2-graphite transition-colors"
            >
              <span className="flex flex-col gap-[5px]" aria-hidden>
                <span className="block w-5 h-[2px] bg-current" />
                <span className="block w-5 h-[2px] bg-current" />
                <span className="block w-3 h-[2px] bg-current" />
              </span>
              Menu
            </button>
          </div>
        </Wrap>
      </header>
      <Overlay open={menu} onClose={() => setMenu(false)} />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ConceptsLink concept={CONCEPT} />
      <ChatAssistant skin={skin} paths={P} />
    </div>
  );
}
