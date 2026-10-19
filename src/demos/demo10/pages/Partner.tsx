import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { partnershipTypes, getPartnership } from '../../../data/partnerships';
import type { PartnershipType } from '../../../types';
import { useDemoForm } from '../../../hooks/useDemoForm';
import { ICONS } from '../../../lib/icons';
import { Bento, Chip, Completion, Display, Done, Field, Glow, PASTEL, Shell, Submit, tile, useMeta } from '../ui';

function Form({ type }: { type: PartnershipType }) {
  const fields = useMemo(() => type.sections.flatMap((s) => s.fields), [type]);
  const form = useDemoForm(fields);
  if (form.status === 'success') return <Done title="Application received." form={form} />;
  return (
    <form noValidate onSubmit={form.handleSubmit} aria-label={`${type.title} application`} className="space-y-4">
      <div className={`${tile} p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 lg:sticky lg:top-24 z-10`}>
        <Completion form={form} fields={fields} />
        <Chip>{type.sections.length} sections</Chip>
      </div>
      {type.sections.map((s, i) => (
        <fieldset key={s.title} className={`${tile} p-6 sm:p-8`}>
          <legend className="sr-only">{s.title}</legend>
          <p className="flex items-center gap-3" aria-hidden>
            <span className={`grid place-items-center w-9 h-9 rounded-xl font-d10-display font-semibold text-[14px] ${PASTEL[i]}`}>{i + 1}</span>
            <span className="font-d10-display font-semibold text-[22px] tracking-[-0.02em]">{s.title}</span>
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-x-4 gap-y-5">
            {s.fields.map((f) => (
              <Field key={f.name} field={f} form={form} />
            ))}
          </div>
        </fieldset>
      ))}
      <div className={`${tile} p-6 sm:p-8 grid sm:grid-cols-2`}>
        <Submit form={form} label="Submit application" />
      </div>
    </form>
  );
}

export default function Partner() {
  useMeta('Partner with us', 'Five partnership programmes: distributors, OEMs, technology, investment and vendor registration.');
  const [params, setParams] = useSearchParams();
  const active = getPartnership(params.get('type')) ?? partnershipTypes[0];
  return (
    <>
      <Bento
        eyebrow="Partner with us"
        title={
          <>
            Grow <Glow>together.</Glow>
          </>
        }
        intro="Pick a programme. Each has its own short application with a live progress meter."
        image="/images/handshake.jpg"
        crumbs={[{ label: 'Partner' }]}
      />
      <section className="pt-10 pb-6">
        <Shell>
          <div role="tablist" aria-label="Partnership programme" className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {partnershipTypes.map((p, i) => {
              const Icon = ICONS[p.icon];
              const on = p.id === active.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  id={`d10-tab-${p.id}`}
                  aria-selected={on}
                  aria-controls="d10-panel"
                  onClick={() => setParams({ type: p.id }, { replace: true, preventScrollReset: true })}
                  className={`relative text-left p-5 rounded-[24px] border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-d10-violet ${on ? 'border-transparent text-white' : 'bg-white/70 border-white hover:bg-white'}`}
                >
                  {on && <motion.span layoutId="d10-prog" className="absolute inset-0 rounded-[24px] bg-d10-ink" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span className={`relative grid place-items-center w-10 h-10 rounded-xl ${on ? 'bg-white/15' : PASTEL[i]}`}>
                    <Icon size={19} aria-hidden />
                  </span>
                  <span className="relative block mt-4 font-semibold text-[15px] leading-tight">{p.shortTitle}</span>
                </button>
              );
            })}
          </div>
          <div id="d10-panel" role="tabpanel" aria-labelledby={`d10-tab-${active.id}`} className="mt-4 grid lg:grid-cols-[1fr_1.7fr] gap-4 items-start">
            <div className={`${tile} p-7 sm:p-8 lg:sticky lg:top-24`}>
              <Chip>Programme</Chip>
              <Display as="h2" className="mt-4 text-[30px]">
                {active.title}
              </Display>
              <p className="mt-3 text-d10-mute">{active.summary}</p>
              <div className="mt-6 p-4 rounded-2xl bg-d10-canvas">
                <p className="text-[12.5px] font-semibold text-d10-mute">Ideal for</p>
                <p className="mt-1 font-medium">{active.idealFor}</p>
              </div>
              <ul className="mt-5 grid gap-2">
                {active.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 font-medium">
                    <span className="grid place-items-center w-6 h-6 rounded-lg bg-d10-mint text-[#0e6b47]">
                      <Check size={14} aria-hidden />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <Form key={active.id} type={active} />
          </div>
        </Shell>
      </section>
    </>
  );
}
