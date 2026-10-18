import { ButtonLink, Container, Eyebrow, Heading, P, useMeta } from '../ui';

export default function NotFound() {
  useMeta('Page not found', 'The page you requested could not be found.');
  return (
    <section className="py-32 lg:py-40">
      <Container className="max-w-3xl text-center">
        <p className="font-d1-serif text-[120px] leading-none text-d1-gold/40 font-semibold">404</p>
        <div className="mt-4 flex justify-center">
          <Eyebrow>Page not found</Eyebrow>
        </div>
        <Heading as="h1" className="mt-6 text-[40px] sm:text-[52px]">
          We couldn’t find that page.
        </Heading>
        <p className="mt-5 text-d1-muted text-[18px]">The page may have moved, or the address may be incorrect.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink to={P.home}>Return home</ButtonLink>
          <ButtonLink to={P.contact} variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
