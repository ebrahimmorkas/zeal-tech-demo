import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { BRAND } from '../../../data/brand';
import { contactFormFields } from '../../../data/partnerships';
import { useDemoForm } from '../../../hooks/useDemoForm';
import { Bento, Chip, Completion, Display, Done, Field, PASTEL, Sample, Shell, Submit, tile, useMeta } from '../ui';

export default function Contact() {
  useMeta('Contact', 'Offices, contact channels and an enquiry form (placeholder details; demo form).');
  const form = useDemoForm(contactFormFields);
  const channels = [
    { icon: Mail, k: 'General', v: BRAND.contact.email, href: `mailto:${BRAND.contact.email}` },
    { icon: Mail, k: 'Partnerships', v: BRAND.contact.partnersEmail, href: `mailto:${BRAND.contact.partnersEmail}` },
    { icon: Phone, k: 'Phone', v: BRAND.contact.phone, href: BRAND.contact.phoneHref },
    { icon: Clock, k: 'Hours', v: BRAND.contact.hours },
  ];
  return (
    <>
      <Bento eyebrow="Contact" title="Let’s talk" intro="Reach the right team, or send a note below. Details are placeholders." image="/images/mobile-work.jpg" crumbs={[{ label: 'Contact' }]} />
      <section className="pt-10 pb-6">
        <Shell>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {channels.map((c, i) => (
              <li key={c.k} className={`p-6 rounded-[28px] ${PASTEL[i]}`}>
                <span className="grid place-items-center w-11 h-11 rounded-2xl bg-white">
                  <c.icon size={19} aria-hidden />
                </span>
                <p className="mt-5 text-[13px] font-semibold text-d10-ink/60">{c.k}</p>
                {c.href ? (
                  <a href={c.href} className="mt-1 block font-semibold break-all hover:text-d10-violet">
                    {c.v}
                  </a>
                ) : (
                  <p className="mt-1 font-semibold">{c.v}</p>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4 grid lg:grid-cols-[1.5fr_1fr] gap-4 items-start">
            <div className={`${tile} p-6 sm:p-9`}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Display as="h2" className="text-[30px] sm:text-[36px]">
                  Send a message
                </Display>
                {form.status !== 'success' && <Completion form={form} fields={contactFormFields} />}
              </div>
              <div className="mt-7">
                {form.status === 'success' ? (
                  <Done title="Enquiry received (demo)." form={form} />
                ) : (
                  <form noValidate onSubmit={form.handleSubmit} aria-label="Contact form" className="grid sm:grid-cols-2 gap-x-4 gap-y-5">
                    {contactFormFields.map((f) => (
                      <Field key={f.name} field={f} form={form} />
                    ))}
                    <Submit form={form} label="Send message" />
                  </form>
                )}
              </div>
            </div>
            <div className="space-y-4">
              {BRAND.offices.map((o) => (
                <div key={o.label} className={`${tile} p-6 flex gap-4`}>
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-d10-canvas text-d10-violet shrink-0">
                    <MapPin size={18} aria-hidden />
                  </span>
                  <div>
                    <p className="font-d10-display font-semibold">{o.label}</p>
                    <address className="mt-1 not-italic text-[14.5px] text-d10-mute">
                      {o.lines.join(', ')}
                      <br />
                      {o.country}
                    </address>
                  </div>
                </div>
              ))}
              {/* Map placeholder: dotted grid with pins */}
              <figure className={`${tile} relative overflow-hidden h-[240px]`}>
                <div className="absolute inset-0 [background-image:radial-gradient(#cfc6f5_1.2px,transparent_1.2px)] [background-size:16px_16px]" aria-hidden />
                {[
                  ['34%', '40%'],
                  ['62%', '55%'],
                  ['48%', '72%'],
                ].map(([x, y], k) => (
                  <span key={k} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y }} aria-hidden>
                    <span className="absolute inset-0 rounded-full bg-d10-violet/30 animate-ping" />
                    <span className="relative block w-4 h-4 rounded-full bg-d10-violet ring-4 ring-white" />
                  </span>
                ))}
                <figcaption className="absolute left-3 right-3 bottom-3 flex flex-wrap items-center justify-between gap-2">
                  <Chip className="bg-white text-d10-ink">Map placeholder</Chip>
                  <Sample>Live map on launch</Sample>
                </figcaption>
              </figure>
            </div>
          </div>
        </Shell>
      </section>
    </>
  );
}
