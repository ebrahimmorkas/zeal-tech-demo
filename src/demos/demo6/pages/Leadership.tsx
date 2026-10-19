import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { leaders } from '../../../data/leadership';
import { Frame, Label, PageHead, Photo, Sample, narrow, useMeta, wide } from '../ui';

const groups = ['Chairman', 'Managing Director', 'Director', 'Advisor'] as const;

export default function Leadership() {
  useMeta('Leadership', 'Board, executive leadership and advisors (fictional placeholder profiles).');
  const [sel, setSel] = useState(leaders[0].id);
  const l = leaders.find((x) => x.id === sel)!;
  return (
    <>
      <PageHead n="03" title={<>Leadership<span className="text-d6-red">.</span></>} intro="The people responsible for the group’s direction, performance and governance." crumbs={[{ label: 'Leadership' }]} />
      <section className="py-12 lg:py-16">
        <Frame>
          <Sample>Fictional placeholder profiles and stock portraits</Sample>
          <div className="mt-8 grid lg:grid-cols-12 gap-10">
            {/* Directory table — selecting a row updates the profile panel. */}
            <div className="lg:col-span-7">
              {groups.map((g) => {
                const people = leaders.filter((x) => x.group === g);
                return (
                  <div key={g} className="mb-10">
                    <Label n={String(groups.indexOf(g) + 1).padStart(2, '0')}>{g === 'Director' ? 'Directors' : g === 'Advisor' ? 'Advisors' : g}</Label>
                    <ul className="mt-3 border-t-[3px] border-d6-ink">
                      {people.map((p) => {
                        const on = p.id === sel;
                        return (
                          <li key={p.id}>
                            <button
                              type="button"
                              onClick={() => setSel(p.id)}
                              aria-pressed={on}
                              aria-controls="d6-profile"
                              className={`w-full grid grid-cols-[56px_1fr_auto] items-center gap-4 py-3 pr-3 border-b border-d6-line text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-d6-red ${on ? 'bg-d6-ink text-white' : 'hover:bg-d6-grey'}`}
                            >
                              <img src={p.portrait} alt="" className="w-14 h-14 object-cover grayscale" loading="lazy" />
                              <span>
                                <span className="block font-bold text-[18px]">{p.name}</span>
                                <span className={`block text-[13px] ${on ? 'text-white/70' : 'text-d6-mid'}`}>{p.role}</span>
                              </span>
                              <span className={`w-3 h-3 ${on ? 'bg-d6-red' : 'border border-d6-ink'}`} aria-hidden />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="lg:col-span-5">
              <div id="d6-profile" aria-live="polite" className="lg:sticky lg:top-8">
                <AnimatePresence mode="wait">
                  <motion.article key={l.id} initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: [0.77, 0, 0.18, 1] }}>
                    <Photo src={l.portrait} alt={`${l.name} (placeholder portrait)`} imgClass="aspect-[4/5]" />
                    <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.14em] text-d6-red" style={narrow}>
                      {l.role}
                    </p>
                    <h2 className="mt-2 font-d6-sans font-extrabold text-[36px] leading-none tracking-[-0.045em]" style={wide}>
                      {l.name}
                    </h2>
                    {l.quote && <p className="mt-5 text-[19px] font-semibold leading-snug border-l-[6px] border-d6-red pl-4">“{l.quote}”</p>}
                    <p className="mt-5 text-[16px] leading-[1.6] text-d6-ink/80">{l.bio}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {l.expertise.map((e) => (
                        <li key={e} className="px-2.5 py-1 border-2 border-d6-ink text-[12px] font-bold uppercase tracking-[0.08em]" style={narrow}>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Frame>
      </section>
    </>
  );
}
