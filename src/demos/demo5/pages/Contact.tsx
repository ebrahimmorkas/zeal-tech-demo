import { useState } from 'react';
import { ChevronDown, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { BRAND } from '../../../data/brand';
import { contactFormFields } from '../../../data/partnerships';
import { useDemoForm } from '../../../hooks/useDemoForm';
import { Box, Field, Hero, Pill, Sample, SendRow, Thanks, Title, useMeta } from '../ui';

const faqs = [
  { q: 'How quickly will someone respond?', a: 'In this sample, we suggest a two-working-day response target. The client will confirm the actual service level.' },
  { q: 'Which company should I contact?', a: 'You don’t need to know — choose an enquiry type and the corporate team will route your message to the right company.' },
  { q: 'How do I become a supplier?', a: 'Use the Vendor Registration form on the Partner with us page. It collects the registration and category information procurement teams need.' },
  { q: 'Is this form live?', a: 'No. This is a design demonstration. Forms validate your input and show a confirmation, but nothing is transmitted.' },
];

export default function Contact() {
  useMeta('Contact', 'Get in touch with the group — contact options, offices and frequently asked questions (placeholder details).');
  const form = useDemoForm(contactFormFields);
  const [faq, setFaq] = useState<number | null>(0);
  return (
    <>
      <Hero eyebrow="Contact" title={<>We’d love to hear from you.</>} intro="Questions, ideas or partnership opportunities — our team is happy to help." image="/images/discussion.jpg" crumbs={[{ label: 'Contact' }]} />
      <section className="py-14">
        <Box>
          <ul className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Mail, label: 'Email us', value: BRAND.contact.email, href: `mailto:${BRAND.contact.email}`, tone: 'bg-d5-sky text-d5-teal' },
              { icon: Phone, label: 'Call us', value: BRAND.contact.phone, href: BRAND.contact.phoneHref, tone: 'bg-[#fde9e3] text-[#b5452c]' },
              { icon: Clock, label: 'Office hours', value: BRAND.contact.hours, tone: 'bg-[#fdf0d2] text-[#8a5a00]' },
            ].map(({ icon: Icon, label, value, href, tone }) => (
              <li key={label} className="flex items-center gap-4 rounded-[28px] bg-d5-sand p-5">
                <span className={`grid place-items-center w-12 h-12 rounded-full shrink-0 ${tone}`}>
                  <Icon size={21} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block font-extrabold">{label}</span>
                  {href ? (
                    <a href={href} className="block text-[15px] text-d5-mute hover:text-d5-teal break-all">
                      {value}
                    </a>
                  ) : (
                    <span className="block text-[15px] text-d5-mute">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <Sample>Placeholder contact details</Sample>
          </div>

          <div className="mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
            {form.status === 'success' ? (
              <Thanks title="Message received!" form={form} />
            ) : (
              <form noValidate onSubmit={form.handleSubmit} aria-label="Contact form" className="rounded-[36px] border-2 border-[#efeae1] p-6 sm:p-10 grid sm:grid-cols-2 gap-x-5 gap-y-6">
                <div className="sm:col-span-2">
                  <Title as="h2" className="text-[28px]">
                    Send us a message
                  </Title>
                  <p className="mt-1 text-d5-mute">We’ll make sure it reaches the right team.</p>
                </div>
                {contactFormFields.map((f) => (
                  <Field key={f.name} field={f} form={form} />
                ))}
                <SendRow form={form} label="Send message" />
              </form>
            )}
            <div className="space-y-5">
              <div className="relative rounded-[32px] overflow-hidden bg-d5-sky aspect-[4/3]" role="img" aria-label="Map placeholder">
                <svg viewBox="0 0 300 220" className="absolute inset-0 w-full h-full" aria-hidden>
                  <path d="M0 150 C 60 120, 110 170, 170 140 S 260 90, 300 110" stroke="#fff" strokeWidth="10" fill="none" />
                  <path d="M90 0 C 100 60, 80 140, 110 220" stroke="#fff" strokeWidth="6" fill="none" />
                  <circle cx="190" cy="80" r="40" fill="#cfe9e4" />
                </svg>
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full grid place-items-center w-12 h-12 rounded-full bg-d5-coral text-white shadow-lg">
                  <MapPin size={22} aria-hidden />
                </span>
                <p className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 px-4 py-2 text-[13.5px] font-semibold text-center">Interactive map to be added once the address is confirmed</p>
              </div>
              {BRAND.offices.map((o) => (
                <div key={o.label} className="rounded-[24px] bg-d5-sand p-5">
                  <p className="font-extrabold">{o.label}</p>
                  <address className="mt-1 not-italic text-[14.5px] text-d5-mute">
                    {o.lines.join(', ')} · {o.country}
                  </address>
                </div>
              ))}
            </div>
          </div>
        </Box>
      </section>

      <section className="py-14">
        <Box className="max-w-[880px]">
          <div className="text-center">
            <Pill tone="sun">FAQ</Pill>
            <Title className="mt-4 text-[32px] sm:text-[40px]">Good questions</Title>
          </div>
          <ul className="mt-10 space-y-3">
            {faqs.map((f, i) => {
              const open = faq === i;
              return (
                <li key={f.q} className="rounded-[24px] bg-d5-sand overflow-hidden">
                  <h3>
                    <button type="button" aria-expanded={open} aria-controls={`d5-faq-${i}`} id={`d5-faq-btn-${i}`} onClick={() => setFaq(open ? null : i)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left text-[17px] font-extrabold focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-[3px] focus-visible:outline-d5-sun">
                      {f.q}
                      <ChevronDown size={20} className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
                    </button>
                  </h3>
                  <div id={`d5-faq-${i}`} role="region" aria-labelledby={`d5-faq-btn-${i}`} hidden={!open} className="px-6 pb-5 text-[16px] text-d5-mute">
                    {f.a}
                  </div>
                </li>
              );
            })}
          </ul>
        </Box>
      </section>
    </>
  );
}
