import { about, coreValues, timeline } from '../../../data/about';
import { chairman, managingDirector } from '../../../data/leadership';
import type { Leader } from '../../../types';
import { ICONS } from '../../../lib/icons';
import { Big, Box, Go, Outline, P, POP, PageHead, Pop, Sample, Sticker, Tag, card, useMeta } from '../ui';

/** Leader messages presented as speech bubbles with a tail pointing at the speaker. */
function Bubble({ leader, title, paragraphs, color, flip }: { leader: Leader; title: string; paragraphs: string[]; color: string; flip?: boolean }) {
  return (
    <div className={`grid gap-6 items-end ${flip ? 'md:grid-cols-[1fr_180px]' : 'md:grid-cols-[180px_1fr]'}`}>
      <div className={`text-center ${flip ? 'md:order-2' : ''}`}>
        <span className={`block mx-auto w-[150px] h-[150px] rounded-full overflow-hidden border-[3px] border-d8-ink shadow-[5px_5px_0_#111] ${color}`}>
          <img src={leader.portrait} alt={`${leader.name} (placeholder portrait)`} className="w-full h-full object-cover grayscale mix-blend-multiply" loading="lazy" />
        </span>
        <p className="mt-3 font-d8-display font-extrabold text-[18px]">{leader.name}</p>
        <p className="font-d8-mono text-[11.5px] uppercase text-d8-gray">{leader.role} · fictional</p>
      </div>
      <Pop tilt={flip ? 2 : -2}>
        <div className={`relative bg-white p-7 sm:p-9 ${card}`}>
          <span className={`absolute -bottom-[18px] ${flip ? 'right-16' : 'left-16'} w-8 h-8 bg-white border-r-[3px] border-b-[3px] border-d8-ink rotate-45 hidden md:block`} aria-hidden />
          <Tag className={color.split(' ')[0]}>{title}</Tag>
          <p className="mt-5 font-d8-display font-extrabold text-[26px] sm:text-[32px] leading-[1.05] tracking-[-0.02em]">“{leader.quote}”</p>
          <div className="mt-5 space-y-3 text-[16.5px] font-medium text-d8-gray">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Pop>
    </div>
  );
}

