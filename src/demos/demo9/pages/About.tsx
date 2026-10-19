import { about, coreValues, timeline } from '../../../data/about';
import { chairman, managingDirector } from '../../../data/leadership';
import type { Leader } from '../../../types';
import { Cue, Dolly, Fade, Go, P, ROMAN, Sample, ScrollWords, Stage, Title, TitleCard, useMeta } from '../ui';

function Letter({ leader, heading, paragraphs, align }: { leader: Leader; heading: string; paragraphs: string[]; align: 'left' | 'right' }) {
  return (
    <section className="grid lg:grid-cols-2 border-t border-d9-graphite">
      <div className={align === 'right' ? 'lg:order-2' : ''}>
        <Dolly src={leader.portrait} alt={`${leader.name} (placeholder portrait)`} imgClass="aspect-[4/5] lg:aspect-auto lg:h-full grayscale" className="h-full" />
      </div>
      <div className="px-6 sm:px-14 lg:px-20 py-20 lg:py-28 flex flex-col justify-center">
        <Cue>{heading}</Cue>
        <Fade>
          <Title as="p" className="mt-8 text-[34px] sm:text-[46px] leading-[1.1] italic">
            “{leader.quote}”
          </Title>
        </Fade>
        <div className="mt-10 space-y-5 font-d9-sans font-light text-[17px] leading-[1.8] text-d9-ash max-w-xl">
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <p className="mt-10 font-d9-serif italic text-[28px]">{leader.name}</p>
        <Cue className="mt-1">{leader.role} · fictional placeholder</Cue>
      </div>
    </section>
  );
}

export default function About() {
  useMeta('The Group', 'Our story, letters from the Chairman and Managing Director, vision, mission, values and chronology (sample content).');
  return (
    <>
      <TitleCard scene="I" title="The Group" intro={about.storyTitle + '.'} image="/images/office-corridor.jpg" crumbs={[{ label: 'The Group' }]} />

      <section className="py-28 lg:py-40">
        <Stage className="max-w-[1000px] text-center">
          <ScrollWords text={about.story[0]} className="font-d9-serif text-[30px] sm:text-[44px] leading-[1.18]" />
          <div className="mt-14 grid md:grid-cols-2 gap-10 text-left font-d9-sans font-light text-[17px] leading-[1.8] text-d9-ash">
            <p>{about.story[1]}</p>
            <p>{about.story[2]}</p>
          </div>
          <div className="mt-10">
            <Sample>Narrative is a placeholder for the client’s history</Sample>
          </div>
        </Stage>
      </section>

      <Letter leader={chairman} heading="A letter from the Chairman" paragraphs={about.chairmanMessage.paragraphs} align="left" />
      <Letter leader={managingDirector} heading="A letter from the Managing Director" paragraphs={about.mdMessage.paragraphs} align="right" />

      <section className="py-28 lg:py-36 border-t border-d9-graphite">
        <Stage className="grid md:grid-cols-2 gap-16">
          {[
            { k: 'Vision', v: about.vision },
            { k: 'Mission', v: about.mission },
          ].map((x, i) => (
            <Fade key={x.k} delay={i * 0.15}>
              <Cue>{x.k}</Cue>
              <Title as="p" className={`mt-6 text-[30px] sm:text-[40px] leading-[1.15] ${i ? 'italic' : ''}`}>
                {x.v}
              </Title>
            </Fade>
          ))}
        </Stage>
      </section>

      <section className="py-24 lg:py-32 bg-d9-carbon">
        <Stage>
          <Cue className="text-center">Values</Cue>
          <ol className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-d9-graphite">
            {coreValues.map((v, i) => (
              <li key={v.title} className="bg-d9-carbon p-8 sm:p-10 group">
                <span className="font-d9-sans text-[11px] tracking-[0.36em] text-d9-smoke">{ROMAN[i]}</span>
                <h3 className="mt-6 font-d9-serif text-[36px] leading-none group-hover:italic transition-all">{v.title}</h3>
                <p className="mt-4 font-d9-sans font-light text-d9-ash">{v.description}</p>
              </li>
            ))}
          </ol>
        </Stage>
      </section>

      <section className="py-28 lg:py-36">
        <Stage className="grid lg:grid-cols-2 gap-16 items-center">
          <Dolly src="/images/boardtable.jpg" alt="An empty boardroom table" imgClass="aspect-[4/5]" />
          <div>
            <Cue>Philosophy</Cue>
            <div className="mt-8 space-y-8">
              {about.philosophy.map((p) => (
                <Title key={p} as="p" className="text-[26px] sm:text-[32px] leading-[1.2]">
                  {p}
                </Title>
              ))}
            </div>
            <div className="mt-14 pt-8 border-t border-d9-graphite">
              <Cue>Why we exist</Cue>
              <p className="mt-4 font-d9-sans font-light text-[17px] leading-[1.8] text-d9-ash">{about.whyWeExist}</p>
            </div>
          </div>
        </Stage>
      </section>

      <section id="chronology" className="py-24 lg:py-32 border-t border-d9-graphite scroll-mt-24">
        <Stage>
          <div className="text-center">
            <Cue>Chronology</Cue>
            <Title className="mt-4 text-[48px] sm:text-[80px]">
              In <em>sequence</em>
            </Title>
            <div className="mt-4">
              <Sample>All dates and milestones are illustrative placeholders</Sample>
            </div>
          </div>
          <ol className="mt-20">
            {timeline.map((t, i) => (
              <li key={t.year}>
                <Fade>
                  <div className="group grid md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr_280px] gap-6 md:gap-12 items-center py-10 border-t border-d9-graphite">
                    <p className="font-d9-serif italic text-[64px] sm:text-[80px] leading-none text-d9-smoke group-hover:text-d9-bone transition-colors">{t.year}</p>
                    <div>
                      <Cue>Scene {ROMAN[i]}</Cue>
                      <h3 className="mt-3 font-d9-serif text-[30px]">{t.title}</h3>
                      <p className="mt-2 font-d9-sans font-light text-d9-ash">{t.description}</p>
                    </div>
                    {t.image && <img src={t.image.sm} alt={t.image.alt} className="hidden lg:block w-full aspect-[16/10] object-cover grayscale group-hover:grayscale-0 transition duration-700" loading="lazy" />}
                  </div>
                </Fade>
              </li>
            ))}
          </ol>
          <div className="mt-16 text-center">
            <Go to={P.leadership}>Meet the leadership</Go>
          </div>
        </Stage>
      </section>
    </>
  );
}
