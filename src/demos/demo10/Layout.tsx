import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { BookOpen, Building2, CornerDownLeft, Handshake, Home, Image, Info, Mail, Map, Newspaper, Search, Users, type LucideIcon } from 'lucide-react';
import { BRAND } from '../../data/brand';
import { ChatAssistant, type ChatSkin } from '../../components/common/ChatAssistant';
import { ConceptsLink } from '../../components/common/ConceptsLink';
import { SkipLink } from '../../components/common/SkipLink';
import { useOverlay } from '../../hooks/useOverlay';
import { CONCEPT, P, Shell, tile } from './ui';

const skin: ChatSkin = {
  accent: '#6b4eff',
  accentText: '#ffffff',
  surface: '#ffffff',
  panel: '#f4f1ff',
  ink: '#19142e',
  muted: '#6a6585',
  border: '#e6e1f7',
  userBubble: '#19142e',
  userText: '#ffffff',
  radius: '26px',
  font: 'Figtree, system-ui, sans-serif',
  launcher: 'circle',
  title: 'Lumen Assistant',
  launcherLabel: 'Ask',
};

const pages: { label: string; to: string; icon: LucideIcon; hint: string }[] = [
  { label: 'Home', to: P.home, icon: Home, hint: 'Overview' },
  { label: 'About', to: P.about, icon: Info, hint: 'Story, values, timeline' },
  { label: 'Companies', to: P.companies, icon: Building2, hint: 'The six group companies' },
  { label: 'Leadership', to: P.leadership, icon: Users, hint: 'Board and executives' },
  { label: 'Roadmap', to: P.roadmap, icon: Map, hint: '2026 – 2035' },
  { label: 'News', to: P.news, icon: Newspaper, hint: 'News, events, video' },
  { label: 'Gallery', to: P.gallery, icon: Image, hint: 'Photography' },
  { label: 'Resources', to: P.resources, icon: BookOpen, hint: 'Articles and papers' },
  { label: 'Partner', to: P.partner, icon: Handshake, hint: 'Five programmes' },
  { label: 'Contact', to: P.contact, icon: Mail, hint: 'Offices and enquiries' },
];

function Logo() {
  return (
    <Link to={P.home} className="flex items-center gap-2.5 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-d10-violet" aria-label={`${BRAND.name} home`}>
      <span className="grid grid-cols-2 gap-[3px] w-9 h-9 p-[5px] rounded-xl bg-d10-ink" aria-hidden>
        <span className="rounded-[4px] bg-d10-mint" />
        <span className="rounded-[4px] bg-d10-violet row-span-2" />
        <span className="rounded-[4px] bg-d10-peach" />
      </span>
      <span className="font-d10-display font-semibold text-[19px] tracking-[-0.03em] text-d10-ink">nexora</span>
    </Link>
  );
}

/** ⌘K command palette — the concept's navigation on small screens and a shortcut everywhere. */
function Palette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useOverlay<HTMLDivElement>(open, onClose);
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const results = useMemo(() => pages.filter((p) => `${p.label} ${p.hint}`.toLowerCase().includes(q.trim().toLowerCase())), [q]);
  useEffect(() => {
    if (open) setQ('');
  }, [open]);
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[66] grid place-items-start justify-center pt-[10vh] px-3">
          <motion.div className="absolute inset-0 bg-d10-ink/30 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden />
          <motion.div
            ref={ref}
            id="d10-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Go to page"
            className={`relative w-full max-w-[560px] ${tile} !bg-white/95 overflow-hidden`}
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (results[0]) {
                  navigate(results[0].to);
                  onClose();
                }
              }}
              className="flex items-center gap-3 px-5 h-16 border-b border-d10-line"
            >
              <Search size={19} className="text-d10-mute" aria-hidden />
              <label htmlFor="d10-palette" className="sr-only">
                Search pages
              </label>
              <input id="d10-palette" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Where would you like to go?" autoComplete="off" className="flex-1 bg-transparent outline-none text-[16px]" />
              <kbd className="hidden sm:inline-flex h-6 px-2 items-center rounded-md bg-d10-canvas text-[11px] font-semibold text-d10-mute">Esc</kbd>
            </form>
            <nav aria-label="Pages" className="max-h-[60vh] overflow-y-auto p-2">
              <ul>
                {results.map((p) => (
                  <li key={p.to}>
                    <NavLink end={p.to === P.home} to={p.to} onClick={onClose} className={({ isActive }) => `group flex items-center gap-3 px-3 h-14 rounded-2xl outline-none focus-visible:bg-d10-canvas hover:bg-d10-canvas ${isActive ? 'text-d10-violet' : 'text-d10-ink'}`}>
                      <span className="grid place-items-center w-9 h-9 rounded-xl bg-d10-canvas group-hover:bg-white">
                        <p.icon size={17} aria-hidden />
                      </span>
                      <span className="flex-1">
                        <span className="block font-semibold text-[15px]">{p.label}</span>
                        <span className="block text-[12.5px] text-d10-mute">{p.hint}</span>
                      </span>
                      <CornerDownLeft size={15} className="text-d10-mute opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden />
                    </NavLink>
                  </li>
                ))}
                {results.length === 0 && <li className="px-4 py-8 text-center text-d10-mute">No pages match “{q}”.</li>}
              </ul>
            </nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/** Desktop dock with macOS-style magnification. */
function Dock() {
  const mouseX = useMotionValue(Infinity);
  return (
    <nav aria-label="Main" data-preview-hide className="hidden xl:block fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <ul onMouseMove={(e) => mouseX.set(e.clientX)} onMouseLeave={() => mouseX.set(Infinity)} className="flex items-end gap-2 h-[66px] px-3 pb-2.5 rounded-[24px] bg-white/70 backdrop-blur-xl border border-white shadow-[0_20px_50px_-20px_rgba(74,47,214,0.45)]">
        {pages.map((p) => (
          <DockItem key={p.to} page={p} mouseX={mouseX} />
        ))}
      </ul>
    </nav>
  );
}

