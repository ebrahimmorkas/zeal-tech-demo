import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Search } from 'lucide-react';
import { resources, resourceTypes, getResource } from '../../../data/resources';
import { formatDate } from '../../../data/news';
import { downloadResource } from '../../../lib/download';
import { ActionButton, Display, Illustrative, P, PageHead, Tag, Wrap, useMeta } from '../ui';
import NotFound from './NotFound';

export default function Resources() {
  useMeta('Resource Centre', 'Technical articles, whitepapers and blogs (original sample content).');
  const [type, setType] = useState<(typeof resourceTypes)[number]>('All');
  const [q, setQ] = useState('');
  const rows = useMemo(() => {
    const t = q.trim().toLowerCase();
    return resources.filter((r) => (type === 'All' || r.type === type) && (!t || `${r.title} ${r.excerpt} ${r.tags.join(' ')}`.toLowerCase().includes(t)));
  }, [type, q]);

  return (
    <>
      <PageHead index="09" title="Resource centre" intro="Technical knowledge from our engineering, energy, logistics and digital teams." image="/images/circuit.jpg" crumbs={[{ label: 'Resources' }]} />
      <section className="py-14 lg:py-20">
        <Wrap>
          <div className="grid md:grid-cols-[1fr_auto] gap-4 items-end">
            <div>
              <label htmlFor="d2-q" className="font-d2-mono text-[12px] tracking-[0.12em] text-d2-slate">
                SEARCH LIBRARY
              </label>
              <div className="relative mt-2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-d2-slate" size={18} aria-hidden />
                <input id="d2-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. IoT, safety, solar" className="w-full h-14 pl-12 pr-4 bg-d2-plate border-b-2 border-d2-graphite text-[17px] focus:outline-none focus:border-d2-signal" />
              </div>
            </div>
            <div role="tablist" aria-label="Resource type" className="flex flex-wrap">
              {resourceTypes.map((t) => (
                <button key={t} type="button" role="tab" aria-selected={type === t} onClick={() => setType(t)} className={`h-14 px-4 font-d2-display uppercase text-[16px] border-b-2 ${type === t ? 'border-d2-signal text-d2-graphite' : 'border-d2-line text-d2-slate hover:text-d2-graphite'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <caption className="sr-only">Resource library ({rows.length} results)</caption>
              <thead>
                <tr className="border-b-2 border-d2-graphite font-d2-mono text-[11px] tracking-[0.12em] text-d2-slate">
                  <th scope="col" className="py-3 pr-4 font-normal">TYPE</th>
                  <th scope="col" className="py-3 pr-4 font-normal">TITLE</th>
                  <th scope="col" className="py-3 pr-4 font-normal">PUBLISHED</th>
                  <th scope="col" className="py-3 pr-4 font-normal">LENGTH</th>
                  <th scope="col" className="py-3 font-normal text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody aria-live="polite">
                {rows.map((r) => (
                  <tr key={r.slug} className="border-b border-d2-line hover:bg-d2-plate">
                    <td className="py-5 pr-4 align-top">
                      <span className="font-d2-mono text-[11px] px-2 py-1 bg-d2-graphite text-white whitespace-nowrap">{r.type.toUpperCase()}</span>
                    </td>
                    <td className="py-5 pr-4">
                      <Link to={P.resource(r.slug)} className="font-d2-display font-bold uppercase text-[22px] leading-none hover:text-d2-signal">
                        {r.title}
                      </Link>
                      <p className="mt-1.5 text-[14px] text-d2-slate max-w-xl">{r.excerpt}</p>
                    </td>
                    <td className="py-5 pr-4 font-d2-mono text-[12px] whitespace-nowrap align-top">{formatDate(r.date, 'short').toUpperCase()}</td>
                    <td className="py-5 pr-4 font-d2-mono text-[12px] whitespace-nowrap align-top">{r.readTime.toUpperCase()}</td>
                    <td className="py-5 align-top text-right whitespace-nowrap">
                      <Link to={P.resource(r.slug)} className="inline-block font-d2-display uppercase text-[15px] px-3 py-1.5 border border-d2-graphite hover:bg-d2-graphite hover:text-white">
                        Read
                      </Link>
                      {r.downloadable && (
                        <button type="button" onClick={() => downloadResource(r)} className="ml-2 inline-flex items-center gap-1 font-d2-display uppercase text-[15px] px-3 py-1.5 bg-d2-signal text-white hover:bg-d2-signaldark" aria-label={`Download sample of ${r.title}`}>
                          <Download size={14} aria-hidden /> Sample*
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length === 0 && <p className="py-12 font-d2-mono text-[13px] text-d2-slate">NO MATCHING RESOURCES. ADJUST SEARCH OR FILTER.</p>}
          </div>
          <p className="mt-4 font-d2-mono text-[11px] text-d2-slate">* Downloads generate a sample text file for demonstration.</p>
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
    <>
      <PageHead titleAs="p" index="09" title={r.type} image={r.image.src} crumbs={[{ label: 'Resources', to: P.resources }, { label: r.type }]} />
      <section className="py-16 lg:py-24">
        <Wrap className="grid lg:grid-cols-[260px_1fr] gap-12">
          <nav aria-label="Document contents" className="lg:sticky lg:top-[110px] self-start border-t-2 border-d2-graphite pt-4">
            <p className="font-d2-mono text-[11px] tracking-[0.12em] text-d2-slate">CONTENTS</p>
            <ol className="mt-3 space-y-2">
              {r.sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#sec-${i}`} className="flex gap-3 font-d2-display uppercase text-[16px] hover:text-d2-signal">
                    <span className="font-d2-mono text-[11px] pt-1 text-d2-signal">{i + 1}.0</span>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
            {r.downloadable && (
              <ActionButton type="button" className="mt-8 w-full" onClick={() => downloadResource(r)}>
                Download <Download size={18} aria-hidden />
              </ActionButton>
            )}
          </nav>
          <article className="max-w-3xl">
            <div className="flex flex-wrap gap-3 items-center font-d2-mono text-[12px] text-d2-slate">
              <span>{r.author.toUpperCase()}</span>·<span>{formatDate(r.date, 'short').toUpperCase()}</span>·<span>{r.readTime.toUpperCase()}</span>
              <Illustrative />
            </div>
            <Display as="h1" className="mt-5 text-[44px] sm:text-[60px]">
              {r.title}
            </Display>
            <p className="mt-6 text-[20px] leading-relaxed text-d2-graphite/80">{r.excerpt}</p>
            {r.sections.map((s, i) => (
              <section key={s.heading} id={`sec-${i}`} className="scroll-mt-28 mt-12 pt-6 border-t border-d2-line">
                <Tag index={`${i + 1}.0`}>{s.heading}</Tag>
                <h2 className="mt-3 font-d2-display font-bold uppercase text-[32px] leading-none">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mt-4 text-[18px] leading-relaxed text-d2-graphite/85">
                    {p}
                  </p>
                ))}
              </section>
            ))}
            <Link to={P.resources} className="mt-14 inline-flex items-center gap-2 font-d2-display uppercase text-[17px] hover:text-d2-signal">
              <ArrowLeft size={18} aria-hidden /> Back to library
            </Link>
          </article>
        </Wrap>
      </section>
    </>
  );
}
