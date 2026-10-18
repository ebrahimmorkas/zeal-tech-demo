import { leaders } from '../../../data/leadership';
import type { Leader } from '../../../types';
import { Display, PageHead, Slide, Tag, Ticks, Wrap, useMeta } from '../ui';

const groups: { key: Leader['group'][]; title: string; index: string }[] = [
  { key: ['Chairman', 'Managing Director'], title: 'Executive leadership', index: 'A' },
  { key: ['Director'], title: 'Board of directors', index: 'B' },
  { key: ['Advisor'], title: 'Advisory council', index: 'C' },
];

function Card({ l, large }: { l: Leader; large?: boolean }) {
  return (
    <Ticks className="group h-full border border-d2-line bg-white flex flex-col">
      <div className="relative overflow-hidden">
        <img src={l.portrait} alt={`${l.name}, ${l.role} (placeholder portrait)`} className={`w-full ${large ? 'aspect-[4/3]' : 'aspect-square'} object-cover object-top grayscale group-hover:grayscale-0 transition duration-500`} loading="lazy" />
        <span className="absolute top-0 left-0 bg-d2-signal text-white font-d2-mono text-[11px] px-3 py-1.5">{l.group.toUpperCase()}</span>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className={`font-d2-display font-bold uppercase leading-none ${large ? 'text-[40px]' : 'text-[28px]'}`}>{l.name}</h3>
        <p className="mt-2 font-d2-mono text-[12px] text-d2-slate">{l.role.toUpperCase()}</p>
        <p className="mt-4 text-[15px] text-d2-graphite/80 leading-relaxed flex-1">{l.bio}</p>
        <dl className="mt-5 pt-4 border-t border-d2-line">
          <dt className="font-d2-mono text-[11px] tracking-[0.12em] text-d2-slate">EXPERTISE</dt>
          <dd className="mt-2 flex flex-wrap gap-1.5">
            {l.expertise.map((e) => (
              <span key={e} className="px-2 py-1 bg-d2-plate text-[13px]">
                {e}
              </span>
            ))}
          </dd>
        </dl>
      </div>
    </Ticks>
  );
}

export default function Leadership() {
  useMeta('Leadership', 'Executive leadership, board of directors and advisors (fictional placeholder profiles).');
  return (
    <>
      <PageHead index="08" title="Leadership" intro="Governance and executive accountability across every operating company." image="/images/meeting-table.jpg" crumbs={[{ label: 'Leadership' }]} />
      <div className="bg-d2-plate border-b border-d2-line">
        <Wrap className="py-3 font-d2-mono text-[12px] text-d2-slate">NOTE: ALL PROFILES ARE FICTIONAL PLACEHOLDERS AND DO NOT REPRESENT THE CLIENT’S LEADERSHIP.</Wrap>
      </div>
      {groups.map((g, gi) => {
        const people = leaders.filter((l) => g.key.includes(l.group));
        return (
          <section key={g.title} className={`py-16 lg:py-24 ${gi === 1 ? 'bg-d2-plate' : ''}`}>
            <Wrap>
              <Tag index={g.index}>{g.title}</Tag>
              <Display className="mt-4 text-[44px] sm:text-[60px]">{g.title}</Display>
              <ul className={`mt-10 grid gap-6 ${gi === 0 ? 'md:grid-cols-2' : gi === 1 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
                {people.map((l, i) => (
                  <li key={l.id}>
                    <Slide delay={i * 0.06} className="h-full">
                      <Card l={l} large={gi === 0} />
                    </Slide>
                  </li>
                ))}
              </ul>
            </Wrap>
          </section>
        );
      })}
    </>
  );
}
