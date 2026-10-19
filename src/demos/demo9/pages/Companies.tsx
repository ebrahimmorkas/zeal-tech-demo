import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { groupCompanies, getCompany } from '../../../data/groupCompanies';
import { Cue, Dolly, Fade, Go, P, ROMAN, Sample, Stage, Title, TitleCard, useMeta } from '../ui';
import NotFound from './NotFound';

export default function Companies() {
  useMeta('Companies', 'The six companies of the group (sample content).');
  const [hover, setHover] = useState(0);
  return (
    <>
      <TitleCard scene="II" title="The Companies" intro="Six specialised companies, each leading in its own field." crumbs={[{ label: 'Companies' }]} />
      {/* Full-screen index: hovering a name changes the backdrop still. */}
      <section className="relative min-h-[100svh] overflow-hidden border-t border-d9-graphite">
        <AnimatePresence mode="popLayout">
          <motion.img key={groupCompanies[hover].slug} src={groupCompanies[hover].image.src} alt="" className="absolute inset-0 w-full h-full object-cover saturate-[0.45] brightness-[0.35]" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} />
        </AnimatePresence>
        <Stage className="relative py-20 lg:py-28">
          <ol>
            {groupCompanies.map((c, i) => (
              <li key={c.slug} className="border-b border-d9-bone/15">
                <Link
                  to={P.company(c.slug)}
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  className="group grid grid-cols-[50px_1fr_auto] md:grid-cols-[80px_1fr_260px_40px] gap-4 md:gap-8 items-center py-7 focus-visible:outline focus-visible:outline-1 focus-visible:outline-d9-bone"
                >
                  <span className="font-d9-sans text-[12px] tracking-[0.3em] text-d9-smoke">{ROMAN[i]}</span>
                  <h2 className={`font-d9-serif text-[34px] sm:text-[60px] leading-none transition-all duration-500 ${hover === i ? 'italic translate-x-3' : 'text-d9-ash'}`}>{c.shortName}</h2>
                  <span className="hidden md:block font-d9-sans text-[11.5px] uppercase tracking-[0.3em] text-d9-ash">{c.sector}</span>
                  <ArrowUpRight className={`transition-transform duration-500 ${hover === i ? 'rotate-45' : 'text-d9-smoke'}`} aria-hidden />
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Sample>Company names and details are fictional placeholders</Sample>
          </div>
        </Stage>
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
  const next = groupCompanies[(i + 1) % groupCompanies.length];
  return (
    <>
      <TitleCard scene={`II.${ROMAN[i]}`} title={c.shortName} intro={c.tagline} image={c.image.src} crumbs={[{ label: 'Companies', to: P.companies }, { label: c.shortName }]} />
      <section className="py-24 lg:py-32">
        <Stage className="grid lg:grid-cols-[1.5fr_1fr] gap-16">
          <div>
            <Cue>{c.name}</Cue>
            <Fade>
              <Title as="p" className="mt-8 text-[30px] sm:text-[42px] leading-[1.15]">
                {c.intro}
              </Title>
            </Fade>
            <div className="mt-10 space-y-5 font-d9-sans font-light text-[17px] leading-[1.8] text-d9-ash">
              {c.description.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
            <Cue className="mt-16">Offerings</Cue>
            <ol className="mt-6">
              {c.offerings.map((o, k) => (
                <li key={o} className="flex items-baseline gap-6 py-4 border-t border-d9-graphite">
                  <span className="font-d9-sans text-[11px] tracking-[0.3em] text-d9-smoke w-8">{ROMAN[k]}</span>
                  <span className="font-d9-serif text-[24px]">{o}</span>
                </li>
              ))}
            </ol>
          </div>
          <aside className="lg:pt-16 space-y-12">
            <dl className="grid grid-cols-2 gap-8">
              {c.sampleMetrics.map((m) => (
                <div key={m.label}>
                  <dd className="font-d9-serif italic text-[56px] leading-none">{m.value}</dd>
                  <dt className="mt-2 font-d9-sans text-[11px] uppercase tracking-[0.3em] text-d9-smoke">{m.label}</dt>
                </div>
              ))}
            </dl>
            <Sample>Metrics illustrative</Sample>
            <div>
              <Cue>Industries</Cue>
              <p className="mt-4 font-d9-serif text-[22px] leading-relaxed text-d9-ash">{c.industries.join(' · ')}</p>
            </div>
            <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-5 border-y border-d9-graphite hover:border-d9-bone transition-colors">
              <span>
                <Cue>Website · placeholder</Cue>
                <span className="block mt-2 font-d9-serif text-[20px] break-all">{c.websiteLabel}</span>
              </span>
              <ArrowUpRight className="group-hover:rotate-45 transition-transform" aria-hidden />
              <span className="sr-only">(opens in new tab)</span>
            </a>
            <Go to={P.partner}>Partner with {c.shortName}</Go>
          </aside>
        </Stage>
      </section>
      <Link to={P.company(next.slug)} className="group relative block h-[60vh] overflow-hidden border-t border-d9-graphite">
        <Dolly src={next.image.src} alt="" imgClass="h-[60vh] brightness-[0.45]" />
        <span className="absolute inset-0 grid place-items-center text-center">
          <span>
            <Cue className="!text-d9-ash">Next company</Cue>
            <span className="block mt-4 font-d9-serif text-[48px] sm:text-[88px] leading-none group-hover:italic">{next.shortName}</span>
          </span>
        </span>
      </Link>
    </>
  );
}
