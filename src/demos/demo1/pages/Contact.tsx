import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { BRAND } from '../../../data/brand';
import { contactFormFields } from '../../../data/partnerships';
import { useDemoForm } from '../../../hooks/useDemoForm';
import { Container, Eyebrow, Field, Heading, PageBanner, SubmitRow, SuccessPanel, useMeta } from '../ui';

export default function Contact() {
  useMeta('Contact', 'Contact the corporate office (placeholder contact details).');
  const form = useDemoForm(contactFormFields);
  return (
    <>
      <PageBanner title="Contact Us" intro="Our corporate office will direct your enquiry to the right team." image="/images/office-corridor.jpg" crumbs={[{ label: 'Contact' }]} />
      <section className="py-20 lg:py-28">
        <Container className="grid lg:grid-cols-[1fr_1.3fr] gap-14 lg:gap-20">
          <div>
            <Eyebrow>Corporate Office</Eyebrow>
            <Heading className="mt-5 text-[38px] sm:text-[46px]">We welcome your enquiry.</Heading>
            <p className="mt-4 text-d1-muted">All contact details shown are placeholders pending confirmation by the client.</p>
            <ul className="mt-10 space-y-6">
              <li className="flex gap-4">
                <Mail className="text-d1-gold mt-1 shrink-0" size={20} aria-hidden />
                <div>
                  <p className="text-[12px] uppercase tracking-[0.16em] font-semibold text-d1-navy">Email</p>
                  <a href={`mailto:${BRAND.contact.email}`} className="text-d1-ink/85 hover:text-d1-gold break-all">
                    {BRAND.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="text-d1-gold mt-1 shrink-0" size={20} aria-hidden />
                <div>
                  <p className="text-[12px] uppercase tracking-[0.16em] font-semibold text-d1-navy">Telephone</p>
                  <a href={BRAND.contact.phoneHref} className="text-d1-ink/85 hover:text-d1-gold">
                    {BRAND.contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="text-d1-gold mt-1 shrink-0" size={20} aria-hidden />
                <div>
                  <p className="text-[12px] uppercase tracking-[0.16em] font-semibold text-d1-navy">Office hours</p>
                  <p className="text-d1-ink/85">{BRAND.contact.hours}</p>
                </div>
              </li>
            </ul>
            <div className="mt-12 space-y-px bg-d1-stone border border-d1-stone">
              {BRAND.offices.map((o) => (
                <div key={o.label} className="bg-white p-6 flex gap-4">
                  <MapPin className="text-d1-gold mt-1 shrink-0" size={20} aria-hidden />
                  <div>
                    <p className="font-d1-serif text-[22px] font-semibold text-d1-navy">{o.label}</p>
                    <address className="not-italic text-[15px] text-d1-muted leading-relaxed">
                      {o.lines.join(', ')}
                      <br />
                      {o.country}
                    </address>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            {form.status === 'success' ? (
              <SuccessPanel title="Enquiry received (demo)" form={form} onReset={form.reset} />
            ) : (
              <form noValidate onSubmit={form.handleSubmit} className="bg-white border border-d1-stone p-6 sm:p-10 grid sm:grid-cols-2 gap-6" aria-label="Contact form">
                <h2 className="sm:col-span-2 font-d1-serif text-[30px] font-semibold text-d1-navy">Send an enquiry</h2>
                {contactFormFields.map((f) => (
                  <Field key={f.name} field={f} form={form} />
                ))}
                <SubmitRow form={form} label="Send enquiry" />
              </form>
            )}
          </div>
        </Container>
      </section>
      <section aria-label="Map" className="relative h-[380px] bg-d1-stone overflow-hidden">
        <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(#d6d0c4 1px, transparent 1px), linear-gradient(90deg, #d6d0c4 1px, transparent 1px)', backgroundSize: '48px 48px' }} aria-hidden />
        <svg className="absolute inset-0 w-full h-full" aria-hidden preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0 62 C 25 55, 40 70, 60 58 S 90 40, 100 46" stroke="#fff" strokeWidth="1.6" fill="none" />
          <path d="M30 0 L 38 100" stroke="#fff" strokeWidth="1" fill="none" />
        </svg>
        <div className="relative h-full grid place-items-center text-center px-6">
          <div className="bg-white p-8 shadow-xl max-w-sm">
            <MapPin className="mx-auto text-d1-gold" size={30} aria-hidden />
            <p className="mt-3 font-d1-serif text-[24px] text-d1-navy font-semibold">Map integration placeholder</p>
            <p className="mt-2 text-[14px] text-d1-muted">An interactive map (e.g. Google Maps or Mapbox) will be embedded once the office address is confirmed.</p>
          </div>
        </div>
      </section>
    </>
  );
}
