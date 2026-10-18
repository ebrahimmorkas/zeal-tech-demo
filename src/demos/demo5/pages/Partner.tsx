import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { partnershipTypes, getPartnership } from '../../../data/partnerships';
import type { PartnershipType } from '../../../types';
import { useDemoForm } from '../../../hooks/useDemoForm';
import { ICONS } from '../../../lib/icons';
import { Box, Field, Hero, Pill, SendRow, Thanks, Title, useMeta } from '../ui';

// Friendlier, conversational section headings for this concept.
const friendly: Record<string, string> = {
  'Contact details': '👋 First, tell us about you',
  'Business profile': '🏢 Now, about your business',
  'Programme requirements': '⚙️ What are you looking for?',
  'Technology profile': '💡 Tell us about your technology',
  'Investment interest': '📈 Your investment interests',
  'Supplier information': '📦 About your company',
  'Anything else': '💬 Anything else?',
  Confirmation: '✅ One last thing',
};
const tones = ['bg-d5-sky text-d5-teal', 'bg-[#fde9e3] text-[#b5452c]', 'bg-[#fdf0d2] text-[#8a5a00]', 'bg-[#e8eefc] text-[#3b4fb8]', 'bg-[#efe8fb] text-[#6b3fb8]'];

function Form({ type }: { type: PartnershipType }) {
  const fields = useMemo(() => type.sections.flatMap((s) => s.fields), [type]);
  const form = useDemoForm(fields);
  if (form.status === 'success') return <Thanks title="We’ve got your application!" form={form} />;
  return (
    <form noValidate onSubmit={form.handleSubmit} aria-label={`${type.title} form`} className="rounded-[36px] bg-white border-2 border-[#efeae1] p-6 sm:p-10 space-y-12">
      {type.sections.map((s) => (
        <fieldset key={s.title}>
          <legend className="text-[22px] sm:text-[24px] font-extrabold">{friendly[s.title] ?? s.title}</legend>
          <div className="mt-6 grid sm:grid-cols-2 gap-x-5 gap-y-6">
            {s.fields.map((f) => (
              <Field key={f.name} field={f} form={form} />
            ))}
          </div>
        </fieldset>
      ))}
      <div className="grid sm:grid-cols-2">
        <SendRow form={form} label="Send my application" />
      </div>
    </form>
  );
}

export default function Partner() {
  useMeta('Partner with us', 'Five partnership programmes — distributors, OEMs, technology, investment and vendors.');
  const [params, setParams] = useSearchParams();
  const active = getPartnership(params.get('type')) ?? partnershipTypes[0];
  return (
    <>
      <Hero eyebrow="Partner with us" title={<>Let’s grow something together.</>} intro="Pick the programme that fits you best. Each one has its own short form." image="/images/hands-together.jpg" crumbs={[{ label: 'Partner with us' }]} />
      <section className="py-14">
        <Box>
          <div role="tablist" aria-label="Partnership programme" className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {partnershipTypes.map((p, i) => {
              const Icon = ICONS[p.icon];
              const on = p.id === active.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  id={`d5-tab-${p.id}`}
                  aria-selected={on}
                  aria-controls="d5-panel"
                  onClick={() => setParams({ type: p.id }, { replace: true, preventScrollReset: true })}
                  className={`flex flex-col items-start gap-3 p-5 rounded-[28px] text-left border-2 transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-d5-sun ${on ? 'border-d5-teal bg-d5-sky' : 'border-[#efeae1] bg-white hover:border-d5-teal/40'}`}
                >
                  <span className={`grid place-items-center w-11 h-11 rounded-2xl ${tones[i]}`}>
                    <Icon size={20} aria-hidden />
                  </span>
                  <span className="text-[16px] font-extrabold leading-tight">{p.shortTitle}</span>
                </button>
              );
            })}
          </div>
          <div id="d5-panel" role="tabpanel" aria-labelledby={`d5-tab-${active.id}`} className="mt-10 grid lg:grid-cols-[1fr_1.8fr] gap-8 items-start">
            <div className="rounded-[32px] bg-d5-sand p-7 sm:p-9 lg:sticky lg:top-28">
              <Pill tone="coral">{active.shortTitle}</Pill>
              <Title as="h2" className="mt-4 text-[30px]">
                {active.title}
              </Title>
              <p className="mt-3 text-[16.5px] text-d5-mute">{active.summary}</p>
              <p className="mt-6 font-extrabold">Perfect for</p>
              <p className="mt-1 text-[16px] text-d5-mute">{active.idealFor}</p>
              <p className="mt-6 font-extrabold">What you’ll get</p>
              <ul className="mt-2 space-y-2">
                {active.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-[16px]">
                    <span className="grid place-items-center w-6 h-6 rounded-full bg-d5-teal text-white">
                      <Check size={14} aria-hidden />
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
