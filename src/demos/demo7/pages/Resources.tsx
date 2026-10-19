import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Download, Search } from 'lucide-react';
import { resources, resourceTypes, getResource } from '../../../data/resources';
import { formatDate } from '../../../data/news';
import { downloadResource } from '../../../lib/download';
import { Btn, Go, Grow, Kicker, Note, Opening, P, Serif, Wrap, useMeta } from '../ui';
import NotFound from './NotFound';

const typeTone: Record<string, string> = { Blog: 'bg-[#f0dcd2] text-[#6b3524]', Whitepaper: 'bg-d7-lime text-d7-forest', 'Technical Article': 'bg-[#d8e6ee] text-[#244a5c]' };

export default function Resources() {
  useMeta('Library', 'Articles, whitepapers and technical notes from across the group (sample content).');
  const [q, setQ] = useState('');
  const [type, setType] = useState<(typeof resourceTypes)[number]>('All');
  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    return resources.filter((r) => (type === 'All' || r.type === type) && (!s || [r.title, r.excerpt, ...r.tags].join(' ').toLowerCase().includes(s)));
  }, [q, type]);
  return (
    <>
      <Opening kicker="Library" title={<>Knowledge, <em>shared freely.</em></>} intro="Articles, whitepapers and technical notes from our specialists." image="/images/desk-flatlay.jpg" crumbs={[{ label: 'Library' }]} />
      <section className="py-14 lg:py-20">
        <Wrap>
          <div className="rounded-[36px] bg-white p-4 sm:p-5 flex flex-col md:flex-row gap-4 md:items-center">
            <label htmlFor="d7-search" className="sr-only">
              Search the library
            </label>
            <div className="flex-1 flex items-center gap-3 h-14 px-5 rounded-full bg-d7-mist focus-within:ring-4 focus-within:ring-d7-lime/50">
              <Search size={20} className="text-d7-moss" aria-hidden />
              <input id="d7-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title, topic or tag" className="w-full bg-transparent outline-none text-[16px]" />
            </div>
            <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
              {resourceTypes.map((t) => (
                <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(t)} className={`h-12 px-5 rounded-full text-[14.5px] font-medium transition-colors ${type === t ? 'bg-d7-forest text-d7-mist' : 'bg-d7-lichen hover:bg-d7-lime/60'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-5 text-[14.5px] text-d7-soil" aria-live="polite">
            {items.length} {items.length === 1 ? 'resource' : 'resources'} found
          </p>
          <ul className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((r, i) => (
              <li key={r.slug}>
                <Grow delay={(i % 3) * 0.08} className="h-full">
                  <Link to={P.resource(r.slug)} className="group flex flex-col h-full rounded-[32px] bg-white overflow-hidden focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-d7-moss">
                    <img src={r.image.sm} alt="" className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="flex flex-col flex-1 p-6">
                      <span className={`self-start inline-flex h-7 px-3 items-center rounded-full text-[12.5px] font-semibold ${typeTone[r.type]}`}>{r.type}</span>
                      <h2 className="mt-3 font-d7-serif text-[24px] leading-snug text-d7-forest">{r.title}</h2>
                      <p className="mt-2 text-[15px] text-d7-soil">{r.excerpt}</p>
                      <p className="mt-auto pt-5 flex items-center gap-2 text-[13.5px] text-d7-soil">
                        <Clock size={14} aria-hidden /> {r.readTime}
                      </p>
                    </div>
                  </Link>
                </Grow>
              </li>
            ))}
          </ul>
          {items.length === 0 && <p className="py-10 text-center text-[17px] text-d7-soil">Nothing found for “{q}”. Try another word.</p>}
          <div className="mt-8">
            <Note>All resources are original sample text</Note>
          </div>
        </Wrap>
      </section>
    </>
  );
}

export function ResourceDetail() {
  const { slug } = useParams();
  const r = getResource(slug);
  useMeta(r ? r.title : 'Not found', r ? r.excerpt : 'Resource not found.');
  if (!r) return <NotFound />;
  return (
    <article>
      <Opening titleAs="p" kicker={r.type} title={<em className="not-italic">Library</em>} image={r.image.sm} crumbs={[{ label: 'Library', to: P.resources }, { label: r.type }]} />
      <Wrap className="py-12 lg:py-16 grid lg:grid-cols-[1fr_300px] gap-12">
        <div className="max-w-[760px]">
          <Serif as="h1" className="text-[38px] sm:text-[52px] text-d7-forest">
            {r.title}
          </Serif>
          <p className="mt-4 text-[15px] text-d7-soil">
            {r.author} · {formatDate(r.date)} · {r.readTime}
          </p>
          <p className="mt-8 font-d7-serif text-[25px] leading-[1.4] text-d7-forest">{r.excerpt}</p>
          {r.sections.map((s, i) => (
            <section key={s.heading} id={`part-${i + 1}`} className="mt-12 scroll-mt-28">
              <h2 className="font-d7-serif text-[30px] text-d7-forest">{s.heading}</h2>
              <div className="mt-4 space-y-5 text-[18px] leading-[1.75] text-d7-bark">
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
          <div className="mt-14">
            <Go to={P.resources} tone="ghost">
              <span className="inline-flex items-center gap-2">
                <ArrowLeft size={16} aria-hidden /> Back to the library
              </span>
            </Go>
          </div>
        </div>
        <aside className="lg:sticky lg:top-28 self-start space-y-5">
          <div className="rounded-[32px] bg-white p-6">
            <Kicker>In this piece</Kicker>
            <ol className="mt-4 space-y-2.5">
              {r.sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#part-${i + 1}`} className="flex gap-3 text-[15px] text-d7-forest hover:underline underline-offset-4">
                    <span className="grid place-items-center w-6 h-6 rounded-full bg-d7-lichen text-[12px] shrink-0">{i + 1}</span>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>
          {r.downloadable && (
            <div className="rounded-[32px] bg-d7-forest text-d7-mist p-6">
              <p className="font-d7-serif text-[22px]">Take it with you</p>
              <p className="mt-1 text-[14.5px] text-d7-mist/70">A sample text version of this document.</p>
              <Btn type="button" tone="lime" onClick={() => downloadResource(r)} className="mt-5">
                <Download size={17} aria-hidden /> Download
              </Btn>
            </div>
          )}
          <ul className="flex flex-wrap gap-2">
            {r.tags.map((t) => (
              <li key={t} className="h-8 px-3.5 rounded-full bg-d7-lichen text-[13.5px] inline-flex items-center">
                {t}
              </li>
            ))}
          </ul>
        </aside>
      </Wrap>
    </article>
  );
}
