import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'What is TWO FOLD?',
    answer:
      'TWO FOLD is a modern online dating platform for adults aged 18 and over. It is being designed to help people meet interesting new people and enjoy dating without unnecessary pressure. The platform is not yet open to members; you can join the early-access waitlist today.',
  },
  {
    question: 'Is TWO FOLD a matrimonial platform?',
    answer:
      'No. TWO FOLD is a dating platform. It is not a matrimonial website, a marriage matchmaking service or a professional networking platform.',
  },
  {
    question: 'Who can join TWO FOLD?',
    answer:
      'TWO FOLD is only for adults aged 18 and over. You will need to confirm your age when you sign up for the waitlist.',
  },
  {
    question: 'Is TWO FOLD only for serious relationships?',
    answer:
      'No. TWO FOLD is designed for people exploring dating at different stages. When the platform launches, you will be able to share the kind of connection you are looking for in your profile.',
  },
  {
    question: 'Can I join if I am new to online dating?',
    answer:
      'Yes. TWO FOLD is being designed to feel welcoming and low-pressure for first-time users. Detailed guidance will be shared as the platform approaches launch.',
  },
  {
    question: 'How will matching work?',
    answer:
      'Matching is not live yet. The plan is to suggest potential connections based on the preferences and interests you choose. The details are still being developed and will be shared before launch.',
  },
  {
    question: 'Will my profile be private?',
    answer:
      'Privacy-conscious profile settings are part of our plans, so you can control what others see. The exact controls will be confirmed before member access opens.',
  },
  {
    question: 'How will users be verified?',
    answer:
      'We will introduce appropriate verification and moderation systems before opening member access. No verification process is operational yet, so no profile is currently marked as verified.',
  },
  {
    question: 'When will the platform launch?',
    answer:
      'We have not announced a launch date yet. Joining the waitlist is the best way to register your interest while we prepare.',
  },
  {
    question: 'Is early access free?',
    answer:
      'Joining the waitlist is free and does not require any payment. Pricing for the platform has not been finalised and will be communicated before launch.',
  },
  {
    question: 'How can I contact TWO FOLD?',
    answer:
      'For now, the early-access form on this page is the way to register your interest. Dedicated contact details will be published before launch.',
  },
];

function FaqRow({ item, index, open, onToggle }: { item: FaqItem; index: number; open: boolean; onToggle: () => void }) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div
      className={`rounded-2xl border transition-all duration-500 ${
        open ? 'border-accent-200 bg-white shadow-card' : 'border-primary-100 bg-white hover:border-primary-200'
      }`}
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-accent-300 rounded-2xl"
        >
          <span className="text-base font-extrabold text-primary-700 sm:text-lg">{item.question}</span>
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
              open ? 'rotate-180 bg-accent-600 text-white' : 'bg-primary-50 text-primary-700'
            }`}
          >
            <ChevronDown className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-all duration-500 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-base leading-relaxed text-ink-600">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-secondary-100 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-accent-600">FAQ</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-[1.1] text-primary-700 sm:text-5xl">
            GOOD QUESTIONS. HONEST ANSWERS.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-600">
            TWO FOLD is still being prepared for launch, so we only share what is confirmed.
          </p>
        </div>
        <div className="space-y-3 lg:col-span-8">
          {FAQS.map((item, index) => (
            <FaqRow
              key={item.question}
              item={item}
              index={index}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
