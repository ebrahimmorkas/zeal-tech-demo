import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { partnershipTypes, getPartnership } from '../../../data/partnerships';
import type { PartnershipType } from '../../../types';
import { useDemoForm } from '../../../hooks/useDemoForm';
import { Done, Field, Frame, H, Label, PageHead, Submit, narrow, useMeta, wide } from '../ui';

function Form({ type, n }: { type: PartnershipType; n: number }) {
  const fields = useMemo(() => type.sections.flatMap((s) => s.fields), [type]);
  const form = useDemoForm(fields);
  if (form.status === 'success') return <Done title="Application logged." form={form} />;
  return (
    <form noValidate onSubmit={form.handleSubmit} aria-label={`${type.title} application`} className="space-y-14">
      {type.sections.map((s, i) => (
        <fieldset key={s.title}>
          <legend className="w-full flex items-baseline gap-4 border-b-[3px] border-d6-ink pb-3">
            <span className="text-[13px] font-bold tabular-nums text-d6-red">
              P{n}.{i + 1}
            </span>
            <span className="font-d6-sans font-extrabold text-[24px] tracking-[-0.04em]" style={wide}>
              {s.title}
            </span>
          </legend>
          <div className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-6">
            {s.fields.map((f) => (
              <Field key={f.name} field={f} form={form} />
            ))}
          </div>
        </fieldset>
      ))}
      <div className="grid sm:grid-cols-2">
        <Submit form={form} label="Submit application" />
      </div>
    </form>
  );
}

export default function Partner() {
  useMeta('Partner', 'Five partnership programmes: dealer and distributor, OEM, technology, investment and vendor registration.');
  const [params, setParams] = useSearchParams();
  const active = getPartnership(params.get('type')) ?? partnershipTypes[0];
  const n = partnershipTypes.indexOf(active) + 1;
  return (
    <>
      <PageHead n="08" title={<>Partner<span className="text-d6-red">.</span></>} intro="Five programmes. Select one to open its specification and application." crumbs={[{ label: 'Partner' }]} />
      <section className="py-16 lg:py-24">
        <Frame className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div role="tablist" aria-label="Programme" aria-orientation="vertical" className="border-t-[3px] border-d6-ink lg:sticky lg:top-8">
              {partnershipTypes.map((p, i) => {
                const on = p.id === active.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    id={`d6-tab-${p.id}`}
                    aria-selected={on}
                    aria-controls="d6-panel"
                    onClick={() => setParams({ type: p.id }, { replace: true, preventScrollReset: true })}
                    className={`w-full flex items-center gap-4 px-4 h-16 border-b border-d6-ink text-left transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-[3px] focus-visible:outline-d6-red ${on ? 'bg-d6-red text-white' : 'hover:bg-d6-grey'}`}
                  >
                    <span className={`text-[12px] font-bold tabular-nums ${on ? 'text-white/80' : 'text-d6-red'}`}>P{i + 1}</span>
                    <span className="flex-1 font-bold text-[17px]">{p.shortTitle}</span>
                    <span className={`w-3 h-3 ${on ? 'bg-white' : 'border border-d6-ink'}`} aria-hidden />
                  </button>
                );
              })}
            </div>
          </div>
          <div id="d6-panel" role="tabpanel" aria-labelledby={`d6-tab-${active.id}`} className="lg:col-span-8">
            <Label n={`P${n}`}>Programme specification</Label>
            <H as="h2" className="mt-6 text-[36px] sm:text-[52px]">
              {active.title}
            </H>
            <p className="mt-6 text-[18px] leading-[1.55] text-d6-ink/80 max-w-2xl">{active.summary}</p>
            <dl className="mt-10 grid md:grid-cols-2 border-t-[3px] border-d6-ink">
              <div className="py-5 md:pr-6 border-b md:border-b-0 border-d6-line">
                <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-d6-mid" style={narrow}>
                  Ideal for
                </dt>
                <dd className="mt-2 text-[16px]">{active.idealFor}</dd>
              </div>
              <div className="py-5 md:pl-6 md:border-l border-d6-line">
                <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-d6-mid" style={narrow}>
                  Provisions
                </dt>
                <dd>
                  <ul className="mt-2 space-y-1.5">
                    {active.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-3 text-[16px]">
                        <span className="w-2 h-2 bg-d6-red" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
            <div className="mt-16">
              <Form key={active.id} type={active} n={n} />
            </div>
          </div>
        </Frame>
      </section>
    </>
  );
}
