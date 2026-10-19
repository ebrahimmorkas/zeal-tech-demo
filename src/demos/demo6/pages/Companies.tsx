import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { groupCompanies, getCompany } from '../../../data/groupCompanies';
import { Frame, Go, H, Label, P, PageHead, Photo, Sample, Wipe, narrow, useMeta, wide } from '../ui';
import NotFound from './NotFound';

const allIndustries = Array.from(new Set(groupCompanies.flatMap((c) => c.industries)));

export default function Companies() {
  useMeta('Companies', 'The six group companies, their sectors and the industries they serve (sample content).');
  return (
    <>
      <PageHead n="02" title={<>Companies<span className="text-d6-red">.</span></>} intro="Six specialised businesses. Shared governance, shared standards, independent focus." crumbs={[{ label: 'Companies' }]} />

      <section className="py-16 lg:py-24">
        <Frame>
          <ol className="grid md:grid-cols-2 gap-x-10 gap-y-16">
            {groupCompanies.map((c, i) => (
              <li key={c.slug}>
                <Link to={P.company(c.slug)} className="group block focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-d6-red">
                  <div className="flex items-baseline justify-between border-b-[3px] border-d6-ink pb-3">
                    <span className="font-d6-sans font-extrabold text-[48px] leading-none text-d6-red tabular-nums tracking-[-0.05em]" style={wide}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[12px] font-bold uppercase tracking-[0.14em]" style={narrow}>
                      {c.sector}
                    </span>
                  </div>
                  <Wipe delay={(i % 2) * 0.1}>
                    <Photo src={c.image.sm} alt={c.image.alt} className="mt-6" imgClass="aspect-[16/9]" mark={false} />
                  </Wipe>
                  <h2 className="mt-6 font-d6-sans font-extrabold text-[32px] sm:text-[40px] leading-[0.95] tracking-[-0.045em] group-hover:text-d6-red transition-colors" style={wide}>
                    {c.name}
                  </h2>
                  <p className="mt-3 text-[16px] text-d6-ink/75 max-w-lg">{c.tagline}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em] border-b-2 border-d6-ink group-hover:border-d6-red group-hover:text-d6-red pb-0.5" style={narrow}>
                    Company profile <ArrowRight size={15} aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Frame>
      </section>

      <section className="py-16 lg:py-24 bg-d6-grey">
        <Frame>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Label n="2.1">Coverage matrix</Label>
              <H className="mt-6 text-[40px] sm:text-[56px]">Who serves what.</H>
            </div>
            <Sample>Sample data</Sample>
          </div>
          <div className="relative mt-10 overflow-x-auto bg-white border-[3px] border-d6-ink">
            <table className="w-full min-w-[760px] text-left border-collapse">
              <caption className="sr-only">Industries served by each group company (sample data)</caption>
              <thead>
                <tr className="border-b-[3px] border-d6-ink">
                  <th scope="col" className="p-4 text-[11px] font-bold uppercase tracking-[0.14em]" style={narrow}>
                    Company
                  </th>
                  {allIndustries.map((ind) => (
                    <th key={ind} scope="col" className="p-3 text-[11px] font-bold uppercase tracking-[0.08em] align-bottom" style={narrow}>
                      {ind}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groupCompanies.map((c) => (
                  <tr key={c.slug} className="border-b border-d6-line hover:bg-d6-grey">
                    <th scope="row" className="p-4 font-bold text-[15px] whitespace-nowrap">
                      <Link to={P.company(c.slug)} className="hover:text-d6-red">
                        {c.shortName}
                      </Link>
                    </th>
                    {allIndustries.map((ind) => {
                      const on = c.industries.includes(ind);
                      return (
                        <td key={ind} className="p-3">
                          <span className={`block w-4 h-4 ${on ? 'bg-d6-red' : 'border border-d6-line'}`} aria-hidden />
                          <span className="sr-only">{on ? 'Yes' : 'No'}</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Frame>
      </section>
    </>
  );
}

export function CompanyDetail() {
  const { slug } = useParams();
  const c = getCompany(slug);
  useMeta(c ? c.name : 'Not found', c ? c.intro : 'Company not found.');
  if (!c) return <NotFound />;
  const idx = groupCompanies.indexOf(c);
  const next = groupCompanies[(idx + 1) % groupCompanies.length];
  return (
    <>
      <PageHead n={`2.${idx + 1}`} title={c.shortName} intro={c.tagline} crumbs={[{ label: 'Companies', to: P.companies }, { label: c.shortName }]} />
      <section className="py-16 lg:py-24">
        <Frame className="grid lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-4 lg:sticky lg:top-8 self-start">
            <dl className="border-t-[3px] border-d6-ink">
              {[
                ['Legal name', c.name],
                ['Sector', c.sector],
                ['Identifier', c.monogram],
                ['Web', c.websiteLabel],
                ...c.sampleMetrics.map((m) => [m.label, m.value] as const),
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[120px_1fr] gap-4 py-3 border-b border-d6-line">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-d6-mid pt-0.5" style={narrow}>
                    {k}
                  </dt>
                  <dd className="text-[15px] font-semibold break-words">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4">
              <Sample>Metrics illustrative</Sample>
            </div>
            <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center justify-between h-14 px-5 bg-d6-ink text-white text-[14px] font-bold uppercase tracking-[0.08em] hover:bg-d6-red" style={narrow}>
              Visit website
              <ArrowUpRight size={18} aria-hidden />
              <span className="sr-only">(placeholder link, opens in new tab)</span>
            </a>
          </aside>
          <div className="lg:col-span-8">
            <Wipe>
              <Photo src={c.image.src} alt={c.image.alt} imgClass="aspect-[16/9]" />
            </Wipe>
            <p className="mt-10 font-d6-sans font-extrabold text-[26px] sm:text-[32px] leading-[1.1] tracking-[-0.035em]" style={wide}>
              {c.intro}
            </p>
            <div className="mt-8 grid md:grid-cols-2 gap-8 text-[17px] leading-[1.6] text-d6-ink/80">
              {c.description.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
            <div className="mt-14 grid md:grid-cols-2 gap-10">
              <div>
                <Label n="A">Offerings</Label>
                <ul className="mt-4 border-t-[3px] border-d6-ink">
                  {c.offerings.map((o, i) => (
                    <li key={o} className="flex gap-4 py-3 border-b border-d6-line">
                      <span className="text-[12px] font-bold tabular-nums text-d6-red pt-1">{String(i + 1).padStart(2, '0')}</span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Label n="B">Industries</Label>
                <ul className="mt-4 border-t-[3px] border-d6-ink">
                  {c.industries.map((o, i) => (
                    <li key={o} className="flex gap-4 py-3 border-b border-d6-line">
                      <span className="text-[12px] font-bold tabular-nums text-d6-red pt-1">{String(i + 1).padStart(2, '0')}</span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-16 flex flex-wrap gap-3">
              <Go to={P.partner} className="min-w-[240px]">
                Partner with {c.shortName}
              </Go>
              <Go to={P.company(next.slug)} tone="line" className="min-w-[240px]">
                Next: {next.shortName}
              </Go>
            </div>
          </div>
        </Frame>
      </section>
    </>
  );
}
