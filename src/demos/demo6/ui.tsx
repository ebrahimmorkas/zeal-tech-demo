import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { makePaths } from '../../lib/paths';
import type { FieldDef } from '../../types';
import type { DemoForm } from '../../hooks/useDemoForm';
import { usePageMeta } from '../../hooks/usePageMeta';

export const P = makePaths('/demo6');
export const CONCEPT = 'Concept 6 · Swiss Precision';
export const useMeta = (title: string, description: string) => usePageMeta(title, description, 'Concept 6');

/** Wide/narrow cuts of the Archivo variable font give the concept its typographic voice. */
export const wide = { fontStretch: '125%' } as const;
export const narrow = { fontStretch: '72%' } as const;

export function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`w-full px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

/** Small uppercase label with a red index number. */
export function Label({ n, children, className = '' }: { n?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-baseline gap-3 text-[12px] font-semibold uppercase tracking-[0.14em] ${className}`} style={narrow}>
      {n && <span className="text-d6-red tabular-nums">{n}</span>}
      <span>{children}</span>
    </p>
  );
}

export function H({ as: T = 'h2', children, className = '' }: { as?: 'h1' | 'h2' | 'h3' | 'p'; children: ReactNode; className?: string }) {
  return (
    <T className={`font-d6-sans font-extrabold tracking-[-0.045em] leading-[0.92] ${className}`} style={wide}>
      {children}
    </T>
  );
}

