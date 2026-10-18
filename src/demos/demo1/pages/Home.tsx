import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Building2, Handshake, Users, Mail } from 'lucide-react';
import { groupCompanies } from '../../../data/groupCompanies';
import { about, capabilities, sampleStats } from '../../../data/about';
import { chairman } from '../../../data/leadership';
import { news, formatDate } from '../../../data/news';
import { partnershipTypes } from '../../../data/partnerships';
import { ICONS } from '../../../lib/icons';
import { BRAND } from '../../../data/brand';
import { ButtonLink, Container, Eyebrow, Heading, P, Reveal, SampleTag, TextLink, useMeta } from '../ui';

const slides = [
  {
    image: '/images/towers.jpg',
    kicker: 'A diversified corporate group',
    title: 'Enterprise built on trust, engineered to endure.',
    text: 'Specialised companies in manufacturing, infrastructure, energy, logistics and technology — united by shared standards and long-term thinking.',
    cta: { label: 'Discover the Group', to: P.about },
  },
  {
    image: '/images/assembly-line.jpg',
    kicker: 'Industry & Manufacturing',
    title: 'Precision and reliability at every stage of production.',
    text: 'From automated production lines to high-tolerance components, our companies keep critical operations running.',
    cta: { label: 'Our Companies', to: P.companies },
  },
  {
    image: '/images/solar-aerial.jpg',
    kicker: 'Energy & Infrastructure',
    title: 'Investing in the infrastructure of tomorrow.',
    text: 'Responsible growth in renewable energy and critical infrastructure, delivered alongside trusted partners.',
    cta: { label: 'Future Roadmap', to: P.roadmap },
  },
];

function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const go = useCallback((d: number) => setIndex((i) => (i + d + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused || reduce) return;
    const t = window.setTimeout(() => go(1), 7000);
    return () => window.clearTimeout(t);
  }, [index, paused, reduce, go]);

  const s = slides[index];
  return (
    <section
      aria-roledescription="carousel"
      aria-label="Introduction"
      className="relative h-[calc(100svh-76px)] min-h-[560px] max-h-[860px] lg:h-[calc(100svh-128px)] bg-d1-navy overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={s.image}
          src={s.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.1 }, scale: { duration: 7, ease: 'linear' } }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-d1-navy/95 via-d1-navy/70 to-d1-navy/10" aria-hidden />
      <Container className="relative h-full flex flex-col justify-center">
        <div className="max-w-[720px]" aria-live={paused ? 'polite' : 'off'}>
          <AnimatePresence mode="wait">
            <motion.div key={index} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6 }}>
              <Eyebrow light>{s.kicker}</Eyebrow>
              <Heading as={index === 0 ? 'h1' : 'h2'} light className="mt-6 text-[44px] sm:text-[60px] lg:text-[76px]">
                {s.title}
              </Heading>
              <p className="mt-6 max-w-xl text-[18px] sm:text-[19px] leading-relaxed text-white/80">{s.text}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonLink to={s.cta.to} variant="gold">
                  {s.cta.label}
                </ButtonLink>
                <ButtonLink to={P.contact} variant="light">
                  Contact Us
                </ButtonLink>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-14 flex items-center gap-6 text-white max-w-[560px]">
        <p className="font-d1-serif text-[22px] tabular-nums" aria-hidden>
          {String(index + 1).padStart(2, '0')} <span className="text-white/40">/ {String(slides.length).padStart(2, '0')}</span>
        </p>
        <div className="flex-1 max-w-[260px] flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === index}
              className="relative flex-1 h-6 group focus-visible:outline focus-visible:outline-1 focus-visible:outline-d1-goldlight"
            >
              <span className="absolute left-0 right-0 top-1/2 h-px bg-white/30" />
              <span className={`absolute left-0 top-1/2 h-px bg-d1-goldlight transition-all duration-500 ${i === index ? 'right-0' : 'right-full'}`} />
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous slide" className="grid place-items-center w-11 h-11 border border-white/30 hover:bg-white hover:text-d1-navy transition-colors">
            <ArrowLeft size={18} />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next slide" className="grid place-items-center w-11 h-11 border border-white/30 hover:bg-white hover:text-d1-navy transition-colors">
            <ArrowRight size={18} />
          </button>
        </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

