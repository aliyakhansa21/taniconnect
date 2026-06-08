import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import HowItWorksSection from "./components/HowItWorksSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        {/* <CTASection /> */}
      </main>
      <Footer />
    </>
  );
}
