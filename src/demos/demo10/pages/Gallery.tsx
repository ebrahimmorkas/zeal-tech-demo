import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { gallery, galleryCategories } from '../../../data/gallery';
import { LightboxShell, cycle } from '../../../components/common/LightboxShell';
import { Bento, Sample, Shell, tile, useMeta } from '../ui';

const spans = ['col-span-2 row-span-2', '', '', 'row-span-2', '', 'col-span-2', '', ''];

export default function Gallery() {
  useMeta('Gallery', 'Photography from events, facilities, offices, projects and teams (representative imagery).');
  const [cat, setCat] = useState<(typeof galleryCategories)[number]>('All');
  const [i, setI] = useState<number | null>(null);
  const items = cat === 'All' ? gallery : gallery.filter((g) => g.category === cat);
  const close = useCallback(() => setI(null), []);
  const prev = useCallback(() => setI((x) => (x === null ? x : cycle(x, -1, items.length))), [items.length]);
  const next = useCallback(() => setI((x) => (x === null ? x : cycle(x, 1, items.length))), [items.length]);
  const cur = i === null ? null : items[i];
  return (
    <>
      <Bento eyebrow="Gallery" title="In pictures" intro="Events, facilities, offices, projects and teams." image="/images/event-hall.jpg" crumbs={[{ label: 'Gallery' }]} aside={<Sample>Representative photography</Sample>} />
      <section className="pt-10 pb-6">
        <Shell>
          <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
            {galleryCategories.map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`h-10 px-4 rounded-full text-[14px] font-semibold border transition-colors ${cat === c ? 'bg-d10-ink border-d10-ink text-white' : 'bg-white/70 border-white hover:bg-white'}`}>
                {c}
              </button>
            ))}
          </div>
          <motion.ul layout className="mt-6 grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[200px] gap-3 sm:gap-4 grid-flow-dense">
            {items.map((g, idx) => (
              <motion.li key={g.id} layout className={spans[idx % spans.length]} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
                <button type="button" onClick={() => setI(idx)} aria-label={`Open photo: ${g.caption}`} className="group relative block w-full h-full rounded-[24px] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-d10-violet">
                  <img src={g.image.sm} alt={g.image.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <span className="absolute left-2 right-2 bottom-2 flex items-center justify-between gap-2 px-3 py-2 rounded-2xl bg-white/80 backdrop-blur-xl text-left opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 transition-all">
                    <span className="min-w-0">
                      <span className="block text-[11.5px] font-semibold text-d10-violet">{g.category}</span>
                      <span className="block text-[13.5px] font-semibold truncate">{g.caption}</span>
                    </span>
                    <Maximize2 size={15} className="shrink-0" aria-hidden />
                  </span>
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </Shell>
      </section>
      <LightboxShell open={!!cur} onClose={close} onPrev={prev} onNext={next} label="Photo viewer" className="bg-d10-ink/50 backdrop-blur-md grid place-items-center p-3 sm:p-8">
        {cur && (
          <motion.div className={`w-full max-w-5xl ${tile} !bg-white/90 p-3 sm:p-4`} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }}>
            <img src={cur.image.src} alt={cur.image.alt} className="w-full max-h-[68vh] object-contain rounded-[20px] bg-d10-canvas" />
            <div className="mt-3 flex items-center justify-between gap-3 px-1">
              <div className="flex items-center gap-2">
                <button type="button" onClick={prev} aria-label="Previous photo" className="grid place-items-center w-11 h-11 rounded-full bg-d10-canvas hover:bg-d10-sky">
                  <ChevronLeft size={20} />
                </button>
                <button type="button" onClick={next} aria-label="Next photo" className="grid place-items-center w-11 h-11 rounded-full bg-d10-canvas hover:bg-d10-sky">
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="min-w-0 text-center">
                <p className="font-d10-display font-semibold truncate">{cur.caption}</p>
                <p className="text-[13px] text-d10-mute">
                  {cur.category} · {i! + 1} / {items.length}
                </p>
              </div>
              <button type="button" onClick={close} aria-label="Close photo viewer" className="grid place-items-center w-11 h-11 rounded-full bg-d10-ink text-white">
                <X size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </LightboxShell>
    </>
  );
}
