import { useState } from 'react';
import { X } from 'lucide-react';
import { advisors, chairman, directors, managingDirector } from '../../../data/leadership';
import type { Leader } from '../../../types';
import { LightboxShell } from '../../../components/common/LightboxShell';
import { Box, Hero, Pill, Sample, Title, Up, useMeta } from '../ui';

function Person({ l, onOpen }: { l: Leader; onOpen: (l: Leader) => void }) {
  return (
    <div className="h-full flex flex-col items-center text-center rounded-[32px] bg-white border-2 border-[#efeae1] p-7 hover:border-d5-teal/30 transition-colors">
      <img src={l.portrait} alt={`${l.name} (placeholder portrait)`} className="w-32 h-32 rounded-full object-cover object-top ring-[6px] ring-d5-sky" loading="lazy" />
      <h3 className="mt-5 text-[20px] font-extrabold leading-tight">{l.name}</h3>
      <p className="mt-1 text-[14.5px] text-d5-mute">{l.role}</p>
      <ul className="mt-4 flex flex-wrap justify-center gap-1.5" aria-label="Expertise">
        {l.expertise.map((e) => (
          <li key={e} className="px-3 py-1 rounded-full bg-d5-sand text-[12.5px] font-semibold">
            {e}
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => onOpen(l)} className="mt-auto pt-6 text-[15px] font-bold text-d5-teal hover:underline underline-offset-4">
        Read {l.name.replace('Prof. ', '').split(' ')[0]}’s bio
      </button>
    </div>
  );
}

export default function Leadership() {
  useMeta('Our people', 'Meet the leadership team — chairman, managing director, directors and advisors (fictional placeholder profiles).');
  const [open, setOpen] = useState<Leader | null>(null);
  return (
    <>
      <Hero eyebrow="Our people" title={<>Meet the people leading the way.</>} intro="Experienced, approachable leaders who care about doing things right." image="/images/startup-team.jpg" crumbs={[{ label: 'People' }]} />
      <section className="py-14">
        <Box>
          <Sample>Fictional placeholder profiles — not the client’s leadership</Sample>
          <div className="mt-8 grid lg:grid-cols-2 gap-6">
            {[chairman, managingDirector].map((l, i) => (
              <Up key={l.id} delay={i * 0.08}>
                <article className={`h-full grid sm:grid-cols-[180px_1fr] gap-6 items-center rounded-[36px] p-7 sm:p-9 ${i ? 'bg-d5-sand' : 'bg-d5-sky'}`}>
                  <img src={l.portrait} alt={`${l.name}, ${l.role} (placeholder portrait)`} className="w-40 h-40 sm:w-full sm:h-auto sm:aspect-square rounded-full object-cover object-top ring-8 ring-white" loading="lazy" />
                  <div>
                    <Pill tone={i ? 'coral' : 'white'}>{l.role}</Pill>
                    <Title as="h2" className="mt-3 text-[28px]">
                      {l.name}
                    </Title>
                    <p className="mt-3 font-d5-serif italic text-[19px] leading-snug">“{l.quote}”</p>
                    <p className="mt-3 text-[15.5px] text-d5-mute">{l.bio}</p>
                    <p className="mt-3 text-[14px] font-semibold text-d5-teal">{l.expertise.join(' · ')}</p>
                  </div>
                </article>
              </Up>
            ))}
          </div>
        </Box>
      </section>

      <section className="py-14">
        <Box>
          <Pill>Board of directors</Pill>
          <Title className="mt-4 text-[32px] sm:text-[40px]">Our directors</Title>
          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {directors.map((l, i) => (
              <li key={l.id}>
                <Up delay={i * 0.05} className="h-full">
                  <Person l={l} onOpen={setOpen} />
                </Up>
              </li>
            ))}
          </ul>
        </Box>
      </section>

      <section className="py-14">
        <Box>
          <Pill tone="sun">Advisors</Pill>
          <Title className="mt-4 text-[32px] sm:text-[40px]">Trusted advisors</Title>
          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {advisors.map((l) => (
              <li key={l.id}>
                <Person l={l} onOpen={setOpen} />
              </li>
            ))}
          </ul>
        </Box>
      </section>

      <LightboxShell open={!!open} onClose={() => setOpen(null)} label={open ? `${open.name} biography` : 'Biography'} className="bg-d5-ink/50 backdrop-blur-sm grid place-items-center p-4">
        {open && (
          <div className="relative w-full max-w-lg rounded-[36px] bg-white p-8 sm:p-10 text-center shadow-2xl">
            <button type="button" onClick={() => setOpen(null)} aria-label="Close biography" className="absolute top-4 right-4 grid place-items-center w-11 h-11 rounded-full bg-d5-sand">
              <X size={20} />
            </button>
            <img src={open.portrait} alt="" className="mx-auto w-28 h-28 rounded-full object-cover object-top ring-[6px] ring-d5-sky" />
            <h2 className="mt-5 text-[26px] font-extrabold">{open.name}</h2>
            <p className="text-d5-mute">{open.role}</p>
            <p className="mt-5 text-[16.5px] leading-relaxed text-left">{open.bio}</p>
            <p className="mt-5 text-left font-extrabold text-[14px]">Areas of expertise</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {open.expertise.map((e) => (
                <li key={e} className="px-3 py-1 rounded-full bg-d5-sky text-d5-teal text-[13px] font-bold">
                  {e}
                </li>
              ))}
            </ul>
          </div>
        )}
      </LightboxShell>
    </>
  );
}
