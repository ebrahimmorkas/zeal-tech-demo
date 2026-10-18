import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { about, coreValues, timeline } from '../../../data/about';
import { chairman, managingDirector } from '../../../data/leadership';
import { ICONS } from '../../../lib/icons';
import { Card, H, Label, Mono, PageTop, Rise, SampleChip, Shell, dots, useMeta } from '../ui';

function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <ol ref={ref} className="relative mt-14 pl-10 sm:pl-0">
      <span className="absolute left-[15px] sm:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 rounded-full bg-[#e4e8f2]" aria-hidden />
      <motion.span style={{ scaleY }} className="absolute left-[15px] sm:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 rounded-full origin-top bg-gradient-to-b from-d4-indigo to-d4-teal" aria-hidden />
      {timeline.map((t, i) => (
        <li key={t.year} className={`relative sm:w-1/2 pb-10 ${i % 2 ? 'sm:ml-auto sm:pl-12' : 'sm:pr-12'}`}>
          <span className={`absolute top-6 w-4 h-4 rounded-full bg-white ring-4 ring-d4-indigo -left-[33px] ${i % 2 ? 'sm:-left-2' : 'sm:left-auto sm:-right-2'}`} aria-hidden />
          <Rise>
            <Card className="p-5 flex gap-4 items-start hover:ring-d4-indigo/40 transition">
              {t.image && <img src={t.image.sm} alt={t.image.alt} className="w-20 h-20 rounded-xl object-cover shrink-0" loading="lazy" />}
              <div>
                <Mono className="text-d4-indigo">{t.year}</Mono>
                <p className="mt-1 font-d4-display text-[19px]">{t.title}</p>
                <p className="mt-1 text-[14.5px] text-d4-deep/65">{t.description}</p>
              </div>
            </Card>
          </Rise>
        </li>
      ))}
    </ol>
  );
}

