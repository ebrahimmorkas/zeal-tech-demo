import { BRAND } from '../../../data/brand';
import { contactFormFields } from '../../../data/partnerships';
import { useDemoForm } from '../../../hooks/useDemoForm';
import { Cue, Done, Field, ROMAN, Sample, Stage, Submit, Title, TitleCard, useMeta } from '../ui';

export default function Contact() {
  useMeta('Contact', 'Offices, enquiry channels and a contact form (placeholder details; demo form).');
  const form = useDemoForm(contactFormFields);
  return (
    <>
      <TitleCard scene="IX" title="Contact" intro="All details shown are placeholders for design review." crumbs={[{ label: 'Contact' }]} />
      <section className="pb-24 lg:pb-32">
        <Stage>
          <dl className="grid md:grid-cols-3 gap-px bg-d9-graphite border-y border-d9-graphite">
            {[
              { k: 'Enquiries', v: BRAND.contact.email, href: `mailto:${BRAND.contact.email}` },
              { k: 'Partnerships', v: BRAND.contact.partnersEmail, href: `mailto:${BRAND.contact.partnersEmail}` },
              { k: 'Telephone', v: BRAND.contact.phone, href: BRAND.contact.phoneHref },
            ].map((c) => (
              <div key={c.k} className="bg-d9-black py-10 md:px-8 text-center">
                <dt>
                  <Cue>{c.k}</Cue>
                </dt>
                <dd className="mt-4">
                  <a href={c.href} className="font-d9-serif text-[22px] sm:text-[26px] break-all hover:italic">
                    {c.v}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-24 grid lg:grid-cols-[1.4fr_1fr] gap-20">
            <div>
              <Title as="h2" className="text-[48px] sm:text-[72px]">
                Write <em>to us</em>
              </Title>
              <div className="mt-12">
                {form.status === 'success' ? (
                  <Done title="Enquiry received (demo)." form={form} />
                ) : (
                  <form noValidate onSubmit={form.handleSubmit} aria-label="Contact form" className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
                    {contactFormFields.map((f) => (
                      <Field key={f.name} field={f} form={form} />
                    ))}
                    <Submit form={form} label="Send enquiry" />
                  </form>
                )}
              </div>
            </div>
            <div className="space-y-12">
              {BRAND.offices.map((o, i) => (
                <div key={o.label}>
                  <Cue>
                    {ROMAN[i]} · {o.label}
                  </Cue>
                  <address className="mt-4 not-italic font-d9-serif text-[22px] leading-relaxed text-d9-ash">
                    {o.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                    <span className="block italic text-d9-smoke">{o.country}</span>
                  </address>
                </div>
              ))}
              <p className="font-d9-sans font-light text-d9-smoke">{BRAND.contact.hours}</p>
              {/* Map placeholder: a night-time aerial still, clearly labelled. */}
              <figure className="relative">
                <img src="/images/city-aerial-sm.jpg" alt="" className="w-full aspect-[4/3] object-cover grayscale brightness-50" loading="lazy" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-d9-bone ring-8 ring-d9-bone/20" aria-hidden />
                <figcaption className="mt-4 flex justify-between gap-3">
                  <Cue>Map placeholder</Cue>
                  <Sample>Interactive map on launch</Sample>
                </figcaption>
              </figure>
            </div>
          </div>
        </Stage>
      </section>
    </>
  );
}
