import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { coreValues, sampleStats } from '../../../data/about';
import { INDUSTRIES_SERVED } from '../../../data/brand';
import { groupCompanies } from '../../../data/groupCompanies';
import { news, formatDate } from '../../../data/news';
import { roadmap } from '../../../data/roadmap';
import { leaders } from '../../../data/leadership';
import { ICONS } from '../../../lib/icons';
import { Badge, Big, Box, Go, Marquee, Outline, P, POP, Pop, Sample, Sticker, Tag, card, lift, useMeta } from '../ui';

function Hero() {
  const polaroids = [
    { src: '/images/startup-team-sm.jpg', alt: 'Team gathered around laptops', rot: -7, x: 'left-0 top-6' },
    { src: '/images/eng-robotics-sm.jpg', alt: 'Engineers working with a robotic arm', rot: 5, x: 'right-0 top-0' },
    { src: '/images/presenter-sm.jpg', alt: 'Speaker presenting to colleagues', rot: -2, x: 'left-[18%] bottom-0' },
  ];
  return (
    <section className="relative overflow-hidden border-b-[3px] border-d8-ink">
      <Box className="pt-10 lg:pt-16 pb-14 grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2">
            <Tag className="bg-d8-mint">6 companies</Tag>
            <Tag className="bg-white">1 group</Tag>
            <Tag className="bg-d8-pink">0 excuses</Tag>
          </motion.div>
          <h1 className="mt-6 font-d8-display font-extrabold tracking-[-0.04em] leading-[0.88] text-[64px] sm:text-[104px] xl:text-[128px]">
            {['We build', 'big, useful', 'things.'].map((line, i) => (
              <motion.span key={line} className="block" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'spring', stiffness: 160, damping: 16, delay: 0.15 + i * 0.1 }}>
                {i === 1 ? (
                  <>
                    <span className="relative inline-block">
                      <span className="absolute inset-x-[-4px] bottom-[8%] h-[38%] bg-d8-yellow -z-0 -rotate-1" aria-hidden />
                      <span className="relative">big,</span>
                    </span>{' '}
                    <Outline>useful</Outline>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>
          <p className="mt-7 max-w-lg text-[19px] font-medium leading-snug">Nexora is a group of six companies making factories, infrastructure, energy and software work better. Loud about quality, quiet about everything else.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Go to={P.companies}>Meet the crew</Go>
            <Go to={P.about} tone="white">
              Our story
            </Go>
          </div>
        </div>
        <div className="relative h-[420px] sm:h-[520px]">
          {polaroids.map((p, i) => (
            <motion.figure
              key={p.src}
              className={`absolute w-[58%] bg-white p-3 pb-10 ${card} ${p.x}`}
              initial={{ opacity: 0, y: 60, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: p.rot }}
              whileHover={{ rotate: 0, scale: 1.04, zIndex: 5 }}
              transition={{ type: 'spring', stiffness: 140, damping: 14, delay: 0.3 + i * 0.12 }}
            >
              <img src={p.src} alt={p.alt} className="w-full aspect-[4/3] object-cover rounded-lg border-2 border-d8-ink" />
            </motion.figure>
          ))}
          <div className="absolute -bottom-4 right-2 sm:right-6">
            <Badge text="BUILT TO LAST · SINCE (SAMPLE) · " />
          </div>
        </div>
      </Box>
      <Marquee items={INDUSTRIES_SERVED} />
    </section>
  );
}

function Crew() {
  return (
    <section className="py-20 lg:py-28">
      <Box>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Big className="text-[52px] sm:text-[80px]">
            The <Outline>crew.</Outline>
          </Big>
          <Go to={P.companies} tone="white">
            All six
          </Go>
        </div>
        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groupCompanies.map((c, i) => (
            <li key={c.slug}>
              <Pop delay={(i % 3) * 0.07} tilt={i % 2 ? 3 : -3} className="h-full">
                <Link to={P.company(c.slug)} className={`group flex flex-col h-full p-6 ${card} ${lift} ${POP[i % 4]} focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-d8-blue`}>
                  <div className="flex items-start justify-between">
                    <span className="grid place-items-center w-16 h-16 bg-white text-d8-ink border-[3px] border-d8-ink rounded-2xl font-d8-display font-extrabold text-[24px] -rotate-6 group-hover:rotate-6 transition-transform">{c.monogram}</span>
                    <ArrowUpRight size={30} strokeWidth={2.5} className="transition-transform group-hover:rotate-45" aria-hidden />
                  </div>
                  <h3 className="mt-10 font-d8-display font-extrabold text-[30px] leading-[0.95] tracking-[-0.03em]">{c.shortName}</h3>
                  <p className="mt-3 font-medium opacity-85">{c.tagline}</p>
                  <span className="mt-auto pt-6 font-d8-mono text-[12px] uppercase">{c.sector}</span>
                </Link>
              </Pop>
            </li>
          ))}
        </ul>
      </Box>
    </section>
  );
}

function Numbers() {
  return (
    <section className="bg-d8-ink text-d8-cream py-20 lg:py-24 border-y-[3px] border-d8-ink">
      <Box>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Big className="text-[44px] sm:text-[64px]">By the numbers</Big>
          <Tag className="bg-d8-yellow text-d8-ink">Illustrative figures</Tag>
        </div>
        <dl className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {sampleStats.map((s, i) => (
            <Pop key={s.label} delay={i * 0.08} tilt={i % 2 ? 4 : -4}>
              <div className={`p-6 text-d8-ink ${card} !shadow-[6px_6px_0_#ffd43b] ${['bg-d8-pink', 'bg-d8-mint', 'bg-white', 'bg-d8-yellow'][i]}`}>
                <dd className="font-d8-display font-extrabold text-[40px] sm:text-[52px] xl:text-[60px] leading-none tracking-[-0.04em]">{s.value}</dd>
                <dt className="mt-3 font-d8-mono text-[12.5px] uppercase">{s.label}</dt>
              </div>
            </Pop>
          ))}
        </dl>
      </Box>
    </section>
  );
}

function HowWeWork() {
  return (
    <section className="py-20 lg:py-28 overflow-hidden">
      <Box className="grid lg:grid-cols-[1fr_1.6fr] gap-12 items-start">
        <div className="lg:sticky lg:top-28">
          <Big className="text-[52px] sm:text-[72px]">
            How we <span className="bg-d8-mint px-2 border-[3px] border-d8-ink rounded-xl inline-block -rotate-2">roll</span>
          </Big>
          <p className="mt-6 text-[18px] font-medium max-w-md">Six values we actually use when making decisions. No posters required.</p>
          <div className="mt-8">
            <Go to={P.about} tone="pink">
              The full story
            </Go>
          </div>
        </div>
        <ul className="grid sm:grid-cols-2 gap-5">
          {coreValues.map((v, i) => {
            const Icon = ICONS[v.icon];
            return (
              <li key={v.title} className={i % 2 ? 'sm:translate-y-10' : ''}>
                <Pop delay={(i % 2) * 0.08} tilt={i % 2 ? 4 : -4}>
                  <div className={`p-6 bg-white ${card}`} style={{ transform: `rotate(${[-1.5, 1.2, 1, -1.2, -0.8, 1.5][i]}deg)` }}>
                    <span className={`grid place-items-center w-12 h-12 border-[3px] border-d8-ink rounded-full ${POP[i % 4]}`}>
                      <Icon size={22} strokeWidth={2.5} aria-hidden />
                    </span>
                    <h3 className="mt-5 font-d8-display font-extrabold text-[26px]">{v.title}</h3>
                    <p className="mt-2 font-medium text-d8-gray">{v.description}</p>
                  </div>
                </Pop>
              </li>
            );
          })}
        </ul>
      </Box>
    </section>
  );
}

function Fresh() {
  const items = news.slice(0, 3);
  return (
    <section className="py-20 lg:py-28 bg-d8-pink border-y-[3px] border-d8-ink">
      <Box>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Big className="text-[52px] sm:text-[80px]">Fresh off the press</Big>
          <Go to={P.news} tone="white">
            All news
          </Go>
        </div>
        <ul className="mt-12 grid md:grid-cols-3 gap-6">
          {items.map((n, i) => (
            <li key={n.slug}>
              <Pop delay={i * 0.08} className="h-full">
                <Link to={P.article(n.slug)} className={`group flex flex-col h-full bg-white overflow-hidden ${card} ${lift}`}>
                  <div className="relative border-b-[3px] border-d8-ink">
                    <img src={n.image.sm} alt={n.image.alt} className="w-full aspect-[16/10] object-cover" loading="lazy" />
                    <span className="absolute top-3 left-3">
                      <Sticker className={POP[i % 4].split(' ')[0]} rotate={-5}>
                        {n.category}
                      </Sticker>
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <time dateTime={n.date} className="font-d8-mono text-[12px] uppercase text-d8-gray">
                      {formatDate(n.date)}
                    </time>
                    <h3 className="mt-2 font-d8-display font-extrabold text-[22px] leading-tight">{n.title}</h3>
                    <span className="mt-auto pt-5 font-d8-display font-bold underline underline-offset-4 decoration-[3px] decoration-d8-blue">Read it →</span>
                  </div>
                </Link>
              </Pop>
            </li>
          ))}
        </ul>
      </Box>
    </section>
  );
}

function Faces() {
  return (
    <section className="py-20 lg:py-28">
      <Box>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Big className="text-[52px] sm:text-[72px]">
            The <Outline>humans</Outline> in charge
          </Big>
          <Sample>Fictional profiles</Sample>
        </div>
        <ul className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-10 justify-items-center">
          {leaders.map((l, i) => (
            <li key={l.id}>
              <Link to={P.leadership} className="group block text-center w-[130px] sm:w-[150px]">
                <span className={`block mx-auto w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-full overflow-hidden border-[3px] border-d8-ink shadow-[5px_5px_0_#111] ${POP[i % 4]} transition-transform group-hover:-translate-y-2 group-hover:rotate-3`}>
                  <img src={l.portrait} alt={`${l.name} (placeholder portrait)`} className="w-full h-full object-cover mix-blend-multiply grayscale" loading="lazy" />
                </span>
                <span className="block mt-3 font-d8-display font-extrabold text-[17px] leading-tight">{l.name}</span>
                <span className="block font-d8-mono text-[11.5px] uppercase text-d8-gray">{l.role}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Box>
    </section>
  );
}

function NextUp() {
  const lanes = ['Now', 'Next', 'Later'];
  return (
    <section className="py-20 lg:py-28 bg-d8-mint border-y-[3px] border-d8-ink">
      <Box>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Big className="text-[52px] sm:text-[80px]">What’s next</Big>
          <Tag className="bg-white">Illustrative · not a commitment</Tag>
        </div>
        <ul className="mt-12 grid md:grid-cols-3 gap-6">
          {roadmap.map((r, i) => (
            <li key={r.id}>
              <Pop delay={i * 0.1} tilt={(i - 1) * 3}>
                <Link to={P.roadmap} className={`block bg-white p-6 ${card} ${lift}`}>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 border-[3px] border-d8-ink rounded-full font-d8-display font-extrabold ${['bg-d8-yellow', 'bg-d8-pink', 'bg-d8-blue text-white'][i]}`}>{lanes[i]}</span>
                    <span className="font-d8-mono text-[12px]">{r.horizon}</span>
                  </div>
                  <h3 className="mt-6 font-d8-display font-extrabold text-[28px] leading-tight">{r.title}</h3>
                  <p className="mt-2 font-medium text-d8-gray">{r.summary}</p>
                  <p className="mt-5 font-d8-mono text-[12px] uppercase">{r.initiatives.length} initiatives →</p>
                </Link>
              </Pop>
            </li>
          ))}
        </ul>
      </Box>
    </section>
  );
}

function Shout() {
  return (
    <section className="py-20 lg:py-28">
      <Box>
        <div className={`relative overflow-hidden bg-d8-yellow p-8 sm:p-14 ${card}`}>
          <div className="absolute right-8 top-8 hidden md:block">
            <Sticker className="bg-d8-pink" rotate={12}>
              5 programmes!
            </Sticker>
          </div>
          <Big className="text-[52px] sm:text-[88px] max-w-4xl">
            Let’s make something <Outline>together.</Outline>
          </Big>
          <p className="mt-6 max-w-xl text-[19px] font-medium">Dealers, OEMs, tech partners, investors and suppliers — pick your lane and tell us about yourself.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Go to={P.partner} tone="ink">
              Partner with us
            </Go>
            <Go to={P.contact} tone="white">
              Just say hi
            </Go>
          </div>
        </div>
      </Box>
    </section>
  );
}

export default function Home() {
  useMeta('', 'A bold, energetic corporate presence for a diversified group that wants to stand out (design concept).');
  return (
    <>
      <Hero />
      <Crew />
      <Numbers />
      <HowWeWork />
      <Fresh />
      <Faces />
      <NextUp />
      <Shout />
    </>
  );
}
