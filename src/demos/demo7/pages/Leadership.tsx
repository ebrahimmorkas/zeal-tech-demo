import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { chairman, managingDirector, directors, advisors } from '../../../data/leadership';
import type { Leader } from '../../../types';
import { Arch, Grow, Kicker, Note, Opening, Serif, Wrap, useMeta } from '../ui';

function Person({ l, open, onToggle }: { l: Leader; open: boolean; onToggle: () => void }) {
  const bioId = `d7-bio-${l.id}`;
  return (
    <div className="h-full rounded-[36px] bg-white p-4 pb-6">
      <div className="overflow-hidden rounded-t-full rounded-b-[24px]">
        <img src={l.portrait} alt={`${l.name} (placeholder portrait)`} className="w-full aspect-[4/5] object-cover" loading="lazy" />
      </div>
      <div className="px-2 pt-5">
        <p className="text-[13px] font-semibold text-d7-moss">{l.role}</p>
        <h3 className="mt-1 font-d7-serif text-[26px] leading-tight text-d7-forest">{l.name}</h3>
        <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={bioId} className="mt-4 inline-flex items-center gap-2 h-10 pl-4 pr-2 rounded-full bg-d7-lichen text-[14px] font-medium text-d7-forest hover:bg-d7-lime">
          {open ? 'Close' : 'Read profile'}
          <span className="grid place-items-center w-7 h-7 rounded-full bg-d7-forest text-d7-mist">{open ? <X size={14} aria-hidden /> : <Plus size={14} aria-hidden />}</span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div id={bioId} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
              <p className="pt-4 text-[15.5px] leading-relaxed text-d7-soil">{l.bio}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {l.expertise.map((e) => (
                  <li key={e} className="h-7 px-3 rounded-full bg-d7-mist text-[12.5px] inline-flex items-center">
                    {e}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Leadership() {
  useMeta('Our people', 'The board, executive team and advisors who steward the group (fictional placeholder profiles).');
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (id: string) => setOpen((o) => (o === id ? null : id));
  return (
    <>
      <Opening kicker="Our people" title={<>Those who <em>tend</em> the group.</>} intro="Board, executive leadership and advisors." image="/images/discussion.jpg" crumbs={[{ label: 'Our people' }]} />
      <section className="py-14 lg:py-20">
        <Wrap>
          <div className="flex justify-center">
            <Note>Fictional placeholder profiles and stock portraits</Note>
          </div>
          <div className="mt-12 grid lg:grid-cols-2 gap-8">
            {[chairman, managingDirector].map((l, i) => (
              <Grow key={l.id} delay={i * 0.12}>
                <article className={`h-full rounded-[44px] p-6 sm:p-9 grid sm:grid-cols-[200px_1fr] gap-7 items-center ${i ? 'bg-d7-lichen' : 'bg-d7-forest text-d7-mist'}`}>
                  <Arch src={l.portrait} alt={`${l.name} (placeholder portrait)`} imgClass="aspect-[4/5]" className="max-w-[220px]" />
                  <div>
                    <Kicker light={!i}>{l.role}</Kicker>
                    <h2 className={`mt-2 font-d7-serif text-[34px] leading-tight ${i ? 'text-d7-forest' : ''}`}>{l.name}</h2>
                    <p className={`mt-3 font-d7-serif italic text-[20px] leading-snug ${i ? 'text-d7-moss' : 'text-d7-lime'}`}>“{l.quote}”</p>
                    <p className={`mt-3 text-[15.5px] ${i ? 'text-d7-soil' : 'text-d7-mist/75'}`}>{l.bio}</p>
                  </div>
                </article>
              </Grow>
            ))}
          </div>
          <Serif className="mt-20 text-[40px] sm:text-[52px] text-d7-forest">
            Directors
          </Serif>
          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
            {directors.map((l) => (
              <li key={l.id}>
                <Person l={l} open={open === l.id} onToggle={() => toggle(l.id)} />
              </li>
            ))}
          </ul>
          <Serif className="mt-20 text-[40px] sm:text-[52px] text-d7-forest">
            <em>Advisors</em>
          </Serif>
          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
            {advisors.map((l) => (
              <li key={l.id}>
                <Person l={l} open={open === l.id} onToggle={() => toggle(l.id)} />
              </li>
            ))}
          </ul>
        </Wrap>
      </section>
    </>
  );
}
