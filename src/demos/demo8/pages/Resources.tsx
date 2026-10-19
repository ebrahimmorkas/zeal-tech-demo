import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Search } from 'lucide-react';
import { resources, resourceTypes, getResource } from '../../../data/resources';
import { formatDate } from '../../../data/news';
import { downloadResource } from '../../../lib/download';
import { Big, Box, Btn, Go, Outline, P, POP, PageHead, Pop, Sample, Tag, card, lift, useMeta } from '../ui';
import NotFound from './NotFound';

const typeColor: Record<string, string> = { Blog: 'bg-d8-pink', Whitepaper: 'bg-d8-yellow', 'Technical Article': 'bg-d8-mint' };

export default function Resources() {
  useMeta('Resources', 'Blogs, whitepapers and technical articles from the group (sample content).');
  const [q, setQ] = useState('');
  const [type, setType] = useState<(typeof resourceTypes)[number]>('All');
  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    return resources.filter((r) => (type === 'All' || r.type === type) && (!s || [r.title, r.excerpt, ...r.tags].join(' ').toLowerCase().includes(s)));
  }, [q, type]);
  return (
    <>
      <PageHead title={<>Brain <Outline>food.</Outline></>} intro="Blogs, whitepapers and technical articles from our specialists." crumbs={[{ label: 'Resources' }]} color="bg-d8-yellow" sticker="Free to read" />
      <section className="py-14 lg:py-20">
        <Box>
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <label htmlFor="d8-search" className="sr-only">
              Search resources
            </label>
            <div className={`flex-1 flex items-center gap-3 h-16 px-5 bg-white ${card} focus-within:shadow-[6px_6px_0_#3d5afe]`}>
              <Search size={22} strokeWidth={2.75} aria-hidden />
              <input id="d8-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for something…" className="w-full bg-transparent outline-none text-[17px] font-medium" />
            </div>
            <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2.5">
              {resourceTypes.map((t) => (
                <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(t)} className={`h-12 px-5 border-[3px] border-d8-ink rounded-full font-d8-display font-bold text-[15px] ${type === t ? `${t === 'All' ? 'bg-d8-ink text-d8-cream' : typeColor[t]} shadow-[3px_3px_0_#111]` : 'bg-white'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-6 font-d8-mono text-[13px]" aria-live="polite">
            {items.length} {items.length === 1 ? 'result' : 'results'}
          </p>
          <ul className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {items.map((r, i) => (
              <li key={r.slug}>
                <Pop delay={(i % 3) * 0.06} tilt={i % 2 ? 2 : -2} className="h-full">
                  {/* Folder tab on top of each card */}
                  <div className="h-full flex flex-col">
                    <span className={`self-start ml-5 px-4 h-8 inline-flex items-center border-[3px] border-b-0 border-d8-ink rounded-t-xl font-d8-mono text-[12px] font-bold uppercase ${typeColor[r.type]}`}>{r.type}</span>
                    <Link to={P.resource(r.slug)} className={`flex-1 flex flex-col bg-white p-6 ${card} ${lift}`}>
                      <h2 className="font-d8-display font-extrabold text-[23px] leading-tight">{r.title}</h2>
                      <p className="mt-3 font-medium text-d8-gray">{r.excerpt}</p>
                      <p className="mt-auto pt-5 flex flex-wrap gap-2">
                        <Tag className="bg-d8-cream">{r.readTime}</Tag>
                        {r.downloadable && <Tag className="bg-d8-cream">⇩ download</Tag>}
                      </p>
                    </Link>
                  </div>
                </Pop>
              </li>
            ))}
          </ul>
          {items.length === 0 && <p className="py-12 text-center font-d8-display font-extrabold text-[24px]">Nothing for “{q}”. Try another word?</p>}
          <div className="mt-10">
            <Sample>All resources are original sample text</Sample>
          </div>
        </Box>
      </section>
    </>
  );
}

export function ResourceDetail() {
  const { slug } = useParams();
  const r = getResource(slug);
  useMeta(r ? r.title : 'Not found', r ? r.excerpt : 'Resource not found.');
  if (!r) return <NotFound />;
  return (
    <article>
      <PageHead titleAs="p" title={r.type} crumbs={[{ label: 'Resources', to: P.resources }, { label: r.type }]} color={typeColor[r.type]} sticker={r.readTime} />
      <Box className="py-12 lg:py-16 grid lg:grid-cols-[1fr_320px] gap-10 items-start">
        <div className="max-w-[780px]">
          <Big as="h1" className="text-[38px] sm:text-[54px]">
            {r.title}
          </Big>
          <p className="mt-4 font-d8-mono text-[13px]">
            {r.author} · {formatDate(r.date)}
          </p>
          <img src={r.image.src} alt={r.image.alt} className={`mt-8 w-full aspect-[16/9] object-cover ${card}`} />
          <p className="mt-8 text-[21px] font-semibold leading-snug">{r.excerpt}</p>
          {r.sections.map((s, i) => (
            <section key={s.heading} id={`bit-${i + 1}`} className="mt-10 scroll-mt-28">
              <h2 className="flex items-center gap-3 font-d8-display font-extrabold text-[28px]">
                <span className={`grid place-items-center w-10 h-10 border-[3px] border-d8-ink rounded-full text-[16px] ${POP[i % 4]}`}>{i + 1}</span>
                {s.heading}
              </h2>
              <div className="mt-4 space-y-4 text-[18px] leading-relaxed font-medium">
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
          <div className="mt-12">
            <Go to={P.resources} tone="white">
              <ArrowLeft size={18} strokeWidth={2.75} aria-hidden /> All resources
            </Go>
          </div>
        </div>
        <aside className="lg:sticky lg:top-28 space-y-5">
          {r.downloadable && (
            <div className={`p-6 bg-d8-blue text-white ${card}`}>
              <p className="font-d8-display font-extrabold text-[24px]">Grab a copy</p>
              <p className="mt-1 font-medium text-white/85">Sample text version of this document.</p>
              <Btn type="button" tone="yellow" onClick={() => downloadResource(r)} className="mt-5 w-full">
                <Download size={19} strokeWidth={2.75} aria-hidden /> Download
              </Btn>
            </div>
          )}
          <div className={`p-6 bg-white ${card}`}>
            <p className="font-d8-display font-extrabold text-[20px]">Jump to</p>
            <ol className="mt-3 space-y-2">
              {r.sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#bit-${i + 1}`} className="font-medium hover:underline underline-offset-4 decoration-2">
                    {i + 1}. {s.heading}
                  </a>
                </li>
              ))}
            </ol>
            <ul className="mt-5 flex flex-wrap gap-2">
              {r.tags.map((t) => (
                <li key={t}>
                  <Tag className="bg-d8-cream">#{t.toLowerCase().replace(/\s+/g, '')}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </Box>
    </article>
  );
}
