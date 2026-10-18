import { roadmap, strategicPillars } from '../../../data/roadmap';
import { Fade, Kicker, Note, Opening, Ornament, P, Page, ROMAN, ReadLink, Serif, useMeta } from '../ui';

export default function Roadmap() {
  useMeta('Horizons', 'The group’s illustrative roadmap across three horizons — not official commitments.');
  return (
    <>
      <Opening chapter="Chapter IV · Horizons" title={<>The road <em>ahead</em></>} deck="Three horizons of ambition, pursued with patience. Every milestone shown is illustrative pending confirmation." crumbs={[{ label: 'Horizons' }]} />

      <Page>
        <ol className="grid sm:grid-cols-3 border-y border-d3-rule" aria-label="Horizons overview">
          {roadmap.map((p, i) => (
            <li key={p.id} className={`py-6 text-center ${i ? 'sm:border-l border-t sm:border-t-0 border-d3-rule' : ''}`}>
              <a href={`#${p.id}`} className="group block">
                <span className="font-d3-serif italic text-d3-oxblood">{ROMAN[i]}</span>
                <span className="block font-d3-serif text-[24px] group-hover:text-d3-oxblood">{p.label}</span>
                <span className="block font-d3-sans text-[11px] uppercase tracking-[0.24em] text-d3-taupe">{p.horizon}</span>
              </a>
            </li>
          ))}
        </ol>
      </Page>

      {roadmap.map((p, i) => (
        <section key={p.id} id={p.id} className={`scroll-mt-20 py-24 lg:py-32 ${i === 1 ? 'bg-d3-ink text-d3-paper' : ''}`}>
          <Page className="grid lg:grid-cols-12 gap-12">
            <Fade className="lg:col-span-5">
              <p className={`font-d3-serif font-light text-[140px] sm:text-[200px] leading-[0.8] ${i === 1 ? 'text-d3-paper/15' : 'text-d3-ink/10'}`}>{ROMAN[i]}</p>
              <Kicker className={`-mt-6 ${i === 1 ? '!text-[#c48b7d]' : ''}`}>
                {p.label} · {p.horizon}
              </Kicker>
              <h2 className="mt-4 font-d3-serif font-light text-[44px] sm:text-[56px] leading-[1.02] tracking-[-0.02em]">{p.title}</h2>
              <p className={`mt-6 font-d3-serif italic text-[21px] leading-[1.55] ${i === 1 ? 'text-d3-paper/70' : 'text-d3-taupe'}`}>{p.summary}</p>
            </Fade>
            <ol className="lg:col-span-6 lg:col-start-7 lg:pt-24">
              {p.initiatives.map((it, j) => (
                <li key={it.title} className={`grid grid-cols-[110px_1fr] gap-6 py-7 border-t ${i === 1 ? 'border-d3-paper/20' : 'border-d3-rule'}`}>
                  <Fade delay={j * 0.06} className="contents">
                    <span className={`font-d3-sans text-[10.5px] font-semibold uppercase tracking-[0.22em] pt-2 ${i === 1 ? 'text-[#c48b7d]' : 'text-d3-oxblood'}`}>{it.type}</span>
                    <span>
                      <span className="block font-d3-serif text-[26px] leading-tight">{it.title}</span>
                      <span className={`block mt-2 ${i === 1 ? 'text-d3-paper/65' : 'text-d3-taupe'}`}>{it.description}</span>
                    </span>
                  </Fade>
                </li>
              ))}
            </ol>
          </Page>
        </section>
      ))}

      <section className="bg-d3-cream border-y border-d3-rule py-24">
        <Page>
          <div className="text-center">
            <Kicker>Guiding Pillars</Kicker>
            <Serif className="mt-5 text-[40px] sm:text-[56px]">
              What will <em>not</em> change
            </Serif>
          </div>
          <ul className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {strategicPillars.map((s, i) => (
              <li key={s.title} className="text-center">
                <p className="font-d3-serif italic text-d3-oxblood">{ROMAN[i]}</p>
                <p className="mt-2 font-d3-serif text-[26px]">{s.title}</p>
                <p className="mt-2 text-d3-taupe">{s.description}</p>
              </li>
            ))}
          </ul>
          <div className="mt-16 text-center space-y-6">
            <Ornament />
            <Note>This roadmap is a design illustration and does not represent official company commitments.</Note>
            <ReadLink to={P.partner}>Shape these horizons with us</ReadLink>
          </div>
        </Page>
      </section>
    </>
  );
}
