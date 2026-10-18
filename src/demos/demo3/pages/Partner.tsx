import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { partnershipTypes, getPartnership } from '../../../data/partnerships';
import type { PartnershipType } from '../../../types';
import { useDemoForm } from '../../../hooks/useDemoForm';
import { Field, Kicker, Note, Opening, Page, ROMAN, Received, Send, Serif, useMeta } from '../ui';

function Letter({ type }: { type: PartnershipType }) {
  const fields = useMemo(() => type.sections.flatMap((s) => s.fields), [type]);
  const form = useDemoForm(fields);
  if (form.status === 'success') return <Received title="Your letter has been received" form={form} />;
  return (
    <form noValidate onSubmit={form.handleSubmit} aria-label={`${type.title} application`} className="bg-d3-cream border border-d3-rule p-6 sm:p-14">
      <p className="font-d3-serif italic text-[22px]">To the Partnerships Office,</p>
      <p className="mt-2 font-d3-serif text-[18px] text-d3-taupe">Regarding: {type.title}</p>
      {type.sections.map((s, i) => (
        <fieldset key={s.title} className="mt-14">
          <legend className="flex items-baseline gap-4">
            <span className="font-d3-serif italic text-d3-oxblood">{ROMAN[i]}.</span>
            <span className="font-d3-serif font-light text-[30px]">{s.title}</span>
          </legend>
          <div className="mt-6 grid md:grid-cols-2 gap-x-10 gap-y-8">
            {s.fields.map((f) => (
              <Field key={f.name} field={f} form={form} />
            ))}
          </div>
        </fieldset>
      ))}
      <div className="mt-12 grid md:grid-cols-2">
        <Send form={form} label="Send application" />
      </div>
    </form>
  );
}

export default function Partner() {
  useMeta('Partnerships', 'Five ways to partner with the group: distribution, OEM, technology, investment and vendor registration.');
  const [params, setParams] = useSearchParams();
  const active = getPartnership(params.get('type')) ?? partnershipTypes[0];
  return (
    <>
      <Opening chapter="Chapter VIII · Partnerships" title={<>A long view, <em>shared</em></>} deck="Five ways to build a lasting relationship with the group." crumbs={[{ label: 'Partnerships' }]} />
      <section className="pb-24 lg:pb-32">
        <Page className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Kicker>Choose a path</Kicker>
            <div role="radiogroup" aria-label="Partnership type" className="mt-6 border-t border-d3-ink">
              {partnershipTypes.map((p, i) => {
                const on = p.id === active.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setParams({ type: p.id }, { replace: true, preventScrollReset: true })}
                    className={`w-full text-left py-6 border-b border-d3-rule transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-d3-oxblood ${on ? '' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className={`font-d3-serif italic w-6 ${on ? 'text-d3-oxblood' : 'text-d3-taupe'}`}>{ROMAN[i]}</span>
                      <span className={`font-d3-serif text-[26px] leading-tight ${on ? 'italic text-d3-oxblood' : ''}`}>{p.title}</span>
                    </span>
                    {on && <span className="block mt-2 pl-10 text-[15px] text-d3-taupe leading-relaxed">{p.summary}</span>}
                  </button>
                );
              })}
            </div>
            <div className="mt-10 space-y-6">
              <div>
                <Kicker>Ideal for</Kicker>
                <p className="mt-2 font-d3-serif italic text-[18px]">{active.idealFor}</p>
              </div>
              <div>
                <Kicker>What we offer</Kicker>
                <ul className="mt-2 font-d3-serif text-[18px] space-y-1">
                  {active.benefits.map((b) => (
                    <li key={b}>— {b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <Serif className="text-[40px] sm:text-[52px]">
              <em>{active.title}</em>
            </Serif>
            <div className="mt-3 mb-10">
              <Note>Please complete the letter below. Fields marked * are required.</Note>
            </div>
            <Letter key={active.id} type={active} />
          </div>
        </Page>
      </section>
    </>
  );
}
