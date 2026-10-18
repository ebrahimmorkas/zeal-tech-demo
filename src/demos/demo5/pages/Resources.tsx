import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Download, FileText, PenLine, Search } from 'lucide-react';
import { resources, resourceTypes, getResource } from '../../../data/resources';
import { formatDate } from '../../../data/news';
import { downloadResource } from '../../../lib/download';
import type { ResourceType } from '../../../types';
import { Box, Btn, Hero, Pill, Sample, Title, Up, P, useMeta } from '../ui';
import NotFound from './NotFound';

const typeMeta: Record<ResourceType, { icon: typeof PenLine; tone: 'teal' | 'coral' | 'sun' }> = {
  Blog: { icon: PenLine, tone: 'coral' },
  Whitepaper: { icon: FileText, tone: 'teal' },
  'Technical Article': { icon: BookOpen, tone: 'sun' },
};

export default function Resources() {
  useMeta('Knowledge hub', 'Blogs, whitepapers and technical articles shared by our teams (original sample content).');
  const [type, setType] = useState<(typeof resourceTypes)[number]>('All');
  const [q, setQ] = useState('');
  const list = useMemo(() => resources.filter((r) => (type === 'All' || r.type === type) && (!q.trim() || `${r.title} ${r.excerpt} ${r.tags.join(' ')}`.toLowerCase().includes(q.toLowerCase()))), [type, q]);

  return (
    <>
      <Hero eyebrow="Knowledge hub" title={<>Ideas and know-how, shared openly.</>} intro="Blogs, whitepapers and technical articles from our teams." image="/images/analysis.jpg" crumbs={[{ label: 'Knowledge' }]} />
      <section className="py-14">
        <Box>
          <div className="rounded-[32px] bg-d5-sand p-5 sm:p-6 flex flex-col md:flex-row gap-4 md:items-center">
            <div className="relative flex-1">
              <label htmlFor="d5-q" className="sr-only">
                Search the knowledge hub
              </label>
              <Search size={19} className="absolute left-5 top-1/2 -translate-y-1/2 text-d5-mute" aria-hidden />
              <input id="d5-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="What would you like to learn about?" className="w-full h-14 pl-[52px] pr-5 rounded-full bg-white border-2 border-transparent focus:outline-none focus:border-d5-teal text-[16px]" />
            </div>
            <div role="tablist" aria-label="Type" className="flex flex-wrap gap-2">
              {resourceTypes.map((t) => (
                <button key={t} type="button" role="tab" aria-selected={type === t} onClick={() => setType(t)} className={`h-11 px-4 rounded-full text-[14.5px] font-bold ${type === t ? 'bg-d5-teal text-white' : 'bg-white hover:bg-d5-sky'}`}>
                  {t === 'All' ? 'All' : `${t}s`}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Sample>Original sample writing</Sample>
            <p className="text-[14px] text-d5-mute" aria-live="polite">
              {list.length} {list.length === 1 ? 'resource' : 'resources'}
            </p>
          </div>
          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((r, i) => {
              const M = typeMeta[r.type];
              const Icon = M.icon;
              return (
                <li key={r.slug}>
                  <Up delay={(i % 3) * 0.05} className="h-full">
                    <article className="h-full flex flex-col rounded-[28px] border-2 border-[#efeae1] p-6 hover:border-d5-teal/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <Pill tone={M.tone}>
                          <Icon size={14} aria-hidden /> {r.type}
                        </Pill>
                        <span className="text-[13px] text-d5-mute">{r.readTime}</span>
                      </div>
                      <h2 className="mt-4 text-[20px] font-extrabold leading-snug">
                        <Link to={P.resource(r.slug)} className="hover:text-d5-teal">
                          {r.title}
                        </Link>
                      </h2>
                      <p className="mt-2 text-[15px] text-d5-mute flex-1">{r.excerpt}</p>
                      <div className="mt-5 flex items-center gap-2">
                        <Link to={P.resource(r.slug)} className="inline-flex items-center h-10 px-4 rounded-full bg-d5-sky text-d5-teal text-[14px] font-bold">
                          Read
                        </Link>
                        {r.downloadable && (
                          <button type="button" onClick={() => downloadResource(r)} className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-d5-sand text-[14px] font-bold" aria-label={`Download a sample of ${r.title}`}>
                            <Download size={15} aria-hidden /> Download
                          </button>
                        )}
                      </div>
                    </article>
                  </Up>
                </li>
              );
            })}
          </ul>
          {list.length === 0 && (
            <div className="mt-8 rounded-[28px] bg-d5-sky p-10 text-center">
              <p className="text-[20px] font-extrabold">Nothing found — yet!</p>
              <p className="mt-1 text-d5-mute">Try a different word or type.</p>
            </div>
          )}
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
    <>
      <Hero eyebrow={r.type} title={r.title} intro={r.excerpt} image={r.image.src} crumbs={[{ label: 'Knowledge', to: P.resources }, { label: r.type }]} />
      <section className="py-12">
        <Box className="grid lg:grid-cols-[1fr_300px] gap-10">
          <article className="max-w-[720px]">
            <div className="flex flex-wrap items-center gap-2 text-[14.5px] text-d5-mute">
              <span className="font-bold text-d5-ink">{r.author}</span> · <span>{formatDate(r.date)}</span> · <span>{r.readTime}</span>
            </div>
            {r.sections.map((s) => (
              <section key={s.heading} className="mt-10">
                <Title as="h2" className="text-[26px]">
                  {s.heading}
                </Title>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mt-4 text-[18px] leading-relaxed text-d5-ink/85">
                    {p}
                  </p>
                ))}
              </section>
            ))}
            <Link to={P.resources} className="mt-12 inline-flex items-center gap-2 h-11 px-5 rounded-full bg-d5-sand font-bold text-[15px]">
              <ArrowLeft size={16} aria-hidden /> Back to the hub
            </Link>
          </article>
          <aside className="space-y-5 lg:sticky lg:top-28 self-start">
            {r.downloadable && (
              <div className="rounded-[28px] bg-d5-teal text-white p-7">
                <p className="text-[18px] font-extrabold">Take it with you</p>
                <p className="mt-1 text-white/80 text-[14.5px]">Download a sample text copy (demo).</p>
                <Btn type="button" tone="white" className="mt-5 w-full" onClick={() => downloadResource(r)}>
                  <Download size={17} aria-hidden /> Download
                </Btn>
              </div>
            )}
            <div className="rounded-[28px] bg-d5-sand p-7">
              <p className="font-extrabold">Topics</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <li key={t} className="px-3 py-1 rounded-full bg-white text-[13.5px] font-semibold">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Sample />
              </div>
            </div>
          </aside>
        </Box>
      </section>
    </>
  );
}
