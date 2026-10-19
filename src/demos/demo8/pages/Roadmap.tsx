import { useState } from 'react';
import { motion } from 'framer-motion';
import { roadmap, strategicPillars } from '../../../data/roadmap';
import type { InitiativeType } from '../../../types';
import { Big, Box, Go, Outline, P, POP, PageHead, Pop, Sample, Tag, card, useMeta } from '../ui';

const types: InitiativeType[] = ['Expansion', 'Technology', 'Sustainability', 'Operations', 'People'];
const note: Record<InitiativeType, string> = {
  Expansion: 'bg-d8-yellow',
  Technology: 'bg-[#b9c4ff]',
  Sustainability: 'bg-d8-mint',
  Operations: 'bg-white',
  People: 'bg-d8-pink',
};
const lane = ['Now', 'Next', 'Later'];

export default function Roadmap() {
  useMeta('Roadmap', 'An illustrative kanban-style roadmap: now, next and later (sample content, not an official commitment).');
  const [only, setOnly] = useState<InitiativeType | null>(null);
  return (
    <>
      <PageHead title={<>Now. Next. <Outline>Later.</Outline></>} intro="The plan, laid out like a project board. Illustrative and subject to change." crumbs={[{ label: 'Roadmap' }]} color="bg-d8-blue text-white" sticker="Work in progress" />
      <section className="py-14 lg:py-20">
        <Box>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div role="group" aria-label="Highlight initiative type" className="flex flex-wrap gap-2">
              <button type="button" aria-pressed={only === null} onClick={() => setOnly(null)} className={`h-10 px-4 border-[3px] border-d8-ink rounded-full font-d8-display font-bold text-[14px] ${only === null ? 'bg-d8-ink text-d8-cream' : 'bg-white'}`}>
                Everything
              </button>
              {types.map((t) => (
                <button key={t} type="button" aria-pressed={only === t} onClick={() => setOnly(only === t ? null : t)} className={`h-10 px-4 border-[3px] border-d8-ink rounded-full font-d8-display font-bold text-[14px] ${note[t]} ${only === t ? 'shadow-[3px_3px_0_#111] -translate-y-0.5' : 'opacity-80 hover:opacity-100'}`}>
                  {t}
                </button>
              ))}
            </div>
            <Sample>Not an official commitment</Sample>
          </div>

          <div className="mt-10 grid lg:grid-cols-3 gap-6">
            {roadmap.map((r, i) => (
              <section key={r.id} id={r.id} aria-labelledby={`d8-lane-${r.id}`} className={`p-4 sm:p-5 bg-d8-cream ${card} !shadow-none border-dashed scroll-mt-28`}>
                <header className="flex items-center justify-between gap-3 pb-4 border-b-[3px] border-d8-ink">
                  <h2 id={`d8-lane-${r.id}`} className="flex items-center gap-2">
                    <span className={`px-3 py-1 border-[3px] border-d8-ink rounded-full font-d8-display font-extrabold text-[18px] ${['bg-d8-yellow', 'bg-d8-pink', 'bg-d8-blue text-white'][i]}`}>{lane[i]}</span>
                    <span className="font-d8-mono text-[12px]">{r.horizon}</span>
                  </h2>
                  <span className="grid place-items-center w-8 h-8 bg-white border-2 border-d8-ink rounded-full font-d8-mono text-[12px] font-bold">{r.initiatives.length}</span>
                </header>
                <p className="mt-4 font-d8-display font-extrabold text-[22px] leading-tight">{r.title}</p>
                <p className="mt-1 text-[15px] font-medium text-d8-gray">{r.summary}</p>
                <ul className="mt-5 space-y-4">
                  {r.initiatives.map((it, k) => {
                    const dim = only && only !== it.type;
                    return (
                      <motion.li key={it.title} animate={{ opacity: dim ? 0.25 : 1, scale: dim ? 0.97 : 1 }} transition={{ duration: 0.2 }}>
                        <div className={`p-4 border-[3px] border-d8-ink rounded-xl shadow-[4px_4px_0_#111] ${note[it.type]}`} style={{ transform: `rotate(${[-1, 1.2, -0.6, 0.8][k % 4]}deg)` }}>
                          <span className="font-d8-mono text-[11px] uppercase">{it.type}</span>
                          <h3 className="mt-1 font-d8-display font-extrabold text-[18px] leading-tight">{it.title}</h3>
                          <p className="mt-1 text-[14.5px] font-medium">{it.description}</p>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </Box>
      </section>
      <section className="py-16 lg:py-20 bg-d8-yellow border-y-[3px] border-d8-ink">
        <Box>
          <Big className="text-[44px] sm:text-[64px]">The four pillars</Big>
          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {strategicPillars.map((s, i) => (
              <li key={s.title}>
                <Pop delay={i * 0.07} tilt={i % 2 ? 3 : -3} className="h-full">
                  <div className={`h-full p-6 ${card} ${POP[(i + 1) % 5]}`}>
                    <Tag className="bg-white text-d8-ink">Pillar {i + 1}</Tag>
                    <h3 className="mt-4 font-d8-display font-extrabold text-[24px] leading-tight">{s.title}</h3>
                    <p className="mt-2 font-medium">{s.description}</p>
                  </div>
                </Pop>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Go to={P.partner} tone="ink">
              Build it with us
            </Go>
          </div>
        </Box>
      </section>
    </>
  );
}
