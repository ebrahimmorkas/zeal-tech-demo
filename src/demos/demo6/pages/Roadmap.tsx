import { useState } from 'react';
import { roadmap, strategicPillars } from '../../../data/roadmap';
import type { InitiativeType } from '../../../types';
import { Frame, Go, H, Label, P, PageHead, Sample, Wipe, narrow, useMeta, wide } from '../ui';

const types: InitiativeType[] = ['Expansion', 'Technology', 'Sustainability', 'Operations', 'People'];
/** Each initiative type is coded by a distinct shape rather than colour alone. */
const shape: Record<InitiativeType, string> = {
  Expansion: 'bg-d6-red',
  Technology: 'bg-d6-ink',
  Sustainability: 'border-2 border-d6-ink rounded-full',
  Operations: 'border-2 border-d6-ink',
  People: 'bg-d6-ink rounded-full',
};

export default function Roadmap() {
  useMeta('Roadmap', 'An illustrative three-phase future roadmap, 2026 to 2035 (sample content, not an official commitment).');
  const [filter, setFilter] = useState<InitiativeType | 'All'>('All');
  return (
    <>
      <PageHead n="04" title={<>Roadmap<span className="text-d6-red">.</span></>} intro="Three phases, from strengthening the foundation to an enduring, future-ready group." crumbs={[{ label: 'Roadmap' }]} />

      <section className="py-10 border-b border-d6-line">
        <Frame className="flex flex-wrap items-center justify-between gap-4">
          <div role="group" aria-label="Filter initiatives by type" className="flex flex-wrap gap-2">
            {(['All', ...types] as const).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={filter === t}
                onClick={() => setFilter(t)}
                className={`inline-flex items-center gap-2 h-10 px-3 border-2 border-d6-ink text-[12px] font-bold uppercase tracking-[0.1em] transition-colors ${filter === t ? 'bg-d6-ink text-white' : 'hover:bg-d6-grey'}`}
                style={narrow}
              >
                {t !== 'All' && <span className={`w-3 h-3 ${shape[t]} ${filter === t ? 'border-white' : ''}`} aria-hidden />}
                {t}
              </button>
            ))}
          </div>
          <Sample>Illustrative · subject to client confirmation</Sample>
        </Frame>
      </section>

      <section className="py-14 lg:py-20">
        <Frame className="grid lg:grid-cols-3 gap-10 lg:gap-0 lg:divide-x-[3px] divide-d6-ink">
          {roadmap.map((r, i) => (
            <div key={r.id} id={r.id} className="scroll-mt-20 lg:px-8 first:lg:pl-0 last:lg:pr-0">
              <div className="flex items-baseline justify-between border-b-[3px] border-d6-ink pb-3">
                <span className="font-d6-sans font-extrabold text-[64px] leading-none text-d6-red tabular-nums tracking-[-0.05em]" style={wide}>
                  {i + 1}
                </span>
                <span className="text-right text-[12px] font-bold uppercase tracking-[0.12em]" style={narrow}>
                  {r.label}
                  <br />
                  <span className="text-d6-mid tabular-nums">{r.horizon}</span>
                </span>
              </div>
              <Wipe delay={i * 0.1}>
                <H as="h2" className="mt-6 text-[32px]">
                  {r.title}
                </H>
              </Wipe>
              <p className="mt-3 text-[16px] text-d6-ink/75">{r.summary}</p>
              <ul className="mt-8 border-t border-d6-ink">
                {r.initiatives.map((it) => {
                  const dim = filter !== 'All' && filter !== it.type;
                  return (
                    <li key={it.title} className={`py-5 border-b border-d6-line transition-opacity duration-300 ${dim ? 'opacity-20' : ''}`}>
                      <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-d6-mid" style={narrow}>
                        <span className={`w-3 h-3 ${shape[it.type]}`} aria-hidden />
                        {it.type}
                      </p>
                      <h3 className="mt-2 font-bold text-[19px]">{it.title}</h3>
                      <p className="mt-1 text-[15px] text-d6-ink/70">{it.description}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </Frame>
      </section>

      <section className="py-16 lg:py-24 bg-d6-ink text-white">
        <Frame>
          <Label n="4.1" className="text-white/70">
            Strategic pillars
          </Label>
          <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/25">
            {strategicPillars.map((s, i) => (
              <li key={s.title} className="bg-d6-ink py-6 sm:px-6 sm:first:pl-0">
                <span className="text-d6-red font-bold tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-6 font-d6-sans font-extrabold text-[26px] leading-none tracking-[-0.04em]" style={wide}>
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] text-white/70">{s.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14">
            <Go to={P.partner} className="min-w-[260px]">
              Build it with us
            </Go>
          </div>
        </Frame>
      </section>
    </>
  );
}
