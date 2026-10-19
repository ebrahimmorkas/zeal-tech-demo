import { useCallback, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { gallery, galleryCategories } from '../../../data/gallery';
import { LightboxShell, cycle } from '../../../components/common/LightboxShell';
import { Box, Outline, PageHead, Sample, Tag, card, useMeta } from '../ui';

const tilts = [-3, 2, -1.5, 3, -2.5, 1.5];

export default function Gallery() {
  useMeta('Gallery', 'Snapshots from events, sites, offices and teams (representative imagery).');
  const [cat, setCat] = useState<(typeof galleryCategories)[number]>('All');
  const [i, setI] = useState<number | null>(null);
  const items = cat === 'All' ? gallery : gallery.filter((g) => g.category === cat);
  const close = useCallback(() => setI(null), []);
  const prev = useCallback(() => setI((x) => (x === null ? x : cycle(x, -1, items.length))), [items.length]);
  const next = useCallback(() => setI((x) => (x === null ? x : cycle(x, 1, items.length))), [items.length]);
  const cur = i === null ? null : items[i];
  return (
    <>
      <PageHead title={<>Say <Outline>cheese.</Outline></>} intro="Snapshots from events, sites, offices and the teams behind them." crumbs={[{ label: 'Gallery' }]} color="bg-d8-pink" sticker="📸 Snaps" />
      <section className="py-14 lg:py-20">
        <Box>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2.5">
              {galleryCategories.map((c) => (
                <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`h-11 px-5 border-[3px] border-d8-ink rounded-full font-d8-display font-bold text-[15px] transition-transform ${cat === c ? 'bg-d8-yellow shadow-[3px_3px_0_#111] -translate-y-0.5' : 'bg-white hover:-translate-y-0.5'}`}>
                  {c}
                </button>
              ))}
            </div>
            <Sample>Representative photos</Sample>
          </div>
          {/* Polaroid wall: each print sits at a slight angle and straightens on hover. */}
          <ul className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
            {items.map((g, idx) => (
              <li key={g.id}>
                <button
                  type="button"
                  onClick={() => setI(idx)}
                  aria-label={`Open photo: ${g.caption}`}
                  className="group block w-full text-left bg-white p-2.5 pb-4 border-[3px] border-d8-ink rounded-lg shadow-[5px_5px_0_#111] transition-transform duration-200 hover:!rotate-0 hover:scale-[1.04] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-d8-blue"
                  style={{ transform: `rotate(${tilts[idx % tilts.length]}deg)` }}
                >
                  <img src={g.image.sm} alt={g.image.alt} className="w-full aspect-square object-cover border-2 border-d8-ink rounded" loading="lazy" />
                  <span className="block mt-3 px-1 font-d8-mono text-[12.5px] leading-snug">{g.caption}</span>
                </button>
              </li>
            ))}
          </ul>
        </Box>
      </section>
      <LightboxShell open={!!cur} onClose={close} onPrev={prev} onNext={next} label="Photo viewer" className="bg-d8-ink/85 grid place-items-center p-3 sm:p-8">
        {cur && (
          <div className={`w-full max-w-4xl bg-d8-yellow p-3 sm:p-5 ${card}`}>
            <div className="flex items-center justify-between gap-3 mb-3">
              <Tag className="bg-white">
                {i! + 1} / {items.length} · {cur.category}
              </Tag>
              <button type="button" onClick={close} aria-label="Close photo viewer" className="grid place-items-center w-11 h-11 bg-d8-pink border-[3px] border-d8-ink rounded-full shadow-[3px_3px_0_#111]">
                <X size={20} strokeWidth={2.75} />
              </button>
            </div>
            <img src={cur.image.src} alt={cur.image.alt} className="w-full max-h-[65vh] object-contain bg-white border-[3px] border-d8-ink rounded-lg" />
            <div className="mt-4 flex items-center justify-between gap-3">
              <button type="button" onClick={prev} aria-label="Previous photo" className="grid place-items-center w-12 h-12 bg-white border-[3px] border-d8-ink rounded-full shadow-[3px_3px_0_#111] shrink-0">
                <ArrowLeft size={20} strokeWidth={2.75} />
              </button>
              <p className="font-d8-display font-extrabold text-[18px] sm:text-[22px] text-center">{cur.caption}</p>
              <button type="button" onClick={next} aria-label="Next photo" className="grid place-items-center w-12 h-12 bg-white border-[3px] border-d8-ink rounded-full shadow-[3px_3px_0_#111] shrink-0">
                <ArrowRight size={20} strokeWidth={2.75} />
              </button>
            </div>
          </div>
        )}
      </LightboxShell>
    </>
  );
}
