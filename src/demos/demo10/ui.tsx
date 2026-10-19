import { useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Loader2, Sparkle } from 'lucide-react';
import { makePaths } from '../../lib/paths';
import type { FieldDef } from '../../types';
import type { DemoForm } from '../../hooks/useDemoForm';
import { usePageMeta } from '../../hooks/usePageMeta';

export const P = makePaths('/demo10');
export const CONCEPT = 'Concept 10 · Lumen Bento';
export const useMeta = (title: string, description: string) => usePageMeta(title, description, 'Concept 10');

/** Pastel tile fills used to give repeated items their own colour. */
export const PASTEL = ['bg-d10-mint', 'bg-d10-peach', 'bg-d10-sky', 'bg-d10-butter', 'bg-[#efe3ff]', 'bg-[#ffe0ee]'] as const;

export function Shell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-4 sm:px-6 ${className}`}>{children}</div>;
}

/** Frosted bento tile. */
export const tile = 'rounded-[28px] bg-white/75 backdrop-blur-xl border border-white shadow-[0_24px_60px_-34px_rgba(74,47,214,0.35)]';

export function Chip({ children, className = 'bg-d10-canvas text-d10-deep' }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex w-fit items-center gap-1.5 h-7 px-3 rounded-full text-[12.5px] font-semibold ${className}`}>{children}</span>;
}

export function Display({ as: T = 'h2', children, className = '' }: { as?: 'h1' | 'h2' | 'h3' | 'p'; children: ReactNode; className?: string }) {
  return <T className={`font-d10-display font-semibold tracking-[-0.035em] leading-[1.02] text-d10-ink ${className}`}>{children}</T>;
}

/** Gradient text for the key word of a headline. */
export function Glow({ children }: { children: ReactNode }) {
  return <span className="bg-gradient-to-r from-d10-violet via-[#b26bff] to-[#ff7eb3] bg-clip-text text-transparent">{children}</span>;
}

