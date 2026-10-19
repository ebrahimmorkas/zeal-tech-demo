import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { about, coreValues, timeline } from '../../../data/about';
import { chairman, managingDirector } from '../../../data/leadership';
import type { Leader } from '../../../types';
import { ICONS } from '../../../lib/icons';
import { Arch, Go, Grow, Kicker, Leaf, Note, Opening, P, Serif, Wave, Wrap, useMeta } from '../ui';

function Message({ leader, title, paragraphs, tone }: { leader: Leader; title: string; paragraphs: string[]; tone: 'light' | 'dark' }) {
  const dark = tone === 'dark';
  return (
    <div className={`relative overflow-hidden rounded-[48px] p-7 sm:p-12 grid md:grid-cols-[260px_1fr] gap-10 ${dark ? 'bg-d7-forest text-d7-mist' : 'bg-white'}`}>
      <div>
        <Arch src={leader.portrait} alt={`${leader.name} (placeholder portrait)`} imgClass="aspect-[4/5]" />
        <p className={`mt-4 font-d7-serif text-[24px] ${dark ? '' : 'text-d7-forest'}`}>{leader.name}</p>
        <p className={`text-[14px] ${dark ? 'text-d7-mist/70' : 'text-d7-soil'}`}>{leader.role} · fictional placeholder</p>
      </div>
      <div>
        <Kicker light={dark}>{title}</Kicker>
        <Quote size={40} className={`mt-6 ${dark ? 'text-d7-lime' : 'text-d7-moss'}`} aria-hidden />
        <p className={`mt-2 font-d7-serif text-[28px] sm:text-[34px] leading-[1.2] italic ${dark ? '' : 'text-d7-forest'}`}>{leader.quote}</p>
        <div className={`mt-8 space-y-4 text-[17px] leading-relaxed ${dark ? 'text-d7-mist/80' : 'text-d7-soil'}`}>
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function About() {
  useMeta('Our roots', 'Our story, messages from the Chairman and Managing Director, vision, mission, values and journey (sample content).');
  return (
    <>
      <Opening kicker="Our roots" title={<>A story of <em>patient</em> growth.</>} intro={about.storyTitle + '.'} image="/images/hands-together.jpg" crumbs={[{ label: 'Our roots' }]} />

      <section className="py-16 lg:py-24">
        <Wrap className="grid lg:grid-cols-[1fr_1.3fr] gap-12 items-start">
          <Grow>
            <p className="font-d7-serif text-[30px] sm:text-[38px] leading-[1.25] text-d7-forest first-letter:float-left first-letter:mr-3 first-letter:text-[88px] first-letter:leading-[0.85] first-letter:text-d7-moss">{about.story[0]}</p>
          </Grow>
          <div className="space-y-5 text-[17.5px] leading-relaxed text-d7-soil">
            <p>{about.story[1]}</p>
            <p>{about.story[2]}</p>
            <Note>Sample narrative — to be replaced with the client’s history</Note>
          </div>
        </Wrap>
      </section>

      <section className="pb-16 lg:pb-24">
        <Wrap className="space-y-8">
          <Message leader={chairman} title="A message from the Chairman" paragraphs={about.chairmanMessage.paragraphs} tone="dark" />
          <Message leader={managingDirector} title="A message from the Managing Director" paragraphs={about.mdMessage.paragraphs} tone="light" />
        </Wrap>
      </section>

      <section className="bg-d7-lichen">
        <Wave fill="#e6ecdc" flip className="bg-d7-mist" />
        <Wrap className="py-14 lg:py-20 grid md:grid-cols-2 gap-6">
          {[
            { k: 'Vision', v: about.vision, shape: 'rounded-[48px_48px_48px_8px]' },
            { k: 'Mission', v: about.mission, shape: 'rounded-[48px_48px_8px_48px]' },
          ].map((x, i) => (
            <Grow key={x.k} delay={i * 0.12}>
              <div className={`h-full bg-d7-mist p-8 sm:p-10 ${x.shape}`}>
                <Kicker>{x.k}</Kicker>
                <p className="mt-5 font-d7-serif text-[28px] sm:text-[32px] leading-[1.25] text-d7-forest">{x.v}</p>
              </div>
            </Grow>
          ))}
        </Wrap>
        <Wrap className="pb-16 lg:pb-24">
          <Serif className="text-[40px] sm:text-[56px] text-d7-forest text-center">
            What we <em>hold to.</em>
          </Serif>
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {coreValues.map((v) => {
              const Icon = ICONS[v.icon];
              return (
                <li key={v.title} className="flex gap-5">
                  <span className="shrink-0 grid place-items-center w-14 h-14 rounded-full bg-d7-forest text-d7-lime">
                    <Icon size={22} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-d7-serif text-[26px] text-d7-forest">{v.title}</h3>
                    <p className="mt-1 text-d7-soil">{v.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Wrap>
        <Wave fill="#f3f6ee" className="bg-d7-lichen" />
      </section>

      <section className="py-16 lg:py-24">
        <Wrap className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Arch src="/images/solar.jpg" alt="Rows of solar panels in sunlight" imgClass="aspect-[4/5]" className="max-w-[460px]" />
            <Leaf className="absolute -right-2 top-10 w-14" />
          </div>
          <div>
            <Kicker>Philosophy</Kicker>
            <div className="mt-6 space-y-6">
              {about.philosophy.map((p) => (
                <p key={p} className="font-d7-serif text-[26px] leading-[1.3] text-d7-forest">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-10 rounded-[32px] bg-white p-7">
              <Kicker>Why we exist</Kicker>
              <p className="mt-3 text-[17px] leading-relaxed text-d7-soil">{about.whyWeExist}</p>
            </div>
          </div>
        </Wrap>
      </section>

      {/* Journey drawn as a growing vine: a curved stem with milestones budding to either side. */}
      <section id="journey" className="pb-20 lg:pb-28 scroll-mt-24">
        <Wrap>
          <div className="text-center">
            <Kicker>Our journey</Kicker>
            <Serif className="mt-4 text-[44px] sm:text-[60px] text-d7-forest">
              From seed to <em>canopy.</em>
            </Serif>
            <div className="mt-4">
              <Note>All dates and milestones are illustrative placeholders</Note>
            </div>
          </div>
          <ol className="relative mt-16">
            <span className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-d7-lime via-d7-moss to-d7-forest" aria-hidden />
            {timeline.map((t, i) => {
              const right = i % 2 === 1;
              return (
                <li key={t.year} className="relative grid md:grid-cols-2 gap-6 md:gap-16 pb-14 last:pb-0 pl-16 md:pl-0">
                  <motion.span
                    className="absolute left-6 md:left-1/2 top-3 -translate-x-1/2 grid place-items-center w-9 h-9 rounded-full bg-d7-mist border-[3px] border-d7-moss"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                    aria-hidden
                  >
                    <span className="w-3 h-3 rounded-full bg-d7-lime" />
                  </motion.span>
                  <Grow className={right ? 'md:col-start-2' : 'md:text-right'}>
                    <p className="font-d7-serif text-[52px] leading-none text-d7-moss">{t.year}</p>
                    <h3 className="mt-2 font-d7-serif text-[28px] text-d7-forest">{t.title}</h3>
                    <p className="mt-2 text-d7-soil">{t.description}</p>
                  </Grow>
                  {t.image && (
                    <Grow className={`hidden md:block ${right ? 'md:col-start-1 md:row-start-1' : ''}`} delay={0.1}>
                      <img src={t.image.sm} alt={t.image.alt} className={`w-full max-w-[340px] aspect-[4/3] object-cover ${right ? 'ml-auto rounded-[28px] rounded-tl-[90px]' : 'rounded-[28px] rounded-tr-[90px]'}`} loading="lazy" />
                    </Grow>
                  )}
                </li>
              );
            })}
          </ol>
          <div className="mt-16 flex justify-center">
            <Go to={P.leadership}>Meet our people</Go>
          </div>
        </Wrap>
      </section>
    </>
  );
}
