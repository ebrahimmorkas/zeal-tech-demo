import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import { capabilities, sampleStats } from '../../../data/about';
import { INDUSTRIES_SERVED } from '../../../data/brand';
import { groupCompanies } from '../../../data/groupCompanies';
import { news, formatDate } from '../../../data/news';
import { roadmap } from '../../../data/roadmap';
import { resources } from '../../../data/resources';
import { leaders } from '../../../data/leadership';
import { ICONS } from '../../../lib/icons';
import { Bloom, Chip, Display, Glow, Go, P, PASTEL, Sample, Shell, Tilt, tile, useMeta } from '../ui';

function HeroBento() {
  const latest = news[0];
  const video = news.find((n) => n.category === 'Video')!;
  return (
    <section className="pt-6">
      <Shell className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(150px,auto)] gap-4">
        <Bloom className={`col-span-2 lg:row-span-2 ${tile} p-7 sm:p-10 flex flex-col justify-between`}>
          <Chip>
            <span className="w-1.5 h-1.5 rounded-full bg-d10-violet" aria-hidden /> A diversified industrial & technology group
          </Chip>
          <div className="mt-10">
            <Display as="h1" className="text-[48px] sm:text-[68px] lg:text-[76px]">
              Six companies.
              <br />
              <Glow>One clear direction.</Glow>
            </Display>
            <p className="mt-5 max-w-lg text-[18px] text-d10-mute">Manufacturing, infrastructure, energy, logistics and digital technology, working together under one roof.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Go to={P.companies}>Explore companies</Go>
              <Go to={P.about} tone="soft">
                About the group
              </Go>
            </div>
          </div>
        </Bloom>
        <Bloom delay={0.06} className="col-span-2 lg:row-span-2 relative rounded-[28px] overflow-hidden min-h-[300px]">
          <img src="/images/lab-glass.jpg" alt="Laboratory glassware under bright light" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl px-4 py-3">
              <p className="text-[12px] font-semibold text-d10-mute">Research & testing</p>
              <p className="font-d10-display font-semibold">Engineering what’s next</p>
            </div>
          </div>
        </Bloom>
        {sampleStats.slice(0, 2).map((s, i) => (
          <Bloom key={s.label} delay={0.1 + i * 0.05} className={`${tile} ${i ? '!bg-d10-mint/80' : '!bg-d10-peach/80'} p-6 flex flex-col justify-between`}>
            <p className="text-[13px] font-semibold text-d10-ink/70">{s.label}</p>
            <p className="font-d10-display font-semibold text-[52px] leading-none tracking-[-0.04em]">{s.value}</p>
            <p className="text-[11.5px] text-d10-ink/60">{s.note}</p>
          </Bloom>
        ))}
        <Bloom delay={0.2} className="col-span-2">
          <Link to={P.article(latest.slug)} className={`group flex h-full items-center gap-4 p-4 ${tile} hover:!bg-white transition-colors`}>
            <img src={latest.image.sm} alt="" className="w-24 h-24 rounded-2xl object-cover shrink-0" />
            <span className="min-w-0">
              <Chip className="bg-d10-sky text-[#244b8a]">Latest · {latest.category}</Chip>
              <span className="block mt-2 font-d10-display font-semibold leading-snug line-clamp-2">{latest.title}</span>
            </span>
            <ArrowUpRight className="shrink-0 ml-auto text-d10-mute group-hover:text-d10-violet" aria-hidden />
          </Link>
        </Bloom>
        <Bloom delay={0.24} className="col-span-2">
          <Link to={P.article(video.slug)} className="group relative flex h-full min-h-[150px] items-end p-5 rounded-[28px] overflow-hidden">
            <img src={video.image.sm} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-d10-ink/80 to-transparent" />
            <span className="relative flex items-center gap-3 text-white">
              <span className="grid place-items-center w-11 h-11 rounded-full bg-white text-d10-violet">
                <Play size={18} className="ml-0.5" aria-hidden />
              </span>
              <span>
                <span className="block text-[12px] text-white/75">Video · {video.duration}</span>
                <span className="block font-d10-display font-semibold">{video.title.replace('Video: ', '')}</span>
              </span>
            </span>
          </Link>
        </Bloom>
        <Bloom delay={0.28} className={`col-span-2 ${tile} p-6`}>
          <p className="text-[13px] font-semibold text-d10-mute">Industries we serve</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {INDUSTRIES_SERVED.map((x, i) => (
              <li key={x} className={`h-8 px-3 rounded-full inline-flex items-center text-[13px] font-semibold ${PASTEL[i % PASTEL.length]}`}>
                {x}
              </li>
            ))}
          </ul>
        </Bloom>
      </Shell>
    </section>
  );
}

