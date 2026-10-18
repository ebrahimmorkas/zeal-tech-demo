import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Search } from 'lucide-react';
import { resources, resourceTypes, getResource } from '../../../data/resources';
import { formatDate } from '../../../data/news';
import { downloadResource } from '../../../lib/download';
import { Button, Container, Eyebrow, Heading, P, PageBanner, SampleTag, useMeta } from '../ui';
import NotFound from './NotFound';

export default function Resources() {
  useMeta('Resource Centre', 'Blogs, whitepapers and technical articles from across the group (original sample content).');
  const [type, setType] = useState<(typeof resourceTypes)[number]>('All');
  const [q, setQ] = useState('');
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return resources.filter(
      (r) => (type === 'All' || r.type === type) && (!term || [r.title, r.excerpt, ...r.tags].join(' ').toLowerCase().includes(term)),
    );
  }, [type, q]);

  return (
    <>
      <PageBanner title="Resource Centre" intro="Perspectives, research and technical guidance from our companies." image="/images/desk-flatlay.jpg" crumbs={[{ label: 'Resource Centre' }]} />
      <section className="py-16 lg:py-24">
        <Container className="grid lg:grid-cols-[280px_1fr] gap-12">
          <aside className="space-y-8 lg:sticky lg:top-[120px] self-start">
            <div>
              <label htmlFor="d1-res-search" className="text-[12px] uppercase tracking-[0.16em] font-semibold text-d1-navy">
                Search resources
              </label>
              <div className="relative mt-3">
                <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-d1-muted" aria-hidden />
                <input id="d1-res-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Keyword or topic" className="w-full h-12 pl-11 pr-4 bg-white border border-d1-stone focus:outline-none focus:border-d1-navy" />
              </div>
            </div>
            <fieldset>
              <legend className="text-[12px] uppercase tracking-[0.16em] font-semibold text-d1-navy">Type</legend>
              <ul className="mt-3 border-t border-d1-stone">
                {resourceTypes.map((t) => (
                  <li key={t}>
                    <label className={`flex items-center justify-between py-3 border-b border-d1-stone cursor-pointer ${type === t ? 'text-d1-navy font-semibold' : 'text-d1-muted hover:text-d1-navy'}`}>
                      <span className="flex items-center gap-3">
                        <input type="radio" name="d1-type" checked={type === t} onChange={() => setType(t)} className="accent-d1-navy" />
                        {t === 'All' ? 'All resources' : `${t}s`}
                      </span>
                      <span className="text-[13px]">{t === 'All' ? resources.length : resources.filter((r) => r.type === t).length}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
          </aside>

          <div>
            <p className="text-[14px] text-d1-muted" aria-live="polite">
              {results.length} {results.length === 1 ? 'resource' : 'resources'} found
            </p>
            <ul className="mt-6 divide-y divide-d1-stone border-y border-d1-stone">
              {results.map((r) => (
                <li key={r.slug} className="py-8 grid sm:grid-cols-[200px_1fr] gap-6">
                  <img src={r.image.sm} alt="" className="w-full aspect-[4/3] object-cover" loading="lazy" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-d1-gold">
                      {r.type} · {r.readTime}
                    </p>
                    <h2 className="mt-2 font-d1-serif text-[26px] font-semibold leading-snug text-d1-navy">
                      <Link to={P.resource(r.slug)} className="hover:text-d1-gold">
                        {r.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-d1-muted leading-relaxed">{r.excerpt}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-5 text-[13px]">
                      <Link to={P.resource(r.slug)} className="font-semibold uppercase tracking-[0.14em] text-d1-navy hover:text-d1-gold">
                        Read {r.type === 'Blog' ? 'article' : r.type.toLowerCase()}
                      </Link>
                      {r.downloadable && (
                        <button type="button" onClick={() => downloadResource(r)} className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.14em] text-d1-muted hover:text-d1-navy">
                          <Download size={14} aria-hidden /> Download sample
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {results.length === 0 && (
              <div className="py-16 text-center">
                <p className="font-d1-serif text-[26px] text-d1-navy">No resources match your search.</p>
                <button type="button" onClick={() => { setQ(''); setType('All'); }} className="mt-4 text-[13px] uppercase tracking-[0.14em] font-semibold text-d1-gold underline underline-offset-4">
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}

export function ResourceDetail() {
  const { slug } = useParams();
  const r = getResource(slug);
  useMeta(r ? r.title : 'Resource not found', r ? r.excerpt : 'The requested resource could not be found.');
  if (!r) return <NotFound />;
  return (
    <>
      <PageBanner title={r.title} image={r.image.src} crumbs={[{ label: 'Resource Centre', to: P.resources }, { label: r.type }]} />
      <section className="py-16 lg:py-24">
        <Container className="grid lg:grid-cols-[1fr_300px] gap-16">
          <article>
            <div className="flex flex-wrap items-center gap-3 text-[14px] text-d1-muted">
              <span className="font-semibold text-d1-navy">{r.author}</span>·<time dateTime={r.date}>{formatDate(r.date)}</time>·<span>{r.readTime}</span>
              <SampleTag>Sample {r.type.toLowerCase()}</SampleTag>
            </div>
            <p className="mt-8 font-d1-serif text-[26px] leading-snug text-d1-navy">{r.excerpt}</p>
            <div className="mt-10 space-y-10 max-w-[68ch]">
              {r.sections.map((s) => (
                <section key={s.heading}>
                  <h2 className="font-d1-serif text-[30px] font-semibold text-d1-navy">{s.heading}</h2>
                  {s.paragraphs.map((p) => (
                    <p key={p} className="mt-4 text-[18px] leading-[1.85] text-d1-ink/85">
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </div>
            <Link to={P.resources} className="mt-14 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-d1-navy hover:text-d1-gold">
              <ArrowLeft size={15} aria-hidden /> Back to Resource Centre
            </Link>
          </article>
          <aside className="space-y-6 self-start lg:sticky lg:top-[120px]">
            <div className="bg-d1-navy text-white p-8">
              <FileText className="text-d1-goldlight" size={30} strokeWidth={1.3} aria-hidden />
              <p className="mt-4 font-d1-serif text-[24px]">{r.downloadable ? 'Download this resource' : 'Share this article'}</p>
              <p className="mt-2 text-[14px] text-white/70">{r.downloadable ? 'A sample text version is generated for demonstration.' : 'This article is available to read online.'}</p>
              {r.downloadable && (
                <Button type="button" variant="gold" className="mt-6 w-full" onClick={() => downloadResource(r)}>
                  <Download size={15} aria-hidden /> Download
                </Button>
              )}
            </div>
            <div className="bg-white border border-d1-stone p-8">
              <Eyebrow>Topics</Eyebrow>
              <ul className="mt-4 flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <li key={t} className="text-[13px] px-3 py-1.5 bg-d1-ivory text-d1-navy">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <Heading as="h2" className="sr-only">
              Resource details
            </Heading>
          </aside>
        </Container>
      </section>
    </>
  );
}
