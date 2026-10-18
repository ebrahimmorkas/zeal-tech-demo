import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, Quote } from 'lucide-react';
import { BRAND } from '../../../data/brand';
import { about, coreValues } from '../../../data/about';
import { groupCompanies } from '../../../data/groupCompanies';
import { chairman, managingDirector, leaders } from '../../../data/leadership';
import { news, formatDate } from '../../../data/news';
import { partnershipTypes } from '../../../data/partnerships';
import { ICONS } from '../../../lib/icons';
import { Box, Go, P, Pill, Sample, Swash, Title, Up, useMeta } from '../ui';

const tones = ['bg-d5-sky text-d5-teal', 'bg-[#fde9e3] text-[#b5452c]', 'bg-[#fdf0d2] text-[#8a5a00]', 'bg-[#e8eefc] text-[#3b4fb8]', 'bg-[#efe8fb] text-[#6b3fb8]'];

export default function Home() {
  useMeta('Home', `${BRAND.name} — a global group of companies built on people, partnership and sustainable growth.`);
  const rail = useRef<HTMLUListElement>(null);
  const scroll = (d: number) => rail.current?.scrollBy({ left: d * 360, behavior: 'smooth' });

  return (
    <>
      {/* HERO MOSAIC */}
      <section className="pt-8 pb-20 lg:pt-12 lg:pb-28 overflow-hidden">
        <Box className="grid lg:grid-cols-[1fr_1.05fr] gap-12 items-center">
          <div>
            <Pill>🌍 A global group of companies</Pill>
            <motion.h1 className="mt-6 font-d5-sans font-extrabold tracking-[-0.035em] leading-[1.04] text-[44px] sm:text-[62px] lg:text-[72px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 70, damping: 16 }}>
              Growing <Swash>together</Swash>, across borders and generations.
            </motion.h1>
            <p className="mt-6 max-w-xl text-[19px] leading-relaxed text-d5-mute">
              We’re a family of companies in industry, energy, logistics and technology — and we believe the best results come from people and partners who trust each other.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Go to={P.partner} tone="coral">
                Partner with us
              </Go>
              <Go to={P.about} tone="soft">
                Our story
              </Go>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {leaders.slice(2, 6).map((l) => (
                  <img key={l.id} src={l.portrait} alt="" className="w-11 h-11 rounded-full object-cover object-top ring-[3px] ring-white" />
                ))}
              </div>
              <p className="text-[15px] text-d5-mute">
                <span className="font-bold text-d5-ink">4,500 colleagues*</span> in 18 countries*
                <span className="block text-[12.5px]">*illustrative figures</span>
              </p>
            </div>
          </div>
          <div className="relative grid grid-cols-6 grid-rows-6 gap-3 sm:gap-4 h-[420px] sm:h-[540px]">
            {[
              { src: '/images/team-diverse-sm.jpg', alt: 'Colleagues discussing ideas together in a creative space', c: 'col-span-4 row-span-4 rounded-[32px]' },
              { src: '/images/hands-together-sm.jpg', alt: 'Team members joining hands over a desk', c: 'col-span-2 row-span-3 rounded-[28px_28px_80px_28px]' },
              { src: '/images/lab-team-sm.jpg', alt: 'Scientists collaborating in a laboratory', c: 'col-span-2 row-span-3 rounded-full' },
              { src: '/images/collab-pair-sm.jpg', alt: 'Two colleagues working together at a computer', c: 'col-span-4 row-span-2 rounded-[28px]' },
            ].map((m, i) => (
              <motion.img key={m.src} src={m.src} alt={m.alt} className={`w-full h-full object-cover ${m.c}`} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + i * 0.1, type: 'spring', stiffness: 90, damping: 16 }} />
            ))}
            <motion.div className="absolute -left-2 sm:-left-8 bottom-24 sm:bottom-32 max-w-[250px] rounded-3xl bg-white p-4 shadow-[0_20px_50px_-20px_rgba(20,48,45,0.45)]" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
              <p className="font-d5-serif italic text-[16px] leading-snug">“Graduates rotate across our companies to learn the whole business.”</p>
              <p className="mt-2 text-[12.5px] font-bold text-d5-teal">Graduate programme · sample story</p>
            </motion.div>
          </div>
        </Box>
      </section>

      {/* PARTNERSHIP PATHWAYS */}
      <section className="pb-24">
        <Box>
          <div className="rounded-[40px] bg-d5-sand p-6 sm:p-10 lg:p-14">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <Pill tone="coral">Partnerships</Pill>
                <Title className="mt-4 text-[36px] sm:text-[48px]">Five ways to grow with us</Title>
                <p className="mt-3 text-[17px] text-d5-mute">Whichever way you’d like to work together, there’s a simple form and a real conversation waiting.</p>
              </div>
              <Go to={P.partner} tone="white">
                Compare programmes
              </Go>
            </div>
            <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {partnershipTypes.map((p, i) => {
                const Icon = ICONS[p.icon];
                return (
                  <li key={p.id}>
                    <Up delay={i * 0.05} className="h-full">
                      <Link to={P.partnerType(p.id)} className="group flex flex-col h-full rounded-[28px] bg-white p-6 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(20,48,45,0.5)] transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-d5-sun">
                        <span className={`grid place-items-center w-12 h-12 rounded-2xl ${tones[i]}`}>
                          <Icon size={22} aria-hidden />
                        </span>
                        <span className="mt-5 text-[18px] font-extrabold leading-tight">{p.shortTitle}</span>
                        <span className="mt-2 text-[14.5px] text-d5-mute flex-1">{p.idealFor}</span>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-bold text-d5-teal">
                          Apply <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
                        </span>
                      </Link>
                    </Up>
                  </li>
                );
              })}
            </ul>
          </div>
        </Box>
      </section>

      {/* STORY */}
      <section className="pb-24">
        <Box className="grid lg:grid-cols-2 gap-12 items-center">
          <Up className="relative">
            <img src="/images/team-review.jpg" alt="Colleagues gathered around a laptop, smiling and collaborating" className="w-full aspect-[5/4] object-cover rounded-[36px]" loading="lazy" />
            <div className="absolute -bottom-6 right-4 sm:right-8 grid grid-cols-2 gap-3">
              {[
                ['6', 'companies'],
                ['25+', 'years*'],
              ].map(([v, l]) => (
                <div key={l} className="rounded-3xl bg-white px-5 py-4 shadow-[0_16px_40px_-20px_rgba(20,48,45,0.5)]">
                  <p className="text-[30px] font-extrabold text-d5-teal leading-none">{v}</p>
                  <p className="text-[13px] font-semibold text-d5-mute">{l}</p>
                </div>
              ))}
            </div>
          </Up>
          <Up delay={0.1}>
            <Pill>Our story</Pill>
            <Title className="mt-4 text-[34px] sm:text-[46px]">It started with one workshop and a simple belief.</Title>
            <p className="mt-5 text-[17.5px] leading-relaxed text-d5-mute">{about.story[0]}</p>
            <p className="mt-4 text-[17.5px] leading-relaxed text-d5-mute">{about.story[1]}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Go to={P.about}>Read our story</Go>
              <Sample>*Illustrative</Sample>
            </div>
          </Up>
        </Box>
      </section>

      {/* COMPANIES CAROUSEL */}
      <section className="py-20 bg-d5-sky/60">
        <Box>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Pill tone="white">Our companies</Pill>
              <Title className="mt-4 text-[34px] sm:text-[46px]">Meet the family</Title>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => scroll(-1)} aria-label="Scroll companies left" className="grid place-items-center w-12 h-12 rounded-full bg-white hover:bg-d5-teal hover:text-white transition-colors">
                <ArrowLeft size={20} />
              </button>
              <button type="button" onClick={() => scroll(1)} aria-label="Scroll companies right" className="grid place-items-center w-12 h-12 rounded-full bg-white hover:bg-d5-teal hover:text-white transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </Box>
        <ul ref={rail} className="mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar px-5 sm:px-8 xl:px-[calc((100vw-1280px)/2+32px)] pb-4" aria-label="Group companies">
          {groupCompanies.map((c) => (
            <li key={c.slug} className="snap-start shrink-0 w-[300px] sm:w-[340px]">
              <Link to={P.company(c.slug)} className="group block h-full rounded-[32px] bg-white overflow-hidden hover:shadow-[0_24px_50px_-28px_rgba(20,48,45,0.6)] transition-shadow focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-d5-sun">
                <img src={c.image.sm} alt={c.image.alt} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                <div className="p-6">
                  <span className="inline-block text-[12.5px] font-bold px-3 py-1 rounded-full text-white" style={{ background: c.accent }}>
                    {c.sector}
                  </span>
                  <p className="mt-3 text-[20px] font-extrabold leading-tight group-hover:text-d5-teal transition-colors">{c.name}</p>
                  <p className="mt-2 text-[15px] text-d5-mute">{c.tagline}</p>
                </div>
              </Link>
            </li>
          ))}
          <li className="snap-start shrink-0 w-[260px]">
            <Link to={P.companies} className="grid place-items-center h-full min-h-[300px] rounded-[32px] border-2 border-dashed border-d5-teal/40 text-d5-teal font-bold hover:bg-white">
              See all companies →
            </Link>
          </li>
        </ul>
      </section>

      {/* LEADERSHIP VOICE */}
      <section className="py-24">
        <Box className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <Up className="rounded-[36px] bg-d5-teal text-white p-8 sm:p-12 relative overflow-hidden">
            <Quote size={64} className="absolute top-6 right-6 text-white/10" aria-hidden />
            <Pill tone="white">From our Chairman</Pill>
            <p className="mt-6 font-d5-serif italic text-[26px] sm:text-[32px] leading-[1.35]">“{about.chairmanMessage.paragraphs[0]}”</p>
            <div className="mt-8 flex items-center gap-4">
              <img src={chairman.portrait} alt={`${chairman.name} (placeholder portrait)`} className="w-14 h-14 rounded-full object-cover object-top ring-4 ring-white/20" loading="lazy" />
              <div>
                <p className="font-bold">{chairman.name}</p>
                <p className="text-[14px] text-white/70">{chairman.role} · placeholder profile</p>
              </div>
            </div>
          </Up>
          <Up delay={0.1} className="rounded-[36px] bg-d5-sand p-8 sm:p-10 flex flex-col">
            <img src={managingDirector.portrait} alt={`${managingDirector.name} (placeholder portrait)`} className="w-20 h-20 rounded-full object-cover object-top" loading="lazy" />
            <p className="mt-5 font-d5-serif italic text-[22px] leading-snug">“{managingDirector.quote}”</p>
            <p className="mt-4 font-bold">{managingDirector.name}</p>
            <p className="text-[14px] text-d5-mute">{managingDirector.role}</p>
            <Link to={P.leadership} className="mt-auto pt-6 inline-flex items-center gap-1.5 font-bold text-d5-teal">
              Meet our leaders <ArrowRight size={16} aria-hidden />
            </Link>
          </Up>
        </Box>
      </section>

      {/* VALUES */}
      <section className="pb-24">
        <Box>
          <div className="text-center max-w-2xl mx-auto">
            <Pill tone="sun">What we stand for</Pill>
            <Title className="mt-4 text-[34px] sm:text-[46px]">Values you can feel in every partnership</Title>
          </div>
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreValues.map((v, i) => {
              const Icon = ICONS[v.icon];
              return (
                <li key={v.title}>
                  <Up delay={(i % 3) * 0.06} className="h-full rounded-[28px] border-2 border-[#efeae1] p-7 hover:border-d5-teal/30 transition-colors">
                    <span className={`grid place-items-center w-12 h-12 rounded-full ${tones[i % tones.length]}`}>
                      <Icon size={22} aria-hidden />
                    </span>
                    <p className="mt-5 text-[19px] font-extrabold">{v.title}</p>
                    <p className="mt-1.5 text-[15.5px] text-d5-mute">{v.description}</p>
                  </Up>
                </li>
              );
            })}
          </ul>
        </Box>
      </section>

      {/* STORIES */}
      <section className="pb-24">
        <Box>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Pill>Stories & news</Pill>
              <Title className="mt-4 text-[34px] sm:text-[46px]">What’s happening</Title>
            </div>
            <Go to={P.news} tone="soft">
              All stories
            </Go>
          </div>
          <ul className="mt-10 grid md:grid-cols-3 gap-5">
            {[news[2], news[5], news[9]].map((n) => (
              <li key={n.slug}>
                <Link to={P.article(n.slug)} className="group block h-full rounded-[28px] bg-d5-sand overflow-hidden focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-d5-sun">
                  <div className="relative">
                    <img src={n.image.sm} alt={n.image.alt} className="w-full aspect-[16/10] object-cover group-hover:scale-[1.03] transition-transform duration-500" loading="lazy" />
                    {n.category === 'Video' && (
                      <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-white text-[13px] font-bold">
                        <Play size={13} aria-hidden /> Watch · {n.duration}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-[13px] font-bold text-d5-coral">
                      {n.category} · {formatDate(n.date, 'short')}
                    </p>
                    <p className="mt-2 text-[19px] font-extrabold leading-snug group-hover:text-d5-teal transition-colors">{n.title}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Box>
      </section>

      {/* ENQUIRY CTA */}
      <section>
        <Box>
          <div className="relative rounded-[40px] bg-d5-coral text-white p-8 sm:p-14 overflow-hidden">
            <span className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-white/10" aria-hidden />
            <span className="absolute right-24 -bottom-20 w-52 h-52 rounded-full bg-d5-sun/40" aria-hidden />
            <div className="relative grid lg:grid-cols-[1.3fr_1fr] gap-8 items-center">
              <div>
                <Title className="!text-white text-[34px] sm:text-[48px]">Have a question? We’d love to hear from you.</Title>
                <p className="mt-4 text-white/85 text-[17px]">Our team will connect you with the right company — usually within two working days (sample commitment).</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Go to={P.contact} tone="white">
                  Get in touch
                </Go>
                <Go to={P.partner} tone="teal">
                  Partner with us
                </Go>
              </div>
            </div>
          </div>
        </Box>
      </section>
    </>
  );
}
