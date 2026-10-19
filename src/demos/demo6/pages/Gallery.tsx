import { useCallback, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { gallery, galleryCategories } from '../../../data/gallery';
import { LightboxShell, cycle } from '../../../components/common/LightboxShell';
import { Frame, PageHead, Sample, narrow, useMeta, wide } from '../ui';

export default function Gallery() {
  useMeta('Gallery', 'Facilities, projects, offices, events and people across the group (representative imagery).');
  const [cat, setCat] = useState<(typeof galleryCategories)[number]>('All');
  const [i, setI] = useState<number | null>(null);
  const items = cat === 'All' ? gallery : gallery.filter((g) => g.category === cat);
  const close = useCallback(() => setI(null), []);
  const prev = useCallback(() => setI((x) => (x === null ? x : cycle(x, -1, items.length))), [items.length]);
  const next = useCallback(() => setI((x) => (x === null ? x : cycle(x, 1, items.length))), [items.length]);
  const cur = i === null ? null : items[i];

  return (
    <>
      <PageHead n="06" title={<>Gallery<span className="text-d6-red">.</span></>} intro="An archive of places, projects and people." crumbs={[{ label: 'Gallery' }]} />
      <section className="py-12 lg:py-16">
        <Frame>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-x-6 gap-y-2">
              {galleryCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={cat === c}
                  onClick={() => setCat(c)}
                  className={`h-10 text-[13px] font-bold uppercase tracking-[0.1em] border-b-[3px] transition-colors ${cat === c ? 'border-d6-red text-d6-ink' : 'border-transparent text-d6-mid hover:text-d6-ink'}`}
                  style={narrow}
                >
                  {c}
                </button>
              ))}
            </div>
            <Sample>Representative photography</Sample>
          </div>
          <ul className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-d6-ink border border-d6-ink">
            {items.map((g, idx) => (
              <li key={g.id} className="bg-white">
                <button type="button" onClick={() => setI(idx)} aria-label={`Open photo: ${g.caption}`} className="group block w-full text-left focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-[3px] focus-visible:outline-d6-red">
                  <span className="block relative overflow-hidden">
                    <img src={g.image.sm} alt={g.image.alt} className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition duration-500" loading="lazy" />
                    <span className="absolute top-0 left-0 px-2 py-1 bg-white text-[11px] font-bold tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
                  </span>
                  <span className="block p-3">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-d6-red" style={narrow}>
                      {g.category}
                    </span>
                    <span className="block mt-1 text-[14px] font-semibold leading-snug">{g.caption}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Frame>
      </section>

      <LightboxShell open={!!cur} onClose={close} onPrev={prev} onNext={next} label="Photo viewer" className="bg-white flex flex-col">
        {cur && (
          <>
            <div className="flex items-center justify-between h-16 px-5 sm:px-8 border-b-[3px] border-d6-ink">
              <p className="font-d6-sans font-extrabold text-[22px] tabular-nums tracking-[-0.04em]" style={wide}>
                <span className="text-d6-red">{String(i! + 1).padStart(2, '0')}</span> / {String(items.length).padStart(2, '0')}
              </p>
              <button type="button" onClick={close} aria-label="Close photo viewer" className="grid place-items-center w-11 h-11 bg-d6-ink text-white hover:bg-d6-red">
                <X size={20} />
              </button>
            </div>
            <figure className="flex-1 min-h-0 grid lg:grid-cols-[1fr_320px]">
              <div className="min-h-0 p-4 sm:p-8 grid place-items-center bg-d6-grey">
                <img src={cur.image.src} alt={cur.image.alt} className="max-w-full max-h-[calc(100dvh-14rem)] lg:max-h-[calc(100dvh-8rem)] object-contain" />
              </div>
              <figcaption className="p-5 sm:p-8 border-t-[3px] lg:border-t-0 lg:border-l-[3px] border-d6-ink flex lg:flex-col justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-d6-red" style={narrow}>
                    {cur.category}
                  </p>
                  <p className="mt-2 font-bold text-[18px] sm:text-[22px] leading-tight">{cur.caption}</p>
                </div>
                <div className="flex gap-2 self-end lg:self-start">
                  <button type="button" onClick={prev} aria-label="Previous photo" className="grid place-items-center w-12 h-12 border-2 border-d6-ink hover:bg-d6-ink hover:text-white">
                    <ArrowLeft size={20} />
                  </button>
                  <button type="button" onClick={next} aria-label="Next photo" className="grid place-items-center w-12 h-12 bg-d6-red text-white hover:bg-d6-ink">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </figcaption>
            </figure>
          </>
        )}
      </LightboxShell>
    </>
  );
}
