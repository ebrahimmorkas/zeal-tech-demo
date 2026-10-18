import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { BRAND, INDUSTRIES_SERVED } from '../../../data/brand';
import { groupCompanies } from '../../../data/groupCompanies';
import { capabilities, sampleStats } from '../../../data/about';
import { news, formatDate } from '../../../data/news';
import { chairman, managingDirector } from '../../../data/leadership';
import { ICONS } from '../../../lib/icons';
import { Btn, Display, Illustrative, P, Slide, Tag, Ticks, Wrap, useMeta } from '../ui';

const regions = [
  { name: 'Headquarters', x: 52, y: 44, hq: true },
  { name: 'Middle East', x: 60, y: 47 },
  { name: 'South Asia', x: 69, y: 51 },
  { name: 'South-East Asia', x: 77, y: 58 },
  { name: 'Europe', x: 49, y: 30 },
  { name: 'Africa', x: 53, y: 64 },
  { name: 'North America', x: 22, y: 36 },
];

function DotMap() {
  // Abstract dotted world grid — decorative and illustrative, not geographic data.
  const dots: [number, number][] = [];
  const land = (x: number, y: number) =>
    (x > 14 && x < 32 && y > 22 && y < 50) ||
    (x > 24 && x < 36 && y > 52 && y < 82) ||
    (x > 44 && x < 58 && y > 20 && y < 40) ||
    (x > 46 && x < 62 && y > 44 && y < 78) ||
    (x > 58 && x < 86 && y > 22 && y < 56) ||
    (x > 72 && x < 84 && y > 56 && y < 66) ||
    (x > 80 && x < 90 && y > 70 && y < 82);
  for (let x = 2; x < 98; x += 2) for (let y = 14; y < 88; y += 3) if (land(x, y)) dots.push([x, y]);
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden>
      {dots.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="0.5" height="0.8" fill="rgba(255,255,255,0.18)" />
      ))}
      {regions.filter((r) => !r.hq).map((r) => (
        <line key={r.name} x1={52} y1={44} x2={r.x} y2={r.y} stroke="#ff5a1f" strokeWidth="0.15" strokeDasharray="0.8 0.6" />
      ))}
    </svg>
  );
}

