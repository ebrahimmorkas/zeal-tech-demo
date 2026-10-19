import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Play } from 'lucide-react';
import { news, newsCategories, getNews, formatDate } from '../../../data/news';
import { Cue, Dolly, Fade, Go, P, ROMAN, Sample, Stage, Title, TitleCard, useMeta } from '../ui';
import NotFound from './NotFound';

const label: Record<string, string> = { All: 'All', News: 'News', Announcement: 'Announcements', Event: 'Events', Video: 'Films' };

export default function News() {
  useMeta('Journal', 'News, announcements, events and films from the group (sample content).');
  const [cat, setCat] = useState<(typeof newsCategories)[number]>('All');
  const items = news.filter((n) => cat === 'All' || n.category === cat);
  const [lead, ...rest] = items;
  return (
    <>
      <TitleCard scene="V" title="Journal" intro="News, announcements, events and films." crumbs={[{ label: 'Journal' }]} />
      <section className="pb-24 lg:pb-32">
        <Stage>
          <div className="flex flex-wrap items-center justify-between gap-6 border-y border-d9-graphite py-5">
            <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-x-8 gap-y-2">
              {newsCategories.map((c) => (
                <button key={c} type="button" role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`h-10 font-d9-sans text-[12px] uppercase tracking-[0.32em] transition-colors ${cat === c ? 'text-d9-bone underline underline-offset-[10px]' : 'text-d9-smoke hover:text-d9-ash'}`}>
                  {label[c]}
                </button>
              ))}
            </div>
            <Sample>Fictional items · illustrative dates</Sample>
          </div>
          <div aria-live="polite">
            {lead && (
              <Link to={P.article(lead.slug)} className="group block mt-16 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-d9-bone">
                <div className="relative overflow-hidden">
                  <img src={lead.image.src} alt={lead.image.alt} className="w-full aspect-[21/9] min-h-[280px] object-cover saturate-[0.55] brightness-75 transition-transform duration-[1.6s] group-hover:scale-105" />
                  {lead.category === 'Video' && (
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid place-items-center w-20 h-20 rounded-full border border-d9-bone">
                        <Play size={24} className="ml-1" aria-hidden />
                      </span>
                    </span>
                  )}
                </div>
                <div className="mt-8 grid lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-16">
                  <div>
                    <Cue>
                      {label[lead.category]} · {formatDate(lead.date)}
                    </Cue>
                    <h2 className="mt-4 font-d9-serif text-[36px] sm:text-[54px] leading-[1.02] group-hover:italic">{lead.title}</h2>
                  </div>
                  <p className="font-d9-sans font-light text-[18px] leading-[1.8] text-d9-ash lg:pt-10">{lead.excerpt}</p>
                </div>
              </Link>
            )}
            <ul className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {rest.map((n, i) => (
                <li key={n.slug}>
                  <Fade delay={(i % 3) * 0.1}>
                    <Link to={P.article(n.slug)} className="group block focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-d9-bone">
                      <div className="relative overflow-hidden">
                        <img src={n.image.sm} alt={n.image.alt} className="w-full aspect-[4/3] object-cover saturate-[0.5] group-hover:saturate-100 transition duration-700" loading="lazy" />
                        {n.category === 'Video' && (
                          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 font-d9-sans text-[11px] uppercase tracking-[0.3em]">
                            <Play size={14} aria-hidden /> {n.duration}
                          </span>
                        )}
                      </div>
                      <Cue className="mt-6">
                        {ROMAN[i + 1]} · {label[n.category]} · {formatDate(n.date, 'short')}
                      </Cue>
                      <h2 className="mt-3 font-d9-serif text-[26px] leading-[1.15] group-hover:italic">{n.title}</h2>
                    </Link>
                  </Fade>
                </li>
              ))}
            </ul>
          </div>
        </Stage>
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
  const next = news[(news.indexOf(n) + 1) % news.length];
  return (
    <article>
      <header>
        <Stage className="pt-36 lg:pt-44 pb-16 max-w-[1100px] text-center">
          <nav aria-label="Breadcrumb" className="font-d9-sans text-[11px] uppercase tracking-[0.36em] text-d9-smoke">
            <Link to={P.home} className="hover:text-d9-bone">
              Nexora
            </Link>{' '}
            /{' '}
            <Link to={P.news} className="hover:text-d9-bone">
              Journal
            </Link>{' '}
            / <span className="text-d9-bone">{label[n.category]}</span>
          </nav>
          <Cue className="mt-12">{formatDate(n.date)}</Cue>
          <Title as="h1" className="mt-6 text-[40px] sm:text-[68px] leading-[1.02]">
            {n.title}
          </Title>
          <p className="mt-8 mx-auto max-w-2xl font-d9-sans font-light text-[19px] leading-[1.7] text-d9-ash">{n.excerpt}</p>
        </Stage>
        {n.category === 'Video' ? (
          <Stage>
            <div className="relative aspect-video bg-d9-carbon overflow-hidden">
              {!play ? (
                <button type="button" onClick={() => setPlay(true)} aria-label={`Play film: ${n.title}`} className="group absolute inset-0">
                  <img src={n.image.src} alt="" className="absolute inset-0 w-full h-full object-cover saturate-[0.5] brightness-75" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid place-items-center w-24 h-24 rounded-full border border-d9-bone group-hover:bg-d9-bone group-hover:text-d9-black transition-colors">
                      <Play size={30} className="ml-1" aria-hidden />
                    </span>
                  </span>
                </button>
              ) : (
                <div role="status" className="absolute inset-0 grid place-items-center text-center p-8">
                  <div>
                    <Cue>Film placeholder · {n.duration}</Cue>
                    <p className="mt-4 max-w-md font-d9-sans font-light text-d9-ash">Client footage will be embedded here. No third-party film is shown.</p>
                    <button type="button" onClick={() => setPlay(false)} className="mt-6 font-d9-sans text-[12px] uppercase tracking-[0.3em] underline underline-offset-8">
                      Return to still
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Stage>
        ) : (
          <Dolly src={n.image.src} alt={n.image.alt} imgClass="aspect-[21/9] min-h-[260px]" />
        )}
      </header>
      <Stage className="py-20 lg:py-28 max-w-[760px]">
        <div className="space-y-7 font-d9-sans font-light text-[19px] leading-[1.9] text-d9-ash first-letter:font-d9-serif">
          {n.body.map((p, i) => (
            <p key={p} className={i === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:text-[72px] first-letter:leading-[0.85] first-letter:text-d9-bone' : ''}>
              {p}
            </p>
          ))}
        </div>
        <div className="mt-16">
          <Go to={P.news}>Back to the journal</Go>
        </div>
      </Stage>
      <Link to={P.article(next.slug)} className="group block border-t border-d9-graphite py-20 text-center hover:bg-d9-carbon transition-colors">
        <Cue>Next</Cue>
        <span className="block mt-5 mx-auto max-w-4xl px-5 font-d9-serif text-[32px] sm:text-[52px] leading-[1.05] group-hover:italic">{next.title}</span>
      </Link>
    </article>
  );
}
