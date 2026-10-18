import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { roadmap, strategicPillars } from '../../../data/roadmap';
import type { InitiativeType } from '../../../types';
import { Btn, Card, H, Label, Mono, P, PageTop, SampleChip, Shell, dots, useMeta } from '../ui';

const types: ('All' | InitiativeType)[] = ['All', 'Expansion', 'Technology', 'Sustainability', 'Operations', 'People'];
const tone: Record<InitiativeType, string> = {
  Expansion: 'bg-d4-indigo/10 text-d4-indigo',
  Technology: 'bg-violet-100 text-violet-700',
  Sustainability: 'bg-emerald-100 text-emerald-700',
  Operations: 'bg-amber-100 text-amber-800',
  People: 'bg-rose-100 text-rose-700',
};

export default function Roadmap() {
  useMeta('Future Roadmap', 'An interactive, illustrative roadmap of the group’s strategic horizons.');
  const [phase, setPhase] = useState(0);
  const [type, setType] = useState<(typeof types)[number]>('All');
  const p = roadmap[phase];
  const items = p.initiatives.filter((i) => type === 'All' || i.type === type);

  return (
    <>
      <PageTop label="future roadmap" title={<>Three horizons. One trajectory.</>} intro="Explore illustrative initiatives by horizon and workstream." crumbs={[{ label: 'Roadmap' }]} />
      <div className="bg-amber-50 border-b border-amber-200">
        <Shell className="py-3 text-[14px] text-amber-900">Illustrative roadmap for design review — not an official commitment. All milestones require client confirmation.</Shell>
      </div>

      <section className="py-16 lg:py-24">
        <Shell>
          {/* Horizon track */}
          <div role="tablist" aria-label="Horizon" className="relative grid grid-cols-3 gap-2 sm:gap-4">
            <div className="absolute left-[16%] right-[16%] top-[27px] h-[3px] rounded-full bg-[#e4e8f2]" aria-hidden />
            <motion.div className="absolute left-[16%] top-[27px] h-[3px] rounded-full bg-gradient-to-r from-d4-indigo to-d4-teal" animate={{ width: `${phase * 34}%` }} transition={{ duration: 0.5 }} aria-hidden />
            {roadmap.map((r, i) => (
              <button key={r.id} type="button" role="tab" aria-selected={phase === i} aria-controls="d4-phase" onClick={() => setPhase(i)} className="relative flex flex-col items-center text-center group focus-visible:outline-none">
                <span className={`grid place-items-center w-14 h-14 rounded-2xl font-d4-mono text-[14px] transition-all group-focus-visible:ring-2 group-focus-visible:ring-d4-indigo ${i <= phase ? 'bg-d4-void text-white shadow-[0_10px_30px_-10px_rgba(97,112,255,0.8)]' : 'bg-white ring-1 ring-[#e4e8f2] text-d4-deep/60'}`}>
                  0{i + 1}
                </span>
                <span className="mt-3 font-d4-display text-[15px] sm:text-[18px]">{r.label}</span>
                <span className="font-d4-mono text-[11.5px] text-d4-deep/50">{r.horizon}</span>
              </button>
            ))}
          </div>

          <div className="mt-14 grid lg:grid-cols-[1fr_1.6fr] gap-6 items-start">
            <AnimatePresence mode="wait">
              <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                <div className="relative overflow-hidden rounded-[24px] bg-d4-void text-white p-8">
                  <div className="absolute inset-0" style={dots} aria-hidden />
                  <div className="relative">
                    <Label dark>{p.horizon}</Label>
                    <H as="h2" dark className="mt-3 text-[32px]">
                      {p.title}
                    </H>
                    <p className="mt-3 text-d4-haze">{p.summary}</p>
                    <div className="mt-6">
                      <SampleChip dark />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div id="d4-phase" role="tabpanel">
              <div role="group" aria-label="Filter workstream" className="flex flex-wrap gap-2">
                {types.map((t) => (
                  <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(t)} className={`h-9 px-4 rounded-full text-[13.5px] transition-colors ${type === t ? 'bg-d4-deep text-white' : 'bg-white ring-1 ring-[#e4e8f2] hover:ring-d4-indigo/50'}`}>
                    {t}
                  </button>
                ))}
              </div>
              <ul className="mt-5 grid sm:grid-cols-2 gap-4" aria-live="polite">
                <AnimatePresence mode="popLayout">
                  {items.map((it) => (
                    <motion.li key={p.id + it.title} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.2 }}>
                      <Card className="p-6 h-full">
                        <span className={`inline-flex h-6 px-2.5 items-center rounded-full font-d4-mono text-[11px] ${tone[it.type]}`}>{it.type.toLowerCase()}</span>
                        <p className="mt-3 font-d4-display text-[19px]">{it.title}</p>
                        <p className="mt-1.5 text-[14.5px] text-d4-deep/65">{it.description}</p>
                      </Card>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              {items.length === 0 && <Mono className="mt-6 text-d4-deep/55">No {type.toLowerCase()} initiatives in this horizon.</Mono>}
            </div>
          </div>
        </Shell>
      </section>

      <section className="pb-24">
        <Shell>
          <Label>strategic pillars</Label>
          <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {strategicPillars.map((s, i) => (
              <li key={s.title}>
                <Card className="p-6 h-full">
                  <Mono className="text-d4-indigo">p{i + 1}</Mono>
                  <p className="mt-2 font-d4-display text-[18px]">{s.title}</p>
                  <p className="mt-1.5 text-[14.5px] text-d4-deep/65">{s.description}</p>
                </Card>
              </li>
            ))}
          </ul>
          <Btn to={P.partner} className="mt-10">
            Partner on these initiatives
          </Btn>
        </Shell>
      </section>
    </>
  );
}
