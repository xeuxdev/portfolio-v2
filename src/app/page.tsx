import { FloatingDock } from "@/components/layout/floating-dock";
import { ContactSection } from "@/components/sections/contact";
import { EducationSection } from "@/components/sections/education";
import { HeroSection } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { WorkSection } from "@/components/sections/work";

export default function Portfolio() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Xeuxdev",
    alternateName: "Tochukwu John",
    url: "https://xeuxdev.com",
    image: "https://xeuxdev.com/me.jpg",
    sameAs: [
      "https://github.com/xeuxdev",
      "https://twitter.com/xeuxdev",
      "https://linkedin.com/in/xeuxdev", // Placeholder, assume user has these or will add
    ],
    jobTitle: "Frontend Developer",
    worksFor: {
      "@type": "Organization",
      name: "Xeuxdev",
    },
    description:
      "Frontend Developer with 4+ years of experience specializing in AI, Fintech, and Web3.",
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-blue-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
