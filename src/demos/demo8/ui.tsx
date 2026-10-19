import { useId, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { makePaths } from '../../lib/paths';
import type { FieldDef } from '../../types';
import type { DemoForm } from '../../hooks/useDemoForm';
import { usePageMeta } from '../../hooks/usePageMeta';

export const P = makePaths('/demo8');
export const CONCEPT = 'Concept 8 · Bold Studio';
export const useMeta = (title: string, description: string) => usePageMeta(title, description, 'Concept 8');

/** Rotating accent palette used to give repeated items their own colour. */
export const POP = ['bg-d8-yellow', 'bg-d8-pink', 'bg-d8-mint', 'bg-d8-blue text-white', 'bg-white'] as const;

export function Box({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-4 sm:px-8 ${className}`}>{children}</div>;
}

/** Hard-shadow card — the concept's core surface. */
export const card = 'border-[3px] border-d8-ink shadow-[6px_6px_0_#111] rounded-[18px]';
export const lift = 'transition-[transform,box-shadow] duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[9px_9px_0_#111] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0_#111]';

export function Tag({ children, className = 'bg-white' }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center gap-1.5 h-8 px-3 border-2 border-d8-ink rounded-full font-d8-mono text-[12px] font-bold uppercase tracking-wide ${className}`}>{children}</span>;
}

export function Big({ as: T = 'h2', children, className = '' }: { as?: 'h1' | 'h2' | 'h3' | 'p'; children: ReactNode; className?: string }) {
  return <T className={`font-d8-display font-extrabold tracking-[-0.03em] leading-[0.92] break-words hyphens-auto ${className}`}>{children}</T>;
}

/** Outlined text for emphasis words. */
export function Outline({ children }: { children: ReactNode }) {
  return (
    <span className="text-transparent" style={{ WebkitTextStroke: '2px #111' }}>
      {children}
    </span>
  );
}

/** Springy pop-in with a slight tilt. */
export function Pop({ children, delay = 0, tilt = -3, className = '' }: { children: ReactNode; delay?: number; tilt?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.85, rotate: tilt }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Rotated sticker label. */
export function Sticker({ children, className = 'bg-d8-pink', rotate = -6 }: { children: ReactNode; className?: string; rotate?: number }) {
  return (
    <span className={`inline-block px-3 py-1.5 border-[3px] border-d8-ink rounded-xl font-d8-display font-extrabold text-[15px] shadow-[3px_3px_0_#111] ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      {children}
    </span>
  );
}

/** Circular rotating text badge. */
export function Badge({ text, className = '', center = '★' }: { text: string; className?: string; center?: ReactNode }) {
  const id = `d8-circle${useId().replace(/:/g, '')}`;
  return (
    <span className={`relative grid place-items-center w-32 h-32 rounded-full bg-d8-yellow border-[3px] border-d8-ink ${className}`} aria-hidden>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full motion-safe:animate-d8-spin">
        <defs>
          <path id={id} d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
        </defs>
        <text className="font-d8-mono" fontSize="9.5" fontWeight="700" letterSpacing="2.4" fill="#111">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <span className="font-d8-display font-extrabold text-[28px]">{center}</span>
    </span>
  );
}

export function Marquee({ items, className = 'bg-d8-ink text-d8-cream' }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden border-y-[3px] border-d8-ink ${className}`} aria-hidden>
      <div className="flex w-max motion-safe:animate-d8-marquee">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-6 px-6 h-14 font-d8-display font-extrabold text-[22px] whitespace-nowrap">
            {t} <span className="text-d8-yellow">✺</span>
          </span>
        ))}
      </div>
    </div>
  );
}

type Tone = 'yellow' | 'pink' | 'blue' | 'ink' | 'white' | 'mint';
const tones: Record<Tone, string> = {
  yellow: 'bg-d8-yellow text-d8-ink',
  pink: 'bg-d8-pink text-d8-ink',
  blue: 'bg-d8-blue text-white',
  ink: 'bg-d8-ink text-d8-cream',
  white: 'bg-white text-d8-ink',
  mint: 'bg-d8-mint text-d8-ink',
};
const btn =
  'group inline-flex items-center justify-center gap-2 h-14 px-6 border-[3px] border-d8-ink rounded-full font-d8-display font-extrabold text-[16px] shadow-[4px_4px_0_#111] transition-[transform,box-shadow] duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#111] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_#111] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-d8-blue';

