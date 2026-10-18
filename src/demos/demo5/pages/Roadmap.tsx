import { useState } from 'react';
import { Globe, Leaf, Settings, Users, Cpu } from 'lucide-react';
import { roadmap, strategicPillars } from '../../../data/roadmap';
import type { InitiativeType } from '../../../types';
import { Box, Go, Hero, Pill, Title, Up, P, useMeta } from '../ui';

const meta: Record<InitiativeType, { icon: typeof Globe; tone: string; dot: string }> = {
  Expansion: { icon: Globe, tone: 'bg-[#e8eefc] text-[#3b4fb8]', dot: 'bg-[#3b4fb8]' },
  Technology: { icon: Cpu, tone: 'bg-[#efe8fb] text-[#6b3fb8]', dot: 'bg-[#6b3fb8]' },
  Sustainability: { icon: Leaf, tone: 'bg-[#e3f4e9] text-[#2c7a4b]', dot: 'bg-[#2c7a4b]' },
  Operations: { icon: Settings, tone: 'bg-[#fdf0d2] text-[#8a5a00]', dot: 'bg-[#c08a12]' },
  People: { icon: Users, tone: 'bg-[#fde9e3] text-[#b5452c]', dot: 'bg-d5-coral' },
};

export default function Roadmap() {
  useMeta('Our journey ahead', 'An illustrative roadmap of the group’s priorities — not official commitments.');
  const [hidden, setHidden] = useState<InitiativeType[]>([]);
  const toggle = (t: InitiativeType) => setHidden((h) => (h.includes(t) ? h.filter((x) => x !== t) : [...h, t]));

  return (
    <>
      <Hero eyebrow="Our journey ahead" title={<>Where we’re going, together.</>} intro="A friendly look at our priorities for the years ahead." image="/images/solar.jpg" crumbs={[{ label: 'Our journey' }]} />
      <section className="py-10">
        <Box>
          <div className="rounded-[24px] bg-[#fdf0d2] px-6 py-4 text-[15px] text-[#6b4700]">
            <strong>Please note:</strong> this roadmap is illustrative sample content for design review. It is not an official plan and every milestone needs client confirmation.
          </div>
          <fieldset className="mt-8">
            <legend className="font-extrabold">Show initiatives about:</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {(Object.keys(meta) as InitiativeType[]).map((t) => {
                const on = !hidden.includes(t);
                return (
                  <label key={t} className={`inline-flex items-center gap-2 h-10 px-4 rounded-full cursor-pointer text-[14.5px] font-bold transition-opacity has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-d5-sun ${meta[t].tone} ${on ? '' : 'opacity-40'}`}>
                    <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(t)} />
                    <span className={`w-2.5 h-2.5 rounded-full ${meta[t].dot}`} aria-hidden /> {t}
                  </label>
                );
              })}
            </div>
          </fieldset>
        </Box>
      </section>

      <section className="pb-20">
        <Box>
          <ol className="relative">
            {roadmap.map((p, i) => {
              const items = p.initiatives.filter((it) => !hidden.includes(it.type));
              return (
                <li key={p.id} className="relative grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-10 pb-14 last:pb-0">
                  {i < roadmap.length - 1 && <span className="hidden lg:block absolute left-[39px] top-20 bottom-0 w-[3px] rounded-full bg-[repeating-linear-gradient(to_bottom,#0f766e_0_10px,transparent_10px_18px)] opacity-40" aria-hidden />}
                  <Up>
                    <div className="flex lg:flex-col items-center lg:items-start gap-4">
                      <span className="grid place-items-center w-20 h-20 rounded-full bg-d5-teal text-white text-[28px] font-extrabold shadow-[0_12px_30px_-12px_rgba(15,118,110,0.8)] shrink-0">{i + 1}</span>
                      <div>
                        <p className="text-[14px] font-extrabold text-d5-coral">{p.label}</p>
                        <p className="text-[22px] font-extrabold">{p.horizon}</p>
                      </div>
                    </div>
                  </Up>
                  <Up delay={0.08}>
                    <div className="rounded-[32px] bg-d5-sand p-6 sm:p-9">
                      <Title as="h2" className="text-[28px] sm:text-[34px]">
                        {p.title}
                      </Title>
                      <p className="mt-2 text-[17px] text-d5-mute">{p.summary}</p>
                      <ul className="mt-6 grid sm:grid-cols-2 gap-4" aria-live="polite">
                        {items.map((it) => {
                          const M = meta[it.type];
                          const Icon = M.icon;
                          return (
                            <li key={it.title} className="rounded-[24px] bg-white p-5">
                              <span className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12.5px] font-bold ${M.tone}`}>
                                <Icon size={14} aria-hidden /> {it.type}
                              </span>
                              <p className="mt-3 text-[18px] font-extrabold">{it.title}</p>
                              <p className="mt-1 text-[15px] text-d5-mute">{it.description}</p>
                            </li>
                          );
                        })}
                      </ul>
                      {items.length === 0 && <p className="mt-6 text-d5-mute">No initiatives match your selection in this horizon.</p>}
                    </div>
                  </Up>
                </li>
              );
            })}
          </ol>
        </Box>
      </section>

      <section className="py-20 bg-d5-sky/60">
        <Box>
          <div className="text-center max-w-2xl mx-auto">
            <Pill tone="white">Guided by</Pill>
            <Title className="mt-4 text-[32px] sm:text-[42px]">Four pillars that won’t change</Title>
          </div>
          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {strategicPillars.map((s) => (
              <li key={s.title} className="rounded-[28px] bg-white p-6">
                <p className="text-[18px] font-extrabold">{s.title}</p>
                <p className="mt-1.5 text-[15px] text-d5-mute">{s.description}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Go to={P.partner} tone="coral">
              Join us on the journey
            </Go>
          </div>
        </Box>
      </section>
    </>
  );
}
