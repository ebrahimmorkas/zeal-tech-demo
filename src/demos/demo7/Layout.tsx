import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { BRAND } from '../../data/brand';
import { ChatAssistant, type ChatSkin } from '../../components/common/ChatAssistant';
import { ConceptsLink } from '../../components/common/ConceptsLink';
import { SkipLink } from '../../components/common/SkipLink';
import { useOverlay } from '../../hooks/useOverlay';
import { CONCEPT, Go, Leaf, P, Serif, Wave, Wrap } from './ui';

const skin: ChatSkin = {
  accent: '#1f3d2b',
  accentText: '#f3f6ee',
  surface: '#ffffff',
  panel: '#f3f6ee',
  ink: '#3b3226',
  muted: '#6d6252',
  border: '#dfe6d3',
  userBubble: '#d3e36b',
  userText: '#1f3d2b',
  radius: '30px',
  font: '"DM Sans", system-ui, sans-serif',
  launcher: 'circle',
  title: 'Nexora Field Guide',
  launcherLabel: 'Ask',
};

const left = [
  { label: 'Our roots', to: P.about },
  { label: 'Companies', to: P.companies },
  { label: 'Our people', to: P.leadership },
  { label: 'Horizons', to: P.roadmap },
];
const right = [
  { label: 'Stories', to: P.news },
  { label: 'Gallery', to: P.gallery },
  { label: 'Library', to: P.resources },
];
const all = [...left, ...right, { label: 'Partner with us', to: P.partner }, { label: 'Contact', to: P.contact }];

function Logo({ light = false, onClick }: { light?: boolean; onClick?: () => void }) {
  return (
    <Link to={P.home} onClick={onClick} className="flex items-center gap-2 rounded-full focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-d7-moss" aria-label={`${BRAND.name} home`}>
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden>
        <circle cx="17" cy="17" r="16" fill={light ? '#d3e36b' : '#1f3d2b'} />
        <path d="M17 6 C 26 13, 26 22, 17 28 C 8 22, 8 13, 17 6 Z" fill={light ? '#1f3d2b' : '#d3e36b'} />
      </svg>
      <span className={`font-d7-serif text-[25px] leading-none ${light ? 'text-d7-mist' : 'text-d7-forest'}`}>
        Nexora<span className="italic text-d7-moss">.</span>
      </span>
    </Link>
  );
}

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `relative inline-flex items-center h-10 px-1 text-[15px] font-medium whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-d7-moss after:absolute after:left-0 after:right-0 after:bottom-1.5 after:h-[2px] after:rounded-full after:bg-d7-moss after:origin-left after:transition-transform after:duration-500 ${
    isActive ? 'text-d7-forest after:scale-x-100' : 'text-d7-bark/80 hover:text-d7-forest after:scale-x-0 hover:after:scale-x-100'
  }`;

