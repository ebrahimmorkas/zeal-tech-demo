import { Frame, Go, Label, P, narrow, useMeta, wide } from '../ui';

export default function NotFound() {
  useMeta('Page not found', 'The requested page could not be found.');
  return (
    <section className="py-16 lg:py-24 border-b-[3px] border-d6-ink">
      <Frame>
        <Label n="404">Error · Page not found</Label>
        <p className="mt-6 font-d6-sans font-extrabold text-[140px] sm:text-[260px] leading-[0.8] tracking-[-0.07em] text-d6-red tabular-nums" style={wide} aria-hidden>
          404
        </p>
        <h1 className="mt-8 font-d6-sans font-extrabold text-[36px] sm:text-[56px] leading-[0.95] tracking-[-0.045em] max-w-3xl" style={wide}>
          This page is not in the index.
        </h1>
        <p className="mt-5 text-[18px] text-d6-ink/75 max-w-xl">The address may be mistyped, or the page may have moved.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Go to={P.home} className="min-w-[220px]">
            Return to index
          </Go>
          <Go to={P.contact} tone="line" className="min-w-[200px]">
            Contact
          </Go>
        </div>
        <p className="mt-10 text-[12px] font-bold uppercase tracking-[0.14em] text-d6-mid" style={narrow}>
          Concept 6 · Swiss Precision
        </p>
      </Frame>
    </section>
  );
}
