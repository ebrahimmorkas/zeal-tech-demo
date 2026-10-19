import { motion } from 'framer-motion';
import { roadmap } from '../../data/roadmap';

/**
 * "Growth rings": the roadmap drawn as concentric tree rings, from the near term
 * at the core to the long term at the edge. Each ring is a selectable control.
 */
export function Rings({ active, onSelect, size = 420 }: { active: number; onSelect: (i: number) => void; size?: number }) {
  const radii = [70, 125, 180];
  const fills = ['#d3e36b', '#5f8a55', '#2c5640'];
  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: size }}>
      <svg viewBox="0 0 400 400" className="w-full h-auto" aria-hidden>
        {[...radii].reverse().map((r, k) => {
          const i = radii.length - 1 - k;
          return (
            <motion.circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              fill={fills[i]}
              stroke="#f3f6ee"
              strokeWidth="3"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 * i }}
              style={{ transformOrigin: '200px 200px', opacity: active === i ? 1 : 0.55 }}
            />
          );
        })}
        {/* Fine growth lines between rings */}
        {[45, 98, 152].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#1f3d2b" strokeOpacity=".18" strokeDasharray="2 6" />
        ))}
      </svg>
      <div role="tablist" aria-label="Roadmap phase" className="absolute inset-0">
        {roadmap.map((r, i) => {
          // Place each label on the ring's top edge.
          const top = 50 - (radii[i] / 400) * 100 + 4;
          return (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-controls="d7-phase"
              onClick={() => onSelect(i)}
              className={`absolute left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[12.5px] font-semibold whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-d7-forest ${active === i ? 'bg-d7-forest text-d7-mist' : 'bg-d7-mist/90 text-d7-forest hover:bg-white'}`}
              style={{ top: `${top}%` }}
            >
              {r.horizon}
            </button>
          );
        })}
      </div>
    </div>
  );
}
