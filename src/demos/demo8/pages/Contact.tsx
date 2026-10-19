import { Mail, MapPin, Phone } from 'lucide-react';
import { BRAND } from '../../../data/brand';
import { contactFormFields } from '../../../data/partnerships';
import { useDemoForm } from '../../../hooks/useDemoForm';
import { Big, Box, Done, Field, Outline, POP, PageHead, Sample, Submit, Tag, card, lift, useMeta } from '../ui';

export default function Contact() {
  useMeta('Contact', 'Ways to reach the group and an enquiry form (placeholder details; demo form).');
  const form = useDemoForm(contactFormFields);
  const channels = [
    { icon: Mail, k: 'Email us', v: BRAND.contact.email, href: `mailto:${BRAND.contact.email}` },
    { icon: Mail, k: 'Partnerships', v: BRAND.contact.partnersEmail, href: `mailto:${BRAND.contact.partnersEmail}` },
    { icon: Phone, k: 'Call us', v: BRAND.contact.phone, href: BRAND.contact.phoneHref },
  ];
  return (
    <>
      <PageHead title={<>Say <Outline>hello.</Outline></>} intro="Drop us a line. We read everything (on the live site, anyway — this one’s a demo)." crumbs={[{ label: 'Contact' }]} color="bg-d8-pink" sticker="We don’t bite" />
      <section className="py-14 lg:py-20">
        <Box>
          <ul className="grid md:grid-cols-3 gap-5">
            {channels.map((c, i) => (
              <li key={c.k}>
                <a href={c.href} className={`flex items-center gap-4 h-full p-5 ${card} ${lift} ${POP[i % 4]}`}>
                  <span className="grid place-items-center w-12 h-12 bg-white text-d8-ink border-[3px] border-d8-ink rounded-full shrink-0">
                    <c.icon size={20} strokeWidth={2.5} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-d8-mono text-[12px] uppercase">{c.k}</span>
                    <span className="block font-d8-display font-extrabold text-[17px] break-all">{c.v}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-14 grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
            <div className={`bg-white p-6 sm:p-10 ${card}`}>
              <Big as="h2" className="text-[40px] sm:text-[52px]">
                Drop us a line
              </Big>
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
              {BRAND.offices.map((o, i) => (
                <div key={o.label} className={`p-5 bg-white ${card}`} style={{ transform: `rotate(${[-1, 1, -0.5][i]}deg)` }}>
                  <Tag className={POP[i % 4].split(' ')[0]}>
                    <MapPin size={13} aria-hidden /> {o.label}
                  </Tag>
                  <address className="mt-3 not-italic font-medium">
                    {o.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                    <span className="block text-d8-gray">{o.country}</span>
                  </address>
                </div>
              ))}
              {/* Doodle-style map placeholder */}
              <figure className={`relative overflow-hidden bg-d8-mint aspect-[4/3] ${card}`}>
                <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" aria-hidden>
                  <path d="M-10 210 C 80 170, 140 260, 230 200 S 360 150, 420 190" stroke="#111" strokeWidth="3" fill="none" strokeDasharray="10 8" />
                  <path d="M60 -10 C 90 80, 40 160, 120 320" stroke="#111" strokeWidth="3" fill="none" />
                  <path d="M260 -10 C 240 90, 300 170, 270 320" stroke="#111" strokeWidth="3" fill="none" />
                  <circle cx="170" cy="120" r="34" fill="#ffd43b" stroke="#111" strokeWidth="3" />
                </svg>
                <span className="absolute left-[40%] top-[34%] text-[34px]" aria-hidden>
                  📍
                </span>
                <figcaption className="absolute bottom-3 left-3 right-3 flex justify-between gap-2">
                  <Tag className="bg-white">Map placeholder</Tag>
                  <Sample>Real map on launch</Sample>
                </figcaption>
              </figure>
              <p className="font-d8-mono text-[12.5px]">{BRAND.contact.hours}</p>
            </div>
          </div>
        </Box>
      </section>
    </>
  );
}
