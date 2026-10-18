import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { BRAND } from '../../data/brand';
import { ChatAssistant, type ChatSkin } from '../../components/common/ChatAssistant';
import { ConceptsLink } from '../../components/common/ConceptsLink';
import { SkipLink } from '../../components/common/SkipLink';
import { useOverlay } from '../../hooks/useOverlay';
import { CONCEPT, P, Page, ROMAN } from './ui';

const skin: ChatSkin = {
  accent: '#6e2a20',
  accentText: '#f4efe6',
  surface: '#faf7f1',
  panel: '#f4efe6',
  ink: '#1c1a17',
  muted: '#6f665a',
  border: '#cfc4b1',
  userBubble: '#1c1a17',
  userText: '#f4efe6',
  radius: '2px',
  font: 'Manrope, system-ui, sans-serif',
  launcher: 'pill',
  title: 'The Nexora Concierge',
  launcherLabel: 'Enquire',
};

const nav = [
  { label: 'The Group', to: P.about },
  { label: 'Companies', to: P.companies },
  { label: 'Leadership', to: P.leadership },
  { label: 'Horizons', to: P.roadmap },
  { label: 'Journal', to: P.news },
  { label: 'Portfolio', to: P.gallery },
  { label: 'Library', to: P.resources },
  { label: 'Partnerships', to: P.partner },
  { label: 'Correspondence', to: P.contact },
];

function Wordmark({ size = 'lg' }: { size?: 'lg' | 'sm' }) {
  return (
    <Link to={P.home} className="inline-block text-center focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-d3-oxblood" aria-label={`${BRAND.name} home`}>
      <span className={`block font-d3-serif font-light tracking-[0.18em] text-d3-ink ${size === 'lg' ? 'text-[34px] sm:text-[46px]' : 'text-[24px]'}`}>
        NEX<em className="font-light text-d3-oxblood">O</em>RA
      </span>
      {size === 'lg' && <span className="block mt-1 font-d3-sans text-[10px] font-semibold uppercase tracking-[0.5em] text-d3-taupe">Group · Est. MCMXCVIII*</span>}
    </Link>
  );
}

function IndexPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useOverlay<HTMLDivElement>(open, onClose);
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[66]" id="d3-index">
          <motion.div className="absolute inset-0 bg-d3-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label="Index"
            className="absolute right-0 top-0 bottom-0 w-full max-w-[520px] bg-d3-paper overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between px-8 h-20 border-b border-d3-rule">
              <p className="font-d3-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-d3-oxblood">Index</p>
              <button type="button" onClick={onClose} aria-label="Close index" className="p-2 -mr-2 hover:text-d3-oxblood">
                <X size={24} strokeWidth={1.3} />
              </button>
            </div>
            <nav aria-label="Index" className="px-8 py-8">
              <ol>
                <li className="border-b border-d3-rule">
                  <Link to={P.home} onClick={onClose} className="flex items-baseline gap-5 py-4 hover:text-d3-oxblood">
                    <span className="w-8 font-d3-serif italic text-[15px] text-d3-taupe">—</span>
                    <span className="font-d3-serif font-light text-[32px]">Cover</span>
                  </Link>
                </li>
                {nav.map((n, i) => (
                  <li key={n.to} className="border-b border-d3-rule">
                    <NavLink to={n.to} onClick={onClose} className={({ isActive }) => `flex items-baseline gap-5 py-4 hover:text-d3-oxblood ${isActive ? 'text-d3-oxblood' : ''}`}>
                      <span className="w-8 font-d3-serif italic text-[15px] text-d3-taupe">{ROMAN[i]}</span>
                      <span className="font-d3-serif font-light text-[32px]">{n.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ol>
              <p className="mt-10 font-d3-serif italic text-d3-taupe">{BRAND.contact.email}</p>
            </nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="bg-d3-ink text-d3-paper mt-auto">
      <Page className="pt-24 pb-10">
        <p className="text-center font-d3-serif font-light text-[18vw] sm:text-[160px] leading-none tracking-[0.06em]">
          NEX<em className="text-[#c48b7d]">O</em>RA
        </p>
        <p className="mt-6 text-center font-d3-serif italic text-[20px] text-d3-paper/70 max-w-xl mx-auto">{BRAND.tagline}</p>
        <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 border-t border-d3-paper/15 pt-10 text-[14px]">
          <div>
            <p className="font-d3-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c48b7d]">Headquarters</p>
            <address className="mt-4 not-italic text-d3-paper/70 leading-relaxed">{BRAND.offices[0].lines.join(', ')}</address>
          </div>
          <div>
            <p className="font-d3-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c48b7d]">Correspondence</p>
            <p className="mt-4 text-d3-paper/70">
              <a href={`mailto:${BRAND.contact.email}`} className="hover:text-d3-paper break-all">
                {BRAND.contact.email}
              </a>
            </p>
            <p className="text-d3-paper/70">
              <a href={BRAND.contact.phoneHref} className="hover:text-d3-paper">
                {BRAND.contact.phone}
              </a>
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="font-d3-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c48b7d]">Contents</p>
            <ul className="mt-4 columns-2 gap-6 text-d3-paper/70 space-y-1.5">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-d3-paper">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-d3-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c48b7d]">Elsewhere</p>
            <ul className="mt-4 space-y-1.5 text-d3-paper/70">
              {BRAND.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="font-d3-serif italic text-[17px] hover:text-d3-paper">
                    {s.label}
                    <span className="sr-only"> (placeholder link, opens in new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col sm:flex-row justify-between gap-3 font-d3-serif italic text-[13px] text-d3-paper/45">
          <p>© {new Date().getFullYear()} {BRAND.legalName}</p>
          <p>* {BRAND.sampleNotice}</p>
        </div>
      </Page>
    </footer>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const f = () => setCompact(window.scrollY > 180);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  return (
    <div className="d3 min-h-screen flex flex-col bg-d3-paper text-d3-ink font-d3-sans text-[16.5px] leading-[1.7]" data-demo="demo3">
      <SkipLink className="bg-d3-oxblood text-d3-paper" />

      {/* Masthead */}
      <header className="border-b border-d3-rule">
        <Page>
          <div className="flex items-center justify-between h-11 border-b border-d3-rule font-d3-serif italic text-[13px] text-d3-taupe">
            <span>Vol. I — Sample Edition</span>
            <span className="hidden sm:inline">A diversified group of enterprises</span>
            <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="d3-index" className="lg:hidden not-italic font-d3-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-d3-ink hover:text-d3-oxblood">
              Index ☰
            </button>
            <Link to={P.contact} className="hidden lg:inline not-italic font-d3-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-d3-ink hover:text-d3-oxblood">
              Enquiries
            </Link>
          </div>
          <div className="py-7 sm:py-9 text-center">
            <Wordmark />
          </div>
          <nav aria-label="Main" className="hidden lg:block border-t border-d3-rule">
            <ul className="flex justify-center">
              {nav.map((n) => (
                <li key={n.to}>
                  <NavLink
                    to={n.to}
                    className={({ isActive }) =>
                      `relative block px-4 xl:px-5 py-4 font-d3-sans text-[11.5px] font-semibold uppercase tracking-[0.22em] transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-4 focus-visible:outline-d3-oxblood ${isActive ? 'text-d3-oxblood' : 'text-d3-ink/70 hover:text-d3-ink'}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {n.label}
                        {isActive && <span className="absolute left-1/2 -translate-x-1/2 bottom-1.5 font-d3-serif italic text-[12px] leading-none normal-case tracking-normal" aria-hidden>❦</span>}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </Page>
      </header>

      {/* Compact sticky bar */}
      <div className={`fixed top-0 inset-x-0 z-50 bg-d3-paper/95 backdrop-blur border-b border-d3-rule transition-transform duration-500 ${compact ? 'translate-y-0' : '-translate-y-full'}`} aria-hidden={!compact}>
        <Page className="flex items-center justify-between h-16">
          <Wordmark size="sm" />
          <div className="flex items-center gap-6">
            <Link to={P.partner} tabIndex={compact ? 0 : -1} className="hidden sm:inline font-d3-sans text-[11px] font-semibold uppercase tracking-[0.22em] hover:text-d3-oxblood">
              Partnerships
            </Link>
            <button type="button" tabIndex={compact ? 0 : -1} onClick={() => setOpen(true)} className="font-d3-sans text-[11px] font-semibold uppercase tracking-[0.22em] border border-d3-ink/30 h-10 px-5 hover:bg-d3-ink hover:text-d3-paper transition-colors">
              Index
            </button>
          </div>
        </Page>
      </div>

      <IndexPanel open={open} onClose={() => setOpen(false)} />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ConceptsLink concept={CONCEPT} />
      <ChatAssistant skin={skin} paths={P} />
    </div>
  );
}
