import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { partnershipTypes, getPartnership } from '../../../data/partnerships';
import type { PartnershipType } from '../../../types';
import { useDemoForm } from '../../../hooks/useDemoForm';
import { validateField } from '../../../lib/validation';
import { ICONS } from '../../../lib/icons';
import { Button, Card, Field, H, Label, Mono, PageTop, Shell, SubmitBar, Success, useMeta } from '../ui';

/** Multi-step wizard: one step per form section, validated before advancing. */
function Wizard({ type }: { type: PartnershipType }) {
  const fields = useMemo(() => type.sections.flatMap((s) => s.fields), [type]);
  const form = useDemoForm(fields);
  const [step, setStep] = useState(0);
  const last = step === type.sections.length - 1;

  if (form.status === 'success') return <Success title="Application submitted" form={form} />;

  const next = () => {
    const sectionFields = type.sections[step].fields;
    const invalid = sectionFields.filter((f) => validateField(f, form.values[f.name]));
    sectionFields.forEach((f) => form.onBlur(f));
    if (invalid.length) {
      document.getElementById(form.fieldId(invalid[0].name))?.focus();
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-[#e4e8f2]">
        <ol className="flex items-center gap-2" aria-label="Form progress">
          {type.sections.map((s, i) => (
            <li key={s.title} className="flex-1 flex items-center gap-2">
              <span className={`grid place-items-center w-8 h-8 rounded-full text-[13px] font-medium shrink-0 transition-colors ${i < step ? 'bg-d4-teal text-white' : i === step ? 'bg-d4-indigo text-white' : 'bg-d4-mist text-d4-deep/50'}`} aria-current={i === step ? 'step' : undefined}>
                {i < step ? <Check size={15} aria-label="Completed" /> : i + 1}
              </span>
              <span className={`hidden sm:block text-[13.5px] ${i === step ? 'text-d4-deep font-medium' : 'text-d4-deep/50'}`}>{s.title}</span>
              {i < type.sections.length - 1 && <span className={`flex-1 h-[2px] rounded-full ${i < step ? 'bg-d4-teal' : 'bg-[#e4e8f2]'}`} aria-hidden />}
            </li>
          ))}
        </ol>
      </div>
      <form noValidate onSubmit={last ? form.handleSubmit : (e) => (e.preventDefault(), next())} aria-label={`${type.title} — step ${step + 1} of ${type.sections.length}`} className="p-6 sm:p-8">
        <Mono className="text-d4-indigo">
          step {step + 1}/{type.sections.length}
        </Mono>
        <H as="h3" className="mt-1 text-[24px]">
          {type.sections[step].title}
        </H>
        <div className="mt-6 grid sm:grid-cols-2 gap-x-5 gap-y-5">
          {type.sections[step].fields.map((f) => (
            <Field key={f.name} field={f} form={form} />
          ))}
          {last ? (
            <SubmitBar form={form} label="Submit application" />
          ) : (
            <div className="sm:col-span-2 flex flex-wrap gap-3 pt-2">
              <Button type="submit">
                Continue <ArrowRight size={16} aria-hidden />
              </Button>
            </div>
          )}
        </div>
        {step > 0 && (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="mt-6 inline-flex items-center gap-1.5 text-[14px] text-d4-deep/60 hover:text-d4-deep">
            <ArrowLeft size={15} aria-hidden /> Back to {type.sections[step - 1].title.toLowerCase()}
          </button>
        )}
      </form>
    </Card>
  );
}

export default function Partner() {
  useMeta('Partner With Us', 'Partnership programmes for distributors, OEMs, technology partners, investors and vendors.');
  const [params, setParams] = useSearchParams();
  const active = getPartnership(params.get('type')) ?? partnershipTypes[0];
  return (
    <>
      <PageTop label="partner ecosystem" title={<>Choose how you’d like to partner.</>} intro="Pick a programme, then complete a short guided application." crumbs={[{ label: 'Partner With Us' }]} />
      <section className="py-16 lg:py-24">
        <Shell>
          <div role="radiogroup" aria-label="Partnership programme" className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {partnershipTypes.map((p) => {
              const Icon = ICONS[p.icon];
              const on = p.id === active.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setParams({ type: p.id }, { replace: true, preventScrollReset: true })}
                  className={`relative text-left p-5 rounded-2xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-d4-indigo ${on ? 'bg-d4-void text-white shadow-[0_20px_40px_-20px_rgba(97,112,255,0.6)]' : 'bg-white ring-1 ring-[#e4e8f2] hover:ring-d4-indigo/50'}`}
                >
                  <span className={`grid place-items-center w-10 h-10 rounded-xl ${on ? 'bg-d4-indigo' : 'bg-d4-mist text-d4-indigo'}`}>
                    <Icon size={18} aria-hidden />
                  </span>
                  <span className="block mt-4 font-d4-display text-[17px] leading-tight">{p.shortTitle}</span>
                  {on && <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-d4-teal" aria-hidden />}
                </button>
              );
            })}
          </div>
          <div className="mt-10 grid lg:grid-cols-[1fr_1.7fr] gap-6 items-start">
            <Card className="p-7 lg:sticky lg:top-28">
              <Label>{active.shortTitle.toLowerCase()}</Label>
              <H as="h2" className="mt-3 text-[28px]">
                {active.title}
              </H>
              <p className="mt-3 text-[15.5px] text-d4-deep/70">{active.summary}</p>
              <p className="mt-6 font-d4-mono text-[11.5px] text-d4-deep/50">ideal for</p>
              <p className="mt-1 text-[15px]">{active.idealFor}</p>
              <p className="mt-6 font-d4-mono text-[11.5px] text-d4-deep/50">you get</p>
              <ul className="mt-2 space-y-2">
                {active.benefits.map((b) => (
                  <li key={b} className="flex gap-2 text-[15px]">
                    <Check size={16} className="mt-0.5 text-d4-teal shrink-0" aria-hidden /> {b}
                  </li>
                ))}
              </ul>
            </Card>
            <Wizard key={active.id} type={active} />
          </div>
        </Shell>
      </section>
    </>
  );
}
