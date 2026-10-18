import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { makePaths } from '../../lib/paths';
import type { FieldDef } from '../../types';
import type { DemoForm } from '../../hooks/useDemoForm';
import { usePageMeta } from '../../hooks/usePageMeta';

export const P = makePaths('/demo4');
export const CONCEPT = 'Concept 4 · Technology Group';
export const useMeta = (title: string, description: string) => usePageMeta(title, description, 'Concept 4');

export function Shell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Mono({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`font-d4-mono text-[12px] tracking-[0.04em] ${className}`}>{children}</p>;
}

export function Label({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-2 font-d4-mono text-[12px] ${dark ? 'text-d4-teal' : 'text-d4-indigo'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dark ? 'bg-d4-teal' : 'bg-d4-indigo'}`} aria-hidden />
      {children}
    </p>
  );
}

export function H({ as: T = 'h2', children, className = '', dark = false }: { as?: 'h1' | 'h2' | 'h3'; children: ReactNode; className?: string; dark?: boolean }) {
  return <T className={`font-d4-display font-medium tracking-[-0.03em] leading-[1.05] ${dark ? 'text-white' : 'text-d4-deep'} ${className}`}>{children}</T>;
}

/** Gradient text used sparingly for one emphasised word. */
export function Grad({ children }: { children: ReactNode }) {
  return <span className="bg-gradient-to-r from-[#8b96ff] to-d4-teal bg-clip-text text-transparent">{children}</span>;
}

type BV = 'primary' | 'ghostDark' | 'ghost' | 'light';
const bv: Record<BV, string> = {
  primary: 'bg-d4-indigo text-white hover:bg-[#4f5ef0] shadow-[0_8px_24px_-8px_rgba(97,112,255,0.7)]',
  ghostDark: 'bg-white/5 text-white ring-1 ring-white/15 hover:bg-white/10',
  ghost: 'bg-white text-d4-deep ring-1 ring-[#dfe3ef] hover:ring-d4-indigo/50',
  light: 'bg-white text-d4-deep hover:bg-d4-mist',
};
const bb =
  'group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full text-[15px] font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-d4-indigo';

export function Btn({ to, children, variant = 'primary', className = '' }: { to: string; children: ReactNode; variant?: BV; className?: string }) {
  return (
    <Link to={to} className={`${bb} ${bv[variant]} ${className}`}>
      {children}
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
  );
}

export function Button({ children, variant = 'primary', className = '', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BV }) {
  return (
    <button className={`${bb} ${bv[variant]} disabled:opacity-50 disabled:shadow-none ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function Rise({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-white ring-1 ring-[#e4e8f2] shadow-[0_1px_2px_rgba(13,19,38,0.04)] ${className}`}>{children}</div>;
}

export function Chip({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center h-7 px-3 rounded-full text-[12.5px] bg-d4-mist ring-1 ring-[#e4e8f2] text-d4-deep/80 ${className}`}>{children}</span>;
}

export function SampleChip({ dark = false }: { dark?: boolean }) {
  return <span className={`inline-flex items-center h-6 px-2.5 rounded-full font-d4-mono text-[10.5px] ${dark ? 'bg-white/5 ring-1 ring-white/15 text-d4-haze' : 'bg-amber-50 ring-1 ring-amber-200 text-amber-800'}`}>sample data</span>;
}

/** Dotted grid background used on dark surfaces. */
export const dots = { backgroundImage: 'radial-gradient(rgba(169,179,204,0.18) 1px, transparent 1px)', backgroundSize: '22px 22px' };

export function PageTop({ label, title, intro, crumbs, aside }: { label: string; title: ReactNode; intro?: string; crumbs: { label: string; to?: string }[]; aside?: ReactNode }) {
  return (
    <section className="relative bg-d4-void text-white overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-24">
      <div className="absolute inset-0" style={dots} aria-hidden />
      <div className="absolute -top-40 right-[-10%] w-[620px] h-[620px] rounded-full bg-d4-indigo/25 blur-[120px]" aria-hidden />
      <div className="absolute bottom-[-200px] left-[-10%] w-[480px] h-[480px] rounded-full bg-d4-teal/10 blur-[120px]" aria-hidden />
      <Shell className="relative grid lg:grid-cols-[1.4fr_1fr] gap-10 items-end">
        <div>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-1.5 font-d4-mono text-[12px] text-d4-haze">
              <li>
                <Link to={P.home} className="hover:text-white">
                  ~
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex gap-1.5">
                  <span aria-hidden>/</span>
                  {c.to ? (
                    <Link to={c.to} className="hover:text-white">
                      {c.label.toLowerCase().replace(/\s+/g, '-')}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {c.label.toLowerCase().replace(/\s+/g, '-')}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <div className="mt-8">
            <Label dark>{label}</Label>
          </div>
          <H as="h1" dark className="mt-4 text-[44px] sm:text-[64px] lg:text-[76px]">
            {title}
          </H>
          {intro && <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-d4-haze">{intro}</p>}
        </div>
        {aside && <div className="hidden lg:block">{aside}</div>}
      </Shell>
    </section>
  );
}

/* ---------- Forms ---------- */
const ctl =
  'w-full h-12 px-4 rounded-xl bg-white ring-1 ring-[#dfe3ef] text-d4-deep text-[15px] placeholder:text-d4-deep/35 focus:outline-none focus:ring-2 focus:ring-d4-indigo transition-shadow aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-rose-500';

export function Field({ field, form }: { field: FieldDef; form: DemoForm }) {
  const { values, errors, setValue, onBlur, toggleOption, a11y, fieldId } = form;
  const id = fieldId(field.name);
  const err = errors[field.name];
  const note = err ? (
    <p id={`${id}-error`} className="mt-1.5 text-[13px] text-rose-600">
      {err}
    </p>
  ) : field.helper ? (
    <p id={`${id}-help`} className="mt-1.5 text-[13px] text-d4-deep/55">
      {field.helper}
    </p>
  ) : null;
  const label = (
    <span className="text-[13.5px] font-medium text-d4-deep">
      {field.label}
      {!field.required && field.type !== 'consent' && <span className="ml-1.5 font-d4-mono text-[11px] text-d4-deep/45">optional</span>}
    </span>
  );
  if (field.type === 'consent')
    return (
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-[14px] text-d4-deep/70 cursor-pointer">
          <input type="checkbox" {...a11y(field)} checked={values[field.name] === true} onChange={(e) => setValue(field, e.target.checked)} onBlur={() => onBlur(field)} className="mt-0.5 w-[18px] h-[18px] rounded accent-[#6170ff]" />
          {field.label}
        </label>
        {note}
      </div>
    );
  if (field.type === 'checkboxes') {
    const sel = (values[field.name] as string[]) ?? [];
    return (
      <fieldset className="sm:col-span-2" aria-describedby={err ? `${id}-error` : undefined}>
        <legend>{label}</legend>
        <div id={id} tabIndex={-1} className="mt-2.5 flex flex-wrap gap-2">
          {field.options!.map((o) => {
            const on = sel.includes(o);
            return (
              <label key={o} className={`inline-flex items-center gap-2 h-10 px-4 rounded-full cursor-pointer text-[14px] transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-d4-indigo ${on ? 'bg-d4-indigo text-white shadow-[0_6px_16px_-8px_rgba(97,112,255,0.9)]' : 'bg-white ring-1 ring-[#dfe3ef] text-d4-deep hover:ring-d4-indigo/50'}`}>
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleOption(field, o)} onBlur={() => onBlur(field)} />
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
    <div className={field.half ? '' : 'sm:col-span-2'}>
      <label htmlFor={id} className="block mb-1.5">
        {label}
      </label>
      {field.type === 'select' ? (
        <select {...a11y(field)} value={values[field.name] as string} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={ctl}>
          <option value="">Select an option</option>
          {field.options!.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea {...a11y(field)} rows={4} value={values[field.name] as string} placeholder={field.placeholder} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={`${ctl} h-auto py-3`} />
      ) : (
        <input {...a11y(field)} type={field.type} value={values[field.name] as string} placeholder={field.placeholder} autoComplete={field.autoComplete} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={ctl} />
      )}
      {note}
    </div>
  );
}

export function SubmitBar({ form, label }: { form: DemoForm; label: string }) {
  return (
    <div className="sm:col-span-2 flex flex-wrap items-center gap-4 pt-2">
      <Button type="submit" disabled={form.status === 'submitting'}>
        {form.status === 'submitting' && <Loader2 size={16} className="animate-spin" aria-hidden />}
        {form.status === 'submitting' ? 'Submitting' : label}
      </Button>
      <Mono className="text-d4-deep/50">demo_mode: true · nothing is transmitted</Mono>
      {form.errorCount > 0 && (
        <p role="alert" className="w-full text-[13px] text-rose-600">
          {form.errorCount} field{form.errorCount > 1 ? 's need' : ' needs'} attention.
        </p>
      )}
    </div>
  );
}

export function Success({ title, form }: { title: string; form: DemoForm }) {
  return (
    <Card className="p-10 text-center">
      <div role="status">
        <span className="mx-auto grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-d4-indigo to-d4-teal text-white">
          <CheckCircle2 size={26} aria-hidden />
        </span>
        <H as="h3" className="mt-6 text-[32px]">
          {title}
        </H>
        <p className="mt-3 text-d4-deep/65 max-w-md mx-auto">Demo mode: your details were validated locally and not transmitted. A production build would forward this to a secure backend.</p>
        <Mono className="mt-5 text-d4-indigo">ref: {form.reference}</Mono>
        <Button type="button" variant="ghost" className="mt-8" onClick={form.reset}>
          Start a new submission
        </Button>
      </div>
    </Card>
  );
}
