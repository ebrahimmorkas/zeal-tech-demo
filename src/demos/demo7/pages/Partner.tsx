import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { partnershipTypes, getPartnership } from '../../../data/partnerships';
import type { PartnershipType } from '../../../types';
import { useDemoForm } from '../../../hooks/useDemoForm';
import { ICONS } from '../../../lib/icons';
import { Done, Field, Kicker, Opening, Serif, Submit, Wrap, useMeta } from '../ui';

function Form({ type }: { type: PartnershipType }) {
  const fields = useMemo(() => type.sections.flatMap((s) => s.fields), [type]);
  const form = useDemoForm(fields);
  if (form.status === 'success') return <Done title="Your application has taken root." form={form} />;
  return (
    <form noValidate onSubmit={form.handleSubmit} aria-label={`${type.title} application`} className="space-y-6">
      {type.sections.map((s, i) => (
        <fieldset key={s.title} className="rounded-[36px] bg-white p-6 sm:p-9">
          <legend className="sr-only">{s.title}</legend>
          <p className="flex items-center gap-3" aria-hidden>
            <span className="grid place-items-center w-9 h-9 rounded-full bg-d7-lime text-d7-forest font-semibold text-[14px]">{i + 1}</span>
            <span className="font-d7-serif text-[26px] text-d7-forest">{s.title}</span>
          </p>
          <div className="mt-7 grid sm:grid-cols-2 gap-x-5 gap-y-6">
            {s.fields.map((f) => (
              <Field key={f.name} field={f} form={form} />
            ))}
          </div>
        </fieldset>
      ))}
      <div className="grid sm:grid-cols-2 px-2">
        <Submit form={form} label="Send application" />
      </div>
    </form>
  );
}

export default function Partner() {
  useMeta('Partner with us', 'Five partnership programmes — distributors, OEMs, technology, investment and suppliers.');
  const [params, setParams] = useSearchParams();
  const active = getPartnership(params.get('type')) ?? partnershipTypes[0];
  const Icon = ICONS[active.icon];
  return (
    <>
      <Opening kicker="Partner with us" title={<>Five ways to <em>grow together.</em></>} intro="Choose the programme that suits your organisation. Each has its own short application." image="/images/handshake.jpg" crumbs={[{ label: 'Partner with us' }]} />
      <section className="py-14 lg:py-20">
        <Wrap>
          <div role="tablist" aria-label="Partnership programme" className="flex gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-full bg-d7-lichen w-full">
            {partnershipTypes.map((p) => {
              const on = p.id === active.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  id={`d7-tab-${p.id}`}
                  aria-selected={on}
                  aria-controls="d7-panel"
                  onClick={() => setParams({ type: p.id }, { replace: true, preventScrollReset: true })}
                  className={`shrink-0 flex-1 h-12 px-5 rounded-full text-[15px] font-medium whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-d7-moss ${on ? 'bg-d7-forest text-d7-mist shadow' : 'text-d7-forest hover:bg-d7-mist'}`}
                >
                  {p.shortTitle}
                </button>
              );
            })}
          </div>
          <div id="d7-panel" role="tabpanel" aria-labelledby={`d7-tab-${active.id}`} className="mt-10 grid lg:grid-cols-[1fr_1.7fr] gap-8 items-start">
            <div className="lg:sticky lg:top-28 rounded-t-[200px] rounded-b-[40px] bg-d7-forest text-d7-mist px-7 sm:px-9 pt-16 pb-9 text-center lg:text-left">
              <span className="mx-auto lg:mx-0 grid place-items-center w-16 h-16 rounded-full bg-d7-lime text-d7-forest">
                <Icon size={26} aria-hidden />
              </span>
              <Kicker light className="mt-6">
                Programme
              </Kicker>
              <Serif as="h2" className="mt-3 text-[34px] text-d7-mist">
                {active.title}
              </Serif>
              <p className="mt-3 text-d7-mist/75">{active.summary}</p>
              <p className="mt-6 text-[13px] uppercase tracking-[0.08em] text-d7-lime">Well suited to</p>
              <p className="mt-1 text-d7-mist/85">{active.idealFor}</p>
              <ul className="mt-6 space-y-2 text-left">
                {active.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <span className="grid place-items-center w-6 h-6 rounded-full bg-d7-mist/15 text-d7-lime shrink-0">
                      <Check size={14} aria-hidden />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <Form key={active.id} type={active} />
          </div>
        </Wrap>
      </section>
    </>
  );
}
