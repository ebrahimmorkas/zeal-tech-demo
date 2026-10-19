import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Loader2, Sprout } from 'lucide-react';
import { makePaths } from '../../lib/paths';
import type { FieldDef } from '../../types';
import type { DemoForm } from '../../hooks/useDemoForm';
import { usePageMeta } from '../../hooks/usePageMeta';

export const P = makePaths('/demo7');
export const CONCEPT = 'Concept 7 · Living Earth';
export const useMeta = (title: string, description: string) => usePageMeta(title, description, 'Concept 7');

export function Wrap({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Kicker({ children, light = false, className = '' }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em] uppercase ${light ? 'text-d7-lime' : 'text-d7-moss'} ${className}`}>
      <Sprout size={15} aria-hidden />
      {children}
    </p>
  );
}

/** Serif heading; wrap a word in <em> for the italic accent. */
export function Serif({ as: T = 'h2', children, className = '' }: { as?: 'h1' | 'h2' | 'h3' | 'p'; children: ReactNode; className?: string }) {
  return <T className={`font-d7-serif font-normal leading-[1.02] tracking-[-0.015em] [&_em]:text-d7-moss [&_em]:italic ${className}`}>{children}</T>;
}

/** Soft organic rise. */
export function Grow({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/** Arch-topped image that unveils from the ground up — the concept's signature shape. */
export function Arch({ src, alt, className = '', imgClass = 'aspect-[3/4]', delay = 0 }: { src: string; alt: string; className?: string; imgClass?: string; delay?: number }) {
  return (
    <motion.div
      className={`overflow-hidden rounded-t-full ${className}`}
      initial={{ clipPath: 'inset(99% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <img src={src} alt={alt} loading="lazy" className={`w-full object-cover ${imgClass}`} />
    </motion.div>
  );
}

/** Hand-shaped leaf used as a drifting decoration. */
export function Leaf({ className = '', color = '#5f8a55' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 90" className={`motion-safe:animate-d7-sway ${className}`} aria-hidden>
      <path d="M30 2 C 58 26, 58 62, 30 88 C 2 62, 2 26, 30 2 Z" fill={color} />
      <path d="M30 10 L30 84" stroke="#f3f6ee" strokeOpacity=".5" strokeWidth="1.5" />
    </svg>
  );
}

/** Wavy edge between sections. `fill` is the colour of the section below. */
export function Wave({ fill, className = '', flip = false }: { fill: string; className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className={`block w-full h-[40px] sm:h-[70px] ${flip ? 'rotate-180' : ''} ${className}`} aria-hidden>
      <path d="M0 50 C 240 10, 480 10, 720 42 C 960 74, 1200 74, 1440 30 L1440 80 L0 80 Z" fill={fill} />
    </svg>
  );
}

type Tone = 'forest' | 'lime' | 'ghost' | 'light';
const tones: Record<Tone, { btn: string; dot: string }> = {
  forest: { btn: 'bg-d7-forest text-d7-mist hover:bg-d7-pine', dot: 'bg-d7-lime text-d7-forest' },
  lime: { btn: 'bg-d7-lime text-d7-forest hover:bg-[#c5d65a]', dot: 'bg-d7-forest text-d7-lime' },
  ghost: { btn: 'border border-d7-forest/30 text-d7-forest hover:bg-d7-lichen', dot: 'bg-d7-forest text-d7-mist' },
  light: { btn: 'border border-d7-mist/40 text-d7-mist hover:bg-d7-mist/10', dot: 'bg-d7-mist text-d7-forest' },
};
const btnBase =
  'group inline-flex items-center gap-3 h-[54px] pl-6 pr-2 rounded-full text-[15.5px] font-semibold transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-d7-moss';

function Dot({ tone }: { tone: Tone }) {
  return (
    <span className={`grid place-items-center w-10 h-10 rounded-full transition-transform duration-500 group-hover:rotate-45 ${tones[tone].dot}`}>
      <ArrowUpRight size={18} aria-hidden />
    </span>
  );
}

export function Go({ to, children, tone = 'forest', className = '' }: { to: string; children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <Link to={to} className={`${btnBase} ${tones[tone].btn} ${className}`}>
      {children}
      <Dot tone={tone} />
    </Link>
  );
}

export function Btn({ children, tone = 'forest', className = '', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone }) {
  return (
    <button className={`${btnBase} ${tones[tone].btn} disabled:opacity-60 ${className}`} {...rest}>
      {children}
      <Dot tone={tone} />
    </button>
  );
}

export function Note({ children = 'Sample content', light = false }: { children?: ReactNode; light?: boolean }) {
  return <span className={`inline-flex items-center h-7 px-3 rounded-full text-[12.5px] font-medium ${light ? 'bg-d7-mist/10 text-d7-mist/80' : 'bg-d7-lichen text-d7-soil'}`}>{children}</span>;
}

/** Interior page opening: serif title beside an arch image, on a lichen ground with a wave below. */
export function Opening({ kicker, title, intro, image, crumbs, titleAs = 'h1' }: { kicker: string; title: ReactNode; intro?: string; image: string; crumbs: { label: string; to?: string }[]; titleAs?: 'h1' | 'p' }) {
  return (
    <header className="relative bg-d7-lichen overflow-hidden">
      <Leaf className="absolute right-[42%] top-16 w-8 opacity-60 hidden lg:block" />
      <Wrap className="pt-10 lg:pt-16 grid lg:grid-cols-[1.25fr_1fr] gap-10 items-end">
        <div className="pb-14 lg:pb-24">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[14px] text-d7-soil">
              <li>
                <Link to={P.home} className="hover:text-d7-forest underline-offset-4 hover:underline">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-2">
                  <span aria-hidden>·</span>
                  {c.to ? (
                    <Link to={c.to} className="hover:text-d7-forest underline-offset-4 hover:underline">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-d7-forest font-medium">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <Kicker className="mt-10">{kicker}</Kicker>
          <Grow>
            <Serif as={titleAs} className="mt-4 text-[48px] sm:text-[68px] lg:text-[84px] text-d7-forest">
              {title}
            </Serif>
          </Grow>
          {intro && <p className="mt-6 max-w-xl text-[18.5px] leading-relaxed text-d7-soil">{intro}</p>}
        </div>
        <Arch src={image} alt="" className="hidden lg:block w-[84%] justify-self-end" imgClass="aspect-[4/5]" />
      </Wrap>
      <Wave fill="#f3f6ee" className="-mt-px" />
    </header>
  );
}

/* ---------- Forms: soft filled fields on mist, pill controls ---------- */
const box =
  'w-full h-[54px] px-5 rounded-2xl bg-white border border-d7-forest/15 text-[16px] text-d7-bark placeholder:text-d7-soil/60 focus:outline-none focus:border-d7-moss focus:ring-4 focus:ring-d7-lime/40 aria-[invalid=true]:border-[#a8442a] aria-[invalid=true]:ring-4 aria-[invalid=true]:ring-[#a8442a]/10';

export function Field({ field, form }: { field: FieldDef; form: DemoForm }) {
  const { values, errors, setValue, onBlur, toggleOption, a11y, fieldId } = form;
  const id = fieldId(field.name);
  const err = errors[field.name];
  const msg = err ? (
    <p id={`${id}-error`} className="mt-2 text-[14px] text-[#a8442a]">
      {err}
    </p>
  ) : field.helper ? (
    <p id={`${id}-help`} className="mt-2 text-[14px] text-d7-soil">
      {field.helper}
    </p>
  ) : null;
  const label = (
    <span className="text-[15px] font-medium text-d7-forest">
      {field.label}
      {field.required ? <span className="text-d7-moss"> *</span> : <span className="text-d7-soil/80 font-normal"> (optional)</span>}
    </span>
  );

  if (field.type === 'consent')
    return (
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 cursor-pointer text-[15px] text-d7-bark">
          <input type="checkbox" {...a11y(field)} checked={values[field.name] === true} onChange={(e) => setValue(field, e.target.checked)} onBlur={() => onBlur(field)} className="mt-0.5 w-5 h-5 accent-[#2c5640]" />
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
        <div id={id} tabIndex={-1} className="flex flex-wrap gap-2">
          {field.options!.map((o) => {
            const on = sel.includes(o);
            return (
              <label key={o} className={`inline-flex items-center gap-2 h-11 px-4 rounded-full cursor-pointer text-[15px] border transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-d7-lime/60 ${on ? 'bg-d7-pine border-d7-pine text-d7-mist' : 'bg-white border-d7-forest/15 text-d7-bark hover:border-d7-moss'}`}>
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleOption(field, o)} onBlur={() => onBlur(field)} />
                <span className={`w-2.5 h-2.5 rounded-full ${on ? 'bg-d7-lime' : 'bg-d7-lichen'}`} aria-hidden />
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
      <label htmlFor={id} className="block mb-2">
        {label}
      </label>
      {field.type === 'select' ? (
        <select {...a11y(field)} value={values[field.name] as string} onChange={(e) => setValue(field, e.target.value)} onBlur={() => onBlur(field)} className={box}>
          <option value="">Please choose</option>
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

export function Submit({ form, label }: { form: DemoForm; label: string }) {
  return (
    <div className="sm:col-span-2 flex flex-wrap items-center gap-5 pt-2">
      <Btn type="submit" disabled={form.status === 'submitting'}>
        {form.status === 'submitting' && <Loader2 size={18} className="animate-spin" aria-hidden />}
        {form.status === 'submitting' ? 'Sending…' : label}
      </Btn>
      <Note>Demo form — nothing is sent</Note>
      {form.errorCount > 0 && (
        <p role="alert" className="w-full text-[14.5px] text-[#a8442a]">
          Please review {form.errorCount} {form.errorCount === 1 ? 'field' : 'fields'} above.
        </p>
      )}
    </div>
  );
}

export function Done({ title, form }: { title: string; form: DemoForm }) {
  return (
    <div role="status" className="relative overflow-hidden rounded-[40px] bg-d7-forest text-d7-mist p-8 sm:p-14">
      <Leaf className="absolute -right-4 -top-6 w-28 opacity-30" color="#d3e36b" />
      <Kicker light>Received in demo mode</Kicker>
      <Serif as="h3" className="mt-4 text-[40px] sm:text-[52px] text-d7-mist">
        {title}
      </Serif>
      <p className="mt-4 max-w-lg text-[17px] text-d7-mist/75">Thank you. This is a demonstration, so nothing was transmitted and no one has been contacted. On the live site your note would reach the right team.</p>
      <p className="mt-6 text-[14px] text-d7-lime">Demo reference · {form.reference}</p>
      <Btn type="button" tone="lime" onClick={form.reset} className="mt-8">
        Start again
      </Btn>
    </div>
  );
}
