import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { roadmap, strategicPillars } from '../../../data/roadmap';
import { Bento, Bloom, Chip, Display, Glow, Go, P, PASTEL, Sample, Shell, tile, useMeta } from '../ui';

const typeTone: Record<string, string> = {
  Expansion: 'bg-d10-peach text-[#8a3b12]',
  Technology: 'bg-d10-sky text-[#244b8a]',
  Sustainability: 'bg-d10-mint text-[#0e6b47]',
  Operations: 'bg-d10-butter text-[#7a5b00]',
  People: 'bg-[#ffe0ee] text-[#9b2457]',
};

export default function Roadmap() {
  useMeta('Roadmap', 'An illustrative three-phase roadmap, 2026 to 2035 (sample content, not an official commitment).');
  const [params, setParams] = useSearchParams();
  const idx = Math.max(0, roadmap.findIndex((r) => r.id === params.get('phase')));
  const r = roadmap[idx];
  return (
    <>
      <Bento
        eyebrow="Future roadmap"
        title={
          <>
            Where we’re <Glow>heading.</Glow>
          </>
        }
        intro="Three phases from 2026 to 2035. Select a phase to see its initiatives."
        image="/images/solar-aerial.jpg"
        crumbs={[{ label: 'Roadmap' }]}
        aside={<Sample>Illustrative · not an official commitment</Sample>}
      />
      <section className="pt-10 pb-6">
        <Shell>
          {/* Phase selector doubles as a progress track. */}
          <div className={`${tile} p-3 sm:p-4`}>
            <div role="tablist" aria-label="Roadmap phase" className="relative grid grid-cols-3 gap-2">
              {roadmap.map((x, i) => (
                <button
                  key={x.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === i}
                  aria-controls="d10-phase"
                  onClick={() => setParams({ phase: x.id }, { replace: true, preventScrollReset: true })}
                  className={`relative text-left p-3 sm:p-5 rounded-[22px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-d10-violet ${idx === i ? 'text-white' : 'hover:bg-d10-canvas'}`}
                >
                  {idx === i && <motion.span layoutId="d10-phase-pill" className="absolute inset-0 rounded-[22px] bg-gradient-to-br from-d10-violet to-[#9a6bff]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span className="relative block text-[12px] sm:text-[13px] font-semibold opacity-80">{x.label}</span>
                  <span className="relative block mt-1 font-d10-display font-semibold text-[16px] sm:text-[22px] tracking-[-0.02em]">{x.horizon}</span>
                </button>
              ))}
            </div>
            <div className="mt-3 mx-2 h-1.5 rounded-full bg-d10-canvas overflow-hidden" aria-hidden>
              <motion.div className="h-full rounded-full bg-d10-violet" animate={{ width: `${((idx + 1) / roadmap.length) * 100}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={r.id} id="d10-phase" role="tabpanel" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="mt-4 grid lg:grid-cols-3 gap-4">
              <div className={`${tile} !bg-d10-ink !border-d10-ink text-white p-7 sm:p-9 lg:row-span-2`}>
                <Chip className="bg-white/10 text-d10-mint">
                  Phase {idx + 1} · {r.horizon}
                </Chip>
                <Display as="h2" className="mt-5 text-[34px] sm:text-[40px] !text-white">
                  {r.title}
                </Display>
                <p className="mt-4 text-white/70 text-[17px]">{r.summary}</p>
              </div>
              {r.initiatives.map((it, k) => (
                <div key={it.title} className={`${tile} p-6`}>
                  <Chip className={typeTone[it.type]}>{it.type}</Chip>
                  <h3 className="mt-4 font-d10-display font-semibold text-[20px] tracking-[-0.02em]">{it.title}</h3>
                  <p className="mt-2 text-d10-mute">{it.description}</p>
                  <p className="mt-4 text-[12px] font-semibold text-d10-mute">Initiative {k + 1} of {r.initiatives.length}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </Shell>
      </section>
      <section className="pt-14 pb-6">
        <Shell>
          <Display className="text-[36px] sm:text-[48px]">Strategic pillars</Display>
          <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {strategicPillars.map((s, i) => (
              <li key={s.title}>
                <Bloom delay={i * 0.05} className={`h-full p-6 rounded-[28px] ${PASTEL[i]}`}>
                  <span className="font-d10-display font-semibold text-[40px] text-d10-ink/30">0{i + 1}</span>
                  <h3 className="mt-3 font-d10-display font-semibold text-[20px]">{s.title}</h3>
                  <p className="mt-2 text-d10-ink/70">{s.description}</p>
                </Bloom>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Go to={P.partner}>Build it with us</Go>
          </div>
        </Shell>
      </section>
    </>
  );
}
