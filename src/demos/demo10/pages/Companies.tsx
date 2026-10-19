import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Globe } from 'lucide-react';
import { groupCompanies, getCompany } from '../../../data/groupCompanies';
import { Bento, Bloom, Chip, Glow, Go, P, PASTEL, Sample, Shell, Tilt, tile, useMeta } from '../ui';
import NotFound from './NotFound';

const industries = Array.from(new Set(groupCompanies.flatMap((c) => c.industries)));

export default function Companies() {
  useMeta('Companies', 'The six group companies, filterable by industry served (sample content).');
  const [picked, setPicked] = useState<string[]>([]);
  const items = useMemo(() => (picked.length ? groupCompanies.filter((c) => picked.some((p) => c.industries.includes(p))) : groupCompanies), [picked]);
  const toggle = (x: string) => setPicked((p) => (p.includes(x) ? p.filter((y) => y !== x) : [...p, x]));
  return (
    <>
      <Bento
        eyebrow="Group companies"
        title={
          <>
            Six <Glow>specialists.</Glow>
          </>
        }
        intro="Independent focus, shared standards. Filter by the industries each company serves."
        image="/images/open-floor.jpg"
        crumbs={[{ label: 'Companies' }]}
        aside={<p className="text-[14.5px] text-d10-mute">Company names, domains and metrics are fictional placeholders for design review.</p>}
      />
      <section className="pt-10 pb-6">
        <Shell>
          <div className={`${tile} p-4 flex flex-wrap items-center gap-2`} role="group" aria-label="Filter by industry">
            <span className="px-2 text-[13px] font-semibold text-d10-mute">Industries</span>
            {industries.map((x) => {
              const on = picked.includes(x);
              return (
                <button key={x} type="button" aria-pressed={on} onClick={() => toggle(x)} className={`inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-[14px] font-semibold transition-colors ${on ? 'bg-d10-violet text-white' : 'bg-d10-canvas hover:bg-white'}`}>
                  {on && <Check size={14} aria-hidden />}
                  {x}
                </button>
              );
            })}
            {picked.length > 0 && (
              <button type="button" onClick={() => setPicked([])} className="h-10 px-3 text-[13.5px] font-semibold text-d10-violet underline underline-offset-4">
                Clear
              </button>
            )}
          </div>
          <p className="mt-4 px-2 text-[14px] text-d10-mute" aria-live="polite">
            Showing {items.length} of {groupCompanies.length}
          </p>
          <motion.ul layout className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {items.map((c) => {
                const i = groupCompanies.indexOf(c);
                return (
                  <motion.li key={c.slug} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                    <Tilt className="h-full rounded-[28px]">
                      <Link to={P.company(c.slug)} className={`group flex flex-col h-full ${tile} overflow-hidden hover:!bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-d10-violet`}>
                        <div className="relative m-3 mb-0 rounded-[22px] overflow-hidden">
                          <img src={c.image.sm} alt={c.image.alt} className="w-full aspect-[16/10] object-cover" loading="lazy" />
                          <span className={`absolute top-3 left-3 grid place-items-center w-11 h-11 rounded-2xl font-d10-display font-semibold text-[14px] ${PASTEL[i]}`}>{c.monogram}</span>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <span className="text-[12.5px] font-semibold text-d10-violet">{c.sector}</span>
                          <h2 className="mt-1 font-d10-display font-semibold text-[22px] tracking-[-0.02em] leading-tight">{c.name}</h2>
                          <p className="mt-2 text-d10-mute">{c.tagline}</p>
                          <span className="mt-auto pt-5 inline-flex items-center gap-1 text-[14.5px] font-semibold text-d10-ink">
                            Learn more <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                          </span>
                        </div>
                      </Link>
                    </Tilt>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        </Shell>
      </section>
    </>
  );
}

export function CompanyDetail() {
  const { slug } = useParams();
  const c = getCompany(slug);
  useMeta(c ? c.name : 'Not found', c ? c.intro : 'Company not found.');
  if (!c) return <NotFound />;
  const i = groupCompanies.indexOf(c);
  return (
    <>
      <Bento
        eyebrow={c.sector}
        title={c.shortName}
        intro={c.tagline}
        image={c.image.src}
        crumbs={[{ label: 'Companies', to: P.companies }, { label: c.shortName }]}
        aside={
          <dl className="grid grid-cols-2 gap-3">
            {c.sampleMetrics.map((m) => (
              <div key={m.label}>
                <dd className="font-d10-display font-semibold text-[28px] leading-none">{m.value}</dd>
                <dt className="mt-1 text-[12.5px] text-d10-mute">{m.label} · illustrative</dt>
              </div>
            ))}
          </dl>
        }
      />
      <section className="pt-10 pb-6">
        <Shell className="grid lg:grid-cols-3 gap-4">
          <Bloom className={`${tile} lg:col-span-2 p-7 sm:p-10`}>
            <Chip>{c.name}</Chip>
            <p className="mt-5 font-d10-display font-semibold text-[24px] sm:text-[30px] leading-[1.2] tracking-[-0.02em]">{c.intro}</p>
            <div className="mt-6 space-y-4 text-[17px] text-d10-mute leading-relaxed">
              {c.description.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
          </Bloom>
          <Bloom delay={0.06} className={`${tile} ${PASTEL[i]} !border-transparent p-7`}>
            <Chip className="bg-white text-d10-ink">Offerings</Chip>
            <ul className="mt-5 space-y-3">
              {c.offerings.map((o) => (
                <li key={o} className="flex items-start gap-3 font-medium">
                  <span className="mt-0.5 grid place-items-center w-6 h-6 rounded-lg bg-white shrink-0">
                    <Check size={14} aria-hidden />
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </Bloom>
          <Bloom delay={0.1} className={`${tile} p-7`}>
            <Chip>Industries served</Chip>
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.industries.map((x) => (
                <li key={x} className="h-9 px-3.5 rounded-full bg-d10-canvas text-[14px] font-medium inline-flex items-center">
                  {x}
                </li>
              ))}
            </ul>
          </Bloom>
          <Bloom delay={0.14}>
            <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className={`group flex h-full items-center gap-4 p-7 ${tile} hover:!bg-white`}>
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-d10-violet text-white shrink-0">
                <Globe size={20} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[12.5px] text-d10-mute">Website · placeholder</span>
                <span className="block font-semibold break-all">{c.websiteLabel}</span>
              </span>
              <ArrowUpRight className="ml-auto shrink-0 text-d10-mute group-hover:text-d10-violet" aria-hidden />
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </Bloom>
          <Bloom delay={0.18} className={`${tile} !bg-d10-ink !border-d10-ink text-white p-7 flex flex-col justify-between gap-4`}>
            <p className="font-d10-display font-semibold text-[22px]">Work with {c.shortName}</p>
            <Go to={P.partner} tone="white" className="self-start">
              Partner with us
            </Go>
          </Bloom>
        </Shell>
        <Shell className="mt-4">
          <Sample>Company profile is fictional sample content</Sample>
        </Shell>
      </section>
    </>
  );
}
