import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { ArrowLeft, Clock, Download, Search } from 'lucide-react';
import { resources, resourceTypes, getResource } from '../../../data/resources';
import { formatDate } from '../../../data/news';
import { downloadResource } from '../../../lib/download';
import { Button, Card, Chip, H, Label, Mono, P, PageTop, SampleChip, Shell, useMeta } from '../ui';
import NotFound from './NotFound';

const allTags = Array.from(new Set(resources.flatMap((r) => r.tags))).sort();

export default function Resources() {
  useMeta('Resources', 'Whitepapers, technical articles and blogs from the group (original sample content).');
  const [types, setTypes] = useState<string[]>([]);
  const [tag, setTag] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const list = useMemo(
    () =>
      resources.filter(
        (r) =>
          (types.length === 0 || types.includes(r.type)) &&
          (!tag || r.tags.includes(tag)) &&
          (!q.trim() || `${r.title} ${r.excerpt}`.toLowerCase().includes(q.toLowerCase())),
      ),
    [types, tag, q],
  );
  const toggle = (t: string) => setTypes((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  return (
    <>
      <PageTop label="resource centre" title={<>Research, papers & insights.</>} intro="Technical knowledge from across our business units." crumbs={[{ label: 'Resources' }]} />
      <section className="py-16 lg:py-24">
        <Shell className="grid lg:grid-cols-[260px_1fr] gap-8">
          <aside className="space-y-6 lg:sticky lg:top-28 self-start">
            <div className="relative">
              <label htmlFor="d4-r-q" className="sr-only">
                Search resources
              </label>
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-d4-deep/40" aria-hidden />
              <input id="d4-r-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="w-full h-11 pl-10 pr-4 rounded-xl bg-white ring-1 ring-[#e4e8f2] focus:outline-none focus:ring-2 focus:ring-d4-indigo" />
            </div>
            <fieldset>
              <legend className="font-d4-mono text-[12px] text-d4-deep/55">type</legend>
              <div className="mt-2 space-y-1">
                {resourceTypes
                  .filter((t) => t !== 'All')
                  .map((t) => (
                    <label key={t} className="flex items-center justify-between gap-2 p-2.5 rounded-xl hover:bg-white cursor-pointer text-[14.5px]">
                      <span className="flex items-center gap-2.5">
                        <input type="checkbox" checked={types.includes(t)} onChange={() => toggle(t)} className="w-4 h-4 rounded accent-[#6170ff]" />
                        {t}
                      </span>
                      <Mono className="text-d4-deep/45">{resources.filter((r) => r.type === t).length}</Mono>
                    </label>
                  ))}
              </div>
            </fieldset>
            <div>
              <p className="font-d4-mono text-[12px] text-d4-deep/55">topics</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {allTags.map((t) => (
                  <button key={t} type="button" aria-pressed={tag === t} onClick={() => setTag(tag === t ? null : t)} className={`h-7 px-3 rounded-full text-[12.5px] transition-colors ${tag === t ? 'bg-d4-indigo text-white' : 'bg-white ring-1 ring-[#e4e8f2] hover:ring-d4-indigo/50'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </aside>
          <div>
            <div className="flex items-center gap-2">
              <Mono className="text-d4-deep/55" >
                {list.length} result{list.length === 1 ? '' : 's'}
              </Mono>
              <SampleChip />
            </div>
            <ul className="mt-4 grid md:grid-cols-2 gap-4" aria-live="polite">
              {list.map((r) => (
                <li key={r.slug}>
                  <Card className="h-full overflow-hidden flex flex-col hover:ring-d4-indigo/40 transition">
                    <img src={r.image.sm} alt="" className="w-full aspect-[16/8] object-cover" loading="lazy" />
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between gap-2">
                        <Label>{r.type.toLowerCase()}</Label>
                        <Mono className="flex items-center gap-1 text-d4-deep/50">
                          <Clock size={12} aria-hidden /> {r.readTime}
                        </Mono>
                      </div>
                      <h2 className="mt-2 font-d4-display text-[20px] leading-snug tracking-[-0.02em]">
                        <Link to={P.resource(r.slug)} className="hover:text-d4-indigo">
                          {r.title}
                        </Link>
                      </h2>
                      <p className="mt-2 text-[14.5px] text-d4-deep/65 flex-1">{r.excerpt}</p>
                      <div className="mt-5 flex items-center gap-3">
                        <Link to={P.resource(r.slug)} className="text-[14px] font-medium text-d4-indigo">
                          Read
                        </Link>
                        {r.downloadable && (
                          <button type="button" onClick={() => downloadResource(r)} className="inline-flex items-center gap-1.5 text-[14px] text-d4-deep/60 hover:text-d4-deep">
                            <Download size={14} aria-hidden /> Download sample
                          </button>
                        )}
                      </div>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
            {list.length === 0 && (
              <Card className="p-10 text-center">
                <p className="font-d4-display text-[20px]">Nothing matches those filters</p>
                <button type="button" onClick={() => { setTypes([]); setTag(null); setQ(''); }} className="mt-3 text-[14px] font-medium text-d4-indigo">
                  Reset filters
                </button>
              </Card>
            )}
          </div>
        </Shell>
      </section>
    </>
  );
}

export function ResourceDetail() {
  const { slug } = useParams();
  const r = getResource(slug);
  const { scrollYProgress } = useScroll();
  useMeta(r ? r.title : 'Not found', r ? r.excerpt : 'Resource not found.');
  if (!r) return <NotFound />;
  return (
    <>
      <motion.div style={{ scaleX: scrollYProgress }} className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-d4-indigo to-d4-teal z-[60]" aria-hidden />
      <PageTop label={`resources / ${r.type.toLowerCase()}`} title={r.title} intro={r.excerpt} crumbs={[{ label: 'Resources', to: P.resources }, { label: r.type }]} />
      <section className="py-14 lg:py-20">
        <Shell className="grid lg:grid-cols-[1fr_280px] gap-10">
          <article className="max-w-[720px]">
            <div className="flex flex-wrap items-center gap-2 text-[14px] text-d4-deep/60">
              <span>{r.author}</span>·<span>{formatDate(r.date)}</span>·<span>{r.readTime}</span>
              <SampleChip />
            </div>
            {r.sections.map((s) => (
              <section key={s.heading} className="mt-10">
                <H as="h2" className="text-[26px]">
                  {s.heading}
                </H>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mt-4 text-[17.5px] leading-relaxed text-d4-deep/80">
                    {p}
                  </p>
                ))}
              </section>
            ))}
            <Link to={P.resources} className="mt-12 inline-flex items-center gap-2 text-[15px] font-medium text-d4-indigo">
              <ArrowLeft size={16} aria-hidden /> All resources
            </Link>
          </article>
          <aside className="space-y-4 lg:sticky lg:top-28 self-start">
            {r.downloadable && (
              <Card className="p-6">
                <Label>download</Label>
                <p className="mt-2 text-[14.5px] text-d4-deep/65">Generates a sample text copy for demonstration.</p>
                <Button type="button" className="mt-4 w-full" onClick={() => downloadResource(r)}>
                  <Download size={16} aria-hidden /> Download
                </Button>
              </Card>
            )}
            <Card className="p-6">
              <Label>topics</Label>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {r.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </Card>
          </aside>
        </Shell>
      </section>
    </>
  );
}
