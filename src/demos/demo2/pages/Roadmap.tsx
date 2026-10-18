import { useState } from 'react';
import { roadmap, strategicPillars } from '../../../data/roadmap';
import type { InitiativeType } from '../../../types';
import { Btn, Display, Illustrative, P, PageHead, Tag, Ticks, Wrap, useMeta } from '../ui';

const tracks: InitiativeType[] = ['Expansion', 'Technology', 'Sustainability', 'Operations', 'People'];

export default function Roadmap() {
  useMeta('Future Roadmap', 'Illustrative strategic roadmap with initiatives across expansion, technology, sustainability, operations and people.');
  const [selected, setSelected] = useState<{ phase: string; title: string } | null>(null);
  const detail = selected ? roadmap.find((p) => p.id === selected.phase)!.initiatives.find((i) => i.title === selected.title)! : null;

  return (
    <>
      <PageHead index="06" title="Future roadmap" intro="Programme view of strategic initiatives by workstream and horizon." image="/images/wind-hills.jpg" crumbs={[{ label: 'Roadmap' }]} />
      <div className="bg-d2-signal text-white">
        <Wrap className="py-3 font-d2-mono text-[12px] tracking-[0.08em]">ILLUSTRATIVE ROADMAP — NOT AN OFFICIAL COMMITMENT. ALL MILESTONES SUBJECT TO CLIENT CONFIRMATION.</Wrap>
      </div>

      <section className="py-16 lg:py-24">
        <Wrap>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Tag index="A">Programme chart</Tag>
              <Display className="mt-4 text-[48px] sm:text-[64px]">Workstreams × horizons</Display>
            </div>
            <Illustrative />
          </div>

          <div className="mt-12 overflow-x-auto no-scrollbar border border-d2-line">
            <table className="w-full min-w-[920px] border-collapse">
              <caption className="sr-only">Roadmap initiatives by workstream and time horizon. Select an initiative for details.</caption>
              <thead>
                <tr className="bg-d2-graphite text-white">
                  <th scope="col" className="w-[170px] p-4 text-left font-d2-mono text-[11px] tracking-[0.12em] text-white/60">
                    WORKSTREAM
                  </th>
                  {roadmap.map((p) => (
                    <th key={p.id} scope="col" className="p-4 text-left border-l border-white/10">
                      <span className="block font-d2-mono text-[11px] text-d2-signal">{p.horizon}</span>
                      <span className="block font-d2-display uppercase text-[22px] font-bold leading-none mt-1">{p.label}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tracks.map((t) => (
                  <tr key={t} className="border-t border-d2-line">
                    <th scope="row" className="p-4 text-left font-d2-display uppercase text-[19px] font-semibold bg-d2-plate">
                      {t}
                    </th>
                    {roadmap.map((p) => {
                      const items = p.initiatives.filter((i) => i.type === t);
                      return (
                        <td key={p.id} className="p-3 border-l border-d2-line align-top">
                          {items.map((i) => {
                            const on = selected?.title === i.title;
                            return (
                              <button
                                key={i.title}
                                type="button"
                                aria-pressed={on}
                                onClick={() => setSelected(on ? null : { phase: p.id, title: i.title })}
                                className={`w-full text-left px-4 py-3 border-l-4 transition-colors font-d2-display uppercase text-[17px] leading-tight ${on ? 'bg-d2-graphite text-white border-d2-signal' : 'bg-d2-plate border-d2-signal hover:bg-d2-graphite hover:text-white'}`}
                              >
                                {i.title}
                              </button>
                            );
                          })}
                          {items.length === 0 && <span className="block h-full min-h-[48px] bg-[repeating-linear-gradient(135deg,transparent,transparent_6px,#eceff2_6px,#eceff2_7px)]" aria-label="No initiative" />}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div aria-live="polite" className="mt-6 min-h-[110px]">
            {detail ? (
              <Ticks className="bg-d2-graphite text-white p-6 flex flex-col md:flex-row gap-4 md:items-center">
                <span className="font-d2-mono text-[12px] text-d2-signal shrink-0">{detail.type.toUpperCase()}</span>
                <span className="font-d2-display font-bold uppercase text-[26px] leading-none shrink-0">{detail.title}</span>
                <span className="text-white/75">{detail.description}</span>
              </Ticks>
            ) : (
              <p className="font-d2-mono text-[12px] text-d2-slate">Select an initiative in the chart to view details.</p>
            )}
          </div>
        </Wrap>
      </section>

      <section className="bg-d2-graphite text-white py-20 lg:py-28">
        <Wrap>
          <Tag index="B" light>
            Horizon summaries
          </Tag>
          <ol className="mt-10 grid lg:grid-cols-3 gap-px bg-white/10">
            {roadmap.map((p, i) => (
              <li key={p.id} className="bg-d2-graphite p-8">
                <p className="font-d2-display font-extrabold text-[96px] leading-none text-white/10">0{i + 1}</p>
                <p className="font-d2-mono text-[12px] text-d2-signal -mt-6">{p.horizon}</p>
                <h2 className="mt-3 font-d2-display font-bold uppercase text-[34px] leading-none">{p.title}</h2>
                <p className="mt-4 text-white/70">{p.summary}</p>
              </li>
            ))}
          </ol>
          <div className="mt-16">
            <Tag index="C" light>
              Strategic pillars
            </Tag>
            <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {strategicPillars.map((s) => (
                <li key={s.title} className="border-t-2 border-d2-signal pt-4">
                  <p className="font-d2-display font-bold uppercase text-[22px]">{s.title}</p>
                  <p className="mt-2 text-[15px] text-white/65">{s.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <Btn to={P.partner} className="mt-14">
            Partner on our next phase
          </Btn>
        </Wrap>
      </section>
    </>
  );
}
