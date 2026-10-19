import { Chip, Display, Glow, Go, P, Shell, tile, useMeta } from '../ui';

export default function NotFound() {
  useMeta('Page not found', 'The requested page could not be found.');
  return (
    <section className="pt-10 pb-6">
      <Shell className="grid md:grid-cols-3 gap-4">
        <div className={`${tile} md:col-span-2 p-8 sm:p-14`}>
          <Chip>Error 404</Chip>
          <Display as="h1" className="mt-5 text-[44px] sm:text-[64px]">
            This tile is <Glow>missing.</Glow>
          </Display>
          <p className="mt-4 text-[18px] text-d10-mute">The page you’re after doesn’t exist or has moved. Try the menu, or head back home.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Go to={P.home}>Back to home</Go>
            <Go to={P.contact} tone="soft">
              Contact us
            </Go>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {['4', '0', '4', '?'].map((ch, i) => (
            <div key={i} className={`grid place-items-center aspect-square rounded-[24px] font-d10-display font-semibold text-[56px] ${['bg-d10-mint', 'bg-d10-peach', 'bg-d10-sky', 'bg-white/60 border-2 border-dashed border-d10-violet/40 text-d10-violet'][i]}`} aria-hidden>
              {ch}
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}
