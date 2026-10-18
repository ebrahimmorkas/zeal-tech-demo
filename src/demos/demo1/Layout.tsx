import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Mail, Menu, Phone, X, ArrowUpRight } from 'lucide-react';
import { BRAND } from '../../data/brand';
import { groupCompanies } from '../../data/groupCompanies';
import { ChatAssistant, type ChatSkin } from '../../components/common/ChatAssistant';
import { ConceptsLink } from '../../components/common/ConceptsLink';
import { SkipLink } from '../../components/common/SkipLink';
import { useOverlay } from '../../hooks/useOverlay';
import { Container, P, CONCEPT } from './ui';

const chatSkin: ChatSkin = {
  accent: '#0f2340',
  accentText: '#ffffff',
  surface: '#ffffff',
  panel: '#f7f5f0',
  ink: '#1b2433',
  muted: '#5d6675',
  border: '#e2ddd3',
  userBubble: '#a8844f',
  userText: '#ffffff',
  radius: '4px',
  font: '"Source Sans 3", system-ui, sans-serif',
  launcher: 'square',
  title: 'Nexora Enquiry Assistant',
  launcherLabel: 'Ask a question',
};

type Item = { label: string; to: string; children?: { label: string; to: string; note?: string }[]; mega?: boolean };
const NAV: Item[] = [
  {
    label: 'About',
    to: P.about,
    children: [
      { label: 'About Us', to: P.about, note: 'Story, vision and values' },
      { label: 'Leadership', to: P.leadership, note: 'Board and advisors' },
      { label: 'Future Roadmap', to: P.roadmap, note: 'Strategic direction' },
    ],
  },
  { label: 'Group Companies', to: P.companies, mega: true },
  {
    label: 'Media',
    to: P.news,
    children: [
      { label: 'News & Videos', to: P.news, note: 'Announcements and events' },
      { label: 'Gallery', to: P.gallery, note: 'Facilities, projects and events' },
      { label: 'Resource Centre', to: P.resources, note: 'Insights and whitepapers' },
    ],
  },
  { label: 'Partner With Us', to: P.partner },
  { label: 'Contact', to: P.contact },
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to={P.home} className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-d1-gold" aria-label={`${BRAND.name} — home`}>
      <span className={`grid place-items-center w-11 h-11 border ${light ? 'border-d1-goldlight text-d1-goldlight' : 'border-d1-gold text-d1-gold'} font-d1-serif text-[24px] font-semibold`}>N</span>
      <span className="leading-none">
        <span className={`block font-d1-serif text-[24px] font-semibold tracking-[0.12em] ${light ? 'text-white' : 'text-d1-navy'}`}>{BRAND.wordmark}</span>
        <span className={`block mt-1 text-[10px] font-semibold tracking-[0.5em] ${light ? 'text-white/60' : 'text-d1-muted'}`}>{BRAND.descriptor}</span>
      </span>
    </Link>
  );
}

