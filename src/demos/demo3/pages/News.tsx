import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Play } from 'lucide-react';
import { news, newsCategories, getNews, formatDate } from '../../../data/news';
import type { NewsItem } from '../../../types';
import { Fade, Figure, Kicker, Note, Opening, Ornament, P, Page, ReadLink, Serif, useMeta } from '../ui';
import NotFound from './NotFound';

function Story({ n, size }: { n: NewsItem; size: 'lg' | 'md' | 'sm' }) {
  return (
    <Link to={P.article(n.slug)} className="group block focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-d3-oxblood">
      <div className="relative overflow-hidden">
        <img src={size === 'lg' ? n.image.src : n.image.sm} alt={n.image.alt} className={`w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03] ${size === 'lg' ? 'aspect-[16/10]' : size === 'md' ? 'aspect-[4/5]' : 'aspect-[4/3]'}`} loading="lazy" />
        {n.category === 'Video' && (
          <span className="absolute left-4 bottom-4 flex items-center gap-2 bg-d3-paper/95 px-3 py-1.5 font-d3-sans text-[11px] font-semibold uppercase tracking-[0.2em]">
            <Play size={12} aria-hidden /> Film · {n.duration}
          </span>
        )}
      </div>
      <p className="mt-5 font-d3-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-d3-oxblood">{n.category === 'Video' ? 'Film' : n.category}</p>
      <h3 className={`mt-2 font-d3-serif font-light leading-[1.1] group-hover:text-d3-oxblood transition-colors ${size === 'lg' ? 'text-[36px] sm:text-[48px]' : 'text-[26px]'}`}>{n.title}</h3>
      {size !== 'sm' && <p className="mt-3 text-d3-taupe">{n.excerpt}</p>}
      <p className="mt-3 font-d3-serif italic text-[14px] text-d3-taupe">{formatDate(n.date)}</p>
    </Link>
  );
}

export default function News() {
  useMeta('Journal', 'News, announcements, events and films from the group (sample content).');
  const [cat, setCat] = useState<(typeof newsCategories)[number]>('All');
  const items = news.filter((n) => cat === 'All' || n.category === cat);
  const [lead, ...rest] = items;

  return (
    <>
      <Opening chapter="Chapter V · The Journal" title={<>News &amp; <em>perspectives</em></>} deck="Announcements, gatherings and films from across the group." crumbs={[{ label: 'Journal' }]} />
      <Page>
        <div role="tablist" aria-label="Filter the journal" className="flex flex-wrap justify-center gap-x-2 gap-y-2 border-y border-d3-rule py-5 font-d3-sans text-[11.5px] font-semibold uppercase tracking-[0.22em]">
          {newsCategories.map((c, i) => (
            <span key={c} className="flex items-center gap-2">
              {i > 0 && <span className="text-d3-rule" aria-hidden>/</span>}
              <button type="button" role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`px-2 py-1 ${cat === c ? 'text-d3-oxblood' : 'text-d3-taupe hover:text-d3-ink'}`}>
                {c === 'All' ? 'Everything' : c === 'Video' ? 'Films' : `${c}s`}
              </button>
            </span>
          ))}
        </div>
        <div className="mt-3 text-center">
          <Note>All stories and dates are illustrative.</Note>
        </div>
      </Page>
      <section className="py-16 lg:py-24" aria-live="polite">
        <Page>
          {lead && (
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
              <Fade className="lg:col-span-8">
                <Story n={lead} size="lg" />
              </Fade>
              <div className="lg:col-span-4 flex flex-col gap-10">
                {rest.slice(0, 2).map((n) => (
                  <Fade key={n.slug}>
                    <Story n={n} size="sm" />
                  </Fade>
                ))}
              </div>
            </div>
          )}
          {rest.length > 2 && (
            <>
              <div className="my-20">
                <Ornament />
              </div>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                {rest.slice(2).map((n, i) => (
                  <li key={n.slug} className={i % 3 === 1 ? 'lg:mt-20' : ''}>
                    <Fade>
                      <Story n={n} size="md" />
                    </Fade>
                  </li>
                ))}
              </ul>
            </>
          )}
          {!lead && <p className="text-center font-d3-serif italic text-[22px] text-d3-taupe">Nothing in this section yet.</p>}
        </Page>
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
    <>
      <Opening chapter={`The Journal · ${n.category === 'Video' ? 'Film' : n.category}`} title={n.title} deck={n.excerpt} crumbs={[{ label: 'Journal', to: P.news }, { label: n.category }]} />
      <Page className="max-w-5xl">
        {n.category === 'Video' ? (
          <div className="relative aspect-video bg-d3-ink">
            {!play ? (
              <button type="button" className="group absolute inset-0" onClick={() => setPlay(true)} aria-label={`Play film: ${n.title}`}>
                <img src={n.image.src} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid place-items-center w-24 h-24 rounded-full border border-d3-paper text-d3-paper backdrop-blur-sm group-hover:bg-d3-paper group-hover:text-d3-ink transition-colors">
                    <Play size={26} aria-hidden />
                  </span>
                </span>
              </button>
            ) : (
              <div role="status" className="absolute inset-0 grid place-items-center p-8 text-center text-d3-paper">
                <div>
                  <p className="font-d3-serif italic text-[30px]">A film placeholder</p>
                  <p className="mt-3 max-w-md text-d3-paper/70">The client’s own film ({n.duration}) will appear here. No unrelated video is embedded.</p>
                  <button type="button" onClick={() => setPlay(false)} className="mt-6 font-d3-sans text-[11px] uppercase tracking-[0.24em] border-b border-d3-paper/40">
                    Return to poster
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Figure src={n.image.src} alt={n.image.alt} caption="Representative photography" imgClass="aspect-[16/9]" />
        )}
      </Page>
      <article className="py-20">
        <Page className="max-w-[720px]">
          <p className="font-d3-serif italic text-d3-taupe">
            {formatDate(n.date)} {n.company ? `· ${n.company}` : ''} · illustrative
          </p>
          <div className="mt-8 space-y-6 text-[19px] leading-[1.9] text-d3-ink/85">
            {n.body.map((p, i) => (
              <p key={p} className={i === 0 ? 'first-letter:float-left first-letter:font-d3-serif first-letter:text-[78px] first-letter:leading-[0.8] first-letter:mr-3 first-letter:mt-1 first-letter:text-d3-oxblood' : ''}>
                {p}
              </p>
            ))}
          </div>
          <div className="mt-16">
            <Ornament />
          </div>
        </Page>
      </article>
      <section className="bg-d3-cream border-t border-d3-rule py-20">
        <Page>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <Kicker>Also in the Journal</Kicker>
              <Serif className="mt-4 text-[36px]">Further reading</Serif>
            </div>
            <ReadLink to={P.news}>Back to the Journal</ReadLink>
          </div>
          <ul className="mt-12 grid md:grid-cols-3 gap-10">
            {more.map((m) => (
              <li key={m.slug}>
                <Story n={m} size="sm" />
              </li>
            ))}
          </ul>
        </Page>
      </section>
    </>
  );
}
