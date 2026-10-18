import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { news, newsCategories, getNews, formatDate } from '../../../data/news';
import type { NewsItem } from '../../../types';
import { Box, Hero, Pill, Sample, Title, Up, P, useMeta } from '../ui';
import NotFound from './NotFound';

const catTone: Record<string, 'teal' | 'coral' | 'sun' | 'white'> = { News: 'teal', Announcement: 'sun', Event: 'coral', Video: 'white' };

function StoryCard({ n }: { n: NewsItem }) {
  return (
    <Link to={P.article(n.slug)} className="group flex flex-col h-full rounded-[28px] bg-d5-sand overflow-hidden focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-d5-sun">
      <div className="relative overflow-hidden">
        <img src={n.image.sm} alt={n.image.alt} className="w-full aspect-[16/10] object-cover group-hover:scale-[1.04] transition-transform duration-500" loading="lazy" />
        {n.category === 'Video' && (
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid place-items-center w-16 h-16 rounded-full bg-white text-d5-coral shadow-lg group-hover:scale-110 transition-transform">
              <Play size={24} className="ml-1" aria-label="Video" />
            </span>
          </span>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2">
          <Pill tone={catTone[n.category]} className="!h-7 !text-[12px]">
            {n.category === 'Video' ? `▶ Watch · ${n.duration}` : n.category}
          </Pill>
          <span className="text-[13px] text-d5-mute">{formatDate(n.date, 'short')}</span>
        </div>
        <p className="mt-3 text-[19px] font-extrabold leading-snug group-hover:text-d5-teal transition-colors">{n.title}</p>
        <p className="mt-2 text-[15px] text-d5-mute flex-1">{n.excerpt}</p>
      </div>
    </Link>
  );
}

export default function News() {
  useMeta('Stories & news', 'Stories, announcements, events and videos from across the group (sample content).');
  const [cat, setCat] = useState<(typeof newsCategories)[number]>('All');
  const list = news.filter((n) => cat === 'All' || n.category === cat);
  const featured = cat === 'All' ? news.find((n) => n.featured && n.category === 'Event') ?? news[0] : null;
  const rest = featured ? list.filter((n) => n.slug !== featured.slug) : list;

  return (
    <>
      <Hero eyebrow="Stories & news" title={<>What’s happening across the group.</>} intro="News, events, announcements and short films." image="/images/keynote-crowd.jpg" crumbs={[{ label: 'Stories & news' }]} />
      <section className="py-14">
        <Box>
          <div role="tablist" aria-label="Filter stories" className="flex flex-wrap gap-2">
            {newsCategories.map((c) => (
              <button key={c} type="button" role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`h-11 px-5 rounded-full text-[15px] font-bold transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-d5-sun ${cat === c ? 'bg-d5-teal text-white' : 'bg-d5-sand text-d5-ink hover:bg-[#f3ece0]'}`}>
                {c === 'All' ? 'Everything' : c === 'Video' ? 'Videos' : `${c}s`}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <Sample>All stories and dates are illustrative</Sample>
          </div>
          {featured && (
            <Up className="mt-10">
              <Link to={P.article(featured.slug)} className="group grid lg:grid-cols-2 rounded-[36px] bg-d5-sky overflow-hidden focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-d5-sun">
                <img src={featured.image.src} alt={featured.image.alt} className="w-full h-full min-h-[280px] object-cover" />
                <div className="p-8 sm:p-12 flex flex-col justify-center">
                  <Pill tone="coral">Featured story</Pill>
                  <Title as="h2" className="mt-4 text-[30px] sm:text-[38px] group-hover:text-d5-teal transition-colors">
                    {featured.title}
                  </Title>
                  <p className="mt-3 text-[17px] text-d5-mute">{featured.excerpt}</p>
                  <p className="mt-5 text-[14px] font-semibold text-d5-mute">{formatDate(featured.date)}</p>
                </div>
              </Link>
            </Up>
          )}
          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" aria-live="polite">
            {rest.map((n, i) => (
              <li key={n.slug}>
                <Up delay={(i % 3) * 0.05} className="h-full">
                  <StoryCard n={n} />
                </Up>
              </li>
            ))}
          </ul>
        </Box>
      </section>
    </>
  );
}

export function NewsDetail() {
  const { slug } = useParams();
  const n = getNews(slug);
  const [play, setPlay] = useState(false);
  useMeta(n ? n.title : 'Not found', n ? n.excerpt : 'Story not found.');
  if (!n) return <NotFound />;
  const more = news.filter((x) => x.slug !== n.slug).slice(0, 3);
  return (
    <>
      <section className="pt-10 pb-8">
        <Box className="max-w-[900px]">
          <Link to={P.news} className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-d5-sand text-[14px] font-bold hover:bg-[#f3ece0]">
            <ArrowLeft size={16} aria-hidden /> All stories
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Pill tone={catTone[n.category]}>{n.category}</Pill>
            <span className="text-[14px] text-d5-mute">{formatDate(n.date)} · illustrative</span>
          </div>
          <Title as="h1" className="mt-4 text-[36px] sm:text-[52px]">
            {n.title}
          </Title>
          <p className="mt-4 text-[19px] text-d5-mute">{n.excerpt}</p>
        </Box>
      </section>
      <Box className="max-w-[1100px]">
        <div className="relative aspect-video rounded-[36px] overflow-hidden bg-d5-ink">
          {n.category === 'Video' && !play ? (
            <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0" aria-label={`Play video: ${n.title}`}>
              <img src={n.image.src} alt="" className="absolute inset-0 w-full h-full object-cover opacity-85" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid place-items-center w-24 h-24 rounded-full bg-white text-d5-coral shadow-2xl group-hover:scale-105 transition-transform">
                  <Play size={34} className="ml-1" aria-hidden />
                </span>
              </span>
            </button>
          ) : n.category === 'Video' ? (
            <div role="status" className="absolute inset-0 grid place-items-center text-center text-white p-8">
              <div>
                <p className="text-[26px] font-extrabold">🎬 Video coming soon</p>
                <p className="mt-2 max-w-md text-white/75">The client’s own video ({n.duration}) will be added here. We haven’t embedded unrelated footage.</p>
                <button type="button" onClick={() => setPlay(false)} className="mt-5 h-10 px-5 rounded-full bg-white/15 font-bold">
                  Back
                </button>
              </div>
            </div>
          ) : (
            <img src={n.image.src} alt={n.image.alt} className="absolute inset-0 w-full h-full object-cover" />
          )}
        </div>
      </Box>
      <article className="py-14">
        <Box className="max-w-[760px] space-y-5 text-[18.5px] leading-relaxed text-d5-ink/85">
          {n.company && <Pill>{n.company}</Pill>}
          {n.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Box>
      </article>
      <section className="py-14 bg-d5-sky/50">
        <Box>
          <Title as="h2" className="text-[28px]">
            More stories
          </Title>
          <ul className="mt-8 grid md:grid-cols-3 gap-5">
            {more.map((m) => (
              <li key={m.slug}>
                <StoryCard n={m} />
              </li>
            ))}
          </ul>
        </Box>
      </section>
    </>
  );
}
