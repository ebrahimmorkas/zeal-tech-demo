import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { gallery, galleryCategories } from '../../../data/gallery';
import { LightboxShell, cycle } from '../../../components/common/LightboxShell';
import { Note, Opening, Wrap, useMeta } from '../ui';

/** Alternating organic frames give the grid a pressed-leaf, herbarium feel. */
const frames = ['rounded-t-full rounded-b-[28px]', 'rounded-[28px]', 'rounded-b-full rounded-t-[28px]', 'rounded-[28px] rounded-tr-[120px]', 'rounded-full aspect-square'];

export default function Gallery() {
  useMeta('Gallery', 'Places, projects and people across the group (representative imagery).');
  const [cat, setCat] = useState<(typeof galleryCategories)[number]>('All');
  const [i, setI] = useState<number | null>(null);
  const items = cat === 'All' ? gallery : gallery.filter((g) => g.category === cat);
  const close = useCallback(() => setI(null), []);
  const prev = useCallback(() => setI((x) => (x === null ? x : cycle(x, -1, items.length))), [items.length]);
  const next = useCallback(() => setI((x) => (x === null ? x : cycle(x, 1, items.length))), [items.length]);
  const cur = i === null ? null : items[i];
  return (
    <>
      <Opening kicker="Gallery" title={<>Seen <em>along the way.</em></>} intro="Places, projects and the people who tend them." image="/images/team-diverse.jpg" crumbs={[{ label: 'Gallery' }]} />
      <section className="py-14 lg:py-20">
        <Wrap>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
              {galleryCategories.map((c) => (
                <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`h-11 px-5 rounded-full text-[14.5px] font-medium border transition-colors ${cat === c ? 'bg-d7-forest border-d7-forest text-d7-mist' : 'border-d7-forest/20 hover:bg-d7-lichen'}`}>
                  {c}
                </button>
              ))}
            </div>
            <Note>Representative photography</Note>
          </div>
          <ul className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 items-end">
            {items.map((g, idx) => (
              <motion.li key={g.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                <button type="button" onClick={() => setI(idx)} aria-label={`Open photo: ${g.caption}`} className="group block w-full text-left focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-d7-moss rounded-[28px]">
                  <span className={`block overflow-hidden ${frames[idx % frames.length]}`}>
                    <img src={g.image.sm} alt={g.image.alt} className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${idx % frames.length === 4 ? 'aspect-square' : 'aspect-[3/4]'}`} loading="lazy" />
                  </span>
                  <span className="block mt-3 text-[13px] text-d7-moss font-semibold">{g.category}</span>
                  <span className="block font-d7-serif text-[19px] leading-snug text-d7-forest">{g.caption}</span>
                </button>
              </motion.li>
            ))}
          </ul>
        </Wrap>
      </section>

      <LightboxShell open={!!cur} onClose={close} onPrev={prev} onNext={next} label="Photo viewer" className="bg-d7-forest/95 grid place-items-center p-4 sm:p-10">
        {cur && (
          <div className="w-full max-w-5xl">
            <div className="relative">
              <img src={cur.image.src} alt={cur.image.alt} className="w-full max-h-[70vh] object-contain rounded-[32px]" />
              <button type="button" onClick={close} aria-label="Close photo viewer" className="absolute -top-2 -right-2 sm:top-3 sm:right-3 grid place-items-center w-12 h-12 rounded-full bg-d7-lime text-d7-forest">
                <X size={20} />
              </button>
            </div>
            <div className="mt-5 flex items-center justify-between gap-4 text-d7-mist">
              <button type="button" onClick={prev} aria-label="Previous photo" className="grid place-items-center w-12 h-12 rounded-full border border-d7-mist/30 hover:bg-d7-mist/10 shrink-0">
                <ChevronLeft size={22} />
              </button>
              <div className="text-center">
                <p className="font-d7-serif text-[24px]">{cur.caption}</p>
                <p className="text-[14px] text-d7-lime">
                  {cur.category} · {i! + 1} of {items.length}
                </p>
              </div>
              <button type="button" onClick={next} aria-label="Next photo" className="grid place-items-center w-12 h-12 rounded-full border border-d7-mist/30 hover:bg-d7-mist/10 shrink-0">
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        )}
      </LightboxShell>
    </>
  );
}
