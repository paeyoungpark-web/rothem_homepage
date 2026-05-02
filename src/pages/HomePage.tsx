import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import PerformanceCounter from '../components/PerformanceCounter';
import SolutionShowcase from '../components/SolutionShowcase';
import DailyThreatSection from '../components/DailyThreatSection';
import CEOMessage from '../components/CEOMessage';
import { ClientLogoSlider } from '../components/ExtraSections';
import SelfDiagnosisCTA from '../components/SelfDiagnosisCTA';
import ContactCTA from '../components/ContactCTA';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 transition-colors">
      <SEO />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <PerformanceCounter />
        <SolutionShowcase />
        <DailyThreatSection />
        <CEOMessage />
        <ClientLogoSlider />
        <SelfDiagnosisCTA />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
