import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, Download } from 'lucide-react';
import { resources, resourceTypes, getResource } from '../../../data/resources';
import { formatDate } from '../../../data/news';
import { downloadResource } from '../../../lib/download';
import { Btn, Cue, Dolly, Go, P, ROMAN, Sample, Stage, Title, TitleCard, useMeta } from '../ui';
import NotFound from './NotFound';

export default function Resources() {
  useMeta('Archive', 'Essays, whitepapers and technical notes from the group (sample content).');
  const [q, setQ] = useState('');
  const [type, setType] = useState<(typeof resourceTypes)[number]>('All');
  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    return resources.filter((r) => (type === 'All' || r.type === type) && (!s || [r.title, r.excerpt, ...r.tags].join(' ').toLowerCase().includes(s)));
  }, [q, type]);
  return (
    <>
      <TitleCard scene="VII" title="The Archive" intro="Essays, whitepapers and technical notes." crumbs={[{ label: 'Archive' }]} />
      <section className="pb-24 lg:pb-32">
        <Stage>
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end border-b border-d9-graphite pb-8">
            <div>
              <label htmlFor="d9-search" className="font-d9-sans text-[11px] uppercase tracking-[0.36em] text-d9-smoke">
                Search the archive
              </label>
              <input id="d9-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type a subject…" className="mt-3 w-full bg-transparent border-0 border-b border-d9-graphite focus:border-d9-bone focus:outline-none focus:ring-0 py-3 font-d9-serif italic text-[30px] sm:text-[40px] text-d9-bone placeholder:text-d9-graphite" />
            </div>
            <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-x-7 gap-y-2">
              {resourceTypes.map((t) => (
                <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(t)} className={`h-10 font-d9-sans text-[12px] uppercase tracking-[0.3em] ${type === t ? 'text-d9-bone underline underline-offset-[10px]' : 'text-d9-smoke hover:text-d9-ash'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-6 font-d9-sans text-[12px] uppercase tracking-[0.3em] text-d9-smoke" aria-live="polite">
            {items.length} {items.length === 1 ? 'entry' : 'entries'}
          </p>
          <ol className="mt-6">
            {items.map((r) => (
              <li key={r.slug} className="border-t border-d9-graphite">
                <Link to={P.resource(r.slug)} className="group grid md:grid-cols-[80px_1fr_220px_40px] gap-3 md:gap-10 items-baseline py-9 focus-visible:outline focus-visible:outline-1 focus-visible:outline-d9-bone">
                  <span className="font-d9-sans text-[11px] tracking-[0.3em] text-d9-smoke">{ROMAN[resources.indexOf(r)]}</span>
                  <span>
                    <span className="block font-d9-serif text-[28px] sm:text-[36px] leading-[1.08] group-hover:italic">{r.title}</span>
                    <span className="block mt-3 font-d9-sans font-light text-d9-smoke max-w-2xl">{r.excerpt}</span>
                  </span>
                  <span className="font-d9-sans text-[11px] uppercase tracking-[0.3em] text-d9-ash">
                    {r.type} · {r.readTime}
                  </span>
                  <ArrowUpRight className="hidden md:block text-d9-smoke group-hover:text-d9-bone group-hover:rotate-45 transition" aria-hidden />
                </Link>
              </li>
            ))}
          </ol>
          {items.length === 0 && <p className="py-16 text-center font-d9-serif italic text-[28px] text-d9-smoke">Nothing in the archive matches “{q}”.</p>}
          <div className="mt-10">
            <Sample>All entries are original sample text</Sample>
          </div>
        </Stage>
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
      <header>
        <Stage className="pt-36 lg:pt-44 pb-16 max-w-[1100px] text-center">
          <nav aria-label="Breadcrumb" className="font-d9-sans text-[11px] uppercase tracking-[0.36em] text-d9-smoke">
            <Link to={P.home} className="hover:text-d9-bone">
              Nexora
            </Link>{' '}
            /{' '}
            <Link to={P.resources} className="hover:text-d9-bone">
              Archive
            </Link>{' '}
            / <span className="text-d9-bone">{r.type}</span>
          </nav>
          <Cue className="mt-12">
            {r.type} · {r.readTime}
          </Cue>
          <Title as="h1" className="mt-6 text-[40px] sm:text-[66px] leading-[1.02]">
            {r.title}
          </Title>
          <p className="mt-6 font-d9-sans text-[12px] uppercase tracking-[0.3em] text-d9-smoke">
            {r.author} · {formatDate(r.date)}
          </p>
        </Stage>
        <Dolly src={r.image.src} alt={r.image.alt} imgClass="aspect-[21/9] min-h-[240px]" />
      </header>
      <Stage className="py-20 lg:py-28 grid lg:grid-cols-[1fr_260px] gap-16">
        <div className="max-w-[740px]">
          <Title as="p" className="text-[28px] sm:text-[34px] leading-[1.25] italic">
            {r.excerpt}
          </Title>
          {r.sections.map((s, i) => (
            <section key={s.heading} id={`act-${i + 1}`} className="mt-16 scroll-mt-28">
              <Cue>{ROMAN[i]}</Cue>
              <h2 className="mt-3 font-d9-serif text-[34px]">{s.heading}</h2>
              <div className="mt-5 space-y-5 font-d9-sans font-light text-[18px] leading-[1.9] text-d9-ash">
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
          <div className="mt-16">
            <Go to={P.resources}>Back to the archive</Go>
          </div>
        </div>
        <aside className="lg:sticky lg:top-32 self-start space-y-10">
          <div>
            <Cue>Contents</Cue>
            <ol className="mt-4 space-y-3">
              {r.sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#act-${i + 1}`} className="font-d9-serif text-[19px] text-d9-ash hover:text-d9-bone hover:italic">
                    {ROMAN[i]}. {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>
          {r.downloadable && (
            <Btn type="button" onClick={() => downloadResource(r)} className="w-full">
              <Download size={16} aria-hidden /> Download
            </Btn>
          )}
          <p className="font-d9-sans text-[11px] uppercase tracking-[0.3em] text-d9-smoke">{r.tags.join(' · ')}</p>
        </aside>
      </Stage>
    </article>
  );
}
