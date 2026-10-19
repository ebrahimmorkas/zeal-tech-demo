export type DemoBase = '/demo1' | '/demo2' | '/demo3' | '/demo4' | '/demo5' | '/demo6' | '/demo7' | '/demo8' | '/demo9' | '/demo10';

/** Builds the full path set for a demo so every internal link keeps its prefix. */
export function makePaths(base: DemoBase) {
  return {
    base,
    home: base,
    about: `${base}/about-us`,
    companies: `${base}/group-companies`,
    company: (slug: string) => `${base}/group-companies/${slug}`,
    partner: `${base}/partner-with-us`,
    partnerType: (id: string) => `${base}/partner-with-us?type=${id}`,
    news: `${base}/news`,
    article: (slug: string) => `${base}/news/${slug}`,
    roadmap: `${base}/future-roadmap`,
    gallery: `${base}/gallery`,
    leadership: `${base}/leadership`,
    resources: `${base}/resource-centre`,
    resource: (slug: string) => `${base}/resource-centre/${slug}`,
    contact: `${base}/contact`,
    /** Turns a relative section path (e.g. "about-us") into an absolute demo path */
    to: (section: string) => (section ? `${base}/${section}` : base),
  };
}

export type DemoPaths = ReturnType<typeof makePaths>;
