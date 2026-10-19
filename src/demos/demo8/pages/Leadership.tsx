import { useState } from 'react';
import { X } from 'lucide-react';
import { leaders } from '../../../data/leadership';
import { LightboxShell } from '../../../components/common/LightboxShell';
import { Big, Box, Outline, POP, PageHead, Pop, Sample, Tag, card, lift, useMeta } from '../ui';

export default function Leadership() {
  useMeta('People', 'The board, leadership team and advisors (fictional placeholder profiles).');
  const [sel, setSel] = useState<string | null>(null);
  const l = leaders.find((x) => x.id === sel);
  const groups = [
    { title: 'The bosses', people: leaders.filter((x) => x.group === 'Chairman' || x.group === 'Managing Director') },
    { title: 'Directors', people: leaders.filter((x) => x.group === 'Director') },
    { title: 'Advisors', people: leaders.filter((x) => x.group === 'Advisor') },
  ];
  return (
    <>
      <PageHead title={<>The <Outline>people.</Outline></>} intro="The board, leadership team and advisors steering the group." crumbs={[{ label: 'People' }]} color="bg-d8-mint" sticker="Say hi 👋" />
      <section className="py-14 lg:py-20">
        <Box>
          <Sample>Fictional placeholder profiles and stock portraits</Sample>
          {groups.map((g) => (
            <div key={g.title} className="mt-14">
              <Big className="text-[40px] sm:text-[56px]">{g.title}</Big>
              <ul className={`mt-8 grid gap-6 ${g.people.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
                {g.people.map((p) => {
                  const k = leaders.indexOf(p);
                  return (
                    <li key={p.id}>
                      <Pop delay={(k % 4) * 0.06} tilt={k % 2 ? 3 : -3} className="h-full">
                        <button type="button" onClick={() => setSel(p.id)} aria-haspopup="dialog" className={`group block w-full h-full text-left bg-white overflow-hidden ${card} ${lift} focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-d8-blue`}>
                          <span className={`block border-b-[3px] border-d8-ink ${POP[k % 4]}`}>
                            <img src={p.portrait} alt={`${p.name} (placeholder portrait)`} className={`w-full object-cover grayscale mix-blend-multiply ${g.people.length === 2 ? 'aspect-[4/3]' : 'aspect-square'}`} loading="lazy" />
                          </span>
                          <span className="block p-5">
                            <span className="block font-d8-mono text-[11.5px] uppercase text-d8-gray">{p.role}</span>
                            <span className="block mt-1 font-d8-display font-extrabold text-[22px] leading-tight">{p.name}</span>
                            <span className="mt-3 inline-block font-d8-display font-bold underline underline-offset-4 decoration-[3px] decoration-d8-pink">Read bio →</span>
                          </span>
                        </button>
                      </Pop>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </Box>
      </section>
      <LightboxShell open={!!l} onClose={() => setSel(null)} label={l ? `${l.name} biography` : 'Biography'} className="bg-d8-ink/80 grid place-items-center p-4">
        {l && (
          <div className={`relative w-full max-w-2xl max-h-[90dvh] overflow-y-auto bg-white ${card}`}>
            <button type="button" onClick={() => setSel(null)} aria-label="Close biography" className="absolute top-4 right-4 grid place-items-center w-11 h-11 bg-d8-pink border-[3px] border-d8-ink rounded-full shadow-[3px_3px_0_#111]">
              <X size={20} strokeWidth={2.75} />
            </button>
            <div className="grid sm:grid-cols-[200px_1fr]">
              <div className={`border-b-[3px] sm:border-b-0 sm:border-r-[3px] border-d8-ink ${POP[leaders.indexOf(l) % 4]}`}>
                <img src={l.portrait} alt="" className="w-full h-full max-h-[260px] sm:max-h-none object-cover grayscale mix-blend-multiply" />
              </div>
              <div className="p-6 sm:p-8">
                <Tag className="bg-d8-yellow">{l.role}</Tag>
                <p className="mt-3 font-d8-display font-extrabold text-[30px] leading-tight">{l.name}</p>
                {l.quote && <p className="mt-4 font-d8-display font-bold text-[19px] leading-snug">“{l.quote}”</p>}
                <p className="mt-4 font-medium text-d8-gray">{l.bio}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {l.expertise.map((e) => (
                    <li key={e}>
                      <Tag className="bg-d8-mint">{e}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </LightboxShell>
    </>
  );
}
