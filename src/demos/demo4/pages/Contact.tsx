import { Handshake, Mail, MapPin, Newspaper, Phone } from 'lucide-react';
import { BRAND } from '../../../data/brand';
import { contactFormFields } from '../../../data/partnerships';
import { useDemoForm } from '../../../hooks/useDemoForm';
import { Card, Field, H, Label, Mono, PageTop, SampleChip, Shell, SubmitBar, Success, dots, useMeta } from '../ui';

export default function Contact() {
  useMeta('Contact', 'Contact channels and enquiry form (placeholder details).');
  const form = useDemoForm(contactFormFields);
  const channels = [
    { icon: Mail, label: 'General enquiries', value: BRAND.contact.email, href: `mailto:${BRAND.contact.email}` },
    { icon: Handshake, label: 'Partnerships', value: BRAND.contact.partnersEmail, href: `mailto:${BRAND.contact.partnersEmail}` },
    { icon: Newspaper, label: 'Media', value: BRAND.contact.mediaEmail, href: `mailto:${BRAND.contact.mediaEmail}` },
    { icon: Phone, label: 'Telephone', value: BRAND.contact.phone, href: BRAND.contact.phoneHref },
  ];
  return (
    <>
      <PageTop label="contact" title={<>Let’s talk.</>} intro="Choose a channel or send a message — we’ll route it to the right business unit." crumbs={[{ label: 'Contact' }]} />
      <section className="py-16 lg:py-24">
        <Shell>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a href={href} className="group flex flex-col h-full p-5 rounded-2xl bg-white ring-1 ring-[#e4e8f2] hover:ring-d4-indigo/50 transition">
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-d4-mist text-d4-indigo">
                    <Icon size={18} aria-hidden />
                  </span>
                  <span className="mt-4 font-d4-mono text-[12px] text-d4-deep/55">{label}</span>
                  <span className="mt-1 text-[14.5px] break-all group-hover:text-d4-indigo">{value}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <SampleChip />
          </div>
          <div className="mt-10 grid lg:grid-cols-[1.4fr_1fr] gap-6">
            {form.status === 'success' ? (
              <Success title="Message received" form={form} />
            ) : (
              <Card className="p-6 sm:p-9">
                <Label>send a message</Label>
                <H as="h2" className="mt-2 text-[28px]">
                  How can we help?
                </H>
                <form noValidate onSubmit={form.handleSubmit} aria-label="Contact form" className="mt-6 grid sm:grid-cols-2 gap-5">
                  {contactFormFields.map((f) => (
                    <Field key={f.name} field={f} form={form} />
                  ))}
                  <SubmitBar form={form} label="Send message" />
                </form>
              </Card>
            )}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-[24px] bg-d4-void aspect-[4/3]" role="img" aria-label="Map placeholder">
                <div className="absolute inset-0" style={dots} aria-hidden />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute -inset-6 rounded-full bg-d4-indigo/30 animate-ping" aria-hidden />
                  <span className="relative grid place-items-center w-10 h-10 rounded-full bg-d4-indigo text-white">
                    <MapPin size={18} aria-hidden />
                  </span>
                </span>
                <Mono className="absolute bottom-4 left-4 right-4 text-d4-haze">map_integration: pending address confirmation</Mono>
              </div>
              {BRAND.offices.map((o) => (
                <Card key={o.label} className="p-5">
                  <p className="font-d4-display text-[16px]">{o.label}</p>
                  <address className="mt-1 not-italic text-[14px] text-d4-deep/60">
                    {o.lines.join(', ')} · {o.country}
                  </address>
                </Card>
              ))}
            </div>
          </div>
        </Shell>
      </section>
    </>
  );
}
