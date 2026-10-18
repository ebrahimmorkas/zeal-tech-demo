import { advisors, chairman, directors, managingDirector } from '../../../data/leadership';
import type { Leader } from '../../../types';
import { Container, Eyebrow, Heading, PageBanner, Reveal, SampleTag, useMeta } from '../ui';

function Principal({ l, reverse }: { l: Leader; reverse?: boolean }) {
  return (
    <Reveal className="grid md:grid-cols-[1fr_1.3fr] bg-white border border-d1-stone">
      <img src={l.portrait} alt={`${l.name}, ${l.role} (placeholder portrait)`} className={`w-full h-full min-h-[360px] object-cover object-top ${reverse ? 'md:order-2' : ''}`} loading="lazy" />
      <div className="p-8 sm:p-12 flex flex-col justify-center">
        <p className="text-[12px] uppercase tracking-[0.2em] font-semibold text-d1-gold">{l.role}</p>
        <h2 className="mt-3 font-d1-serif text-[38px] font-semibold text-d1-navy leading-tight">{l.name}</h2>
        {l.quote && <p className="mt-5 font-d1-serif italic text-[22px] text-d1-ink/80 leading-snug border-l-2 border-d1-gold pl-5">“{l.quote}”</p>}
        <p className="mt-6 text-d1-muted leading-relaxed">{l.bio}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Areas of expertise">
          {l.expertise.map((e) => (
            <li key={e} className="text-[12px] uppercase tracking-[0.12em] px-3 py-1.5 bg-d1-ivory text-d1-navy">
              {e}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

function Member({ l }: { l: Leader }) {
  return (
    <article className="group bg-white border border-d1-stone h-full flex flex-col">
      <div className="overflow-hidden">
        <img src={l.portrait} alt={`${l.name} (placeholder portrait)`} className="w-full aspect-[4/5] object-cover object-top grayscale group-hover:grayscale-0 transition duration-500" loading="lazy" />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-d1-serif text-[24px] font-semibold text-d1-navy leading-tight">{l.name}</h3>
        <p className="mt-1 text-[13px] uppercase tracking-[0.12em] text-d1-gold font-semibold">{l.role}</p>
        <p className="mt-4 text-[15px] text-d1-muted leading-relaxed flex-1">{l.bio}</p>
        <p className="mt-4 pt-4 border-t border-d1-stone text-[13px] text-d1-ink/70">
          <span className="font-semibold text-d1-navy">Expertise: </span>
          {l.expertise.join(' · ')}
        </p>
      </div>
    </article>
  );
}

export default function Leadership() {
  useMeta('Leadership', 'The board of directors and advisors of the group (fictional placeholder profiles).');
  return (
    <>
      <PageBanner title="Leadership" intro="Experienced leadership providing governance, direction and stewardship across the group." image="/images/boardtable.jpg" crumbs={[{ label: 'Leadership' }]} />
      <div className="bg-white border-b border-d1-stone">
        <Container className="py-4 flex flex-wrap items-center gap-3 text-[14px] text-d1-muted">
          <SampleTag>Placeholder profiles</SampleTag>
          The individuals shown are fictional and do not represent the client’s leadership.
        </Container>
      </div>
      <section className="py-20 lg:py-28 space-y-10">
        <Container className="space-y-10">
          <Principal l={chairman} />
          <Principal l={managingDirector} reverse />
        </Container>
      </section>
      <section className="pb-24">
        <Container>
          <Eyebrow>Board of Directors</Eyebrow>
          <Heading className="mt-5 text-[40px]">Directors</Heading>
          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {directors.map((l) => (
              <li key={l.id}>
                <Member l={l} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section className="py-20 lg:py-24 bg-white border-t border-d1-stone">
        <Container>
          <Eyebrow>Advisory Council</Eyebrow>
          <Heading className="mt-5 text-[40px]">Advisors</Heading>
          <ul className="mt-10 grid md:grid-cols-2 gap-8">
            {advisors.map((l) => (
              <li key={l.id} className="flex gap-6 items-start border-t-2 border-d1-gold pt-6">
                <img src={l.portrait} alt={`${l.name} (placeholder portrait)`} className="w-28 h-36 object-cover object-top shrink-0" loading="lazy" />
                <div>
                  <h3 className="font-d1-serif text-[26px] font-semibold text-d1-navy">{l.name}</h3>
                  <p className="text-[13px] uppercase tracking-[0.12em] text-d1-gold font-semibold">{l.role}</p>
                  <p className="mt-3 text-d1-muted leading-relaxed">{l.bio}</p>
                  <p className="mt-3 text-[14px] text-d1-ink/70">{l.expertise.join(' · ')}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
