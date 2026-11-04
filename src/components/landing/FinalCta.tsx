import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { PHOTOS, photoUrl } from '@/lib/photos';

export default function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden py-28 sm:py-36">
      <img
        src={photoUrl(PHOTOS.ctaCouple, 1800)}
        alt={PHOTOS.ctaCouple.alt}
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-900/95 via-primary-700/85 to-accent-800/70" />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-secondary-300">One move is enough</p>
        <h2 className="mt-5 text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
          SOMEONE NEW.
          <span className="block text-secondary-200">SOMEWHERE OUT THERE.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-100 sm:text-xl">
          Your next conversation, your next date, your next possibility. It all starts with one move.
        </p>
        <div className="mt-10">
          <ButtonLink href="#join" className="group bg-white px-9 py-4 text-primary-700 shadow-soft hover:bg-secondary-100 hover:text-primary-800">
            Join TWO FOLD
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm font-semibold text-primary-100">Made for adults 18+.</p>
      </div>
    </section>
  );
}
