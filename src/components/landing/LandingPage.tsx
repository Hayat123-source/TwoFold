import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/landing/Hero';
import ChallengeStrip from '@/components/landing/ChallengeStrip';
import JoinSection from '@/components/landing/JoinSection';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ChallengeStrip />
        <JoinSection />
      </main>
      <Footer />
    </>
  );
}
