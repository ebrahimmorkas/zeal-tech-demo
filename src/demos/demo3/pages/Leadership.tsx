import { advisors, chairman, directors, managingDirector } from '../../../data/leadership';
import { Fade, Figure, Kicker, Note, Opening, Ornament, Page, Serif, useMeta } from '../ui';

export default function Leadership() {
  useMeta('Leadership', 'The stewards of the group — chairman, managing director, directors and advisors (fictional placeholder profiles).');
  return (
    <>
      <Opening chapter="Chapter III · Leadership" title={<>The <em>stewards</em></>} deck="Those entrusted with the group’s direction and its reputation." crumbs={[{ label: 'Leadership' }]} />
      <div className="text-center -mt-6 mb-10">
        <Note>All profiles are fictional placeholders and do not represent the client.</Note>
      </div>

      {[chairman, managingDirector].map((l, i) => (
        <section key={l.id} className={`py-20 lg:py-28 ${i ? 'bg-d3-cream border-y border-d3-rule' : ''}`}>
          <Page className="grid lg:grid-cols-12 gap-12 items-center">
            <Fade className={`lg:col-span-5 ${i ? 'lg:order-2 lg:col-start-8' : ''}`}>
              <Figure src={l.portrait} alt={`${l.name}, ${l.role} (placeholder portrait)`} caption={`${l.name} — photographed for the sample edition`} imgClass="aspect-[4/5] object-top" />
            </Fade>
            <Fade delay={0.1} className={`lg:col-span-6 ${i ? 'lg:order-1' : 'lg:col-start-7'}`}>
              <Kicker>{l.role}</Kicker>
              <Serif className="mt-4 text-[48px] sm:text-[68px]">{l.name}</Serif>
              {l.quote && <p className="mt-8 font-d3-serif italic text-[28px] leading-[1.35] text-d3-oxblood">“{l.quote}”</p>}
              <p className="mt-8 text-[18px] leading-[1.8] text-d3-ink/80">{l.bio}</p>
              <p className="mt-6 font-d3-serif italic text-d3-taupe">Expertise — {l.expertise.join(', ')}</p>
            </Fade>
          </Page>
        </section>
      ))}

      <section className="py-24 lg:py-32">
        <Page>
          <div className="text-center">
            <Kicker>The Board</Kicker>
            <Serif className="mt-5 text-[44px] sm:text-[60px]">Directors</Serif>
          </div>
          <ul className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
            {directors.map((l, i) => (
              <li key={l.id} className={i % 2 ? 'lg:mt-16' : ''}>
                <Fade delay={i * 0.06}>
                  <img src={l.portrait} alt={`${l.name} (placeholder portrait)`} className="w-full aspect-[3/4] object-cover object-top grayscale hover:grayscale-0 transition duration-700" loading="lazy" />
                  <h3 className="mt-5 font-d3-serif text-[26px] leading-tight">{l.name}</h3>
                  <p className="font-d3-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-d3-oxblood mt-1">{l.role.replace('Director — ', '')}</p>
                  <p className="mt-3 text-[15px] text-d3-taupe leading-relaxed">{l.bio}</p>
                  <p className="mt-3 font-d3-serif italic text-[14px]">{l.expertise.join(' · ')}</p>
                </Fade>
              </li>
            ))}
          </ul>
        </Page>
      </section>

      <section className="bg-d3-ink text-d3-paper py-24">
        <Page>
          <div className="text-center">
            <Kicker className="!text-[#c48b7d]">Counsel</Kicker>
            <h2 className="mt-5 font-d3-serif font-light text-[44px] sm:text-[56px]">Advisors</h2>
          </div>
          <ul className="mt-16 grid md:grid-cols-2 gap-14 max-w-5xl mx-auto">
            {advisors.map((l) => (
              <li key={l.id} className="grid grid-cols-[120px_1fr] gap-6 items-start">
                <img src={l.portrait} alt={`${l.name} (placeholder portrait)`} className="w-full aspect-[3/4] object-cover object-top grayscale" loading="lazy" />
                <div>
                  <h3 className="font-d3-serif italic text-[28px] leading-tight">{l.name}</h3>
                  <p className="mt-1 font-d3-sans text-[11px] uppercase tracking-[0.2em] text-[#c48b7d]">{l.role.replace('Advisor — ', '')}</p>
                  <p className="mt-3 text-d3-paper/70 leading-relaxed">{l.bio}</p>
                  <p className="mt-2 font-d3-serif italic text-[14px] text-d3-paper/60">{l.expertise.join(' · ')}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-16 [&_span]:bg-d3-paper/20">
            <Ornament />
          </div>
        </Page>
      </section>
    </>
  );
}
