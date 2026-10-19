import { Link, useLocation } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { concepts } from './concepts';

/** Shown for any URL outside "/" and the ten demo prefixes (e.g. /demo11). */
export default function GlobalNotFound() {
  const { pathname } = useLocation();
  usePageMeta('Page not found', 'This address does not match any of the design concepts.');
  return (
    <main className="min-h-screen bg-[#111318] text-[#e9e3d6] font-pt-sans grid place-items-center px-6 py-20">
      <div className="max-w-xl text-center">
        <p className="text-[13px] uppercase tracking-[0.22em] text-[#c9b48a]">404 · Not found</p>
        <h1 className="mt-6 font-pt-serif text-[52px] sm:text-[64px] leading-none">This page doesn’t exist.</h1>
        <p className="mt-6 text-white/60">
          <code className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 break-all">{pathname}</code> does not match any design concept.
        </p>
        <Link to="/" className="mt-10 inline-flex items-center h-12 px-6 rounded-full bg-[#e9e3d6] text-[#111318] font-semibold hover:bg-white">
          View all concepts
        </Link>
        <ul className="mt-10 flex flex-wrap justify-center gap-2 text-[14px]">
          {concepts.map((c) => (
            <li key={c.id}>
              <Link to={c.path} className="inline-block px-3 py-1.5 rounded-full border border-white/15 text-white/70 hover:text-white hover:bg-white/5">
                {c.number} · {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
