import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { about, coreValues, timeline } from '../../../data/about';
import { chairman, managingDirector } from '../../../data/leadership';
import { ICONS } from '../../../lib/icons';
import { Display, Illustrative, PageHead, Slide, Tag, Ticks, Wrap, useMeta } from '../ui';

const index = [
  ['story', 'Our story'],
  ['chairman', "Chairman's message"],
  ['md', "MD's message"],
  ['vision', 'Vision & mission'],
  ['values', 'Core values'],
  ['philosophy', 'Philosophy'],
  ['timeline', 'Timeline'],
];

function Timeline() {
  const track = useRef<HTMLOListElement>(null);
  const scroll = (d: number) => track.current?.scrollBy({ left: d * Math.min(track.current.clientWidth * 0.8, 520), behavior: 'smooth' });
  return (
    <section id="timeline" className="scroll-mt-24 bg-d2-graphite text-white py-24 lg:py-28 overflow-hidden">
      <Wrap className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Tag index="07" light>
            Company timeline
          </Tag>
          <Display light className="mt-5 text-[52px] sm:text-[76px]">
            Built step by step
          </Display>
          <div className="mt-4">
            <Illustrative light />
          </div>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => scroll(-1)} aria-label="Scroll timeline back" className="grid place-items-center w-14 h-14 border border-white/30 hover:bg-d2-signal hover:border-d2-signal">
            <ArrowLeft aria-hidden />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Scroll timeline forward" className="grid place-items-center w-14 h-14 border border-white/30 hover:bg-d2-signal hover:border-d2-signal">
            <ArrowRight aria-hidden />
          </button>
        </div>
      </Wrap>
      <div className="mt-14 relative">
        <span className="absolute left-0 right-0 top-[27px] h-[2px] bg-white/15" aria-hidden />
        <ol ref={track} tabIndex={0} aria-label="Timeline, scrollable" className="relative flex gap-0 overflow-x-auto snap-x snap-mandatory no-scrollbar px-5 sm:px-8 lg:px-12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-d2-signal">
          {timeline.map((t) => (
            <li key={t.year} className="snap-start shrink-0 w-[78vw] sm:w-[360px] pr-8">
              <div className="flex items-center gap-3">
                <span className="w-[14px] h-[14px] bg-d2-signal mt-[20px]" aria-hidden />
              </div>
              <p className="mt-6 font-d2-display font-extrabold text-[72px] leading-none text-white/90">{t.year}</p>
              {t.image && <img src={t.image.sm} alt={t.image.alt} className="mt-5 w-full aspect-[16/10] object-cover grayscale hover:grayscale-0 transition" loading="lazy" />}
              <h3 className="mt-5 font-d2-display font-bold uppercase text-[26px] leading-none">{t.title}</h3>
              <p className="mt-2 text-white/65 text-[15px] leading-relaxed">{t.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function About() {
  useMeta('About Us', 'Our story, leadership messages, vision, mission, values and timeline (sample content).');
  return (
    <>
      <PageHead index="01" title="About the group" intro="An industrial group built over decades on engineering discipline and long-term ownership." image="/images/drafting.jpg" crumbs={[{ label: 'About' }]} />

      <div className="grid lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block border-r border-d2-line">
          <nav aria-label="Section index" className="sticky top-[88px] p-8">
            <p className="font-d2-mono text-[11px] tracking-[0.14em] text-d2-slate">// ON THIS PAGE</p>
            <ol className="mt-4 space-y-1">
              {index.map(([id, l], i) => (
                <li key={id}>
                  <a href={`#${id}`} className="flex gap-3 py-1.5 font-d2-display uppercase text-[17px] tracking-[0.03em] text-d2-graphite/70 hover:text-d2-signal">
                    <span className="font-d2-mono text-[11px] pt-1 text-d2-slate">0{i + 1}</span> {l}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="min-w-0">
          <section id="story" className="scroll-mt-24 px-5 sm:px-8 lg:px-16 py-20 lg:py-28 border-b border-d2-line">
            <Tag index="01">Our story</Tag>
            <p className="mt-8 font-d2-display font-semibold uppercase text-[34px] sm:text-[48px] leading-[1.02] max-w-5xl">{about.story[0]}</p>
            <div className="mt-10 grid md:grid-cols-2 gap-8 text-[17px] leading-relaxed text-d2-graphite/80 max-w-5xl">
              <p>{about.story[1]}</p>
              <p>{about.story[2]}</p>
            </div>
          </section>

          <section id="chairman" className="scroll-mt-24 bg-d2-navy text-white grid xl:grid-cols-[0.8fr_1.2fr]">
            <img src={chairman.portrait} alt={`${chairman.name}, ${chairman.role} (placeholder portrait)`} className="w-full h-full min-h-[380px] object-cover object-top grayscale" loading="lazy" />
            <div className="px-5 sm:px-8 lg:px-16 py-16 lg:py-20">
              <Tag index="02" light>
                {about.chairmanMessage.title}
              </Tag>
              <Display light as="h2" className="mt-6 text-[40px] sm:text-[56px]">
                “{chairman.quote}”
              </Display>
              <div className="mt-8 space-y-4 text-white/75 leading-relaxed columns-1 md:columns-2 gap-8">
                {about.chairmanMessage.paragraphs.map((p) => (
                  <p key={p} className="break-inside-avoid">
                    {p}
                  </p>
                ))}
              </div>
              <p className="mt-8 font-d2-mono text-[12px] tracking-[0.12em] text-d2-signal">
                — {chairman.name.toUpperCase()}, {chairman.role.toUpperCase()} · SAMPLE PROFILE
              </p>
            </div>
          </section>

          <section id="md" className="scroll-mt-24 px-5 sm:px-8 lg:px-16 py-20 lg:py-28 grid xl:grid-cols-[1.3fr_0.7fr] gap-12 border-b border-d2-line">
            <div>
              <Tag index="03">{about.mdMessage.title}</Tag>
              <blockquote className="mt-8 border-l-[6px] border-d2-signal pl-6">
                <p className="font-d2-display font-bold uppercase text-[36px] sm:text-[50px] leading-[0.98]">“{managingDirector.quote}”</p>
              </blockquote>
              <div className="mt-8 space-y-4 text-[17px] leading-relaxed text-d2-graphite/80 max-w-2xl">
                {about.mdMessage.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <Ticks className="self-start border border-d2-line">
              <img src={managingDirector.portrait} alt={`${managingDirector.name} (placeholder portrait)`} className="w-full aspect-[4/5] object-cover object-top" loading="lazy" />
              <div className="p-5 font-d2-mono text-[12px]">
                <p className="text-d2-signal">{managingDirector.role.toUpperCase()}</p>
                <p className="mt-1 font-d2-display font-bold text-[26px] uppercase">{managingDirector.name}</p>
              </div>
            </Ticks>
          </section>

          <section id="vision" className="scroll-mt-24 grid md:grid-cols-2">
            {[
              ['04', 'Vision', about.vision, 'bg-d2-graphite text-white'],
              ['04', 'Mission', about.mission, 'bg-d2-signal text-white'],
            ].map(([i, t, d, c]) => (
              <div key={t} className={`${c} px-5 sm:px-8 lg:px-16 py-20`}>
                <Tag index={i} light>
                  {t}
                </Tag>
                <p className="mt-6 font-d2-display font-semibold uppercase text-[30px] sm:text-[38px] leading-[1.02]">{d}</p>
              </div>
            ))}
          </section>

          <section id="values" className="scroll-mt-24 px-5 sm:px-8 lg:px-16 py-20 lg:py-28">
            <Tag index="05">Core values</Tag>
            <Display className="mt-5 text-[48px] sm:text-[68px]">Operating principles</Display>
            <ul className="mt-12 grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {coreValues.map((v, i) => {
                const Icon = ICONS[v.icon];
                return (
                  <li key={v.title}>
                    <Slide delay={(i % 3) * 0.08}>
                      <Ticks className="border border-d2-line p-7 h-full hover:bg-d2-plate transition-colors">
                        <div className="flex justify-between">
                          <Icon className="text-d2-signal" size={28} strokeWidth={1.6} aria-hidden />
                          <span className="font-d2-mono text-[11px] text-d2-slate">V-0{i + 1}</span>
                        </div>
                        <h3 className="mt-8 font-d2-display font-bold uppercase text-[30px] leading-none">{v.title}</h3>
                        <p className="mt-3 text-d2-slate">{v.description}</p>
                      </Ticks>
                    </Slide>
                  </li>
                );
              })}
            </ul>
          </section>

          <section id="philosophy" className="scroll-mt-24 relative text-white">
            <img src="/images/power-lines.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-d2-graphite/80" aria-hidden />
            <div className="relative px-5 sm:px-8 lg:px-16 py-24 lg:py-32 grid xl:grid-cols-2 gap-12">
              <div>
                <Tag index="06" light>
                  Corporate philosophy
                </Tag>
                <div className="mt-6 space-y-4 text-[18px] leading-relaxed text-white/85">
                  {about.philosophy.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
              <div className="border-l-2 border-d2-signal pl-6">
                <p className="font-d2-mono text-[12px] tracking-[0.14em] text-d2-signal">WHY WE EXIST</p>
                <p className="mt-4 font-d2-display font-semibold uppercase text-[30px] sm:text-[36px] leading-[1.04]">{about.whyWeExist}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Timeline />
    </>
  );
}
