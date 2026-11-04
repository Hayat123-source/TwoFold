import { ArrowRight, Heart, MessageCircle, Sparkles } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { PHOTOS, photoUrl } from '@/lib/photos';

const FLOATING_HEARTS = [
  { left: '8%', delay: '0s', size: 'h-5 w-5' },
  { left: '30%', delay: '1.8s', size: 'h-4 w-4' },
  { left: '62%', delay: '3.4s', size: 'h-6 w-6' },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-secondary-100 via-white to-primary-50 pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-40"
    >
      <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-accent-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-primary-200/60 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p className="animate-pop-in inline-flex items-center gap-2 rounded-full border border-accent-100 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-accent-600 shadow-card">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Your dating life, reimagined.
          </p>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-primary-700 sm:text-6xl lg:text-7xl">
            LESS SWIPING.
            <span className="block bg-gradient-to-r from-accent-600 to-accent-400 bg-clip-text text-transparent">
              MORE CHEMISTRY.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600 sm:text-xl">
            Meet interesting people, discover new connections and make dating exciting again. Your next great
            conversation could start right here.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href="#join" className="group px-8 py-4">
              Start Meeting People
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="#how-it-works" variant="secondary" className="px-8 py-4">
              Explore TWO FOLD
            </ButtonLink>
          </div>

          <p className="mt-6 text-sm font-semibold text-ink-500">Made for adults 18+.</p>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-primary-100 pt-8">
            {[
              { label: 'Adults only', value: '18+' },
              { label: 'Privacy first', value: 'Opt-in' },
              { label: 'Launching', value: 'Soon' },
            ].map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink-500">{item.label}</dt>
                <dd className="mt-1 text-xl font-extrabold text-primary-700">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative lg:col-span-6">
          <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-accent-400/30 via-accent-200/10 to-primary-400/30 blur-2xl" />

          <div className="relative mx-auto max-w-lg">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] shadow-soft">
              <img
                src={photoUrl(PHOTOS.heroCouple, 1200)}
                alt={PHOTOS.heroCouple.alt}
                width={1200}
                height={1500}
                fetchPriority="high"
                className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-transparent" />
            </div>

            {FLOATING_HEARTS.map((heart) => (
              <Heart
                key={heart.left}
                aria-hidden="true"
                className={`pointer-events-none absolute bottom-10 animate-rise-heart fill-accent-400 text-accent-400 ${heart.size}`}
                style={{ left: heart.left, animationDelay: heart.delay }}
              />
            ))}

            <div className="animate-float absolute -left-4 top-10 hidden rounded-2xl bg-white p-4 shadow-soft sm:block lg:-left-10">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                  <Heart className="h-5 w-5 fill-accent-500 text-accent-500" />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-primary-700">New connection!</p>
                  <p className="text-xs text-ink-500">Chemistry is building</p>
                </div>
              </div>
            </div>

            <div className="animate-float-slow absolute -right-2 top-1/2 hidden max-w-[220px] rounded-2xl bg-primary-700 p-4 text-white shadow-soft sm:block lg:-right-8">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <p className="text-sm font-semibold leading-snug">Someone caught your attention.</p>
              </div>
            </div>

            <div className="animate-float absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full bg-white px-5 py-3 shadow-soft sm:block" style={{ animationDelay: '2s' }}>
              <p className="whitespace-nowrap text-sm font-bold text-accent-600">Good chemistry starts here.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
