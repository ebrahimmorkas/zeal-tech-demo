import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { about, coreValues, sampleStats, timeline } from '../../../data/about';
import { chairman, managingDirector } from '../../../data/leadership';
import { ICONS } from '../../../lib/icons';
import { Bento, Bloom, Chip, Display, Glow, Go, P, PASTEL, Sample, Shell, Tilt, tile, useMeta } from '../ui';

function Messages() {
  const tabs = [
    { id: 'chair', leader: chairman, msg: about.chairmanMessage },
    { id: 'md', leader: managingDirector, msg: about.mdMessage },
  ];
  const [active, setActive] = useState(0);
  const t = tabs[active];
  return (
    <section className="pt-16">
      <Shell>
        <div className={`${tile} p-4 sm:p-6`}>
          <div role="tablist" aria-label="Leadership messages" className="inline-flex p-1 rounded-full bg-d10-canvas">
            {tabs.map((x, i) => (
              <button key={x.id} type="button" role="tab" aria-selected={active === i} aria-controls="d10-msg" onClick={() => setActive(i)} className={`relative h-11 px-5 rounded-full text-[14.5px] font-semibold ${active === i ? 'text-d10-ink' : 'text-d10-mute hover:text-d10-ink'}`}>
                {active === i && <motion.span layoutId="d10-msg-pill" className="absolute inset-0 rounded-full bg-white shadow" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="relative">{x.msg.title}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={t.id} id="d10-msg" role="tabpanel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="mt-6 grid md:grid-cols-[260px_1fr] gap-8 p-2 sm:p-4">
              <div>
                <img src={t.leader.portrait} alt={`${t.leader.name} (placeholder portrait)`} className="w-full aspect-[4/5] object-cover rounded-[24px]" />
                <p className="mt-4 font-d10-display font-semibold text-[20px]">{t.leader.name}</p>
                <p className="text-[14px] text-d10-mute">{t.leader.role} · fictional placeholder</p>
              </div>
              <div>
                <p className="font-d10-display font-semibold text-[28px] sm:text-[34px] leading-[1.15] tracking-[-0.03em]">
                  “<Glow>{t.leader.quote}</Glow>”
                </p>
                <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-d10-mute">
                  {t.msg.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Shell>
    </section>
  );
}

export default function About() {
  useMeta('About', 'Story, leadership messages, vision, mission, values and timeline (sample content).');
  return (
    <>
      <Bento
        eyebrow="About the group"
        title={
          <>
            Built to <Glow>endure.</Glow>
          </>
        }
        intro={about.storyTitle + '.'}
        image="/images/office-loft.jpg"
        crumbs={[{ label: 'About' }]}
        aside={
          <dl className="grid grid-cols-2 gap-3">
            {sampleStats.slice(2).map((s) => (
              <div key={s.label}>
                <dd className="font-d10-display font-semibold text-[30px] leading-none">{s.value}</dd>
                <dt className="mt-1 text-[12.5px] text-d10-mute">
                  {s.label} · {s.note}
                </dt>
              </div>
            ))}
          </dl>
        }
      />

      <section className="pt-12">
        <Shell className="grid lg:grid-cols-3 gap-4">
          {about.story.map((p, i) => (
            <Bloom key={p} delay={i * 0.06} className={`${tile} p-7 ${i === 0 ? 'lg:col-span-2 lg:row-span-2 flex flex-col justify-end' : ''}`}>
              <Chip>{['Where we began', 'How we grew', 'Where we are'][i]}</Chip>
              <p className={`mt-4 ${i === 0 ? 'font-d10-display font-semibold text-[26px] sm:text-[32px] leading-[1.2] tracking-[-0.02em]' : 'text-[16.5px] text-d10-mute'}`}>{p}</p>
            </Bloom>
          ))}
        </Shell>
        <Shell className="mt-4">
          <Sample>Sample narrative — client history to follow</Sample>
        </Shell>
      </section>

      <Messages />

      <section className="pt-16">
        <Shell className="grid md:grid-cols-2 gap-4">
          {[
            { k: 'Vision', v: about.vision, c: '!bg-d10-sky/80' },
            { k: 'Mission', v: about.mission, c: '!bg-d10-mint/80' },
          ].map((x, i) => (
            <Bloom key={x.k} delay={i * 0.08} className={`${tile} ${x.c} p-8 sm:p-10`}>
              <Chip className="bg-white text-d10-ink">{x.k}</Chip>
              <p className="mt-5 font-d10-display font-semibold text-[24px] sm:text-[28px] leading-[1.25] tracking-[-0.02em]">{x.v}</p>
            </Bloom>
          ))}
        </Shell>
      </section>

      <section className="pt-16">
        <Shell>
          <Display className="text-[40px] sm:text-[52px]">
            Our <Glow>values</Glow>
          </Display>
          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreValues.map((v, i) => {
              const Icon = ICONS[v.icon];
              return (
                <li key={v.title}>
                  <Bloom delay={(i % 3) * 0.05} className="h-full">
                    <Tilt className="h-full rounded-[28px]">
                      <div className={`h-full p-7 rounded-[28px] ${PASTEL[i]}`}>
                        <span className="grid place-items-center w-12 h-12 rounded-2xl bg-white">
                          <Icon size={22} aria-hidden />
                        </span>
                        <h3 className="mt-6 font-d10-display font-semibold text-[22px]">{v.title}</h3>
                        <p className="mt-2 text-d10-ink/70">{v.description}</p>
                      </div>
                    </Tilt>
                  </Bloom>
                </li>
              );
            })}
          </ul>
        </Shell>
      </section>

      <section className="pt-16">
        <Shell className="grid lg:grid-cols-[1.3fr_1fr] gap-4">
          <div className={`${tile} p-7 sm:p-10`}>
            <Chip>Philosophy</Chip>
            <div className="mt-5 space-y-4">
              {about.philosophy.map((p) => (
                <p key={p} className="font-d10-display font-semibold text-[22px] leading-snug tracking-[-0.02em]">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className={`${tile} !bg-d10-ink !border-d10-ink text-white p-7 sm:p-10`}>
            <Chip className="bg-white/10 text-d10-mint">Why we exist</Chip>
            <p className="mt-5 text-[18px] leading-relaxed text-white/80">{about.whyWeExist}</p>
          </div>
        </Shell>
      </section>

      {/* Timeline: a horizontal progress rail with milestone cards in a scrollable bento row. */}
      <section id="timeline" className="pt-16 pb-6 scroll-mt-24">
        <Shell>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Display className="text-[40px] sm:text-[52px]">Milestones</Display>
            <Sample>Dates are illustrative placeholders</Sample>
          </div>
        </Shell>
        <div className="mt-8 overflow-x-auto no-scrollbar" tabIndex={0} aria-label="Milestones">
          <ol className="flex gap-4 px-4 sm:px-6 lg:px-[max(1.5rem,calc((100vw_-_1280px)/2_+_1.5rem))] w-max pb-4">
            {timeline.map((t, i) => (
              <li key={t.year} className={`w-[260px] shrink-0 ${tile} p-3`}>
                {t.image && <img src={t.image.sm} alt={t.image.alt} className="w-full aspect-[4/3] object-cover rounded-[20px]" loading="lazy" />}
                <div className="p-3">
                  <div className="flex items-center gap-2">
                    <span className="font-d10-display font-semibold text-[28px] tracking-[-0.04em]">{t.year}</span>
                    <span className="flex-1 h-1.5 rounded-full bg-d10-canvas overflow-hidden" aria-hidden>
                      <span className="block h-full rounded-full bg-d10-violet" style={{ width: `${((i + 1) / timeline.length) * 100}%` }} />
                    </span>
                  </div>
                  <h3 className="mt-2 font-semibold text-[17px]">{t.title}</h3>
                  <p className="mt-1 text-[14.5px] text-d10-mute">{t.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <Shell className="mt-6">
          <Go to={P.leadership}>Meet the leadership</Go>
        </Shell>
      </section>
    </>
  );
}