/** Soft scale-and-fade entrance. */
export function Bloom({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18, scale: 0.98, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/** Pointer-driven 3D tilt with a moving highlight. */
export function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 18 });
  const glare = useTransform([mx, my], ([x, y]) => `radial-gradient(400px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(255,255,255,0.55), transparent 45%)`);
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      ref={ref}
      className={`relative [transform-style:preserve-3d] ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
    >
      {children}
      <motion.span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: glare }} />
    </motion.div>
  );
}

type Tone = 'violet' | 'ink' | 'soft' | 'white';
const tones: Record<Tone, string> = {
  violet: 'bg-d10-violet text-white hover:bg-d10-deep shadow-[0_12px_30px_-12px_rgba(107,78,255,0.8)]',
  ink: 'bg-d10-ink text-white hover:bg-black',
  soft: 'bg-white/80 text-d10-ink border border-d10-line hover:bg-white',
  white: 'bg-white text-d10-deep hover:bg-d10-canvas',
};
const base =
  'group inline-flex items-center justify-center gap-2 h-12 pl-5 pr-4 rounded-full text-[15px] font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-d10-violet';

export function Go({ to, children, tone = 'violet', className = '' }: { to: string; children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <Link to={to} className={`${base} ${tones[tone]} ${className}`}>
      {children}
      <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
    </Link>
  );
}

export function Btn({ children, tone = 'violet', className = '', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone }) {
  return (
    <button className={`${base} pr-5 ${tones[tone]} disabled:opacity-60 ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function Sample({ children = 'Sample content' }: { children?: ReactNode }) {
  return (
    <Chip className="bg-d10-butter text-[#7a5b00]">
      <Sparkle size={12} aria-hidden /> {children}
    </Chip>
  );
}

/** Interior page opening: a three-tile bento (title, image, context). */
export function Bento({ eyebrow, title, intro, image, crumbs, aside, titleAs = 'h1' }: { eyebrow: string; title: ReactNode; intro?: string; image: string; crumbs: { label: string; to?: string }[]; aside?: ReactNode; titleAs?: 'h1' | 'p' }) {
  return (
    <header className="pt-6 pb-4">
      <Shell className="grid lg:grid-cols-[1.5fr_1fr] gap-4">
        <Bloom className={`${tile} p-7 sm:p-10 flex flex-col justify-between min-h-[320px]`}>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-d10-mute">
              <li>
                <Link to={P.home} className="hover:text-d10-violet font-medium">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <span aria-hidden>/</span>
                  {c.to ? (
                    <Link to={c.to} className="hover:text-d10-violet font-medium">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-d10-ink font-semibold">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <div className="mt-10">
            <Chip>{eyebrow}</Chip>
            <Display as={titleAs} className="mt-4 text-[44px] sm:text-[64px] lg:text-[72px]">
              {title}
            </Display>
            {intro && <p className="mt-4 max-w-xl text-[18px] text-d10-mute">{intro}</p>}
          </div>
        </Bloom>
        <div className="grid grid-rows-[1fr_auto] gap-4">
          <Bloom delay={0.08} className="rounded-[28px] overflow-hidden min-h-[200px] relative">
            <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </Bloom>
          {aside && (
            <Bloom delay={0.16} className={`${tile} p-5`}>
              {aside}
            </Bloom>
          )}
        </div>
      </Shell>
    </header>
  );
}

/* ---------- Forms: soft pills, floating focus rings ---------- */
const box =
  'w-full h-[52px] px-4 rounded-2xl bg-d10-canvas/70 border border-transparent text-[16px] text-d10-ink placeholder:text-d10-mute/60 focus:outline-none focus:bg-white focus:border-d10-violet focus:ring-4 focus:ring-d10-violet/15 aria-[invalid=true]:border-[#e5487a] aria-[invalid=true]:bg-[#fff1f5]';

export function Field({ field, form }: { field: FieldDef; form: DemoForm }) {
  const { values, errors, setValue, onBlur, toggleOption, a11y, fieldId } = form;
  const id = fieldId(field.name);
  const err = errors[field.name];
  const msg = err ? (
    <p id={`${id}-error`} className="mt-1.5 text-[13.5px] font-medium text-[#c62f62]">
      {err}
    </p>
  ) : field.helper ? (
    <p id={`${id}-help`} className="mt-1.5 text-[13.5px] text-d10-mute">
      {field.helper}
    </p>
  ) : null;
  const label = (
    <span className="text-[14px] font-semibold text-d10-ink">
      {field.label}
      {field.required ? <span className="text-d10-violet"> *</span> : <span className="font-normal text-d10-mute"> · optional</span>}
    </span>
  );

  if (field.type === 'consent')
    return (
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 p-4 rounded-2xl bg-d10-canvas/70 cursor-pointer text-[15px]">
          <input type="checkbox" {...a11y(field)} checked={values[field.name] === true} onChange={(e) => setValue(field, e.target.checked)} onBlur={() => onBlur(field)} className="mt-0.5 w-5 h-5 accent-[#6b4eff]" />
          {field.label}
        </label>
        {msg}
      </div>
    );

  if (field.type === 'checkboxes') {
    const sel = (values[field.name] as string[]) ?? [];
    return (
      <fieldset className="min-w-0 sm:col-span-2" aria-describedby={err ? `${id}-error` : undefined}>
        <legend className="mb-2.5">{label}</legend>
        <div id={id} tabIndex={-1} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {field.options!.map((o) => {
            const on = sel.includes(o);
            return (
              <label key={o} className={`flex items-center gap-3 h-12 px-4 rounded-2xl cursor-pointer text-[14.5px] font-medium border transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-d10-violet/25 ${on ? 'bg-d10-violet border-d10-violet text-white' : 'bg-white border-d10-line hover:border-d10-violet/40'}`}>
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleOption(field, o)} onBlur={() => onBlur(field)} />
                <span className={`grid place-items-center w-5 h-5 rounded-md text-[11px] ${on ? 'bg-white text-d10-violet' : 'bg-d10-canvas'}`} aria-hidden>
                  {on ? '✓' : ''}
                </span>
                {o}
              </label>
            );
          })}
        </div>
        {msg}
      </fieldset>
    );
  }

  return (
    <div className={`min-w-0 ${field.half ? '' : 'sm:col-span-2'}`}>
      <label htmlFor={id} className="block mb-1.5">
        {label}
      </label>
      {field.type === 'select' ? (
        <select {...a11y(field)} value={values[field.name] as string} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={box}>
          <option value="">Choose…</option>
          {field.options!.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea {...a11y(field)} rows={4} value={values[field.name] as string} placeholder={field.placeholder} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={`${box} h-auto py-3`} />
      ) : (
        <input {...a11y(field)} type={field.type} value={values[field.name] as string} placeholder={field.placeholder} autoComplete={field.autoComplete} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={box} />
      )}
      {msg}
    </div>
  );
}

/** Live completion meter: share of required fields that currently hold a value. */
export function Completion({ form, fields }: { form: DemoForm; fields: FieldDef[] }) {
  const req = fields.filter((f) => f.required);
  const done = req.filter((f) => {
    const v = form.values[f.name];
    return Array.isArray(v) ? v.length > 0 : typeof v === 'boolean' ? v : String(v ?? '').trim() !== '';
  }).length;
  const pct = req.length ? Math.round((done / req.length) * 100) : 100;
  return (
    <div className="flex items-center gap-3" aria-live="polite">
      <div className="relative w-12 h-12">
        <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90" aria-hidden>
          <circle cx="18" cy="18" r="15" fill="none" stroke="#e6e1f7" strokeWidth="4" />
          <motion.circle cx="18" cy="18" r="15" fill="none" stroke="#6b4eff" strokeWidth="4" strokeLinecap="round" strokeDasharray="94.25" animate={{ strokeDashoffset: 94.25 * (1 - pct / 100) }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-[11px] font-bold text-d10-ink">{pct}%</span>
      </div>
      <p className="text-[13.5px] text-d10-mute">
        <span className="font-semibold text-d10-ink">
          {done} of {req.length}
        </span>{' '}
        required fields complete
      </p>
    </div>
  );
}

export function Submit({ form, label }: { form: DemoForm; label: string }) {
  return (
    <div className="sm:col-span-2 flex flex-wrap items-center gap-4 pt-2">
      <Btn type="submit" disabled={form.status === 'submitting'}>
        {form.status === 'submitting' && <Loader2 size={17} className="animate-spin" aria-hidden />}
        {form.status === 'submitting' ? 'Sending…' : label}
      </Btn>
      <Chip>Demo · nothing is sent</Chip>
      {form.errorCount > 0 && (
        <p role="alert" className="w-full text-[14px] font-medium text-[#c62f62]">
          {form.errorCount} {form.errorCount === 1 ? 'field needs' : 'fields need'} a quick look.
        </p>
      )}
    </div>
  );
}

export function Done({ title, form }: { title: string; form: DemoForm }) {
  return (
    <div role="status" className={`${tile} relative overflow-hidden p-8 sm:p-12 text-center`}>
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-d10-violet/25 blur-3xl" aria-hidden />
      <motion.span className="relative mx-auto grid place-items-center w-16 h-16 rounded-2xl bg-d10-violet text-white" initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }}>
        <Sparkle size={28} aria-hidden />
      </motion.span>
      <Display as="h3" className="relative mt-6 text-[32px] sm:text-[40px]">
        {title}
      </Display>
      <p className="relative mt-3 mx-auto max-w-md text-d10-mute">This is a demonstration, so nothing was transmitted and no one was contacted. On a live site, your submission would reach the right team.</p>
      <p className="relative mt-5">
        <Chip className="bg-d10-mint text-[#0e6b47]">Demo reference · {form.reference}</Chip>
      </p>
      <Btn type="button" tone="soft" onClick={form.reset} className="relative mt-8">
        Start over
      </Btn>
    </div>
  );
}
