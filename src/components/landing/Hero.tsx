import { ArrowDown } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import PhotoBelts from '@/components/landing/PhotoBelts';

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-night-900 pb-16 pt-28 sm:pt-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent-600/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-primary-500/25 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <p className="animate-pop-in text-xs font-extrabold uppercase tracking-[0.3em] text-accent-400">
          Invite-only · 18+
        </p>
        <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-8xl">
          ONLY 1,000.
          <span className="block bg-gradient-to-r from-accent-500 via-accent-300 to-accent-500 bg-clip-text text-transparent">
            500 MEN. 500 WOMEN.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-300 sm:text-xl">
          Equal numbers, so nobody is left waiting. Less swiping. More dates.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink href="#join" className="px-9 py-4">
            Claim your spot
          </ButtonLink>
          <a
            href="#spots"
            className="inline-flex items-center gap-2 text-sm font-bold text-ink-300 transition-colors hover:text-white"
          >
            See how many are left <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="relative mt-14">
        <PhotoBelts />
      </div>
      <p className="mt-4 text-center text-[11px] text-ink-500">Illustrative photos.</p>
    </section>
  );
}
