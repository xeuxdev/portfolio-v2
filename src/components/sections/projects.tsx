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
import { Github, Globe } from "lucide-react";
import Link from "next/link";
import React from "react";

const PROJECTS = [
  {
    title: "Meme Coin Swap",
    dates: "Jan 2025 - Feb 2025",
    description:
      "A custom crypto widget and interface for seamless token swaps, increasing wallet connection success by 70%. Built with Wagmi & Ethers.js.",
    tags: ["React", "Wagmi", "Web3"],
    links: {
      website: "#",
      source: "#",
    },
  },
  {
    title: "Fintech Admin Dashboard",
    dates: "Aug 2024 - Sep 2024",
    description:
      "Redesigned admin panel for managing users and credits. Improved operations speed by 40% with optimized data flow and RBAC.",
    tags: ["Next.js", "TypeScript", "RBAC"],
    links: {
      website: "#",
      source: "#",
    },
  },
  {
    title: "Telehealth Platform",
    dates: "June 2024 - Present",
    description:
      "High-performance patient-doctor interface with sub-2-second load times. Features real-time appointment syncing and scheduling.",
    tags: ["Next.js", "Radix UI", "Real-time"],
    links: {
      website: "#",
      source: "#",
    },
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
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="w-full max-w-4xl">
      <BlurFade delay={0.6} inView>
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
          Featured Work
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Card
              key={i}
              className="group flex flex-col overflow-hidden border-neutral-200 dark:border-neutral-800 transition-all hover:shadow-lg hover:-translate-y-1 h-full"
            >
              <div className="h-40 w-full bg-neutral-100 dark:bg-neutral-900 group-hover:scale-105 transition-transform duration-300" />
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  {project.title}
                </CardTitle>
                <div className="text-xs text-muted-foreground">
                  {project.dates}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 grow">
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 pt-0">
                <Link
                  href={project.links.website}
                  target="_blank"
                  className="flex-1"
                >
                  <Button size="sm" className="w-full gap-2 text-xs">
                    <Globe className="h-4 w-4" /> Website
                  </Button>
                </Link>
                <Link
                  href={project.links.source}
                  target="_blank"
                  className="flex-1"
                >
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full gap-2 text-xs"
                  >
                    <Github className="h-4 w-4" /> Source
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </BlurFade>
    </section>
  );
}
