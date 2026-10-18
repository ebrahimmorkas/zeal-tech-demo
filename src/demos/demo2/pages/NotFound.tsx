import { Btn, Display, P, Tag, Wrap, useMeta } from '../ui';

export default function NotFound() {
  useMeta('Page not found', 'The requested page could not be found.');
  return (
    <section className="bg-d2-graphite text-white min-h-[80vh] pt-[88px] flex items-center">
      <Wrap className="py-24">
        <Tag index="404" light>
          Route not found
        </Tag>
        <Display as="h1" light className="mt-6 text-[72px] sm:text-[140px]">
          Off the <span className="text-d2-signal">grid.</span>
        </Display>
        <p className="mt-6 max-w-lg text-white/70 text-[18px]">The page you requested doesn’t exist or has moved. Use the links below to continue.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Btn to={P.home}>Return home</Btn>
          <Btn to={P.contact} variant="ghostLight">
            Contact
          </Btn>
        </div>
      </Wrap>
    </section>
  );
}
