import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import PerformanceCounter from '../components/PerformanceCounter';
import SolutionShowcase from '../components/SolutionShowcase';
import CaseStudiesSection from '../components/CaseStudiesSection';
import DailyThreatSection from '../components/DailyThreatSection';
import CEOMessage from '../components/CEOMessage';
import AdvisorySection from '../components/AdvisorySection';
import CertificationsSection from '../components/CertificationsSection';
import { ClientLogoSlider } from '../components/ExtraSections';
import SelfDiagnosisCTA from '../components/SelfDiagnosisCTA';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Avoid selector query crash if location.hash is invalid
      try {
        const element = document.querySelector(location.hash);
        if (element) {
          setTimeout(() => {
            const navbarOffset = 80; // approximate sticky navbar height
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - navbarOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }, 150);
        }
      } catch (err) {
        console.error("Hash scroll query error:", err);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.hash, location.key]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors">
      <SEO />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PerformanceCounter />
        <SolutionShowcase />
        <CaseStudiesSection />
        <DailyThreatSection />
        <CEOMessage />
        <AdvisorySection />
        <CertificationsSection />
        <ClientLogoSlider />
        <SelfDiagnosisCTA />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