export default function About() {
  useMeta('About', 'Our story, a word from the Chairman and Managing Director, vision, mission, values and timeline (sample content).');
  return (
    <>
      <PageHead title={<>Hi, we’re <Outline>Nexora.</Outline></>} intro={about.storyTitle + '.'} crumbs={[{ label: 'About' }]} sticker="Est. sample year" />

      <section className="py-16 lg:py-24">
        <Box className="grid lg:grid-cols-2 gap-10 items-start">
          <div className={`bg-white p-7 sm:p-10 ${card}`}>
            <Tag className="bg-d8-mint">Our story</Tag>
            <p className="mt-6 font-d8-display font-extrabold text-[28px] sm:text-[34px] leading-[1.05] tracking-[-0.02em]">{about.story[0]}</p>
            <div className="mt-6 space-y-4 text-[17px] font-medium text-d8-gray">
              <p>{about.story[1]}</p>
              <p>{about.story[2]}</p>
            </div>
            <div className="mt-6">
              <Sample>Placeholder history</Sample>
            </div>
          </div>
          <div className="relative">
            <img src="/images/startup-team.jpg" alt="Team gathered around a table with laptops" className={`w-full aspect-[4/5] object-cover ${card}`} style={{ transform: 'rotate(2deg)' }} />
            <div className="absolute -left-3 bottom-10">
              <Sticker className="bg-d8-yellow" rotate={-8}>
                6 companies, 1 crew
              </Sticker>
            </div>
          </div>
        </Box>
      </section>

      <section className="py-16 lg:py-24 bg-d8-blue border-y-[3px] border-d8-ink">
        <Box className="space-y-14">
          <Big className="text-white text-[48px] sm:text-[72px]">A word from the top</Big>
          <Bubble leader={chairman} title="Chairman" paragraphs={about.chairmanMessage.paragraphs} color="bg-d8-yellow" />
          <Bubble leader={managingDirector} title="Managing Director" paragraphs={about.mdMessage.paragraphs} color="bg-d8-pink" flip />
        </Box>
      </section>

      <section className="py-16 lg:py-24">
        <Box className="grid md:grid-cols-2 gap-6">
          {[
            { k: 'Vision', v: about.vision, c: 'bg-d8-yellow' },
            { k: 'Mission', v: about.mission, c: 'bg-d8-mint' },
          ].map((x, i) => (
            <Pop key={x.k} delay={i * 0.1} tilt={i ? 3 : -3}>
              <div className={`h-full p-8 sm:p-10 ${card} ${x.c}`}>
                <Big as="h2" className="text-[44px]">
                  {x.k}
                </Big>
                <p className="mt-5 text-[20px] font-semibold leading-snug">{x.v}</p>
              </div>
            </Pop>
          ))}
        </Box>
        <Box className="mt-20">
          <Big className="text-[48px] sm:text-[72px]">
            Values we <Outline>live by</Outline>
          </Big>
          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreValues.map((v, i) => {
              const Icon = ICONS[v.icon];
              return (
                <li key={v.title}>
                  <Pop delay={(i % 3) * 0.07} tilt={i % 2 ? 3 : -3} className="h-full">
                    <div className={`h-full p-6 bg-white ${card}`}>
                      <div className="flex items-center gap-3">
                        <span className={`grid place-items-center w-11 h-11 border-[3px] border-d8-ink rounded-xl ${POP[i % 4]}`}>
                          <Icon size={20} strokeWidth={2.5} aria-hidden />
                        </span>
                        <h3 className="font-d8-display font-extrabold text-[24px]">{v.title}</h3>
                      </div>
                      <p className="mt-3 font-medium text-d8-gray">{v.description}</p>
                    </div>
                  </Pop>
                </li>
              );
            })}
          </ul>
        </Box>
      </section>

      <section className="py-16 lg:py-24 bg-d8-yellow border-y-[3px] border-d8-ink">
        <Box className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
          <div>
            <Tag className="bg-white">Philosophy</Tag>
            <div className="mt-6 space-y-5">
              {about.philosophy.map((p) => (
                <p key={p} className="font-d8-display font-extrabold text-[26px] sm:text-[32px] leading-[1.08] tracking-[-0.02em]">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className={`bg-white p-7 ${card}`}>
            <Tag className="bg-d8-pink">Why we exist</Tag>
            <p className="mt-4 text-[18px] font-medium">{about.whyWeExist}</p>
          </div>
        </Box>
      </section>

      {/* Timeline as a horizontally scrolling row of ticket stubs. */}
      <section id="timeline" className="py-16 lg:py-24 scroll-mt-24">
        <Box className="flex flex-wrap items-end justify-between gap-6">
          <Big className="text-[48px] sm:text-[72px]">The road so far</Big>
          <Sample>Dates are illustrative placeholders</Sample>
        </Box>
        <ol className="mt-10 flex gap-5 overflow-x-auto px-4 sm:px-8 pb-6 pt-2" aria-label="Timeline" tabIndex={0}>
          {timeline.map((t, i) => (
            <li key={t.year} className={`shrink-0 w-[280px] bg-white ${card} flex flex-col`}>
              <div className={`relative px-6 py-5 border-b-[3px] border-dashed border-d8-ink ${POP[i % 4]}`}>
                <p className="font-d8-display font-extrabold text-[56px] leading-none tracking-[-0.04em]">{t.year}</p>
                <span className="absolute -left-[13px] -bottom-[13px] w-6 h-6 rounded-full bg-d8-cream border-[3px] border-d8-ink" aria-hidden />
                <span className="absolute -right-[13px] -bottom-[13px] w-6 h-6 rounded-full bg-d8-cream border-[3px] border-d8-ink" aria-hidden />
              </div>
              <div className="p-6">
                <h3 className="font-d8-display font-extrabold text-[22px]">{t.title}</h3>
                <p className="mt-2 font-medium text-d8-gray text-[15.5px]">{t.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <Box className="mt-10">
          <Go to={P.leadership} tone="pink">
            Meet the people
          </Go>
        </Box>
      </section>
    </>
  );
}
