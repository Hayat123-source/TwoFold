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
  'w-full rounded-2xl border bg-night-700 px-4 py-3.5 text-base text-white placeholder:text-ink-500 [color-scheme:dark] transition duration-300 focus:outline-none focus:ring-4';

function inputClass(hasError: boolean) {
  return `${INPUT_CLASS} ${
    hasError
      ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20'
      : 'border-white/10 hover:border-white/25 focus:border-accent-500 focus:ring-accent-500/20'
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
      <label htmlFor={id} className="mb-2 block text-sm font-bold text-ink-200">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm font-semibold text-accent-300">
          {error}
        </p>
      )}
    </div>
  );
}

interface SignupFormProps {
  onJoined?: () => void;
}

export default function SignupForm({ onJoined }: SignupFormProps) {
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
      gender: values.gender,
      email: values.email.trim().toLowerCase(),
      phone: values.phone.trim(),
      date_of_birth: values.dateOfBirth,
      city: values.city.trim(),
      age_confirmed: values.ageConfirmed,
    });

    if (error) {
      setStatus('idle');
      if (error.code === UNIQUE_VIOLATION) {
        setServerError('This email address is already on the list. You are covered.');
      } else if (error.message?.includes('GENDER_FULL')) {
        setServerError('Sorry, all spots on your side are taken.');
      } else {
        setServerError('We could not save your details just now. Please check your connection and try again.');
      }
      return;
    }

    setSubmittedName(values.firstName.trim());
    setValues(EMPTY_SIGNUP);
    setStatus('success');
    onJoined?.();
  };

  if (status === 'success') {
    return (
      <div className="animate-pop-in py-6 text-center" role="status">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
          <CheckCircle2 className="h-10 w-10" strokeWidth={2.2} />
        </span>
        <h3 className="mt-6 text-3xl font-extrabold text-white">You are on the list, {submittedName}!</h3>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-300">
          Your spot is saved. We will contact you on your email and phone before TWO FOLD opens.
        </p>
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

      <div className="sm:col-span-2">
        <p className="mb-2 block text-sm font-bold text-ink-200">I am a</p>
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="I am a">
          {([
            { value: 'male', label: 'Man' },
            { value: 'female', label: 'Woman' },
          ] as const).map((option) => {
            const selected = values.gender === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => updateField('gender', option.value)}
                className={`rounded-2xl border px-4 py-3.5 text-base font-extrabold transition duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent-500/30 ${
                  selected
                    ? 'border-accent-500 bg-accent-500/15 text-white'
                    : errors.gender
                      ? 'border-error-500 bg-night-700 text-ink-300'
                      : 'border-white/10 bg-night-700 text-ink-300 hover:border-white/25'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        {errors.gender && (
          <p role="alert" className="mt-2 text-sm font-semibold text-accent-300">
            {errors.gender}
          </p>
        )}
      </div>

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
            errors.ageConfirmed ? 'border-error-500 bg-error-500/10' : 'border-white/10 bg-night-700 hover:border-white/25'
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
          <span className="text-sm font-semibold leading-relaxed text-ink-200">
            I confirm that I am 18 years or older.
          </span>
        </label>
        {errors.ageConfirmed && (
          <p id="ageConfirmed-error" role="alert" className="mt-2 text-sm font-semibold text-accent-300">
            {errors.ageConfirmed}
          </p>
        )}
      </div>

      {serverError && (
        <div role="alert" className="sm:col-span-2 rounded-2xl border border-error-500/40 bg-error-500/10 px-4 py-3 text-sm font-semibold text-accent-200">
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
            'Claim your spot'
          )}
        </Button>
        <p className="mt-4 text-xs leading-relaxed text-ink-400">
          We only collect what we need. Your details are never shown to other visitors.
        </p>
      </div>
    </form>
  );
}