export function Go({ to, children, tone = 'yellow', className = '' }: { to: string; children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <Link to={to} className={`${btn} ${tones[tone]} ${className}`}>
      {children}
      <ArrowRight size={19} strokeWidth={2.75} className="transition-transform group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

export function Btn({ children, tone = 'yellow', className = '', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone }) {
  return (
    <button className={`${btn} ${tones[tone]} disabled:opacity-60 ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function Sample({ children = 'Sample content' }: { children?: ReactNode }) {
  return <Tag className="bg-d8-cream">⚑ {children}</Tag>;
}

export function PageHead({ title, intro, crumbs, color = 'bg-d8-yellow', sticker, titleAs = 'h1' }: { title: ReactNode; intro?: string; crumbs: { label: string; to?: string }[]; color?: string; sticker?: string; titleAs?: 'h1' | 'p' }) {
  return (
    <header className={`relative border-b-[3px] border-d8-ink overflow-hidden ${color}`}>
      <Box className="pt-8 pb-12 lg:pt-12 lg:pb-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 font-d8-mono text-[13px]">
            <li>
              <Link to={P.home} className="underline underline-offset-4 decoration-2 hover:bg-white px-1">
                home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span aria-hidden>→</span>
                {c.to ? (
                  <Link to={c.to} className="underline underline-offset-4 decoration-2 hover:bg-white px-1">
                    {c.label.toLowerCase()}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-bold px-1">
                    {c.label.toLowerCase()}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Pop tilt={-2}>
          <Big as={titleAs} className="mt-8 text-[56px] sm:text-[96px] lg:text-[128px] max-w-5xl">
            {title}
          </Big>
        </Pop>
        {intro && <p className="mt-6 max-w-2xl text-[19px] font-medium leading-snug">{intro}</p>}
        {sticker && (
          <div className="absolute right-6 sm:right-12 top-10 hidden md:block">
            <Sticker className="bg-white" rotate={8}>
              {sticker}
            </Sticker>
          </div>
        )}
      </Box>
    </header>
  );
}

/* ---------- Forms: chunky bordered fields with hard shadows ---------- */
const box =
  'w-full h-14 px-4 bg-white border-[3px] border-d8-ink rounded-xl text-[16px] font-medium placeholder:text-d8-gray/60 focus:outline-none focus:shadow-[4px_4px_0_#3d5afe] aria-[invalid=true]:bg-[#ffe3ef] aria-[invalid=true]:shadow-[4px_4px_0_#ff6fae]';

export function Field({ field, form }: { field: FieldDef; form: DemoForm }) {
  const { values, errors, setValue, onBlur, toggleOption, a11y, fieldId } = form;
  const id = fieldId(field.name);
  const err = errors[field.name];
  const msg = err ? (
    <p id={`${id}-error`} className="mt-2 inline-block px-2 py-0.5 bg-d8-pink border-2 border-d8-ink rounded-md text-[13.5px] font-semibold">
      {err}
    </p>
  ) : field.helper ? (
    <p id={`${id}-help`} className="mt-2 text-[13.5px] text-d8-gray">
      {field.helper}
    </p>
  ) : null;
  const label = (
    <span className="font-d8-display font-bold text-[16px]">
      {field.label}
      {field.required ? <span className="text-d8-blue"> *</span> : <span className="font-d8-mono font-normal text-[12px] text-d8-gray"> (optional)</span>}
    </span>
  );

  if (field.type === 'consent')
    return (
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 p-4 bg-d8-cream border-[3px] border-d8-ink rounded-xl cursor-pointer text-[15px] font-medium">
          <input type="checkbox" {...a11y(field)} checked={values[field.name] === true} onChange={(e) => setValue(field, e.target.checked)} onBlur={() => onBlur(field)} className="mt-0.5 w-5 h-5 accent-[#3d5afe]" />
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
        <div id={id} tabIndex={-1} className="flex flex-wrap gap-2.5">
          {field.options!.map((o, i) => {
            const on = sel.includes(o);
            return (
              <label key={o} className={`inline-flex items-center gap-2 h-11 px-4 border-[3px] border-d8-ink rounded-full cursor-pointer text-[14.5px] font-semibold transition-[transform,box-shadow] has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-d8-blue ${on ? `${POP[i % 4]} shadow-[3px_3px_0_#111] -translate-y-0.5` : 'bg-white hover:bg-d8-cream'}`}>
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleOption(field, o)} onBlur={() => onBlur(field)} />
                <span aria-hidden>{on ? '✓' : '+'}</span>
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
          <option value="">Pick one…</option>
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
    <div className="sm:col-span-2 flex flex-wrap items-center gap-4 pt-2">
      <Btn type="submit" tone="blue" disabled={form.status === 'submitting'}>
        {form.status === 'submitting' && <Loader2 size={18} className="animate-spin" aria-hidden />}
        {form.status === 'submitting' ? 'Sending…' : label}
        {form.status !== 'submitting' && <ArrowRight size={19} strokeWidth={2.75} aria-hidden />}
      </Btn>
      <Tag className="bg-d8-mint">Demo only · nothing is sent</Tag>
      {form.errorCount > 0 && (
        <p role="alert" className="w-full font-d8-display font-bold text-[16px]">
          Whoops — {form.errorCount} {form.errorCount === 1 ? 'field needs' : 'fields need'} a fix.
        </p>
      )}
    </div>
  );
}

export function Done({ title, form }: { title: string; form: DemoForm }) {
  return (
    <div role="status" className={`${card} bg-d8-mint p-8 sm:p-12 relative overflow-hidden`}>
      <div className="absolute right-6 top-6 hidden sm:block">
        <Sticker className="bg-d8-yellow" rotate={10}>
          Nice one!
        </Sticker>
      </div>
      <Big as="h3" className="text-[44px] sm:text-[60px] max-w-xl">
        {title}
      </Big>
      <p className="mt-4 max-w-lg text-[17px] font-medium">This is a demo, so nothing was sent and nobody was contacted. On the real site, your message would land with the right team.</p>
      <p className="mt-5">
        <Tag className="bg-white">ref · {form.reference}</Tag>
      </p>
      <Btn type="button" tone="white" className="mt-8" onClick={form.reset}>
        Do another
      </Btn>
    </div>
  );
}
