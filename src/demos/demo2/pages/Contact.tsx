import { BRAND } from '../../../data/brand';
import { contactFormFields } from '../../../data/partnerships';
import { useDemoForm } from '../../../hooks/useDemoForm';
import { Display, Done, Field, PageHead, Submit, Tag, Wrap, useMeta } from '../ui';

export default function Contact() {
  useMeta('Contact', 'Contact the group (placeholder contact details).');
  const form = useDemoForm(contactFormFields);
  return (
    <>
      <PageHead index="10" title="Contact" intro="Route your enquiry to the right operating company." image="/images/city-night.jpg" crumbs={[{ label: 'Contact' }]} />
      <section className="py-16 lg:py-24">
        <Wrap className="grid lg:grid-cols-[1.3fr_1fr] gap-14">
          <div>
            <Tag index="A">Enquiry form</Tag>
            <Display className="mt-4 text-[44px] sm:text-[56px]">Send an enquiry</Display>
            <div className="mt-10">
              {form.status === 'success' ? (
                <Done heading="Enquiry logged" form={form} />
              ) : (
                <form noValidate onSubmit={form.handleSubmit} className="grid md:grid-cols-2 gap-x-6 gap-y-7" aria-label="Contact form">
                  {contactFormFields.map((f) => (
                    <Field key={f.name} field={f} form={form} />
                  ))}
                  <Submit form={form} label="Send enquiry" />
                </form>
              )}
            </div>
          </div>
          <aside className="space-y-8">
            <div className="bg-d2-graphite text-white p-8">
              <p className="font-d2-mono text-[12px] text-d2-signal">// DIRECT LINES · PLACEHOLDER</p>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="font-d2-mono text-[11px] text-white/50">GENERAL</dt>
                  <dd>
                    <a href={`mailto:${BRAND.contact.email}`} className="font-d2-display text-[22px] uppercase hover:text-d2-signal break-all">
                      {BRAND.contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-d2-mono text-[11px] text-white/50">PARTNERSHIPS</dt>
                  <dd>
                    <a href={`mailto:${BRAND.contact.partnersEmail}`} className="font-d2-display text-[22px] uppercase hover:text-d2-signal break-all">
                      {BRAND.contact.partnersEmail}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-d2-mono text-[11px] text-white/50">TELEPHONE</dt>
                  <dd>
                    <a href={BRAND.contact.phoneHref} className="font-d2-display text-[22px] uppercase hover:text-d2-signal">
                      {BRAND.contact.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-d2-mono text-[11px] text-white/50">HOURS</dt>
                  <dd className="text-white/80">{BRAND.contact.hours}</dd>
                </div>
              </dl>
            </div>
            <ul className="border-t-2 border-d2-graphite">
              {BRAND.offices.map((o, i) => (
                <li key={o.label} className="border-b border-d2-line py-5 grid grid-cols-[48px_1fr] gap-2">
                  <span className="font-d2-mono text-[12px] text-d2-signal pt-1">L-0{i + 1}</span>
                  <div>
                    <p className="font-d2-display font-bold uppercase text-[22px] leading-none">{o.label}</p>
                    <address className="mt-2 not-italic text-[15px] text-d2-slate">
                      {o.lines.join(', ')} — {o.country}
                    </address>
                  </div>
                </li>
              ))}
            </ul>
            <div className="relative aspect-[4/3] bg-d2-navy overflow-hidden" role="img" aria-label="Map placeholder">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg,#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-d2-signal ring-8 ring-d2-signal/30" />
              <p className="absolute bottom-0 left-0 right-0 p-4 font-d2-mono text-[11px] text-white/70 bg-d2-graphite/80">MAP INTEGRATION PLACEHOLDER — COORDINATES TBC</p>
            </div>
          </aside>
        </Wrap>
      </section>
    </>
  );
}
