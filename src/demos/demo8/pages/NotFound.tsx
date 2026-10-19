import { Big, Box, Go, Outline, P, Sticker, useMeta } from '../ui';

export default function NotFound() {
  useMeta('Page not found', 'The requested page could not be found.');
  return (
    <section className="py-20 lg:py-28 bg-d8-yellow border-b-[3px] border-d8-ink overflow-hidden">
      <Box className="relative text-center">
        <div className="absolute left-4 top-0 hidden sm:block">
          <Sticker className="bg-d8-pink" rotate={-12}>
            Oops!
          </Sticker>
        </div>
        <div className="absolute right-6 bottom-10 hidden sm:block">
          <Sticker className="bg-d8-mint" rotate={9}>
            Error 404
          </Sticker>
        </div>
        <p className="font-d8-display font-extrabold text-[150px] sm:text-[260px] leading-[0.8] tracking-[-0.06em]" aria-hidden>
          4<Outline>0</Outline>4
        </p>
        <Big as="h1" className="mt-8 text-[40px] sm:text-[64px]">
          This page went missing.
        </Big>
        <p className="mt-4 text-[19px] font-medium">Maybe it never existed. Maybe it’s on a coffee break. Either way, let’s get you somewhere useful.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Go to={P.home} tone="ink">
            Take me home
          </Go>
          <Go to={P.contact} tone="white">
            Contact us
          </Go>
        </div>
      </Box>
    </section>
  );
}