function DesktopNav() {
  const [open, setOpen] = useState<string | null>(null);
  const location = useLocation();
  const timer = useRef<number>();
  useEffect(() => setOpen(null), [location.pathname]);

  const isActive = (item: Item) =>
    location.pathname.startsWith(item.to) || !!item.children?.some((c) => location.pathname.startsWith(c.to));

  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center">
        {NAV.map((item) => {
          const hasMenu = !!item.children || item.mega;
          const active = isActive(item);
          return (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => {
                window.clearTimeout(timer.current);
                hasMenu && setOpen(item.label);
              }}
              onMouseLeave={() => {
                timer.current = window.setTimeout(() => setOpen(null), 120);
              }}
            >
              {hasMenu ? (
                <button
                  type="button"
                  aria-expanded={open === item.label}
                  aria-haspopup="true"
                  onClick={() => setOpen(open === item.label ? null : item.label)}
                  onKeyDown={(e) => e.key === 'Escape' && setOpen(null)}
                  className={`relative flex items-center gap-1.5 h-[88px] px-4 xl:px-5 text-[14px] font-semibold uppercase tracking-[0.12em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-8 focus-visible:outline-d1-gold ${active ? 'text-d1-navy' : 'text-d1-ink/75 hover:text-d1-navy'}`}
                >
                  {item.label}
                  <ChevronDown size={14} className={`transition-transform ${open === item.label ? 'rotate-180' : ''}`} aria-hidden />
                  {active && <span className="absolute left-4 right-4 xl:left-5 xl:right-5 bottom-6 h-px bg-d1-gold" aria-hidden />}
                </button>
              ) : (
                <NavLink
                  to={item.to}
                  className={({ isActive: a }) =>
                    `relative flex items-center h-[88px] px-4 xl:px-5 text-[14px] font-semibold uppercase tracking-[0.12em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-8 focus-visible:outline-d1-gold ${a ? 'text-d1-navy after:absolute after:left-4 after:right-4 xl:after:left-5 xl:after:right-5 after:bottom-6 after:h-px after:bg-d1-gold' : 'text-d1-ink/75 hover:text-d1-navy'}`
                  }
                >
                  {item.label}
                </NavLink>
              )}

              <AnimatePresence>
                {open === item.label && item.children && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full w-[300px] bg-white border-t-2 border-d1-gold shadow-[0_24px_48px_-20px_rgba(15,35,64,0.35)]"
                  >
                    <ul className="py-3">
                      {item.children.map((c) => (
                        <li key={c.to}>
                          <Link to={c.to} className="block px-6 py-3 hover:bg-d1-ivory focus-visible:bg-d1-ivory focus-visible:outline-none" onClick={() => setOpen(null)}>
                            <span className="block font-d1-serif text-[20px] font-semibold text-d1-navy">{c.label}</span>
                            <span className="block text-[13px] text-d1-muted">{c.note}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {open === 'Group Companies' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => window.clearTimeout(timer.current)}
            onMouseLeave={() => setOpen(null)}
            className="absolute left-0 right-0 top-full bg-white border-t border-d1-stone shadow-[0_30px_60px_-30px_rgba(15,35,64,0.4)]"
          >
            <Container className="grid grid-cols-[1fr_2.4fr] gap-12 py-10">
              <div className="border-r border-d1-stone pr-10">
                <p className="text-[12px] uppercase tracking-[0.22em] text-d1-gold font-semibold">Our Companies</p>
                <p className="mt-4 font-d1-serif text-[30px] leading-tight text-d1-navy font-semibold">Specialised enterprises, one shared standard.</p>
                <Link to={P.companies} onClick={() => setOpen(null)} className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-d1-navy hover:text-d1-gold">
                  View all companies <ArrowUpRight size={15} aria-hidden />
                </Link>
              </div>
              <ul className="grid grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-2">
                {groupCompanies.map((c) => (
                  <li key={c.slug}>
                    <Link to={P.company(c.slug)} onClick={() => setOpen(null)} className="group flex gap-4 items-center p-3 -mx-3 hover:bg-d1-ivory focus-visible:bg-d1-ivory focus-visible:outline-none">
                      <img src={c.image.sm} alt="" className="w-16 h-16 object-cover grayscale-[40%] group-hover:grayscale-0 transition" loading="lazy" />
                      <span>
                        <span className="block font-d1-serif text-[19px] font-semibold text-d1-navy leading-tight">{c.shortName}</span>
                        <span className="block text-[13px] text-d1-muted">{c.sector}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useOverlay<HTMLDivElement>(open, onClose);
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="d1-mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 z-[65] bg-d1-navy text-white overflow-y-auto"
        >
          <div className="flex items-center justify-between px-5 h-[76px] border-b border-white/10">
            <Logo light />
            <button type="button" onClick={onClose} aria-label="Close menu" className="p-2 -mr-2">
              <X size={26} />
            </button>
          </div>
          <nav aria-label="Mobile" className="px-5 py-6">
            <ul className="divide-y divide-white/10">
              <li>
                <Link to={P.home} onClick={onClose} className="block py-4 font-d1-serif text-[28px]">
                  Home
                </Link>
              </li>
              {NAV.map((item) => {
                const kids = item.mega ? [{ label: 'All Companies', to: P.companies }, ...groupCompanies.map((c) => ({ label: c.shortName, to: P.company(c.slug) }))] : item.children;
                if (!kids)
                  return (
                    <li key={item.label}>
                      <Link to={item.to} onClick={onClose} className="block py-4 font-d1-serif text-[28px]">
                        {item.label}
                      </Link>
                    </li>
                  );
                const isOpen = expanded === item.label;
                return (
                  <li key={item.label}>
                    <button type="button" aria-expanded={isOpen} onClick={() => setExpanded(isOpen ? null : item.label)} className="w-full flex items-center justify-between py-4 font-d1-serif text-[28px] text-left">
                      {item.label}
                      <ChevronDown className={`text-d1-goldlight transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden />
                    </button>
                    {isOpen && (
                      <ul className="pb-4 pl-4 border-l border-d1-gold/50 space-y-1">
                        {kids.map((k) => (
                          <li key={k.to}>
                            <Link to={k.to} onClick={onClose} className="block py-2 text-[16px] text-white/80 hover:text-white">
                              {k.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 space-y-2 text-[15px] text-white/70">
              <p>{BRAND.contact.email}</p>
              <p>{BRAND.contact.phone}</p>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="bg-d1-navy text-white">
      <Container className="pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-sm text-white/70 leading-relaxed">{BRAND.tagline}</p>
            <ul className="mt-6 flex gap-3">
              {BRAND.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-9 px-3 border border-white/20 text-[12px] uppercase tracking-[0.14em] text-white/80 hover:border-d1-goldlight hover:text-white">
                    {s.label}
                    <span className="sr-only"> (placeholder link, opens in new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[12px] uppercase tracking-[0.22em] text-d1-goldlight font-semibold">The Group</h2>
            <ul className="mt-5 space-y-3 text-white/75">
              {[
                ['About Us', P.about],
                ['Leadership', P.leadership],
                ['Future Roadmap', P.roadmap],
                ['Partner With Us', P.partner],
              ].map(([l, to]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-white">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[12px] uppercase tracking-[0.22em] text-d1-goldlight font-semibold">Media</h2>
            <ul className="mt-5 space-y-3 text-white/75">
              {[
                ['News & Videos', P.news],
                ['Gallery', P.gallery],
                ['Resource Centre', P.resources],
                ['Group Companies', P.companies],
              ].map(([l, to]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-white">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[12px] uppercase tracking-[0.22em] text-d1-goldlight font-semibold">Corporate Office</h2>
            <address className="mt-5 not-italic text-white/75 leading-relaxed">
              {BRAND.offices[0].lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <p className="mt-4 text-white/75">
              <a href={`mailto:${BRAND.contact.email}`} className="hover:text-white break-all">
                {BRAND.contact.email}
              </a>
            </p>
            <p className="text-white/75">
              <a href={BRAND.contact.phoneHref} className="hover:text-white">
                {BRAND.contact.phone}
              </a>
            </p>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 md:items-center justify-between text-[13px] text-white/50">
          <p>© {new Date().getFullYear()} {BRAND.legalName}. Design concept for client review.</p>
          <p>{BRAND.sampleNotice}</p>
        </div>
      </Container>
    </footer>
  );
}

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setMobileOpen(false), [location.pathname, location.search]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="d1 min-h-screen flex flex-col bg-d1-ivory font-d1-sans text-d1-ink text-[17px]" data-demo="demo1">
      <SkipLink className="bg-d1-navy text-white" />
      <div className="hidden md:block bg-d1-navy text-white/75 text-[13px]">
        <Container className="flex items-center justify-between h-10">
          <div className="flex items-center gap-6">
            <a href={`mailto:${BRAND.contact.email}`} className="flex items-center gap-2 hover:text-white">
              <Mail size={13} className="text-d1-goldlight" aria-hidden /> {BRAND.contact.email}
            </a>
            <a href={BRAND.contact.phoneHref} className="flex items-center gap-2 hover:text-white">
              <Phone size={13} className="text-d1-goldlight" aria-hidden /> {BRAND.contact.phone}
            </a>
          </div>
          <div className="flex items-center gap-6">
            <Link to={P.partnerType('investment')} className="hover:text-white">
              Investor Enquiries
            </Link>
            <Link to={P.partnerType('vendor')} className="hover:text-white">
              Vendor Registration
            </Link>
            <Link to={P.resources} className="hover:text-white">
              Resource Centre
            </Link>
          </div>
        </Container>
      </div>
      <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-[0_8px_30px_-12px_rgba(15,35,64,0.25)]' : 'border-b border-d1-stone'}`}>
        <Container className="relative flex items-center justify-between h-[76px] lg:h-[88px] lg:static">
          <Logo />
          <DesktopNav />
          <div className="flex items-center gap-3">
            <Link to={P.contact} className="hidden xl:inline-flex items-center h-11 px-6 bg-d1-navy text-white text-[12px] font-semibold uppercase tracking-[0.16em] hover:bg-d1-gold transition-colors">
              Enquire
            </Link>
            <button type="button" className="lg:hidden p-2 -mr-2 text-d1-navy" aria-label="Open menu" aria-expanded={mobileOpen} aria-controls="d1-mobile-nav" onClick={() => setMobileOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </Container>
      </header>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ConceptsLink concept={CONCEPT} />
      <ChatAssistant skin={chatSkin} paths={P} />
    </div>
  );
}
