import { FloatingDock } from "@/components/layout/floating-dock";
import { ContactSection } from "@/components/sections/contact";
import { EducationSection } from "@/components/sections/education";
import { HeroSection } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { WorkSection } from "@/components/sections/work";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-blue-500/30">
      <main className="flex flex-col items-center justify-center space-y-24 pt-24 pb-24 px-6 md:px-0">
        <HeroSection />
        <WorkSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <FloatingDock />
    </div>
  );
}