export default function About() {
  useMeta('About', 'Our story, leadership messages, vision, mission, values and timeline (sample content).');
  return (
    <>
      <PageTop
        label="about / the group"
        title={<>Built in engineering. Scaled through technology.</>}
        intro="How a single workshop became a connected group of six businesses."
        crumbs={[{ label: 'About' }]}
        aside={
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 font-d4-mono text-[12.5px] text-d4-haze space-y-2">
            {['story', 'leadership-messages', 'vision-mission', 'values', 'philosophy', 'timeline'].map((s) => (
              <a key={s} href={`#${s}`} className="flex justify-between hover:text-white">
                <span>./{s}</span>
                <span className="text-d4-teal">→</span>
              </a>
            ))}
          </div>
        }
      />

      <section id="story" className="scroll-mt-24 py-24">
        <Shell className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
          <div>
            <Label>our story</Label>
            <H className="mt-4 text-[36px] sm:text-[46px]">{about.storyTitle}</H>
            <div className="mt-4">
              <SampleChip />
            </div>
          </div>
          <div className="space-y-5 text-[17px] leading-relaxed text-d4-deep/75">
            {about.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Shell>
      </section>

      <section id="leadership-messages" className="scroll-mt-24 pb-24">
        <Shell className="grid lg:grid-cols-2 gap-6">
          <div className="relative overflow-hidden rounded-[28px] bg-d4-void text-white p-8 sm:p-10">
            <div className="absolute inset-0" style={dots} aria-hidden />
            <div className="relative">
              <div className="flex items-center gap-4">
                <img src={chairman.portrait} alt={`${chairman.name} (placeholder portrait)`} className="w-20 h-20 rounded-2xl object-cover object-top ring-2 ring-d4-indigo/60" loading="lazy" />
                <div>
                  <Label dark>{about.chairmanMessage.title.toLowerCase()}</Label>
                  <p className="mt-1 font-d4-display text-[20px]">{chairman.name}</p>
                  <p className="text-[13px] text-d4-haze">{chairman.role} · placeholder</p>
                </div>
              </div>
              <p className="mt-8 font-d4-display text-[26px] leading-snug tracking-[-0.02em]">“{chairman.quote}”</p>
              <div className="mt-6 space-y-4 text-[15.5px] text-d4-haze leading-relaxed">
                {about.chairmanMessage.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>
          <Card className="p-8 sm:p-10">
            <Label>{about.mdMessage.title.toLowerCase()}</Label>
            <ol className="mt-6 space-y-5">
              {about.mdMessage.paragraphs.map((p, i) => (
                <li key={p} className="grid grid-cols-[36px_1fr] gap-3">
                  <span className="grid place-items-center w-8 h-8 rounded-lg bg-d4-mist font-d4-mono text-[12px] text-d4-indigo">0{i + 1}</span>
                  <p className="text-[16px] leading-relaxed text-d4-deep/80">{p}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 pt-6 border-t border-[#e4e8f2] flex items-center gap-4">
              <img src={managingDirector.portrait} alt={`${managingDirector.name} (placeholder portrait)`} className="w-14 h-14 rounded-xl object-cover object-top" loading="lazy" />
              <div>
                <p className="font-d4-display text-[18px]">{managingDirector.name}</p>
                <p className="text-[13px] text-d4-deep/55">{managingDirector.role} · placeholder</p>
              </div>
            </div>
          </Card>
        </Shell>
      </section>

      <section id="vision-mission" className="scroll-mt-24 pb-24">
        <Shell className="grid md:grid-cols-2 gap-6">
          {[
            ['vision', about.vision],
            ['mission', about.mission],
          ].map(([k, v]) => (
            <div key={k} className="rounded-[24px] p-[1.5px] bg-gradient-to-br from-d4-indigo via-[#9aa4ff] to-d4-teal">
              <div className="h-full rounded-[23px] bg-white p-8 sm:p-10">
                <Label>{k}</Label>
                <p className="mt-5 font-d4-display text-[24px] sm:text-[28px] leading-snug tracking-[-0.02em]">{v}</p>
              </div>
            </div>
          ))}
        </Shell>
      </section>

      <section id="values" className="scroll-mt-24 pb-24">
        <Shell>
          <Label>core values</Label>
          <H className="mt-4 text-[36px] sm:text-[46px]">What we optimise for</H>
          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreValues.map((v, i) => {
              const Icon = ICONS[v.icon];
              return (
                <li key={v.title}>
                  <Rise delay={(i % 3) * 0.06} className="h-full">
                    <Card className="p-6 h-full hover:ring-d4-indigo/40 transition">
                      <span className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br from-d4-indigo/15 to-d4-teal/15 text-d4-indigo">
                        <Icon size={20} aria-hidden />
                      </span>
                      <p className="mt-5 font-d4-display text-[20px]">{v.title}</p>
                      <p className="mt-1.5 text-[14.5px] text-d4-deep/65">{v.description}</p>
                    </Card>
                  </Rise>
                </li>
              );
            })}
          </ul>
        </Shell>
      </section>

      <section id="philosophy" className="scroll-mt-24 relative bg-d4-void text-white py-24 overflow-hidden">
        <div className="absolute inset-0" style={dots} aria-hidden />
        <Shell className="relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Label dark>corporate philosophy</Label>
            <H dark className="mt-4 text-[36px] sm:text-[46px]">
              Why we exist
            </H>
            <p className="mt-5 text-[17px] text-d4-haze leading-relaxed">{about.whyWeExist}</p>
          </div>
          <div className="rounded-2xl bg-d4-deep ring-1 ring-white/10 overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 h-10 border-b border-white/10" aria-hidden>
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="ml-3 font-d4-mono text-[11.5px] text-d4-haze">principles.config</span>
            </div>
            <dl className="p-5 font-d4-mono text-[13px] leading-[1.9]">
              <dt className="text-d4-teal">horizon:</dt>
              <dd className="pl-4 text-white/85">“decades, not quarters”</dd>
              {about.philosophy.map((p, i) => (
                <div key={p}>
                  <dt className="text-d4-teal">principle_{i + 1}:</dt>
                  <dd className="pl-4 text-white/85">“{p}”</dd>
                </div>
              ))}
              <dt className="text-d4-teal">governance:</dt>
              <dd className="pl-4 text-white/85">shared standards · empowered companies</dd>
            </dl>
          </div>
        </Shell>
      </section>

      <section id="timeline" className="scroll-mt-24 py-24">
        <Shell>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Label>timeline</Label>
              <H className="mt-4 text-[36px] sm:text-[46px]">Version history</H>
            </div>
            <SampleChip />
          </div>
          <Timeline />
        </Shell>
      </section>
    </>
  );
}
