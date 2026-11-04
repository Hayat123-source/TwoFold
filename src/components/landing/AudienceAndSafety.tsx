import { BadgeCheck, Ban, EyeOff, HeartHandshake, Lock, MessageSquareHeart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { PHOTOS, photoUrl, type LandingPhoto } from '@/lib/photos';

interface Audience {
  title: string;
  description: string;
  photo: LandingPhoto;
}

const AUDIENCES: Audience[] = [
  {
    title: 'Young Working Professionals',
    description: 'Busy schedules and a real wish to meet someone worth your time.',
    photo: PHOTOS.audienceProfessional,
  },
  {
    title: 'Young Adults',
    description: 'Curious, social and ready to meet people who share your energy.',
    photo: PHOTOS.audienceAdult,
  },
  {
    title: 'People Exploring Dating',
    description: 'Taking your time, figuring out what you want and enjoying the journey.',
    photo: PHOTOS.audienceExplorer,
  },
  {
    title: 'People Looking for New Connections',
    description: 'Open to meeting new people, new conversations and where the chemistry leads.',
    photo: PHOTOS.audienceConnections,
  },
];

function AudienceCard({ audience, index }: { audience: Audience; index: number }) {
  const { ref, inView } = useInView<HTMLElement>(0.15);

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${index * 110}ms` }}
      className={`group flex flex-col overflow-hidden rounded-[1.75rem] border border-primary-100 bg-white shadow-card transition-all duration-700 hover:-translate-y-2 hover:shadow-soft ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={photoUrl(audience.photo, 700)}
          alt={audience.photo.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1000ms] group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-extrabold leading-snug text-primary-700">{audience.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">{audience.description}</p>
      </div>
    </article>
  );
}

export function AudienceSection() {
  return (
    <section className="bg-secondary-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-accent-600">Who it is for</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-[1.1] text-primary-700 sm:text-5xl">
            WHO IS TWO FOLD FOR?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-600">
            An inclusive, welcoming space for adults who are ready to meet new people, whatever stage they are at.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((audience, index) => (
            <AudienceCard key={audience.title} audience={audience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface SafetyPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

const SAFETY_POINTS: SafetyPoint[] = [
  {
    icon: BadgeCheck,
    title: 'Adults-only platform',
    description: 'TWO FOLD is strictly for adults aged 18 and over.',
  },
  {
    icon: EyeOff,
    title: 'Privacy-conscious settings',
    description: 'Planned profile controls that help you decide what others can see.',
  },
  {
    icon: HeartHandshake,
    title: 'Consent-based interactions',
    description: 'Connections are designed to be mutual and respectful from the first message.',
  },
  {
    icon: Ban,
    title: 'Reporting and blocking',
    description: 'Simple tools to report concerns and block anyone you no longer want to hear from.',
  },
  {
    icon: MessageSquareHeart,
    title: 'Respectful communication',
    description: 'Clear community guidelines that keep conversations kind and welcoming.',
  },
  {
    icon: Lock,
    title: 'Secure personal information',
    description: 'Your details are handled with care and never shared with other visitors.',
  },
];

export function SafetySection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section id="safety" className="scroll-mt-24 relative overflow-hidden bg-primary-700 py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-accent-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div ref={ref} className={`lg:col-span-5 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-secondary-300">Privacy and safety</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-[1.1] sm:text-5xl">YOUR COMFORT COMES FIRST.</h2>
            <p className="mt-6 text-lg leading-relaxed text-primary-100">
              We are building TWO FOLD around respect, privacy and consent. Safety and moderation systems will be in
              place before member access opens.
            </p>
            <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-5 text-sm leading-relaxed text-primary-100">
              Identity verification will be introduced before launch. Until then, no profile is marked as verified.
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {SAFETY_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <li
                  key={point.title}
                  className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-accent-400/50 hover:bg-white/10"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500 text-white transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-base font-extrabold">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary-100">{point.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
