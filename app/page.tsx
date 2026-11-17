import Navbar from "@/components/Navbar";
import MotionProvider from "@/components/motion/MotionProvider";
import ScrollTools from "@/components/ui/ScrollTools";
import Hero from "@/components/sections/Hero";
import ExecutiveProfile from "@/components/sections/ExecutiveProfile";
import CoreCompetencies from "@/components/sections/CoreCompetencies";
import PortfolioShowcase from "@/components/sections/PortfolioShowcase";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <MotionProvider>
      <Navbar />
      <ScrollTools />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Hero />
        <ExecutiveProfile />
        <PortfolioShowcase />
        <CoreCompetencies />
        <Skills />
        <Contact />
      </main>
    </MotionProvider>
  );
}
