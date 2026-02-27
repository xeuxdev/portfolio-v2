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
import { ArrowUpRight, Globe, LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Icons } from "../ui/icons";

const PROJECTS = [
  {
    title: "Zero-Star Therapy",
    dates: "2026",
    description:
      "A satirical AI web application that flips the script on modern 'therapy-speak' by acting as a deadpan, brutally honest 'anti-therapist'.",
    tags: ["AI", "React 19", "Go", "Tailwind CSS"],
    links: {
      website: "https://zerostar.xeuxdev.com",
      source: "#",
    },
    image: "/projects/zerostar.webp",
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
    image: "/projects/qmuf.webp",
  },
  {
    title: "QMUF Backend API",
    dates: "2024 - Present",
    description:
      "Scalable backend architecture and administrative system powering the QMUF platform, designed for secure role-based access and efficient data management.",
    tags: ["NestJS", "Prisma", "PostgreSQL", "TypeScript"],
    links: {
      website: "https://qmuf.org/",
      source: "#",
    },
    image: "/projects/qmuf.webp",
  },
  {
    title: "Magmar Infra",
    dates: "2024 - Present",
    description:
      "An ERC-4337 toolkit for RWA and DePIN, enhancing gasless transactions, social logins, and multi-chain support for secure DeFi accessibility.",
    tags: ["ERC-4337", "DeFi", "RWA", "Account Abstraction"],
    links: {
      website: "https://www.magmarinfra.com/",
      source: "#",
    },
    image: "/projects/magmar-infra.webp",
  },
  {
    title: "Whisper",
    dates: "2024 - Present",
    description:
      "A decentralized wallet-to-wallet messaging platform featuring end-to-end encryption, in-chat crypto transfers, and AI-powered interaction tools.",
    tags: ["Web3", "Privacy", "Messaging", "Base"],
    links: {
      website: "https://www.cryptowhisper.live/",
      source: "#",
    },
    image: "/projects/crypto-whisper.webp",
  },
  {
    title: "Chat AI",
    dates: "2024 - Present",
    description:
      "An AI-powered trading companion that simplifies blockchain interactions through natural language commands for swapping, sniping, and market analysis.",
    tags: ["AI", "Trading", "BSC", "DeFi"],
    links: {
      website: "https://www.chatai.ink/",
      source: "#",
    },
    image: "/projects/chatai.webp",
  },
  {
    title: "Luntra Infrastructure",
    dates: "2024 - Present",
    description:
      "Advanced blockchain infrastructure providing AI-driven wallet intelligence, MEV protection, and hot-swappable MLOps for decentralized applications.",
    tags: ["Infrastructure", "AI", "Blockchain", "ZK"],
    links: {
      website: "https://www.luntrainfrastructure.com/",
      source: "#",
    },
    image: "/projects/luntra-infra.webp",
  },
  {
    title: "LearnLoom",
    dates: "2024 - Present",
    description:
      "A comprehensive e-learning platform connecting students with expert instructors, featuring a diverse catalog of courses across technology, business, and personal development.",
    tags: ["E-learning", "Next.js", "PostgreSQL", "Education"],
    links: {
      website: "https://learnloom.vercel.app/",
      source: "#",
    },
    image: "/projects/learnloom.webp",
  },
  {
    title: "Christmas Wish",
    dates: "2024 - 2024",
    description:
      "A seasonal platform for creating and sharing personalized Christmas messages. Features a custom message editor, pre-defined templates, and audio attachment capabilities.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Personalization"],
    links: {
      website: "https://xmas-wish.vercel.app/",
      source: "https://github.com/xeuxdev/christmas-wish",
    },
    image: "/projects/xmas-wish.webp",
  },
  {
    title: "CryptoScooby",
    dates: "2024 - Present",
    description:
      "A Web3 incubator and launchpad dedicated to supporting early-stage projects with KYC verification, fair launches, and community-driven incubation.",
    tags: ["Launchpad", "Incubator", "Web3", "Investment"],
    links: {
      website: "https://www.cryptoscooby.com/",
      source: "#",
    },
    image: "/projects/crypto-scobby.webp",
  },
];

type ViewMode = "grid" | "list";

export function ProjectsSection() {
  const [view, setView] = useState<ViewMode>("grid");

  return (
    <section id="projects" className="w-full max-w-2xl">
      <BlurFade delay={0.6} inView>
        {/* Header with view toggle */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="eyebrow mb-2">Portfolio</p>
            <h2 className="font-display text-4xl italic">Featured Work</h2>
          </div>

          {/* Toggle buttons */}
          <div className="flex items-center gap-0.5 p-0.5 rounded-lg border border-border/60 bg-muted/30">
            <button
              id="projects-grid-view"
              onClick={() => setView("grid")}
              aria-label="Grid view"
              className={`p-1.5 rounded-md transition-all duration-150 ${
                view === "grid"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              id="projects-list-view"
              onClick={() => setView("list")}
              aria-label="List view"
              className={`p-1.5 rounded-md transition-all duration-150 ${
                view === "list"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Grid view */}
        {view === "grid" && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PROJECTS.map((project, i) => (
              <Card
                key={i}
                className="group flex flex-col overflow-hidden border-neutral-200 dark:border-neutral-800 transition-all hover:shadow-lg hover:-translate-y-0.5 h-full p-0 gap-3"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-40 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-40 w-full bg-linear-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 group-hover:scale-105 transition-transform duration-500 ease-out flex items-center justify-center">
                    <Globe className="h-8 w-8 text-neutral-400 dark:text-neutral-600" />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-sm font-semibold line-clamp-1">
                    {project.title}
                  </CardTitle>
                  <div className="font-mono text-[10px] text-muted-foreground">
                    {project.dates}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 grow">
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="px-1.5 py-0 text-[10px] font-normal"
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
                        className="w-full gap-1.5 h-7 text-xs"
                      >
                        <Icons.github className="size-3" /> Source
                      </Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* List view */}
        {view === "list" && (
          <ol className="flex flex-col">
            {PROJECTS.map((project, i) => (
              <li key={i}>
                <div className="group grid grid-cols-[2rem_1fr] gap-x-4 items-start py-4 border-b border-border/60 last:border-0">
                  {/* Index */}
                  <span className="font-mono text-[11px] text-muted-foreground pt-0.75 select-none tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 flex flex-col gap-1.5">
                    {/* Title row */}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-medium text-foreground leading-snug">
                        {project.title}
                      </h3>
                      {/* Action links */}
                      <div className="flex items-center gap-2 shrink-0">
                        {project.links.source !== "#" && (
                          <Link
                            href={project.links.source}
                            target="_blank"
                            aria-label={`${project.title} source`}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Icons.github className="size-3.5" />
                          </Link>
                        )}
                        <Link
                          href={project.links.website}
                          target="_blank"
                          aria-label={`${project.title} website`}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-2.5 mt-0.5 flex-wrap">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {project.dates}
                      </span>
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground"
                        >
                          · {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </BlurFade>
    </section>
  );
}
