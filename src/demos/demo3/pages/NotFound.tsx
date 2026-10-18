import { Kicker, Ornament, P, Page, ReadLink, Serif, useMeta } from '../ui';

export default function NotFound() {
  useMeta('Page not found', 'The requested page could not be found.');
  return (
    <section className="py-32 lg:py-44 text-center">
      <Page className="max-w-3xl">
        <Kicker>Erratum · 404</Kicker>
        <Serif as="h1" className="mt-6 text-[56px] sm:text-[88px]">
          This page is <em>missing</em> from the edition.
        </Serif>
        <p className="mt-8 font-d3-serif italic text-[22px] text-d3-taupe">It may have moved, or the address may be mistyped.</p>
        <div className="mt-12 flex flex-wrap justify-center gap-10">
          <ReadLink to={P.home}>Return to the cover</ReadLink>
          <ReadLink to={P.contact}>Write to us</ReadLink>
        </div>
        <div className="mt-16">
          <Ornament />
        </div>
      </Page>
    </section>
  );
}
