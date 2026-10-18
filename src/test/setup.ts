import '@testing-library/jest-dom/vitest';

// jsdom lacks these browser APIs used by the UI.
window.scrollTo = (() => {}) as typeof window.scrollTo;
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}
class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
  root = null; rootMargin = ''; thresholds = [];
}
(window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = IO;
Element.prototype.scrollIntoView = function () {};
