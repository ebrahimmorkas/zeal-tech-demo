import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { partnershipTypes, getPartnership } from '../../../data/partnerships';
import type { PartnershipType } from '../../../types';
import { useDemoForm } from '../../../hooks/useDemoForm';
import { ICONS } from '../../../lib/icons';
import { Container, Eyebrow, Field, Heading, PageBanner, SubmitRow, SuccessPanel, useMeta } from '../ui';

function PartnerForm({ type }: { type: PartnershipType }) {
  const fields = useMemo(() => type.sections.flatMap((s) => s.fields), [type]);
  const form = useDemoForm(fields);
  if (form.status === 'success') return <SuccessPanel title="Application received (demo)" form={form} onReset={form.reset} />;
  return (
    <form noValidate onSubmit={form.handleSubmit} className="bg-white border border-d1-stone p-6 sm:p-10" aria-label={`${type.title} application form`}>
      {type.sections.map((s, i) => (
        <fieldset key={s.title} className={i > 0 ? 'mt-12' : ''}>
          <legend className="flex items-center gap-4 w-full font-d1-serif text-[26px] font-semibold text-d1-navy">
            <span className="text-d1-gold text-[18px]">0{i + 1}</span> {s.title}
          </legend>
          <div className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-6">
            {s.fields.map((f) => (
              <Field key={f.name} field={f} form={form} />
            ))}
          </div>
        </fieldset>
      ))}
      <div className="mt-10 pt-8 border-t border-d1-stone grid">
        <SubmitRow form={form} label="Submit application" />
      </div>
    </form>
  );
}

export default function Partner() {
  useMeta('Partner With Us', 'Partnership opportunities for dealers, OEMs, technology partners, investors and vendors.');
  const [params, setParams] = useSearchParams();
  const active = getPartnership(params.get('type')) ?? partnershipTypes[0];

  return (
    <>
      <PageBanner
        title="Partner With Us"
        intro="We build long-term partnerships with organisations that share our standards of quality, integrity and service."
        image="/images/partners-meeting.jpg"
        crumbs={[{ label: 'Partner With Us' }]}
      />
      <section className="py-20 lg:py-28">
        <Container className="grid lg:grid-cols-[340px_1fr] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-[120px]">
            <Eyebrow>Partnership routes</Eyebrow>
            <div role="tablist" aria-label="Partnership type" aria-orientation="vertical" className="mt-6 border-t border-d1-stone">
              {partnershipTypes.map((p) => {
                const Icon = ICONS[p.icon];
                const selected = p.id === active.id;
                return (
                  <button
                    key={p.id}
                    role="tab"
                    id={`d1-tab-${p.id}`}
                    aria-selected={selected}
                    aria-controls="d1-partner-panel"
                    type="button"
                    onClick={() => setParams({ type: p.id }, { replace: true, preventScrollReset: true })}
                    className={`w-full flex items-center gap-4 text-left px-4 py-5 border-b border-d1-stone transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-d1-gold ${selected ? 'bg-d1-navy text-white' : 'bg-white hover:bg-d1-ivory text-d1-navy'}`}
                  >
                    <Icon size={22} strokeWidth={1.4} className={selected ? 'text-d1-goldlight' : 'text-d1-gold'} aria-hidden />
                    <span className="font-d1-serif text-[21px] font-semibold leading-tight">{p.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div role="tabpanel" id="d1-partner-panel" aria-labelledby={`d1-tab-${active.id}`}>
            <Heading className="text-[36px] sm:text-[46px]">{active.title}</Heading>
            <p className="mt-4 text-[18px] leading-relaxed text-d1-ink/85 max-w-3xl">{active.summary}</p>
            <div className="mt-8 grid md:grid-cols-2 gap-8 pb-10">
              <div>
                <h3 className="text-[12px] uppercase tracking-[0.16em] font-semibold text-d1-gold">Ideal for</h3>
                <p className="mt-3 text-d1-muted leading-relaxed">{active.idealFor}</p>
              </div>
              <div>
                <h3 className="text-[12px] uppercase tracking-[0.16em] font-semibold text-d1-gold">What we offer</h3>
                <ul className="mt-3 space-y-2">
                  {active.benefits.map((b) => (
                    <li key={b} className="flex gap-2 text-d1-ink/85">
                      <Check size={17} className="mt-1 text-d1-gold shrink-0" aria-hidden /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <PartnerForm key={active.id} type={active} />
          </div>
        </Container>
      </section>
    </>
  );
}
