import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Clock, Download, Search } from 'lucide-react';
import { resources, resourceTypes, getResource } from '../../../data/resources';
import { formatDate } from '../../../data/news';
import { downloadResource } from '../../../lib/download';
import { Bento, Bloom, Btn, Chip, Display, Go, P, Sample, Shell, tile, useMeta } from '../ui';
import NotFound from './NotFound';

const typeTone: Record<string, string> = { Blog: 'bg-d10-peach text-[#8a3b12]', Whitepaper: 'bg-[#efe3ff] text-d10-deep', 'Technical Article': 'bg-d10-sky text-[#244b8a]' };

export default function Resources() {
  useMeta('Resources', 'Blogs, whitepapers and technical articles (sample content).');
  const [q, setQ] = useState('');
  const [type, setType] = useState<(typeof resourceTypes)[number]>('All');
  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    return resources.filter((r) => (type === 'All' || r.type === type) && (!s || [r.title, r.excerpt, ...r.tags].join(' ').toLowerCase().includes(s)));
  }, [q, type]);
  return (
    <>
      <Bento eyebrow="Resource centre" title="Ideas worth sharing" intro="Blogs, whitepapers and technical articles from the group’s specialists." image="/images/laptop-work.jpg" crumbs={[{ label: 'Resources' }]} aside={<Sample>Original sample text</Sample>} />
      <section className="pt-10 pb-6">
        <Shell>
          <div className={`${tile} p-3 flex flex-col md:flex-row gap-3 md:items-center`}>
            <label htmlFor="d10-search" className="sr-only">
              Search resources
            </label>
            <div className="flex-1 flex items-center gap-3 h-12 px-4 rounded-2xl bg-d10-canvas focus-within:ring-4 focus-within:ring-d10-violet/15">
              <Search size={18} className="text-d10-mute" aria-hidden />
              <input id="d10-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title, topic or tag" className="w-full bg-transparent outline-none text-[15.5px]" />
            </div>
            <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-1.5">
              {resourceTypes.map((t) => (
                <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(t)} className={`h-12 px-4 rounded-2xl text-[14px] font-semibold ${type === t ? 'bg-d10-ink text-white' : 'hover:bg-d10-canvas'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-4 px-2 text-[14px] text-d10-mute" aria-live="polite">
            {items.length} {items.length === 1 ? 'result' : 'results'}
          </p>
          <ul className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((r, i) => (
              <li key={r.slug}>
                <Bloom delay={(i % 3) * 0.05} className="h-full">
                  <Link to={P.resource(r.slug)} className={`group flex flex-col h-full p-3 ${tile} hover:!bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-d10-violet`}>
                    <img src={r.image.sm} alt="" className="w-full aspect-[16/9] object-cover rounded-[20px]" loading="lazy" />
                    <span className="p-3 flex flex-col flex-1">
                      <Chip className={`self-start ${typeTone[r.type]}`}>{r.type}</Chip>
                      <h2 className="mt-3 font-d10-display font-semibold text-[19px] leading-snug tracking-[-0.01em]">{r.title}</h2>
                      <p className="mt-2 text-[14.5px] text-d10-mute">{r.excerpt}</p>
                      <span className="mt-auto pt-4 flex items-center gap-2 text-[13px] text-d10-mute">
                        <Clock size={14} aria-hidden /> {r.readTime}
                      </span>
                    </span>
                  </Link>
                </Bloom>
              </li>
            ))}
          </ul>
          {items.length === 0 && <p className={`mt-4 ${tile} p-10 text-center text-d10-mute`}>No resources match “{q}”.</p>}
        </Shell>
      </section>
    </>
  );
}

export function ResourceDetail() {
  const { slug } = useParams();
  const r = getResource(slug);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });
  useMeta(r ? r.title : 'Not found', r ? r.excerpt : 'Resource not found.');
  if (!r) return <NotFound />;
  return (
    <article className="pt-6 pb-6">
      {/* Reading progress bar */}
      <motion.div aria-hidden className="fixed top-0 left-0 right-0 h-1 z-[55] origin-left bg-gradient-to-r from-d10-violet to-[#ff7eb3]" style={{ scaleX: progress }} />
      <Shell className="grid lg:grid-cols-[1fr_300px] gap-4 items-start">
        <div>
          <div className={`${tile} p-7 sm:p-10`}>
            <nav aria-label="Breadcrumb" className="text-[13px] text-d10-mute">
              <Link to={P.home} className="hover:text-d10-violet font-medium">
                Home
              </Link>{' '}
              /{' '}
              <Link to={P.resources} className="hover:text-d10-violet font-medium">
                Resources
              </Link>{' '}
              / <span className="text-d10-ink font-semibold">{r.type}</span>
            </nav>
            <Chip className={`mt-8 ${typeTone[r.type]}`}>{r.type}</Chip>
            <Display as="h1" className="mt-4 text-[34px] sm:text-[48px]">
              {r.title}
            </Display>
            <p className="mt-4 text-[14px] text-d10-mute">
              {r.author} · {formatDate(r.date)} · {r.readTime}
            </p>
          </div>
          <img src={r.image.src} alt={r.image.alt} className="mt-4 w-full aspect-[16/8] object-cover rounded-[28px]" />
          <div className={`mt-4 ${tile} p-7 sm:p-10`}>
            <p className="font-d10-display font-semibold text-[22px] leading-snug tracking-[-0.01em]">{r.excerpt}</p>
            {r.sections.map((s, i) => (
              <section key={s.heading} id={`sec-${i + 1}`} className="mt-10 scroll-mt-24">
                <h2 className="font-d10-display font-semibold text-[24px] tracking-[-0.02em]">{s.heading}</h2>
                <div className="mt-3 space-y-4 text-[17.5px] leading-relaxed text-d10-ink/85">
                  {s.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <div className="mt-6">
            <Go to={P.resources} tone="soft">
              <ArrowLeft size={16} aria-hidden /> All resources
            </Go>
          </div>
        </div>
        <aside className="lg:sticky lg:top-24 space-y-4">
          <div className={`${tile} p-6`}>
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-d10-mute">On this page</p>
            <ol className="mt-3 space-y-1">
              {r.sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#sec-${i + 1}`} className="flex gap-2 px-3 py-2 rounded-xl text-[14.5px] font-medium hover:bg-d10-canvas">
                    <span className="text-d10-violet">{i + 1}</span>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>
          {r.downloadable && (
            <div className={`${tile} !bg-d10-ink !border-d10-ink text-white p-6`}>
              <p className="font-d10-display font-semibold text-[19px]">Save for later</p>
              <p className="mt-1 text-[14px] text-white/65">Sample text version of this document.</p>
              <Btn type="button" tone="white" onClick={() => downloadResource(r)} className="mt-4 w-full">
                <Download size={16} aria-hidden /> Download
              </Btn>
            </div>
          )}
          <ul className="flex flex-wrap gap-2 px-1">
            {r.tags.map((t) => (
              <li key={t}>
                <Chip className="bg-white/80 text-d10-ink">#{t}</Chip>
              </li>
            ))}
          </ul>
        </aside>
      </Shell>
    </article>
  );
}
