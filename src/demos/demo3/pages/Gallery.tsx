import { useCallback, useState } from 'react';
import { gallery, galleryCategories } from '../../../data/gallery';
import { LightboxShell, cycle } from '../../../components/common/LightboxShell';
import { Note, Opening, Page, useMeta } from '../ui';

// Varied spans create an art-directed, magazine-style composition.
const spans = ['md:col-span-7 md:row-span-2', 'md:col-span-5', 'md:col-span-5', 'md:col-span-4', 'md:col-span-4', 'md:col-span-4', 'md:col-span-5 md:row-span-2', 'md:col-span-7', 'md:col-span-7'];

export default function Gallery() {
  useMeta('Portfolio', 'A portfolio of the group’s events, facilities, offices, projects and people (representative imagery).');
  const [cat, setCat] = useState<(typeof galleryCategories)[number]>('All');
  const [i, setI] = useState<number | null>(null);
  const items = cat === 'All' ? gallery : gallery.filter((g) => g.category === cat);
  const close = useCallback(() => setI(null), []);
  const prev = useCallback(() => setI((x) => (x === null ? x : cycle(x, -1, items.length))), [items.length]);
  const next = useCallback(() => setI((x) => (x === null ? x : cycle(x, 1, items.length))), [items.length]);
  const cur = i === null ? null : items[i];

  return (
    <>
      <Opening chapter="Chapter VI · Portfolio" title={<>Places, people <em>&amp; occasions</em></>} deck="A visual record of the group at work." crumbs={[{ label: 'Portfolio' }]} />
      <Page>
        <div role="group" aria-label="Filter portfolio" className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-y border-d3-rule py-5">
          {galleryCategories.map((c) => (
            <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`font-d3-serif text-[18px] ${cat === c ? 'italic text-d3-oxblood' : 'text-d3-taupe hover:text-d3-ink'}`}>
              {c === 'All' ? 'All' : c}
            </button>
          ))}
        </div>
        <div className="mt-3 text-center">
          <Note>Representative photography — to be replaced with the client’s own.</Note>
        </div>
      </Page>
      <section className="py-16 lg:py-24">
        <Page>
          <ul className="grid md:grid-cols-12 auto-rows-[260px] lg:auto-rows-[300px] grid-flow-dense gap-6">
            {items.map((g, idx) => (
              <li key={g.id} className={`${spans[idx % spans.length]} row-span-1`}>
                <button type="button" onClick={() => setI(idx)} className="group relative block w-full h-full overflow-hidden text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-d3-oxblood" aria-label={`View: ${g.caption}`}>
                  <img src={g.image.sm} alt={g.image.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]" loading="lazy" />
                  <span className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-d3-ink/70 to-transparent text-d3-paper translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 transition-all duration-500">
                    <span className="block font-d3-sans text-[10px] uppercase tracking-[0.24em]">{g.category}</span>
                    <span className="block font-d3-serif italic text-[20px]">{g.caption}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Page>
      </section>
      <LightboxShell open={!!cur} onClose={close} onPrev={prev} onNext={next} label="Portfolio viewer" className="bg-d3-paper flex flex-col">
        {cur && (
          <>
            <div className="flex items-center justify-between h-16 px-6 border-b border-d3-rule">
              <p className="font-d3-serif italic text-d3-taupe">
                Plate {i! + 1} of {items.length}
              </p>
              <button type="button" onClick={close} className="font-d3-sans text-[11px] font-semibold uppercase tracking-[0.24em] hover:text-d3-oxblood" aria-label="Close viewer">
                Close ✕
              </button>
            </div>
            <figure className="flex-1 min-h-0 flex flex-col items-center justify-center px-6 py-6">
              <img src={cur.image.src} alt={cur.image.alt} className="max-w-full max-h-full min-h-0 object-contain shadow-[0_30px_60px_-30px_rgba(28,26,23,0.5)]" />
              <figcaption className="mt-5 text-center">
                <span className="block font-d3-sans text-[10.5px] uppercase tracking-[0.24em] text-d3-oxblood">{cur.category}</span>
                <span className="block font-d3-serif italic text-[22px]">{cur.caption}</span>
              </figcaption>
            </figure>
            <div className="flex justify-between px-6 pb-6">
              <button type="button" onClick={prev} className="font-d3-sans text-[11px] font-semibold uppercase tracking-[0.24em] border-b border-d3-ink/30 pb-1 hover:text-d3-oxblood" aria-label="Previous image">
                ← Previous
              </button>
              <button type="button" onClick={next} className="font-d3-sans text-[11px] font-semibold uppercase tracking-[0.24em] border-b border-d3-ink/30 pb-1 hover:text-d3-oxblood" aria-label="Next image">
                Next →
              </button>
            </div>
          </>
        )}
      </LightboxShell>
    </>
  );
}
