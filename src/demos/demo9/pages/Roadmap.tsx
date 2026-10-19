import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { roadmap, strategicPillars } from '../../../data/roadmap';
import { Cue, Fade, Go, P, ROMAN, Sample, Stage, Title, TitleCard, useMeta } from '../ui';

/** A thin progress line that fills as the reader scrolls through the three acts. */
function Acts() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div ref={ref} className="relative">
      <div className="absolute left-0 md:left-[220px] top-0 bottom-0 w-px bg-d9-graphite" aria-hidden>
        <motion.div className="w-px h-full bg-d9-bone origin-top" style={{ scaleY }} />
      </div>
      {roadmap.map((r, i) => (
        <section key={r.id} id={r.id} aria-labelledby={`d9-act-${r.id}`} className="relative grid md:grid-cols-[220px_1fr] gap-8 md:gap-16 pl-8 md:pl-0 py-20 scroll-mt-28">
          <div className="md:pr-10 md:text-right">
            <Cue>Act {ROMAN[i]}</Cue>
            <p className="mt-3 font-d9-serif italic text-[30px]">{r.horizon}</p>
            <p className="mt-1 font-d9-sans text-[12px] uppercase tracking-[0.3em] text-d9-smoke">{r.label}</p>
          </div>
          <div className="md:pl-16">
            <Fade>
              <Title as="h2" id={`d9-act-${r.id}`} className="text-[40px] sm:text-[64px]">
                {r.title}
              </Title>
            </Fade>
            <p className="mt-6 max-w-2xl font-d9-sans font-light text-[18px] leading-[1.8] text-d9-ash">{r.summary}</p>
            <ol className="mt-12 grid sm:grid-cols-2 gap-px bg-d9-graphite">
              {r.initiatives.map((it, k) => (
                <li key={it.title} className="bg-d9-black p-7">
                  <Cue>
                    {ROMAN[k]} · {it.type}
                  </Cue>
                  <h3 className="mt-4 font-d9-serif text-[26px] leading-tight">{it.title}</h3>
                  <p className="mt-2 font-d9-sans font-light text-d9-smoke">{it.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}
    </div>
  );
}

export default function Roadmap() {
  useMeta('Horizon', 'An illustrative roadmap in three acts, 2026 to 2035 (sample content, not an official commitment).');
  return (
    <>
      <TitleCard scene="IV" title="The Horizon" intro="Three acts, from strengthening the foundation to an enduring, future-ready group." image="/images/skyline-construction.jpg" crumbs={[{ label: 'Horizon' }]} />
      <section className="py-16 lg:py-24">
        <Stage>
          <div className="text-center">
            <Sample>Illustrative only — not an official commitment</Sample>
          </div>
          <Acts />
        </Stage>
      </section>
      <section className="py-24 lg:py-32 bg-d9-carbon">
        <Stage>
          <Cue className="text-center">Four pillars</Cue>
          <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {strategicPillars.map((s, i) => (
              <li key={s.title} className="text-center">
                <span className="font-d9-serif italic text-[64px] text-d9-smoke">{ROMAN[i]}</span>
                <h3 className="mt-4 font-d9-serif text-[26px]">{s.title}</h3>
                <p className="mt-3 font-d9-sans font-light text-d9-ash">{s.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-16 text-center">
            <Go to={P.partner}>Shape it with us</Go>
          </div>
        </Stage>
      </section>
    </>
  );
}
