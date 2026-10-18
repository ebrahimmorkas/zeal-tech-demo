import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { partnershipTypes, getPartnership } from '../../../data/partnerships';
import type { PartnershipType } from '../../../types';
import { useDemoForm } from '../../../hooks/useDemoForm';
import { ICONS } from '../../../lib/icons';
import { Display, Done, Field, PageHead, Submit, Tag, Ticks, Wrap, useMeta } from '../ui';

function Form({ type }: { type: PartnershipType }) {
  const fields = useMemo(() => type.sections.flatMap((s) => s.fields), [type]);
  const form = useDemoForm(fields);
  if (form.status === 'success') return <Done heading="Application logged" form={form} />;
  return (
    <form noValidate onSubmit={form.handleSubmit} aria-label={`${type.title} form`} className="space-y-14">
      {type.sections.map((s, i) => (
        <fieldset key={s.title}>
          <legend className="w-full flex items-center gap-4 pb-4 border-b-2 border-d2-graphite">
            <span className="font-d2-mono text-[12px] text-d2-signal">STEP {i + 1}/{type.sections.length}</span>
            <span className="font-d2-display font-bold uppercase text-[28px] leading-none">{s.title}</span>
          </legend>
          <div className="mt-8 grid md:grid-cols-2 gap-x-6 gap-y-7">
            {s.fields.map((f) => (
              <Field key={f.name} field={f} form={form} />
            ))}
          </div>
        </fieldset>
      ))}
      <div className="grid md:grid-cols-2">
        <Submit form={form} label="Submit application" />
      </div>
    </form>
  );
}

export default function Partner() {
  useMeta('Partner Program', 'Five structured partnership routes: dealer/distributor, OEM, technology, investment and vendor registration.');
  const [params, setParams] = useSearchParams();
  const active = getPartnership(params.get('type')) ?? partnershipTypes[0];
  return (
    <>
      <PageHead index="03" title="Partner program" intro="Five structured routes to work with the group. Select a route to open its application." image="/images/handshake.jpg" crumbs={[{ label: 'Partner With Us' }]} />
      <div className="bg-d2-graphite border-t border-white/10">
        <Wrap>
          <div role="tablist" aria-label="Partnership route" className="grid grid-cols-2 md:grid-cols-5">
            {partnershipTypes.map((p, i) => {
              const Icon = ICONS[p.icon];
              const on = p.id === active.id;
              return (
                <button
                  key={p.id}
                  role="tab"
                  type="button"
                  id={`d2-tab-${p.id}`}
                  aria-selected={on}
                  aria-controls="d2-panel"
                  onClick={() => setParams({ type: p.id }, { replace: true, preventScrollReset: true })}
                  className={`relative text-left p-5 lg:p-6 border-white/10 border-r border-b md:border-b-0 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-d2-signal ${on ? 'bg-d2-signal text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                >
                  <span className="flex items-center justify-between">
                    <span className="font-d2-mono text-[11px]">R-0{i + 1}</span>
                    <Icon size={20} aria-hidden />
                  </span>
                  <span className="block mt-6 font-d2-display font-bold uppercase text-[20px] lg:text-[22px] leading-none">{p.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </Wrap>
      </div>
      <section className="py-16 lg:py-24">
        <Wrap className="grid lg:grid-cols-[380px_1fr] gap-12 lg:gap-20" >
          <aside className="lg:sticky lg:top-[110px] self-start">
            <Ticks className="border border-d2-line p-8 bg-d2-plate">
              <Tag index="SPEC">{active.shortTitle}</Tag>
              <Display as="h2" className="mt-4 text-[40px]">
                {active.title}
              </Display>
              <p className="mt-4 text-d2-graphite/80 leading-relaxed">{active.summary}</p>
              <p className="mt-6 font-d2-mono text-[11px] tracking-[0.12em] text-d2-slate">IDEAL FOR</p>
              <p className="mt-1 text-[15px]">{active.idealFor}</p>
              <p className="mt-6 font-d2-mono text-[11px] tracking-[0.12em] text-d2-slate">PROGRAM BENEFITS</p>
              <ul className="mt-2 divide-y divide-d2-line border-y border-d2-line">
                {active.benefits.map((b, i) => (
                  <li key={b} className="flex gap-3 py-2.5 text-[15px]">
                    <span className="font-d2-mono text-[11px] text-d2-signal pt-1">0{i + 1}</span>
                    {b}
                  </li>
                ))}
              </ul>
            </Ticks>
          </aside>
          <div role="tabpanel" id="d2-panel" aria-labelledby={`d2-tab-${active.id}`}>
            <Form key={active.id} type={active} />
          </div>
        </Wrap>
      </section>
    </>
  );
}
