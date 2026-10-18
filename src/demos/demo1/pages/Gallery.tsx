import { useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { gallery, galleryCategories } from '../../../data/gallery';
import { LightboxShell, cycle } from '../../../components/common/LightboxShell';
import { Container, PageBanner, useMeta } from '../ui';

export default function Gallery() {
  useMeta('Gallery', 'Photographs of events, facilities, offices, projects, meetings and team activities.');
  const [cat, setCat] = useState<(typeof galleryCategories)[number]>('All');
  const [index, setIndex] = useState<number | null>(null);
  const items = cat === 'All' ? gallery : gallery.filter((g) => g.category === cat);
  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => setIndex((i) => (i === null ? i : cycle(i, -1, items.length))), [items.length]);
  const next = useCallback(() => setIndex((i) => (i === null ? i : cycle(i, 1, items.length))), [items.length]);
  const current = index !== null ? items[index] : null;

  return (
    <>
      <PageBanner title="Gallery" intro="A glimpse of our people, places and projects." image="/images/event-hall.jpg" crumbs={[{ label: 'Gallery' }]} />
      <section className="py-16 lg:py-24">
        <Container>
          <div role="group" aria-label="Filter gallery" className="flex flex-wrap gap-2">
            {galleryCategories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`h-10 px-5 text-[13px] font-semibold uppercase tracking-[0.12em] border transition-colors ${cat === c ? 'bg-d1-navy border-d1-navy text-white' : 'bg-white border-d1-stone text-d1-muted hover:border-d1-navy hover:text-d1-navy'}`}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="mt-4 text-[13px] text-d1-muted">Representative stock photography — to be replaced with client imagery. Showing {items.length} images.</p>
          <ul className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-6 [&>li]:mb-6">
            {items.map((g, i) => (
              <li key={g.id} className="break-inside-avoid">
                <button type="button" onClick={() => setIndex(i)} className="group relative block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-d1-gold" aria-label={`Enlarge image: ${g.caption}`}>
                  <img src={g.image.sm} alt={g.image.alt} className={`w-full object-cover ${i % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`} loading="lazy" />
                  <span className="absolute inset-0 bg-d1-navy/0 group-hover:bg-d1-navy/40 transition-colors grid place-items-center">
                    <Expand className="text-white opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
                  </span>
                </button>
                <p className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="font-d1-serif text-[19px] text-d1-navy">{g.caption}</span>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-d1-gold shrink-0">{g.category}</span>
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <LightboxShell open={!!current} onClose={close} onPrev={prev} onNext={next} label="Image viewer" className="bg-d1-navy/95 flex flex-col">
        {current && (
          <>
            <div className="flex items-center justify-between px-5 h-16 text-white">
              <p className="text-[13px] uppercase tracking-[0.16em] text-white/60">
                {index! + 1} / {items.length}
              </p>
              <button type="button" onClick={close} aria-label="Close image viewer" className="p-2 hover:text-d1-goldlight">
                <X size={26} />
              </button>
            </div>
            <figure className="flex-1 min-h-0 flex flex-col items-center justify-center px-4 sm:px-20 pb-8">
              <img src={current.image.src} alt={current.image.alt} className="max-h-full max-w-full object-contain min-h-0" />
              <figcaption className="mt-4 text-center text-white">
                <span className="font-d1-serif text-[22px]">{current.caption}</span>
                <span className="block text-[12px] uppercase tracking-[0.16em] text-d1-goldlight mt-1">{current.category}</span>
              </figcaption>
            </figure>
            <button type="button" onClick={prev} aria-label="Previous image" className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 grid place-items-center w-12 h-12 border border-white/30 text-white hover:bg-white hover:text-d1-navy">
              <ChevronLeft />
            </button>
            <button type="button" onClick={next} aria-label="Next image" className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 grid place-items-center w-12 h-12 border border-white/30 text-white hover:bg-white hover:text-d1-navy">
              <ChevronRight />
            </button>
          </>
        )}
      </LightboxShell>
    </>
  );
}
