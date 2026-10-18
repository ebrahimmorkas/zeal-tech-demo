import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../app/AppRoutes';
import { DEMO_SECTIONS } from '../app/DemoRoutes';
import { groupCompanies } from '../data/groupCompanies';
import { news } from '../data/news';
import { resources } from '../data/resources';

const DEMOS = ['demo1', 'demo2', 'demo3', 'demo4', 'demo5'] as const;

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

async function demoRoot(container: HTMLElement) {
  return waitFor(() => {
    const el = container.querySelector('[data-demo]');
    if (!el) throw new Error('demo not rendered yet');
    return el as HTMLElement;
  });
}

afterEach(cleanup);

describe('portal', () => {
  it('renders all five concept cards with preview links', () => {
    renderAt('/');
    for (const d of DEMOS) {
      expect(screen.getAllByRole('link', { name: /preview/i }).some((a) => a.getAttribute('href') === `/${d}`)).toBe(true);
    }
  });

  it('shows the global not-found page for unknown prefixes', () => {
    renderAt('/demo6/about-us');
    expect(screen.getByRole('heading', { level: 1, name: /doesn’t exist/i })).toBeInTheDocument();
  });
});

describe.each(DEMOS)('%s routing', (demo) => {
  const paths = [
    `/${demo}`,
    ...DEMO_SECTIONS.map((s) => `/${demo}/${s}`),
    `/${demo}/group-companies/${groupCompanies[0].slug}`,
    `/${demo}/news/${news[0].slug}`,
    `/${demo}/resource-centre/${resources[0].slug}`,
  ];

  it.each(paths)('%s renders inside its own layout with an h1 and prefixed links', async (path) => {
    const { container } = renderAt(path);
    const root = await demoRoot(container);
    expect(root.dataset.demo).toBe(demo);
    await waitFor(() => expect(container.querySelector('h1')).not.toBeNull());

    // Every internal link must stay within this demo (or go back to the portal).
    const hrefs = Array.from(container.querySelectorAll('a[href^="/"]')).map((a) => a.getAttribute('href')!);
    const stray = hrefs.filter((h) => h !== '/' && !h.startsWith(`/${demo}`) && !h.startsWith('/images/'));
    expect(stray).toEqual([]);
  });

  it('renders the demo-specific 404 for unknown nested paths', async () => {
    const { container } = renderAt(`/${demo}/this-page-does-not-exist`);
    const root = await demoRoot(container);
    expect(root.dataset.demo).toBe(demo);
    await waitFor(() => expect(container.textContent).toMatch(/404|not found|couldn’t find|missing/i));
  });

  it('renders the demo-specific 404 for unknown company slugs', async () => {
    const { container } = renderAt(`/${demo}/group-companies/unknown-company`);
    const root = await demoRoot(container);
    expect(root.dataset.demo).toBe(demo);
    await waitFor(() => expect(container.textContent).toMatch(/404|not found|couldn’t find|missing/i));
  });
});
