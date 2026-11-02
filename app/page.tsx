import Navbar from "@/components/Navbar";
import MotionProvider from "@/components/motion/MotionProvider";
import ScrollTools from "@/components/ui/ScrollTools";
import Hero from "@/components/sections/Hero";
import ExecutiveProfile from "@/components/sections/ExecutiveProfile";
import CoreCompetencies from "@/components/sections/CoreCompetencies";
import ProjectExperience from "@/components/sections/ProjectExperience";
import PortfolioShowcase from "@/components/sections/PortfolioShowcase";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <MotionProvider>
      <Navbar />
      <ScrollTools />
      <main className="flex-1">
        <Hero />
        <ExecutiveProfile />
        <CoreCompetencies />
        <ProjectExperience />
        <PortfolioShowcase />
        <Skills />
        <Education />
        <Contact />
      </main>
    </MotionProvider>
  );
}
