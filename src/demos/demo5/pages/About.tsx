import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { about, coreValues, timeline } from '../../../data/about';
import { chairman, managingDirector } from '../../../data/leadership';
import { ICONS } from '../../../lib/icons';
import { Box, Hero, Pill, Sample, Title, Up, useMeta } from '../ui';

const tones = ['bg-d5-sky text-d5-teal', 'bg-[#fde9e3] text-[#b5452c]', 'bg-[#fdf0d2] text-[#8a5a00]', 'bg-[#e8eefc] text-[#3b4fb8]', 'bg-[#efe8fb] text-[#6b3fb8]', 'bg-[#e3f4e9] text-[#2c7a4b]'];

function Journey() {
  const [i, setI] = useState(timeline.length - 1);
  const t = timeline[i];
  return (
    <div>
      <div role="tablist" aria-label="Choose a year" className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {timeline.map((x, k) => (
          <button
            key={x.year}
            type="button"
            role="tab"
            aria-selected={k === i}
            aria-controls="d5-year-panel"
            onClick={() => setI(k)}
            className={`shrink-0 h-12 px-5 rounded-full text-[16px] font-extrabold transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-d5-sun ${k === i ? 'bg-d5-teal text-white shadow-[0_10px_24px_-12px_rgba(15,118,110,0.8)]' : k < i ? 'bg-d5-sky text-d5-teal' : 'bg-d5-sand text-d5-mute hover:text-d5-ink'}`}
          >
            {x.year}
          </button>
        ))}
      </div>
      <div className="mt-2 h-2 rounded-full bg-d5-sand overflow-hidden" aria-hidden>
        <motion.div className="h-full rounded-full bg-gradient-to-r from-d5-teal to-d5-sun" animate={{ width: `${((i + 1) / timeline.length) * 100}%` }} transition={{ type: 'spring', stiffness: 80, damping: 18 }} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={t.year} id="d5-year-panel" role="tabpanel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }} className="mt-8 grid md:grid-cols-[1fr_1.2fr] gap-8 items-center rounded-[32px] bg-d5-sand p-6 sm:p-8">
          {t.image && <img src={t.image.src} alt={t.image.alt} className="w-full aspect-[4/3] object-cover rounded-[24px]" />}
          <div>
            <p className="text-[64px] font-extrabold leading-none text-d5-teal/25">{t.year}</p>
            <Title as="h3" className="mt-2 text-[30px]">
              {t.title}
            </Title>
            <p className="mt-3 text-[17px] text-d5-mute">{t.description}</p>
            <div className="mt-5 flex gap-2">
              <button type="button" disabled={i === 0} onClick={() => setI(i - 1)} className="h-10 px-4 rounded-full bg-white font-bold text-[14px] disabled:opacity-40">
                ← Earlier
              </button>
              <button type="button" disabled={i === timeline.length - 1} onClick={() => setI(i + 1)} className="h-10 px-4 rounded-full bg-white font-bold text-[14px] disabled:opacity-40">
                Later →
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function About() {
  useMeta('Who we are', 'Our story, messages from our leaders, vision, mission, values and journey (sample content).');
  return (
    <>
      <Hero eyebrow="Who we are" title={<>People first, in everything we build.</>} intro="A family of companies united by shared values and a long-term view." image="/images/team-work.jpg" crumbs={[{ label: 'Who we are' }]} />

      <section className="py-20">
        <Box className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
          <div>
            <Pill>Our story</Pill>
            <Title className="mt-4 text-[34px] sm:text-[44px]">{about.storyTitle}</Title>
            <div className="mt-4">
              <Sample />
            </div>
          </div>
          <div className="space-y-5 text-[18px] leading-relaxed text-d5-mute">
            {about.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Box>
      </section>

      <section className="pb-20">
        <Box className="grid lg:grid-cols-2 gap-6">
          <Up className="relative rounded-[36px] bg-d5-teal text-white p-8 sm:p-12 overflow-hidden">
            <Quote size={70} className="absolute top-6 right-6 text-white/10" aria-hidden />
            <Pill tone="white">{about.chairmanMessage.title}</Pill>
            <div className="mt-6 flex items-center gap-4">
              <img src={chairman.portrait} alt={`${chairman.name} (placeholder portrait)`} className="w-20 h-20 rounded-full object-cover object-top ring-4 ring-white/20" loading="lazy" />
              <div>
                <p className="text-[20px] font-extrabold">{chairman.name}</p>
                <p className="text-white/70 text-[14px]">{chairman.role} · placeholder</p>
              </div>
            </div>
            <div className="mt-6 space-y-4 text-[16.5px] leading-relaxed text-white/90">
              {about.chairmanMessage.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Up>
          <Up delay={0.1} className="rounded-[36px] bg-d5-sand p-8 sm:p-12">
            <Pill tone="coral">{about.mdMessage.title}</Pill>
            <p className="mt-6 font-d5-serif italic text-[26px] leading-snug">“{managingDirector.quote}”</p>
            <div className="mt-6 space-y-4 text-[16.5px] leading-relaxed text-d5-mute">
              {about.mdMessage.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-4">
              <img src={managingDirector.portrait} alt={`${managingDirector.name} (placeholder portrait)`} className="w-14 h-14 rounded-full object-cover object-top" loading="lazy" />
              <div>
                <p className="font-extrabold">{managingDirector.name}</p>
                <p className="text-[14px] text-d5-mute">{managingDirector.role} · placeholder</p>
              </div>
            </div>
          </Up>
        </Box>
      </section>

      <section className="pb-20">
        <Box className="grid md:grid-cols-2 gap-6">
          <div className="rounded-[32px] bg-[#fdf0d2] p-8 sm:p-10">
            <p className="text-[15px] font-extrabold text-[#8a5a00]">🔭 Our vision</p>
            <p className="mt-4 text-[22px] sm:text-[26px] font-bold leading-snug">{about.vision}</p>
          </div>
          <div className="rounded-[32px] bg-[#fde9e3] p-8 sm:p-10">
            <p className="text-[15px] font-extrabold text-[#b5452c]">🎯 Our mission</p>
            <p className="mt-4 text-[22px] sm:text-[26px] font-bold leading-snug">{about.mission}</p>
          </div>
        </Box>
      </section>

      <section className="pb-20">
        <Box>
          <div className="text-center max-w-2xl mx-auto">
            <Pill tone="sun">Core values</Pill>
            <Title className="mt-4 text-[34px] sm:text-[44px]">What guides us every day</Title>
          </div>
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreValues.map((v, i) => {
              const Icon = ICONS[v.icon];
              return (
                <li key={v.title}>
                  <Up delay={(i % 3) * 0.05} className="h-full rounded-[28px] bg-white border-2 border-[#efeae1] p-7">
                    <span className={`grid place-items-center w-14 h-14 rounded-full ${tones[i]}`}>
                      <Icon size={24} aria-hidden />
                    </span>
                    <p className="mt-5 text-[20px] font-extrabold">{v.title}</p>
                    <p className="mt-1.5 text-[15.5px] text-d5-mute">{v.description}</p>
                  </Up>
                </li>
              );
            })}
          </ul>
        </Box>
      </section>

      <section className="py-20 bg-d5-sky/60">
        <Box className="grid lg:grid-cols-2 gap-12 items-center">
          <img src="/images/training.jpg" alt="Colleagues taking part in a learning session" className="w-full aspect-[5/4] object-cover rounded-[36px_120px_36px_36px]" loading="lazy" />
          <div>
            <Pill tone="white">Corporate philosophy</Pill>
            <div className="mt-5 space-y-4 text-[18px] leading-relaxed text-d5-ink/80">
              {about.philosophy.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 rounded-[28px] bg-white p-6">
              <p className="font-extrabold text-d5-coral">Why we exist</p>
              <p className="mt-2 text-[17px] text-d5-mute leading-relaxed">{about.whyWeExist}</p>
            </div>
          </div>
        </Box>
      </section>

      <section className="py-20">
        <Box>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Pill>Our journey so far</Pill>
              <Title className="mt-4 text-[34px] sm:text-[44px]">Milestones along the way</Title>
            </div>
            <Sample>Illustrative dates</Sample>
          </div>
          <div className="mt-10">
            <Journey />
          </div>
        </Box>
      </section>
    </>
  );
}
