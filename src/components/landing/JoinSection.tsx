import { useState } from 'react';
import SignupForm from '@/components/landing/SignupForm';
import SpotsCounter from '@/components/landing/SpotsCounter';
import { useSpots } from '@/hooks/useSpots';

export default function JoinSection() {
  const [refreshKey, setRefreshKey] = useState(0);
  const spots = useSpots(refreshKey);

  return (
    <section id="spots" className="relative bg-night-900 py-20 sm:py-28">
      <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-primary-500/20 blur-[120px]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-accent-400">Live count</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl">
            When it is full, it is full.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-300">
            Once 500 men or 500 women have joined, that side closes. No exceptions.
          </p>
          <div className="mt-8">
            <SpotsCounter spots={spots} />
          </div>
        </div>

        <div id="join" className="scroll-mt-24 lg:col-span-7">
          <div className="rounded-[2rem] border border-white/10 bg-night-800 p-6 shadow-glow sm:p-10">
            <SignupForm onJoined={() => setRefreshKey((k) => k + 1)} />
          </div>
        </div>
      </div>
    </section>
  );
}
