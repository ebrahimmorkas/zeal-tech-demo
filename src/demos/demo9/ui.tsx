import { useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { makePaths } from '../../lib/paths';
import type { FieldDef } from '../../types';
import type { DemoForm } from '../../hooks/useDemoForm';
import { usePageMeta } from '../../hooks/usePageMeta';

export const P = makePaths('/demo9');
export const CONCEPT = 'Concept 9 · Noir Cinema';
export const useMeta = (title: string, description: string) => usePageMeta(title, description, 'Concept 9');

export const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export function Stage({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1360px] px-5 sm:px-10 ${className}`}>{children}</div>;
}

/** Widely tracked uppercase label in Jost. */
export function Cue({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`font-d9-sans text-[11.5px] font-medium uppercase tracking-[0.42em] text-d9-smoke ${className}`}>{children}</p>;
}

export function Title({ as: T = 'h2', children, className = '', id }: { as?: 'h1' | 'h2' | 'h3' | 'p'; children: ReactNode; className?: string; id?: string }) {
  return (
    <T id={id} className={`font-d9-serif font-normal leading-[0.95] tracking-[-0.02em] [&_em]:italic ${className}`}>
      {children}
    </T>
  );
}

/** Characters rise into place one by one — used for title cards. */
export function Letters({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {text.split(' ').map((word, w, words) => {
        // Words stay unbreakable; characters inside them animate individually.
        const offset = words.slice(0, w).join(' ').length + (w ? 1 : 0);
        return (
          <span key={w} aria-hidden>
            <span className="inline-block whitespace-nowrap">
              {word.split('').map((ch, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em]">
                  <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + (offset + i) * 0.035 }}>
                    {ch}
                  </motion.span>
                </span>
              ))}
            </span>
            {w < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </span>
  );
}

/** Slow fade from black. */
export function Fade({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay }}>
      {children}
    </motion.div>
  );
}

/** Image that slowly scales down as it scrolls through the viewport (a dolly-in feel). */
export function Dolly({ src, alt, className = '', imgClass = 'aspect-[16/9]' }: { src: string; alt: string; className?: string; imgClass?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} loading="lazy" style={{ scale }} className={`w-full object-cover saturate-[0.65] contrast-[1.05] ${imgClass}`} />
    </div>
  );
}

/** Word-by-word reveal tied to scroll position. */
export function ScrollWords({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
}

const lineBtn =
  'group relative inline-flex items-center gap-4 h-14 font-d9-sans text-[13px] font-medium uppercase tracking-[0.32em] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-d9-bone';

/** Text link with a drawing underline and a sliding rule. */
export function Go({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={`${lineBtn} ${className}`}>
      <span className="w-10 h-px bg-current transition-all duration-500 group-hover:w-16" aria-hidden />
      <span className="relative">
        {children}
        <span className="absolute left-0 -bottom-1 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" aria-hidden />
      </span>
    </Link>
  );
}

export function Btn({ children, className = '', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-3 h-14 px-8 border border-d9-bone text-d9-bone font-d9-sans text-[12.5px] font-medium uppercase tracking-[0.32em] transition-colors hover:bg-d9-bone hover:text-d9-black disabled:opacity-50 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-d9-bone ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Sample({ children = 'Sample content' }: { children?: ReactNode }) {
  return <span className="font-d9-sans text-[11px] uppercase tracking-[0.3em] text-d9-smoke/80">— {children}</span>;
}

/** Interior "title card": centred scene number, italic title, then a full-bleed still. */
export function TitleCard({ scene, title, intro, image, crumbs, titleAs = 'h1' }: { scene: string; title: string; intro?: string; image?: string; crumbs: { label: string; to?: string }[]; titleAs?: 'h1' | 'p' }) {
  return (
    <header>
      <Stage className="pt-36 lg:pt-44 pb-16 text-center">
        <nav aria-label="Breadcrumb">
          <ol className="inline-flex flex-wrap justify-center items-center gap-3 font-d9-sans text-[11px] uppercase tracking-[0.36em] text-d9-smoke">
            <li>
              <Link to={P.home} className="hover:text-d9-bone">
                Nexora
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-3">
                <span aria-hidden>/</span>
                {c.to ? (
                  <Link to={c.to} className="hover:text-d9-bone">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-d9-bone">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Cue className="mt-14">Scene {scene}</Cue>
        <Title as={titleAs} className="mt-6 text-[56px] sm:text-[96px] lg:text-[132px] italic">
          <Letters text={title} />
        </Title>
        {intro && (
          <Fade delay={0.4}>
            <p className="mt-8 mx-auto max-w-xl font-d9-sans font-light text-[18px] leading-relaxed text-d9-ash">{intro}</p>
          </Fade>
        )}
      </Stage>
      {image && <Dolly src={image} alt="" imgClass="aspect-[21/9] min-h-[260px]" />}
    </header>
  );
}

/* ---------- Forms: underline-only fields on black ---------- */
const line =
  'w-full h-14 bg-transparent border-0 border-b border-d9-graphite px-0 text-[17px] text-d9-bone placeholder:text-d9-smoke/60 focus:outline-none focus:border-d9-bone focus:ring-0 transition-colors aria-[invalid=true]:border-[#c96a5a]';

export function Field({ field, form }: { field: FieldDef; form: DemoForm }) {
  const { values, errors, setValue, onBlur, toggleOption, a11y, fieldId } = form;
  const id = fieldId(field.name);
  const err = errors[field.name];
  const msg = err ? (
    <p id={`${id}-error`} className="mt-2 font-d9-sans text-[13.5px] text-[#e08e7f]">
      {err}
    </p>
  ) : field.helper ? (
    <p id={`${id}-help`} className="mt-2 text-[13px] text-d9-smoke">
      {field.helper}
    </p>
  ) : null;
  const label = (
    <span className="font-d9-sans text-[11px] font-medium uppercase tracking-[0.3em] text-d9-smoke">
      {field.label}
      {field.required ? ' *' : ' — optional'}
    </span>
  );

  if (field.type === 'consent')
    return (
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 cursor-pointer text-[15px] text-d9-ash">
          <input type="checkbox" {...a11y(field)} checked={values[field.name] === true} onChange={(e) => setValue(field, e.target.checked)} onBlur={() => onBlur(field)} className="mt-1 w-4 h-4 accent-[#f3f1ec]" />
          {field.label}
        </label>
        {msg}
      </div>
    );

  if (field.type === 'checkboxes') {
    const sel = (values[field.name] as string[]) ?? [];
    return (
      <fieldset className="min-w-0 sm:col-span-2" aria-describedby={err ? `${id}-error` : undefined}>
        <legend className="mb-4">{label}</legend>
        <div id={id} tabIndex={-1} className="flex flex-wrap gap-x-6 gap-y-3">
          {field.options!.map((o) => {
            const on = sel.includes(o);
            return (
              <label key={o} className={`inline-flex items-center gap-2 cursor-pointer font-d9-serif text-[19px] transition-colors has-[:focus-visible]:underline ${on ? 'text-d9-bone italic' : 'text-d9-smoke hover:text-d9-ash'}`}>
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleOption(field, o)} onBlur={() => onBlur(field)} />
                <span className={`w-2 h-2 rounded-full border ${on ? 'bg-d9-bone border-d9-bone' : 'border-d9-smoke'}`} aria-hidden />
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
      <label htmlFor={id} className="block">
        {label}
      </label>
      {field.type === 'select' ? (
        <select {...a11y(field)} value={values[field.name] as string} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={`${line} [&>option]:bg-d9-carbon`}>
          <option value="">Select</option>
          {field.options!.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea {...a11y(field)} rows={3} value={values[field.name] as string} placeholder={field.placeholder} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={`${line} h-auto py-3 resize-y`} />
      ) : (
        <input {...a11y(field)} type={field.type} value={values[field.name] as string} placeholder={field.placeholder} autoComplete={field.autoComplete} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={line} />
      )}
      {msg}
    </div>
  );
}

export function Submit({ form, label }: { form: DemoForm; label: string }) {
  return (
    <div className="sm:col-span-2 pt-6 flex flex-wrap items-center gap-6">
      <Btn type="submit" disabled={form.status === 'submitting'}>
        {form.status === 'submitting' && <Loader2 size={16} className="animate-spin" aria-hidden />}
        {form.status === 'submitting' ? 'Sending' : label}
      </Btn>
      <Sample>Demo form · nothing is transmitted</Sample>
      {form.errorCount > 0 && (
        <p role="alert" className="w-full font-d9-sans text-[14px] text-[#e08e7f]">
          {form.errorCount} {form.errorCount === 1 ? 'field requires' : 'fields require'} your attention.
        </p>
      )}
    </div>
  );
}

export function Done({ title, form }: { title: string; form: DemoForm }) {
  return (
    <div role="status" className="border border-d9-graphite p-10 sm:p-16 text-center">
      <Cue>Fin · demo mode</Cue>
      <Title as="h3" className="mt-6 text-[44px] sm:text-[64px] italic">
        {title}
      </Title>
      <p className="mt-6 mx-auto max-w-md font-d9-sans font-light text-d9-ash">Thank you. This is a demonstration, so nothing has been transmitted and no one has been contacted.</p>
      <p className="mt-6 font-d9-sans text-[12px] uppercase tracking-[0.3em] text-d9-smoke">Reference {form.reference}</p>
      <Btn type="button" onClick={form.reset} className="mt-10">
        Begin again
      </Btn>
    </div>
  );
}
