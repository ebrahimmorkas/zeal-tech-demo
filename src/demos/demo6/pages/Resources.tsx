import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Download, Search } from 'lucide-react';
import { resources, resourceTypes, getResource } from '../../../data/resources';
import { formatDate } from '../../../data/news';
import { downloadResource } from '../../../lib/download';
import { Btn, Frame, Go, H, Label, P, PageHead, Photo, Sample, Wipe, narrow, useMeta } from '../ui';
import NotFound from './NotFound';

export default function Resources() {
  useMeta('Resources', 'Articles, whitepapers and technical notes from across the group (sample content).');
  const [q, setQ] = useState('');
  const [type, setType] = useState<(typeof resourceTypes)[number]>('All');
  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    return resources.filter((r) => (type === 'All' || r.type === type) && (!s || [r.title, r.excerpt, ...r.tags].join(' ').toLowerCase().includes(s)));
  }, [q, type]);

  return (
    <>
      <PageHead n="07" title={<>Resources<span className="text-d6-red">.</span></>} intro="Articles, whitepapers and technical notes from the group’s specialists." crumbs={[{ label: 'Resources' }]} />
      <section className="py-12 lg:py-16">
        <Frame>
          <div className="grid lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-5">
              <label htmlFor="d6-search" className="text-[12px] font-bold uppercase tracking-[0.12em]" style={narrow}>
                Search
              </label>
              <div className="mt-2 flex items-center border-[3px] border-d6-ink focus-within:border-d6-red">
                <Search size={20} className="ml-4 shrink-0" aria-hidden />
                <input id="d6-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Title, topic or tag" className="w-full h-14 px-3 bg-transparent outline-none text-[17px]" />
              </div>
            </div>
            <div role="group" aria-label="Filter by type" className="lg:col-span-7 flex flex-wrap gap-2 lg:justify-end">
              {resourceTypes.map((t) => (
                <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(t)} className={`h-14 px-4 border-2 border-d6-ink text-[12px] font-bold uppercase tracking-[0.1em] ${type === t ? 'bg-d6-ink text-white' : 'hover:bg-d6-grey'}`} style={narrow}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-6 text-[13px] text-d6-mid" aria-live="polite">
            {items.length} {items.length === 1 ? 'document' : 'documents'} · <Sample>Original sample text</Sample>
          </p>
          <div className="relative mt-6 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left border-collapse">
              <caption className="sr-only">Resource library</caption>
              <thead>
                <tr className="border-y-[3px] border-d6-ink text-[11px] font-bold uppercase tracking-[0.14em]" style={narrow}>
                  <th scope="col" className="py-3 pr-4 w-[60px]">
                    No.
                  </th>
                  <th scope="col" className="py-3 pr-4">
                    Title
                  </th>
                  <th scope="col" className="py-3 pr-4 w-[150px]">
                    Type
                  </th>
                  <th scope="col" className="py-3 pr-4 w-[120px]">
                    Length
                  </th>
                  <th scope="col" className="py-3 w-[110px]">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((r) => (
                  <tr key={r.slug} className="group border-b border-d6-line hover:bg-d6-grey">
                    <td className="py-5 pr-4 text-[13px] font-bold tabular-nums text-d6-red align-top">{String(resources.indexOf(r) + 1).padStart(2, '0')}</td>
                    <td className="py-5 pr-4 align-top">
                      <Link to={P.resource(r.slug)} className="font-bold text-[18px] leading-snug hover:text-d6-red inline-flex gap-2">
                        {r.title} <ArrowUpRight size={16} className="shrink-0 mt-1 opacity-0 group-hover:opacity-100" aria-hidden />
                      </Link>
                      <p className="mt-1 text-[14px] text-d6-ink/65 max-w-xl">{r.excerpt}</p>
                    </td>
                    <td className="py-5 pr-4 text-[12px] font-bold uppercase tracking-[0.1em] align-top" style={narrow}>
                      {r.type}
                    </td>
                    <td className="py-5 pr-4 text-[14px] align-top">{r.readTime}</td>
                    <td className="py-5 text-[14px] tabular-nums align-top">{formatDate(r.date, 'short')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {items.length === 0 && <p className="py-10 text-[17px]">No documents match “{q}”. Try a broader term.</p>}
          </div>
        </Frame>
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
      <header className="pt-10 lg:pt-16 pb-10 border-b-[3px] border-d6-ink">
        <Frame>
          <nav aria-label="Breadcrumb" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-d6-mid" style={narrow}>
            <Link to={P.home} className="hover:text-d6-red">
              Index
            </Link>{' '}
            /{' '}
            <Link to={P.resources} className="hover:text-d6-red">
              Resources
            </Link>{' '}
            / <span className="text-d6-ink">{r.type}</span>
          </nav>
          <Wipe immediate className="mt-10">
            <H as="h1" className="text-[36px] sm:text-[56px] xl:text-[72px] max-w-5xl">
              {r.title}
            </H>
          </Wipe>
          <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 border-t border-d6-line text-[14px]">
            {[
              ['Type', r.type],
              ['Author', r.author],
              ['Date', formatDate(r.date)],
              ['Length', r.readTime],
            ].map(([k, v]) => (
              <div key={k} className="pt-4 pr-4">
                <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-d6-mid" style={narrow}>
                  {k}
                </dt>
                <dd className="mt-1 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </Frame>
      </header>
      <Frame className="py-12 lg:py-16 grid lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-3 lg:sticky lg:top-8 self-start">
          <Label n="§">Contents</Label>
          <ol className="mt-4 border-t-[3px] border-d6-ink">
            {r.sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#s${i + 1}`} className="flex gap-3 py-2.5 border-b border-d6-line text-[15px] hover:text-d6-red">
                  <span className="text-d6-red font-bold tabular-nums">{i + 1}</span>
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
          {r.downloadable && (
            <Btn type="button" onClick={() => downloadResource(r)} className="mt-6 w-full">
              <span>Download sample</span>
              <Download size={18} aria-hidden />
            </Btn>
          )}
          <ul className="mt-6 flex flex-wrap gap-2">
            {r.tags.map((t) => (
              <li key={t} className="px-2 py-1 bg-d6-grey text-[12px] font-semibold">
                {t}
              </li>
            ))}
          </ul>
        </aside>
        <div className="lg:col-span-8 lg:col-start-5">
          <Photo src={r.image.src} alt={r.image.alt} imgClass="aspect-[16/8]" />
          <p className="mt-10 text-[21px] font-semibold leading-[1.5]">{r.excerpt}</p>
          {r.sections.map((s, i) => (
            <section key={s.heading} id={`s${i + 1}`} className="mt-12 scroll-mt-20">
              <h2 className="flex items-baseline gap-4 border-b-[3px] border-d6-ink pb-2 text-[24px] font-extrabold tracking-[-0.03em]">
                <span className="text-d6-red text-[15px] tabular-nums">{i + 1}.</span>
                {s.heading}
              </h2>
              <div className="mt-5 space-y-4 text-[18px] leading-[1.65] text-d6-ink/80">
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
          <div className="mt-14">
            <Go to={P.resources} tone="line" className="min-w-[240px]">
              <span className="inline-flex items-center gap-2">
                <ArrowLeft size={16} aria-hidden /> All resources
              </span>
            </Go>
          </div>
        </div>
      </Frame>
    </article>
  );
}
