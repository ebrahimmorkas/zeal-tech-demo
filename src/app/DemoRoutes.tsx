import type { ComponentType } from 'react';
import { Route, Routes } from 'react-router-dom';

export interface DemoPages {
  Layout: ComponentType;
  Home: ComponentType;
  About: ComponentType;
  Companies: ComponentType;
  CompanyDetail: ComponentType;
  Partner: ComponentType;
  News: ComponentType;
  NewsDetail: ComponentType;
  Roadmap: ComponentType;
  Gallery: ComponentType;
  Leadership: ComponentType;
  Resources: ComponentType;
  ResourceDetail: ComponentType;
  Contact: ComponentType;
  NotFound: ComponentType;
}

/** The section slugs every demo must implement (shared so tests can verify coverage). */
export const DEMO_SECTIONS = [
  'about-us',
  'group-companies',
  'partner-with-us',
  'news',
  'future-roadmap',
  'gallery',
  'leadership',
  'resource-centre',
  'contact',
] as const;

/**
 * Shared route table for a demo, mounted under "/demoN/*".
 * Routes are relative, so each demo's pages always render inside that demo's own layout.
 */
export function DemoRoutes({ pages: P }: { pages: DemoPages }) {
  return (
    <Routes>
      <Route element={<P.Layout />}>
        <Route index element={<P.Home />} />
        <Route path="about-us" element={<P.About />} />
        <Route path="group-companies" element={<P.Companies />} />
        <Route path="group-companies/:slug" element={<P.CompanyDetail />} />
        <Route path="partner-with-us" element={<P.Partner />} />
        <Route path="news" element={<P.News />} />
        <Route path="news/:slug" element={<P.NewsDetail />} />
        <Route path="future-roadmap" element={<P.Roadmap />} />
        <Route path="gallery" element={<P.Gallery />} />
        <Route path="leadership" element={<P.Leadership />} />
        <Route path="resource-centre" element={<P.Resources />} />
        <Route path="resource-centre/:slug" element={<P.ResourceDetail />} />
        <Route path="contact" element={<P.Contact />} />
        <Route path="*" element={<P.NotFound />} />
      </Route>
    </Routes>
  );
}