function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useOverlay<HTMLDivElement>(open, onClose);
  return (
    <AnimatePresence>
      {open && (
        <div className="xl:hidden fixed inset-0 z-[66]">
          <motion.div className="absolute inset-0 bg-d7-bark/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden />
          <motion.div
            ref={ref}
            id="d7-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute inset-y-0 left-0 w-full max-w-[420px] bg-d7-forest text-d7-mist overflow-y-auto rounded-r-[40px]"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          >
            <div className="flex items-center justify-between p-5">
              <Logo light onClick={onClose} />
              <button type="button" onClick={onClose} aria-label="Close menu" className="grid place-items-center w-11 h-11 rounded-full bg-d7-mist/10 hover:bg-d7-mist/20">
                <X size={20} />
              </button>
            </div>
            <div className="px-5">
              <div className="h-36 rounded-t-full overflow-hidden">
                <img src="/images/wind-hills-sm.jpg" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
            <nav aria-label="Mobile" className="px-5 py-6">
              <ul className="space-y-1">
                <li>
                  <NavLink end to={P.home} onClick={onClose} className={({ isActive }) => `block py-2 font-d7-serif text-[34px] leading-tight ${isActive ? 'text-d7-lime italic' : 'hover:text-d7-lime'}`}>
                    Home
                  </NavLink>
                </li>
                {all.map((n) => (
                  <li key={n.to}>
                    <NavLink to={n.to} onClick={onClose} className={({ isActive }) => `block py-2 font-d7-serif text-[34px] leading-tight ${isActive ? 'text-d7-lime italic' : 'hover:text-d7-lime'}`}>
                      {n.label}
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
    <footer className="mt-auto">
      <Wave fill="#1f3d2b" />
      <div className="bg-d7-forest text-d7-mist -mt-px relative overflow-hidden">
        <Leaf className="absolute right-[3%] top-4 w-12 opacity-25" color="#d3e36b" />
        <Leaf className="absolute left-[45%] bottom-24 w-8 opacity-20 [animation-delay:-3s] hidden lg:block" color="#d3e36b" />
        <Wrap className="pt-10 pb-12">
          <div className="grid lg:grid-cols-[1.4fr_1fr_1fr] gap-12">
            <div>
              <Serif as="p" className="text-[44px] sm:text-[60px] text-d7-mist">
                Let’s grow <em className="!text-d7-lime">together.</em>
              </Serif>
              <div className="mt-8 flex flex-wrap gap-3">
                <Go to={P.partner} tone="lime">
                  Become a partner
                </Go>
                <Go to={P.contact} tone="light">
                  Say hello
                </Go>
              </div>
            </div>
            <nav aria-label="Footer">
              <p className="text-[13px] uppercase tracking-[0.08em] text-d7-lime">Explore</p>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-d7-mist/80">
                {all.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="hover:text-d7-mist hover:underline underline-offset-4">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="text-[13px] uppercase tracking-[0.08em] text-d7-lime">Reach us</p>
              <ul className="mt-4 space-y-2.5 text-d7-mist/80">
                <li>
                  <a href={`mailto:${BRAND.contact.email}`} className="hover:text-d7-mist break-all">
                    {BRAND.contact.email}
                  </a>
                </li>
                <li>
                  <a href={BRAND.contact.phoneHref} className="hover:text-d7-mist">
                    {BRAND.contact.phone}
                  </a>
                </li>
                <li className="flex flex-wrap gap-2 pt-2">
                  {BRAND.social.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-9 px-4 rounded-full border border-d7-mist/25 text-[13px] hover:bg-d7-mist/10">
                      {s.label}
                      <span className="sr-only"> (placeholder, opens in new tab)</span>
                    </a>
                  ))}
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-14 pt-6 border-t border-d7-mist/15 flex flex-col md:flex-row justify-between gap-3 text-[13px] text-d7-mist/55">
            <p>© {new Date().getFullYear()} {BRAND.legalName}</p>
            <p>{BRAND.sampleNotice}</p>
          </div>
        </Wrap>
      </div>
    </footer>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  return (
    <div className="d7 min-h-screen flex flex-col bg-d7-mist font-d7-sans text-d7-bark text-[16.5px] selection:bg-d7-lime selection:text-d7-forest" data-demo="demo7">
      <SkipLink className="bg-d7-forest text-d7-mist rounded-full" />
      <header className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-500 ${scrolled ? 'bg-d7-mist/90 backdrop-blur-md shadow-[0_10px_30px_-20px_rgba(31,61,43,0.5)]' : 'bg-d7-lichen'}`}>
        <Wrap className="grid grid-cols-[1fr_auto_1fr] items-center h-[84px] gap-4">
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-6">
              {left.map((n) => (
                <li key={n.to}>
                  <NavLink to={n.to} className={linkCls}>
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="d7-nav" className="xl:hidden justify-self-start inline-flex items-center gap-3 h-11 pl-2 pr-4 rounded-full bg-d7-forest text-d7-mist text-[15px] font-medium">
            <span className="grid place-items-center w-8 h-8 rounded-full bg-d7-lime" aria-hidden>
              <span className="flex flex-col gap-[3px]">
                <span className="w-3.5 h-[2px] bg-d7-forest rounded" />
                <span className="w-2.5 h-[2px] bg-d7-forest rounded" />
              </span>
            </span>
            Menu
          </button>
          <Logo />
          <div className="flex items-center justify-end gap-6">
            <nav aria-label="Secondary" className="hidden xl:block">
              <ul className="flex items-center gap-6">
                {right.map((n) => (
                  <li key={n.to}>
                    <NavLink to={n.to} className={linkCls}>
                      {n.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <Link to={P.partner} className="hidden sm:inline-flex items-center h-11 px-5 rounded-full bg-d7-forest text-d7-mist text-[15px] font-medium whitespace-nowrap hover:bg-d7-pine">
              Partner
            </Link>
          </div>
        </Wrap>
      </header>
      <Drawer open={open} onClose={() => setOpen(false)} />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ConceptsLink concept={CONCEPT} />
      <ChatAssistant skin={skin} paths={P} />
    </div>
  );
}
