import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { about, capabilities, sampleStats } from '../../../data/about';
import { groupCompanies } from '../../../data/groupCompanies';
import { news, formatDate } from '../../../data/news';
import { roadmap } from '../../../data/roadmap';
import { partnershipTypes } from '../../../data/partnerships';
import { Count, Frame, Go, H, Label, P, Photo, Rule, Sample, Wipe, narrow, useMeta, wide } from '../ui';

const ease = [0.77, 0, 0.18, 1] as const;

function Hero() {
  const words = ['Built', 'to', 'last.'];
  return (
    <section className="relative border-b-[3px] border-d6-ink">
      <Frame className="pt-10 lg:pt-14">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-d6-line pb-4">
          <Label n="00">Nexora Group — Index</Label>
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-d6-mid" style={narrow}>
            Industry / Infrastructure / Energy / Technology
          </p>
        </div>
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 pt-10 lg:pt-14 pb-12">
          <div className="lg:col-span-7">
            <h1 className="font-d6-sans font-extrabold tracking-[-0.06em] leading-[0.84] text-[88px] sm:text-[150px] xl:text-[200px]" style={wide}>
              {words.map((w, i) => (
                <span key={w} className="block overflow-hidden pb-[0.04em]">
                  <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.12 }}>
                    {w === 'last.' ? (
                      <>
                        last<span className="text-d6-red">.</span>
                      </>
                    ) : (
                      w
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <Wipe delay={0.4}>
              <Photo src="/images/city-aerial.jpg" alt="Aerial view of a city grid" imgClass="aspect-[4/5] lg:aspect-[4/4.6]" />
            </Wipe>
            <div>
              <p className="text-[19px] leading-[1.45] max-w-md">
                A group of six specialised companies. One standard of engineering, governance and delivery.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Go to={P.companies} className="min-w-[220px]">
                  The companies
                </Go>
                <Go to={P.about} tone="line" className="min-w-[180px]">
                  Profile
                </Go>
              </div>
            </div>
          </div>
        </div>
      </Frame>
      <dl className="grid grid-cols-2 lg:grid-cols-4 border-t-[3px] border-d6-ink">
        {sampleStats.map((s, i) => (
          <div key={s.label} className={`px-5 sm:px-8 lg:px-12 py-8 ${i % 2 ? 'border-l border-d6-line' : ''} ${i >= 2 ? 'border-t lg:border-t-0 border-d6-line' : ''} ${i === 2 ? 'lg:border-l' : ''}`}>
            <dt className="min-h-[2.8em] text-[11px] font-bold uppercase tracking-[0.14em] text-d6-mid" style={narrow}>
              {s.label} <span className="text-d6-red">· {s.note}</span>
            </dt>
            <dd className="mt-3 font-d6-sans font-extrabold text-[56px] sm:text-[72px] leading-none tracking-[-0.05em] tabular-nums" style={wide}>
              <Count value={s.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function CompanyIndex() {
  return (
    <section className="py-20 lg:py-28">
      <Frame>
        <div className="grid lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <Label n="01">Group companies</Label>
            <H className="mt-6 text-[48px] sm:text-[80px]">Six companies. One system.</H>
          </div>
          <p className="lg:col-span-5 text-[17px] text-d6-ink/75">Each company leads in its field and operates under shared standards for safety, quality and governance.</p>
        </div>
        <Rule className="mt-12 bg-d6-ink h-[3px]" />
        <ol>
          {groupCompanies.map((c, i) => (
            <li key={c.slug}>
              <Link to={P.company(c.slug)} className="group grid grid-cols-[48px_1fr_auto] lg:grid-cols-[80px_1.3fr_1fr_160px_40px] gap-4 lg:gap-8 items-center py-6 border-b border-d6-ink/80 hover:bg-d6-red hover:text-white transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-[3px] focus-visible:outline-d6-red">
                <span className="pl-2 text-[14px] font-bold tabular-nums text-d6-red group-hover:text-white">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-d6-sans font-extrabold text-[24px] sm:text-[34px] tracking-[-0.04em] leading-none" style={wide}>
                  {c.shortName}
                </span>
                <span className="hidden lg:block text-[14px] uppercase tracking-[0.1em] font-semibold opacity-70" style={narrow}>
                  {c.sector}
                </span>
                <span className="hidden lg:block overflow-hidden h-[64px]">
                  <img src={c.image.sm} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition" loading="lazy" />
                </span>
                <ArrowUpRight className="justify-self-end mr-2" aria-hidden />
              </Link>
            </li>
          ))}
        </ol>
      </Frame>
    </section>
  );
}

function Principles() {
  const items = [
    { k: 'Vision', v: about.vision },
    { k: 'Mission', v: about.mission },
    { k: 'Why we exist', v: about.whyWeExist },
  ];
  return (
    <section className="bg-d6-ink text-white py-20 lg:py-28">
      <Frame>
        <Label n="02" className="text-white/70">
          Principles
        </Label>
        <div className="mt-12 grid md:grid-cols-3 gap-px bg-white/20">
          {items.map((it, i) => (
            <Wipe key={it.k} delay={i * 0.12} className="bg-d6-ink">
              <div className="h-full pr-6 md:px-6 py-6 md:first:pl-0">
                <p className="font-d6-sans font-extrabold text-[64px] leading-none text-d6-red tabular-nums" style={wide}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-8 text-[13px] font-bold uppercase tracking-[0.14em]" style={narrow}>
                  {it.k}
                </h3>
                <p className="mt-4 text-[18px] leading-[1.5] text-white/80">{it.v}</p>
              </div>
            </Wipe>
          ))}
        </div>
      </Frame>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="py-20 lg:py-28">
      <Frame>
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
            <Label n="03">Capabilities</Label>
            <H className="mt-6 text-[44px] sm:text-[64px]">What the group does.</H>
            <p className="mt-6 text-[16px] text-d6-ink/70 max-w-sm">{about.story[1]}</p>
          </div>
          <ul className="lg:col-span-8 grid sm:grid-cols-2 border-t-[3px] border-l border-d6-ink">
            {capabilities.map((c, i) => (
              <li key={c.title} className="border-r border-b border-d6-ink p-6 min-h-[190px] flex flex-col justify-between hover:bg-d6-grey transition-colors">
                <span className="text-[12px] font-bold tabular-nums text-d6-red">{String.fromCharCode(65 + i)}</span>
                <div>
                  <h3 className="font-d6-sans font-extrabold text-[26px] tracking-[-0.04em]" style={wide}>
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[15px] text-d6-ink/70">{c.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Frame>
    </section>
  );
}

function RoadmapStrip() {
  return (
    <section className="py-20 lg:py-28 bg-d6-grey">
      <Frame>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label n="04">Future roadmap</Label>
            <H className="mt-6 text-[44px] sm:text-[64px]">2026 → 2035</H>
          </div>
          <Sample>Illustrative · not an official commitment</Sample>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {roadmap.map((r, i) => (
            <Link key={r.id} to={`${P.roadmap}#${r.id}`} className="group block bg-white border-t-[6px] border-d6-ink hover:border-d6-red p-6 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold uppercase tracking-[0.14em]" style={narrow}>
                  Phase {i + 1} · {r.label}
                </span>
                <span className="text-[12px] tabular-nums text-d6-mid">{r.horizon}</span>
              </div>
              <div className="mt-6 flex gap-1" aria-hidden>
                {[0, 1, 2].map((k) => (
                  <span key={k} className={`h-2 flex-1 ${k <= i ? 'bg-d6-red' : 'bg-d6-line'}`} />
                ))}
              </div>
              <h3 className="mt-6 font-d6-sans font-extrabold text-[28px] leading-[1] tracking-[-0.04em]" style={wide}>
                {r.title}
              </h3>
              <p className="mt-3 text-[15px] text-d6-ink/70">{r.summary}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] group-hover:text-d6-red" style={narrow}>
                {r.initiatives.length} initiatives <ArrowRight size={15} aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Frame>
    </section>
  );
}

function Latest() {
  const items = news.slice(0, 5);
  return (
    <section className="py-20 lg:py-28">
      <Frame>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label n="05">News</Label>
            <H className="mt-6 text-[44px] sm:text-[64px]">Latest.</H>
          </div>
          <Go to={P.news} tone="line" className="min-w-[200px]">
            All news
          </Go>
        </div>
        <ul className="mt-12 border-t-[3px] border-d6-ink">
          {items.map((n) => (
            <li key={n.slug} className="border-b border-d6-line">
              <Link to={P.article(n.slug)} className="group grid grid-cols-1 md:grid-cols-[180px_140px_1fr_24px] gap-2 md:gap-8 items-baseline py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-d6-red">
                <time dateTime={n.date} className="text-[14px] tabular-nums font-semibold">
                  {formatDate(n.date)}
                </time>
                <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-d6-red" style={narrow}>
                  {n.category}
                </span>
                <span className="text-[20px] sm:text-[24px] font-bold leading-tight tracking-[-0.02em] group-hover:underline decoration-d6-red decoration-[3px] underline-offset-[6px]">{n.title}</span>
                <ArrowUpRight className="hidden md:block text-d6-mid group-hover:text-d6-red" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </Frame>
    </section>
  );
}

function PartnerBand() {
  return (
    <section className="border-t-[3px] border-d6-ink">
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-5 bg-d6-ink text-white px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
          <Label n="06" className="text-white/70">
            Partnerships
          </Label>
          <H className="mt-6 text-[48px] sm:text-[72px]">
            Work
            <br />
            with us<span className="text-d6-red">.</span>
          </H>
          <p className="mt-6 text-[17px] text-white/75 max-w-sm">Five structured programmes, each with its own application.</p>
        </div>
        <ol className="lg:col-span-7">
          {partnershipTypes.map((p, i) => (
            <li key={p.id}>
              <Link to={P.partnerType(p.id)} className="group flex items-center gap-6 px-5 sm:px-8 lg:px-12 h-[88px] border-b border-d6-ink hover:bg-d6-red hover:text-white transition-colors">
                <span className="text-[13px] font-bold tabular-nums text-d6-red group-hover:text-white">P{i + 1}</span>
                <span className="flex-1 font-d6-sans font-extrabold text-[22px] sm:text-[28px] tracking-[-0.04em]" style={wide}>
                  {p.shortTitle}
                </span>
                <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function Home() {
  useMeta('', 'A strict, typographic corporate presence for a diversified industrial and technology group (design concept).');
  return (
    <>
      <Hero />
      <CompanyIndex />
      <Principles />
      <Capabilities />
      <RoadmapStrip />
      <Latest />
      <PartnerBand />
    </>
  );
}
