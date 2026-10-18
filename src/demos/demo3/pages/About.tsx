import { about, coreValues, timeline } from '../../../data/about';
import { chairman, managingDirector } from '../../../data/leadership';
import { Fade, Figure, Kicker, Note, Opening, Ornament, Page, ROMAN, Serif, useMeta } from '../ui';

const questions = [
  'What gives the group its strength?',
  'Where will you focus in the years ahead?',
  'Who would you like to hear from?',
];

export default function About() {
  useMeta('The Group', 'Our story, a letter from the Chairman, an interview with the Managing Director, values and chronology (sample content).');
  return (
    <>
      <Opening chapter="Chapter I · The Group" title={<>An enterprise of <em>character</em></>} deck="Our story, our principles and the people who steward them." crumbs={[{ label: 'The Group' }]} />

      <Page>
        <Figure src="/images/office-corridor.jpg" alt="Quiet, minimal office corridor" caption="The group’s offices (representative photography)" imgClass="aspect-[21/9]" />
      </Page>

      {/* Story */}
      <section className="py-24 lg:py-32">
        <Page className="grid lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-3">
            <Kicker>Our Story</Kicker>
            <Note>Sample narrative — to be replaced with the client’s history.</Note>
          </aside>
          <div className="lg:col-span-6 text-[19px] leading-[1.85] text-d3-ink/85 space-y-6">
            <p className="font-d3-serif text-[26px] leading-[1.5] text-d3-ink first-letter:float-left first-letter:text-[96px] first-letter:leading-[0.78] first-letter:mr-3 first-letter:mt-2 first-letter:text-d3-oxblood first-letter:font-light">{about.story[0]}</p>
            <p>{about.story[1]}</p>
            <p>{about.story[2]}</p>
          </div>
          <aside className="lg:col-span-3 lg:pt-40">
            <blockquote className="border-t border-d3-oxblood pt-5 font-d3-serif italic text-[24px] leading-[1.3] text-d3-oxblood">“We think in decades, not quarters.”</blockquote>
          </aside>
        </Page>
      </section>

      {/* Letters */}
      <section id="letters" className="scroll-mt-20 bg-d3-cream border-y border-d3-rule py-24 lg:py-32">
        <Page className="max-w-3xl">
          <div className="text-center">
            <Kicker>A Letter from the Chairman</Kicker>
          </div>
          <Fade className="mt-12 bg-d3-paper border border-d3-rule p-8 sm:p-16 shadow-[0_30px_60px_-40px_rgba(28,26,23,0.4)]">
            <p className="font-d3-serif italic text-[20px]">Dear friends and partners,</p>
            <div className="mt-6 space-y-5 font-d3-serif text-[19px] leading-[1.75] text-d3-ink/85">
              {about.chairmanMessage.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-10 font-d3-serif italic text-[18px]">With sincere regards,</p>
            <p className="mt-2 font-d3-serif italic text-[40px] text-d3-oxblood leading-none">{chairman.name}</p>
            <p className="mt-2 font-d3-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-d3-taupe">{chairman.role} · fictional placeholder</p>
          </Fade>
        </Page>

        <Page className="mt-28 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Kicker>In Conversation</Kicker>
            <Serif className="mt-5 text-[40px] sm:text-[52px]">
              The Managing Director on <em>discipline and direction</em>
            </Serif>
            <Figure src={managingDirector.portrait} alt={`${managingDirector.name} (placeholder portrait)`} caption={`${managingDirector.name}, ${managingDirector.role} — fictional placeholder`} className="mt-10 max-w-[320px]" imgClass="aspect-[4/5]" />
          </div>
          <dl className="lg:col-span-8 lg:pt-6 space-y-12">
            {about.mdMessage.paragraphs.map((p, i) => (
              <Fade key={p} delay={i * 0.08}>
                <dt className="font-d3-sans text-[13px] font-semibold uppercase tracking-[0.16em] text-d3-oxblood">{questions[i]}</dt>
                <dd className="mt-3 font-d3-serif text-[24px] sm:text-[26px] leading-[1.5] font-light">{p}</dd>
              </Fade>
            ))}
          </dl>
        </Page>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 lg:py-32">
        <Page className="max-w-5xl text-center space-y-20">
          <Fade>
            <Kicker>Vision</Kicker>
            <p className="mt-6 font-d3-serif font-light text-[30px] sm:text-[44px] leading-[1.25]">{about.vision}</p>
          </Fade>
          <Ornament />
          <Fade>
            <Kicker>Mission</Kicker>
            <p className="mt-6 font-d3-serif font-light italic text-[30px] sm:text-[44px] leading-[1.25]">{about.mission}</p>
          </Fade>
        </Page>
      </section>

      {/* Values */}
      <section className="bg-d3-ink text-d3-paper py-24 lg:py-32">
        <Page>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <Kicker className="!text-[#c48b7d]">Core Values</Kicker>
              <h2 className="mt-5 font-d3-serif font-light text-[44px] sm:text-[56px] leading-[1.05]">
                Six principles, <em>held in common</em>.
              </h2>
            </div>
            <ol className="lg:col-span-8 grid sm:grid-cols-2 gap-x-12">
              {coreValues.map((v, i) => (
                <li key={v.title} className="border-t border-d3-paper/20 py-7">
                  <p className="font-d3-serif italic text-[#c48b7d]">{ROMAN[i]}.</p>
                  <h3 className="mt-2 font-d3-serif font-light text-[32px]">{v.title}</h3>
                  <p className="mt-2 text-d3-paper/65">{v.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </Page>
      </section>

      {/* Philosophy */}
      <section className="py-24 lg:py-32">
        <Page className="grid lg:grid-cols-2 gap-16 items-center">
          <Figure src="/images/blueprint.jpg" alt="Hands reviewing architectural plans on a desk" caption="Considered decisions, made with care" imgClass="aspect-[4/5]" />
          <div>
            <Kicker>Corporate Philosophy</Kicker>
            <div className="mt-6 space-y-5 font-d3-serif text-[22px] leading-[1.6]">
              {about.philosophy.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-14 border-l-2 border-d3-oxblood pl-6">
              <Kicker>Why We Exist</Kicker>
              <p className="mt-4 text-[18px] leading-[1.8] text-d3-ink/80">{about.whyWeExist}</p>
            </div>
          </div>
        </Page>
      </section>

      {/* Chapters timeline */}
      <section id="chapters" className="scroll-mt-20 bg-d3-cream border-t border-d3-rule py-24 lg:py-32">
        <Page>
          <div className="text-center">
            <Kicker>Chronology</Kicker>
            <Serif className="mt-5 text-[48px] sm:text-[72px]">
              Chapters of <em>our history</em>
            </Serif>
            <div className="mt-4">
              <Note>All dates and milestones are illustrative placeholders.</Note>
            </div>
          </div>
          <ol className="mt-20">
            {timeline.map((t, i) => (
              <li key={t.year} className="grid md:grid-cols-12 gap-6 md:gap-10 py-12 border-t border-d3-rule items-start">
                <p className="md:col-span-3 font-d3-serif font-light text-[72px] sm:text-[96px] leading-none text-d3-ink/85">{t.year}</p>
                <div className="md:col-span-5 md:pt-4">
                  <p className="font-d3-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-d3-oxblood">Chapter {ROMAN[i]}</p>
                  <h3 className="mt-2 font-d3-serif text-[30px] leading-tight">{t.title}</h3>
                  <p className="mt-3 text-d3-taupe">{t.description}</p>
                </div>
                {t.image && <Figure src={t.image.sm} alt={t.image.alt} className={`md:col-span-4 ${i % 2 ? 'md:col-start-9' : ''}`} imgClass={i % 2 ? 'aspect-[4/3]' : 'aspect-[3/2] grayscale'} />}
              </li>
            ))}
          </ol>
        </Page>
      </section>
    </>
  );
}
