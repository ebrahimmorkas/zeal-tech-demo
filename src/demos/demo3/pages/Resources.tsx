import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { resources, resourceTypes, getResource } from '../../../data/resources';
import { formatDate } from '../../../data/news';
import { downloadResource } from '../../../lib/download';
import { Figure, Kicker, Note, Opening, Ornament, P, Page, ROMAN, ReadLink, useMeta } from '../ui';
import NotFound from './NotFound';

export default function Resources() {
  useMeta('Library', 'Essays, whitepapers and technical articles from the group (original sample content).');
  const [type, setType] = useState<(typeof resourceTypes)[number]>('All');
  const [q, setQ] = useState('');
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return resources.filter((r) => (type === 'All' || r.type === type) && (!t || `${r.title} ${r.excerpt} ${r.tags.join(' ')}`.toLowerCase().includes(t)));
  }, [type, q]);

  return (
    <>
      <Opening chapter="Chapter VII · The Library" title={<>Essays, papers <em>&amp; notes</em></>} deck="Considered writing from the people who run our companies." crumbs={[{ label: 'Library' }]} />
      <Page className="max-w-5xl">
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end border-b border-d3-ink pb-6">
          <div>
            <label htmlFor="d3-q" className="font-d3-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-d3-taupe">
              Search the library
            </label>
            <input id="d3-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="A subject, a title, a word…" className="mt-2 w-full bg-transparent border-0 border-b border-d3-ink/30 py-3 font-d3-serif text-[24px] placeholder:italic placeholder:text-d3-taupe/60 focus:outline-none focus:border-d3-oxblood" />
          </div>
          <div role="tablist" aria-label="Filter by type" className="flex flex-wrap gap-x-5 gap-y-2">
            {resourceTypes.map((t) => (
              <button key={t} type="button" role="tab" aria-selected={type === t} onClick={() => setType(t)} className={`font-d3-serif text-[18px] ${type === t ? 'italic text-d3-oxblood' : 'text-d3-taupe hover:text-d3-ink'}`}>
                {t === 'All' ? 'All' : `${t}s`}
              </button>
            ))}
          </div>
        </div>

        <ol className="mt-4 mb-24" aria-live="polite">
          {list.map((r, i) => (
            <li key={r.slug} className="border-b border-d3-rule">
              <div className="grid grid-cols-[40px_1fr] sm:grid-cols-[56px_1fr_auto] gap-x-4 py-8">
                <span className="font-d3-serif italic text-d3-taupe pt-2">{ROMAN[i] ?? i + 1}.</span>
                <div>
                  <p className="font-d3-sans text-[10.5px] font-semibold uppercase tracking-[0.24em] text-d3-oxblood">{r.type}</p>
                  <h2 className="mt-2 font-d3-serif font-light text-[28px] sm:text-[34px] leading-[1.1]">
                    <Link to={P.resource(r.slug)} className="hover:text-d3-oxblood">
                      {r.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-d3-taupe">{r.excerpt}</p>
                  <p className="mt-3 font-d3-serif italic text-[14px] text-d3-taupe">
                    {r.author} — {formatDate(r.date)}
                  </p>
                </div>
                <div className="col-start-2 sm:col-start-3 mt-4 sm:mt-0 flex sm:flex-col sm:items-end gap-4 sm:pt-8">
                  <span className="font-d3-serif italic text-[15px] whitespace-nowrap">{r.readTime}</span>
                  {r.downloadable && (
                    <button type="button" onClick={() => downloadResource(r)} className="font-d3-sans text-[11px] font-semibold uppercase tracking-[0.2em] border-b border-d3-ink/30 hover:text-d3-oxblood hover:border-d3-oxblood whitespace-nowrap" aria-label={`Download a sample copy of ${r.title}`}>
                      Download copy
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
          {list.length === 0 && <li className="py-16 text-center font-d3-serif italic text-[22px] text-d3-taupe">No entries match your search.</li>}
        </ol>
      </Page>
    </>
  );
}

export function ResourceDetail() {
  const { slug } = useParams();
  const r = getResource(slug);
  useMeta(r ? r.title : 'Not found', r ? r.excerpt : 'Resource not found.');
  if (!r) return <NotFound />;
  return (
    <>
      <Opening chapter={`The Library · ${r.type}`} title={r.title} deck={r.excerpt} crumbs={[{ label: 'Library', to: P.resources }, { label: r.type }]} />
      <Page className="max-w-5xl">
        <Figure src={r.image.src} alt={r.image.alt} caption="Representative photography" imgClass="aspect-[21/9]" />
      </Page>
      <article className="py-20">
        <Page className="max-w-[720px]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-d3-rule py-4">
            <p className="font-d3-serif italic text-d3-taupe">
              {r.author} · {formatDate(r.date)} · {r.readTime}
            </p>
            {r.downloadable && (
              <button type="button" onClick={() => downloadResource(r)} className="font-d3-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-d3-oxblood border-b border-d3-oxblood/40">
                Download a copy
              </button>
            )}
          </div>
          <div className="mt-3">
            <Note>Original sample text written for this design demonstration.</Note>
          </div>
          {r.sections.map((s, i) => (
            <section key={s.heading} className="mt-14">
              <Kicker>{ROMAN[i]}.</Kicker>
              <h2 className="mt-2 font-d3-serif font-light text-[34px]">{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="mt-5 text-[19px] leading-[1.9] text-d3-ink/85">
                  {p}
                </p>
              ))}
            </section>
          ))}
          <div className="mt-20 space-y-8 text-center">
            <Ornament />
            <ReadLink to={P.resources}>Return to the Library</ReadLink>
          </div>
        </Page>
      </article>
    </>
  );
}
