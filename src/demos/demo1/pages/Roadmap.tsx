import { roadmap, strategicPillars } from '../../../data/roadmap';
import { ButtonLink, Container, Eyebrow, Heading, P, PageBanner, Reveal, SampleTag, useMeta } from '../ui';

export default function Roadmap() {
  useMeta('Future Roadmap', 'The group’s illustrative strategic roadmap across short, medium and long-term horizons.');
  return (
    <>
      <PageBanner title="Future Roadmap" intro="Our strategic direction across three horizons — focused, disciplined and long term." image="/images/wind-sunset.jpg" crumbs={[{ label: 'Future Roadmap' }]} />

      <div className="bg-d1-gold/10 border-b border-d1-gold/30">
        <Container className="py-4 text-[14px] text-d1-ink/80 flex flex-wrap items-center gap-3">
          <SampleTag>Illustrative</SampleTag>
          All milestones are sample content for design review and do not represent official commitments.
        </Container>
      </div>

      <section className="py-20 lg:py-28">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Strategic pillars</Eyebrow>
            <Heading className="mt-5 text-[40px] sm:text-[48px]">Four priorities guide our plans.</Heading>
          </div>
          <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-d1-stone border border-d1-stone">
            {strategicPillars.map((p, i) => (
              <li key={p.title} className="bg-white p-8">
                <span className="font-d1-serif text-[40px] leading-none text-d1-gold">{i + 1}</span>
                <h3 className="mt-4 font-d1-serif text-[24px] font-semibold text-d1-navy">{p.title}</h3>
                <p className="mt-2 text-[15px] text-d1-muted leading-relaxed">{p.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="pb-24 lg:pb-32">
        <Container>
          <ol className="relative grid lg:grid-cols-3 gap-10 lg:gap-0">
            <span className="hidden lg:block absolute top-[34px] left-0 right-0 h-px bg-d1-gold/50" aria-hidden />
            {roadmap.map((phase, i) => (
              <li key={phase.id} className="relative lg:px-8 first:lg:pl-0 last:lg:pr-0">
                <Reveal delay={i * 0.12}>
                  <div className="flex items-center gap-4">
                    <span className="relative z-10 grid place-items-center w-[68px] h-[68px] rounded-full bg-d1-navy text-white font-d1-serif text-[22px] ring-8 ring-d1-ivory">{i + 1}</span>
                    <div>
                      <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-d1-gold">{phase.label}</p>
                      <p className="font-d1-serif text-[22px] text-d1-navy">{phase.horizon}</p>
                    </div>
                  </div>
                  <h2 className="mt-8 font-d1-serif text-[32px] font-semibold text-d1-navy leading-tight">{phase.title}</h2>
                  <p className="mt-3 text-d1-muted leading-relaxed">{phase.summary}</p>
                  <ul className="mt-8 space-y-4">
                    {phase.initiatives.map((it) => (
                      <li key={it.title} className="bg-white border border-d1-stone p-6 border-l-2 border-l-d1-gold">
                        <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-d1-gold">{it.type}</p>
                        <h3 className="mt-2 font-d1-serif text-[21px] font-semibold text-d1-navy">{it.title}</h3>
                        <p className="mt-1.5 text-[15px] text-d1-muted leading-relaxed">{it.description}</p>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20 bg-d1-navy text-white">
        <Container className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <Heading light className="text-[34px] sm:text-[42px] max-w-2xl">
            Shape the next chapter with us.
          </Heading>
          <ButtonLink to={P.partner} variant="gold">
            Explore partnerships
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
