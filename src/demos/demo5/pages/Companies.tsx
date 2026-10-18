import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { groupCompanies, getCompany } from '../../../data/groupCompanies';
import { Box, Go, Hero, Pill, Sample, Title, Up, P, useMeta } from '../ui';
import NotFound from './NotFound';

export default function Companies() {
  useMeta('Our companies', 'Meet the companies of the group — what they do and who they help (sample content).');
  return (
    <>
      <Hero eyebrow="Our companies" title={<>Six companies, one family.</>} intro="Each company has its own specialism — and they work best together." image="/images/team-laptops.jpg" crumbs={[{ label: 'Our companies' }]} />
      <section className="py-16">
        <Box>
          <div className="flex flex-wrap items-center gap-3">
            <Sample>Fictional sample companies</Sample>
            <p className="text-[15px] text-d5-mute">Names, websites and figures are placeholders for review.</p>
          </div>
          <ul className="mt-10 grid md:grid-cols-2 gap-6">
            {groupCompanies.map((c, i) => (
              <li key={c.slug}>
                <Up delay={(i % 2) * 0.06} className="h-full">
                  <article className="h-full flex flex-col rounded-[32px] bg-white border-2 border-[#efeae1] overflow-hidden hover:border-d5-teal/30 transition-colors">
                    <div className="relative">
                      <img src={c.image.sm} alt={c.image.alt} className="w-full aspect-[16/9] object-cover" loading="lazy" />
                      <span className="absolute top-4 left-4 text-[13px] font-bold px-3.5 py-1.5 rounded-full text-white" style={{ background: c.accent }}>
                        {c.sector}
                      </span>
                    </div>
                    <div className="p-7 flex-1 flex flex-col">
                      <h2 className="text-[24px] font-extrabold leading-tight">{c.name}</h2>
                      <p className="mt-2 text-[16px] text-d5-mute">{c.intro}</p>
                      <div className="mt-5 grid sm:grid-cols-2 gap-5">
                        <div>
                          <p className="text-[13px] font-extrabold text-d5-teal uppercase tracking-wide">What we offer</p>
                          <ul className="mt-2 space-y-1.5 text-[15px]">
                            {c.offerings.map((o) => (
                              <li key={o} className="flex gap-2">
                                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-d5-teal" aria-hidden /> {o}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[13px] font-extrabold text-d5-coral uppercase tracking-wide">Who we help</p>
                          <ul className="mt-2 flex flex-wrap gap-1.5">
                            {c.industries.map((x) => (
                              <li key={x} className="px-3 py-1 rounded-full bg-d5-sand text-[13.5px] font-semibold">
                                {x}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-auto pt-7 flex flex-wrap items-center gap-3">
                        <Link to={P.company(c.slug)} className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-d5-teal text-white font-bold text-[15px] hover:bg-d5-tealdark">
                          Learn more <ArrowRight size={16} aria-hidden />
                        </Link>
                        <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 h-11 px-4 rounded-full bg-d5-sand text-[14px] font-semibold hover:bg-[#f3ece0]">
                          <ExternalLink size={14} aria-hidden /> {c.websiteLabel}
                          <span className="sr-only">(placeholder, opens example.com in a new tab)</span>
                        </a>
                      </div>
                    </div>
                  </article>
                </Up>
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
  const others = groupCompanies.filter((o) => o.slug !== c.slug).slice(0, 3);
  return (
    <>
      <Hero eyebrow={c.sector} title={c.name} intro={c.tagline} image={c.image.src} crumbs={[{ label: 'Our companies', to: P.companies }, { label: c.shortName }]} />
      <section className="py-16">
        <Box className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
          <div>
            <Pill>About {c.shortName}</Pill>
            <div className="mt-5 space-y-4 text-[18px] leading-relaxed text-d5-mute">
              {c.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Title as="h2" className="mt-12 text-[30px]">
              What we offer
            </Title>
            <ul className="mt-5 grid sm:grid-cols-2 gap-4">
              {c.offerings.map((o) => (
                <li key={o} className="flex items-start gap-3 rounded-[24px] bg-d5-sand p-5">
                  <CheckCircle2 size={22} className="text-d5-teal shrink-0" aria-hidden />
                  <span className="text-[16.5px] font-bold">{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="space-y-5">
            <div className="rounded-[28px] bg-d5-sky p-7">
              <p className="font-extrabold text-d5-teal">Who we help</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {c.industries.map((x) => (
                  <li key={x} className="px-3.5 py-1.5 rounded-full bg-white text-[14px] font-semibold">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[28px] border-2 border-[#efeae1] p-7">
              <div className="flex items-center justify-between">
                <p className="font-extrabold">At a glance</p>
                <Sample>Illustrative</Sample>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-4">
                {c.sampleMetrics.map((m) => (
                  <div key={m.label} className="flex flex-col-reverse">
                    <dt className="text-[13.5px] text-d5-mute">{m.label}</dt>
                    <dd className="text-[30px] font-extrabold text-d5-coral leading-none">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Go to={P.contact} tone="coral" className="w-full">
              Talk to {c.shortName}
            </Go>
            <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 h-12 rounded-full bg-d5-sand font-semibold text-[14.5px]">
              <ExternalLink size={15} aria-hidden /> {c.websiteLabel}
              <span className="sr-only">(placeholder, opens example.com in a new tab)</span>
            </a>
          </aside>
        </Box>
      </section>
      <section className="py-16 bg-d5-sand/70">
        <Box>
          <Title as="h2" className="text-[28px]">
            You might also like
          </Title>
          <ul className="mt-8 grid md:grid-cols-3 gap-5">
            {others.map((o) => (
              <li key={o.slug}>
                <Link to={P.company(o.slug)} className="group flex items-center gap-4 rounded-[24px] bg-white p-4 hover:shadow-md transition-shadow">
                  <img src={o.image.sm} alt="" className="w-20 h-20 rounded-2xl object-cover" loading="lazy" />
                  <span>
                    <span className="block font-extrabold group-hover:text-d5-teal">{o.shortName}</span>
                    <span className="block text-[14px] text-d5-mute">{o.sector}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Box>
      </section>
    </>
  );
}
