import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, PartyPopper } from 'lucide-react';
import { makePaths } from '../../lib/paths';
import type { FieldDef } from '../../types';
import type { DemoForm } from '../../hooks/useDemoForm';
import { usePageMeta } from '../../hooks/usePageMeta';

export const P = makePaths('/demo5');
export const CONCEPT = 'Concept 5 · Global Enterprise';
export const useMeta = (title: string, description: string) => usePageMeta(title, description, 'Concept 5');

export function Box({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Pill({ children, tone = 'teal', className = '' }: { children: ReactNode; tone?: 'teal' | 'coral' | 'sun' | 'white'; className?: string }) {
  const t = { teal: 'bg-d5-sky text-d5-teal', coral: 'bg-[#fde9e3] text-[#b5452c]', sun: 'bg-[#fdf0d2] text-[#8a5a00]', white: 'bg-white/90 text-d5-ink' }[tone];
  return <span className={`inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full text-[13px] font-semibold ${t} ${className}`}>{children}</span>;
}

export function Title({ as: T = 'h2', children, className = '' }: { as?: 'h1' | 'h2' | 'h3'; children: ReactNode; className?: string }) {
  return <T className={`font-d5-sans font-extrabold tracking-[-0.03em] leading-[1.08] text-d5-ink ${className}`}>{children}</T>;
}

/** Hand-drawn underline accent for one key word. */
export function Swash({ children, color = '#f4b740' }: { children: ReactNode; color?: string }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <svg className="absolute left-0 right-0 -bottom-1 w-full h-[0.35em] z-0" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden>
        <path d="M3 14 C 50 4, 120 4, 197 10" stroke={color} strokeWidth="7" strokeLinecap="round" fill="none" />
      </svg>
    </span>
  );
}

type T = 'teal' | 'coral' | 'soft' | 'white';
const tv: Record<T, string> = {
  teal: 'bg-d5-teal text-white hover:bg-d5-tealdark shadow-[0_10px_24px_-10px_rgba(15,118,110,0.7)]',
  coral: 'bg-d5-coral text-white hover:bg-[#d4553a] shadow-[0_10px_24px_-10px_rgba(232,102,74,0.7)]',
  soft: 'bg-d5-sky text-d5-teal hover:bg-[#d6ece8]',
  white: 'bg-white text-d5-ink hover:bg-d5-sand',
};
const tb =
  'group inline-flex items-center justify-center gap-2 h-[52px] px-7 rounded-full text-[15.5px] font-bold transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-d5-sun';

export function Go({ to, children, tone = 'teal', className = '' }: { to: string; children: ReactNode; tone?: T; className?: string }) {
  return (
    <Link to={to} className={`${tb} ${tv[tone]} ${className}`}>
      {children}
      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

export function Btn({ children, tone = 'teal', className = '', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: T }) {
  return (
    <button className={`${tb} ${tv[tone]} disabled:opacity-60 ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function Up({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ type: 'spring', stiffness: 80, damping: 18, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Sample({ children = 'Sample content' }: { children?: ReactNode }) {
  return <Pill tone="sun">{children}</Pill>;
}

export function Hero({ eyebrow, title, intro, image, crumbs }: { eyebrow: string; title: ReactNode; intro?: string; image: string; crumbs: { label: string; to?: string }[] }) {
  return (
    <section className="pt-6 pb-10">
      <Box>
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 items-center rounded-[36px] bg-d5-sky p-6 sm:p-10 lg:p-14 overflow-hidden">
          <div>
            <nav aria-label="Breadcrumb">
              <ol className="inline-flex flex-wrap items-center gap-1 rounded-full bg-white/70 px-3 py-1.5 text-[13px] text-d5-mute">
                <li>
                  <Link to={P.home} className="hover:text-d5-teal font-semibold">
                    Home
                  </Link>
                </li>
                {crumbs.map((c) => (
                  <li key={c.label} className="flex items-center gap-1">
                    <span aria-hidden>›</span>
                    {c.to ? (
                      <Link to={c.to} className="hover:text-d5-teal font-semibold">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-d5-ink font-semibold">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            <p className="mt-8 text-[15px] font-bold text-d5-coral">{eyebrow}</p>
            <Title as="h1" className="mt-3 text-[40px] sm:text-[56px] lg:text-[64px]">
              {title}
            </Title>
            {intro && <p className="mt-5 max-w-xl text-[18px] leading-relaxed text-d5-mute">{intro}</p>}
          </div>
          <div className="relative h-[240px] sm:h-[320px] lg:h-[360px]">
            <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover rounded-[28px] lg:rounded-[120px_28px_120px_28px]" />
            <span className="absolute -bottom-3 -left-3 w-20 h-20 rounded-full bg-d5-sun/90 -z-0 hidden lg:block" aria-hidden />
          </div>
        </div>
      </Box>
    </section>
  );
}

/* ---------- Forms ---------- */
const box =
  'w-full h-[52px] px-5 rounded-2xl bg-d5-sand border-2 border-transparent text-d5-ink text-[16px] placeholder:text-d5-mute/60 focus:outline-none focus:border-d5-teal focus:bg-white transition-colors aria-[invalid=true]:border-d5-coral aria-[invalid=true]:bg-[#fff5f2]';

export function Field({ field, form }: { field: FieldDef; form: DemoForm }) {
  const { values, errors, setValue, onBlur, toggleOption, a11y, fieldId } = form;
  const id = fieldId(field.name);
  const err = errors[field.name];
  const msg = err ? (
    <p id={`${id}-error`} className="mt-2 text-[14px] font-medium text-[#b5452c]">
      {err}
    </p>
  ) : field.helper ? (
    <p id={`${id}-help`} className="mt-2 text-[14px] text-d5-mute">
      {field.helper}
    </p>
  ) : null;
  const label = (
    <span className="text-[15px] font-bold text-d5-ink">
      {field.label}
      {field.required ? <span className="text-d5-coral"> *</span> : <span className="font-medium text-d5-mute"> (optional)</span>}
    </span>
  );
  if (field.type === 'consent')
    return (
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 p-4 rounded-2xl bg-d5-sky/60 cursor-pointer text-[15px] text-d5-ink">
          <input type="checkbox" {...a11y(field)} checked={values[field.name] === true} onChange={(e) => setValue(field, e.target.checked)} onBlur={() => onBlur(field)} className="mt-0.5 w-5 h-5 accent-[#0f766e]" />
          {field.label}
        </label>
        {msg}
      </div>
    );
  if (field.type === 'checkboxes') {
    const sel = (values[field.name] as string[]) ?? [];
    return (
      <fieldset className="sm:col-span-2" aria-describedby={err ? `${id}-error` : undefined}>
        <legend>{label}</legend>
        <div id={id} tabIndex={-1} className="mt-3 flex flex-wrap gap-2">
          {field.options!.map((o) => {
            const on = sel.includes(o);
            return (
              <label key={o} className={`inline-flex items-center gap-2 h-11 px-4 rounded-full border-2 cursor-pointer text-[15px] font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-d5-sun ${on ? 'border-d5-teal bg-d5-teal text-white' : 'border-[#e6e1d8] bg-white text-d5-ink hover:border-d5-teal/50'}`}>
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleOption(field, o)} onBlur={() => onBlur(field)} />
                {on ? '✓' : '+'} {o}
              </label>
            );
          })}
        </div>
        {msg}
      </fieldset>
    );
  }
  return (
    <div className={field.half ? '' : 'sm:col-span-2'}>
      <label htmlFor={id} className="block mb-2">
        {label}
      </label>
      {field.type === 'select' ? (
        <select {...a11y(field)} value={values[field.name] as string} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={box}>
          <option value="">Choose one…</option>
          {field.options!.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea {...a11y(field)} rows={4} value={values[field.name] as string} placeholder={field.placeholder} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={`${box} h-auto py-4`} />
      ) : (
        <input {...a11y(field)} type={field.type} value={values[field.name] as string} placeholder={field.placeholder} autoComplete={field.autoComplete} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={box} />
      )}
      {msg}
    </div>
  );
}

export function SendRow({ form, label }: { form: DemoForm; label: string }) {
  return (
    <div className="sm:col-span-2 flex flex-wrap items-center gap-4 pt-2">
      <Btn type="submit" tone="coral" disabled={form.status === 'submitting'}>
        {form.status === 'submitting' && <Loader2 size={18} className="animate-spin" aria-hidden />}
        {form.status === 'submitting' ? 'Sending…' : label}
      </Btn>
      <p className="text-[14px] text-d5-mute">This is a demo — nothing is sent.</p>
      {form.errorCount > 0 && (
        <p role="alert" className="w-full text-[14px] font-semibold text-[#b5452c]">
          Almost there — please check {form.errorCount} {form.errorCount === 1 ? 'field' : 'fields'}.
        </p>
      )}
    </div>
  );
}

export function Thanks({ title, form }: { title: string; form: DemoForm }) {
  return (
    <div role="status" className="rounded-[32px] bg-d5-sky p-10 sm:p-14 text-center">
      <span className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-white text-d5-coral shadow-sm">
        <PartyPopper size={28} aria-hidden />
      </span>
      <Title as="h3" className="mt-6 text-[32px]">
        {title}
      </Title>
      <p className="mt-3 max-w-md mx-auto text-d5-mute text-[16px]">Thank you for reaching out! This is a demonstration, so nothing was sent. On the live site, a member of our team would get back to you personally.</p>
      <p className="mt-4 text-[14px] font-semibold text-d5-teal">Demo reference: {form.reference}</p>
      <Btn type="button" tone="white" className="mt-8" onClick={form.reset}>
        Send another
      </Btn>
    </div>
  );
}