const quick = [
  { icon: Building2, label: 'Group Companies', text: 'Six specialised businesses', to: P.companies },
  { icon: Users, label: 'Leadership', text: 'Board and senior advisors', to: P.leadership },
  { icon: Handshake, label: 'Partner With Us', text: 'Dealers, OEMs, investors, vendors', to: P.partner },
  { icon: Mail, label: 'Enquiries', text: 'Reach the corporate office', to: P.contact },
];

export default function Home() {
  useMeta('Home', `${BRAND.name} — a diversified corporate group across manufacturing, infrastructure, energy, logistics and technology.`);
  const featured = news.filter((n) => n.category !== 'Video').slice(0, 3);
  return (
    <>
      <HeroSlider />

      {/* Quick access strip */}
      <div className="relative z-10 -mt-px bg-white border-b border-d1-stone">
        <Container>
          <ul className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-d1-stone border-x border-d1-stone">
            {quick.map(({ icon: Icon, label, text, to }) => (
              <li key={label} className="[&:nth-child(3)]:border-t lg:[&:nth-child(3)]:border-t-0 [&:nth-child(4)]:border-t lg:[&:nth-child(4)]:border-t-0 border-d1-stone">
                <Link to={to} className="group flex items-start gap-4 p-5 sm:p-7 h-full hover:bg-d1-ivory transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-d1-gold">
                  <Icon className="mt-1 shrink-0 text-d1-gold" size={24} strokeWidth={1.4} aria-hidden />
                  <span>
                    <span className="block font-d1-serif text-[21px] font-semibold text-d1-navy leading-tight group-hover:text-d1-gold transition-colors">{label}</span>
                    <span className="hidden sm:block mt-1 text-[14px] text-d1-muted">{text}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* Introduction */}
      <section className="py-24 lg:py-32">
        <Container className="grid lg:grid-cols-[1.05fr_1fr] gap-16 lg:gap-24 items-center">
          <Reveal>
            <Eyebrow>Welcome to {BRAND.name}</Eyebrow>
            <Heading className="mt-6 text-[40px] sm:text-[52px]">{about.storyTitle}</Heading>
            <p className="mt-8 text-[19px] leading-[1.75] text-d1-ink/85 first-letter:float-left first-letter:mr-3 first-letter:font-d1-serif first-letter:text-[64px] first-letter:leading-[0.85] first-letter:text-d1-gold">
              {about.story[0]}
            </p>
            <p className="mt-5 text-[17px] leading-[1.75] text-d1-muted">{about.story[2]}</p>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <ButtonLink to={P.about}>Our Story</ButtonLink>
              <TextLink to={P.leadership}>Meet the Leadership</TextLink>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="relative">
            <div className="absolute -top-6 -right-6 w-2/3 h-2/3 border border-d1-gold/60 hidden sm:block" aria-hidden />
            <img src="/images/office-loft.jpg" alt="Bright corporate office with large windows" className="relative w-full aspect-[4/5] object-cover" loading="lazy" />
            <div className="absolute -bottom-8 left-0 sm:-left-10 bg-d1-navy text-white p-7 max-w-[300px]">
              <p className="font-d1-serif text-[22px] leading-snug italic">“{chairman.quote}”</p>
              <p className="mt-4 text-[12px] uppercase tracking-[0.18em] text-d1-goldlight">{chairman.name} · {chairman.role}</p>
            </div>
          </Reveal>
        </Container>
        <Container className="mt-28">
          <dl className="grid grid-cols-2 lg:grid-cols-4 border-t border-d1-stone">
            {sampleStats.map((s) => (
              <div key={s.label} className="pt-8 pr-6">
                <dt className="text-[13px] uppercase tracking-[0.16em] text-d1-muted">{s.label}</dt>
                <dd className="mt-2 font-d1-serif text-[54px] leading-none text-d1-navy font-semibold">{s.value}</dd>
                <dd className="mt-2 text-[11px] uppercase tracking-[0.16em] text-d1-gold">{s.note}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Group companies */}
      <section className="py-24 lg:py-28 bg-white border-y border-d1-stone">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Eyebrow>Group Companies</Eyebrow>
              <Heading className="mt-5 text-[40px] sm:text-[50px] max-w-xl">Six companies. One commitment to excellence.</Heading>
            </div>
            <TextLink to={P.companies}>View all companies</TextLink>
          </div>
          <ul className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-d1-stone border border-d1-stone">
            {groupCompanies.map((c, i) => (
              <li key={c.slug} className="bg-white">
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <Link to={P.company(c.slug)} className="group block h-full focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-d1-gold">
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <img src={c.image.sm} alt={c.image.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      <span className="absolute top-4 left-4 grid place-items-center w-12 h-12 bg-white font-d1-serif text-[18px] font-semibold text-d1-navy">{c.monogram}</span>
                    </div>
                    <div className="p-7">
                      <p className="text-[12px] uppercase tracking-[0.18em] text-d1-gold font-semibold">{c.sector}</p>
                      <h3 className="mt-3 font-d1-serif text-[26px] font-semibold text-d1-navy leading-tight">{c.name}</h3>
                      <p className="mt-3 text-[16px] text-d1-muted leading-relaxed">{c.tagline}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-d1-navy">
                        Learn more <ArrowRight size={14} className="text-d1-gold transition-transform group-hover:translate-x-1" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="py-24 lg:py-32">
        <Container className="grid lg:grid-cols-[1fr_2fr] gap-16">
          <Reveal>
            <Eyebrow>Capabilities</Eyebrow>
            <Heading className="mt-5 text-[40px] sm:text-[48px]">Integrated capability across the value chain.</Heading>
            <p className="mt-6 text-d1-muted leading-relaxed">
              Our companies collaborate to deliver complete solutions, from engineering and manufacturing to energy, logistics and digital services.
            </p>
          </Reveal>
          <ul className="grid sm:grid-cols-2 border-t border-l border-d1-stone">
            {capabilities.map((c, i) => {
              const Icon = ICONS[c.icon];
              return (
                <li key={c.title} className="border-r border-b border-d1-stone p-8">
                  <Reveal delay={(i % 2) * 0.08}>
                    <Icon size={30} strokeWidth={1.3} className="text-d1-gold" aria-hidden />
                    <h3 className="mt-5 font-d1-serif text-[24px] font-semibold text-d1-navy">{c.title}</h3>
                    <p className="mt-2 text-[16px] text-d1-muted leading-relaxed">{c.description}</p>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Chairman message */}
      <section className="bg-d1-navy text-white overflow-hidden">
        <Container className="grid lg:grid-cols-[0.8fr_1.2fr] items-stretch">
          <div className="relative min-h-[420px] lg:min-h-[620px] -mx-5 sm:-mx-8 lg:mx-0">
            <img src={chairman.portrait} alt={`Portrait of ${chairman.name}, ${chairman.role} (placeholder)`} className="absolute inset-0 w-full h-full object-cover object-top" loading="lazy" />
          </div>
          <Reveal className="py-20 lg:py-28 lg:pl-20">
            <Eyebrow light>Chairman’s Message</Eyebrow>
            <blockquote className="mt-8">
              <p className="font-d1-serif text-[32px] sm:text-[42px] leading-[1.2] font-medium">“{about.chairmanMessage.paragraphs[0]}”</p>
              <footer className="mt-8 flex flex-wrap items-center gap-4">
                <span>
                  <span className="block font-d1-serif text-[24px]">{chairman.name}</span>
                  <span className="block text-[13px] uppercase tracking-[0.18em] text-white/60">{chairman.role}</span>
                </span>
                <SampleTag light>Placeholder profile</SampleTag>
              </footer>
            </blockquote>
            <div className="mt-10">
              <TextLink to={`${P.about}#messages`} light>
                Read the full message
              </TextLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* News */}
      <section className="py-24 lg:py-32">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Eyebrow>News & Updates</Eyebrow>
              <Heading className="mt-5 text-[40px] sm:text-[50px]">Latest from the Group</Heading>
            </div>
            <TextLink to={P.news}>All news & videos</TextLink>
          </div>
          <div className="mt-14 grid lg:grid-cols-[1.5fr_1fr] gap-10">
            <Reveal>
              <Link to={P.article(featured[0].slug)} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-d1-gold">
                <div className="overflow-hidden">
                  <img src={featured[0].image.src} alt={featured[0].image.alt} className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                </div>
                <p className="mt-6 text-[12px] uppercase tracking-[0.18em] text-d1-gold font-semibold">
                  {featured[0].category} · <time dateTime={featured[0].date}>{formatDate(featured[0].date)}</time>
                </p>
                <h3 className="mt-3 font-d1-serif text-[32px] font-semibold text-d1-navy leading-tight group-hover:text-d1-gold transition-colors">{featured[0].title}</h3>
                <p className="mt-3 text-d1-muted leading-relaxed">{featured[0].excerpt}</p>
              </Link>
            </Reveal>
            <ul className="divide-y divide-d1-stone border-y border-d1-stone">
              {featured.slice(1).concat(news.filter((n) => n.category === 'Video').slice(0, 1)).map((n) => (
                <li key={n.slug}>
                  <Link to={P.article(n.slug)} className="group flex gap-5 py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-d1-gold">
                    <img src={n.image.sm} alt="" className="w-28 h-24 object-cover shrink-0" loading="lazy" />
                    <span>
                      <span className="block text-[11px] uppercase tracking-[0.18em] text-d1-gold font-semibold">
                        {n.category} · {formatDate(n.date, 'short')}
                      </span>
                      <span className="mt-2 block font-d1-serif text-[21px] font-semibold leading-snug text-d1-navy group-hover:text-d1-gold transition-colors">{n.title}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Partnership */}
      <section className="relative py-24 lg:py-32 text-white">
        <img src="/images/handshake.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-d1-navy/90" aria-hidden />
        <Container className="relative grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <Eyebrow light>Partnership</Eyebrow>
            <Heading light className="mt-6 text-[40px] sm:text-[54px]">Grow with a partner that thinks long term.</Heading>
            <p className="mt-6 text-white/75 text-[18px] leading-relaxed max-w-lg">
              We work with distributors, manufacturers, technology innovators, investors and suppliers who share our commitment to quality and integrity.
            </p>
            <ButtonLink to={P.partner} variant="gold" className="mt-10">
              Explore Partnerships
            </ButtonLink>
          </Reveal>
          <ul className="border-t border-white/15">
            {partnershipTypes.map((p, i) => (
              <li key={p.id} className="border-b border-white/15">
                <Link to={P.partnerType(p.id)} className="group flex items-center gap-6 py-5 hover:pl-3 transition-all focus-visible:outline focus-visible:outline-1 focus-visible:outline-d1-goldlight">
                  <span className="font-d1-serif text-[18px] text-d1-goldlight tabular-nums">0{i + 1}</span>
                  <span className="flex-1 font-d1-serif text-[24px] sm:text-[26px]">{p.title}</span>
                  <ArrowRight size={18} className="text-d1-goldlight opacity-60 group-hover:opacity-100" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Contact strip */}
      <section className="py-20 bg-white">
        <Container className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <Heading className="text-[34px] sm:text-[40px]">How can we help?</Heading>
            <p className="mt-3 text-d1-muted">Our corporate office will direct your enquiry to the right group company.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <ButtonLink to={P.contact}>Make an Enquiry</ButtonLink>
            <ButtonLink to={P.resources} variant="outline">
              Resource Centre
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
