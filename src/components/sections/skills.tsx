"use client";

import BlurFade from "@/components/magicui/blur-fade";
import Marquee from "@/components/magicui/marquee";
import { Database, Layout, Server, Smartphone } from "lucide-react";

const SKILLS = [
  "React.js",
  "Next.js",
  "TypeScript",
  "TailwindCSS",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Framer Motion",
  "GraphQL",
  "Zustand",
  "Firebase",
  "Redux",
];

export function SkillsSection() {
  return (
    <section id="skills" className="w-full max-w-2xl overflow-hidden">
      <BlurFade delay={0.5} inView>
        <div className="mb-8">
          <p className="eyebrow mb-2">Stack</p>
          <h2 className="font-display text-4xl italic">Skills</h2>
        </div>
        <div className="relative flex h-[100px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
          <Marquee pauseOnHover className="[--duration:20s]">
            {SKILLS.map((skill, i) => (
              <div
                key={skill}
                className="mx-4 flex items-center gap-2 rounded-xl border bg-card px-4 py-2 shadow-sm"
              >
                {/* Randomize icons for variety */}
                {i % 4 === 0 ? (
                  <Layout className="h-5 w-5" />
                ) : i % 4 === 1 ? (
                  <Server className="h-5 w-5" />
                ) : i % 4 === 2 ? (
                  <Database className="h-5 w-5" />
                ) : (
                  <Smartphone className="h-5 w-5" />
                )}
                <span className="font-semibold">{skill}</span>
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-background"></div>
        </div>
      </BlurFade>
    </section>
  );
}
