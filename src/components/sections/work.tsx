"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const WORK_EXPERIENCE = [
  {
    company: "Gbikna Limited",
    role: "Lead Frontend Engineer",
    period: "July 2024 – Feb 2025",
    logoUrl: "/work/gbikna.jpg",
    points: [
      "Led the redesign of the fintech admin dashboard and integrated crypto payments, reducing admin processing time by 40%.",
      "Restructured the codebase and implemented RBAC, defining custom privileges and improving future maintainability.",
    ],
  },
  {
    company: "Dokto (Contract)",
    role: "Lead Frontend Engineer",
    period: "June 2024 – July 2025",
    logoUrl: "/work/dokto.svg",
    points: [
      "Architected a scalable telehealth platform using Next.js and Radix UI, achieving sub-2-second load times for critical healthcare views.",
      "Orchestrated real-time data synchronization and managed frontend architectural decisions for a cross-functional team.",
    ],
  },
  {
    company: "Schoolable HQ (YC W'19)",
    role: "Frontend Engineer",
    period: "Nov 2023 – June 2024",
    logoUrl: "/work/schoolable.jpg",
    points: [
      "Led the initial development of the Admin Frontend, resulting in a 30% increase in operational efficiency through improved data visualization.",
      "Designed modular, accessible frontend architecture and collaborated with backend engineers for seamless API integration.",
    ],
  },
  {
    company: "Tranexx - (contract)",
    role: "Frontend Developer",
    period: "Jan 2024 – Mar 2024",
    logoUrl: "/work/trannex.jpg",
    points: [
      "Led the implementation of pixel-perfect marketing pages and a reusable design system, consistently applied across the platform.",
      "Integrated real-time content delivery APIs and contributed to the fintech dashboard for efficient trading.",
    ],
  },
  {
    company: "Collx",
    role: "Software Engineer",
    period: "Jan 2023 – Dec 2023",
    points: [
      "Implemented end-to-end event and account management solutions, optimizing page load speeds to under 3 seconds.",
      "Led feature implementation for organizers and participants, integrating third-party APIs for enhanced automation.",
    ],
  },
  {
    company: "Freelancer",
    role: "Frontend Developer",
    period: "Jan 2022 – Dec 2022",
    points: [
      "Delivered custom web solutions and led entire project lifecycles from conception to delivery, ensuring client satisfaction.",
      "Applied creative problem-solving to enhance project functionality and user experience.",
    ],
  },
];

export function WorkSection() {
  return (
    <section id="work" className="w-full max-w-2xl">
      <BlurFade delay={0.3} inView>
        <h2 className="mb-8 text-3xl font-bold tracking-tight">
          Work Experience
        </h2>
        <div className="flex flex-col gap-8">
          {WORK_EXPERIENCE.map((job, i) => (
            <div
              key={i}
              className="relative border-l pl-12 pb-4 transition-all hover:opacity-100 dark:border-white/20"
            >
              <Avatar className="absolute -left-5 top-0 h-10 w-10 border bg-background">
                <AvatarImage
                  src={job.logoUrl}
                  alt={job.company}
                  className="object-cover"
                />
                <AvatarFallback>{job.company[0]}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{job.company}</h3>
              <p className="text-sm text-muted-foreground">
                {job.role} • {job.period}
              </p>
              <ul className="mt-4 ml-4 list-disc space-y-2 text-muted-foreground">
                {job.points.map((point, index) => (
                  <li key={index} className="text-sm">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </BlurFade>
    </section>
  );
}
