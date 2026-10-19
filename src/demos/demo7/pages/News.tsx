import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { news, newsCategories, getNews, formatDate } from '../../../data/news';
import { Go, Grow, Kicker, Note, Opening, P, Serif, Wrap, useMeta } from '../ui';
import NotFound from './NotFound';

const label: Record<string, string> = { All: 'Everything', News: 'News', Announcement: 'Announcements', Event: 'Events', Video: 'Films' };

export default function News() {
  useMeta('Stories', 'Field notes, announcements, events and films from across the group (sample content).');
  const [cat, setCat] = useState<(typeof newsCategories)[number]>('All');
  const items = news.filter((n) => cat === 'All' || n.category === cat);
  return (
    <>
      <Opening kicker="Stories" title={<>Field <em>notes.</em></>} intro="News, announcements, events and films from the group." image="/images/keynote-crowd.jpg" crumbs={[{ label: 'Stories' }]} />
      <section className="py-14 lg:py-20">
        <Wrap>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-2">
              {newsCategories.map((c) => (
                <button key={c} type="button" role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`h-11 px-5 rounded-full text-[14.5px] font-medium border transition-colors ${cat === c ? 'bg-d7-forest border-d7-forest text-d7-mist' : 'border-d7-forest/20 hover:bg-d7-lichen'}`}>
                  {label[c]}
                </button>
              ))}
            </div>
            <Note>Fictional items · illustrative dates</Note>
          </div>
          <ul className="mt-12 columns-1 md:columns-2 lg:columns-3 gap-6 [&>li]:mb-6" aria-live="polite">
            {items.map((n, i) => (
              <li key={n.slug} className="break-inside-avoid">
                <Grow delay={(i % 3) * 0.08}>
                  <Link to={P.article(n.slug)} className="group block rounded-[32px] bg-white overflow-hidden hover:shadow-[0_24px_50px_-30px_rgba(31,61,43,0.5)] transition-shadow focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-d7-moss">
                    <div className="relative overflow-hidden">
                      <img src={n.image.sm} alt={n.image.alt} className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`} loading="lazy" />
                      {n.category === 'Video' && (
                        <span className="absolute inset-0 grid place-items-center">
                          <span className="grid place-items-center w-16 h-16 rounded-full bg-d7-lime text-d7-forest">
                            <Play size={24} className="ml-1" aria-hidden />
                          </span>
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-[13px] font-semibold text-d7-moss">
                        {label[n.category]} · {formatDate(n.date)}
                      </p>
                      <h2 className="mt-2 font-d7-serif text-[25px] leading-snug text-d7-forest">{n.title}</h2>
                      <p className="mt-2 text-[15.5px] text-d7-soil">{n.excerpt}</p>
                    </div>
                  </Link>
                </Grow>
              </li>
            ))}
          </ul>
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
  const more = news.filter((x) => x.slug !== n.slug).slice(0, 2);
  return (
    <article>
      <Opening titleAs="p" kicker={`${label[n.category]} · ${formatDate(n.date)}`} title={<em className="not-italic">Field notes</em>} image={n.image.sm} crumbs={[{ label: 'Stories', to: P.news }, { label: label[n.category] }]} />
      <Wrap className="py-12 lg:py-16 max-w-[860px]">
        <Serif as="h1" className="text-[40px] sm:text-[56px] text-d7-forest">
          {n.title}
        </Serif>
        <p className="mt-6 text-[20px] leading-relaxed text-d7-soil">{n.excerpt}</p>
        <div className="mt-10">
          {n.category === 'Video' ? (
            <div className="relative aspect-video rounded-[36px] overflow-hidden bg-d7-forest">
              {!play ? (
                <button type="button" onClick={() => setPlay(true)} aria-label={`Play film: ${n.title}`} className="group absolute inset-0">
                  <img src={n.image.src} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid place-items-center w-20 h-20 rounded-full bg-d7-lime text-d7-forest group-hover:scale-110 transition-transform">
                      <Play size={30} className="ml-1" aria-hidden />
                    </span>
                  </span>
                </button>
              ) : (
                <div role="status" className="absolute inset-0 grid place-items-center text-center p-8 text-d7-mist">
                  <div>
                    <Kicker light>Film placeholder · {n.duration}</Kicker>
                    <p className="mt-3 max-w-md text-d7-mist/80">The client’s own footage will be embedded here. No third-party video is shown.</p>
                    <button type="button" onClick={() => setPlay(false)} className="mt-5 underline underline-offset-4">
                      Back to poster
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <img src={n.image.src} alt={n.image.alt} className="w-full aspect-[16/9] object-cover rounded-[36px] rounded-tl-[160px]" />
          )}
        </div>
        <div className="mt-10 space-y-6 text-[18.5px] leading-[1.75] text-d7-bark">
          {n.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {n.company && <p className="mt-8 text-[14.5px] text-d7-soil">Related company: {n.company}</p>}
        <div className="mt-12">
          <Go to={P.news} tone="ghost">
            <span className="inline-flex items-center gap-2">
              <ArrowLeft size={16} aria-hidden /> All stories
            </span>
          </Go>
        </div>
      </Wrap>
      <section className="pb-16">
        <Wrap className="max-w-[860px]">
          <p className="font-d7-serif text-[28px] text-d7-forest">Keep reading</p>
          <ul className="mt-5 grid sm:grid-cols-2 gap-4">
            {more.map((m) => (
              <li key={m.slug}>
                <Link to={P.article(m.slug)} className="block h-full rounded-[28px] bg-d7-lichen p-6 hover:bg-white">
                  <span className="text-[13px] text-d7-moss font-semibold">{label[m.category]}</span>
                  <span className="block mt-1 font-d7-serif text-[21px] leading-snug text-d7-forest">{m.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>
    </article>
  );
}
