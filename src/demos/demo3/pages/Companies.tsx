import { Link, useParams } from 'react-router-dom';
import { groupCompanies, getCompany } from '../../../data/groupCompanies';
import { Fade, Figure, Kicker, Note, Opening, P, Page, ROMAN, ReadLink, Serif, SolidLink, useMeta } from '../ui';
import NotFound from './NotFound';

export default function Companies() {
  useMeta('The Companies', 'The houses of the group — offerings, industries and character (sample content).');
  return (
    <>
      <Opening chapter="Chapter II · The Companies" title={<>Six houses, <em>one name</em></>} deck="Each company is distinct in craft, and shares the same standard of care." crumbs={[{ label: 'Companies' }]} />

      <Page>
        <nav aria-label="Companies index" className="border-y border-d3-rule py-5">
          <ol className="flex flex-wrap justify-center gap-x-8 gap-y-2 font-d3-serif text-[17px]">
            {groupCompanies.map((c, i) => (
              <li key={c.slug}>
                <a href={`#${c.slug}`} className="hover:text-d3-oxblood">
                  <span className="italic text-d3-taupe mr-2">{ROMAN[i]}.</span>
                  {c.shortName}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Page>

      <div className="py-12">
        {groupCompanies.map((c, i) => {
          const flip = i % 2 === 1;
          return (
            <section key={c.slug} id={c.slug} className="scroll-mt-20 py-16 lg:py-24">
              <Page className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                <Fade className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
                  <Figure src={c.image.src} alt={c.image.alt} caption={`${c.name} — representative image`} imgClass={i % 3 === 0 ? 'aspect-[4/3]' : 'aspect-[16/10]'} />
                </Fade>
                <Fade delay={0.1} className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
                  <p className="font-d3-serif italic text-[20px] text-d3-taupe">{ROMAN[i]}.</p>
                  <Kicker className="mt-3">{c.sector}</Kicker>
                  <h2 className="mt-4 font-d3-serif font-light text-[40px] sm:text-[52px] leading-[1.02] tracking-[-0.02em]">{c.name}</h2>
                  <p className="mt-5 text-[18px] leading-[1.75] text-d3-ink/80">{c.intro}</p>
                  <div className="mt-8 grid grid-cols-2 gap-6 border-t border-d3-rule pt-6">
                    <div>
                      <p className="font-d3-sans text-[10.5px] font-semibold uppercase tracking-[0.24em] text-d3-taupe">Offerings</p>
                      <ul className="mt-3 space-y-1.5 font-d3-serif text-[16px]">
                        {c.offerings.map((o) => (
                          <li key={o}>{o}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-d3-sans text-[10.5px] font-semibold uppercase tracking-[0.24em] text-d3-taupe">Industries</p>
                      <ul className="mt-3 space-y-1.5 font-d3-serif italic text-[16px]">
                        {c.industries.map((o) => (
                          <li key={o}>{o}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <ReadLink to={P.company(c.slug)}>Learn more</ReadLink>
                    <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className="font-d3-serif italic text-[15px] text-d3-taupe hover:text-d3-oxblood">
                      {c.websiteLabel} ↗<span className="sr-only"> (placeholder website, opens in new tab)</span>
                    </a>
                  </div>
                </Fade>
              </Page>
            </section>
          );
        })}
      </div>
    </>
  );
}

export function CompanyDetail() {
  const { slug } = useParams();
  const c = getCompany(slug);
  useMeta(c ? c.name : 'Not found', c ? c.intro : 'Company not found.');
  if (!c) return <NotFound />;
  const i = groupCompanies.indexOf(c);
  const others = groupCompanies.filter((o) => o.slug !== c.slug);
  return (
    <>
      <Opening chapter={`House ${ROMAN[i]} · ${c.sector}`} title={c.name} deck={c.tagline} crumbs={[{ label: 'Companies', to: P.companies }, { label: c.shortName }]} />
      <Page>
        <Figure src={c.image.src} alt={c.image.alt} caption="Representative photography" imgClass="aspect-[21/9]" />
      </Page>
      <section className="py-24">
        <Page className="grid lg:grid-cols-12 gap-12">
          <article className="lg:col-span-7 lg:col-start-2 space-y-6 text-[19px] leading-[1.85] text-d3-ink/85">
            <p className="font-d3-serif text-[26px] leading-[1.5] text-d3-ink">{c.intro}</p>
            {c.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <h2 className="pt-10 font-d3-serif font-light text-[40px] text-d3-ink">What we offer</h2>
            <ol className="border-t border-d3-rule">
              {c.offerings.map((o, idx) => (
                <li key={o} className="flex items-baseline gap-6 py-5 border-b border-d3-rule">
                  <span className="font-d3-serif italic text-d3-oxblood w-8">{ROMAN[idx]}</span>
                  <span className="font-d3-serif text-[24px]">{o}</span>
                </li>
              ))}
            </ol>
          </article>
          <aside className="lg:col-span-3 space-y-10 lg:pt-3">
            <div>
              <Kicker>Industries served</Kicker>
              <ul className="mt-4 space-y-2 font-d3-serif italic text-[20px]">
                {c.industries.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="border-t border-d3-rule pt-6">
              <Kicker>In figures</Kicker>
              <dl className="mt-4 space-y-4">
                {c.sampleMetrics.map((m) => (
                  <div key={m.label}>
                    <dt className="text-[13px] text-d3-taupe">{m.label}</dt>
                    <dd className="font-d3-serif font-light text-[44px] leading-none">{m.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-3">
                <Note>Illustrative figures.</Note>
              </div>
            </div>
            <div className="border-t border-d3-rule pt-6 space-y-4">
              <SolidLink to={P.contact}>Make an enquiry</SolidLink>
              <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className="block font-d3-serif italic text-d3-taupe hover:text-d3-oxblood">
                {c.websiteLabel} ↗<span className="sr-only"> (placeholder website, opens in new tab)</span>
              </a>
            </div>
          </aside>
        </Page>
      </section>
      <section className="bg-d3-cream border-t border-d3-rule py-20">
        <Page>
          <Serif className="text-[36px] text-center">
            Other houses of <em>the group</em>
          </Serif>
          <ul className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4">
            {others.map((o) => (
              <li key={o.slug}>
                <Link to={P.company(o.slug)} className="font-d3-serif text-[22px] hover:text-d3-oxblood hover:italic">
                  {o.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </Page>
      </section>
    </>
  );
}
