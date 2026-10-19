import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { BRAND } from '../../data/brand';
import { ChatAssistant, type ChatSkin } from '../../components/common/ChatAssistant';
import { ConceptsLink } from '../../components/common/ConceptsLink';
import { SkipLink } from '../../components/common/SkipLink';
import { useOverlay } from '../../hooks/useOverlay';
import { Badge, Box, CONCEPT, P } from './ui';

const skin: ChatSkin = {
  accent: '#ffd43b',
  accentText: '#111111',
  surface: '#ffffff',
  panel: '#fff8e7',
  ink: '#111111',
  muted: '#5a5550',
  border: '#111111',
  userBubble: '#3d5afe',
  userText: '#ffffff',
  radius: '18px',
  font: '"Work Sans", system-ui, sans-serif',
  launcher: 'pill',
  title: 'Nexora Help Bot',
  launcherLabel: 'Ask us anything',
};

const nav = [
  { label: 'About', to: P.about, color: 'bg-d8-yellow' },
  { label: 'Companies', to: P.companies, color: 'bg-d8-pink' },
  { label: 'People', to: P.leadership, color: 'bg-d8-mint' },
  { label: 'Roadmap', to: P.roadmap, color: 'bg-d8-blue text-white' },
  { label: 'News', to: P.news, color: 'bg-d8-yellow' },
  { label: 'Gallery', to: P.gallery, color: 'bg-d8-pink' },
  { label: 'Resources', to: P.resources, color: 'bg-d8-mint' },
  { label: 'Contact', to: P.contact, color: 'bg-white' },
];

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to={P.home} onClick={onClick} className="group flex items-center gap-2 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-d8-blue rounded-xl" aria-label={`${BRAND.name} home`}>
      <span className="grid place-items-center w-11 h-11 bg-d8-yellow border-[3px] border-d8-ink rounded-xl shadow-[3px_3px_0_#111] font-d8-display font-extrabold text-[22px] transition-transform group-hover:-rotate-6">N</span>
      <span className="font-d8-display font-extrabold text-[22px] tracking-[-0.03em]">nexora</span>
    </Link>
  );
}

