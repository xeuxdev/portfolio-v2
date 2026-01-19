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
  // {
  //   title: "Little App",
  //   dates: "2023 - Present",
  //   description:
  //     "A fintech solution for families, offering debit cards and financial education tools for children with parental management.",
  //   tags: ["Fintech", "Mobile", "React Native"],
  //   links: {
  //     website: "https://trylittleapp.com/",
  //     source: "#",
  //   },
  //   image: "",
  // },
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
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-48 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="h-48 w-full bg-linear-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 group-hover:scale-105 transition-transform duration-500 ease-out flex items-center justify-center">
                  <Globe className="h-8 w-8 text-neutral-400 dark:text-neutral-600" />
                </div>
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
