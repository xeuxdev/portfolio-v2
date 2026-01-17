"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe } from "lucide-react";
import Link from "next/link";
import { Icons } from "../ui/icons";

const PROJECTS = [
  {
    title: "Well of Science",
    dates: "2023 - Present",
    description:
      "A science education platform providing resources and interactive learning materials for students and educators.",
    tags: ["Education", "E-learning", "Science"],
    links: {
      website: "https://wellofscience.com/",
      source: "#",
    },
    video: "",
  },
  {
    title: "Little App",
    dates: "2023 - Present",
    description:
      "A fintech solution for families, offering debit cards and financial education tools for children with parental management.",
    tags: ["Fintech", "Mobile", "React Native"],
    links: {
      website: "https://trylittleapp.com/",
      source: "#",
    },
    video: "/videos/Trylittle-Demo.mp4",
  },
  {
    title: "Queen Mother's Universal Foundation",
    dates: "2022 - Present",
    description:
      "Official website for QMUF, an NGO dedicated to community development, youth education, and sustainable support initiatives.",
    tags: ["NGO", "Web Design", "Community"],
    links: {
      website: "https://qmuf.org/",
      source: "#",
    },
    video: "/videos/Qmuf User Demo.mp4",
  },
  {
    title: "QMUF Backend API",
    dates: "2024 - Present",
    description:
      "Robust REST API powering the QMUF platform. Handles user management, volunteer applications, events, grants, and content with role-based access control.",
    tags: ["NestJS", "Prisma", "PostgreSQL", "TypeScript"],
    links: {
      website: "https://qmuf.org/",
      source: "#",
    },
    video: "/videos/Qmuf Admin Demo.mp4",
  },
  {
    title: "Crypto Payment Gateway",
    dates: "Jan 2024 - Feb 2024",
    description:
      "Integrated crypto payment functionality into a fintech dashboard, enabling transactions for hundreds of users.",
    tags: ["React", "Crypto", "Payments"],
    links: {
      website: "#",
      source: "#",
    },
    video: "",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="w-full max-w-5xl px-4 md:px-0">
      <BlurFade delay={0.6} inView>
        <h2 className="mb-6 text-center text-2xl font-bold tracking-tight">
          Featured Work
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Card
              key={i}
              className="group flex flex-col overflow-hidden border-neutral-200 dark:border-neutral-800 transition-all hover:shadow-lg hover:-translate-y-1 h-full p-0 gap-3"
            >
              {project.video ? (
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="pointer-events-none h-48 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="h-48 w-full bg-linear-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 group-hover:scale-105 transition-transform duration-500 ease-out gap-y-2" />
              )}
              <CardHeader className="">
                <CardTitle className="text-md font-bold line-clamp-1">
                  {project.title}
                </CardTitle>
                <div className="text-[10px] text-muted-foreground">
                  {project.dates}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 grow">
                <p className="text-xs text-muted-foreground line-clamp-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="px-1.5 py-0 text-[10px]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 px-4 pb-4 pt-0 mt-auto">
                <Link
                  href={project.links.website}
                  target="_blank"
                  className="flex-1"
                >
                  <Button size="sm" className="w-full gap-2 h-7 text-xs">
                    <Globe className="h-3 w-3" /> Website
                  </Button>
                </Link>
                {project.links.source !== "#" && (
                  <Link
                    href={project.links.source}
                    target="_blank"
                    className="flex-1"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full gap-1.5 h-6 text-[10px]"
                    >
                      <Icons.github className="size-3" /> Source
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </BlurFade>
    </section>
  );
}
