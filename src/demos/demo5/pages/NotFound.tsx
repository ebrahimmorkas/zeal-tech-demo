import { Box, Go, Pill, Title, P, useMeta } from '../ui';

export default function NotFound() {
  useMeta('Page not found', 'The requested page could not be found.');
  return (
    <section className="py-24">
      <Box>
        <div className="rounded-[40px] bg-d5-sky p-10 sm:p-16 text-center">
          <p className="text-[96px] leading-none" aria-hidden>
            🧭
          </p>
          <Pill tone="white" className="mt-6">
            Error 404
          </Pill>
          <Title as="h1" className="mt-4 text-[38px] sm:text-[52px]">
            Oops — we couldn’t find that page.
          </Title>
          <p className="mt-4 text-[18px] text-d5-mute">It may have moved. Let’s get you back on track.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Go to={P.home}>Go to homepage</Go>
            <Go to={P.contact} tone="white">
              Contact us
            </Go>
          </div>
        </div>
      </Box>
    </section>
  );
}
