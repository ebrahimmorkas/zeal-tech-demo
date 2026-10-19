import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { BRAND } from '../../../data/brand';
import { contactFormFields } from '../../../data/partnerships';
import { useDemoForm } from '../../../hooks/useDemoForm';
import { Done, Field, Kicker, Note, Opening, Serif, Submit, Wrap, useMeta } from '../ui';

export default function Contact() {
  useMeta('Contact', 'Offices, contact channels and an enquiry form (placeholder details; demo form).');
  const form = useDemoForm(contactFormFields);
  return (
    <>
      <Opening kicker="Contact" title={<>Come and <em>say hello.</em></>} intro="We’d be glad to hear from you. All details below are placeholders." image="/images/collab-pair.jpg" crumbs={[{ label: 'Contact' }]} />
      <section className="py-14 lg:py-20">
        <Wrap className="grid lg:grid-cols-[1.3fr_1fr] gap-10">
          <div className="rounded-[40px] bg-white p-6 sm:p-10">
            <Serif as="h2" className="text-[36px] sm:text-[44px] text-d7-forest">
              Send us a <em>note</em>
            </Serif>
            <div className="mt-8">
              {form.status === 'success' ? (
                <Done title="Enquiry received (demo)." form={form} />
              ) : (
                <form noValidate onSubmit={form.handleSubmit} aria-label="Contact form" className="grid sm:grid-cols-2 gap-x-5 gap-y-6">
                  {contactFormFields.map((f) => (
                    <Field key={f.name} field={f} form={form} />
                  ))}
                  <Submit form={form} label="Send message" />
                </form>
              )}
            </div>
          </div>
          <div className="space-y-5">
            <ul className="rounded-[40px] bg-d7-forest text-d7-mist p-7 sm:p-9 space-y-5">
              {[
                { icon: Mail, k: 'Email', v: BRAND.contact.email, href: `mailto:${BRAND.contact.email}` },
                { icon: Mail, k: 'Partnerships', v: BRAND.contact.partnersEmail, href: `mailto:${BRAND.contact.partnersEmail}` },
                { icon: Phone, k: 'Telephone', v: BRAND.contact.phone, href: BRAND.contact.phoneHref },
                { icon: Clock, k: 'Hours', v: BRAND.contact.hours },
              ].map((c) => (
                <li key={c.k} className="flex gap-4">
                  <span className="grid place-items-center w-11 h-11 rounded-full bg-d7-lime text-d7-forest shrink-0">
                    <c.icon size={18} aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[13px] text-d7-lime">{c.k}</span>
                    {c.href ? (
                      <a href={c.href} className="break-all hover:underline underline-offset-4">
                        {c.v}
                      </a>
                    ) : (
                      <span>{c.v}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            {BRAND.offices.map((o) => (
              <div key={o.label} className="rounded-[32px] bg-d7-lichen p-6 flex gap-4">
                <MapPin size={20} className="text-d7-moss shrink-0 mt-1" aria-hidden />
                <div>
                  <p className="font-d7-serif text-[21px] text-d7-forest">{o.label}</p>
                  <address className="mt-1 not-italic text-[15px] text-d7-soil">
                    {o.lines.join(', ')} · {o.country}
                  </address>
                </div>
              </div>
            ))}
          </div>
        </Wrap>
        <Wrap className="mt-10">
          {/* Map placeholder: a topographic contour drawing rather than a real map. */}
          <figure className="relative overflow-hidden rounded-t-[200px] rounded-b-[40px] bg-d7-lichen h-[320px]">
            <svg viewBox="0 0 1200 320" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full" aria-hidden>
              {Array.from({ length: 9 }).map((_, k) => (
                <ellipse key={k} cx={560 + k * 6} cy={180} rx={80 + k * 70} ry={34 + k * 26} fill="none" stroke="#5f8a55" strokeOpacity={0.35 - k * 0.025} strokeWidth="1.5" />
              ))}
            </svg>
            {[
              { x: '46%', y: '52%' },
              { x: '63%', y: '40%' },
              { x: '30%', y: '66%' },
            ].map((p, k) => (
              <span key={k} className="absolute -translate-x-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-d7-forest text-d7-lime" style={{ left: p.x, top: p.y }} aria-hidden>
                <MapPin size={18} />
              </span>
            ))}
            <figcaption className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3">
              <Kicker>Map placeholder</Kicker>
              <Note>An interactive map will be embedded once addresses are confirmed</Note>
            </figcaption>
          </figure>
        </Wrap>
      </section>
    </>
  );
}
