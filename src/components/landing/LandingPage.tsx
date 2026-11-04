import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/landing/Hero';
import EarlyAccessSection from '@/components/landing/EarlyAccessSection';
import IntroSection from '@/components/landing/IntroSection';
import WhyTwoFold from '@/components/landing/WhyTwoFold';
import HowItWorks from '@/components/landing/HowItWorks';
import ExperienceSection from '@/components/landing/ExperienceSection';
import { AudienceSection, SafetySection } from '@/components/landing/AudienceAndSafety';
import PhotoGallery from '@/components/landing/PhotoGallery';
import FaqSection from '@/components/landing/FaqSection';
import FinalCta from '@/components/landing/FinalCta';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <EarlyAccessSection />
        <IntroSection />
        <WhyTwoFold />
        <HowItWorks />
        <ExperienceSection />
        <SafetySection />
        <AudienceSection />
        <PhotoGallery />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