export default function Home() {
  useMeta('Home', `${BRAND.name} — an industrial group with operations across manufacturing, engineering, energy, logistics and digital technology.`);
  const [hover, setHover] = useState<string | null>(null);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] bg-d2-graphite text-white overflow-hidden">
        <motion.img
          src="/images/welding.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-d2-graphite via-d2-graphite/60 to-d2-graphite/30" aria-hidden />
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '12.5% 100%' }} aria-hidden />
        <Wrap className="relative min-h-[100svh] pt-[120px] pb-12 flex flex-col justify-end">
          <div className="grid xl:grid-cols-[1fr_380px] gap-10 items-end">
            <div>
              <Tag index="00" light>
                Industrial group · Manufacturing · Engineering · Energy · Logistics · Digital
              </Tag>
              <motion.h1
                className="mt-6 font-d2-display font-extrabold uppercase leading-[0.86] tracking-[-0.01em] text-[64px] sm:text-[104px] lg:text-[148px]"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Engineered
                <br />
                for <span className="text-d2-signal">scale.</span>
              </motion.h1>
              <p className="mt-8 max-w-xl text-[19px] leading-relaxed text-white/75">
                {BRAND.shortName} brings together operating companies that design, build, power and move the systems industry depends on.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Btn to={P.companies}>Explore operations</Btn>
                <Btn to={P.partner} variant="ghostLight">
                  Partner program
                </Btn>
              </div>
            </div>
            <Ticks dark className="hidden xl:block bg-d2-graphite/70 backdrop-blur border border-white/15 font-d2-mono text-[12px]">
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/15">
                <span className="text-white/60">OPERATING COMPANIES</span>
                <span className="flex items-center gap-2 text-d2-signal">
                  <span className="w-1.5 h-1.5 bg-d2-signal animate-pulse" /> SAMPLE
                </span>
              </div>
              <ul>
                {groupCompanies.map((c) => (
                  <li key={c.slug} className="border-b border-white/10 last:border-0">
                    <Link to={P.company(c.slug)} className="flex items-center justify-between px-5 py-3 hover:bg-white/5">
                      <span className="text-white/90">{c.monogram} · {c.shortName.toUpperCase()}</span>
                      <ArrowUpRight size={14} className="text-white/40" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </Ticks>
          </div>
        </Wrap>
      </section>

      {/* STATS */}
      <section className="bg-d2-signal text-white" aria-label="Group at a glance">
        <Wrap>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {sampleStats.map((s, i) => (
              <div key={s.label} className={`py-10 px-2 sm:px-6 border-white/25 ${i % 2 ? 'border-l' : ''} ${i === 2 ? 'lg:border-l' : ''} ${i > 1 ? 'border-t lg:border-t-0' : ''}`}>
                <dt className="font-d2-mono text-[11px] uppercase tracking-[0.14em] text-white/80">{s.label}</dt>
                <dd className="mt-2 font-d2-display font-bold text-[64px] sm:text-[80px] leading-none">{s.value}</dd>
                <dd className="mt-1 font-d2-mono text-[10px] uppercase tracking-[0.14em] text-white/70">* {s.note} value</dd>
              </div>
            ))}
          </dl>
        </Wrap>
      </section>

      {/* COMPANIES TABLE */}
      <section className="py-24 lg:py-32">
        <Wrap>
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-end">
            <div>
              <Tag index="01">Operating companies</Tag>
              <Display className="mt-5 text-[52px] sm:text-[80px]">Six companies. One operating system.</Display>
            </div>
            <p className="text-[18px] text-d2-slate leading-relaxed max-w-xl lg:justify-self-end">
              Each company runs its own operations and customer relationships, backed by group-wide standards for safety, quality and governance.
            </p>
          </div>
          <div className="mt-16 relative" onMouseLeave={() => setHover(null)}>
            <ol className="border-t-2 border-d2-graphite">
              {groupCompanies.map((c, i) => (
                <li key={c.slug} onMouseEnter={() => setHover(c.slug)} className="border-b border-d2-line">
                  <Link to={P.company(c.slug)} className="group grid grid-cols-[48px_1fr_auto] md:grid-cols-[72px_1.2fr_1fr_1fr_48px] items-center gap-4 py-6 md:py-7 hover:bg-d2-plate transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-d2-signal">
                    <span className="font-d2-mono text-[13px] text-d2-slate pl-2">0{i + 1}</span>
                    <span className="font-d2-display font-bold uppercase text-[28px] sm:text-[36px] leading-none group-hover:text-d2-signal transition-colors">{c.shortName}</span>
                    <span className="hidden md:block font-d2-mono text-[12px] uppercase tracking-[0.08em] text-d2-slate">{c.sector}</span>
                    <span className="hidden md:block text-[15px] text-d2-graphite/80">{c.offerings.slice(0, 2).join(' · ')}</span>
                    <ArrowRight className="justify-self-end mr-2 transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                </li>
              ))}
            </ol>
            {groupCompanies.map((c) => (
              <img
                key={c.slug}
                src={c.image.sm}
                alt=""
                className={`hidden xl:block pointer-events-none absolute right-24 top-1/2 -translate-y-1/2 w-[300px] aspect-[4/3] object-cover shadow-2xl transition-all duration-300 ${hover === c.slug ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                aria-hidden
              />
            ))}
          </div>
        </Wrap>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-d2-plate">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[420px] lg:min-h-0">
            <img src="/images/plant-pipes.jpg" alt="Stainless steel process plant with pumps and pipework" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute left-0 bottom-0 bg-d2-graphite text-white p-6 sm:p-8 max-w-sm">
              <p className="font-d2-mono text-[11px] tracking-[0.14em] text-d2-signal">FIELD NOTE</p>
              <p className="mt-2 font-d2-display uppercase text-[24px] leading-tight">Safety, quality and uptime are measured the same way in every company.</p>
            </div>
          </div>
          <div className="px-5 sm:px-8 lg:px-16 py-20 lg:py-28">
            <Tag index="02">Capabilities</Tag>
            <Display className="mt-5 text-[48px] sm:text-[68px]">End-to-end industrial capability</Display>
            <ul className="mt-12 grid sm:grid-cols-2 gap-px bg-d2-line border border-d2-line">
              {capabilities.map((c, i) => {
                const Icon = ICONS[c.icon];
                return (
                  <li key={c.title} className="bg-white p-6 group hover:bg-d2-graphite hover:text-white transition-colors">
                    <div className="flex items-center justify-between">
                      <Icon size={26} strokeWidth={1.6} className="text-d2-signal" aria-hidden />
                      <span className="font-d2-mono text-[11px] text-d2-slate group-hover:text-white/50">C-0{i + 1}</span>
                    </div>
                    <h3 className="mt-6 font-d2-display font-bold uppercase text-[24px] leading-none">{c.title}</h3>
                    <p className="mt-2 text-[15px] text-d2-slate group-hover:text-white/70">{c.description}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* INDUSTRIES TICKER */}
      <section className="bg-d2-graphite text-white py-8 overflow-hidden border-y border-white/10" aria-label="Industries served">
        <h2 className="sr-only">Industries served</h2>
        <ul className="sr-only">
          {INDUSTRIES_SERVED.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
        <div className="flex w-max animate-d2-ticker" aria-hidden>
          {[...INDUSTRIES_SERVED, ...INDUSTRIES_SERVED].map((ind, i) => (
            <span key={i} className="flex items-center gap-8 pr-8 font-d2-display font-bold uppercase text-[40px] sm:text-[56px] whitespace-nowrap">
              {ind}
              <span className="w-3 h-3 bg-d2-signal" />
            </span>
          ))}
        </div>
      </section>

      {/* FOOTPRINT */}
      <section className="bg-d2-navy text-white py-24 lg:py-32 overflow-hidden">
        <Wrap className="grid lg:grid-cols-[1fr_1.6fr] gap-12 items-center">
          <div>
            <Tag index="03" light>
              Operational footprint
            </Tag>
            <Display light className="mt-5 text-[48px] sm:text-[68px]">
              Regional reach, local execution.
            </Display>
            <p className="mt-6 text-white/70 text-[17px] leading-relaxed max-w-md">Offices, facilities and partner networks positioned close to customers. Regions shown are illustrative pending confirmation.</p>
            <ul className="mt-10 grid grid-cols-2 gap-y-3 font-d2-mono text-[13px]">
              {regions.map((r) => (
                <li key={r.name} className="flex items-center gap-2 text-white/80">
                  <span className={`w-2 h-2 ${r.hq ? 'bg-d2-signal' : 'border border-d2-signal'}`} aria-hidden /> {r.name.toUpperCase()}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Illustrative light />
            </div>
          </div>
          <div className="relative aspect-[16/10] border border-white/10">
            <DotMap />
            {regions.map((r) => (
              <span key={r.name} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${r.x}%`, top: `${r.y}%` }} aria-hidden>
                <span className={`block ${r.hq ? 'w-4 h-4 bg-d2-signal' : 'w-2.5 h-2.5 bg-white'} ring-4 ring-d2-signal/25`} />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap font-d2-mono text-[10px] text-white/70 hidden sm:block">{r.name.toUpperCase()}</span>
              </span>
            ))}
          </div>
        </Wrap>
      </section>

      {/* NEWS LOG */}
      <section className="py-24 lg:py-32">
        <Wrap>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Tag index="04">Updates</Tag>
              <Display className="mt-5 text-[52px] sm:text-[76px]">Operational news</Display>
            </div>
            <Btn to={P.news} variant="ghost">
              All news
            </Btn>
          </div>
          <div className="mt-14 grid lg:grid-cols-[1.1fr_1fr] gap-10">
            <Link to={P.article(news[0].slug)} className="group relative block min-h-[420px] overflow-hidden bg-d2-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-d2-signal">
              <img src={news[0].image.src} alt={news[0].image.alt} className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-d2-graphite to-transparent" aria-hidden />
              <div className="absolute bottom-0 p-8 text-white">
                <p className="font-d2-mono text-[12px] text-d2-signal">{news[0].category.toUpperCase()} · {formatDate(news[0].date, 'short').toUpperCase()}</p>
                <h3 className="mt-3 font-d2-display font-bold uppercase text-[34px] sm:text-[40px] leading-none">{news[0].title}</h3>
              </div>
            </Link>
            <ol className="border-t-2 border-d2-graphite">
              {news.slice(1, 6).map((n) => (
                <li key={n.slug} className="border-b border-d2-line">
                  <Link to={P.article(n.slug)} className="group grid grid-cols-[96px_1fr_20px] gap-4 py-5 items-start hover:bg-d2-plate focus-visible:outline focus-visible:outline-2 focus-visible:outline-d2-signal">
                    <time dateTime={n.date} className="font-d2-mono text-[12px] text-d2-slate pt-1 pl-1">{formatDate(n.date, 'short').toUpperCase()}</time>
                    <span>
                      <span className="block font-d2-mono text-[11px] text-d2-signal">{n.category.toUpperCase()}</span>
                      <span className="block mt-1 font-d2-display font-semibold uppercase text-[21px] leading-tight group-hover:text-d2-signal">{n.title}</span>
                    </span>
                    <ArrowUpRight size={18} className="text-d2-slate" aria-hidden />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </Wrap>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-d2-plate py-24 lg:py-28">
        <Wrap className="grid lg:grid-cols-[1fr_2fr] gap-12">
          <Slide>
            <Tag index="05">Leadership</Tag>
            <Display className="mt-5 text-[48px] sm:text-[64px]">Accountable leadership</Display>
            <p className="mt-6 text-d2-slate leading-relaxed">Placeholder profiles shown for layout only.</p>
            <Btn to={P.leadership} variant="dark" className="mt-8">
              Board & advisors
            </Btn>
          </Slide>
          <div className="grid sm:grid-cols-2 gap-6">
            {[chairman, managingDirector].map((l, i) => (
              <Slide key={l.id} delay={i * 0.1}>
                <Ticks className="bg-white border border-d2-line">
                  <img src={l.portrait} alt={`${l.name} (placeholder portrait)`} className="w-full aspect-[5/4] object-cover object-top grayscale" loading="lazy" />
                  <div className="p-6">
                    <p className="font-d2-mono text-[11px] text-d2-signal">{l.role.toUpperCase()}</p>
                    <p className="mt-1 font-d2-display font-bold uppercase text-[30px] leading-none">{l.name}</p>
                    <p className="mt-3 text-[15px] text-d2-slate">“{l.quote}”</p>
                  </div>
                </Ticks>
              </Slide>
            ))}
          </div>
        </Wrap>
      </section>

      {/* PARTNER CTA */}
      <section className="relative bg-d2-signal text-white overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block [clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)]">
          <img src="/images/port-aerial.jpg" alt="" className="w-full h-full object-cover mix-blend-luminosity opacity-60" loading="lazy" />
        </div>
        <Wrap className="relative py-24 lg:py-32">
          <p className="font-d2-mono text-[12px] uppercase tracking-[0.14em] text-white/85">[06] Partner program</p>
          <Display light className="mt-5 text-[56px] sm:text-[96px] max-w-3xl">
            Build capacity with us.
          </Display>
          <p className="mt-6 text-[19px] text-white/90 max-w-xl">Distributors, OEMs, technology firms, investors and vendors — five structured routes to work with the group.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Btn to={P.partner} variant="dark">
              Apply now
            </Btn>
            <Btn to={P.contact} variant="ghostLight">
              Talk to the team
            </Btn>
          </div>
        </Wrap>
      </section>
    </>
  );
}
