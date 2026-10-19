import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Info } from 'lucide-react';
import { concepts, type Concept } from './concepts';
import { BRAND } from '../data/brand';
import { usePageMeta } from '../hooks/usePageMeta';

function Preview({ c }: { c: Concept }) {
  const [failed, setFailed] = useState(false);
  return (
    <Link
      to={c.path}
      className="group/preview block rounded-[10px] bg-[#1d2027] p-1.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e9e3d6]"
      aria-label={`Preview ${c.name}`}
      tabIndex={-1}
    >
      <div className="flex items-center gap-1.5 px-2.5 h-7" aria-hidden>
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="ml-3 flex-1 max-w-[260px] h-4 rounded bg-white/[0.06] text-[10px] leading-4 px-2 text-white/40 truncate font-pt-sans">{`yourdomain.com${c.path}`}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-[#2a2d35]">
        {!failed ? (
          <img
            src={`/previews/${c.id}.jpg`}
            alt={`Screenshot of the ${c.name} homepage`}
            className="absolute inset-x-0 top-0 w-full h-auto transition-transform duration-[2600ms] ease-in-out group-hover/preview:-translate-y-[38%]"
            loading="lazy"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-8" style={{ background: `linear-gradient(135deg, ${c.palette[0].hex}, ${c.palette[2].hex})` }}>
            <p className="text-center text-[34px] leading-tight" style={{ fontFamily: c.type.displayFamily, color: c.palette[0].hex === '#f4efe6' ? '#1c1a17' : '#fff' }}>
              {c.name}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function Portal() {
  usePageMeta('Website Design Concepts', `Ten corporate website design concepts for ${BRAND.name}, prepared for client review.`);
  return (
    <div className="min-h-screen bg-[#111318] text-[#e9e3d6] font-pt-sans antialiased">
      <header className="mx-auto max-w-[1320px] px-5 sm:px-8 pt-8 flex items-center justify-between gap-4">
        <p className="flex items-center gap-3 text-[13px] tracking-[0.18em] uppercase text-white/60">
          <span className="grid place-items-center w-8 h-8 rounded-md bg-[#e9e3d6] text-[#111318] font-pt-serif text-[18px] normal-case tracking-normal">N</span>
          {BRAND.name}
        </p>
        <p className="hidden sm:block text-[13px] text-white/45">Website design review · {concepts.length} concepts</p>
      </header>

      <section className="mx-auto max-w-[1320px] px-5 sm:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="text-[13px] uppercase tracking-[0.22em] text-[#c9b48a]">Corporate website · Design concepts</p>
          <h1 className="mt-6 font-pt-serif text-[48px] sm:text-[72px] lg:text-[96px] leading-[0.98] tracking-[-0.01em] max-w-5xl">
            Ten directions for the <em className="text-[#c9b48a]">{BRAND.shortName}</em> corporate website.
          </h1>
          <p className="mt-8 max-w-2xl text-[18px] leading-relaxed text-white/65">
            Each concept is a complete, working website with all ten sections: About Us, Group Companies, Partner With Us, News, Future Roadmap, Gallery, Leadership, Resource Centre, Contact and an assistant demo. Open any concept, navigate freely, then return here to compare.
          </p>
        </motion.div>
        <nav aria-label="Jump to concept" className="mt-12 flex flex-wrap gap-2">
          {concepts.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-white/15 text-[14px] text-white/75 hover:bg-white/5 hover:text-white transition-colors">
              <span className="text-[#c9b48a] tabular-nums">{c.number}</span> {c.name}
            </a>
          ))}
        </nav>
      </section>

      <ol className="mx-auto max-w-[1320px] px-5 sm:px-8 pb-24 space-y-24 lg:space-y-32">
        {concepts.map((c, i) => (
          <motion.li
            key={c.id}
            id={c.id}
            className="scroll-mt-10 grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-16 items-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className={i % 2 ? 'lg:order-2' : ''}>
              <Preview c={c} />
            </div>
            <article>
              <p className="font-pt-serif text-[64px] leading-none text-[#c9b48a]/80">{c.number}</p>
              <h2 className="mt-4 font-pt-serif text-[40px] sm:text-[48px] leading-[1.05]">{c.name}</h2>
              <p className="mt-3 text-[18px] text-white/80">{c.direction}</p>
              <p className="mt-5 text-[16px] leading-relaxed text-white/60">{c.description}</p>

              <div className="mt-8 grid sm:grid-cols-2 gap-6 border-t border-white/10 pt-6">
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.2em] text-white/45">What sets it apart</h3>
                  <ul className="mt-3 space-y-2 text-[14px] text-white/75">
                    {c.differentiators.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span className="mt-[9px] w-1 h-1 rounded-full bg-[#c9b48a] shrink-0" aria-hidden />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.2em] text-white/45">Typography</h3>
                  <p className="mt-3 text-[26px] leading-none text-white" style={{ fontFamily: c.type.displayFamily }}>
                    Aa — {c.type.display}
                  </p>
                  <p className="mt-2 text-[14px] text-white/60" style={{ fontFamily: c.type.bodyFamily }}>
                    {c.type.body}
                  </p>
                  <h3 className="mt-5 text-[11px] uppercase tracking-[0.2em] text-white/45">Palette</h3>
                  <ul className="mt-3 flex gap-2" aria-label="Colour palette">
                    {c.palette.map((p) => (
                      <li key={p.hex} title={`${p.name} ${p.hex}`} className="w-8 h-8 rounded-full ring-1 ring-white/20" style={{ background: p.hex }}>
                        <span className="sr-only">
                          {p.name} {p.hex}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-6 text-[14px] text-white/55">
                <span className="text-white/80">Best for:</span> {c.bestFor}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to={c.path}
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-[#e9e3d6] text-[#111318] text-[15px] font-semibold hover:bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e9e3d6]"
                >
                  Preview Website <ArrowRight size={17} aria-hidden />
                </Link>
                <a
                  href={c.path}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 h-12 px-5 rounded-full text-[14px] text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Open in new tab <ArrowUpRight size={15} aria-hidden />
                </a>
              </div>
            </article>
          </motion.li>
        ))}
      </ol>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 py-10 flex flex-col md:flex-row gap-6 md:items-start justify-between text-[14px] text-white/50">
          <p className="flex gap-3 max-w-2xl">
            <Info size={18} className="shrink-0 mt-0.5 text-[#c9b48a]" aria-hidden />
            <span>
              {BRAND.name} is a placeholder brand. All company names, people, figures, dates, news and contact details are illustrative sample content for design review. Forms and the assistant run in demo mode and transmit no data. Photography: Unsplash (representative placeholders).
            </span>
          </p>
          <p>Design concepts · {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
