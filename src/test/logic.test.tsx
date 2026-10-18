import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { validateField } from '../lib/validation';
import { respond } from '../lib/chat/engine';
import { contactFormFields, partnershipTypes } from '../data/partnerships';
import { AppRoutes } from '../app/AppRoutes';

describe('validation', () => {
  const email = { name: 'email', label: 'Business email', type: 'email' as const, required: true };
  const phone = { name: 'phone', label: 'Phone number', type: 'tel' as const, required: true };

  it('requires values and validates email format', () => {
    expect(validateField(email, '')).toMatch(/required/i);
    expect(validateField(email, 'not-an-email')).toMatch(/valid email/i);
    expect(validateField(email, 'name@company.com')).toBeUndefined();
  });

  it('validates phone numbers sensibly', () => {
    expect(validateField(phone, 'abc')).toBeTruthy();
    expect(validateField(phone, '12345')).toMatch(/7 to 15 digits/);
    expect(validateField(phone, '+44 (0) 20 7946 0000')).toBeUndefined();
  });

  it('requires at least one checkbox and consent', () => {
    const cb = { name: 'x', label: 'Areas', type: 'checkboxes' as const, required: true, options: ['a'] };
    expect(validateField(cb, [])).toBeTruthy();
    expect(validateField(cb, ['a'])).toBeUndefined();
    const consent = { name: 'c', label: 'Consent', type: 'consent' as const, required: true };
    expect(validateField(consent, false)).toBeTruthy();
    expect(validateField(consent, true)).toBeUndefined();
  });

  it('defines five distinct partnership forms', () => {
    expect(partnershipTypes.map((p) => p.id)).toEqual(['dealer', 'oem', 'technology', 'investment', 'vendor']);
    const signatures = partnershipTypes.map((p) => p.sections.flatMap((s) => s.fields.map((f) => f.name)).join(','));
    expect(new Set(signatures).size).toBe(5);
    const vendor = partnershipTypes.find((p) => p.id === 'vendor')!.sections.flatMap((s) => s.fields.map((f) => f.name));
    expect(vendor).toEqual(expect.arrayContaining(['registrationNumber', 'taxId', 'categories']));
    const inv = partnershipTypes.find((p) => p.id === 'investment')!.sections.flatMap((s) => s.fields.map((f) => f.name));
    expect(inv).toEqual(expect.arrayContaining(['investorType', 'ticketSize', 'horizon']));
  });
});

describe('chat engine', () => {
  it.each([
    ['What does the group do?', /workshop|mission/i],
    ['Which companies are in the group?', /Industrial Systems/],
    ['Which industries do you serve?', /Manufacturing/],
    ['How can I become a distributor?', /Dealer \/ Distributor/],
    ['What is on the future roadmap?', /Short term/],
    ['How do I contact you?', /Email/],
    ['Tell me about solar energy', /Energy Solutions/],
    ['What products and services do you offer?', /offerings/i],
    ['qwerty zzz', /demo assistant/i],
  ])('answers "%s"', (q, expected) => {
    expect(respond(q).text).toMatch(expected);
  });
});

describe('forms in the UI', () => {
  it('shows errors on empty submit, then a demo confirmation when valid', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { container } = render(
      <MemoryRouter initialEntries={['/demo1/contact']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppRoutes />
      </MemoryRouter>,
    );
    const form = await waitFor(() => {
      const f = container.querySelector('form[aria-label="Contact form"]');
      if (!f) throw new Error('no form');
      return f as HTMLFormElement;
    });
    fireEvent.submit(form);
    expect(await screen.findByText(/Full name is required/i)).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent(/correct/i);

    const byName = (n: string) => form.querySelector(`[name="${n}"]`) as HTMLInputElement;
    await user.type(byName('fullName'), 'Test Person');
    await user.type(byName('email'), 'test@company.com');
    await user.selectOptions(byName('enquiryType'), contactFormFields[4].options![0]);
    await user.type(byName('message'), 'Hello, this is a test message.');
    await user.click(byName('consent'));
    fireEvent.submit(form);
    await act(async () => {
      vi.advanceTimersByTime(1200);
    });
    expect(await screen.findByText(/Enquiry received \(demo\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Demo reference: DEMO-/)).toBeInTheDocument();
    vi.useRealTimers();
  });
});
