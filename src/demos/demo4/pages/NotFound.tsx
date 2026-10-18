import { Btn, H, Label, Mono, P, Shell, dots, useMeta } from '../ui';

export default function NotFound() {
  useMeta('Page not found', 'The requested page could not be found.');
  return (
    <section className="relative bg-d4-void text-white min-h-[80vh] flex items-center overflow-hidden pt-28 pb-20">
      <div className="absolute inset-0" style={dots} aria-hidden />
      <Shell className="relative">
        <Label dark>error 404</Label>
        <H as="h1" dark className="mt-4 text-[52px] sm:text-[84px]">
          Route not found.
        </H>
        <Mono className="mt-4 text-d4-haze">The requested path does not resolve to a page in this site.</Mono>
        <div className="mt-10 flex flex-wrap gap-3">
          <Btn to={P.home}>Back to overview</Btn>
          <Btn to={P.contact} variant="ghostDark">
            Contact
          </Btn>
        </div>
      </Shell>
    </section>
  );
}
