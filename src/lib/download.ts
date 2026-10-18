import type { Resource } from '../types';
import { BRAND } from '../data/brand';

/** Generates a plain-text sample file for a resource and triggers a browser download. */
export function downloadResource(resource: Resource) {
  const lines = [
    resource.title,
    `${resource.type} · ${resource.author} · ${resource.date}`,
    '',
    `SAMPLE DOCUMENT — ${BRAND.name} design concept. Content is illustrative and not an official publication.`,
    '',
    resource.excerpt,
    '',
    ...resource.sections.flatMap((s) => [s.heading.toUpperCase(), ...s.paragraphs, '']),
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${resource.slug}-sample.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
