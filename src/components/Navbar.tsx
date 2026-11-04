import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why TWO FOLD', href: '#why-two-fold' },
  { label: 'Safety', href: '#safety' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'border-b border-primary-100 bg-white/95 shadow-card backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" aria-label="Main">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative rounded-full px-4 py-2 text-sm font-semibold text-ink-700 transition-colors duration-300 hover:text-accent-600 after:absolute after:bottom-1 after:left-4 after:right-4 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-accent-500 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#join"
            className="rounded-full px-5 py-2.5 text-sm font-bold text-primary-700 transition-colors duration-300 hover:bg-primary-50"
          >
            Login
          </a>
          <ButtonLink href="#join" className="px-6 py-2.5">
            Join Now
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="flex h-11 w-11 items-center justify-center rounded-full text-primary-700 transition-colors duration-300 hover:bg-primary-50 lg:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden bg-white transition-all duration-500 lg:hidden ${
          menuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-5 pb-8 pt-2 sm:px-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="rounded-2xl px-4 py-3.5 text-base font-semibold text-ink-900 transition-colors duration-300 hover:bg-secondary-100 hover:text-accent-600"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <a
              href="#join"
              onClick={closeMenu}
              className="rounded-full border border-primary-200 px-5 py-3 text-center text-sm font-bold text-primary-700 transition-colors hover:bg-primary-50"
            >
              Login
            </a>
            <ButtonLink href="#join" onClick={closeMenu} className="w-full">
              Join Now
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}