function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useOverlay<HTMLDivElement>(open, onClose);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="d8-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="xl:hidden fixed inset-0 z-[66] bg-d8-cream overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between p-4 border-b-[3px] border-d8-ink">
            <Logo onClick={onClose} />
            <button type="button" onClick={onClose} aria-label="Close menu" className="grid place-items-center w-12 h-12 bg-d8-pink border-[3px] border-d8-ink rounded-full shadow-[3px_3px_0_#111]">
              <X size={22} strokeWidth={2.75} />
            </button>
          </div>
          <nav aria-label="Mobile" className="p-4">
            <ul className="grid grid-cols-2 gap-3">
              {[...nav, { label: 'Partner with us', to: P.partner, color: 'bg-d8-ink text-d8-cream' }].map((n, i) => (
                <motion.li key={n.to} initial={{ opacity: 0, y: 20, rotate: i % 2 ? 3 : -3 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.035 }} className={i === nav.length ? 'col-span-2' : ''}>
                  <NavLink to={n.to} onClick={onClose} className={`flex items-end h-24 p-4 border-[3px] border-d8-ink rounded-2xl shadow-[4px_4px_0_#111] font-d8-display font-extrabold text-[22px] ${n.color}`}>
                    {n.label}
                  </NavLink>
                </motion.li>
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
    <footer className="bg-d8-blue text-white border-t-[3px] border-d8-ink overflow-hidden">
      <Box className="pt-16 pb-10">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr] gap-10 items-start">
          <div>
            <p className="font-d8-display font-extrabold text-[40px] sm:text-[56px] leading-[0.95] tracking-[-0.03em]">
              Got a big idea?
              <br />
              <span className="text-d8-yellow">Let’s build it.</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={P.partner} className="inline-flex items-center h-14 px-6 bg-d8-yellow text-d8-ink border-[3px] border-d8-ink rounded-full shadow-[4px_4px_0_#111] font-d8-display font-extrabold hover:-translate-y-0.5 transition-transform">
                Partner with us
              </Link>
              <Link to={P.contact} className="inline-flex items-center h-14 px-6 bg-white text-d8-ink border-[3px] border-d8-ink rounded-full shadow-[4px_4px_0_#111] font-d8-display font-extrabold hover:-translate-y-0.5 transition-transform">
                Say hi
              </Link>
            </div>
          </div>
          <nav aria-label="Footer">
            <p className="font-d8-mono text-[12px] uppercase tracking-wide text-d8-yellow">Pages</p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="font-d8-display font-bold text-[18px] hover:text-d8-yellow hover:underline underline-offset-4 decoration-[3px]">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-d8-mono text-[12px] uppercase tracking-wide text-d8-yellow">Contact</p>
            <ul className="mt-4 space-y-2 font-medium">
              <li>
                <a href={`mailto:${BRAND.contact.email}`} className="break-all hover:text-d8-yellow">
                  {BRAND.contact.email}
                </a>
              </li>
              <li>
                <a href={BRAND.contact.phoneHref} className="hover:text-d8-yellow">
                  {BRAND.contact.phone}
                </a>
              </li>
              <li className="flex flex-wrap gap-2 pt-2">
                {BRAND.social.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-9 px-3 bg-white text-d8-ink border-2 border-d8-ink rounded-full font-d8-mono text-[12px] font-bold hover:bg-d8-yellow">
                    {s.label}
                    <span className="sr-only"> (placeholder, opens in new tab)</span>
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-16 font-d8-display font-extrabold text-[15vw] lg:text-[200px] leading-[0.8] tracking-[-0.05em] text-transparent select-none" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.55)' }} aria-hidden>
          nexora
        </p>
        <div className="mt-8 pt-5 border-t-2 border-white/30 flex flex-col md:flex-row justify-between gap-3 font-d8-mono text-[12px] text-white/75">
          <p>© {new Date().getFullYear()} {BRAND.legalName}</p>
          <p>{BRAND.sampleNotice}</p>
        </div>
      </Box>
    </footer>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="d8 min-h-screen flex flex-col overflow-x-clip bg-d8-cream font-d8-sans text-d8-ink text-[16.5px] selection:bg-d8-yellow" data-demo="demo8">
      <SkipLink className="bg-d8-yellow text-d8-ink border-[3px] border-d8-ink rounded-full" />
      <header className="sticky top-0 z-50 bg-d8-cream border-b-[3px] border-d8-ink">
        <Box className="flex items-center justify-between gap-4 h-[76px]">
          <Logo />
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1.5">
              {nav.map((n) => (
                <li key={n.to}>
                  <NavLink
                    to={n.to}
                    className={({ isActive }) =>
                      `inline-flex items-center h-10 px-3.5 border-2 rounded-full font-d8-display font-bold text-[15px] transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-d8-blue ${
                        isActive ? `${n.color} border-d8-ink shadow-[3px_3px_0_#111]` : 'border-transparent hover:border-d8-ink hover:bg-white'
                      }`
                    }
                  >
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <Link to={P.partner} className="hidden sm:inline-flex items-center h-11 px-5 bg-d8-pink border-[3px] border-d8-ink rounded-full shadow-[3px_3px_0_#111] font-d8-display font-extrabold text-[15px] whitespace-nowrap hover:-translate-y-0.5 transition-transform">
              Partner up ↗
            </Link>
            <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="d8-menu" className="xl:hidden inline-flex items-center gap-2 h-11 px-4 bg-d8-yellow border-[3px] border-d8-ink rounded-full shadow-[3px_3px_0_#111] font-d8-display font-extrabold text-[15px]">
              Menu
              <span className="flex flex-col gap-1" aria-hidden>
                <span className="w-4 h-[3px] bg-d8-ink rounded" />
                <span className="w-4 h-[3px] bg-d8-ink rounded" />
              </span>
            </button>
          </div>
        </Box>
      </header>
      <Menu open={open} onClose={() => setOpen(false)} />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <div className="relative">
        <div className="absolute right-6 sm:right-16 -top-16 z-10 hidden md:block">
          <Badge text="NEXORA · GROUP OF SIX · SAMPLE BRAND · " center="✺" />
        </div>
        <Footer />
      </div>
      <ConceptsLink concept={CONCEPT} />
      <ChatAssistant skin={skin} paths={P} />
    </div>
  );
}
