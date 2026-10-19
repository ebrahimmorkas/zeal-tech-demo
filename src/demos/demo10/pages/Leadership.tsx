import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { leaders } from '../../../data/leadership';
import { LightboxShell } from '../../../components/common/LightboxShell';
import { Bento, Chip, Display, PASTEL, Shell, Tilt, tile, useMeta } from '../ui';

export default function Leadership() {
  useMeta('Leadership', 'Board, executive leadership and advisors (fictional placeholder profiles).');
  const [sel, setSel] = useState<string | null>(null);
  const l = leaders.find((x) => x.id === sel);
  const sections = [
    { title: 'Board & executive', people: leaders.filter((x) => x.group === 'Chairman' || x.group === 'Managing Director') },
    { title: 'Directors', people: leaders.filter((x) => x.group === 'Director') },
    { title: 'Advisors', people: leaders.filter((x) => x.group === 'Advisor') },
  ];
  return (
    <>
      <Bento eyebrow="Leadership" title="The people behind the group" intro="Select a profile to read more." image="/images/meeting-table.jpg" crumbs={[{ label: 'Leadership' }]} aside={<p className="text-[14.5px] text-d10-mute">All profiles are fictional placeholders; portraits are stock photography of unrelated people.</p>} />
      <section className="pt-10 pb-6">
        <Shell className="space-y-12">
          {sections.map((s) => (
            <div key={s.title}>
              <Display className="text-[30px] sm:text-[38px]">{s.title}</Display>
              <ul className={`mt-5 grid gap-4 ${s.people.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
                {s.people.map((p) => {
                  const k = leaders.indexOf(p);
                  return (
                    <li key={p.id}>
                      <Tilt className="h-full rounded-[28px]">
                        <button type="button" onClick={() => setSel(p.id)} aria-haspopup="dialog" className={`group w-full h-full text-left p-3 ${tile} hover:!bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-d10-violet ${s.people.length === 2 ? 'grid grid-cols-[150px_1fr] sm:grid-cols-[190px_1fr] gap-4 items-center' : ''}`}>
                          <motion.span layoutId={`d10-photo-${p.id}`} className={`block rounded-[20px] overflow-hidden ${PASTEL[k % PASTEL.length]}`}>
                            <img src={p.portrait} alt={`${p.name} (placeholder portrait)`} className="w-full aspect-[4/5] object-cover" loading="lazy" />
                          </motion.span>
                          <span className="block p-3">
                            <Chip>{p.role}</Chip>
                            <span className="block mt-2 font-d10-display font-semibold text-[20px] tracking-[-0.02em]">{p.name}</span>
                            {s.people.length === 2 && p.quote && <span className="block mt-2 text-d10-mute">“{p.quote}”</span>}
                            <span className="block mt-2 text-[13.5px] font-semibold text-d10-violet">View profile →</span>
                          </span>
                        </button>
                      </Tilt>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </Shell>
      </section>
      <LightboxShell open={!!l} onClose={() => setSel(null)} label={l ? `${l.name} profile` : 'Profile'} className="bg-d10-ink/40 backdrop-blur-md grid place-items-center p-3 sm:p-6">
        {l && (
          <div className={`relative w-full max-w-3xl max-h-[92dvh] overflow-y-auto ${tile} !bg-white/95 p-3 sm:p-4 grid sm:grid-cols-[260px_1fr] gap-2`}>
            <motion.div layoutId={`d10-photo-${l.id}`} className="rounded-[22px] overflow-hidden">
              <img src={l.portrait} alt="" className="w-full aspect-[4/5] sm:h-full object-cover" />
            </motion.div>
            <div className="p-4 sm:p-6">
              <button type="button" onClick={() => setSel(null)} aria-label="Close profile" className="absolute top-5 right-5 grid place-items-center w-10 h-10 rounded-full bg-d10-canvas hover:bg-d10-sky">
                <X size={18} />
              </button>
              <Chip>{l.role}</Chip>
              <p className="mt-3 font-d10-display font-semibold text-[30px] tracking-[-0.03em] pr-10">{l.name}</p>
              {l.quote && <p className="mt-3 text-[18px] font-medium text-d10-deep">“{l.quote}”</p>}
              <p className="mt-4 text-d10-mute leading-relaxed">{l.bio}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {l.expertise.map((e, i) => (
                  <li key={e}>
                    <Chip className={`${PASTEL[i]} text-d10-ink`}>{e}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </LightboxShell>
    </>
  );
}
