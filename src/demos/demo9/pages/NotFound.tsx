import { Cue, Go, P, Stage, Title, useMeta } from '../ui';

export default function NotFound() {
  useMeta('Page not found', 'The requested page could not be found.');
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <img src="/images/city-night-sm.jpg" alt="" className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.25]" />
      <Stage className="relative py-40 text-center">
        <Cue>Error 404 · Scene missing</Cue>
        <p className="mt-8 font-d9-serif italic text-[120px] sm:text-[200px] leading-none text-d9-smoke/70" aria-hidden>
          404
        </p>
        <Title as="h1" className="mt-6 text-[40px] sm:text-[64px]">
          This scene was <em>cut.</em>
        </Title>
        <p className="mt-6 font-d9-sans font-light text-[18px] text-d9-ash">The page you were looking for does not exist, or has moved.</p>
        <div className="mt-12 flex flex-wrap justify-center gap-x-12 gap-y-4">
          <Go to={P.home}>Return home</Go>
          <Go to={P.contact}>Contact</Go>
        </div>
      </Stage>
    </section>
  );
}
