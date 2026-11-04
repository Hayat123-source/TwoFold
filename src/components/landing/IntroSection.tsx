import { Heart, Users } from 'lucide-react';
import { PHOTOS, photoUrl } from '@/lib/photos';
import { useInView } from '@/hooks/useInView';

export default function IntroSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const reveal = `transition-all duration-700 ease-out ${inView ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'}`;

  return (
    <section className="relative overflow-hidden bg-secondary-100 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div ref={ref} className={reveal}>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-accent-600">The TWO FOLD idea</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-[1.1] text-primary-700 sm:text-5xl">
            DATING SHOULD FEEL EXCITING AGAIN.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-600">
            Forget the pressure. Forget the endless awkward introductions. TWO FOLD is being designed to make meeting
            new people more enjoyable, natural and meaningful.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 shadow-card transition duration-500 hover:-translate-y-1">
              <Heart className="h-6 w-6 text-accent-600" />
              <p className="mt-3 text-base font-extrabold text-primary-700">Natural conversations</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">Real chemistry comes from real conversation.</p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-card transition duration-500 hover:-translate-y-1">
              <Users className="h-6 w-6 text-accent-600" />
              <p className="mt-3 text-base font-extrabold text-primary-700">Relaxed, low-pressure</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">Meet people at a pace that feels comfortable.</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-4 -top-4 h-full w-full rounded-[2rem] bg-accent-200/60" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft">
            <img
              src={photoUrl(PHOTOS.introCouple, 1000)}
              alt={PHOTOS.introCouple.alt}
              width={1000}
              height={1250}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
            />
          </div>
          <p className="mt-4 text-right text-xs text-ink-500">
            Photo by {PHOTOS.introCouple.photographer} on Pexels
          </p>
        </div>
      </div>
    </section>
  );
}
