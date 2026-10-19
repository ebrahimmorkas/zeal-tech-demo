import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { about, coreValues, timeline } from '../../../data/about';
import { chairman, managingDirector } from '../../../data/leadership';
import type { Leader } from '../../../types';
import { Frame, Go, H, Label, P, PageHead, Photo, Rule, Sample, Wipe, narrow, useMeta, wide } from '../ui';

function Statement({ n, title, leader, paragraphs, flip }: { n: string; title: string; leader: Leader; paragraphs: string[]; flip?: boolean }) {
  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 py-14 border-b border-d6-line">
      <div className={`lg:col-span-4 ${flip ? 'lg:order-2 lg:col-start-9' : ''}`}>
        <Photo src={leader.portrait} alt={`${leader.name}, ${leader.role} (placeholder portrait)`} imgClass="aspect-[4/5]" />
        <p className="mt-4 font-bold">{leader.name}</p>
        <p className="text-[13px] uppercase tracking-[0.12em] text-d6-mid" style={narrow}>
          {leader.role} · fictional placeholder
        </p>
      </div>
      <div className={`lg:col-span-7 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-6'}`}>
        <Label n={n}>{title}</Label>
        <p className="mt-6 font-d6-sans font-extrabold text-[28px] sm:text-[36px] leading-[1.08] tracking-[-0.035em]" style={wide}>
          “{leader.quote}”
        </p>
        <div className="mt-8 space-y-4 text-[17px] leading-[1.6] text-d6-ink/80 columns-1 md:columns-2 gap-8">
          {paragraphs.map((p) => (
            <p key={p} className="break-inside-avoid">
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Proportional horizontal time scale. Each tick sits at its real position between the first and last year. */
function TimeScale() {
  const [active, setActive] = useState(timeline.length - 1);
  const first = Number(timeline[0].year);
  const last = Number(timeline[timeline.length - 1].year);
  const pos = (y: string) => ((Number(y) - first) / (last - first)) * 100;
  const t = timeline[active];
  return (
    <div>
      <div className="hidden md:block relative h-28 mt-14">
        <div className="absolute left-0 right-0 top-1/2 h-[3px] bg-d6-ink" aria-hidden />
        {Array.from({ length: last - first + 1 }).map((_, k) => (
          <span key={k} aria-hidden className="absolute top-1/2 w-px h-2 bg-d6-ink" style={{ left: `${(k / (last - first)) * 100}%` }} />
        ))}
        <div role="tablist" aria-label="Milestones">
          {timeline.map((m, i) => (
            <button
              key={m.year}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls="d6-milestone"
              onClick={() => setActive(i)}
              className="group absolute top-0 -translate-x-1/2 h-full flex flex-col items-center justify-between focus-visible:outline focus-visible:outline-2 focus-visible:outline-d6-red"
              style={{ left: `${pos(m.year)}%` }}
            >
              <span className={`text-[13px] font-bold tabular-nums ${i === active ? 'text-d6-red' : 'group-hover:text-d6-red'}`}>{m.year}</span>
              <span className={`w-5 h-5 border-[3px] border-d6-ink transition-colors ${i === active ? 'bg-d6-red border-d6-red' : 'bg-white group-hover:bg-d6-ink'}`} />
              <span className="h-4" />
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={t.year}
          id="d6-milestone"
          role="tabpanel"
          className="hidden md:grid mt-10 grid-cols-12 gap-8 items-start"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.77, 0, 0.18, 1] }}
        >
          <p className="col-span-3 font-d6-sans font-extrabold text-[120px] leading-[0.8] tracking-[-0.06em] text-d6-red tabular-nums" style={wide}>
            {t.year.slice(2)}
          </p>
          <div className="col-span-5">
            <H as="h3" className="text-[40px]">
              {t.title}
            </H>
            <p className="mt-4 text-[17px] text-d6-ink/75">{t.description}</p>
            <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.14em] text-d6-mid" style={narrow}>
              Milestone {active + 1} of {timeline.length}
            </p>
          </div>
          {t.image && <Photo src={t.image.sm} alt={t.image.alt} className="col-span-4" mark={false} />}
        </motion.div>
      </AnimatePresence>
      {/* Small screens: a plain chronological table. */}
      <ol className="md:hidden mt-10 border-t-[3px] border-d6-ink">
        {timeline.map((m) => (
          <li key={m.year} className="grid grid-cols-[72px_1fr] gap-4 py-5 border-b border-d6-line">
            <span className="font-extrabold text-[22px] text-d6-red tabular-nums">{m.year}</span>
            <div>
              <h3 className="font-bold text-[18px]">{m.title}</h3>
              <p className="mt-1 text-[15px] text-d6-ink/70">{m.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function About() {
  useMeta('About', 'Profile, statements from the Chairman and Managing Director, principles, values and chronology (sample content).');
  return (
    <>
      <PageHead n="01" title={<>Profile<span className="text-d6-red">.</span></>} intro={about.storyTitle} crumbs={[{ label: 'About' }]} />

      <section className="py-16 lg:py-24">
        <Frame className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-2">
            <Label n="1.1">Story</Label>
          </div>
          <p className="lg:col-span-5 font-d6-sans font-extrabold text-[26px] sm:text-[32px] leading-[1.12] tracking-[-0.035em]" style={wide}>
            {about.story[0]}
          </p>
          <div className="lg:col-span-4 lg:col-start-9 space-y-5 text-[17px] leading-[1.6] text-d6-ink/80">
            <p>{about.story[1]}</p>
            <p>{about.story[2]}</p>
            <Sample>Sample narrative — client history to follow</Sample>
          </div>
        </Frame>
        <Frame className="mt-16">
          <Wipe>
            <Photo src="/images/drafting.jpg" alt="Engineer drafting technical drawings at a desk" imgClass="aspect-[21/8]" />
          </Wipe>
        </Frame>
      </section>

      <section className="border-t-[3px] border-d6-ink">
        <Frame>
          <Statement n="1.2" title="Statement from the Chairman" leader={chairman} paragraphs={about.chairmanMessage.paragraphs} />
          <Statement n="1.3" title="Statement from the Managing Director" leader={managingDirector} paragraphs={about.mdMessage.paragraphs} flip />
        </Frame>
      </section>

      <section className="bg-d6-ink text-white py-16 lg:py-24">
        <Frame className="grid md:grid-cols-2 gap-px bg-white/25">
          {[
            { n: '1.4', k: 'Vision', v: about.vision },
            { n: '1.5', k: 'Mission', v: about.mission },
          ].map((x) => (
            <div key={x.k} className="bg-d6-ink py-6 md:px-8 md:first:pl-0">
              <Label n={x.n} className="text-white/70">
                {x.k}
              </Label>
              <p className="mt-6 font-d6-sans font-extrabold text-[26px] sm:text-[34px] leading-[1.1] tracking-[-0.035em]" style={wide}>
                {x.v}
              </p>
            </div>
          ))}
        </Frame>
      </section>

      <section className="py-16 lg:py-24">
        <Frame>
          <Label n="1.6">Values</Label>
          <Rule className="mt-6 bg-d6-ink h-[3px]" />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((v, i) => (
              <li key={v.title} className="py-8 pr-6 border-b border-d6-line">
                <span className="text-[13px] font-bold tabular-nums text-d6-red">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-d6-sans font-extrabold text-[30px] tracking-[-0.04em]" style={wide}>
                  {v.title}
                </h3>
                <p className="mt-2 text-[15px] text-d6-ink/70 max-w-xs">{v.description}</p>
              </li>
            ))}
          </ol>
        </Frame>
      </section>

      <section className="py-16 lg:py-24 bg-d6-grey">
        <Frame className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Label n="1.7">Philosophy</Label>
            <H className="mt-6 text-[44px]">How we decide.</H>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-[19px] leading-[1.55]">
            {about.philosophy.map((p, i) => (
              <p key={p} className="grid grid-cols-[40px_1fr] gap-2">
                <span className="text-d6-red font-bold tabular-nums">{String.fromCharCode(97 + i)}.</span>
                {p}
              </p>
            ))}
            <div className="pt-6 border-t-[3px] border-d6-ink">
              <Label n="1.8">Why we exist</Label>
              <p className="mt-4 text-d6-ink/80">{about.whyWeExist}</p>
            </div>
          </div>
        </Frame>
      </section>

      <section id="chronology" className="py-16 lg:py-24 scroll-mt-16">
        <Frame>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Label n="1.9">Chronology</Label>
              <H className="mt-6 text-[44px] sm:text-[64px]">
                {timeline[0].year}–{timeline[timeline.length - 1].year}
              </H>
            </div>
            <Sample>All dates are illustrative placeholders</Sample>
          </div>
          <TimeScale />
          <div className="mt-16">
            <Go to={P.leadership} tone="ink" className="min-w-[240px]">
              Leadership
            </Go>
          </div>
        </Frame>
      </section>
    </>
  );
}
