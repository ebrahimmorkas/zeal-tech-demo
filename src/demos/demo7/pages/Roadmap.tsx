import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { roadmap, strategicPillars } from '../../../data/roadmap';
import { Rings } from '../Rings';
import { Go, Grow, Kicker, Leaf, Note, Opening, P, Serif, Wrap, useMeta } from '../ui';

const typeTone: Record<string, string> = {
  Expansion: 'bg-[#e9dfc8] text-d7-bark',
  Technology: 'bg-[#d8e6ee] text-[#244a5c]',
  Sustainability: 'bg-d7-lime text-d7-forest',
  Operations: 'bg-d7-lichen text-d7-forest',
  People: 'bg-[#f0dcd2] text-[#6b3524]',
};

export default function Roadmap() {
  useMeta('Horizons', 'An illustrative roadmap in three growth rings, 2026 to 2035 (sample content, not an official commitment).');
  const [active, setActive] = useState(0);
  const r = roadmap[active];
  return (
    <>
      <Opening kicker="Horizons" title={<>Growing in <em>rings.</em></>} intro="Our roadmap is drawn the way a tree grows: steady rings, each one strengthening the last." image="/images/wind-hills.jpg" crumbs={[{ label: 'Horizons' }]} />
      <section className="py-14 lg:py-20">
        <Wrap>
          <div className="flex justify-center">
            <Note>Illustrative only — every milestone requires client confirmation</Note>
          </div>
          <div className="mt-10 grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
            <Rings active={active} onSelect={setActive} size={480} />
            <AnimatePresence mode="wait">
              <motion.div key={r.id} id="d7-phase" role="tabpanel" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.45 }}>
                <Kicker>
                  Ring {active + 1} · {r.label}
                </Kicker>
                <Serif as="h2" className="mt-3 text-[40px] sm:text-[52px] text-d7-forest">
                  {r.title}
                </Serif>
                <p className="mt-2 text-[15px] font-medium text-d7-moss">{r.horizon}</p>
                <p className="mt-4 text-[17.5px] text-d7-soil">{r.summary}</p>
                <ul className="mt-8 grid sm:grid-cols-2 gap-4">
                  {r.initiatives.map((it) => (
                    <li key={it.title} className="rounded-[28px] bg-white p-6">
                      <span className={`inline-flex h-7 px-3 items-center rounded-full text-[12.5px] font-semibold ${typeTone[it.type]}`}>{it.type}</span>
                      <h3 className="mt-3 font-d7-serif text-[22px] text-d7-forest">{it.title}</h3>
                      <p className="mt-1 text-[15px] text-d7-soil">{it.description}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex gap-2">
                  {roadmap.map((x, i) => (
                    <button key={x.id} type="button" onClick={() => setActive(i)} aria-label={`Show ${x.label}`} aria-pressed={active === i} className={`h-2.5 rounded-full transition-all ${active === i ? 'w-10 bg-d7-forest' : 'w-2.5 bg-d7-forest/25 hover:bg-d7-forest/50'}`} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Wrap>
      </section>
      <section className="pb-20">
        <Wrap>
          <div className="relative overflow-hidden rounded-[48px] bg-d7-forest text-d7-mist p-8 sm:p-14">
            <Leaf className="absolute right-10 top-8 w-16 opacity-25" color="#d3e36b" />
            <Kicker light>Strategic pillars</Kicker>
            <Serif className="mt-3 text-[40px] sm:text-[52px] text-d7-mist">
              What every ring <em className="!text-d7-lime">rests on.</em>
            </Serif>
            <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {strategicPillars.map((s, i) => (
                <li key={s.title}>
                  <Grow delay={i * 0.08} className="h-full">
                    <div className="h-full rounded-t-full rounded-b-[28px] bg-d7-mist/[0.07] px-6 pt-14 pb-7 text-center">
                      <span className="font-d7-serif text-[40px] text-d7-lime">{i + 1}</span>
                      <h3 className="mt-2 font-d7-serif text-[23px]">{s.title}</h3>
                      <p className="mt-2 text-[15px] text-d7-mist/70">{s.description}</p>
                    </div>
                  </Grow>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Go to={P.partner} tone="lime">
                Grow with us
              </Go>
            </div>
          </div>
        </Wrap>
      </section>
    </>
  );
}
