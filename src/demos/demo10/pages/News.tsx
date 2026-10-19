import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import { news, newsCategories, getNews, formatDate } from '../../../data/news';
import { Bento, Bloom, Chip, Display, Go, P, Sample, Shell, tile, useMeta } from '../ui';
import NotFound from './NotFound';

const catTone: Record<string, string> = { News: 'bg-d10-sky text-[#244b8a]', Announcement: 'bg-[#efe3ff] text-d10-deep', Event: 'bg-d10-peach text-[#8a3b12]', Video: 'bg-d10-mint text-[#0e6b47]' };

export default function News() {
  useMeta('News', 'News, announcements, events and video from the group (sample content).');
  const [cat, setCat] = useState<(typeof newsCategories)[number]>('All');
  const items = news.filter((n) => cat === 'All' || n.category === cat);
  return (
    <>
      <Bento eyebrow="Newsroom" title="What’s happening" intro="News, announcements, events and video." image="/images/keynote.jpg" crumbs={[{ label: 'News' }]} aside={<Sample>Fictional items · illustrative dates</Sample>} />
      <section className="pt-10 pb-6">
        <Shell>
          <div role="tablist" aria-label="Filter by category" className="inline-flex flex-wrap p-1 rounded-full bg-white/70 border border-white">
            {newsCategories.map((c) => (
              <button key={c} type="button" role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`relative h-10 px-4 rounded-full text-[14px] font-semibold ${cat === c ? 'text-white' : 'text-d10-mute hover:text-d10-ink'}`}>
                {cat === c && <motion.span layoutId="d10-news-pill" className="absolute inset-0 rounded-full bg-d10-violet" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="relative">{c === 'Video' ? 'Video' : c}</span>
              </button>
            ))}
          </div>
          <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-live="polite">
            {items.map((n, i) => {
              const big = i === 0;
              return (
                <li key={n.slug} className={big ? 'sm:col-span-2 lg:row-span-2' : ''}>
                  <Bloom delay={(i % 4) * 0.04} className="h-full">
                    <Link to={P.article(n.slug)} className={`group flex flex-col h-full p-3 ${tile} hover:!bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-d10-violet`}>
                      <div className="relative rounded-[20px] overflow-hidden">
                        <img src={big ? n.image.src : n.image.sm} alt={n.image.alt} className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${big ? 'aspect-[16/11]' : 'aspect-[4/3]'}`} loading="lazy" />
                        {n.category === 'Video' && (
                          <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 h-9 pl-1.5 pr-3 rounded-full bg-white/85 backdrop-blur text-[13px] font-semibold">
                            <span className="grid place-items-center w-6 h-6 rounded-full bg-d10-violet text-white">
                              <Play size={12} className="ml-0.5" aria-hidden />
                            </span>
                            {n.duration}
                          </span>
                        )}
                      </div>
                      <div className="p-3 flex flex-col flex-1">
                        <div className="flex items-center gap-2">
                          <Chip className={catTone[n.category]}>{n.category}</Chip>
                          <time dateTime={n.date} className="text-[12.5px] text-d10-mute">
                            {formatDate(n.date, 'short')}
                          </time>
                        </div>
                        <h2 className={`mt-3 font-d10-display font-semibold tracking-[-0.02em] leading-snug ${big ? 'text-[28px] sm:text-[32px]' : 'text-[18px]'}`}>{n.title}</h2>
                        {big && <p className="mt-2 text-d10-mute">{n.excerpt}</p>}
                      </div>
                    </Link>
                  </Bloom>
                </li>
              );
            })}
          </ul>
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
  const more = news.filter((x) => x.slug !== n.slug).slice(0, 3);
  return (
    <article className="pt-6 pb-6">
      <Shell className="max-w-[920px]">
        <div className={`${tile} p-7 sm:p-10`}>
          <nav aria-label="Breadcrumb" className="text-[13px] text-d10-mute">
            <Link to={P.home} className="hover:text-d10-violet font-medium">
              Home
            </Link>{' '}
            /{' '}
            <Link to={P.news} className="hover:text-d10-violet font-medium">
              News
            </Link>{' '}
            / <span className="text-d10-ink font-semibold">{n.category}</span>
          </nav>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Chip className={catTone[n.category]}>{n.category}</Chip>
            <time dateTime={n.date} className="text-[13.5px] text-d10-mute">
              {formatDate(n.date)}
            </time>
            {n.company && <Chip>{n.company}</Chip>}
          </div>
          <Display as="h1" className="mt-5 text-[36px] sm:text-[52px]">
            {n.title}
          </Display>
          <p className="mt-5 text-[19px] text-d10-mute">{n.excerpt}</p>
        </div>
        <div className="mt-4 rounded-[28px] overflow-hidden">
          {n.category === 'Video' ? (
            <div className="relative aspect-video bg-d10-ink">
              {!play ? (
                <button type="button" onClick={() => setPlay(true)} aria-label={`Play video: ${n.title}`} className="group absolute inset-0">
                  <img src={n.image.src} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid place-items-center w-20 h-20 rounded-full bg-white/85 backdrop-blur text-d10-violet group-hover:scale-110 transition-transform">
                      <Play size={30} className="ml-1" aria-hidden />
                    </span>
                  </span>
                </button>
              ) : (
                <div role="status" className="absolute inset-0 grid place-items-center text-center p-8 text-white">
                  <div>
                    <Chip className="bg-white/10 text-d10-mint">Video placeholder · {n.duration}</Chip>
                    <p className="mt-3 max-w-md text-white/75">Client footage will be embedded here. No third-party video is shown.</p>
                    <button type="button" onClick={() => setPlay(false)} className="mt-4 underline underline-offset-4">
                      Back to poster
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <img src={n.image.src} alt={n.image.alt} className="w-full aspect-[16/9] object-cover" />
          )}
        </div>
        <div className={`mt-4 ${tile} p-7 sm:p-10 space-y-5 text-[18px] leading-relaxed`}>
          {n.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mt-6">
          <Go to={P.news} tone="soft">
            <ArrowLeft size={16} aria-hidden /> All news
          </Go>
        </div>
        <ul className="mt-10 grid sm:grid-cols-3 gap-4">
          {more.map((m) => (
            <li key={m.slug}>
              <Link to={P.article(m.slug)} className={`block h-full p-5 ${tile} hover:!bg-white`}>
                <Chip className={catTone[m.category]}>{m.category}</Chip>
                <span className="block mt-3 font-d10-display font-semibold leading-snug">{m.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Shell>
    </article>
  );
}
