import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Loader2, CheckCircle2 } from 'lucide-react';
import { makePaths } from '../../lib/paths';
import type { FieldDef } from '../../types';
import type { DemoForm } from '../../hooks/useDemoForm';
import { usePageMeta } from '../../hooks/usePageMeta';

export const P = makePaths('/demo1');
export const CONCEPT = 'Concept 1 · Corporate Classic';
export const useMeta = (title: string, description: string) => usePageMeta(title, description, 'Concept 1');

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] ${light ? 'text-d1-goldlight' : 'text-d1-gold'}`}>
      <span className={`h-px w-8 ${light ? 'bg-d1-goldlight' : 'bg-d1-gold'}`} aria-hidden />
      {children}
    </p>
  );
}

export function Heading({ as: Tag = 'h2', children, className = '', light = false }: { as?: 'h1' | 'h2' | 'h3'; children: ReactNode; className?: string; light?: boolean }) {
  return <Tag className={`font-d1-serif font-semibold leading-[1.08] tracking-[-0.01em] ${light ? 'text-white' : 'text-d1-navy'} ${className}`}>{children}</Tag>;
}

type BtnVariant = 'primary' | 'outline' | 'light' | 'gold';
const btn: Record<BtnVariant, string> = {
  primary: 'bg-d1-navy text-white hover:bg-d1-ink border border-d1-navy',
  outline: 'border border-d1-navy/30 text-d1-navy hover:border-d1-navy hover:bg-d1-navy hover:text-white',
  light: 'border border-white/50 text-white hover:bg-white hover:text-d1-navy',
  gold: 'bg-d1-gold text-white border border-d1-gold hover:bg-[#94733f]',
};
const btnBase =
  'inline-flex items-center justify-center gap-2 h-12 px-7 text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-d1-gold';

export function ButtonLink({ to, children, variant = 'primary', className = '' }: { to: string; children: ReactNode; variant?: BtnVariant; className?: string }) {
  return (
    <Link to={to} className={`${btnBase} ${btn[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({ children, variant = 'primary', className = '', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant }) {
  return (
    <button className={`${btnBase} ${btn[variant]} disabled:opacity-60 ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function TextLink({ to, children, light = false }: { to: string; children: ReactNode; light?: boolean }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] ${light ? 'text-white' : 'text-d1-navy'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-d1-gold`}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">{children}</span>
      <ChevronRight size={15} className="text-d1-gold transition-transform group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SampleTag({ children = 'Sample content', light = false }: { children?: ReactNode; light?: boolean }) {
  return (
    <span className={`inline-block text-[10.5px] font-semibold uppercase tracking-[0.18em] px-2 py-1 border ${light ? 'border-white/30 text-white/70' : 'border-d1-gold/40 text-d1-gold'}`}>{children}</span>
  );
}

export function PageBanner({ title, intro, image, crumbs }: { title: string; intro?: string; image: string; crumbs: { label: string; to?: string }[] }) {
  return (
    <section className="relative bg-d1-navy text-white overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-r from-d1-navy via-d1-navy/85 to-d1-navy/30" aria-hidden />
      <Container className="relative pt-16 pb-16 md:pt-24 md:pb-24">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-white/70">
            <li>
              <Link to={P.home} className="hover:text-white">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span className="text-d1-goldlight" aria-hidden>
                  /
                </span>
                {c.to ? (
                  <Link to={c.to} className="hover:text-white">
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
        <Heading as="h1" light className="text-[42px] sm:text-[56px] md:text-[68px] max-w-3xl">
          {title}
        </Heading>
        {intro && <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-white/80">{intro}</p>}
        <span className="mt-10 block h-px w-24 bg-d1-gold" aria-hidden />
      </Container>
    </section>
  );
}

/* ---------- Forms ---------- */

const inputCls =
  'w-full h-12 px-4 bg-white border border-d1-stone text-d1-ink text-[16px] placeholder:text-d1-muted/60 transition-colors focus:outline-none focus:border-d1-navy focus:ring-1 focus:ring-d1-navy aria-[invalid=true]:border-red-700';

export function Field({ field, form }: { field: FieldDef; form: DemoForm }) {
  const { values, errors, setValue, onBlur, toggleOption, a11y, fieldId } = form;
  const id = fieldId(field.name);
  const err = errors[field.name];
  const label = (
    <>
      {field.label}
      {field.required && (
        <span className="text-d1-gold" aria-hidden>
          {' '}
          *
        </span>
      )}
    </>
  );
  const msg = err ? (
    <p id={`${id}-error`} className="mt-1.5 text-[13px] text-red-700">
      {err}
    </p>
  ) : field.helper ? (
    <p id={`${id}-help`} className="mt-1.5 text-[13px] text-d1-muted">
      {field.helper}
    </p>
  ) : null;

  if (field.type === 'consent') {
    return (
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-[14px] text-d1-muted cursor-pointer">
          <input
            type="checkbox"
            {...a11y(field)}
            checked={values[field.name] === true}
            onChange={(e) => setValue(field, e.target.checked)}
            onBlur={() => onBlur(field)}
            className="mt-1 h-4 w-4 accent-d1-navy"
          />
          <span>{label}</span>
        </label>
        {msg}
      </div>
    );
  }
  if (field.type === 'checkboxes') {
    const selected = (values[field.name] as string[]) ?? [];
    return (
      <fieldset className="sm:col-span-2" aria-describedby={err ? `${id}-error` : undefined}>
        <legend className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-d1-navy">{label}</legend>
        <div className="grid sm:grid-cols-2 gap-2" id={id} tabIndex={-1}>
          {field.options!.map((o) => (
            <label key={o} className={`flex items-center gap-3 px-4 h-11 border cursor-pointer text-[15px] transition-colors ${selected.includes(o) ? 'border-d1-navy bg-d1-navy/[0.04]' : 'border-d1-stone bg-white hover:border-d1-navy/40'}`}>
              <input type="checkbox" className="h-4 w-4 accent-d1-navy" checked={selected.includes(o)} onChange={() => toggleOption(field, o)} onBlur={() => onBlur(field)} />
              {o}
            </label>
          ))}
        </div>
        {msg}
      </fieldset>
    );
  }
  return (
    <div className={field.half ? '' : 'sm:col-span-2'}>
      <label htmlFor={id} className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.12em] text-d1-navy">
        {label}
      </label>
      {field.type === 'select' ? (
        <select {...a11y(field)} value={values[field.name] as string} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={inputCls} autoComplete={field.autoComplete}>
          <option value="">Select…</option>
          {field.options!.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea
          {...a11y(field)}
          rows={5}
          value={values[field.name] as string}
          placeholder={field.placeholder}
          onChange={(e) => setValue(field, e.target.value)}
          onBlur={() => onBlur(field)}
          className={`${inputCls} h-auto py-3`}
        />
      ) : (
        <input
          {...a11y(field)}
          type={field.type}
          value={values[field.name] as string}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          onChange={(e) => setValue(field, e.target.value)}
          onBlur={() => onBlur(field)}
          className={inputCls}
        />
      )}
      {msg}
    </div>
  );
}

export function SubmitRow({ form, label }: { form: DemoForm; label: string }) {
  return (
    <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
      <Button type="submit" disabled={form.status === 'submitting'}>
        {form.status === 'submitting' ? <Loader2 size={16} className="animate-spin" aria-hidden /> : null}
        {form.status === 'submitting' ? 'Submitting…' : label}
      </Button>
      <p className="text-[13px] text-d1-muted">Demo mode — information is not transmitted.</p>
      {form.errorCount > 0 && (
        <p role="alert" className="text-[13px] text-red-700 sm:ml-auto">
          Please correct {form.errorCount} highlighted {form.errorCount === 1 ? 'field' : 'fields'}.
        </p>
      )}
    </div>
  );
}

export function SuccessPanel({ title, form, onReset }: { title: string; form: DemoForm; onReset: () => void }) {
  return (
    <div role="status" className="border border-d1-stone bg-white p-10 text-center">
      <CheckCircle2 className="mx-auto text-d1-gold" size={44} strokeWidth={1.4} aria-hidden />
      <Heading as="h3" className="mt-5 text-[32px]">
        {title}
      </Heading>
      <p className="mt-3 text-d1-muted max-w-md mx-auto">
        Thank you. In this demonstration your details have not been sent anywhere. In production, this confirmation would follow a successful submission to the group’s enquiry system.
      </p>
      <p className="mt-4 text-[13px] uppercase tracking-[0.16em] text-d1-navy">Demo reference: {form.reference}</p>
      <Button variant="outline" className="mt-8" onClick={onReset} type="button">
        Submit another enquiry
      </Button>
    </div>
  );
}
