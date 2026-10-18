import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Search } from 'lucide-react';
import { news, newsCategories, getNews, formatDate } from '../../../data/news';
import type { NewsItem } from '../../../types';
import { Card, H, Label, Mono, P, PageTop, Rise, SampleChip, Shell, useMeta } from '../ui';
import NotFound from './NotFound';

const dot: Record<string, string> = { News: 'bg-d4-indigo', Announcement: 'bg-amber-400', Event: 'bg-d4-teal', Video: 'bg-rose-400' };

function Tile({ n, wide }: { n: NewsItem; wide?: boolean }) {
  return (
    <Link to={P.article(n.slug)} className={`group block h-full rounded-2xl bg-white ring-1 ring-[#e4e8f2] overflow-hidden hover:ring-d4-indigo/40 hover:-translate-y-0.5 transition-all ${wide ? 'md:grid md:grid-cols-[1.2fr_1fr]' : ''}`}>
      <div className="relative overflow-hidden">
        <img src={wide ? n.image.src : n.image.sm} alt={n.image.alt} className={`w-full object-cover ${wide ? 'h-full min-h-[260px]' : 'aspect-[16/10]'}`} loading="lazy" />
        {n.category === 'Video' && (
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid place-items-center w-14 h-14 rounded-full bg-white/90 backdrop-blur text-d4-deep group-hover:scale-110 transition-transform">
              <Play size={20} className="ml-0.5" aria-label="Video" />
            </span>
          </span>
        )}
      </div>
      <div className={`p-6 ${wide ? 'sm:p-8 flex flex-col justify-center' : ''}`}>
        <p className="flex items-center gap-2 font-d4-mono text-[11.5px] text-d4-deep/55">
          <span className={`w-2 h-2 rounded-full ${dot[n.category]}`} aria-hidden />
          {n.category.toLowerCase()} · {formatDate(n.date, 'short')}
        </p>
        <h3 className={`mt-2 font-d4-display tracking-[-0.02em] group-hover:text-d4-indigo transition-colors ${wide ? 'text-[28px] leading-tight' : 'text-[19px] leading-snug'}`}>{n.title}</h3>
        <p className="mt-2 text-[14.5px] text-d4-deep/65">{n.excerpt}</p>
      </div>
    </Link>
  );
}

export default function News() {
  useMeta('Newsroom', 'News, announcements, events and video from the group (sample content).');
  const [cat, setCat] = useState<(typeof newsCategories)[number]>('All');
  const [q, setQ] = useState('');
  const list = useMemo(() => news.filter((n) => (cat === 'All' || n.category === cat) && (!q.trim() || `${n.title} ${n.excerpt}`.toLowerCase().includes(q.toLowerCase()))), [cat, q]);
  const featured = cat === 'All' && !q ? news.find((n) => n.featured) : undefined;
  const rest = featured ? list.filter((n) => n.slug !== featured.slug) : list;

  return (
    <>
      <PageTop label="newsroom" title={<>News, events & video.</>} intro="Updates from across the group’s business units." crumbs={[{ label: 'Newsroom' }]} />
      <section className="py-16 lg:py-24">
        <Shell>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div role="tablist" aria-label="Category" className="inline-flex p-1 rounded-full bg-white ring-1 ring-[#e4e8f2] overflow-x-auto no-scrollbar max-w-full">
              {newsCategories.map((c) => (
                <button key={c} type="button" role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`shrink-0 h-9 px-4 rounded-full text-[14px] transition-colors ${cat === c ? 'bg-d4-deep text-white' : 'text-d4-deep/70 hover:text-d4-deep'}`}>
                  {c === 'All' ? 'All' : c === 'Video' ? 'Videos' : `${c}s`}
                </button>
              ))}
            </div>
            <div className="relative md:w-72">
              <label htmlFor="d4-news-q" className="sr-only">
                Search news
              </label>
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-d4-deep/40" aria-hidden />
              <input id="d4-news-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search newsroom" className="w-full h-11 pl-10 pr-4 rounded-full bg-white ring-1 ring-[#e4e8f2] focus:outline-none focus:ring-2 focus:ring-d4-indigo text-[14.5px]" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <SampleChip />
            <Mono className="text-d4-deep/50">{list.length} items · dates are illustrative</Mono>
          </div>
          {featured && (
            <div className="mt-8">
              <Tile n={featured} wide />
            </div>
          )}
          <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" aria-live="polite">
            {rest.map((n, i) => (
              <li key={n.slug}>
                <Rise delay={(i % 3) * 0.05} className="h-full">
                  <Tile n={n} />
                </Rise>
              </li>
            ))}
          </ul>
          {list.length === 0 && (
            <Card className="mt-8 p-10 text-center">
              <p className="font-d4-display text-[20px]">No results</p>
              <p className="mt-1 text-d4-deep/60">Try another keyword or category.</p>
            </Card>
          )}
        </Shell>
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
      <PageTop label={`newsroom / ${n.category.toLowerCase()}`} title={n.title} intro={n.excerpt} crumbs={[{ label: 'Newsroom', to: P.news }, { label: n.category }]} />
      <section className="py-14 lg:py-20">
        <Shell className="max-w-[860px]">
          <div className="rounded-[24px] overflow-hidden bg-d4-void relative aspect-video">
            {n.category === 'Video' && !play ? (
              <button type="button" className="group absolute inset-0" onClick={() => setPlay(true)} aria-label={`Play video: ${n.title}`}>
                <img src={n.image.src} alt="" className="absolute inset-0 w-full h-full object-cover opacity-75" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid place-items-center w-20 h-20 rounded-full bg-white text-d4-deep group-hover:scale-105 transition-transform shadow-2xl">
                    <Play size={26} className="ml-1" aria-hidden />
                  </span>
                </span>
              </button>
            ) : n.category === 'Video' ? (
              <div role="status" className="absolute inset-0 grid place-items-center text-center text-white p-8">
                <div>
                  <Mono className="text-d4-teal">video_placeholder · {n.duration}</Mono>
                  <p className="mt-3 max-w-md text-d4-haze">The client’s own video will stream here. No unrelated third-party video is embedded.</p>
                  <button type="button" onClick={() => setPlay(false)} className="mt-5 text-[14px] underline underline-offset-4">
                    Back to poster
                  </button>
                </div>
              </div>
            ) : (
              <img src={n.image.src} alt={n.image.alt} className="absolute inset-0 w-full h-full object-cover" />
            )}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Label>{formatDate(n.date)}</Label>
            {n.company && <Mono className="text-d4-deep/55">· {n.company}</Mono>}
            <SampleChip />
          </div>
          <article className="mt-6 space-y-5 text-[18px] leading-relaxed text-d4-deep/80">
            {n.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </article>
          <Link to={P.news} className="mt-12 inline-flex items-center gap-2 text-[15px] font-medium text-d4-indigo">
            <ArrowLeft size={16} aria-hidden /> Back to newsroom
          </Link>
          <H as="h2" className="sr-only">
            End of article
          </H>
        </Shell>
      </section>
    </>
  );
}
