import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useOverlay } from '../../hooks/useOverlay';

interface Props {
  open: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  label: string;
  /** Classes for the full-screen backdrop — each demo supplies its own look */
  className?: string;
  children: ReactNode;
}

/**
 * Headless modal behaviour (portal, focus trap, Escape, arrow keys, scroll lock).
 * Visual design is entirely provided by the calling demo.
 */
export function LightboxShell({ open, onClose, onPrev, onNext, label, className = '', children }: Props) {
  const ref = useOverlay<HTMLDivElement>(open, onClose);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onPrev?.();
      if (e.key === 'ArrowRight') onNext?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onPrev, onNext]);

  if (!open) return null;
  return createPortal(
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className={`fixed inset-0 z-[90] ${className}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {children}
    </div>,
    document.body,
  );
}

/** Index state helper for lightboxes. */
export function cycle(index: number, delta: number, length: number) {
  return (index + delta + length) % length;
}
