import { useCallback, useState } from 'react';
import { gallery, galleryCategories } from '../../../data/gallery';
import { LightboxShell, cycle } from '../../../components/common/LightboxShell';
import { Cue, ROMAN, Sample, Stage, TitleCard, useMeta } from '../ui';

/** Rhythm of frame shapes for the contact-sheet grid. */
const spans = ['md:col-span-2 md:row-span-2', '', '', 'md:row-span-2', '', 'md:col-span-2', '', ''];

export default function Gallery() {
  useMeta('Gallery', 'Stills from events, sites, offices and teams (representative imagery).');
  const [cat, setCat] = useState<(typeof galleryCategories)[number]>('All');
  const [i, setI] = useState<number | null>(null);
  const items = cat === 'All' ? gallery : gallery.filter((g) => g.category === cat);
  const close = useCallback(() => setI(null), []);
  const prev = useCallback(() => setI((x) => (x === null ? x : cycle(x, -1, items.length))), [items.length]);
  const next = useCallback(() => setI((x) => (x === null ? x : cycle(x, 1, items.length))), [items.length]);
  const cur = i === null ? null : items[i];
  return (
    <>
      <TitleCard scene="VI" title="Stills" intro="Events, sites, offices and people, held in frame." crumbs={[{ label: 'Gallery' }]} />
      <section className="pb-24 lg:pb-32">
        <Stage>
          <div className="flex flex-wrap items-center justify-between gap-6 border-y border-d9-graphite py-5">
            <div role="group" aria-label="Filter stills" className="flex flex-wrap gap-x-8 gap-y-2">
              {galleryCategories.map((c) => (
                <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`h-10 font-d9-sans text-[12px] uppercase tracking-[0.3em] ${cat === c ? 'text-d9-bone underline underline-offset-[10px]' : 'text-d9-smoke hover:text-d9-ash'}`}>
                  {c}
                </button>
              ))}
            </div>
            <Sample>Representative photography</Sample>
          </div>
          <ul className="mt-12 grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] sm:auto-rows-[220px] gap-2 sm:gap-3 grid-flow-dense">
            {items.map((g, idx) => (
              <li key={g.id} className={spans[idx % spans.length]}>
                <button type="button" onClick={() => setI(idx)} aria-label={`Open still: ${g.caption}`} className="group relative block w-full h-full overflow-hidden focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-d9-bone">
                  <img src={g.image.sm} alt={g.image.alt} className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.8] transition duration-[1.2s] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105" loading="lazy" />
                  <span className="absolute inset-x-0 bottom-0 p-4 text-left bg-gradient-to-t from-d9-black/90 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                    <span className="block font-d9-sans text-[10px] uppercase tracking-[0.3em] text-d9-ash">{g.category}</span>
                    <span className="block mt-1 font-d9-serif italic text-[18px]">{g.caption}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Stage>
      </section>
      <LightboxShell open={!!cur} onClose={close} onPrev={prev} onNext={next} label="Still viewer" className="bg-d9-black flex flex-col">
        {cur && (
          <>
            <div className="flex items-center justify-between h-20 px-5 sm:px-10">
              <Cue>
                Still {ROMAN[(i ?? 0) % 10]} · {i! + 1} / {items.length}
              </Cue>
              <button type="button" onClick={close} className="font-d9-sans text-[12px] uppercase tracking-[0.36em] h-11 hover:text-d9-smoke text-d9-bone">
                Close
              </button>
            </div>
            <figure className="flex-1 min-h-0 flex flex-col items-center justify-center px-4 sm:px-16">
              <img src={cur.image.src} alt={cur.image.alt} className="max-w-full max-h-[calc(100dvh-14rem)] object-contain" />
              <figcaption className="mt-6 text-center">
                <span className="block font-d9-serif italic text-[24px] sm:text-[30px] text-d9-bone">{cur.caption}</span>
                <span className="block mt-1 font-d9-sans text-[11px] uppercase tracking-[0.3em] text-d9-smoke">{cur.category}</span>
              </figcaption>
            </figure>
            <div className="flex justify-between px-5 sm:px-10 h-20 items-center">
              <button type="button" onClick={prev} className="font-d9-sans text-[12px] uppercase tracking-[0.36em] h-11 text-d9-ash hover:text-d9-bone" aria-label="Previous still">
                ← Previous
              </button>
              <button type="button" onClick={next} className="font-d9-sans text-[12px] uppercase tracking-[0.36em] h-11 text-d9-ash hover:text-d9-bone" aria-label="Next still">
                Next →
              </button>
            </div>
          </>
        )}
      </LightboxShell>
    </>
  );
}
