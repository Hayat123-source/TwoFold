import { useInView } from '@/hooks/useInView';
import { PHOTOS, photoUrl, type LandingPhoto } from '@/lib/photos';

interface GalleryItem {
  photo: LandingPhoto;
  label: string;
  className: string;
}

const GALLERY: GalleryItem[] = [
  { photo: PHOTOS.galleryNightlife, label: 'Nights out', className: 'md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto' },
  { photo: PHOTOS.galleryPub, label: 'Good company', className: 'aspect-[4/5]' },
  { photo: PHOTOS.gallerySkate, label: 'Side by side', className: 'aspect-[4/5]' },
  { photo: PHOTOS.galleryToast, label: 'Cheers to new people', className: 'aspect-[4/5]' },
  { photo: PHOTOS.galleryPortrait, label: 'Your best self', className: 'aspect-[4/5]' },
  { photo: PHOTOS.galleryPool, label: 'Sunset and spritz', className: 'md:col-span-2 aspect-[16/10]' },
];

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const { ref, inView } = useInView<HTMLElement>(0.1);

  return (
    <figure
      ref={ref}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
      className={`group relative overflow-hidden rounded-[1.5rem] bg-ink-100 transition-all duration-700 ${item.className} ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <img
        src={photoUrl(item.photo, 900)}
        alt={item.photo.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
      />
      <figcaption className="absolute inset-x-4 bottom-4 flex translate-y-2 items-end justify-between gap-3 rounded-2xl bg-white/95 p-4 opacity-0 shadow-card transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:opacity-100">
        <span>
          <span className="block text-sm font-extrabold text-primary-700">{item.label}</span>
          <span className="block text-xs text-ink-500">Photo by {item.photo.photographer} on Pexels</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function PhotoGallery() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-accent-600">Photo gallery</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-[1.1] text-primary-700 sm:text-5xl">
            SOCIAL. SPONTANEOUS. SOMETHING NEW.
          </h2>
        </div>
        <div className="mt-14 grid auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {GALLERY.map((item, index) => (
            <GalleryCard key={item.photo.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
