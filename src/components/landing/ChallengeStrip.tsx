const POINTS = [
  { big: 'Capped at 1,000', small: 'A small room means real attention, not a lost profile in a crowd.' },
  { big: '500 : 500', small: 'Equal men and women, so everyone has a fair shot.' },
  { big: 'Built for dates', small: 'No endless swiping. No paying to stay invisible.' },
];

export default function ChallengeStrip() {
  return (
    <section className="border-y border-white/10 bg-night-800 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-extrabold leading-tight text-white sm:text-5xl">
          Tired of paying, swiping and still no date?
          <span className="block text-accent-400">We built the opposite.</span>
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {POINTS.map((point) => (
            <div key={point.big} className="rounded-3xl border border-white/10 bg-night-700/60 p-7">
              <p className="text-2xl font-extrabold text-white">{point.big}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-300">{point.small}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
