import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { makePaths } from '../../lib/paths';
import type { FieldDef } from '../../types';
import type { DemoForm } from '../../hooks/useDemoForm';
import { usePageMeta } from '../../hooks/usePageMeta';

export const P = makePaths('/demo3');
export const CONCEPT = 'Concept 3 · Editorial Luxury';
export const useMeta = (title: string, description: string) => usePageMeta(title, description, 'Concept 3');

export const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export function Page({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-10 lg:px-16 ${className}`}>{children}</div>;
}

export function Kicker({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`font-d3-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-d3-oxblood ${className}`}>{children}</p>;
}

export function Serif({ as: T = 'h2', children, className = '' }: { as?: 'h1' | 'h2' | 'h3' | 'p'; children: ReactNode; className?: string }) {
  return <T className={`font-d3-serif font-light tracking-[-0.02em] leading-[1.02] text-d3-ink ${className}`}>{children}</T>;
}

export function Rule({ className = '' }: { className?: string }) {
  return <hr className={`border-0 h-px bg-d3-rule ${className}`} />;
}

export function Ornament() {
  return (
    <div className="flex items-center justify-center gap-4 text-d3-oxblood" aria-hidden>
      <span className="h-px w-16 bg-d3-rule" />
      <span className="font-d3-serif italic text-[22px]">❦</span>
      <span className="h-px w-16 bg-d3-rule" />
    </div>
  );
}

export function ReadLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-3 font-d3-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-d3-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-d3-oxblood ${className}`}
    >
      <span className="border-b border-d3-ink/40 pb-1 group-hover:border-d3-oxblood group-hover:text-d3-oxblood transition-colors">{children}</span>
      <span className="text-d3-oxblood transition-transform group-hover:translate-x-1" aria-hidden>
        →
      </span>
    </Link>
  );
}

export function SolidLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={`inline-flex items-center h-12 px-8 bg-d3-ink text-d3-paper font-d3-sans text-[12px] font-semibold uppercase tracking-[0.22em] hover:bg-d3-oxblood transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-d3-oxblood ${className}`}>
      {children}
    </Link>
  );
}

