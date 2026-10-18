import { useCallback, useId, useMemo, useState } from 'react';
import type { FieldDef } from '../types';
import { initialValue, validateAll, validateField, type FieldValue, type FormErrors, type FormValues } from '../lib/validation';

export type FormStatus = 'idle' | 'submitting' | 'success';

/**
 * Shared form state + validation for every demo form.
 * Demo mode: submission is simulated locally and nothing is transmitted.
 * To go live, replace `simulateSubmit` with a POST to a backend or form service.
 */
export function useDemoForm(fields: FieldDef[]) {
  const formId = useId().replace(/:/g, '');
  const initial = useMemo(() => Object.fromEntries(fields.map((f) => [f.name, initialValue(f)])) as FormValues, [fields]);
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [reference, setReference] = useState('');

  const fieldId = useCallback((name: string) => `${formId}-${name}`, [formId]);

  const setValue = useCallback(
    (field: FieldDef, value: FieldValue) => {
      setValues((v) => ({ ...v, [field.name]: value }));
      if (touched[field.name]) setErrors((e) => ({ ...e, [field.name]: validateField(field, value) }));
    },
    [touched],
  );

  const toggleOption = useCallback(
    (field: FieldDef, option: string) => {
      const current = (values[field.name] as string[]) ?? [];
      const next = current.includes(option) ? current.filter((o) => o !== option) : [...current, option];
      setValue(field, next);
    },
    [values, setValue],
  );

  const onBlur = useCallback(
    (field: FieldDef) => {
      setTouched((t) => ({ ...t, [field.name]: true }));
      setErrors((e) => ({ ...e, [field.name]: validateField(field, values[field.name]) }));
    },
    [values],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const nextErrors = validateAll(fields, values);
      setErrors(nextErrors);
      setTouched(Object.fromEntries(fields.map((f) => [f.name, true])));
      const firstInvalid = fields.find((f) => nextErrors[f.name]);
      if (firstInvalid) {
        const el = document.getElementById(fieldId(firstInvalid.name));
        el?.focus();
        return false;
      }
      setStatus('submitting');
      await simulateSubmit();
      setReference(`DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
      setStatus('success');
      return true;
    },
    [fields, values, fieldId],
  );

  const reset = useCallback(() => {
    setValues(initial);
    setErrors({});
    setTouched({});
    setStatus('idle');
    setReference('');
  }, [initial]);

  const errorCount = Object.values(errors).filter(Boolean).length;

  /** Common accessibility props for an input bound to a field. */
  const a11y = (field: FieldDef) => ({
    id: fieldId(field.name),
    name: field.name,
    'aria-invalid': errors[field.name] ? true : undefined,
    'aria-describedby': errors[field.name] ? `${fieldId(field.name)}-error` : field.helper ? `${fieldId(field.name)}-help` : undefined,
    'aria-required': field.required || undefined,
  });

  return { values, errors, status, reference, errorCount, setValue, toggleOption, onBlur, handleSubmit, reset, fieldId, a11y };
}

export type DemoForm = ReturnType<typeof useDemoForm>;

function simulateSubmit() {
  return new Promise((r) => setTimeout(r, 900));
}
