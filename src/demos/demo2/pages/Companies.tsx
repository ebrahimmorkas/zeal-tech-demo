import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { groupCompanies, getCompany } from '../../../data/groupCompanies';
import { Btn, Illustrative, P, PageHead, Slide, Tag, Ticks, Wrap, useMeta } from '../ui';
import NotFound from './NotFound';

const allIndustries = ['All industries', ...Array.from(new Set(groupCompanies.flatMap((c) => c.industries))).sort()];

export default function Companies() {
  useMeta('Group Companies', 'Operating companies of the group with offerings and industries served (sample content).');
  const [ind, setInd] = useState('All industries');
  const list = ind === 'All industries' ? groupCompanies : groupCompanies.filter((c) => c.industries.includes(ind));
  return (
    <>
      <PageHead index="02" title="Group companies" intro="Operating companies across the industrial value chain." image="/images/assembly-line.jpg" crumbs={[{ label: 'Companies' }]} />
      <section className="py-16 lg:py-24">
        <Wrap>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b-2 border-d2-graphite">
            <div className="flex items-center gap-4">
              <label htmlFor="d2-ind" className="font-d2-mono text-[12px] tracking-[0.12em] text-d2-slate">
                FILTER BY INDUSTRY
              </label>
              <select id="d2-ind" value={ind} onChange={(e) => setInd(e.target.value)} className="h-12 px-4 bg-d2-plate font-d2-display uppercase text-[17px] tracking-[0.04em] border-b-2 border-d2-graphite focus:outline-none focus:border-d2-signal">
                {allIndustries.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </div>
            <p className="font-d2-mono text-[12px] text-d2-slate" aria-live="polite">
              SHOWING {list.length} OF {groupCompanies.length} · FICTIONAL SAMPLE COMPANIES
            </p>
          </div>
          <ul className="mt-12 space-y-12">
            {list.map((c, i) => (
              <li key={c.slug}>
                <Slide>
                  <article className="grid lg:grid-cols-[1fr_1.15fr] border border-d2-line">
                    <div className="relative min-h-[300px]">
                      <img src={c.image.src} alt={c.image.alt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                      <span className="absolute top-0 left-0 bg-d2-graphite text-white font-d2-mono text-[12px] px-4 py-2">UNIT 0{groupCompanies.indexOf(c) + 1}</span>
                      <span className="absolute bottom-0 right-0 w-16 h-16 grid place-items-center font-d2-display font-extrabold text-[24px] text-white" style={{ background: c.accent }}>
                        {c.monogram}
                      </span>
                    </div>
                    <div className="p-7 sm:p-10">
                      <Tag index={`0${i + 1}`}>{c.sector}</Tag>
                      <h2 className="mt-4 font-d2-display font-bold uppercase text-[40px] sm:text-[52px] leading-[0.95]">{c.name}</h2>
                      <p className="mt-4 text-d2-graphite/80 text-[17px] leading-relaxed">{c.intro}</p>
                      <table className="mt-8 w-full text-left text-[15px]">
                        <tbody className="divide-y divide-d2-line border-y border-d2-line">
                          <tr>
                            <th scope="row" className="py-3 pr-4 align-top font-d2-mono text-[11px] tracking-[0.12em] text-d2-slate w-[130px]">
                              OFFERINGS
                            </th>
                            <td className="py-3">{c.offerings.join(' · ')}</td>
                          </tr>
                          <tr>
                            <th scope="row" className="py-3 pr-4 align-top font-d2-mono text-[11px] tracking-[0.12em] text-d2-slate">
                              INDUSTRIES
                            </th>
                            <td className="py-3">{c.industries.join(' · ')}</td>
                          </tr>
                          <tr>
                            <th scope="row" className="py-3 pr-4 align-top font-d2-mono text-[11px] tracking-[0.12em] text-d2-slate">
                              WEBSITE
                            </th>
                            <td className="py-3">
                              <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-d2-mono text-[13px] underline decoration-d2-signal underline-offset-4 hover:text-d2-signal">
                                {c.websiteLabel} <ArrowUpRight size={13} aria-hidden />
                                <span className="sr-only">(placeholder, opens example.com in a new tab)</span>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <Btn to={P.company(c.slug)} variant="dark" className="mt-8">
                        Learn more
                      </Btn>
                    </div>
                  </article>
                </Slide>
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
  useMeta(c ? c.name : 'Company not found', c ? c.intro : 'Company not found.');
  if (!c) return <NotFound />;
  const idx = groupCompanies.indexOf(c);
  const next = groupCompanies[(idx + 1) % groupCompanies.length];
  return (
    <>
      <PageHead index="02" title={c.shortName} intro={c.tagline} image={c.image.src} crumbs={[{ label: 'Companies', to: P.companies }, { label: c.shortName }]} />
      <section className="py-20 lg:py-28">
        <Wrap className="grid lg:grid-cols-[1.4fr_1fr] gap-14">
          <div>
            <Tag index="A">Overview — {c.name}</Tag>
            <div className="mt-6 space-y-5 text-[19px] leading-relaxed text-d2-graphite/85">
              {c.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-14">
              <Tag index="B">Core offerings</Tag>
            </div>
            <ol className="mt-6 grid sm:grid-cols-2 gap-px bg-d2-line border border-d2-line">
              {c.offerings.map((o, i) => (
                <li key={o} className="bg-white p-6">
                  <span className="font-d2-mono text-[12px] text-d2-signal">0{i + 1}</span>
                  <p className="mt-3 font-d2-display font-bold uppercase text-[26px] leading-none">{o}</p>
                </li>
              ))}
            </ol>
          </div>
          <aside className="space-y-6">
            <Ticks className="bg-d2-graphite text-white p-8">
              <div className="flex justify-between items-center">
                <p className="font-d2-mono text-[12px] tracking-[0.12em] text-white/60">KEY FIGURES</p>
                <Illustrative light />
              </div>
              <dl className="mt-6 space-y-6">
                {c.sampleMetrics.map((m) => (
                  <div key={m.label} className="border-t border-white/15 pt-4">
                    <dt className="font-d2-mono text-[11px] text-white/50">{m.label.toUpperCase()}</dt>
                    <dd className="font-d2-display font-extrabold text-[60px] leading-none text-d2-signal">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </Ticks>
            <div className="border border-d2-line p-8">
              <p className="font-d2-mono text-[12px] tracking-[0.12em] text-d2-slate">INDUSTRIES SERVED</p>
              <ul className="mt-4 space-y-2">
                {c.industries.map((i) => (
                  <li key={i} className="font-d2-display uppercase text-[22px] border-b border-d2-line pb-2">
                    {i}
                  </li>
                ))}
              </ul>
              <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-d2-mono text-[13px] hover:text-d2-signal">
                {c.websiteLabel} <ArrowUpRight size={14} aria-hidden />
                <span className="sr-only">(placeholder website, opens in new tab)</span>
              </a>
            </div>
            <Btn to={P.contact} className="w-full">
              Request a consultation
            </Btn>
          </aside>
        </Wrap>
      </section>
      <Link to={P.company(next.slug)} className="group block bg-d2-plate border-t border-d2-line hover:bg-d2-graphite hover:text-white transition-colors">
        <Wrap className="py-14 flex items-center justify-between gap-6">
          <span>
            <span className="font-d2-mono text-[12px] text-d2-slate group-hover:text-white/60">NEXT COMPANY</span>
            <span className="block mt-2 font-d2-display font-bold uppercase text-[40px] sm:text-[64px] leading-none">{next.shortName}</span>
          </span>
          <ArrowUpRight size={48} className="text-d2-signal shrink-0" aria-hidden />
        </Wrap>
      </Link>
    </>
  );
}
