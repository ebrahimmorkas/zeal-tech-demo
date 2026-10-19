import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { leaders } from '../../../data/leadership';
import { Cue, ROMAN, Sample, Stage, TitleCard, useMeta } from '../ui';

export default function Leadership() {
  useMeta('Leadership', 'The board, executive leadership and advisors (fictional placeholder profiles).');
  const [sel, setSel] = useState(0);
  const l = leaders[sel];
  return (
    <>
      <TitleCard scene="III" title="The Cast" intro="Board, executive leadership and advisors." crumbs={[{ label: 'Leadership' }]} />
      <section className="pb-24 lg:pb-32">
        <Stage>
          <div className="text-center">
            <Sample>Fictional placeholder profiles and stock portraits</Sample>
          </div>
          {/* Credits list on one side, the selected portrait on the other. */}
          <div className="mt-14 grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
            <ol className="border-t border-d9-graphite">
              {leaders.map((p, i) => (
                <li key={p.id} className="border-b border-d9-graphite">
                  <button
                    type="button"
                    onClick={() => setSel(i)}
                    onMouseEnter={() => setSel(i)}
                    aria-pressed={sel === i}
                    aria-controls="d9-portrait"
                    className="w-full grid grid-cols-[40px_1fr] sm:grid-cols-[40px_1fr_auto] gap-4 items-baseline py-6 text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-d9-bone"
                  >
                    <span className="font-d9-sans text-[11px] tracking-[0.3em] text-d9-smoke">{ROMAN[i]}</span>
                    <span className={`font-d9-serif text-[28px] sm:text-[36px] leading-none transition-all duration-500 ${sel === i ? 'italic translate-x-2' : 'text-d9-smoke'}`}>{p.name}</span>
                    <span className="col-start-2 sm:col-start-3 font-d9-sans text-[11px] uppercase tracking-[0.3em] text-d9-smoke">{p.role}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div id="d9-portrait" aria-live="polite" className="lg:sticky lg:top-28">
              <AnimatePresence mode="wait">
                <motion.article key={l.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                  <div className="overflow-hidden">
                    <motion.img src={l.portrait} alt={`${l.name} (placeholder portrait)`} className="w-full aspect-[4/5] object-cover grayscale" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} />
                  </div>
                  <Cue className="mt-8">{l.role}</Cue>
                  <h2 className="mt-3 font-d9-serif text-[40px] leading-none">{l.name}</h2>
                  {l.quote && <p className="mt-6 font-d9-serif italic text-[24px] leading-snug text-d9-ash">“{l.quote}”</p>}
                  <p className="mt-6 font-d9-sans font-light text-[17px] leading-[1.8] text-d9-ash">{l.bio}</p>
                  <p className="mt-6 font-d9-sans text-[11px] uppercase tracking-[0.3em] text-d9-smoke">{l.expertise.join(' · ')}</p>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </Stage>
      </section>
    </>
  );
}
