import { useEffect } from 'react';
import { BRAND } from '../data/brand';

/** Sets a page-specific document title and meta description. */
export function usePageMeta(title: string, description: string, concept?: string) {
  useEffect(() => {
    const suffix = concept ? `${BRAND.name} · ${concept}` : BRAND.name;
    document.title = title ? `${title} | ${suffix}` : suffix;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description, concept]);
}
