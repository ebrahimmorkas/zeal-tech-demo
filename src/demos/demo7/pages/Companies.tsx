import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { groupCompanies, getCompany } from '../../../data/groupCompanies';
import { Arch, Go, Grow, Kicker, Note, Opening, P, Serif, Wrap, useMeta } from '../ui';
import NotFound from './NotFound';

export default function Companies() {
  useMeta('Companies', 'The six companies of the group and what each one cultivates (sample content).');
  const sectors = ['All', ...Array.from(new Set(groupCompanies.map((c) => c.sector)))];
  const [sector, setSector] = useState('All');
  const items = sector === 'All' ? groupCompanies : groupCompanies.filter((c) => c.sector === sector);
  return (
    <>
      <Opening kicker="The group" title={<>Six companies, <em>one ecosystem.</em></>} intro="Each company tends its own field, while sharing values, governance and resources across the group." image="/images/office-open.jpg" crumbs={[{ label: 'Companies' }]} />
      <section className="py-14 lg:py-20">
        <Wrap>
          <div role="group" aria-label="Filter by sector" className="flex flex-wrap gap-2">
            {sectors.map((s) => (
              <button key={s} type="button" aria-pressed={sector === s} onClick={() => setSector(s)} className={`h-11 px-5 rounded-full text-[14.5px] font-medium border transition-colors ${sector === s ? 'bg-d7-forest border-d7-forest text-d7-mist' : 'border-d7-forest/20 hover:bg-d7-lichen'}`}>
                {s}
              </button>
            ))}
          </div>
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14" aria-live="polite">
            {items.map((c, i) => (
              <li key={c.slug}>
                <Grow delay={(i % 3) * 0.1}>
                  <Link to={P.company(c.slug)} className="group block focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-d7-moss rounded-t-full">
                    <div className="relative overflow-hidden rounded-t-full rounded-b-[32px]">
                      <img src={c.image.sm} alt={c.image.alt} className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      <span className="absolute top-[18%] left-1/2 -translate-x-1/2 grid place-items-center w-14 h-14 rounded-full bg-d7-mist/95 font-d7-serif text-[20px] text-d7-forest">{c.monogram}</span>
                    </div>
                    <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-d7-moss">{c.sector}</p>
                    <h2 className="mt-1 font-d7-serif text-[30px] leading-tight text-d7-forest group-hover:italic">{c.name}</h2>
                    <p className="mt-2 text-d7-soil">{c.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-1 font-medium text-d7-forest underline underline-offset-4 decoration-d7-lime decoration-2">
                      Learn more <ArrowUpRight size={16} aria-hidden />
                    </span>
                  </Link>
                </Grow>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>
    </>
  );
}

export function CompanyDetail() {
  const { slug } = useParams();
  const c = getCompany(slug);
  useMeta(c ? c.name : 'Not found', c ? c.intro : 'Company not found.');
  if (!c) return <NotFound />;
  const others = groupCompanies.filter((x) => x.slug !== c.slug).slice(0, 3);
  return (
    <>
      <Opening kicker={c.sector} title={c.name} intro={c.tagline} image={c.image.src} crumbs={[{ label: 'Companies', to: P.companies }, { label: c.shortName }]} />
      <section className="py-14 lg:py-20">
        <Wrap className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
          <div>
            <p className="font-d7-serif text-[28px] sm:text-[34px] leading-[1.25] text-d7-forest">{c.intro}</p>
            <div className="mt-8 space-y-5 text-[17.5px] leading-relaxed text-d7-soil">
              {c.description.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
            <div className="mt-12 rounded-[40px] bg-white p-8">
              <Kicker>What we offer</Kicker>
              <ul className="mt-5 grid sm:grid-cols-2 gap-4">
                {c.offerings.map((o) => (
                  <li key={o} className="flex items-start gap-3">
                    <span className="mt-0.5 grid place-items-center w-6 h-6 rounded-full bg-d7-lime text-d7-forest shrink-0">
                      <Check size={14} aria-hidden />
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="space-y-6">
            <Arch src={c.image.sm} alt={c.image.alt} imgClass="aspect-[4/3]" className="hidden lg:block" />
            <div className="rounded-[32px] bg-d7-forest text-d7-mist p-7">
              <p className="text-[13px] uppercase tracking-[0.08em] text-d7-lime">At a glance</p>
              <dl className="mt-4 grid grid-cols-2 gap-5">
                {c.sampleMetrics.map((m) => (
                  <div key={m.label}>
                    <dd className="font-d7-serif text-[40px] leading-none">{m.value}</dd>
                    <dt className="mt-1 text-[14px] text-d7-mist/70">{m.label}</dt>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-[12.5px] text-d7-mist/60">Illustrative figures</p>
            </div>
            <div className="rounded-[32px] bg-d7-lichen p-7">
              <p className="text-[13px] uppercase tracking-[0.08em] text-d7-moss font-semibold">Industries served</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {c.industries.map((i) => (
                  <li key={i} className="h-9 px-3.5 rounded-full bg-d7-mist inline-flex items-center text-[14px]">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-full border border-d7-forest/20 h-14 px-6 hover:bg-d7-lichen">
              <span>
                <span className="block text-[12px] text-d7-soil">Visit website (placeholder)</span>
                <span className="block font-medium text-d7-forest text-[14.5px] break-all">{c.websiteLabel}</span>
              </span>
              <ArrowUpRight size={18} aria-hidden />
              <span className="sr-only">(opens in new tab)</span>
            </a>
            <Go to={P.partner}>Partner with us</Go>
          </aside>
        </Wrap>
      </section>
      <section className="pb-16">
        <Wrap>
          <Serif className="text-[36px] text-d7-forest">
            Elsewhere in the <em>group</em>
          </Serif>
          <ul className="mt-8 grid md:grid-cols-3 gap-5">
            {others.map((o) => (
              <li key={o.slug}>
                <Link to={P.company(o.slug)} className="flex items-center gap-4 p-3 rounded-full bg-white hover:bg-d7-lichen">
                  <span className="grid place-items-center w-14 h-14 rounded-full bg-d7-forest text-d7-lime font-semibold shrink-0">{o.monogram}</span>
                  <span className="font-d7-serif text-[20px] text-d7-forest leading-tight">{o.shortName}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Note>Company names and details are fictional placeholders</Note>
          </div>
        </Wrap>
      </section>
    </>
  );
}
