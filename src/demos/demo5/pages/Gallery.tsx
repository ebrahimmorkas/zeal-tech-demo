import { useCallback, useState } from 'react';
import { ArrowLeft, ArrowRight, X, ZoomIn } from 'lucide-react';
import { gallery, galleryCategories } from '../../../data/gallery';
import { LightboxShell, cycle } from '../../../components/common/LightboxShell';
import { Box, Hero, Sample, useMeta } from '../ui';

export default function Gallery() {
  useMeta('Gallery', 'Moments from across the group — events, places and people (representative imagery).');
  const [cat, setCat] = useState<(typeof galleryCategories)[number]>('All');
  const [i, setI] = useState<number | null>(null);
  const items = cat === 'All' ? gallery : gallery.filter((g) => g.category === cat);
  const close = useCallback(() => setI(null), []);
  const prev = useCallback(() => setI((x) => (x === null ? x : cycle(x, -1, items.length))), [items.length]);
  const next = useCallback(() => setI((x) => (x === null ? x : cycle(x, 1, items.length))), [items.length]);
  const cur = i === null ? null : items[i];

  return (
    <>
      <Hero eyebrow="Gallery" title={<>Moments that make us who we are.</>} intro="Events, workplaces, projects and the people behind them." image="/images/event-hall.jpg" crumbs={[{ label: 'Gallery' }]} />
      <section className="py-14">
        <Box>
          <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
            {galleryCategories.map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`h-11 px-5 rounded-full text-[15px] font-bold transition-colors ${cat === c ? 'bg-d5-coral text-white' : 'bg-d5-sand hover:bg-[#f3ece0]'}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <Sample>Representative photos — client imagery to follow</Sample>
          </div>
          <ul className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-5 [&>li]:mb-5">
            {items.map((g, idx) => (
              <li key={g.id} className="break-inside-avoid">
                <button type="button" onClick={() => setI(idx)} aria-label={`Open photo: ${g.caption}`} className="group relative block w-full rounded-[28px] overflow-hidden focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-d5-sun">
                  <img src={g.image.sm} alt={g.image.alt} className={`w-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ${idx % 4 === 1 ? 'aspect-[3/4]' : idx % 4 === 3 ? 'aspect-square' : 'aspect-[4/3]'}`} loading="lazy" />
                  <span className="absolute top-3 right-3 grid place-items-center w-10 h-10 rounded-full bg-white/90 text-d5-ink opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={18} aria-hidden />
                  </span>
                </button>
                <p className="mt-2.5 px-1 flex items-center justify-between gap-2">
                  <span className="font-bold text-[15.5px]">{g.caption}</span>
                  <span className="text-[12.5px] font-semibold text-d5-teal shrink-0">{g.category}</span>
                </p>
              </li>
            ))}
          </ul>
        </Box>
      </section>
      <LightboxShell open={!!cur} onClose={close} onPrev={prev} onNext={next} label="Photo viewer" className="bg-d5-ink/80 backdrop-blur-sm grid place-items-center p-3 sm:p-8">
        {cur && (
          <div className="w-full max-w-5xl max-h-full flex flex-col rounded-[32px] bg-white overflow-hidden">
            <figure className="relative min-h-0 flex-1">
              <img src={cur.image.src} alt={cur.image.alt} className="w-full max-h-[72vh] object-contain bg-d5-sand" />
              <button type="button" onClick={close} aria-label="Close photo viewer" className="absolute top-3 right-3 grid place-items-center w-11 h-11 rounded-full bg-white shadow">
                <X size={20} />
              </button>
              <figcaption className="sr-only">{cur.caption}</figcaption>
            </figure>
            <div className="flex items-center justify-between gap-3 p-4 sm:p-5">
              <button type="button" onClick={prev} aria-label="Previous photo" className="grid place-items-center w-11 h-11 rounded-full bg-d5-sand hover:bg-d5-sky shrink-0">
                <ArrowLeft size={20} />
              </button>
              <div className="text-center">
                <p className="font-extrabold">{cur.caption}</p>
                <p className="text-[13.5px] text-d5-mute">
                  {cur.category} · {i! + 1} of {items.length}
                </p>
              </div>
              <button type="button" onClick={next} aria-label="Next photo" className="grid place-items-center w-11 h-11 rounded-full bg-d5-sand hover:bg-d5-sky shrink-0">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </LightboxShell>
    </>
  );
}
