import { about, coreValues, timeline } from '../../../data/about';
import { chairman, managingDirector } from '../../../data/leadership';
import { ICONS } from '../../../lib/icons';
import { ButtonLink, Container, Eyebrow, Heading, P, PageBanner, Reveal, SampleTag, useMeta } from '../ui';

const sections = [
  ['story', 'Our Story'],
  ['messages', 'Leadership Messages'],
  ['vision', 'Vision & Mission'],
  ['values', 'Core Values'],
  ['philosophy', 'Philosophy'],
  ['timeline', 'Timeline'],
];

export default function About() {
  useMeta('About Us', 'Our story, leadership messages, vision, mission, values and history of the group (sample content).');
  return (
    <>
      <PageBanner title="About the Group" intro="A family of specialised enterprises, built patiently and governed by shared values." image="/images/towers-up.jpg" crumbs={[{ label: 'About Us' }]} />

      <nav aria-label="On this page" className="sticky top-[76px] lg:top-[88px] z-30 bg-white border-b border-d1-stone">
        <Container>
          <ul className="flex gap-8 overflow-x-auto no-scrollbar text-[13px] font-semibold uppercase tracking-[0.14em]">
            {sections.map(([id, label]) => (
              <li key={id} className="shrink-0">
                <a href={`#${id}`} className="block py-4 text-d1-muted hover:text-d1-navy border-b-2 border-transparent hover:border-d1-gold">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {/* Story */}
      <section id="story" className="scroll-mt-40 py-24 lg:py-28">
        <Container className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <Reveal>
            <Eyebrow>Our Story</Eyebrow>
            <Heading className="mt-6 text-[40px] sm:text-[54px]">{about.storyTitle}</Heading>
            <div className="mt-6">
              <SampleTag />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-[18px] leading-[1.8] text-d1-ink/85">
            {about.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="pt-4 grid grid-cols-2 gap-4">
              <img src="/images/drafting.jpg" alt="Engineer drafting technical drawings" className="w-full aspect-[4/3] object-cover" loading="lazy" />
              <img src="/images/plant-pipes.jpg" alt="Industrial plant equipment" className="w-full aspect-[4/3] object-cover mt-10" loading="lazy" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Messages */}
      <section id="messages" className="scroll-mt-40 bg-white border-y border-d1-stone">
        <Container className="py-24 lg:py-28 grid lg:grid-cols-[380px_1fr] gap-14 lg:gap-20">
          <Reveal>
            <figure>
              <img src={chairman.portrait} alt={`${chairman.name}, ${chairman.role} (placeholder portrait)`} className="w-full aspect-[4/5] object-cover" loading="lazy" />
              <figcaption className="mt-5 border-l-2 border-d1-gold pl-4">
                <span className="block font-d1-serif text-[24px] font-semibold text-d1-navy">{chairman.name}</span>
                <span className="block text-[13px] uppercase tracking-[0.16em] text-d1-muted">{chairman.role} · Sample profile</span>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>{about.chairmanMessage.title}</Eyebrow>
            <p className="mt-8 font-d1-serif text-[30px] sm:text-[36px] leading-[1.25] text-d1-navy font-medium">“{chairman.quote}”</p>
            <div className="mt-8 space-y-5 text-[18px] leading-[1.8] text-d1-ink/85 max-w-[68ch]">
              {about.chairmanMessage.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-10 font-d1-serif italic text-[30px] text-d1-gold">{chairman.name}</p>
          </Reveal>
        </Container>

        <div className="bg-d1-ivory border-t border-d1-stone">
          <Container className="py-24 lg:py-28 grid lg:grid-cols-[1fr_380px] gap-14 lg:gap-20">
            <Reveal className="order-2 lg:order-1">
              <Eyebrow>{about.mdMessage.title}</Eyebrow>
              <Heading as="h3" className="mt-6 text-[34px] sm:text-[42px] max-w-2xl">Discipline in execution, ambition in direction.</Heading>
              <div className="mt-8 grid md:grid-cols-2 gap-8 text-[17px] leading-[1.8] text-d1-ink/85">
                {about.mdMessage.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-10 border-t border-d1-stone pt-6 flex items-center gap-4">
                <span className="font-d1-serif text-[22px] text-d1-navy font-semibold">{managingDirector.name}</span>
                <span className="text-[13px] uppercase tracking-[0.16em] text-d1-muted">{managingDirector.role} · Sample profile</span>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="order-1 lg:order-2">
              <div className="relative">
                <img src={managingDirector.portrait} alt={`${managingDirector.name}, ${managingDirector.role} (placeholder portrait)`} className="w-full aspect-[4/5] object-cover" loading="lazy" />
                <div className="absolute -bottom-5 -left-5 w-24 h-24 border-l-2 border-b-2 border-d1-gold" aria-hidden />
              </div>
            </Reveal>
          </Container>
        </div>
      </section>

      {/* Vision & mission */}
      <section id="vision" className="scroll-mt-40 bg-d1-navy text-white py-24 lg:py-28">
        <Container>
          <div className="grid md:grid-cols-2 gap-px bg-white/15 border border-white/15">
            {[
              ['Vision', about.vision],
              ['Mission', about.mission],
            ].map(([t, d]) => (
              <Reveal key={t} className="bg-d1-navy p-10 sm:p-14 h-full">
                <Eyebrow light>Our {t}</Eyebrow>
                <p className="mt-8 font-d1-serif text-[26px] sm:text-[32px] leading-[1.3]">{d}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16 max-w-3xl">
            <Eyebrow light>Why We Exist</Eyebrow>
            <p className="mt-6 text-[20px] leading-[1.7] text-white/80">{about.whyWeExist}</p>
          </Reveal>
        </Container>
      </section>

      {/* Values */}
      <section id="values" className="scroll-mt-40 py-24 lg:py-28">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Core Values</Eyebrow>
            <Heading className="mt-5 text-[40px] sm:text-[50px]">The principles behind every decision.</Heading>
          </div>
          <ul className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((v, i) => {
              const Icon = ICONS[v.icon];
              return (
                <li key={v.title}>
                  <Reveal delay={(i % 3) * 0.08} className="h-full bg-white border border-d1-stone p-9 hover:border-d1-gold transition-colors">
                    <div className="flex items-center justify-between">
                      <Icon size={30} strokeWidth={1.3} className="text-d1-gold" aria-hidden />
                      <span className="font-d1-serif text-[20px] text-d1-stone">0{i + 1}</span>
                    </div>
                    <h3 className="mt-6 font-d1-serif text-[26px] font-semibold text-d1-navy">{v.title}</h3>
                    <p className="mt-2 text-d1-muted leading-relaxed">{v.description}</p>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="scroll-mt-40 bg-white border-y border-d1-stone py-24 lg:py-28">
        <Container className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <img src="/images/office-window.jpg" alt="Calm office workspace with plants and city view" className="w-full aspect-[5/4] object-cover" loading="lazy" />
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>Corporate Philosophy</Eyebrow>
            <Heading className="mt-6 text-[38px] sm:text-[46px]">Patient capital. Empowered companies.</Heading>
            <div className="mt-8 space-y-5 text-[18px] leading-[1.8] text-d1-ink/85">
              {about.philosophy.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Timeline */}
      <section id="timeline" className="scroll-mt-40 py-24 lg:py-32">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex justify-center">
              <Eyebrow>Company Timeline</Eyebrow>
            </div>
            <Heading className="mt-5 text-[40px] sm:text-[50px]">Milestones along the way</Heading>
            <p className="mt-4 text-d1-muted">Illustrative dates and milestones — to be replaced with verified company history.</p>
          </div>
          <ol className="relative mt-20">
            <span className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-d1-stone" aria-hidden />
            {timeline.map((t, i) => {
              const left = i % 2 === 0;
              return (
                <li key={t.year} className="relative grid md:grid-cols-2 gap-6 md:gap-20 pb-16 last:pb-0">
                  <span className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 w-4 h-4 rotate-45 bg-d1-ivory border-2 border-d1-gold" aria-hidden />
                  <Reveal className={`pl-12 md:pl-0 ${left ? 'md:text-right md:pr-4' : 'md:col-start-2 md:pl-4'}`}>
                    <p className="font-d1-serif text-[52px] leading-none font-semibold text-d1-gold">{t.year}</p>
                    <h3 className="mt-3 font-d1-serif text-[26px] font-semibold text-d1-navy">{t.title}</h3>
                    <p className="mt-2 text-d1-muted leading-relaxed">{t.description}</p>
                  </Reveal>
                  {t.image && (
                    <Reveal delay={0.1} className={`pl-12 md:pl-0 ${left ? 'md:col-start-2 md:row-start-1 md:pl-4' : 'md:col-start-1 md:row-start-1 md:pr-4'}`}>
                      <img src={t.image.sm} alt={t.image.alt} className={`w-full max-w-[420px] aspect-[16/10] object-cover ${left ? '' : 'md:ml-auto'}`} loading="lazy" />
                    </Reveal>
                  )}
                </li>
              );
            })}
          </ol>
          <div className="mt-20 text-center">
            <ButtonLink to={P.roadmap} variant="outline">
              See our future roadmap
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
