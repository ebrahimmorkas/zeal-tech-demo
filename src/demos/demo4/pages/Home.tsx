import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import { BRAND } from '../../../data/brand';
import { groupCompanies } from '../../../data/groupCompanies';
import { roadmap } from '../../../data/roadmap';
import { resources } from '../../../data/resources';
import { news, formatDate } from '../../../data/news';
import { managingDirector } from '../../../data/leadership';
import { partnershipTypes } from '../../../data/partnerships';
import { ICONS } from '../../../lib/icons';
import { Btn, Card, Chip, Grad, H, Label, Mono, P, Rise, SampleChip, Shell, dots, useMeta } from '../ui';

const R = 205;
const nodes = groupCompanies.map((c, i) => {
  const a = (-90 + i * (360 / groupCompanies.length)) * (Math.PI / 180);
  return { c, x: 300 + R * Math.cos(a), y: 300 + R * Math.sin(a) };
});

function Network({ active, setActive }: { active: number; setActive: (i: number) => void }) {
  return (
    <div className="relative w-full max-w-[560px] aspect-square mx-auto">
      <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full" aria-hidden>
        <defs>
          <radialGradient id="d4core" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#6170ff" stopOpacity="0.45" />
            <stop offset="1" stopColor="#6170ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="d4line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6170ff" />
            <stop offset="1" stopColor="#2fc9b4" />
          </linearGradient>
        </defs>
        <circle cx="300" cy="300" r="250" fill="url(#d4core)" />
        <circle cx="300" cy="300" r={R} fill="none" stroke="rgba(169,179,204,0.18)" strokeDasharray="2 6" />
        <circle cx="300" cy="300" r="120" fill="none" stroke="rgba(169,179,204,0.12)" />
        {nodes.map((n, i) => (
          <g key={n.c.slug}>
            <line x1="300" y1="300" x2={n.x} y2={n.y} stroke={i === active ? 'url(#d4line)' : 'rgba(169,179,204,0.22)'} strokeWidth={i === active ? 2 : 1} strokeDasharray="4 6" className="animate-d4-dash" />
            <line x1={n.x} y1={n.y} x2={nodes[(i + 1) % nodes.length].x} y2={nodes[(i + 1) % nodes.length].y} stroke="rgba(169,179,204,0.1)" />
          </g>
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-[26%] aspect-square rounded-full bg-d4-deep ring-1 ring-white/15 shadow-[0_0_60px_rgba(97,112,255,0.45)]">
        <div className="text-center">
          <p className="font-d4-display font-semibold text-white text-[15px] sm:text-[18px]">{BRAND.shortName}</p>
          <p className="font-d4-mono text-[10px] text-d4-teal">group core</p>
        </div>
      </div>
      {nodes.map((n, i) => (
        <button
          key={n.c.slug}
          type="button"
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          onClick={() => setActive(i)}
          aria-pressed={i === active}
          aria-label={`${n.c.name} — show details`}
          className={`absolute -translate-x-1/2 -translate-y-1/2 grid place-items-center w-[15%] aspect-square rounded-2xl font-d4-display font-semibold text-[13px] sm:text-[16px] ring-1 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-d4-teal ${i === active ? 'bg-d4-indigo text-white ring-d4-indigo scale-110 shadow-[0_0_40px_rgba(97,112,255,0.6)]' : 'bg-d4-panel text-d4-haze ring-white/15 hover:text-white'}`}
          style={{ left: `${(n.x / 600) * 100}%`, top: `${(n.y / 600) * 100}%` }}
        >
          {n.c.monogram}
        </button>
      ))}
    </div>
  );
}

const stack = [
  { name: 'Digital & Data layer', desc: 'IoT, analytics, cybersecurity and integration across every asset.', icon: 'cpu' as const, tone: 'from-d4-indigo/40 to-d4-indigo/5' },
  { name: 'Energy layer', desc: 'Renewable generation, captive power and efficiency services.', icon: 'zap' as const, tone: 'from-d4-teal/35 to-d4-teal/5' },
  { name: 'Logistics layer', desc: 'Warehousing, distribution and supply chain orchestration.', icon: 'truck' as const, tone: 'from-white/15 to-white/[0.02]' },
  { name: 'Engineering & Projects layer', desc: 'Design, EPC delivery and project management.', icon: 'hardhat' as const, tone: 'from-white/15 to-white/[0.02]' },
  { name: 'Manufacturing layer', desc: 'Automation systems and precision components.', icon: 'factory' as const, tone: 'from-white/15 to-white/[0.02]' },
];

export default function Home() {
  useMeta('Home', `${BRAND.name} — a technology-led group building intelligent systems for industry, energy and infrastructure.`);
  const [active, setActive] = useState(0);
  const [unit, setUnit] = useState(0);
  const c = groupCompanies[active];
  const u = groupCompanies[unit];

  return (
    <>
      {/* HERO */}
      <section className="relative bg-d4-void text-white overflow-hidden pt-28 lg:pt-32 pb-16">
        <div className="absolute inset-0" style={dots} aria-hidden />
        <div className="absolute top-1/3 right-0 w-[700px] h-[700px] rounded-full bg-d4-indigo/20 blur-[140px]" aria-hidden />
        <Shell className="relative grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center min-h-[calc(100svh-180px)]">
          <div>
            <Label dark>nexora.group / systems for what’s next</Label>
            <motion.h1 className="mt-6 font-d4-display font-medium tracking-[-0.04em] leading-[1] text-[48px] sm:text-[68px] lg:text-[80px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              Intelligent systems for industry’s <Grad>next era</Grad>.
            </motion.h1>
            <p className="mt-6 max-w-lg text-[18px] leading-relaxed text-d4-haze">
              Six specialised companies, one connected group — combining engineering depth with data, automation and clean energy to help enterprises operate smarter.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn to={P.companies}>Explore business units</Btn>
              <Btn to={P.roadmap} variant="ghostDark">
                View roadmap
              </Btn>
            </div>
            <div className="mt-12 grid grid-cols-3 max-w-md gap-px rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/10">
              {[
                ['6', 'business units'],
                ['25k+', 'connected assets*'],
                ['18', 'markets served*'],
              ].map(([v, l]) => (
                <div key={l} className="bg-d4-void/80 p-4">
                  <p className="font-d4-display text-[26px] font-medium">{v}</p>
                  <p className="font-d4-mono text-[11px] text-d4-haze">{l}</p>
                </div>
              ))}
            </div>
            <Mono className="mt-3 text-d4-haze/70">* illustrative sample values</Mono>
          </div>
          <div>
            <Network active={active} setActive={setActive} />
            <AnimatePresence mode="wait">
              <motion.div key={c.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="mt-2 mx-auto max-w-[460px] rounded-2xl bg-d4-deep/80 backdrop-blur ring-1 ring-white/10 p-5" aria-live="polite">
                <div className="flex items-center justify-between gap-3">
                  <Mono className="text-d4-teal">{c.sector.toLowerCase()}</Mono>
                  <Link to={P.company(c.slug)} className="inline-flex items-center gap-1 text-[13px] text-white hover:text-d4-teal">
                    Open <ArrowUpRight size={14} aria-hidden />
                  </Link>
                </div>
                <p className="mt-2 font-d4-display text-[20px] text-white">{c.name}</p>
                <p className="mt-1 text-[14px] text-d4-haze">{c.tagline}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Shell>
      </section>

      {/* BUSINESS UNIT EXPLORER */}
      <section className="py-24 lg:py-32">
        <Shell>
          <div className="max-w-2xl">
            <Label>business units</Label>
            <H className="mt-4 text-[38px] sm:text-[52px]">Explore the portfolio</H>
            <p className="mt-4 text-[17px] text-d4-deep/65">Select a unit to see what it does, who it serves and how it connects to the rest of the group.</p>
          </div>
          <div className="mt-12 grid lg:grid-cols-[320px_1fr] gap-6">
            <div role="tablist" aria-label="Business units" aria-orientation="vertical" className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
              {groupCompanies.map((g, i) => {
                const on = i === unit;
                return (
                  <button
                    key={g.slug}
                    role="tab"
                    id={`d4-unit-${i}`}
                    aria-selected={on}
                    aria-controls="d4-unit-panel"
                    type="button"
                    onClick={() => setUnit(i)}
                    className={`shrink-0 lg:w-full flex items-center gap-3 p-3 pr-5 rounded-2xl text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-d4-indigo ${on ? 'bg-white ring-1 ring-d4-indigo/40 shadow-[0_10px_30px_-15px_rgba(97,112,255,0.5)]' : 'hover:bg-white/70'}`}
                  >
                    <span className="grid place-items-center w-11 h-11 rounded-xl font-d4-display font-semibold text-white shrink-0" style={{ background: g.accent }}>
                      {g.monogram}
                    </span>
                    <span>
                      <span className="block text-[15px] font-medium whitespace-nowrap">{g.shortName}</span>
                      <span className="hidden lg:block text-[12.5px] text-d4-deep/55">{g.sector}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={u.slug} id="d4-unit-panel" role="tabpanel" aria-labelledby={`d4-unit-${unit}`} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
                <Card className="overflow-hidden grid md:grid-cols-[1fr_1.1fr]">
                  <div className="relative min-h-[260px]">
                    <img src={u.image.sm} alt={u.image.alt} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-d4-void/70 to-transparent" aria-hidden />
                    <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
                      {u.sampleMetrics.map((m) => (
                        <div key={m.label} className="rounded-xl bg-d4-void/70 backdrop-blur ring-1 ring-white/15 p-3 text-white">
                          <p className="font-d4-display text-[20px]">{m.value}</p>
                          <p className="font-d4-mono text-[10.5px] text-d4-haze">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-7 sm:p-9">
                    <div className="flex items-center justify-between gap-3">
                      <Mono className="text-d4-indigo">{u.sector.toLowerCase()}</Mono>
                      <SampleChip />
                    </div>
                    <H as="h3" className="mt-3 text-[28px]">
                      {u.name}
                    </H>
                    <p className="mt-3 text-d4-deep/70">{u.intro}</p>
                    <p className="mt-6 font-d4-mono text-[11.5px] text-d4-deep/50">core offerings</p>
                    <ul className="mt-2 grid sm:grid-cols-2 gap-2">
                      {u.offerings.map((o) => (
                        <li key={o} className="flex items-center gap-2 text-[14.5px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-d4-teal" aria-hidden /> {o}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 font-d4-mono text-[11.5px] text-d4-deep/50">industries served</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {u.industries.map((x) => (
                        <Chip key={x}>{x}</Chip>
                      ))}
                    </div>
                    <Link to={P.company(u.slug)} className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-d4-indigo hover:gap-3 transition-all">
                      Learn more <ArrowRight size={16} aria-hidden />
                    </Link>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </Shell>
      </section>

      {/* CAPABILITY STACK */}
      <section className="relative bg-d4-void text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0" style={dots} aria-hidden />
        <Shell className="relative grid lg:grid-cols-[1fr_1.1fr] gap-14 items-center">
          <div>
            <Label dark>how the group fits together</Label>
            <H dark className="mt-4 text-[38px] sm:text-[52px]">
              A layered capability stack
            </H>
            <p className="mt-5 text-[17px] text-d4-haze leading-relaxed max-w-md">
              Our story began in engineering and manufacturing. Each new company added a layer — logistics, energy, then digital — so customers can draw on the full stack through a single relationship.
            </p>
            <Btn to={P.about} variant="ghostDark" className="mt-8">
              Our story
            </Btn>
          </div>
          <ol className="relative space-y-3 [perspective:1200px]">
            {stack.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <li key={s.name}>
                  <Rise delay={i * 0.08}>
                  <div className={`flex items-center gap-4 p-5 rounded-2xl ring-1 ring-white/10 bg-gradient-to-r ${s.tone} backdrop-blur`} style={{ marginLeft: `${i * 4}%`, marginRight: `${(stack.length - 1 - i) * 4}%` }}>
                    <span className="grid place-items-center w-11 h-11 rounded-xl bg-d4-void/60 ring-1 ring-white/10 text-d4-teal shrink-0">
                      <Icon size={20} aria-hidden />
                    </span>
                    <span>
                      <span className="block font-d4-display text-[18px]">{s.name}</span>
                      <span className="block text-[13.5px] text-d4-haze">{s.desc}</span>
                    </span>
                    <span className="ml-auto font-d4-mono text-[11px] text-d4-haze">L{stack.length - i}</span>
                  </div>
                  </Rise>
                </li>
              );
            })}
          </ol>
        </Shell>
      </section>

      {/* ROADMAP PREVIEW */}
      <section className="py-24 lg:py-32">
        <Shell>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Label>future roadmap</Label>
              <H className="mt-4 text-[38px] sm:text-[52px]">Where we’re heading</H>
            </div>
            <div className="flex items-center gap-3">
              <SampleChip />
              <Btn to={P.roadmap} variant="ghost">
                Full roadmap
              </Btn>
            </div>
          </div>
          <div className="mt-14 relative">
            <div className="absolute left-0 right-0 top-[22px] h-[3px] rounded-full bg-[#e4e8f2]" aria-hidden />
            <div className="absolute left-0 w-[22%] top-[22px] h-[3px] rounded-full bg-gradient-to-r from-d4-indigo to-d4-teal" aria-hidden />
            <ol className="relative grid md:grid-cols-3 gap-6">
              {roadmap.map((p, i) => (
                <li key={p.id}>
                  <span className={`grid place-items-center w-11 h-11 rounded-full ring-4 ring-d4-mist font-d4-mono text-[13px] ${i === 0 ? 'bg-d4-indigo text-white' : 'bg-white text-d4-deep ring-1'}`}>0{i + 1}</span>
                  <Card className="mt-5 p-6 h-[calc(100%-64px)]">
                    <Mono className="text-d4-indigo">{p.horizon}</Mono>
                    <H as="h3" className="mt-2 text-[22px]">
                      {p.title}
                    </H>
                    <p className="mt-2 text-[14.5px] text-d4-deep/65">{p.summary}</p>
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </Shell>
      </section>

      {/* LEADERSHIP + INSIGHTS */}
      <section className="pb-24 lg:pb-32">
        <Shell className="grid lg:grid-cols-[1fr_1.6fr] gap-6">
          <Card className="p-8 flex flex-col">
            <Label>leadership</Label>
            <div className="mt-6 flex items-center gap-4">
              <img src={managingDirector.portrait} alt={`${managingDirector.name} (placeholder portrait)`} className="w-16 h-16 rounded-2xl object-cover object-top" loading="lazy" />
              <div>
                <p className="font-d4-display text-[18px]">{managingDirector.name}</p>
                <p className="text-[13px] text-d4-deep/55">{managingDirector.role} · placeholder</p>
              </div>
            </div>
            <p className="mt-6 font-d4-display text-[24px] leading-snug tracking-[-0.02em] flex-1">“{managingDirector.quote}”</p>
            <Link to={P.leadership} className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-d4-indigo">
              Meet the leadership <ArrowRight size={16} aria-hidden />
            </Link>
          </Card>
          <div>
            <div className="flex items-end justify-between">
              <div>
                <Label>insights</Label>
                <H className="mt-3 text-[30px]">Research & resources</H>
              </div>
              <Link to={P.resources} className="text-[14px] font-medium text-d4-indigo">
                View all
              </Link>
            </div>
            <ul className="mt-6 grid sm:grid-cols-3 gap-4">
              {resources.slice(0, 3).map((r) => (
                <li key={r.slug}>
                  <Link to={P.resource(r.slug)} className="group block h-full rounded-2xl bg-white ring-1 ring-[#e4e8f2] overflow-hidden hover:ring-d4-indigo/40 hover:-translate-y-0.5 transition-all">
                    <img src={r.image.sm} alt="" className="w-full aspect-[16/10] object-cover" loading="lazy" />
                    <div className="p-4">
                      <Mono className="text-d4-indigo">{r.type.toLowerCase()}</Mono>
                      <p className="mt-1.5 font-d4-display text-[16px] leading-snug group-hover:text-d4-indigo">{r.title}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 divide-y divide-[#e4e8f2] rounded-2xl bg-white ring-1 ring-[#e4e8f2]">
              {news.slice(0, 4).map((n) => (
                <li key={n.slug}>
                  <Link to={P.article(n.slug)} className="flex items-center gap-4 px-5 py-4 hover:bg-d4-mist/60">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${n.category === 'Video' ? 'bg-rose-400' : n.category === 'Event' ? 'bg-d4-teal' : 'bg-d4-indigo'}`} aria-hidden />
                    <span className="flex-1 text-[14.5px]">{n.title}</span>
                    {n.category === 'Video' && <Play size={14} className="text-d4-deep/40" aria-label="Video" />}
                    <Mono className="text-d4-deep/45 hidden sm:block">{formatDate(n.date, 'short')}</Mono>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Shell>
      </section>

      {/* PARTNER CTA */}
      <section className="pb-24 lg:pb-32">
        <Shell>
          <div className="relative overflow-hidden rounded-[28px] bg-d4-void text-white p-8 sm:p-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(97,112,255,0.45),transparent_45%),radial-gradient(circle_at_10%_100%,rgba(47,201,180,0.25),transparent_40%)]" aria-hidden />
            <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
              <div>
                <Label dark>partner ecosystem</Label>
                <H dark className="mt-4 text-[36px] sm:text-[50px]">
                  Build what’s next with us.
                </H>
                <p className="mt-4 text-d4-haze text-[17px] max-w-lg">From distribution to co-development and investment, choose the partnership model that fits.</p>
                <Btn to={P.partner} className="mt-8">
                  Start a partnership
                </Btn>
              </div>
              <ul className="grid sm:grid-cols-2 gap-2">
                {partnershipTypes.map((p) => {
                  const Icon = ICONS[p.icon];
                  return (
                    <li key={p.id}>
                      <Link to={P.partnerType(p.id)} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-colors">
                        <Icon size={18} className="text-d4-teal" aria-hidden />
                        <span className="text-[14.5px]">{p.shortTitle}</span>
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link to={P.contact} className="flex items-center gap-3 p-4 rounded-2xl bg-d4-indigo/30 ring-1 ring-d4-indigo/60 hover:bg-d4-indigo/40 transition-colors">
                    <ArrowUpRight size={18} aria-hidden />
                    <span className="text-[14.5px]">Talk to our team</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Shell>
      </section>
    </>
  );
}