function CompanyBento() {
  const spans = ['lg:col-span-2 lg:row-span-2', '', '', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2'];
  return (
    <section className="pt-20">
      <Shell>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Display className="text-[40px] sm:text-[52px]">
            The <Glow>group</Glow>, at a glance
          </Display>
          <Go to={P.companies} tone="soft">
            All companies
          </Go>
        </div>
        <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(200px,auto)] gap-4">
          {groupCompanies.map((c, i) => (
            <li key={c.slug} className={spans[i]}>
              <Bloom delay={(i % 4) * 0.05} className="h-full">
                <Tilt className="h-full rounded-[28px]">
                  <Link to={P.company(c.slug)} className={`group relative flex flex-col h-full p-6 rounded-[28px] overflow-hidden ${PASTEL[i]} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-d10-violet`}>
                    {i === 0 && <img src={c.image.sm} alt="" className="absolute right-0 bottom-0 w-[46%] h-[62%] object-cover rounded-tl-[28px] opacity-90" />}
                    <span className="relative grid place-items-center w-12 h-12 rounded-2xl bg-white font-d10-display font-semibold text-[15px]">{c.monogram}</span>
                    <span className="relative mt-auto pt-8 block text-[12.5px] font-semibold text-d10-ink/60">{c.sector}</span>
                    <span className={`relative block mt-1 font-d10-display font-semibold tracking-[-0.03em] leading-tight ${i === 0 ? 'text-[32px] max-w-[50%]' : 'text-[22px]'}`}>{c.shortName}</span>
                    <ArrowUpRight className="absolute top-6 right-6 text-d10-ink/50 group-hover:text-d10-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </Tilt>
              </Bloom>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}

function Capabilities() {
  const [active, setActive] = useState(0);
  const c = capabilities[active];
  const Icon = ICONS[c.icon];
  return (
    <section className="pt-20">
      <Shell className="grid lg:grid-cols-[1fr_1.3fr] gap-4">
        <div className={`${tile} p-7 sm:p-10`}>
          <Chip>What we do</Chip>
          <Display className="mt-4 text-[36px] sm:text-[44px]">Capabilities across the value chain</Display>
          <div role="tablist" aria-label="Capabilities" className="mt-8 flex flex-wrap gap-2">
            {capabilities.map((x, i) => (
              <button key={x.title} type="button" role="tab" aria-selected={active === i} aria-controls="d10-cap" onClick={() => setActive(i)} className={`relative h-11 px-4 rounded-full text-[14px] font-semibold transition-colors ${active === i ? 'text-white' : 'bg-d10-canvas hover:bg-white'}`}>
                {active === i && <motion.span layoutId="d10-cap-pill" className="absolute inset-0 rounded-full bg-d10-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="relative">{x.title}</span>
              </button>
            ))}
          </div>
        </div>
        <div id="d10-cap" role="tabpanel" className={`${tile} relative overflow-hidden p-7 sm:p-10 min-h-[300px]`}>
          <AnimatePresence mode="wait">
            <motion.div key={c.title} initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
              <span className="grid place-items-center w-16 h-16 rounded-3xl bg-d10-violet text-white">
                <Icon size={28} aria-hidden />
              </span>
              <p className="mt-8 font-d10-display font-semibold text-[34px] tracking-[-0.03em]">{c.title}</p>
              <p className="mt-3 text-[18px] text-d10-mute max-w-md">{c.description}</p>
              <p className="mt-8 text-[13px] font-semibold text-d10-mute">
                {String(active + 1).padStart(2, '0')} / {String(capabilities.length).padStart(2, '0')}
              </p>
            </motion.div>
          </AnimatePresence>
          <span className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-d10-sky blur-2xl opacity-70" aria-hidden />
        </div>
      </Shell>
    </section>
  );
}

function RoadmapTiles() {
  return (
    <section className="pt-20">
      <Shell>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Display className="text-[40px] sm:text-[52px]">
            Where we’re <Glow>heading</Glow>
          </Display>
          <Sample>Illustrative roadmap</Sample>
        </div>
        <ul className="mt-8 grid md:grid-cols-3 gap-4">
          {roadmap.map((r, i) => (
            <li key={r.id}>
              <Bloom delay={i * 0.06} className="h-full">
                <Link to={`${P.roadmap}?phase=${r.id}`} className={`group block h-full p-7 ${tile} hover:!bg-white transition-colors`}>
                  <div className="flex items-center justify-between">
                    <Chip className={`${PASTEL[i + 2]} text-d10-ink`}>{r.label}</Chip>
                    <span className="text-[13px] font-semibold text-d10-mute">{r.horizon}</span>
                  </div>
                  <p className="mt-6 font-d10-display font-semibold text-[24px] tracking-[-0.03em] leading-tight">{r.title}</p>
                  <p className="mt-2 text-d10-mute">{r.summary}</p>
                  <div className="mt-6 h-2 rounded-full bg-d10-canvas overflow-hidden" aria-hidden>
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-d10-violet to-[#ff7eb3]" initial={{ width: 0 }} whileInView={{ width: `${(i + 1) * 33.3}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 + i * 0.1 }} />
                  </div>
                  <p className="mt-2 text-[12.5px] text-d10-mute">Phase {i + 1} of 3 · {r.initiatives.length} initiatives</p>
                </Link>
              </Bloom>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}

function ReadAndPeople() {
  const picks = resources.slice(0, 2);
  return (
    <section className="pt-20">
      <Shell className="grid lg:grid-cols-4 gap-4">
        {picks.map((r, i) => (
          <Bloom key={r.slug} delay={i * 0.06} className="lg:col-span-1">
            <Link to={P.resource(r.slug)} className={`group flex flex-col h-full ${tile} overflow-hidden hover:!bg-white transition-colors`}>
              <img src={r.image.sm} alt="" className="w-full aspect-[16/10] object-cover" loading="lazy" />
              <span className="p-5 flex flex-col flex-1">
                <Chip className="self-start bg-d10-sky text-[#244b8a]">{r.type}</Chip>
                <span className="mt-3 font-d10-display font-semibold leading-snug">{r.title}</span>
                <span className="mt-auto pt-4 text-[13px] text-d10-mute">{r.readTime}</span>
              </span>
            </Link>
          </Bloom>
        ))}
        <Bloom delay={0.12} className="lg:col-span-2">
          <Link to={P.leadership} className={`group flex flex-col justify-between h-full p-7 sm:p-9 ${tile} !bg-d10-ink !border-d10-ink text-white`}>
            <div className="flex -space-x-3">
              {leaders.slice(0, 6).map((l) => (
                <img key={l.id} src={l.portrait} alt="" className="w-14 h-14 rounded-full object-cover ring-4 ring-d10-ink" loading="lazy" />
              ))}
            </div>
            <div className="mt-10">
              <p className="font-d10-display font-semibold text-[32px] tracking-[-0.03em] leading-tight">The people leading the group</p>
              <p className="mt-2 text-white/65">Board, executives and advisors · fictional profiles</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-d10-mint">
                Meet the leadership <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </span>
            </div>
          </Link>
        </Bloom>
      </Shell>
    </section>
  );
}

function NewsRow() {
  const items = news.slice(1, 4);
  return (
    <section className="pt-20">
      <Shell>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Display className="text-[40px] sm:text-[52px]">Newsroom</Display>
          <Go to={P.news} tone="soft">
            All news
          </Go>
        </div>
        <ul className="mt-8 grid md:grid-cols-3 gap-4">
          {items.map((n, i) => (
            <li key={n.slug}>
              <Bloom delay={i * 0.06} className="h-full">
                <Link to={P.article(n.slug)} className={`group block h-full p-3 ${tile} hover:!bg-white transition-colors`}>
                  <img src={n.image.sm} alt={n.image.alt} className="w-full aspect-[4/3] object-cover rounded-[20px]" loading="lazy" />
                  <span className="block p-3">
                    <span className="text-[12.5px] font-semibold text-d10-violet">
                      {n.category} · {formatDate(n.date, 'short')}
                    </span>
                    <span className="block mt-1.5 font-d10-display font-semibold text-[19px] leading-snug">{n.title}</span>
                  </span>
                </Link>
              </Bloom>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}

function PartnerTile() {
  return (
    <section className="pt-20 pb-6">
      <Shell>
        <Bloom>
          <div className="relative overflow-hidden rounded-[32px] p-8 sm:p-14 bg-gradient-to-br from-d10-violet via-[#8b5cff] to-[#ff7eb3] text-white">
            <span className="absolute -right-20 -top-24 w-80 h-80 rounded-full bg-white/15 blur-2xl" aria-hidden />
            <p className="font-d10-display font-semibold text-[40px] sm:text-[60px] leading-[1.02] tracking-[-0.035em] max-w-3xl">Five ways to partner with the group.</p>
            <p className="mt-4 max-w-xl text-[18px] text-white/85">Distributors, OEMs, technology firms, investors and suppliers each have a dedicated programme and application.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Go to={P.partner} tone="white">
                Choose a programme
              </Go>
              <Go to={P.contact} tone="ink">
                Talk to us
              </Go>
            </div>
          </div>
        </Bloom>
      </Shell>
    </section>
  );
}

export default function Home() {
  useMeta('', 'A soft, modular bento-style corporate presence for a modern diversified group (design concept).');
  return (
    <>
      <HeroBento />
      <CompanyBento />
      <Capabilities />
      <RoadmapTiles />
      <ReadAndPeople />
      <NewsRow />
      <PartnerTile />
    </>
  );
}
