import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { news, newsCategories, getNews, formatDate } from '../../../data/news';
import type { NewsItem } from '../../../types';
import { Container, Eyebrow, Heading, P, PageBanner, Reveal, SampleTag, useMeta } from '../ui';
import NotFound from './NotFound';

function Card({ n }: { n: NewsItem }) {
  return (
    <Link to={P.article(n.slug)} className="group flex flex-col h-full bg-white border border-d1-stone hover:border-d1-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-d1-gold">
      <div className="relative overflow-hidden">
        <img src={n.image.sm} alt={n.image.alt} className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        {n.category === 'Video' && (
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid place-items-center w-14 h-14 rounded-full bg-white/90 text-d1-navy">
              <Play size={20} className="ml-0.5" aria-hidden />
            </span>
            <span className="sr-only">Video</span>
          </span>
        )}
      </div>
      <div className="p-7 flex flex-col flex-1">
        <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-d1-gold">
          {n.category} · <time dateTime={n.date}>{formatDate(n.date)}</time>
        </p>
        <h3 className="mt-3 font-d1-serif text-[24px] font-semibold leading-snug text-d1-navy group-hover:text-d1-gold transition-colors">{n.title}</h3>
        <p className="mt-3 text-[15px] text-d1-muted leading-relaxed flex-1">{n.excerpt}</p>
        {n.duration && <p className="mt-4 text-[13px] text-d1-muted">Duration {n.duration}</p>}
      </div>
    </Link>
  );
}

export default function News() {
  useMeta('News & Videos', 'News, announcements, event coverage and video highlights from the group (sample content).');
  const [cat, setCat] = useState<(typeof newsCategories)[number]>('All');
  const lead = news.find((n) => n.featured)!;
  const items = news.filter((n) => (cat === 'All' ? n.slug !== lead.slug : n.category === cat));

  return (
    <>
      <PageBanner title="News & Media" intro="Announcements, events and stories from across the group." image="/images/keynote.jpg" crumbs={[{ label: 'News & Videos' }]} />
      <section className="py-20 lg:py-24">
        <Container>
          {cat === 'All' && (
            <Reveal>
              <Link to={P.article(lead.slug)} className="group grid lg:grid-cols-[1.3fr_1fr] bg-white border border-d1-stone focus-visible:outline focus-visible:outline-2 focus-visible:outline-d1-gold">
                <div className="overflow-hidden">
                  <img src={lead.image.src} alt={lead.image.alt} className="w-full h-full min-h-[280px] object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="p-8 sm:p-12 flex flex-col justify-center">
                  <p className="text-[12px] uppercase tracking-[0.2em] font-semibold text-d1-gold">Featured · {lead.category}</p>
                  <h2 className="mt-4 font-d1-serif text-[32px] sm:text-[40px] font-semibold leading-tight text-d1-navy group-hover:text-d1-gold transition-colors">{lead.title}</h2>
                  <p className="mt-4 text-d1-muted leading-relaxed">{lead.excerpt}</p>
                  <p className="mt-6 text-[13px] text-d1-muted">
                    <time dateTime={lead.date}>{formatDate(lead.date)}</time> · Illustrative date
                  </p>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="mt-16 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-d1-stone">
            <div role="tablist" aria-label="Filter news by category" className="flex gap-6 overflow-x-auto no-scrollbar">
              {newsCategories.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={cat === c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`shrink-0 pb-4 -mb-px border-b-2 text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors ${cat === c ? 'border-d1-gold text-d1-navy' : 'border-transparent text-d1-muted hover:text-d1-navy'}`}
                >
                  {c === 'All' ? 'All' : c === 'Video' ? 'Videos' : `${c}s`}
                  <span className="ml-1.5 text-d1-muted/70">({c === 'All' ? news.length : news.filter((n) => n.category === c).length})</span>
                </button>
              ))}
            </div>
            <p className="pb-4 text-[13px] text-d1-muted">All items and dates are illustrative.</p>
          </div>

          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8" aria-live="polite">
            {items.map((n) => (
              <li key={n.slug}>
                <Card n={n} />
              </li>
            ))}
          </ul>
          {items.length === 0 && <p className="mt-12 text-d1-muted">No items in this category yet.</p>}
        </Container>
      </section>
    </>
  );
}

