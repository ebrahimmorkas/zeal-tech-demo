import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ScrollToTop } from '../components/common/ScrollToTop';
import Portal from '../portal/Portal';
import GlobalNotFound from '../portal/GlobalNotFound';

// Each concept is code-split so visitors only download the demo they open.
const Demo1 = lazy(() => import('../demos/demo1'));
const Demo2 = lazy(() => import('../demos/demo2'));
const Demo3 = lazy(() => import('../demos/demo3'));
const Demo4 = lazy(() => import('../demos/demo4'));
const Demo5 = lazy(() => import('../demos/demo5'));
const Demo6 = lazy(() => import('../demos/demo6'));
const Demo7 = lazy(() => import('../demos/demo7'));
const Demo8 = lazy(() => import('../demos/demo8'));
const Demo9 = lazy(() => import('../demos/demo9'));
const Demo10 = lazy(() => import('../demos/demo10'));

function Loading() {
  return (
    <div className="min-h-screen grid place-items-center bg-white" role="status" aria-live="polite">
      <span className="w-6 h-6 rounded-full border-2 border-neutral-300 border-t-neutral-800 animate-spin" />
      <span className="sr-only">Loading concept…</span>
    </div>
  );
}

export function AppRoutes() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Portal />} />
          <Route path="/demo1/*" element={<Demo1 />} />
          <Route path="/demo2/*" element={<Demo2 />} />
          <Route path="/demo3/*" element={<Demo3 />} />
          <Route path="/demo4/*" element={<Demo4 />} />
          <Route path="/demo5/*" element={<Demo5 />} />
          <Route path="/demo6/*" element={<Demo6 />} />
          <Route path="/demo7/*" element={<Demo7 />} />
          <Route path="/demo8/*" element={<Demo8 />} />
          <Route path="/demo9/*" element={<Demo9 />} />
          <Route path="/demo10/*" element={<Demo10 />} />
          <Route path="*" element={<GlobalNotFound />} />
        </Routes>
      </Suspense>
    </MotionConfig>
  );
}
