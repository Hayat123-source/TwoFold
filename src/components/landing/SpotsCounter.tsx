import { CAP_PER_GENDER, type Spots } from '@/hooks/useSpots';

interface RowProps {
  label: string;
  taken: number | null;
}

function Row({ label, taken }: RowProps) {
  const known = taken !== null;
  const left = known ? Math.max(CAP_PER_GENDER - taken, 0) : null;
  const pct = known ? Math.min((taken / CAP_PER_GENDER) * 100, 100) : 0;

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-ink-300">{label}</p>
        <p className="text-sm font-semibold text-ink-300">
          <span className="text-2xl font-extrabold text-white">{left ?? '—'}</span> spots left
        </p>
      </div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-600 to-accent-300 transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-ink-500">
        {known ? `${taken} of ${CAP_PER_GENDER} joined` : `${CAP_PER_GENDER} spots in total`}
      </p>
    </div>
  );
}

export default function SpotsCounter({ spots }: { spots: Spots | null }) {
  return (
    <div className="space-y-7 rounded-3xl border border-white/10 bg-night-700/60 p-7">
      <Row label="Men" taken={spots ? spots.male : null} />
      <Row label="Women" taken={spots ? spots.female : null} />
    </div>
  );
}
