import { BRAND } from '../../../data/brand';
import { contactFormFields } from '../../../data/partnerships';
import { useDemoForm } from '../../../hooks/useDemoForm';
import { Done, Field, Frame, H, Label, PageHead, Sample, Submit, narrow, useMeta } from '../ui';

export default function Contact() {
  useMeta('Contact', 'Offices, enquiry channels and a contact form (placeholder details; demo form).');
  const form = useDemoForm(contactFormFields);
  return (
    <>
      <PageHead n="09" title={<>Contact<span className="text-d6-red">.</span></>} intro="Write to the group, or use the form below. All details shown are placeholders." crumbs={[{ label: 'Contact' }]} />

      <section className="border-b-[3px] border-d6-ink">
        <dl className="grid sm:grid-cols-3">
          {[
            { k: 'General', v: BRAND.contact.email, href: `mailto:${BRAND.contact.email}` },
            { k: 'Partnerships', v: BRAND.contact.partnersEmail, href: `mailto:${BRAND.contact.partnersEmail}` },
            { k: 'Telephone', v: BRAND.contact.phone, href: BRAND.contact.phoneHref },
          ].map((c, i) => (
            <div key={c.k} className={`px-5 sm:px-8 lg:px-12 py-8 ${i ? 'border-t sm:border-t-0 sm:border-l border-d6-line' : ''}`}>
              <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-d6-mid" style={narrow}>
                {c.k}
              </dt>
              <dd className="mt-2">
                <a href={c.href} className="text-[18px] font-bold break-all hover:text-d6-red">
                  {c.v}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="py-16 lg:py-24">
        <Frame className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <Label n="9.1">Enquiry form</Label>
            <H className="mt-6 text-[40px] sm:text-[56px]">Write to us.</H>
            <div className="mt-10">
              {form.status === 'success' ? (
                <Done title="Enquiry received (demo)." form={form} />
              ) : (
                <form noValidate onSubmit={form.handleSubmit} aria-label="Contact form" className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
                  {contactFormFields.map((f) => (
                    <Field key={f.name} field={f} form={form} />
                  ))}
                  <Submit form={form} label="Send enquiry" />
                </form>
              )}
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Label n="9.2">Offices</Label>
            <ul className="mt-6 border-t-[3px] border-d6-ink">
              {BRAND.offices.map((o, i) => (
                <li key={o.label} className="py-6 border-b border-d6-line">
                  <p className="flex items-baseline gap-3 font-bold">
                    <span className="text-d6-red text-[12px] tabular-nums">{String.fromCharCode(65 + i)}</span>
                    {o.label}
                  </p>
                  <address className="mt-2 not-italic text-[15px] text-d6-ink/75 leading-relaxed pl-6">
                    {o.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                    <span className="block text-d6-mid">{o.country}</span>
                  </address>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[14px] text-d6-mid">{BRAND.contact.hours}</p>
            {/* Map placeholder drawn as a coordinate grid with office markers. */}
            <figure className="mt-8 border-[3px] border-d6-ink">
              <div className="relative aspect-square bg-white" style={{ backgroundImage: 'linear-gradient(#d9d9d9 1px, transparent 1px), linear-gradient(90deg, #d9d9d9 1px, transparent 1px)', backgroundSize: '10% 10%' }}>
                {[
                  { x: 38, y: 42 },
                  { x: 62, y: 58 },
                  { x: 24, y: 72 },
                ].map((p, i) => (
                  <span key={i} className="absolute flex items-center gap-1 -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }} aria-hidden>
                    <span className="w-4 h-4 bg-d6-red" />
                    <span className="text-[11px] font-bold">{String.fromCharCode(65 + i)}</span>
                  </span>
                ))}
              </div>
              <figcaption className="p-3 border-t-[3px] border-d6-ink flex justify-between gap-2 text-[12px]">
                <span className="font-bold uppercase tracking-[0.1em]" style={narrow}>
                  Map placeholder
                </span>
                <Sample>Interactive map on launch</Sample>
              </figcaption>
            </figure>
          </div>
        </Frame>
      </section>
    </>
  );
}
