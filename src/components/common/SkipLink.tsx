/** Keyboard skip link. Each demo passes its own colors. */
export function SkipLink({ className = 'bg-black text-white' }: { className?: string }) {
  return (
    <a
      href="#main"
      className={`sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold ${className}`}
    >
      Skip to main content
    </a>
  );
}
