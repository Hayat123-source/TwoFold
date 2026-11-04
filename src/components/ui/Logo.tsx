import { Heart } from 'lucide-react';

interface LogoProps {
  tone?: 'light' | 'dark';
  className?: string;
}

export default function Logo({ tone = 'dark', className = '' }: LogoProps) {
  const textClass = tone === 'light' ? 'text-white' : 'text-primary-700';
  return (
    <a href="#home" aria-label="TWO FOLD home" className={`group inline-flex items-center gap-2 ${className}`}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-primary-700 shadow-glow transition-transform duration-500 group-hover:rotate-12">
        <Heart className="h-4 w-4 fill-white text-white" strokeWidth={2.5} />
      </span>
      <span className={`text-lg font-extrabold tracking-[0.18em] ${textClass}`}>TWO FOLD</span>
    </a>
  );
}
