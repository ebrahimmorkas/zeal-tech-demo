import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import { groupCompanies, getCompany } from '../../../data/groupCompanies';
import { ButtonLink, Container, Eyebrow, Heading, P, PageBanner, Reveal, SampleTag, useMeta } from '../ui';
import NotFound from './NotFound';

export default function Companies() {
  useMeta('Group Companies', 'The specialised companies of the group, their offerings and the industries they serve (sample content).');
  return (
    <>
      <PageBanner
        title="Group Companies"
        intro="Specialised businesses, each a leader in its field, supported by shared governance and group capability."
        image="/images/city-aerial.jpg"
        crumbs={[{ label: 'Group Companies' }]}
      />
      <section className="py-20 lg:py-28">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-10 border-b border-d1-stone">
            <p className="text-d1-muted max-w-2xl">Company names, websites and figures shown are fictional placeholders for design review.</p>
            <SampleTag>{groupCompanies.length} sample companies</SampleTag>
          </div>
          <ul>
            {groupCompanies.map((c, i) => (
              <li key={c.slug} className="py-16 border-b border-d1-stone">
                <Reveal className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
                  <div className={`relative ${i % 2 ? 'lg:order-2' : ''}`}>
                    <img src={c.image.src} alt={c.image.alt} className="w-full aspect-[16/11] object-cover" loading="lazy" />
                    <span className="absolute bottom-0 left-0 bg-white px-5 py-3 font-d1-serif text-[22px] font-semibold text-d1-navy border-t-2" style={{ borderColor: c.accent }}>
                      {c.monogram}
                    </span>
                  </div>
                  <div>
                    <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-d1-gold">{c.sector}</p>
                    <h2 className="mt-3 font-d1-serif text-[36px] sm:text-[42px] font-semibold text-d1-navy leading-tight">{c.name}</h2>
                    <p className="mt-4 text-[18px] leading-relaxed text-d1-ink/85">{c.intro}</p>
                    <div className="mt-8 grid sm:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-[12px] uppercase tracking-[0.16em] font-semibold text-d1-navy">Core offerings</h3>
                        <ul className="mt-3 space-y-2 text-[15px] text-d1-muted">
                          {c.offerings.map((o) => (
                            <li key={o} className="flex gap-2">
                              <Check size={16} className="mt-1 text-d1-gold shrink-0" aria-hidden />
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-[12px] uppercase tracking-[0.16em] font-semibold text-d1-navy">Industries served</h3>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {c.industries.map((ind) => (
                            <li key={ind} className="text-[13px] px-3 py-1.5 border border-d1-stone bg-white text-d1-ink/80">
                              {ind}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-10 flex flex-wrap items-center gap-4">
                      <ButtonLink to={P.company(c.slug)}>
                        Learn More <ArrowRight size={15} aria-hidden />
                      </ButtonLink>
                      <a
                        href={c.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 h-12 px-5 text-[13px] text-d1-muted hover:text-d1-navy border border-transparent hover:border-d1-stone"
                      >
                        <ExternalLink size={14} aria-hidden /> {c.websiteLabel}
                        <span className="sr-only">(placeholder website, opens example.com in a new tab)</span>
                      </a>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}

export function CompanyDetail() {
  const { slug } = useParams();
  const c = getCompany(slug);
  useMeta(c ? c.name : 'Company not found', c ? c.intro : 'The requested company could not be found.');
  if (!c) return <NotFound />;
  const others = groupCompanies.filter((o) => o.slug !== c.slug).slice(0, 3);
  return (
    <>
      <PageBanner title={c.name} intro={c.tagline} image={c.image.src} crumbs={[{ label: 'Group Companies', to: P.companies }, { label: c.shortName }]} />
      <section className="py-20 lg:py-28">
        <Container className="grid lg:grid-cols-[1.4fr_1fr] gap-16">
          <div>
            <Eyebrow>{c.sector}</Eyebrow>
            <Heading className="mt-5 text-[36px] sm:text-[44px]">Company overview</Heading>
            <div className="mt-8 space-y-5 text-[18px] leading-[1.8] text-d1-ink/85">
              {c.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <h2 className="mt-14 font-d1-serif text-[30px] font-semibold text-d1-navy">Core offerings</h2>
            <ul className="mt-6 grid sm:grid-cols-2 gap-px bg-d1-stone border border-d1-stone">
              {c.offerings.map((o, i) => (
                <li key={o} className="bg-white p-6">
                  <span className="font-d1-serif text-d1-gold text-[18px]">0{i + 1}</span>
                  <p className="mt-2 font-d1-serif text-[22px] font-semibold text-d1-navy">{o}</p>
                </li>
              ))}
            </ul>
          </div>
          <aside className="space-y-8">
            <div className="bg-white border border-d1-stone p-8">
              <h2 className="text-[12px] uppercase tracking-[0.18em] font-semibold text-d1-gold">Industries served</h2>
              <ul className="mt-4 space-y-3">
                {c.industries.map((i) => (
                  <li key={i} className="font-d1-serif text-[21px] text-d1-navy border-b border-d1-stone pb-3 last:border-0">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-d1-navy text-white p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-[12px] uppercase tracking-[0.18em] font-semibold text-d1-goldlight">At a glance</h2>
                <SampleTag light>Illustrative</SampleTag>
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-6">
                {c.sampleMetrics.map((m) => (
                  <div key={m.label} className="flex flex-col-reverse">
                    <dt className="mt-2 text-[13px] text-white/60">{m.label}</dt>
                    <dd className="font-d1-serif text-[38px] leading-none">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="border border-d1-stone p-8 bg-white">
              <h2 className="font-d1-serif text-[24px] font-semibold text-d1-navy">Work with {c.shortName}</h2>
              <p className="mt-2 text-d1-muted text-[15px]">Speak with our team about requirements, partnerships or supply.</p>
              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink to={P.contact}>Make an enquiry</ButtonLink>
                <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 h-12 border border-d1-stone text-[13px] text-d1-muted hover:text-d1-navy">
                  <ExternalLink size={14} aria-hidden /> {c.websiteLabel} <span className="sr-only">(placeholder website, opens in a new tab)</span>
                </a>
              </div>
            </div>
          </aside>
        </Container>
      </section>
      <section className="py-20 bg-white border-t border-d1-stone">
        <Container>
          <Heading className="text-[32px]">Other group companies</Heading>
          <ul className="mt-10 grid md:grid-cols-3 gap-8">
            {others.map((o) => (
              <li key={o.slug}>
                <Link to={P.company(o.slug)} className="group block">
                  <img src={o.image.sm} alt="" className="w-full aspect-[16/10] object-cover" loading="lazy" />
                  <p className="mt-4 text-[12px] uppercase tracking-[0.16em] text-d1-gold font-semibold">{o.sector}</p>
                  <p className="mt-1 font-d1-serif text-[24px] font-semibold text-d1-navy group-hover:text-d1-gold transition-colors">{o.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