export function NewsDetail() {
  const { slug } = useParams();
  const n = getNews(slug);
  const [playing, setPlaying] = useState(false);
  useMeta(n ? n.title : 'Article not found', n ? n.excerpt : 'The requested article could not be found.');
  if (!n) return <NotFound />;
  const related = news.filter((x) => x.slug !== n.slug).slice(0, 3);

  return (
    <>
      <section className="bg-white border-b border-d1-stone">
        <Container className="py-14 lg:py-20 max-w-[960px]">
          <nav aria-label="Breadcrumb" className="text-[12px] uppercase tracking-[0.16em] text-d1-muted">
            <Link to={P.home} className="hover:text-d1-navy">
              Home
            </Link>{' '}
            <span className="text-d1-gold">/</span>{' '}
            <Link to={P.news} className="hover:text-d1-navy">
              News
            </Link>{' '}
            <span className="text-d1-gold">/</span> <span aria-current="page">{n.category}</span>
          </nav>
          <p className="mt-10 text-[12px] uppercase tracking-[0.2em] font-semibold text-d1-gold">
            {n.category} · <time dateTime={n.date}>{formatDate(n.date)}</time>
          </p>
          <Heading as="h1" className="mt-4 text-[38px] sm:text-[54px]">
            {n.title}
          </Heading>
          <p className="mt-6 text-[20px] leading-relaxed text-d1-muted">{n.excerpt}</p>
          <div className="mt-6">
            <SampleTag>Sample {n.category === 'Video' ? 'video' : 'article'} · illustrative date</SampleTag>
          </div>
        </Container>
      </section>
      <Container className="max-w-[1100px] -mt-px pt-12">
        {n.category === 'Video' ? (
          <div className="relative aspect-video bg-d1-navy overflow-hidden">
            {!playing ? (
              <>
                <img src={n.image.src} alt={n.image.alt} className="absolute inset-0 w-full h-full object-cover opacity-70" />
                <button type="button" onClick={() => setPlaying(true)} className="absolute inset-0 grid place-items-center group" aria-label={`Play video: ${n.title}`}>
                  <span className="grid place-items-center w-20 h-20 rounded-full bg-white text-d1-navy group-hover:scale-105 transition-transform">
                    <Play size={28} className="ml-1" aria-hidden />
                  </span>
                </button>
                <span className="absolute bottom-4 right-4 bg-d1-navy/80 text-white text-[13px] px-3 py-1">{n.duration}</span>
              </>
            ) : (
              <div className="absolute inset-0 grid place-items-center text-center text-white p-8" role="status">
                <div>
                  <p className="font-d1-serif text-[30px]">Video placeholder</p>
                  <p className="mt-3 text-white/70 max-w-md">The client’s corporate film will play here. No external video is embedded to avoid misrepresenting the company.</p>
                  <button type="button" onClick={() => setPlaying(false)} className="mt-6 text-[13px] uppercase tracking-[0.16em] text-d1-goldlight underline underline-offset-4">
                    Back to poster
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <img src={n.image.src} alt={n.image.alt} className="w-full aspect-[16/8] object-cover" />
        )}
      </Container>
      <article className="py-16">
        <Container className="max-w-[760px] space-y-6 text-[19px] leading-[1.85] text-d1-ink/85">
          {n.company && (
            <p className="text-[13px] uppercase tracking-[0.16em] text-d1-gold font-semibold">{n.company}</p>
          )}
          {n.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <div className="pt-8 border-t border-d1-stone">
            <Link to={P.news} className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-d1-navy hover:text-d1-gold">
              <ArrowLeft size={15} aria-hidden /> Back to News & Media
            </Link>
          </div>
        </Container>
      </article>
      <section className="py-20 bg-white border-t border-d1-stone">
        <Container>
          <Eyebrow>More stories</Eyebrow>
          <ul className="mt-10 grid md:grid-cols-3 gap-8">
            {related.map((r) => (
              <li key={r.slug}>
                <Card n={r} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
