import { Rocket, Sliders, Search, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
  availability: string;
}

const STEPS: Step[] = [
  {
    icon: Rocket,
    title: 'JOIN TWO FOLD',
    description: 'Register and create your early-access profile.',
    availability: 'Open now',
  },
  {
    icon: Sliders,
    title: 'TELL US ABOUT YOURSELF',
    description: 'Share your interests, preferences and what kind of connection you are looking for.',
    availability: 'Coming with launch',
  },
  {
    icon: Search,
    title: 'DISCOVER NEW PEOPLE',
    description: 'Explore potential connections based on your preferences when the platform launches.',
    availability: 'Coming with launch',
  },
  {
    icon: MessageCircle,
    title: 'MAKE YOUR MOVE',
    description: 'Start conversations and discover where the chemistry takes you.',
    availability: 'Coming with launch',
  },
];

function StepCard({ step, index }: { step: Step; index: number }) {
  const { ref, inView } = useInView<HTMLLIElement>(0.2);
  const Icon = step.icon;

  return (
    <li
      ref={ref}
      style={{ transitionDelay: `${index * 120}ms` }}
      className={`relative flex flex-col rounded-[1.75rem] bg-white p-7 shadow-card transition-all duration-700 hover:-translate-y-2 hover:shadow-soft ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-700 text-white transition-colors duration-500 group-hover:bg-accent-600">
          <Icon className="h-6 w-6" />
        </span>
        <span className="text-5xl font-extrabold text-primary-100" aria-hidden="true">
          0{index + 1}
        </span>
      </div>
      <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-accent-600">Step {index + 1}</p>
      <h3 className="mt-2 text-xl font-extrabold leading-tight text-primary-700">{step.title}</h3>
      <p className="mt-3 flex-1 text-base leading-relaxed text-ink-600">{step.description}</p>
      <span
        className={`mt-6 inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ${
          index === 0 ? 'bg-success-50 text-success-700' : 'bg-warning-50 text-warning-700'
        }`}
      >
        {step.availability}
      </span>
    </li>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-secondary-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-accent-600">How it works</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-[1.1] text-primary-700 sm:text-5xl">
            FOUR STEPS. A WHOLE NEW POSSIBILITY.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-600">
            Matching and messaging will become available only once the platform is fully operational. Until then,
            joining the waitlist is the first step.
          </p>
        </div>

        <ol className="group relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <StepCard key={step.title} step={step} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}
