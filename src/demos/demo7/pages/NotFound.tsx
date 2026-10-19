import { Go, Kicker, Leaf, P, Serif, Wrap, useMeta } from '../ui';

export default function NotFound() {
  useMeta('Page not found', 'The requested page could not be found.');
  return (
    <section className="relative overflow-hidden bg-d7-lichen py-24 lg:py-32">
      <Leaf className="absolute left-[12%] top-16 w-12 opacity-60" />
      <Leaf className="absolute right-[14%] bottom-20 w-16 opacity-40 [animation-delay:-5s]" color="#2c5640" />
      <Wrap className="text-center">
        <p className="font-d7-serif text-[120px] sm:text-[180px] leading-none text-d7-moss/70" aria-hidden>
          4<em>0</em>4
        </p>
        <Kicker className="mt-4">Error 404</Kicker>
        <Serif as="h1" className="mt-3 text-[40px] sm:text-[56px] text-d7-forest">
          This path is <em>overgrown.</em>
        </Serif>
        <p className="mt-4 text-[18px] text-d7-soil">We couldn’t find the page you were looking for. Let’s head back to familiar ground.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Go to={P.home}>Back to home</Go>
          <Go to={P.contact} tone="ghost">
            Contact us
          </Go>
        </div>
      </Wrap>
    </section>
  );
}
