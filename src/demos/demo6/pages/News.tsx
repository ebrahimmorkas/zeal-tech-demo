import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Play } from 'lucide-react';
import { news, newsCategories, getNews, formatDate } from '../../../data/news';
import { Frame, Go, H, Label, P, PageHead, Photo, Sample, Wipe, narrow, useMeta, wide } from '../ui';
import NotFound from './NotFound';

export default function News() {
  useMeta('News', 'Announcements, operational news, events and video from the group (sample content).');
  const [cat, setCat] = useState<(typeof newsCategories)[number]>('All');
  const items = news.filter((n) => cat === 'All' || n.category === cat);
  const [lead, ...rest] = items;
  const count = (c: string) => (c === 'All' ? news.length : news.filter((n) => n.category === c).length);

  return (
    <>
      <PageHead n="05" title={<>News<span className="text-d6-red">.</span></>} intro="Announcements, project updates, events and video." crumbs={[{ label: 'News' }]} />
      <section className="py-12 lg:py-16">
        <Frame>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div role="tablist" aria-label="Filter by category" className="flex flex-wrap border-[3px] border-d6-ink">
              {newsCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={cat === c}
                  onClick={() => setCat(c)}
                  className={`h-12 px-4 text-[13px] font-bold uppercase tracking-[0.1em] border-r last:border-r-0 border-d6-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-d6-red ${cat === c ? 'bg-d6-ink text-white' : 'hover:bg-d6-grey'}`}
                  style={narrow}
                >
                  {c === 'Video' ? 'Video' : c} <sup className="text-d6-red tabular-nums">{count(c)}</sup>
                </button>
              ))}
            </div>
            <Sample>Fictional items · illustrative dates</Sample>
          </div>

          <div aria-live="polite">
            {lead && (
              <Link key={lead.slug} to={P.article(lead.slug)} className="group mt-12 grid lg:grid-cols-12 gap-8 items-end border-b-[3px] border-d6-ink pb-12 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-d6-red">
                <Wipe className="lg:col-span-7">
                  <div className="relative">
                    <Photo src={lead.image.src} alt={lead.image.alt} imgClass="aspect-[16/9]" />
                    {lead.category === 'Video' && (
                      <span className="absolute bottom-0 left-0 grid place-items-center w-16 h-16 bg-d6-red text-white">
                        <Play size={24} aria-hidden />
                      </span>
                    )}
                  </div>
                </Wipe>
                <div className="lg:col-span-5">
                  <p className="flex gap-4 text-[12px] font-bold uppercase tracking-[0.14em]" style={narrow}>
                    <span className="text-d6-red">{lead.category}</span>
                    <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                  </p>
                  <h2 className="mt-4 font-d6-sans font-extrabold text-[32px] sm:text-[44px] leading-[0.98] tracking-[-0.045em] group-hover:text-d6-red transition-colors" style={wide}>
                    {lead.title}
                  </h2>
                  <p className="mt-4 text-[17px] text-d6-ink/75">{lead.excerpt}</p>
                </div>
              </Link>
            )}

            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
              {rest.map((n) => (
                <li key={n.slug} className="border-b border-d6-line">
                  <Link to={P.article(n.slug)} className="group flex flex-col h-full py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-d6-red">
                    <div className="flex items-baseline justify-between text-[12px] font-bold uppercase tracking-[0.12em]" style={narrow}>
                      <span className="text-d6-red">{n.category}</span>
                      <time dateTime={n.date} className="tabular-nums">
                        {formatDate(n.date, 'short')}
                      </time>
                    </div>
                    <div className="relative mt-4 overflow-hidden">
                      <img src={n.image.sm} alt="" className="w-full aspect-[3/2] object-cover grayscale group-hover:grayscale-0 transition duration-500" loading="lazy" />
                      {n.category === 'Video' && (
                        <span className="absolute bottom-0 left-0 grid place-items-center w-11 h-11 bg-d6-red text-white">
                          <Play size={18} aria-hidden />
                        </span>
                      )}
                    </div>
                    <h2 className="mt-4 text-[20px] font-bold leading-snug tracking-[-0.02em] group-hover:underline decoration-d6-red decoration-[3px] underline-offset-4">{n.title}</h2>
                    <span className="mt-auto pt-4 inline-flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.12em] text-d6-mid group-hover:text-d6-red" style={narrow}>
                      Read <ArrowUpRight size={14} aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Frame>
      </section>
    </>
  );
}

export function NewsDetail() {
  const { slug } = useParams();
  const n = getNews(slug);
  const [play, setPlay] = useState(false);
  useMeta(n ? n.title : 'Not found', n ? n.excerpt : 'Article not found.');
  if (!n) return <NotFound />;
  const idx = news.indexOf(n);
  const related = news.filter((x) => x.slug !== n.slug).slice(0, 3);
  return (
    <>
      <article>
        <header className="pt-10 lg:pt-16 pb-10 border-b-[3px] border-d6-ink">
          <Frame>
            <nav aria-label="Breadcrumb" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-d6-mid" style={narrow}>
              <Link to={P.home} className="hover:text-d6-red">
                Index
              </Link>{' '}
              /{' '}
              <Link to={P.news} className="hover:text-d6-red">
                News
              </Link>{' '}
              / <span className="text-d6-ink">No. {String(idx + 1).padStart(3, '0')}</span>
            </nav>
            <div className="mt-10 grid lg:grid-cols-12 gap-6">
              <dl className="lg:col-span-2 text-[12px] font-bold uppercase tracking-[0.12em] space-y-3" style={narrow}>
                <div>
                  <dt className="text-d6-mid">Category</dt>
                  <dd className="text-d6-red">{n.category}</dd>
                </div>
                <div>
                  <dt className="text-d6-mid">Date</dt>
                  <dd>
                    <time dateTime={n.date}>{formatDate(n.date)}</time>
                  </dd>
                </div>
                {n.company && (
                  <div>
                    <dt className="text-d6-mid">Company</dt>
                    <dd>{n.company}</dd>
                  </div>
                )}
              </dl>
              <div className="lg:col-span-10">
                <Wipe immediate>
                  <H as="h1" className="text-[38px] sm:text-[60px] xl:text-[76px]">
                    {n.title}
                  </H>
                </Wipe>
                <p className="mt-6 text-[20px] leading-[1.45] text-d6-ink/80 max-w-3xl">{n.excerpt}</p>
              </div>
            </div>
          </Frame>
        </header>
        <Frame className="py-12 lg:py-16 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 lg:col-start-3">
            {n.category === 'Video' ? (
              <div className="relative aspect-video bg-d6-ink">
                {!play ? (
                  <button type="button" onClick={() => setPlay(true)} aria-label={`Play video: ${n.title}`} className="group absolute inset-0">
                    <img src={n.image.src} alt="" className="absolute inset-0 w-full h-full object-cover grayscale opacity-80" />
                    <span className="absolute left-0 bottom-0 flex items-center gap-3 h-16 px-6 bg-d6-red text-white text-[14px] font-bold uppercase tracking-[0.1em]" style={narrow}>
                      <Play size={20} aria-hidden /> Play · {n.duration}
                    </span>
                  </button>
                ) : (
                  <div role="status" className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                    <Label n="▶" className="text-white">
                      Video placeholder · {n.duration}
                    </Label>
                    <p className="mt-3 max-w-md text-white/75">Client-supplied footage will be embedded here. No third-party video is shown.</p>
                    <button type="button" onClick={() => setPlay(false)} className="mt-4 self-start underline underline-offset-4 text-[13px] font-bold uppercase tracking-[0.1em]">
                      Reset
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Photo src={n.image.src} alt={n.image.alt} imgClass="aspect-[16/9]" />
            )}
            <div className="mt-10 space-y-6 text-[18px] leading-[1.65]">
              {n.body.map((p, i) => (
                <p key={p} className={i === 0 ? 'text-[21px] font-semibold leading-[1.5]' : 'text-d6-ink/80'}>
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-12">
              <Go to={P.news} tone="line" className="min-w-[220px]">
                <span className="inline-flex items-center gap-2">
                  <ArrowLeft size={16} aria-hidden /> All news
                </span>
              </Go>
            </div>
          </div>
        </Frame>
      </article>
      <section className="py-14 bg-d6-grey">
        <Frame>
          <Label n="+">Further reading</Label>
          <ul className="mt-6 grid md:grid-cols-3 gap-6">
            {related.map((r) => (
              <li key={r.slug}>
                <Link to={P.article(r.slug)} className="block bg-white p-6 border-t-[6px] border-d6-ink hover:border-d6-red h-full">
                  <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-d6-red" style={narrow}>
                    {r.category}
                  </p>
                  <p className="mt-3 font-bold text-[18px] leading-snug">{r.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Frame>
      </section>
    </>
  );
}
