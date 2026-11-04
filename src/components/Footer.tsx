import { Facebook, Instagram, Youtube } from 'lucide-react';
import Logo from '@/components/ui/Logo';

const EXPLORE_LINKS = [
  { label: 'About Us', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Safety', href: '#safety' },
  { label: 'Contact', href: '#faq' },
];

const LEGAL_LINKS = ['Privacy Policy', 'Terms and Conditions', 'Community Guidelines'];

const SOCIAL_LINKS = [
  { label: 'Instagram', icon: Instagram },
  { label: 'Facebook', icon: Facebook },
  { label: 'YouTube', icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-primary-100">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-200">
            Less swiping. More chemistry. A modern place for adults to meet interesting people and see where the
            chemistry goes.
          </p>
          <p className="mt-6 inline-flex rounded-full border border-accent-400/40 bg-accent-500/10 px-4 py-2 text-sm font-extrabold text-accent-200">
            Dating is for adults 18+.
          </p>
        </div>

        <nav aria-label="Explore" className="lg:col-span-2 lg:col-start-6">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">Explore</h3>
          <ul className="mt-5 space-y-3">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-primary-200 transition-colors duration-300 hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">Legal</h3>
          <ul className="mt-5 space-y-3">
            {LEGAL_LINKS.map((label) => (
              <li key={label}>
                <span className="flex items-center gap-2 text-sm text-primary-200">
                  {label}
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-100">
                    Coming soon
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">Follow TWO FOLD</h3>
          <div className="mt-5 flex gap-3">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <span
                  key={social.label}
                  aria-label={`${social.label} (coming soon)`}
                  title={`${social.label} coming soon`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-primary-200"
                >
                  <Icon className="h-5 w-5" />
                </span>
              );
            })}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-primary-300">
            Photographs provided by photographers on Pexels, used under the Pexels licence.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-primary-300 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} TWO FOLD. All rights reserved.</p>
          <p>Dating is for adults 18+ only.</p>
        </div>
      </div>
    </footer>
  );
}
