import { useState } from 'react';
import { leaders } from '../../../data/leadership';
import type { Leader } from '../../../types';
import { Card, Chip, H, Label, Mono, PageTop, Rise, SampleChip, Shell, useMeta } from '../ui';

const filters: ('All' | Leader['group'])[] = ['All', 'Chairman', 'Managing Director', 'Director', 'Advisor'];

export default function Leadership() {
  useMeta('Leadership', 'Group leadership: chairman, managing director, directors and advisors (fictional placeholder profiles).');
  const [f, setF] = useState<(typeof filters)[number]>('All');
  const [openId, setOpenId] = useState<string | null>(null);
  const principals = leaders.slice(0, 2);
  const list = leaders.filter((l) => f === 'All' || l.group === f);

  return (
    <>
      <PageTop label="leadership" title={<>The team steering the group.</>} intro="Placeholder profiles illustrating how leadership will be presented." crumbs={[{ label: 'Leadership' }]} />
      <section className="py-16 lg:py-24">
        <Shell>
          <div className="grid md:grid-cols-2 gap-5">
            {principals.map((l) => (
              <Card key={l.id} className="p-6 sm:p-8 grid sm:grid-cols-[160px_1fr] gap-6 items-start">
                <img src={l.portrait} alt={`${l.name}, ${l.role} (placeholder portrait)`} className="w-full aspect-[4/5] rounded-2xl object-cover object-top" loading="lazy" />
                <div>
                  <Label>{l.role.toLowerCase()}</Label>
                  <H as="h2" className="mt-2 text-[26px]">
                    {l.name}
                  </H>
                  <p className="mt-3 font-d4-display text-[17px] leading-snug text-d4-deep/80">“{l.quote}”</p>
                  <p className="mt-3 text-[14.5px] text-d4-deep/65">{l.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {l.expertise.map((e) => (
                      <Chip key={e}>{e}</Chip>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-16 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Label>full roster</Label>
              <H as="h2" className="mt-2 text-[30px]">
                Board & advisors
              </H>
            </div>
            <div role="group" aria-label="Filter by role" className="inline-flex flex-wrap gap-1 p-1 rounded-2xl bg-white ring-1 ring-[#e4e8f2]">
              {filters.map((x) => (
                <button key={x} type="button" aria-pressed={f === x} onClick={() => setF(x)} className={`h-9 px-3.5 rounded-xl text-[13.5px] ${f === x ? 'bg-d4-deep text-white' : 'text-d4-deep/70 hover:bg-d4-mist'}`}>
                  {x === 'All' ? 'All' : `${x}${x === 'Director' || x === 'Advisor' ? 's' : ''}`}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <SampleChip />
          </div>
          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-live="polite">
            {list.map((l, i) => {
              const open = openId === l.id;
              return (
                <li key={l.id}>
                  <Rise delay={(i % 4) * 0.05} className="h-full">
                    <Card className="overflow-hidden h-full flex flex-col">
                      <img src={l.portrait} alt={`${l.name} (placeholder portrait)`} className="w-full aspect-square object-cover object-top" loading="lazy" />
                      <div className="p-5 flex-1 flex flex-col">
                        <Mono className="text-d4-indigo">{l.group.toLowerCase()}</Mono>
                        <p className="mt-1 font-d4-display text-[18px]">{l.name}</p>
                        <p className="text-[13.5px] text-d4-deep/60">{l.role}</p>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {l.expertise.slice(0, 2).map((e) => (
                            <Chip key={e} className="!h-6 !text-[11.5px]">
                              {e}
                            </Chip>
                          ))}
                        </div>
                        {open && (
                          <p id={`d4-bio-${l.id}`} className="mt-3 text-[14px] text-d4-deep/70">
                            {l.bio}
                          </p>
                        )}
                        <button type="button" aria-expanded={open} aria-controls={`d4-bio-${l.id}`} onClick={() => setOpenId(open ? null : l.id)} className="mt-auto pt-4 text-left text-[14px] font-medium text-d4-indigo">
                          {open ? 'Hide biography' : 'Read biography'}
                        </button>
                      </div>
                    </Card>
                  </Rise>
                </li>
              );
            })}
          </ul>
        </Shell>
      </section>
    </>
  );
}
