import { Link } from 'react-router-dom';
import { LayoutGrid } from 'lucide-react';

/**
 * Presentation-only control for returning to the concept selection page.
 * Deliberately neutral and discreet so it does not read as part of the corporate design.
 */
export function ConceptsLink({ concept }: { concept: string }) {
  return (
    <Link
      to="/"
      className="group fixed z-[60] bottom-5 left-4 flex items-center gap-2 h-9 pl-2.5 pr-3 rounded-full bg-neutral-900/75 text-white/90 text-[12px] font-medium tracking-wide backdrop-blur-sm shadow-md ring-1 ring-white/10 hover:bg-neutral-900 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      aria-label={`Back to all concepts (currently viewing ${concept})`}
    >
      <LayoutGrid size={14} aria-hidden />
      <span className="hidden sm:inline">All concepts</span>
      <span className="hidden md:inline text-white/50 group-hover:text-white/70">· {concept}</span>
    </Link>
  );
}