export function Fade({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="font-d3-serif italic text-[14px] text-d3-taupe">{children}</p>;
}

/** Interior page opening — centred editorial title, no banner image. */
export function Opening({ chapter, title, deck, crumbs }: { chapter: string; title: ReactNode; deck?: string; crumbs: { label: string; to?: string }[] }) {
  return (
    <header className="pt-14 pb-14 lg:pt-20 lg:pb-20 text-center">
      <Page>
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex justify-center flex-wrap gap-2 font-d3-sans text-[11px] uppercase tracking-[0.24em] text-d3-taupe">
            <li>
              <Link to={P.home} className="hover:text-d3-oxblood">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex gap-2">
                <span aria-hidden>·</span>
                {c.to ? (
                  <Link to={c.to} className="hover:text-d3-oxblood">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-d3-ink">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Kicker>{chapter}</Kicker>
        <Serif as="h1" className="mt-6 text-[52px] sm:text-[80px] lg:text-[112px] max-w-5xl mx-auto">
          {title}
        </Serif>
        {deck && <p className="mt-8 max-w-2xl mx-auto font-d3-serif italic font-light text-[22px] sm:text-[24px] leading-[1.45] text-d3-taupe">{deck}</p>}
        <div className="mt-12">
          <Ornament />
        </div>
      </Page>
    </header>
  );
}

export function Figure({ src, alt, caption, className = '', imgClass = '' }: { src: string; alt: string; caption?: string; className?: string; imgClass?: string }) {
  return (
    <figure className={className}>
      <img src={src} alt={alt} className={`w-full object-cover ${imgClass}`} loading="lazy" />
      {caption && (
        <figcaption className="mt-3 flex gap-3 font-d3-serif italic text-[14px] text-d3-taupe">
          <span className="h-px w-6 bg-d3-rule mt-[10px] shrink-0" aria-hidden />
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ---------- Forms: underline-only "correspondence" style ---------- */
const line =
  'w-full bg-transparent border-0 border-b border-d3-ink/30 px-0 py-3 font-d3-serif text-[20px] text-d3-ink placeholder:text-d3-taupe/60 placeholder:italic focus:outline-none focus:border-d3-oxblood focus:ring-0 transition-colors aria-[invalid=true]:border-d3-oxblood';

export function Field({ field, form }: { field: FieldDef; form: DemoForm }) {
  const { values, errors, setValue, onBlur, toggleOption, a11y, fieldId } = form;
  const id = fieldId(field.name);
  const err = errors[field.name];
  const note = err ? (
    <p id={`${id}-error`} className="mt-2 font-d3-serif italic text-[15px] text-d3-oxblood">
      {err}
    </p>
  ) : field.helper ? (
    <p id={`${id}-help`} className="mt-2 font-d3-serif italic text-[14px] text-d3-taupe">
      {field.helper}
    </p>
  ) : null;
  const label = (
    <span className="font-d3-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-d3-taupe">
      {field.label}
      {field.required && <span className="text-d3-oxblood"> *</span>}
    </span>
  );

  if (field.type === 'consent')
    return (
      <div className="md:col-span-2">
        <label className="flex items-start gap-3 cursor-pointer font-d3-serif italic text-[16px] text-d3-taupe">
          <input type="checkbox" {...a11y(field)} checked={values[field.name] === true} onChange={(e) => setValue(field, e.target.checked)} onBlur={() => onBlur(field)} className="mt-1.5 w-4 h-4 accent-[#6e2a20]" />
          {field.label}
        </label>
        {note}
      </div>
    );
  if (field.type === 'checkboxes') {
    const sel = (values[field.name] as string[]) ?? [];
    return (
      <fieldset className="md:col-span-2" aria-describedby={err ? `${id}-error` : undefined}>
        <legend>{label}</legend>
        <div id={id} tabIndex={-1} className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          {field.options!.map((o) => (
            <label key={o} className="inline-flex items-center gap-2.5 cursor-pointer font-d3-serif text-[18px] text-d3-ink">
              <input type="checkbox" checked={sel.includes(o)} onChange={() => toggleOption(field, o)} onBlur={() => onBlur(field)} className="w-4 h-4 accent-[#6e2a20]" />
              <span className={sel.includes(o) ? 'italic text-d3-oxblood' : ''}>{o}</span>
            </label>
          ))}
        </div>
        {note}
      </fieldset>
    );
  }
  return (
    <div className={field.half ? '' : 'md:col-span-2'}>
      <label htmlFor={id}>{label}</label>
      {field.type === 'select' ? (
        <select {...a11y(field)} value={values[field.name] as string} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={`${line} cursor-pointer`}>
          <option value="">Please select</option>
          {field.options!.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea {...a11y(field)} rows={3} value={values[field.name] as string} placeholder={field.placeholder} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={`${line} resize-y`} />
      ) : (
        <input {...a11y(field)} type={field.type} value={values[field.name] as string} placeholder={field.placeholder} autoComplete={field.autoComplete} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={line} />
      )}
      {note}
    </div>
  );
}

export function Send({ form, label }: { form: DemoForm; label: string }) {
  return (
    <div className="md:col-span-2 pt-6 flex flex-col sm:flex-row sm:items-center gap-5">
      <button type="submit" disabled={form.status === 'submitting'} className="h-14 px-10 bg-d3-oxblood text-d3-paper font-d3-sans text-[12px] font-semibold uppercase tracking-[0.24em] hover:bg-d3-ink transition-colors disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-d3-oxblood">
        {form.status === 'submitting' ? 'Sending…' : label}
      </button>
      <Note>A demonstration — nothing will be sent.</Note>
      {form.errorCount > 0 && (
        <p role="alert" className="sm:ml-auto font-d3-serif italic text-d3-oxblood">
          Kindly review {form.errorCount} {form.errorCount === 1 ? 'entry' : 'entries'} above.
        </p>
      )}
    </div>
  );
}

export function Received({ title, form }: { title: string; form: DemoForm }) {
  return (
    <div role="status" className="text-center py-16 px-6 bg-d3-cream border border-d3-rule">
      <Ornament />
      <Serif as="h3" className="mt-8 text-[44px]">
        <em>{title}</em>
      </Serif>
      <p className="mt-5 max-w-md mx-auto text-d3-taupe leading-relaxed">
        Thank you for writing to us. As this is a design demonstration, your letter has not been sent. In production, the appropriate office would reply personally.
      </p>
      <p className="mt-6 font-d3-sans text-[11px] uppercase tracking-[0.24em] text-d3-oxblood">Demo reference · {form.reference}</p>
      <button type="button" onClick={form.reset} className="mt-8 font-d3-sans text-[12px] font-semibold uppercase tracking-[0.22em] border-b border-d3-ink/40 pb-1 hover:text-d3-oxblood hover:border-d3-oxblood">
        Write another letter
      </button>
    </div>
  );
}
