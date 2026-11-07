import { useEffect, useState } from 'react';
import Logo from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-white/10 bg-night-900/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" aria-label="Main">
        <Logo tone="light" />
        <div className="flex items-center gap-2 sm:gap-6">
          <a
            href="#spots"
            className="hidden text-sm font-semibold text-ink-300 transition-colors hover:text-white sm:block"
          >
            The 1,000
          </a>
          <ButtonLink href="#join" className="px-5 py-2.5 sm:px-6">
            Claim your spot
          </ButtonLink>
        </div>
      </nav>
    </header>
  );
}