/** Horizontal clip-path wipe — the concept's signature reveal. */
export function Wipe({ children, delay = 0, className = '', immediate = false }: { children: ReactNode; delay?: number; className?: string; immediate?: boolean }) {
  // `immediate` is for content at the top of a page, which should reveal on load rather than on scroll.
  const to = { clipPath: 'inset(0 0% 0 0)' };
  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(0 99% 0 0)' }}
      animate={immediate ? to : undefined}
      whileInView={immediate ? undefined : to}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/** A thick rule that draws from left to right. */
export function Rule({ className = 'bg-d6-ink h-[3px]' }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={`origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.77, 0, 0.18, 1] }}
    />
  );
}

/** Counts up to a numeric value once visible; non-numeric suffixes are preserved. */
export function Count({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const m = value.match(/^([\d,]+)(.*)$/);
  const target = m ? Number(m[1].replace(/,/g, '')) : 0;
  const [shown, setShown] = useState(m ? (reduce ? value : `0${m[2]}`) : value);
  useEffect(() => {
    if (!m || !inView || reduce) return;
    const ctl = animate(0, target, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setShown(`${Math.round(v).toLocaleString('en-US')}${m[2]}`),
    });
    return () => ctl.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);
  return <span ref={ref}>{shown}</span>;
}

type Tone = 'red' | 'ink' | 'line';
const tones: Record<Tone, string> = {
  red: 'bg-d6-red text-white hover:bg-d6-ink',
  ink: 'bg-d6-ink text-white hover:bg-d6-red',
  line: 'border-2 border-d6-ink text-d6-ink hover:bg-d6-ink hover:text-white',
};
const base =
  'group inline-flex items-center justify-between gap-8 h-14 px-5 text-[14px] font-bold uppercase tracking-[0.08em] transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-d6-red';

export function Go({ to, children, tone = 'red', className = '' }: { to: string; children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <Link to={to} className={`${base} ${tones[tone]} ${className}`} style={narrow}>
      {children}
      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

export function Btn({ children, tone = 'red', className = '', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone }) {
  return (
    <button className={`${base} ${tones[tone]} disabled:opacity-60 ${className}`} style={narrow} {...rest}>
      {children}
    </button>
  );
}

export function Sample({ children = 'Sample content' }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-d6-mid" style={narrow}>
      <span className="w-2 h-2 bg-d6-red" aria-hidden />
      {children}
    </span>
  );
}

/** Grayscale image that returns to colour on hover, with a red registration square. */
export function Photo({ src, alt, className = '', imgClass = 'aspect-[4/3]', mark = true }: { src: string; alt: string; className?: string; imgClass?: string; mark?: boolean }) {
  return (
    <div className={`relative group/photo ${className}`}>
      <div className="overflow-hidden">
        <img src={src} alt={alt} loading="lazy" className={`w-full object-cover grayscale contrast-[1.08] transition-[filter,transform] duration-700 group-hover/photo:grayscale-0 group-hover/photo:scale-[1.02] ${imgClass}`} />
      </div>
      {mark && <span className="absolute -top-3 -left-3 w-6 h-6 bg-d6-red" aria-hidden />}
    </div>
  );
}

export function PageHead({ n, title, intro, crumbs, titleAs = 'h1' }: { n: string; title: ReactNode; intro?: string; crumbs: { label: string; to?: string }[]; titleAs?: 'h1' | 'p' }) {
  return (
    <header className="pt-10 lg:pt-16 pb-10 lg:pb-14 border-b-[3px] border-d6-ink">
      <Frame>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-d6-mid" style={narrow}>
              <li>
                <Link to={P.home} className="hover:text-d6-red">
                  Index
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  {c.to ? (
                    <Link to={c.to} className="hover:text-d6-red">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-d6-ink">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-d6-red tabular-nums" style={narrow}>
            Section {n}
          </p>
        </div>
        <div className="mt-10 grid lg:grid-cols-12 gap-6 items-end">
          <span className="hidden lg:block lg:col-span-2 font-d6-sans font-extrabold text-[120px] leading-[0.8] text-d6-red tabular-nums tracking-[-0.06em]" style={wide} aria-hidden>
            {n}
          </span>
          <div className="lg:col-span-10">
            <Wipe immediate>
              <H as={titleAs} className="text-[44px] sm:text-[72px] xl:text-[104px]">
                {title}
              </H>
            </Wipe>
          </div>
        </div>
        {intro && <p className="mt-8 lg:ml-[16.66%] max-w-2xl text-[19px] leading-[1.5] text-d6-ink/80">{intro}</p>}
      </Frame>
    </header>
  );
}

/* ---------- Forms: hard-edged boxes, uppercase labels, red errors ---------- */
const box =
  'w-full h-14 px-4 bg-white border-2 border-d6-ink text-[16px] text-d6-ink placeholder:text-d6-mid/70 rounded-none focus:outline-none focus:bg-d6-grey focus:border-d6-red aria-[invalid=true]:border-d6-red';

export function Field({ field, form }: { field: FieldDef; form: DemoForm }) {
  const { values, errors, setValue, onBlur, toggleOption, a11y, fieldId } = form;
  const id = fieldId(field.name);
  const err = errors[field.name];
  const msg = err ? (
    <p id={`${id}-error`} className="mt-2 flex gap-2 text-[14px] font-semibold text-d6-red">
      <span aria-hidden>■</span>
      {err}
    </p>
  ) : field.helper ? (
    <p id={`${id}-help`} className="mt-2 text-[13px] text-d6-mid">
      {field.helper}
    </p>
  ) : null;
  const label = (
    <span className="text-[12px] font-bold uppercase tracking-[0.12em]" style={narrow}>
      {field.label}
      {field.required ? <span className="text-d6-red"> *</span> : <span className="text-d6-mid font-medium"> — optional</span>}
    </span>
  );

  if (field.type === 'consent')
    return (
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 cursor-pointer text-[15px]">
          <input type="checkbox" {...a11y(field)} checked={values[field.name] === true} onChange={(e) => setValue(field, e.target.checked)} onBlur={() => onBlur(field)} className="mt-0.5 w-5 h-5 accent-[#e10600]" />
          {field.label}
        </label>
        {msg}
      </div>
    );

  if (field.type === 'checkboxes') {
    const sel = (values[field.name] as string[]) ?? [];
    return (
      <fieldset className="min-w-0 sm:col-span-2" aria-describedby={err ? `${id}-error` : undefined}>
        <legend className="mb-3">{label}</legend>
        <div id={id} tabIndex={-1} className="grid sm:grid-cols-2 border-t-2 border-d6-ink">
          {field.options!.map((o, i) => {
            const on = sel.includes(o);
            return (
              <label key={o} className={`flex items-center gap-3 h-12 px-3 border-b border-d6-line cursor-pointer text-[15px] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-d6-red ${on ? 'bg-d6-ink text-white' : 'hover:bg-d6-grey'}`}>
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleOption(field, o)} onBlur={() => onBlur(field)} />
                <span className={`text-[11px] tabular-nums ${on ? 'text-d6-red' : 'text-d6-mid'}`}>{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1">{o}</span>
                <span className={`w-3 h-3 ${on ? 'bg-d6-red' : 'border border-d6-ink'}`} aria-hidden />
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
      <label htmlFor={id} className="block mb-2">
        {label}
      </label>
      {field.type === 'select' ? (
        <select {...a11y(field)} value={values[field.name] as string} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={box}>
          <option value="">Select</option>
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

export function Submit({ form, label }: { form: DemoForm; label: string }) {
  return (
    <div className="sm:col-span-2 pt-4 border-t-[3px] border-d6-ink flex flex-wrap items-center gap-5">
      <Btn type="submit" disabled={form.status === 'submitting'} className="min-w-[260px]">
        <span>{form.status === 'submitting' ? 'Processing' : label}</span>
        {form.status === 'submitting' ? <Loader2 size={18} className="animate-spin" aria-hidden /> : <ArrowRight size={18} aria-hidden />}
      </Btn>
      <Sample>Demo form · no data transmitted</Sample>
      {form.errorCount > 0 && (
        <p role="alert" className="w-full text-[14px] font-bold text-d6-red">
          {form.errorCount} {form.errorCount === 1 ? 'field requires' : 'fields require'} attention.
        </p>
      )}
    </div>
  );
}

export function Done({ title, form }: { title: string; form: DemoForm }) {
  return (
    <div role="status" className="border-[3px] border-d6-ink">
      <div className="bg-d6-red text-white p-6 sm:p-10">
        <Label className="text-white/80">Status · Received (demo)</Label>
        <H as="h3" className="mt-6 text-[40px] sm:text-[56px]">
          {title}
        </H>
      </div>
      <dl className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-d6-line">
        <div className="p-6">
          <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-d6-mid">Reference</dt>
          <dd className="mt-2 text-[20px] font-bold tabular-nums">{form.reference}</dd>
        </div>
        <div className="p-6 sm:col-span-2">
          <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-d6-mid">Note</dt>
          <dd className="mt-2 text-[15px] text-d6-ink/80">This is a demonstration. Nothing was transmitted and no one has been contacted. A live site would route this to the relevant team.</dd>
        </div>
      </dl>
      <div className="p-6 border-t border-d6-line">
        <Btn type="button" tone="line" onClick={form.reset}>
          New submission
        </Btn>
      </div>
    </div>
  );
}
