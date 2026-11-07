import { PHOTOS, photoUrl, type LandingPhoto } from '@/lib/photos';

const BELT_ONE: LandingPhoto[] = [
  PHOTOS.heroCouple,
  PHOTOS.audienceAdult,
  PHOTOS.cityWalk,
  PHOTOS.galleryPortrait,
  PHOTOS.candidMoment,
  PHOTOS.audienceProfessional,
  PHOTOS.cafeCoffee,
  PHOTOS.galleryToast,
];

const BELT_TWO: LandingPhoto[] = [
  PHOTOS.laughingCouple,
  PHOTOS.galleryNightlife,
  PHOTOS.introCouple,
  PHOTOS.audienceConnections,
  PHOTOS.gallerySkate,
  PHOTOS.galleryPool,
  PHOTOS.audienceExplorer,
  PHOTOS.ctaCouple,
];

interface BeltProps {
  photos: LandingPhoto[];
  direction: 'left' | 'right';
  height: string;
  width: string;
}

function Belt({ photos, direction, height, width }: BeltProps) {
  const animation = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';
  // The list is rendered twice so the -50% loop is seamless.
  const loop = [...photos, ...photos];

  return (
    <div className="group overflow-hidden">
      <div className={`flex w-max ${animation} group-hover:[animation-play-state:paused]`}>
        {loop.map((photo, index) => (
          <figure
            key={`${photo.id}-${index}`}
            aria-hidden={index >= photos.length}
            className={`relative mr-4 shrink-0 overflow-hidden rounded-2xl ${height} ${width}`}
          >
            <img
              src={photoUrl(photo, 600)}
              alt={index < photos.length ? photo.alt : ''}
              loading={index < 4 ? 'eager' : 'lazy'}
              draggable={false}
              className="h-full w-full object-cover brightness-[0.8] contrast-110 saturate-[0.85] transition duration-700 hover:brightness-100 hover:saturate-100"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night-900/70 via-transparent to-night-900/20" />
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function PhotoBelts() {
  return (
    <div className="relative space-y-4">
      <Belt photos={BELT_ONE} direction="left" height="h-52 sm:h-64 lg:h-72" width="w-40 sm:w-52 lg:w-60" />
      <Belt photos={BELT_TWO} direction="right" height="h-52 sm:h-64 lg:h-72" width="w-44 sm:w-56 lg:w-64" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-night-900 to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-night-900 to-transparent sm:w-40" />
    </div>
  );
}
