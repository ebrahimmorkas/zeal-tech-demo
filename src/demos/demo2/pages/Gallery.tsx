import { useCallback, useState } from 'react';
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react';
import { gallery, galleryCategories } from '../../../data/gallery';
import { LightboxShell, cycle } from '../../../components/common/LightboxShell';
import { PageHead, Wrap, useMeta } from '../ui';

export default function Gallery() {
  useMeta('Gallery', 'Facilities, project sites, events, offices and team activities (representative photography).');
  const [cat, setCat] = useState<(typeof galleryCategories)[number]>('All');
  const [i, setI] = useState<number | null>(null);
  const items = cat === 'All' ? gallery : gallery.filter((g) => g.category === cat);
  const close = useCallback(() => setI(null), []);
  const prev = useCallback(() => setI((x) => (x === null ? x : cycle(x, -1, items.length))), [items.length]);
  const next = useCallback(() => setI((x) => (x === null ? x : cycle(x, 1, items.length))), [items.length]);
  const cur = i === null ? null : items[i];

  return (
    <>
      <PageHead index="07" title="Gallery" intro="Facilities, sites and people across group operations." image="/images/warehouse.jpg" crumbs={[{ label: 'Gallery' }]} />
      <section className="py-14 lg:py-20">
        <Wrap>
          <div role="group" aria-label="Filter by category" className="flex flex-wrap border-l border-t border-d2-line">
            {galleryCategories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`h-12 px-5 border-r border-b border-d2-line font-d2-display uppercase text-[16px] tracking-[0.04em] transition-colors ${cat === c ? 'bg-d2-signal text-white' : 'hover:bg-d2-plate'}`}
              >
                {c} <span className="font-d2-mono text-[11px] opacity-70">({c === 'All' ? gallery.length : gallery.filter((g) => g.category === c).length})</span>
              </button>
            ))}
          </div>
          <p className="mt-4 font-d2-mono text-[12px] text-d2-slate">REPRESENTATIVE STOCK PHOTOGRAPHY · REPLACE WITH CLIENT IMAGERY</p>
          <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {items.map((g, idx) => (
              <li key={g.id}>
                <button type="button" onClick={() => setI(idx)} aria-label={`Open: ${g.caption}`} className="group relative block w-full aspect-square overflow-hidden bg-d2-graphite focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-d2-signal">
                  <img src={g.image.sm} alt={g.image.alt} className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-40" loading="lazy" />
                  <span className="absolute inset-0 p-4 flex flex-col justify-between text-left text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                    <span className="font-d2-mono text-[11px] text-d2-signal">{g.category.toUpperCase()}</span>
                    <span className="flex items-end justify-between gap-2">
                      <span className="font-d2-display font-bold uppercase text-[20px] leading-none">{g.caption}</span>
                      <Maximize2 size={18} aria-hidden />
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      <LightboxShell open={!!cur} onClose={close} onPrev={prev} onNext={next} label="Gallery viewer" className="bg-d2-graphite flex flex-col">
        {cur && (
          <>
            <div className="flex items-center justify-between h-16 px-5 border-b border-white/10 text-white">
              <p className="font-d2-mono text-[12px]">
                <span className="text-d2-signal">{String(i! + 1).padStart(2, '0')}</span> / {String(items.length).padStart(2, '0')} · {cur.category.toUpperCase()}
              </p>
              <button type="button" onClick={close} className="flex items-center gap-2 h-10 px-3 border border-white/30 font-d2-display uppercase hover:bg-white hover:text-d2-graphite" aria-label="Close viewer">
                Close <X size={16} aria-hidden />
              </button>
            </div>
            <figure className="flex-1 min-h-0 flex flex-col items-center justify-center p-4">
              <img src={cur.image.src} alt={cur.image.alt} className="max-w-full max-h-full min-h-0 object-contain" />
              <figcaption className="mt-3 font-d2-display uppercase text-white text-[22px]">{cur.caption}</figcaption>
            </figure>
            <div className="flex items-center gap-2 p-3 border-t border-white/10">
              <button type="button" onClick={prev} aria-label="Previous image" className="grid place-items-center w-12 h-12 bg-white/10 text-white hover:bg-d2-signal shrink-0">
                <ArrowLeft />
              </button>
              <ul className="flex-1 flex gap-1 overflow-x-auto no-scrollbar">
                {items.map((g, idx) => (
                  <li key={g.id} className="shrink-0">
                    <button type="button" onClick={() => setI(idx)} aria-label={`Show ${g.caption}`} aria-current={idx === i} className={`block w-20 h-12 overflow-hidden ${idx === i ? 'ring-2 ring-d2-signal' : 'opacity-50 hover:opacity-100'}`}>
                      <img src={g.image.sm} alt="" className="w-full h-full object-cover" />
                    </button>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={next} aria-label="Next image" className="grid place-items-center w-12 h-12 bg-white/10 text-white hover:bg-d2-signal shrink-0">
                <ArrowRight />
              </button>
            </div>
          </>
        )}
      </LightboxShell>
    </>
  );
}
