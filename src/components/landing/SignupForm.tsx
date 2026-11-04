import { useState, type FormEvent, type ReactNode } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import {
  EMPTY_SIGNUP,
  hasErrors,
  validateSignup,
  type SignupErrors,
  type SignupValues,
} from '@/lib/signupValidation';
import { Button } from '@/components/ui/Button';

type SubmitStatus = 'idle' | 'submitting' | 'success';

const UNIQUE_VIOLATION = '23505';

const INPUT_CLASS =
  'w-full rounded-2xl border bg-white px-4 py-3.5 text-base text-ink-900 placeholder:text-ink-400 transition duration-300 focus:outline-none focus:ring-4';

function inputClass(hasError: boolean) {
  return `${INPUT_CLASS} ${
    hasError
      ? 'border-error-500 focus:border-error-500 focus:ring-error-500/15'
      : 'border-ink-200 hover:border-primary-300 focus:border-accent-500 focus:ring-accent-500/15'
  }`;
}

function maxDateOfBirth(): string {
  const today = new Date();
  const year = today.getFullYear() - 18;
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

function Field({ id, label, error, children, className = '' }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-bold text-ink-800">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm font-semibold text-error-700">
          {error}
        </p>
      )}
    </div>
  );
}

export default function SignupForm() {
  const [values, setValues] = useState<SignupValues>(EMPTY_SIGNUP);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState('');

  const updateField = <K extends keyof SignupValues>(key: K, value: SignupValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const validationErrors = validateSignup(values);
    setErrors(validationErrors);
    setServerError(null);
    if (hasErrors(validationErrors)) return;

    setStatus('submitting');
    const { error } = await supabase.from('early_access_signups').insert({
      first_name: values.firstName.trim(),
      email: values.email.trim().toLowerCase(),
      phone: values.phone.trim(),
      date_of_birth: values.dateOfBirth,
      city: values.city.trim(),
      age_confirmed: values.ageConfirmed,
    });

    if (error) {
      setStatus('idle');
      setServerError(
        error.code === UNIQUE_VIOLATION
          ? 'This email address is already on the waitlist. We have you covered.'
          : 'We could not save your details just now. Please check your connection and try again.',
      );
      return;
    }

    setSubmittedName(values.firstName.trim());
    setValues(EMPTY_SIGNUP);
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="animate-pop-in py-6 text-center" role="status">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success-50 text-success-700">
          <CheckCircle2 className="h-10 w-10" strokeWidth={2.2} />
        </span>
        <h3 className="mt-6 text-3xl font-extrabold text-primary-700">You are on the list, {submittedName}!</h3>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-600">
          Thanks for taking the first step. TWO FOLD is preparing for launch, and your early-access details are
          saved. Matching and messaging will only open once the platform is fully operational.
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm font-medium text-ink-500">
          Joining the waitlist does not guarantee a match or immediate access to the platform.
        </p>
        <Button variant="secondary" className="mt-8" onClick={() => setStatus('idle')}>
          Add another sign up
        </Button>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field id="firstName" label="First name" error={errors.firstName} className="sm:col-span-1">
        <input
          id="firstName"
          name="firstName"
          autoComplete="given-name"
          value={values.firstName}
          onChange={(e) => updateField('firstName', e.target.value)}
          placeholder="Your first name"
          maxLength={60}
          aria-invalid={Boolean(errors.firstName)}
          aria-describedby={errors.firstName ? 'firstName-error' : undefined}
          className={inputClass(Boolean(errors.firstName))}
        />
      </Field>

      <Field id="city" label="City" error={errors.city} className="sm:col-span-1">
        <input
          id="city"
          name="city"
          autoComplete="address-level2"
          value={values.city}
          onChange={(e) => updateField('city', e.target.value)}
          placeholder="e.g. Mumbai"
          maxLength={100}
          aria-invalid={Boolean(errors.city)}
          aria-describedby={errors.city ? 'city-error' : undefined}
          className={inputClass(Boolean(errors.city))}
        />
      </Field>

      <Field id="email" label="Email address" error={errors.email} className="sm:col-span-2">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => updateField('email', e.target.value)}
          placeholder="you@example.com"
          maxLength={254}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={inputClass(Boolean(errors.email))}
        />
      </Field>

      <Field id="phone" label="Phone number" error={errors.phone} className="sm:col-span-1">
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          placeholder="+91 98765 43210"
          maxLength={20}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          className={inputClass(Boolean(errors.phone))}
        />
      </Field>

      <Field id="dateOfBirth" label="Date of birth" error={errors.dateOfBirth} className="sm:col-span-1">
        <input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          autoComplete="bday"
          max={maxDateOfBirth()}
          value={values.dateOfBirth}
          onChange={(e) => updateField('dateOfBirth', e.target.value)}
          aria-invalid={Boolean(errors.dateOfBirth)}
          aria-describedby={errors.dateOfBirth ? 'dateOfBirth-error' : undefined}
          className={inputClass(Boolean(errors.dateOfBirth))}
        />
      </Field>

      <div className="sm:col-span-2">
        <label
          htmlFor="ageConfirmed"
          className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition duration-300 ${
            errors.ageConfirmed ? 'border-error-500 bg-error-50' : 'border-primary-100 bg-secondary-100/60 hover:border-primary-300'
          }`}
        >
          <input
            id="ageConfirmed"
            name="ageConfirmed"
            type="checkbox"
            checked={values.ageConfirmed}
            onChange={(e) => updateField('ageConfirmed', e.target.checked)}
            aria-invalid={Boolean(errors.ageConfirmed)}
            aria-describedby={errors.ageConfirmed ? 'ageConfirmed-error' : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-accent-600"
          />
          <span className="text-sm font-semibold leading-relaxed text-ink-800">
            I confirm that I am 18 years or older.
          </span>
        </label>
        {errors.ageConfirmed && (
          <p id="ageConfirmed-error" role="alert" className="mt-2 text-sm font-semibold text-error-700">
            {errors.ageConfirmed}
          </p>
        )}
      </div>

      {serverError && (
        <div role="alert" className="sm:col-span-2 rounded-2xl border border-error-100 bg-error-50 px-4 py-3 text-sm font-semibold text-error-700">
          {serverError}
        </div>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" disabled={submitting} className="w-full px-8 py-4 sm:w-auto">
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Saving your spot
            </>
          ) : (
            'Join the waitlist'
          )}
        </Button>
        <p className="mt-4 text-xs leading-relaxed text-ink-500">
          We only collect what we need for early access. Joining the waitlist does not guarantee a match or
          immediate access to the platform.
        </p>
      </div>
    </form>
  );
}
