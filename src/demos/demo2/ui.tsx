import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CheckSquare, Loader2 } from 'lucide-react';
import { makePaths } from '../../lib/paths';
import type { FieldDef } from '../../types';
import type { DemoForm } from '../../hooks/useDemoForm';
import { usePageMeta } from '../../hooks/usePageMeta';

export const P = makePaths('/demo2');
export const CONCEPT = 'Concept 2 · Industrial Powerhouse';
export const useMeta = (title: string, description: string) => usePageMeta(title, description, 'Concept 2');

export function Wrap({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1480px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

/** Mono technical label, e.g. [02] OPERATING COMPANIES */
export function Tag({ index, children, light = false }: { index?: string; children: ReactNode; light?: boolean }) {
  return (
    <p className={`font-d2-mono text-[12px] uppercase tracking-[0.14em] ${light ? 'text-white/60' : 'text-d2-slate'}`}>
      {index && <span className="text-d2-signal">[{index}]</span>} {children}
    </p>
  );
}

export function Display({ as: T = 'h2', children, className = '', light = false }: { as?: 'h1' | 'h2' | 'h3'; children: ReactNode; className?: string; light?: boolean }) {
  return <T className={`font-d2-display font-bold uppercase leading-[0.92] tracking-[-0.005em] ${light ? 'text-white' : 'text-d2-graphite'} ${className}`}>{children}</T>;
}

type V = 'signal' | 'dark' | 'ghost' | 'ghostLight';
const v: Record<V, string> = {
  signal: 'bg-d2-signal text-white hover:bg-d2-signaldark',
  dark: 'bg-d2-graphite text-white hover:bg-d2-navy',
  ghost: 'border border-d2-graphite text-d2-graphite hover:bg-d2-graphite hover:text-white',
  ghostLight: 'border border-white/40 text-white hover:bg-white hover:text-d2-graphite',
};
const base =
  'group inline-flex items-center justify-between gap-6 h-14 pl-6 pr-5 font-d2-display text-[17px] font-semibold uppercase tracking-[0.06em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-d2-signal';

export function Btn({ to, children, variant = 'signal', className = '' }: { to: string; children: ReactNode; variant?: V; className?: string }) {
  return (
    <Link to={to} className={`${base} ${v[variant]} ${className}`}>
      {children}
      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

export function ActionButton({ children, variant = 'signal', className = '', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: V }) {
  return (
    <button className={`${base} ${v[variant]} disabled:opacity-60 ${className}`} {...rest}>
      {children}
    </button>
  );
}

/** Panel with technical corner ticks */
export function Ticks({ children, className = '', dark = false }: { children: ReactNode; className?: string; dark?: boolean }) {
  const c = dark ? 'border-white/40' : 'border-d2-graphite';
  return (
    <div className={`relative ${className}`}>
      <span className={`pointer-events-none absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 ${c}`} aria-hidden />
      <span className={`pointer-events-none absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 ${c}`} aria-hidden />
      <span className={`pointer-events-none absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 ${c}`} aria-hidden />
      <span className={`pointer-events-none absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 ${c}`} aria-hidden />
      {children}
    </div>
  );
}

export function Slide({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Illustrative({ light = false }: { light?: boolean }) {
  return <span className={`font-d2-mono text-[10px] uppercase tracking-[0.14em] px-1.5 py-0.5 border ${light ? 'border-white/30 text-white/60' : 'border-d2-line text-d2-slate'}`}>Illustrative</span>;
}

export function PageHead({ index, title, intro, image, crumbs, titleAs = 'h1' }: { index: string; title: string; intro?: string; image: string; crumbs: { label: string; to?: string }[]; titleAs?: 'h1' | 'p' }) {
  return (
    <section className="relative bg-d2-graphite text-white overflow-hidden pt-[88px]">
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '64px 64px' }} aria-hidden />
      <div className="relative grid lg:grid-cols-[1.25fr_1fr] min-h-[420px]">
        <Wrap className="lg:!mr-0 lg:!max-w-none py-14 lg:py-20 flex flex-col justify-end">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-2 font-d2-mono text-[12px] uppercase tracking-[0.12em] text-white/50">
              <li>
                <Link to={P.home} className="hover:text-d2-signal">
                  Nexora
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex gap-2">
                  <span aria-hidden>/</span>
                  {c.to ? (
                    <Link to={c.to} className="hover:text-d2-signal">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          {titleAs === 'h1' ? (
            <Display as="h1" light className="mt-6 text-[56px] sm:text-[84px] lg:text-[112px]">
              {title}
            </Display>
          ) : (
            <p className="mt-6 font-d2-display font-bold uppercase leading-[0.92] text-white text-[56px] sm:text-[84px] lg:text-[112px]" aria-hidden>
              {title}
            </p>
          )}
          {intro && <p className="mt-6 max-w-xl text-[18px] text-white/70 leading-relaxed">{intro}</p>}
          <p className="mt-10 font-d2-mono text-[12px] tracking-[0.14em] text-d2-signal">SECTION {index} / 10</p>
        </Wrap>
        <div className="relative hidden lg:block [clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]">
          <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-d2-navy/30 mix-blend-multiply" aria-hidden />
        </div>
      </div>
    </section>
  );
}

/* ---------- Forms ---------- */
const input =
  'w-full h-14 px-4 bg-d2-plate border-0 border-b-2 border-d2-line text-d2-graphite text-[16px] font-d2-sans placeholder:text-d2-slate/70 focus:outline-none focus:border-d2-signal focus:bg-white transition-colors aria-[invalid=true]:border-red-600';

export function Field({ field, form }: { field: FieldDef; form: DemoForm }) {
  const { values, errors, setValue, onBlur, toggleOption, a11y, fieldId } = form;
  const id = fieldId(field.name);
  const err = errors[field.name];
  const lbl = (
    <>
      {field.label}
      {field.required ? <span className="text-d2-signal"> *</span> : <span className="text-d2-slate normal-case tracking-normal"> (optional)</span>}
    </>
  );
  const note = err ? (
    <p id={`${id}-error`} className="mt-1.5 font-d2-mono text-[12px] text-red-600">
      ! {err}
    </p>
  ) : field.helper ? (
    <p id={`${id}-help`} className="mt-1.5 font-d2-mono text-[12px] text-d2-slate">
      {field.helper}
    </p>
  ) : null;

  if (field.type === 'consent')
    return (
      <div className="md:col-span-2">
        <label className="flex gap-3 items-start text-[14px] text-d2-slate cursor-pointer">
          <input type="checkbox" {...a11y(field)} checked={values[field.name] === true} onChange={(e) => setValue(field, e.target.checked)} onBlur={() => onBlur(field)} className="mt-1 w-4 h-4 accent-[#ff5a1f]" />
          <span>{field.label}</span>
        </label>
        {note}
      </div>
    );
  if (field.type === 'checkboxes') {
    const sel = (values[field.name] as string[]) ?? [];
    return (
      <fieldset className="md:col-span-2" aria-describedby={err ? `${id}-error` : undefined}>
        <legend className="font-d2-mono text-[12px] uppercase tracking-[0.12em] text-d2-graphite mb-3">{lbl}</legend>
        <div id={id} tabIndex={-1} className="flex flex-wrap gap-2">
          {field.options!.map((o) => {
            const on = sel.includes(o);
            return (
              <label key={o} className={`inline-flex items-center gap-2 h-11 px-4 cursor-pointer font-d2-display uppercase text-[15px] tracking-[0.04em] border transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-d2-signal ${on ? 'bg-d2-graphite text-white border-d2-graphite' : 'bg-white border-d2-line text-d2-graphite hover:border-d2-graphite'}`}>
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleOption(field, o)} onBlur={() => onBlur(field)} />
                {on && <CheckSquare size={15} className="text-d2-signal" aria-hidden />}
                {o}
              </label>
            );
          })}
        </div>
        {note}
      </fieldset>
    );
  }
  return (
    <div className={field.half ? '' : 'md:col-span-2'}>
      <label htmlFor={id} className="block font-d2-mono text-[12px] uppercase tracking-[0.12em] text-d2-graphite mb-2">
        {lbl}
      </label>
      {field.type === 'select' ? (
        <select {...a11y(field)} value={values[field.name] as string} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={input}>
          <option value="">— Select —</option>
          {field.options!.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea {...a11y(field)} rows={4} value={values[field.name] as string} placeholder={field.placeholder} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={`${input} h-auto py-3`} />
      ) : (
        <input {...a11y(field)} type={field.type} value={values[field.name] as string} placeholder={field.placeholder} autoComplete={field.autoComplete} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={input} />
      )}
      {note}
    </div>
  );
}

export function Submit({ form, label }: { form: DemoForm; label: string }) {
  return (
    <div className="md:col-span-2 flex flex-wrap items-center gap-5 pt-4 border-t border-d2-line">
      <ActionButton type="submit" disabled={form.status === 'submitting'} className="min-w-[260px]">
        {form.status === 'submitting' ? 'Processing…' : label}
        {form.status === 'submitting' ? <Loader2 size={18} className="animate-spin" aria-hidden /> : <ArrowUpRight size={18} aria-hidden />}
      </ActionButton>
      <p className="font-d2-mono text-[12px] uppercase tracking-[0.1em] text-d2-slate">Demo mode · no data transmitted</p>
      {form.errorCount > 0 && (
        <p role="alert" className="w-full font-d2-mono text-[12px] text-red-600">
          {form.errorCount} field{form.errorCount > 1 ? 's' : ''} require attention.
        </p>
      )}
    </div>
  );
}

export function Done({ heading, form }: { heading: string; form: DemoForm }) {
  return (
    <Ticks className="bg-d2-graphite text-white p-10 sm:p-14">
      <div role="status">
        <p className="font-d2-mono text-[12px] tracking-[0.14em] text-d2-signal">STATUS: RECEIVED (DEMO)</p>
        <Display as="h3" light className="mt-4 text-[48px]">
          {heading}
        </Display>
        <p className="mt-4 max-w-lg text-white/70">This demonstration does not transmit data. In production, your submission would be routed to the relevant team, who would respond within the stated service level.</p>
        <dl className="mt-8 grid grid-cols-2 max-w-md border-t border-white/20 font-d2-mono text-[13px]">
          <dt className="py-3 text-white/50">REFERENCE</dt>
          <dd className="py-3">{form.reference}</dd>
          <dt className="py-3 text-white/50 border-t border-white/10">MODE</dt>
          <dd className="py-3 border-t border-white/10">Demonstration</dd>
        </dl>
        <ActionButton type="button" variant="ghostLight" className="mt-8" onClick={form.reset}>
          New submission
        </ActionButton>
      </div>
    </Ticks>
  );
}
