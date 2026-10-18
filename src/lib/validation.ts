import type { FieldDef } from '../types';

export type FieldValue = string | string[] | boolean;
export type FormValues = Record<string, FieldValue>;
export type FormErrors = Record<string, string | undefined>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARS_RE = /^\+?[\d\s().-]+$/;
const URL_RE = /^https?:\/\/[^\s.]+\.[^\s]{2,}$/i;

export function initialValue(field: FieldDef): FieldValue {
  if (field.type === 'checkboxes') return [];
  if (field.type === 'consent') return false;
  return '';
}

export function validateField(field: FieldDef, value: FieldValue): string | undefined {
  const label = field.label.replace(/\s*\(.*\)$/, '');
  if (field.type === 'consent') {
    return field.required && value !== true ? 'Please confirm to continue.' : undefined;
  }
  if (field.type === 'checkboxes') {
    const arr = Array.isArray(value) ? value : [];
    return field.required && arr.length === 0 ? `Select at least one option for ${label.toLowerCase()}.` : undefined;
  }
  const str = typeof value === 'string' ? value.trim() : '';
  if (!str) {
    if (!field.required) return undefined;
    return field.type === 'select' ? `Please choose ${label.toLowerCase()}.` : `${label} is required.`;
  }
  if (field.type === 'email' && !EMAIL_RE.test(str)) {
    return 'Enter a valid email address, for example name@company.com.';
  }
  if (field.type === 'tel') {
    const digits = str.replace(/\D/g, '');
    if (!PHONE_CHARS_RE.test(str)) return 'Phone numbers may contain digits, spaces, +, ( ) and - only.';
    if (digits.length < 7 || digits.length > 15) return 'Enter a phone number with 7 to 15 digits, including country code.';
  }
  if (field.type === 'url' && !URL_RE.test(str)) {
    return 'Enter a full web address starting with https://';
  }
  if (field.type === 'textarea' && field.required && str.length < 10) {
    return 'Please add a little more detail (at least 10 characters).';
  }
  return undefined;
}

export function validateAll(fields: FieldDef[], values: FormValues): FormErrors {
  const errors: FormErrors = {};
  for (const f of fields) {
    const e = validateField(f, values[f.name]);
    if (e) errors[f.name] = e;
  }
  return errors;
}
