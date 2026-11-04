import { Check, ShieldCheck } from 'lucide-react';
import SignupForm from '@/components/landing/SignupForm';
import { useInView } from '@/hooks/useInView';

export default function EarlyAccessSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  const reveal = `transition-all duration-700 ease-out ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`;

  return (
    <section id="join" className="relative scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div ref={ref} className={`lg:col-span-5 lg:pt-6 ${reveal}`}>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-accent-600">Early access</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-[1.1] text-primary-700 sm:text-5xl">
            READY TO MAKE YOUR MOVE?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-600">
            Take the first step towards meeting someone new. Join the early-access waitlist and be part of TWO FOLD
            from the start.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              'Only the details needed for early access',
              'Adults 18+ only, confirmed at sign up',
              'Your information is stored securely and never shown to other visitors',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-base font-semibold text-ink-800">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-primary-100 bg-primary-50 p-4 text-sm font-semibold text-primary-700">
            <ShieldCheck className="h-5 w-5 shrink-0 text-primary-600" />
            Registration does not guarantee a match or immediate platform access.
          </div>
        </div>

        <div className={`lg:col-span-7 ${reveal}`} style={{ transitionDelay: '150ms' }}>
          <div className="rounded-[2rem] border border-primary-100 bg-white p-6 shadow-soft sm:p-10">
            <SignupForm />
          </div>
        </div>
      </div>
    </section>
  );
}
