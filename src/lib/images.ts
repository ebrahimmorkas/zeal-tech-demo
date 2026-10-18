import type { ImageAsset } from '../types';

/** Builds an image asset from a file stored in /public/images (large + -sm variants). */
export function img(name: string, alt: string): ImageAsset {
  return { src: `/images/${name}.jpg`, sm: `/images/${name}-sm.jpg`, alt };
}

/** Portrait paths (single size, 800×1000). */
export const portrait = (name: string) => `/images/${name}.jpg`;
