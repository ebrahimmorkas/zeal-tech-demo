import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, LayoutGrid, List, Play } from 'lucide-react';
import { news, newsCategories, getNews, formatDate } from '../../../data/news';
import { Btn, Display, Illustrative, P, PageHead, Tag, Wrap, useMeta } from '../ui';
import NotFound from './NotFound';

export default function News() {
  useMeta('News & Videos', 'Operational news, announcements, events and video from the group (sample content).');
  const [cat, setCat] = useState<(typeof newsCategories)[number]>('All');
  const [view, setView] = useState<'list' | 'grid'>('list');
  const items = news.filter((n) => cat === 'All' || n.category === cat);
  const videos = news.filter((n) => n.category === 'Video');

  return (
    <>
      <PageHead index="05" title="News & media" intro="Announcements, project updates, events and video from across the group." image="/images/conference-dark.jpg" crumbs={[{ label: 'News' }]} />

      <section className="bg-d2-plate py-16">
        <Wrap>
          <Tag index="V">Video highlights</Tag>
          <ul className="mt-8 grid md:grid-cols-2 gap-6">
            {videos.map((v) => (
              <li key={v.slug}>
                <Link to={P.article(v.slug)} className="group relative block aspect-video overflow-hidden bg-d2-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-d2-signal">
                  <img src={v.image.sm} alt={v.image.alt} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid place-items-center w-16 h-16 bg-d2-signal text-white">
                      <Play size={24} aria-hidden />
                    </span>
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-d2-graphite text-white">
                    <span className="font-d2-mono text-[11px] text-d2-signal">VIDEO · {v.duration}</span>
                    <span className="block font-d2-display font-bold uppercase text-[24px] leading-none mt-1">{v.title.replace('Video: ', '')}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      <section className="py-16 lg:py-24">
        <Wrap>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-d2-graphite pb-4">
            <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-1">
              {newsCategories.map((c) => (
                <button
                  key={c}
                  role="tab"
                  type="button"
                  aria-selected={cat === c}
                  onClick={() => setCat(c)}
                  className={`h-11 px-4 font-d2-display uppercase text-[16px] tracking-[0.05em] transition-colors ${cat === c ? 'bg-d2-graphite text-white' : 'hover:bg-d2-plate'}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Illustrative />
              <div role="group" aria-label="Layout" className="flex border border-d2-line">
                <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')} className={`grid place-items-center w-11 h-11 ${view === 'list' ? 'bg-d2-graphite text-white' : ''}`} aria-label="List view">
                  <List size={18} />
                </button>
                <button type="button" aria-pressed={view === 'grid'} onClick={() => setView('grid')} className={`grid place-items-center w-11 h-11 ${view === 'grid' ? 'bg-d2-graphite text-white' : ''}`} aria-label="Grid view">
                  <LayoutGrid size={18} />
                </button>
              </div>
            </div>
          </div>

          {view === 'list' ? (
            <ol aria-live="polite">
              {items.map((n) => (
                <li key={n.slug} className="border-b border-d2-line">
                  <Link to={P.article(n.slug)} className="group grid grid-cols-[1fr_auto] md:grid-cols-[140px_130px_1fr_160px_32px] gap-4 md:gap-6 items-center py-6 hover:bg-d2-plate focus-visible:outline focus-visible:outline-2 focus-visible:outline-d2-signal">
                    <time dateTime={n.date} className="font-d2-mono text-[13px] text-d2-slate pl-1 col-span-2 md:col-span-1">{formatDate(n.date, 'short').toUpperCase()}</time>
                    <span className="hidden md:block font-d2-mono text-[12px] text-d2-signal">{n.category.toUpperCase()}</span>
                    <span>
                      <span className="block font-d2-display font-bold uppercase text-[24px] sm:text-[28px] leading-none group-hover:text-d2-signal">{n.title}</span>
                      <span className="block mt-2 text-[15px] text-d2-slate">{n.excerpt}</span>
                    </span>
                    <img src={n.image.sm} alt="" className="hidden md:block w-[160px] aspect-[16/10] object-cover grayscale group-hover:grayscale-0 transition" loading="lazy" />
                    <ArrowUpRight className="text-d2-slate group-hover:text-d2-signal" aria-hidden />
                  </Link>
                </li>
              ))}
            </ol>
          ) : (
            <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-live="polite">
              {items.map((n) => (
                <li key={n.slug}>
                  <Link to={P.article(n.slug)} className="group block border border-d2-line h-full hover:border-d2-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-d2-signal">
                    <img src={n.image.sm} alt={n.image.alt} className="w-full aspect-[16/10] object-cover" loading="lazy" />
                    <div className="p-6">
                      <p className="font-d2-mono text-[11px] text-d2-signal">
                        {n.category.toUpperCase()} · {formatDate(n.date, 'short').toUpperCase()}
                      </p>
                      <p className="mt-2 font-d2-display font-bold uppercase text-[24px] leading-none group-hover:text-d2-signal">{n.title}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Wrap>
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
  return (
    <>
      <PageHead titleAs="p" index="05" title={n.category === 'Video' ? 'Video' : n.category} image={n.image.src} crumbs={[{ label: 'News', to: P.news }, { label: n.category }]} />
      <section className="py-16 lg:py-24">
        <Wrap className="grid lg:grid-cols-[280px_1fr] gap-12">
          <aside className="font-d2-mono text-[12px] space-y-5 lg:sticky lg:top-[110px] self-start border-t-2 border-d2-graphite pt-5">
            <div>
              <p className="text-d2-slate">DATE</p>
              <p>{formatDate(n.date).toUpperCase()}</p>
            </div>
            <div>
              <p className="text-d2-slate">CATEGORY</p>
              <p>{n.category.toUpperCase()}</p>
            </div>
            {n.company && (
              <div>
                <p className="text-d2-slate">COMPANY</p>
                <p>{n.company.toUpperCase()}</p>
              </div>
            )}
            <Illustrative />
          </aside>
          <article className="max-w-3xl">
            <Display as="h1" className="text-[44px] sm:text-[64px]">
              {n.title}
            </Display>
            <p className="mt-6 text-[20px] text-d2-graphite/80 leading-relaxed">{n.excerpt}</p>
            {n.category === 'Video' && (
              <div className="mt-10 relative aspect-video bg-d2-graphite">
                {!play ? (
                  <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0" aria-label={`Play video: ${n.title}`}>
                    <img src={n.image.src} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" />
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid place-items-center w-20 h-20 bg-d2-signal text-white group-hover:scale-105 transition-transform">
                        <Play size={30} aria-hidden />
                      </span>
                    </span>
                  </button>
                ) : (
                  <div role="status" className="absolute inset-0 grid place-items-center text-center text-white p-8 font-d2-mono text-[13px]">
                    <div>
                      <p className="text-d2-signal">// VIDEO PLACEHOLDER — {n.duration}</p>
                      <p className="mt-3 max-w-md text-white/70 font-d2-sans text-[16px]">Client-supplied footage will be embedded here. No third-party video is shown to avoid misrepresenting the company.</p>
                      <button type="button" onClick={() => setPlay(false)} className="mt-5 underline underline-offset-4">
                        RESET
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="mt-10 space-y-5 text-[18px] leading-relaxed text-d2-graphite/85">
              {n.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
              <Btn to={P.news} variant="ghost">
                <span className="inline-flex items-center gap-2">
                  <ArrowLeft size={16} aria-hidden /> All news
                </span>
              </Btn>
            </div>
          </article>
        </Wrap>
      </section>
    </>
  );
}