function DockItem({ page, mouseX }: { page: (typeof pages)[number]; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLLIElement>(null);
  const dist = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect();
    return r ? x - r.left - r.width / 2 : Infinity;
  });
  const size = useSpring(useTransform(dist, [-140, 0, 140], [44, 64, 44]), { stiffness: 260, damping: 20 });
  return (
    <motion.li ref={ref} style={{ width: size, height: size }} className="relative group">
      <NavLink
        end={page.to === P.home}
        to={page.to}
        aria-label={page.label}
        className={({ isActive }) => `grid place-items-center w-full h-full rounded-2xl transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-d10-violet ${isActive ? 'bg-d10-violet text-white' : 'bg-d10-canvas text-d10-ink hover:bg-white'}`}
      >
        <page.icon size={20} aria-hidden />
      </NavLink>
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-d10-ink text-white text-[12px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity" aria-hidden>
        {page.label}
      </span>
    </motion.li>
  );
}

function Footer() {
  return (
    <footer className="pb-6 xl:pb-28 pt-10">
      <Shell className="grid md:grid-cols-4 gap-4">
        <div className={`${tile} md:col-span-2 p-7 sm:p-9 !bg-d10-ink !border-d10-ink text-white`}>
          <p className="font-d10-display font-semibold text-[34px] sm:text-[44px] leading-[1.05] tracking-[-0.03em]">
            Let’s build what’s <span className="text-d10-mint">next.</span>
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to={P.partner} className="inline-flex items-center h-12 px-5 rounded-full bg-white text-d10-ink font-semibold hover:bg-d10-mint">
              Partner with us
            </Link>
            <Link to={P.contact} className="inline-flex items-center h-12 px-5 rounded-full border border-white/25 font-semibold hover:bg-white/10">
              Contact
            </Link>
          </div>
        </div>
        <nav aria-label="Footer" className={`${tile} p-7`}>
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-d10-mute">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-[14.5px] font-medium">
            {pages.slice(1).map((p) => (
              <li key={p.to}>
                <Link to={p.to} className="hover:text-d10-violet">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={`${tile} p-7 flex flex-col`}>
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-d10-mute">Reach us</p>
          <a href={`mailto:${BRAND.contact.email}`} className="mt-4 text-[14.5px] font-medium break-all hover:text-d10-violet">
            {BRAND.contact.email}
          </a>
          <a href={BRAND.contact.phoneHref} className="mt-1 text-[14.5px] font-medium hover:text-d10-violet">
            {BRAND.contact.phone}
          </a>
          <div className="mt-auto pt-5 flex flex-wrap gap-2">
            {BRAND.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-8 px-3 rounded-full bg-d10-canvas text-[12.5px] font-semibold hover:bg-d10-sky">
                {s.label}
                <span className="sr-only"> (placeholder, opens in new tab)</span>
              </a>
            ))}
          </div>
        </div>
        <div className="md:col-span-4 flex flex-col md:flex-row justify-between gap-2 px-2 pt-2 text-[12.5px] text-d10-mute">
          <p>© {new Date().getFullYear()} {BRAND.legalName}</p>
          <p>{BRAND.sampleNotice}</p>
        </div>
      </Shell>
    </footer>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="d10 relative isolate min-h-screen flex flex-col bg-d10-canvas font-d10-sans text-d10-ink text-[16px] selection:bg-d10-violet selection:text-white" data-demo="demo10">
      <SkipLink className="bg-d10-violet text-white rounded-full" />
      {/* Drifting gradient orbs behind everything */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <span className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full bg-[#c9b8ff] blur-[110px] opacity-70 motion-safe:animate-d10-orb" />
        <span className="absolute top-1/3 -right-40 w-[480px] h-[480px] rounded-full bg-[#ffd0e4] blur-[110px] opacity-70 motion-safe:animate-d10-orb [animation-delay:-6s]" />
        <span className="absolute -bottom-40 left-1/4 w-[520px] h-[520px] rounded-full bg-[#bff3de] blur-[120px] opacity-60 motion-safe:animate-d10-orb [animation-delay:-11s]" />
      </div>
      <header className="sticky top-0 z-50 pt-3">
        <Shell>
          <div className="flex items-center justify-between gap-3 h-16 pl-4 pr-2 rounded-full bg-white/70 backdrop-blur-xl border border-white shadow-[0_10px_30px_-20px_rgba(74,47,214,0.4)]">
            <Logo />
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="d10-menu" className="inline-flex items-center gap-2 h-11 pl-3.5 pr-2 rounded-full bg-d10-canvas text-[14px] font-medium text-d10-mute hover:text-d10-ink">
                <Search size={16} aria-hidden />
                <span className="xl:hidden text-d10-ink font-semibold">Menu</span>
                <span className="hidden xl:inline">Jump to…</span>
                <kbd className="hidden sm:inline-flex h-7 px-2 items-center rounded-full bg-white text-[11.5px] font-semibold">Ctrl K</kbd>
              </button>
              <Link to={P.partner} className="hidden sm:inline-flex items-center h-11 px-5 rounded-full bg-d10-violet text-white text-[14.5px] font-semibold hover:bg-d10-deep">
                Partner with us
              </Link>
            </div>
          </div>
        </Shell>
      </header>
      <Palette open={open} onClose={() => setOpen(false)} />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Dock />
      <ConceptsLink concept={CONCEPT} />
      <ChatAssistant skin={skin} paths={P} />
    </div>
  );
}
