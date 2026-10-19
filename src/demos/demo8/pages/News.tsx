import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { news, newsCategories, getNews, formatDate } from '../../../data/news';
import { Big, Box, Go, Outline, P, POP, PageHead, Pop, Sample, Sticker, Tag, card, lift, useMeta } from '../ui';
import NotFound from './NotFound';

const catColor: Record<string, string> = { News: 'bg-d8-yellow', Announcement: 'bg-d8-pink', Event: 'bg-d8-mint', Video: 'bg-d8-blue text-white' };

export default function News() {
  useMeta('News', 'News, announcements, events and videos from the group (sample content).');
  const [cat, setCat] = useState<(typeof newsCategories)[number]>('All');
  const items = news.filter((n) => cat === 'All' || n.category === cat);
  return (
    <>
      <PageHead title={<>What’s <Outline>new?</Outline></>} intro="News, announcements, events and videos — hot off the press." crumbs={[{ label: 'News' }]} color="bg-d8-yellow" sticker="Fresh!" />
      <section className="py-14 lg:py-20">
        <Box>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-2.5">
              {newsCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={cat === c}
                  onClick={() => setCat(c)}
                  className={`h-11 px-5 border-[3px] border-d8-ink rounded-full font-d8-display font-extrabold text-[15px] transition-[transform,box-shadow] ${cat === c ? `${c === 'All' ? 'bg-d8-ink text-d8-cream' : catColor[c]} shadow-[3px_3px_0_#111] -translate-y-0.5` : 'bg-white hover:-translate-y-0.5'}`}
                >
                  {c === 'Video' ? 'Videos' : c}
                </button>
              ))}
            </div>
            <Sample>Fictional items</Sample>
          </div>
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-7" aria-live="polite">
            {items.map((n, i) => (
              <li key={n.slug} className={i === 0 && cat === 'All' ? 'sm:col-span-2' : ''}>
                <Pop delay={(i % 3) * 0.06} tilt={i % 2 ? 2 : -2} className="h-full">
                  <Link to={P.article(n.slug)} className={`group flex flex-col h-full bg-white overflow-hidden ${card} ${lift}`}>
                    <div className="relative border-b-[3px] border-d8-ink">
                      <img src={i === 0 && cat === 'All' ? n.image.src : n.image.sm} alt={n.image.alt} className={`w-full object-cover ${i === 0 && cat === 'All' ? 'aspect-[21/9]' : 'aspect-[16/10]'}`} loading="lazy" />
                      <span className="absolute top-3 left-3">
                        <Sticker className={catColor[n.category].split(' ')[0]} rotate={-5}>
                          {n.category}
                        </Sticker>
                      </span>
                      {n.category === 'Video' && (
                        <span className="absolute bottom-3 right-3 grid place-items-center w-14 h-14 bg-d8-yellow border-[3px] border-d8-ink rounded-full shadow-[3px_3px_0_#111]">
                          <Play size={22} strokeWidth={2.75} className="ml-0.5" aria-hidden />
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <time dateTime={n.date} className="font-d8-mono text-[12px] uppercase text-d8-gray">
                        {formatDate(n.date)}
                      </time>
                      <h2 className={`mt-2 font-d8-display font-extrabold leading-tight ${i === 0 && cat === 'All' ? 'text-[30px] sm:text-[36px]' : 'text-[22px]'}`}>{n.title}</h2>
                      <p className="mt-2 font-medium text-d8-gray">{n.excerpt}</p>
                    </div>
                  </Link>
                </Pop>
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
  useMeta(n ? n.title : 'Not found', n ? n.excerpt : 'Article not found.');
  if (!n) return <NotFound />;
  const more = news.filter((x) => x.slug !== n.slug).slice(0, 3);
  return (
    <article>
      <PageHead titleAs="p" title={n.category === 'Video' ? 'Video' : n.category} crumbs={[{ label: 'News', to: P.news }, { label: n.category }]} color={catColor[n.category].split(' ')[0]} sticker={formatDate(n.date, 'short')} />
      <Box className="py-12 lg:py-16 max-w-[900px]">
        <Big as="h1" className="text-[40px] sm:text-[60px]">
          {n.title}
        </Big>
        <p className="mt-6 text-[20px] font-medium">{n.excerpt}</p>
        <div className="mt-10">
          {n.category === 'Video' ? (
            <div className={`relative aspect-video bg-d8-ink overflow-hidden ${card}`}>
              {!play ? (
                <button type="button" onClick={() => setPlay(true)} aria-label={`Play video: ${n.title}`} className="group absolute inset-0">
                  <img src={n.image.src} alt="" className="absolute inset-0 w-full h-full object-cover opacity-85" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid place-items-center w-24 h-24 bg-d8-yellow border-[3px] border-d8-ink rounded-full shadow-[5px_5px_0_#111] group-hover:scale-110 transition-transform">
                      <Play size={36} strokeWidth={2.75} className="ml-1" aria-hidden />
                    </span>
                  </span>
                </button>
              ) : (
                <div role="status" className="absolute inset-0 grid place-items-center p-8 text-center text-d8-cream">
                  <div>
                    <Tag className="bg-d8-yellow text-d8-ink">Video placeholder · {n.duration}</Tag>
                    <p className="mt-4 max-w-md font-medium">The client’s own video will play here. No third-party footage is used.</p>
                    <button type="button" onClick={() => setPlay(false)} className="mt-4 underline underline-offset-4 decoration-2">
                      Rewind
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <img src={n.image.src} alt={n.image.alt} className={`w-full aspect-[16/9] object-cover ${card}`} />
          )}
        </div>
        <div className="mt-10 space-y-5 text-[18.5px] leading-relaxed font-medium">
          {n.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mt-12">
          <Go to={P.news} tone="white">
            <ArrowLeft size={18} strokeWidth={2.75} aria-hidden /> Back to news
          </Go>
        </div>
      </Box>
      <section className="py-14 bg-d8-mint border-t-[3px] border-d8-ink">
        <Box>
          <Big as="p" className="text-[36px]">
            More like this
          </Big>
          <ul className="mt-8 grid md:grid-cols-3 gap-5">
            {more.map((m, i) => (
              <li key={m.slug}>
                <Link to={P.article(m.slug)} className={`block h-full p-5 ${card} ${lift} ${POP[i % 4]}`}>
                  <span className="font-d8-mono text-[12px] uppercase">{m.category}</span>
                  <span className="block mt-2 font-d8-display font-extrabold text-[20px] leading-tight">{m.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Box>
      </section>
    </article>
  );
}
