import { useInView } from '@/hooks/useInView';
import { PHOTOS, photoUrl, type LandingPhoto } from '@/lib/photos';

interface Moment {
  photo: LandingPhoto;
  caption: string;
  className: string;
}

const MOMENTS: Moment[] = [
  {
    photo: PHOTOS.cafeCoffee,
    caption: 'Meet Someone New.',
    className: 'sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto',
  },
  {
    photo: PHOTOS.laughingCouple,
    caption: 'Make Your Move.',
    className: 'aspect-[4/5]',
  },
  {
    photo: PHOTOS.cityWalk,
    caption: 'Find Your Chemistry.',
    className: 'aspect-[4/5]',
  },
  {
    photo: PHOTOS.candidMoment,
    caption: 'See Where It Goes.',
    className: 'sm:col-span-2 aspect-[16/9]',
  },
];

function MomentTile({ moment, index }: { moment: Moment; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <figure
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`group relative overflow-hidden rounded-[1.75rem] bg-primary-900 transition-all duration-700 ${moment.className} ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <img
        src={photoUrl(moment.photo, 1000)}
        alt={moment.photo.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/85 via-primary-900/20 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <p className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">{moment.caption}</p>
        <p className="mt-2 text-xs font-medium text-white/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          Photo by {moment.photo.photographer} on Pexels
        </p>
      </figcaption>
    </figure>
  );
}

export default function ExperienceSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-accent-600">The TWO FOLD experience</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-[1.1] text-primary-700 sm:text-5xl">
              GOOD VIBES. REAL CHEMISTRY.
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-ink-600">
            Coffee dates, playful laughs and evenings that lead somewhere new. This is the mood we are building for.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-4 sm:gap-6">
          {MOMENTS.map((moment, index) => (
            <MomentTile key={moment.caption} moment={moment} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
