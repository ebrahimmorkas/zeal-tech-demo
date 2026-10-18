import { BRAND } from '../../../data/brand';
import { contactFormFields } from '../../../data/partnerships';
import { useDemoForm } from '../../../hooks/useDemoForm';
import { Field, Kicker, Note, Opening, Page, Received, Send, Serif, useMeta } from '../ui';

export default function Contact() {
  useMeta('Correspondence', 'Write to the group (placeholder contact details).');
  const form = useDemoForm(contactFormFields);
  return (
    <>
      <Opening chapter="Chapter IX · Correspondence" title={<>We would be <em>glad to hear</em> from you</>} crumbs={[{ label: 'Correspondence' }]} />
      <section className="pb-24 lg:pb-32">
        <Page className="grid lg:grid-cols-12 gap-14">
          <aside className="lg:col-span-4 space-y-12">
            <div>
              <Kicker>By letter</Kicker>
              {BRAND.offices.map((o) => (
                <div key={o.label} className="mt-6">
                  <p className="font-d3-serif italic text-[20px]">{o.label}</p>
                  <address className="not-italic text-d3-taupe leading-relaxed">
                    {o.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                    {o.country}
                  </address>
                </div>
              ))}
            </div>
            <div>
              <Kicker>By email &amp; telephone</Kicker>
              <p className="mt-4 font-d3-serif text-[20px]">
                <a href={`mailto:${BRAND.contact.email}`} className="hover:text-d3-oxblood break-all">
                  {BRAND.contact.email}
                </a>
              </p>
              <p className="font-d3-serif text-[20px]">
                <a href={`mailto:${BRAND.contact.mediaEmail}`} className="hover:text-d3-oxblood break-all">
                  {BRAND.contact.mediaEmail}
                </a>
              </p>
              <p className="mt-2 font-d3-serif text-[20px]">
                <a href={BRAND.contact.phoneHref} className="hover:text-d3-oxblood">
                  {BRAND.contact.phone}
                </a>
              </p>
              <p className="mt-2 text-d3-taupe text-[15px]">{BRAND.contact.hours}</p>
            </div>
            <Note>All details are placeholders pending the client’s confirmation.</Note>
            <div className="relative aspect-[4/3] bg-d3-cream border border-d3-rule overflow-hidden" role="img" aria-label="Map placeholder">
              <svg viewBox="0 0 200 150" className="absolute inset-0 w-full h-full" aria-hidden>
                <path d="M0 95 C 40 80, 70 110, 110 90 S 170 60, 200 70" stroke="#cfc4b1" fill="none" />
                <path d="M60 0 L 75 150" stroke="#cfc4b1" fill="none" />
                <path d="M0 40 L 200 55" stroke="#cfc4b1" fill="none" />
                <circle cx="96" cy="72" r="4" fill="#6e2a20" />
              </svg>
              <p className="absolute bottom-4 left-0 right-0 text-center font-d3-serif italic text-d3-taupe">Map to follow once the address is confirmed</p>
            </div>
          </aside>
          <div className="lg:col-span-7 lg:col-start-6">
            <Serif className="text-[40px] sm:text-[52px]">
              <em>Write to us</em>
            </Serif>
            <div className="mt-10">
              {form.status === 'success' ? (
                <Received title="Thank you for your letter" form={form} />
              ) : (
                <form noValidate onSubmit={form.handleSubmit} aria-label="Contact form" className="grid md:grid-cols-2 gap-x-10 gap-y-9">
                  {contactFormFields.map((f) => (
                    <Field key={f.name} field={f} form={form} />
                  ))}
                  <Send form={form} label="Send letter" />
                </form>
              )}
            </div>
          </div>
        </Page>
      </section>
    </>
  );
}
