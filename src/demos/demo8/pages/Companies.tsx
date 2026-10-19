import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { groupCompanies, getCompany } from '../../../data/groupCompanies';
import { Big, Box, Go, Outline, P, POP, PageHead, Pop, Sample, Sticker, Tag, card, lift, useMeta } from '../ui';
import NotFound from './NotFound';

export default function Companies() {
  useMeta('Companies', 'Meet the six companies in the group (sample content).');
  return (
    <>
      <PageHead title={<>The <Outline>crew.</Outline></>} intro="Six companies with different jobs and the same high bar." crumbs={[{ label: 'Companies' }]} color="bg-d8-pink" sticker="6 of 6" />
      <section className="py-16 lg:py-24">
        <Box>
          <ul className="grid md:grid-cols-2 gap-8">
            {groupCompanies.map((c, i) => (
              <li key={c.slug}>
                <Pop delay={(i % 2) * 0.08} tilt={i % 2 ? 2 : -2} className="h-full">
                  <Link to={P.company(c.slug)} className={`group grid sm:grid-cols-[1fr_1.1fr] h-full bg-white overflow-hidden ${card} ${lift} focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-d8-blue`}>
                    <div className="relative border-b-[3px] sm:border-b-0 sm:border-r-[3px] border-d8-ink">
                      <img src={c.image.sm} alt={c.image.alt} className="w-full h-full min-h-[220px] object-cover" loading="lazy" />
                      <span className={`absolute top-3 left-3 grid place-items-center w-14 h-14 border-[3px] border-d8-ink rounded-xl font-d8-display font-extrabold text-[20px] -rotate-6 ${POP[i % 4]}`}>{c.monogram}</span>
                    </div>
                    <div className={`flex flex-col p-6 ${POP[(i + 2) % 4]}`}>
                      <span className="font-d8-mono text-[12px] uppercase">{c.sector}</span>
                      <h2 className="mt-3 font-d8-display font-extrabold text-[30px] leading-[0.95] tracking-[-0.03em]">{c.name}</h2>
                      <p className="mt-3 font-medium opacity-85">{c.tagline}</p>
                      <span className="mt-auto pt-6 inline-flex items-center gap-1 font-d8-display font-extrabold">
                        Learn more <ArrowUpRight size={20} strokeWidth={2.75} className="transition-transform group-hover:rotate-45" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </Pop>
              </li>
            ))}
          </ul>
        </Box>
      </section>
    </>
  );
}

export function CompanyDetail() {
  const { slug } = useParams();
  const c = getCompany(slug);
  useMeta(c ? c.name : 'Not found', c ? c.intro : 'Company not found.');
  if (!c) return <NotFound />;
  const i = groupCompanies.indexOf(c);
  const color = POP[i % 4];
  return (
    <>
      <PageHead title={c.shortName} intro={c.tagline} crumbs={[{ label: 'Companies', to: P.companies }, { label: c.shortName }]} color={color} sticker={c.monogram} />
      <section className="py-16 lg:py-24">
        <Box className="grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
          <div>
            <img src={c.image.src} alt={c.image.alt} className={`w-full aspect-[16/9] object-cover ${card}`} />
            <Big as="p" className="mt-10 text-[30px] sm:text-[38px]">
              {c.intro}
            </Big>
            <div className="mt-6 space-y-4 text-[17px] font-medium text-d8-gray">
              {c.description.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
            <h2 className="mt-12 font-d8-display font-extrabold text-[32px]">What they do</h2>
            <ul className="mt-5 flex flex-wrap gap-3">
              {c.offerings.map((o, k) => (
                <li key={o}>
                  <Sticker className={POP[k % 4].split(' ')[0]} rotate={k % 2 ? 2 : -2}>
                    {o}
                  </Sticker>
                </li>
              ))}
            </ul>
          </div>
          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className={`p-6 bg-white ${card}`}>
              <h2 className="font-d8-display font-extrabold text-[22px]">Quick facts</h2>
              <dl className="mt-4 grid grid-cols-2 gap-3">
                {c.sampleMetrics.map((m, k) => (
                  <div key={m.label} className={`p-4 border-[3px] border-d8-ink rounded-xl ${POP[(k + 1) % 4]}`}>
                    <dd className="font-d8-display font-extrabold text-[34px] leading-none">{m.value}</dd>
                    <dt className="mt-1 font-d8-mono text-[11px] uppercase">{m.label}</dt>
                  </div>
                ))}
              </dl>
              <p className="mt-3">
                <Sample>Illustrative</Sample>
              </p>
              <h3 className="mt-6 font-d8-mono text-[12px] uppercase">Industries</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {c.industries.map((x) => (
                  <li key={x}>
                    <Tag>{x}</Tag>
                  </li>
                ))}
              </ul>
            </div>
            <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-between gap-3 p-5 bg-d8-ink text-d8-cream ${card} ${lift}`}>
              <span>
                <span className="block font-d8-mono text-[11px] uppercase text-d8-yellow">Website (placeholder)</span>
                <span className="block font-d8-display font-bold break-all">{c.websiteLabel}</span>
              </span>
              <ArrowUpRight size={24} strokeWidth={2.75} aria-hidden />
              <span className="sr-only">(opens in new tab)</span>
            </a>
            <Go to={P.partner} tone="pink" className="w-full">
              Partner with them
            </Go>
          </aside>
        </Box>
      </section>
    </>
  );
}
