import { useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { gallery, galleryCategories } from '../../../data/gallery';
import { LightboxShell, cycle } from '../../../components/common/LightboxShell';
import { Mono, PageTop, Shell, useMeta } from '../ui';

export default function Gallery() {
  useMeta('Gallery', 'Sites, facilities, events and people across the group (representative imagery).');
  const [cat, setCat] = useState<(typeof galleryCategories)[number]>('All');
  const [i, setI] = useState<number | null>(null);
  const items = cat === 'All' ? gallery : gallery.filter((g) => g.category === cat);
  const close = useCallback(() => setI(null), []);
  const prev = useCallback(() => setI((x) => (x === null ? x : cycle(x, -1, items.length))), [items.length]);
  const next = useCallback(() => setI((x) => (x === null ? x : cycle(x, 1, items.length))), [items.length]);
  const cur = i === null ? null : items[i];

  return (
    <>
      <PageTop label="gallery" title={<>Inside the group.</>} intro="Facilities, project sites, offices, events and the people behind them." crumbs={[{ label: 'Gallery' }]} />
      <section className="py-16 lg:py-24">
        <Shell>
          <div role="group" aria-label="Filter images" className="inline-flex flex-wrap gap-1 p-1 rounded-2xl bg-white ring-1 ring-[#e4e8f2]">
            {galleryCategories.map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`h-9 px-4 rounded-xl text-[14px] transition-colors ${cat === c ? 'bg-d4-deep text-white' : 'text-d4-deep/70 hover:bg-d4-mist'}`}>
                {c}
              </button>
            ))}
          </div>
          <Mono className="mt-3 text-d4-deep/50">representative stock imagery · {items.length} items</Mono>
          <ul className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {items.map((g, idx) => (
              <li key={g.id} className={idx % 5 === 0 ? 'col-span-2 lg:col-span-1 lg:row-span-2' : ''}>
                <button type="button" onClick={() => setI(idx)} aria-label={`Expand: ${g.caption}`} className="group relative block w-full h-full min-h-[160px] rounded-2xl overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-d4-indigo">
                  <img src={g.image.sm} alt={g.image.alt} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${idx % 5 === 0 ? 'aspect-[4/3] lg:aspect-auto' : 'aspect-[4/3]'}`} loading="lazy" />
                  <span className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-2 p-3 rounded-xl bg-d4-void/70 backdrop-blur text-white text-left opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 transition-all">
                    <span>
                      <span className="block font-d4-mono text-[10.5px] text-d4-teal">{g.category.toLowerCase()}</span>
                      <span className="block text-[13.5px]">{g.caption}</span>
                    </span>
                    <Expand size={16} aria-hidden />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Shell>
      </section>
      <LightboxShell open={!!cur} onClose={close} onPrev={prev} onNext={next} label="Image viewer" className="bg-d4-void/90 backdrop-blur-xl grid place-items-center p-4 sm:p-10">
        {cur && (
          <div className="relative w-full max-w-5xl max-h-full flex flex-col rounded-[24px] bg-d4-deep ring-1 ring-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-5 h-14 text-white">
              <Mono className="text-d4-haze">
                {String(i! + 1).padStart(2, '0')}/{String(items.length).padStart(2, '0')} · {cur.category.toLowerCase()}
              </Mono>
              <button type="button" onClick={close} aria-label="Close viewer" className="grid place-items-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20">
                <X size={16} />
              </button>
            </div>
            <figure className="min-h-0 flex flex-col">
              <img src={cur.image.src} alt={cur.image.alt} className="w-full max-h-[70vh] object-contain bg-black" />
              <figcaption className="px-5 py-4 text-white text-[15px]">{cur.caption}</figcaption>
            </figure>
            <button type="button" onClick={prev} aria-label="Previous image" className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-full bg-white/90 text-d4-deep hover:bg-white">
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={next} aria-label="Next image" className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-full bg-white/90 text-d4-deep hover:bg-white">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </LightboxShell>
    </>
  );
}
