import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { partnershipTypes, getPartnership } from '../../../data/partnerships';
import type { PartnershipType } from '../../../types';
import { useDemoForm } from '../../../hooks/useDemoForm';
import { Cue, Done, Field, ROMAN, Stage, Submit, Title, TitleCard, useMeta } from '../ui';

function Form({ type }: { type: PartnershipType }) {
  const fields = useMemo(() => type.sections.flatMap((s) => s.fields), [type]);
  const form = useDemoForm(fields);
  if (form.status === 'success') return <Done title="Your application is received." form={form} />;
  return (
    <form noValidate onSubmit={form.handleSubmit} aria-label={`${type.title} application`} className="space-y-20">
      {type.sections.map((s, i) => (
        <fieldset key={s.title}>
          <legend className="w-full">
            <Cue>Part {ROMAN[i]}</Cue>
            <span className="block mt-3 font-d9-serif italic text-[34px]">{s.title}</span>
          </legend>
          <div className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-10">
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
  useMeta('Partnerships', 'Five partnership programmes: distribution, OEM, technology, investment and supplier registration.');
  const [params, setParams] = useSearchParams();
  const active = getPartnership(params.get('type')) ?? partnershipTypes[0];
  return (
    <>
      <TitleCard scene="VIII" title="Partnerships" intro="Five programmes for those who share a long view. Select one to begin." image="/images/partners-meeting.jpg" crumbs={[{ label: 'Partnerships' }]} />
      <section className="py-24 lg:py-32">
        <Stage>
          <div role="tablist" aria-label="Programme" className="grid sm:grid-cols-5 border-y border-d9-graphite">
            {partnershipTypes.map((p, i) => {
              const on = p.id === active.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  id={`d9-tab-${p.id}`}
                  aria-selected={on}
                  aria-controls="d9-panel"
                  onClick={() => setParams({ type: p.id }, { replace: true, preventScrollReset: true })}
                  className={`relative py-6 px-4 text-left sm:text-center border-b sm:border-b-0 sm:border-r last:border-0 border-d9-graphite transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-4 focus-visible:outline-d9-bone ${on ? 'text-d9-bone' : 'text-d9-smoke hover:text-d9-ash'}`}
                >
                  <span className="block font-d9-sans text-[11px] tracking-[0.3em]">{ROMAN[i]}</span>
                  <span className={`block mt-2 font-d9-serif text-[22px] leading-tight ${on ? 'italic' : ''}`}>{p.shortTitle}</span>
                  {on && <span className="absolute left-0 right-0 bottom-0 h-px bg-d9-bone" aria-hidden />}
                </button>
              );
            })}
          </div>
          <div id="d9-panel" role="tabpanel" aria-labelledby={`d9-tab-${active.id}`} className="mt-20 grid lg:grid-cols-[1fr_1.6fr] gap-16">
            <div className="lg:sticky lg:top-32 self-start">
              <Cue>The programme</Cue>
              <Title as="h2" className="mt-6 text-[40px] sm:text-[52px] italic">
                {active.title}
              </Title>
              <p className="mt-6 font-d9-sans font-light text-[17px] leading-[1.8] text-d9-ash">{active.summary}</p>
              <Cue className="mt-10">Ideal for</Cue>
              <p className="mt-3 font-d9-serif text-[20px]">{active.idealFor}</p>
              <Cue className="mt-10">What we offer</Cue>
              <ul className="mt-3">
                {active.benefits.map((b) => (
                  <li key={b} className="py-3 border-b border-d9-graphite font-d9-serif text-[20px]">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <Form key={active.id} type={active} />
          </div>
        </Stage>
      </section>
    </>
  );
}
