import type { LucideIcon } from 'lucide-react';
import { Compass, Fingerprint, Handshake, ShieldCheck } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: FeatureCard[] = [
  {
    icon: Handshake,
    title: 'REAL CONNECTIONS',
    description: 'Meet adults who are genuinely interested in discovering new connections.',
  },
  {
    icon: Compass,
    title: 'YOUR KIND OF PEOPLE',
    description: 'Explore people based on interests, lifestyle and relationship preferences.',
  },
  {
    icon: Fingerprint,
    title: 'MORE THAN A PROFILE',
    description: 'Go beyond profile pictures and discover shared interests and personality.',
  },
  {
    icon: ShieldCheck,
    title: 'YOUR PRIVACY MATTERS',
    description: 'A privacy-conscious dating experience with clear controls and respectful interactions.',
  },
];

function FeatureTile({ feature, index }: { feature: FeatureCard; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`group relative overflow-hidden rounded-[1.75rem] border border-primary-100 bg-white p-8 shadow-card transition-all duration-700 hover:-translate-y-2 hover:border-accent-200 hover:shadow-soft ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-50 transition-transform duration-500 group-hover:scale-150" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-primary-700 text-white shadow-glow transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
        <Icon className="h-7 w-7" strokeWidth={2} />
      </span>
      <h3 className="relative mt-6 text-lg font-extrabold tracking-wide text-primary-700">{feature.title}</h3>
      <p className="relative mt-3 text-base leading-relaxed text-ink-600">{feature.description}</p>
    </div>
  );
}

export default function WhyTwoFold() {
  return (
    <section id="why-two-fold" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-accent-600">Why TWO FOLD</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-[1.1] text-primary-700 sm:text-5xl">
            NOT JUST ANOTHER WAY TO MEET PEOPLE.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <FeatureTile key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
