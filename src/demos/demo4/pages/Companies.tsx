import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { groupCompanies, getCompany } from '../../../data/groupCompanies';
import { Btn, Card, Chip, H, Label, Mono, P, PageTop, Rise, SampleChip, Shell, useMeta } from '../ui';
import NotFound from './NotFound';

const sectors = ['All', ...groupCompanies.map((c) => c.sector)];

export default function Companies() {
  useMeta('Business Units', 'The group’s business units, their offerings and industries served (sample content).');
  const [q, setQ] = useState('All');
  const list = q === 'All' ? groupCompanies : groupCompanies.filter((c) => c.sector === q);
  return (
    <>
      <PageTop label="business units" title={<>Six units. One connected platform.</>} intro="Specialised companies that share data, standards and capital." crumbs={[{ label: 'Business Units' }]} />
      <section className="py-16 lg:py-24">
        <Shell>
          <div role="group" aria-label="Filter by sector" className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {sectors.map((s) => (
              <button key={s} type="button" aria-pressed={q === s} onClick={() => setQ(s)} className={`shrink-0 h-10 px-4 rounded-full text-[14px] transition-all ${q === s ? 'bg-d4-deep text-white' : 'bg-white ring-1 ring-[#e4e8f2] hover:ring-d4-indigo/50'}`}>
                {s}
              </button>
            ))}
          </div>
          <ul className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5" aria-live="polite">
            {list.map((c, i) => (
              <li key={c.slug}>
                <Rise delay={(i % 3) * 0.06} className="h-full">
                  <Card className="group h-full overflow-hidden flex flex-col hover:ring-d4-indigo/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(13,19,38,0.35)] transition-all duration-300">
                    <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${c.accent}, #2fc9b4)` }} aria-hidden />
                    <div className="relative">
                      <img src={c.image.sm} alt={c.image.alt} className="w-full aspect-[16/9] object-cover" loading="lazy" />
                      <span className="absolute -bottom-6 left-6 grid place-items-center w-12 h-12 rounded-xl font-d4-display font-semibold text-white ring-4 ring-white" style={{ background: c.accent }}>
                        {c.monogram}
                      </span>
                    </div>
                    <div className="p-6 pt-10 flex-1 flex flex-col">
                      <Mono className="text-d4-indigo">{c.sector.toLowerCase()}</Mono>
                      <h2 className="mt-1.5 font-d4-display text-[21px] font-medium tracking-[-0.02em]">{c.name}</h2>
                      <p className="mt-2 text-[14.5px] text-d4-deep/65">{c.intro}</p>
                      <ul className="mt-4 space-y-1.5 text-[14px]">
                        {c.offerings.slice(0, 3).map((o) => (
                          <li key={o} className="flex gap-2">
                            <Check size={15} className="mt-0.5 text-d4-teal shrink-0" aria-hidden /> {o}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {c.industries.map((x) => (
                          <Chip key={x}>{x}</Chip>
                        ))}
                      </div>
                      <div className="mt-auto pt-6 flex items-center justify-between gap-3">
                        <Link to={P.company(c.slug)} className="inline-flex items-center gap-1.5 text-[14.5px] font-medium text-d4-indigo hover:gap-2.5 transition-all">
                          Learn more <ArrowRight size={15} aria-hidden />
                        </Link>
                        <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-d4-mono text-[11.5px] text-d4-deep/50 hover:text-d4-deep">
                          website <ArrowUpRight size={12} aria-hidden />
                          <span className="sr-only">{c.websiteLabel} (placeholder, opens example.com in a new tab)</span>
                        </a>
                      </div>
                    </div>
                  </Card>
                </Rise>
              </li>
            ))}
          </ul>
        </Shell>
      </section>
    </>
  );
}

export function CompanyDetail() {
  const { slug } = useParams();
  const c = getCompany(slug);
  useMeta(c ? c.name : 'Not found', c ? c.intro : 'Business unit not found.');
  if (!c) return <NotFound />;
  return (
    <>
      <PageTop
        label={`business units / ${c.monogram.toLowerCase()}`}
        title={c.name}
        intro={c.tagline}
        crumbs={[{ label: 'Business Units', to: P.companies }, { label: c.shortName }]}
        aside={
          <div className="rounded-2xl overflow-hidden ring-1 ring-white/10">
            <img src={c.image.sm} alt={c.image.alt} className="w-full aspect-[4/3] object-cover" />
          </div>
        }
      />
      <section className="py-16 lg:py-24">
        <Shell className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
          <Card className="p-8 sm:p-10">
            <Label>overview</Label>
            <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-d4-deep/75">
              {c.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <H as="h2" className="mt-10 text-[26px]">
              Core offerings
            </H>
            <ul className="mt-5 grid sm:grid-cols-2 gap-3">
              {c.offerings.map((o, i) => (
                <li key={o} className="flex items-center gap-3 p-4 rounded-xl bg-d4-mist">
                  <span className="font-d4-mono text-[12px] text-d4-indigo">0{i + 1}</span>
                  <span className="text-[15px]">{o}</span>
                </li>
              ))}
            </ul>
          </Card>
          <div className="space-y-6">
            <div className="rounded-2xl bg-d4-void text-white p-7">
              <div className="flex items-center justify-between">
                <Label dark>metrics</Label>
                <SampleChip dark />
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-4">
                {c.sampleMetrics.map((m) => (
                  <div key={m.label} className="flex flex-col-reverse">
                    <dt className="font-d4-mono text-[11px] text-d4-haze mt-1">{m.label}</dt>
                    <dd className="font-d4-display text-[30px]">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Card className="p-7">
              <Label>industries served</Label>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.industries.map((x) => (
                  <Chip key={x}>{x}</Chip>
                ))}
              </div>
              <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center justify-between p-4 rounded-xl bg-d4-mist hover:bg-[#e9edf7] text-[14px]">
                <span className="font-d4-mono">{c.websiteLabel}</span>
                <ArrowUpRight size={16} aria-hidden />
                <span className="sr-only">(placeholder, opens example.com in a new tab)</span>
              </a>
            </Card>
            <Btn to={P.contact} className="w-full">
              Talk to {c.shortName}
            </Btn>
          </div>
        </Shell>
      </section>
    </>
  );
}
