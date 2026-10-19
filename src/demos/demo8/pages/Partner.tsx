import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { partnershipTypes, getPartnership } from '../../../data/partnerships';
import type { PartnershipType } from '../../../types';
import { useDemoForm } from '../../../hooks/useDemoForm';
import { ICONS } from '../../../lib/icons';
import { Big, Box, Done, Field, Outline, POP, PageHead, Submit, Tag, card, useMeta } from '../ui';

function Form({ type }: { type: PartnershipType }) {
  const fields = useMemo(() => type.sections.flatMap((s) => s.fields), [type]);
  const form = useDemoForm(fields);
  if (form.status === 'success') return <Done title="Application sent (well, pretend-sent)." form={form} />;
  return (
    <form noValidate onSubmit={form.handleSubmit} aria-label={`${type.title} form`} className={`bg-white p-6 sm:p-10 ${card} space-y-12`}>
      {type.sections.map((s, i) => (
        <fieldset key={s.title}>
          <legend className="flex items-center gap-3">
            <span className={`grid place-items-center w-11 h-11 border-[3px] border-d8-ink rounded-full font-d8-display font-extrabold ${POP[i % 4]}`}>{i + 1}</span>
            <span className="font-d8-display font-extrabold text-[26px]">{s.title}</span>
          </legend>
          <div className="mt-6 grid sm:grid-cols-2 gap-x-5 gap-y-6">
            {s.fields.map((f) => (
              <Field key={f.name} field={f} form={form} />
            ))}
          </div>
        </fieldset>
      ))}
      <div className="grid sm:grid-cols-2">
        <Submit form={form} label="Send it" />
      </div>
    </form>
  );
}

export default function Partner() {
  useMeta('Partner with us', 'Five ways to partner: dealers, OEMs, technology, investment and suppliers.');
  const [params, setParams] = useSearchParams();
  const active = getPartnership(params.get('type')) ?? partnershipTypes[0];
  const idx = partnershipTypes.indexOf(active);
  return (
    <>
      <PageHead title={<>Pick your <Outline>lane.</Outline></>} intro="Five partnership programmes. Choose one and tell us about yourself." crumbs={[{ label: 'Partner with us' }]} color="bg-d8-mint" sticker="5 ways in" />
      <section className="py-16 lg:py-24">
        <Box>
          <div role="tablist" aria-label="Partnership programme" className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {partnershipTypes.map((p, i) => {
              const Icon = ICONS[p.icon];
              const on = p.id === active.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  id={`d8-tab-${p.id}`}
                  aria-selected={on}
                  aria-controls="d8-panel"
                  onClick={() => setParams({ type: p.id }, { replace: true, preventScrollReset: true })}
                  className={`flex flex-col items-start gap-6 p-5 text-left border-[3px] border-d8-ink rounded-[18px] transition-[transform,box-shadow] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-d8-blue ${
                    on ? `${POP[i % 4]} shadow-[6px_6px_0_#111] -translate-x-0.5 -translate-y-1 rotate-[-1.5deg]` : 'bg-white hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#111]'
                  }`}
                >
                  <Icon size={28} strokeWidth={2.5} aria-hidden />
                  <span className="font-d8-display font-extrabold text-[18px] leading-tight">{p.shortTitle}</span>
                </button>
              );
            })}
          </div>
          <div id="d8-panel" role="tabpanel" aria-labelledby={`d8-tab-${active.id}`} className="mt-12 grid lg:grid-cols-[1fr_1.8fr] gap-8 items-start [&>*]:min-w-0">
            <div className={`p-7 lg:sticky lg:top-28 ${card} ${POP[idx % 4]}`}>
              <Tag className="bg-white">Programme {idx + 1} of 5</Tag>
              <Big as="h2" className="mt-5 text-[36px]">
                {active.title}
              </Big>
              <p className="mt-4 font-medium">{active.summary}</p>
              <p className="mt-6 font-d8-mono text-[12px] uppercase">Great for</p>
              <p className="mt-1 font-semibold">{active.idealFor}</p>
              <p className="mt-6 font-d8-mono text-[12px] uppercase">You get</p>
              <ul className="mt-2 space-y-2">
                {active.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 font-semibold">
                    <span className="grid place-items-center w-6 h-6 bg-white text-d8-ink border-2 border-d8-ink rounded-full text-[12px]" aria-hidden>
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <Form key={active.id} type={active} />
          </div>
        </Box>
      </section>
    </>
  );
}
