"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookOpen, Briefcase, FolderOpen, HomeIcon } from "lucide-react";
import Link from "next/link";
import { Icons } from "../ui/icons";

const DOCK_ITEMS = [
  { href: "#home", icon: HomeIcon, label: "Home" },
  { href: "#work", icon: Briefcase, label: "Work" },
  { href: "#projects", icon: FolderOpen, label: "Projects" },
  { href: "/blog", icon: BookOpen, label: "Blog" },
  { isSeparator: true },
  {
    href: "https://github.com/xeuxdev",
    icon: Icons.github,
    label: "GitHub",
    target: "_blank",
  },
  {
    href: "https://linkedin.com/in/xeuxdev",
    icon: Icons.linkedin,
    label: "LinkedIn",
    target: "_blank",
  },
  {
    href: "https://x.com/xeuxdev",
    icon: Icons.twitter,
    label: "Twitter",
    target: "_blank",
  },
];

export function FloatingDock() {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <TooltipProvider delayDuration={0}>
        <Dock className="bg-white/80 dark:bg-black/80 border border-neutral-200 dark:border-neutral-800 shadow-xl">
          {DOCK_ITEMS.map((item, index) =>
            item.isSeparator ? (
              <div
                key={index}
                className="h-8 w-px bg-neutral-200 dark:bg-neutral-800 self-center mx-1"
              />
            ) : (
              <DockIcon key={item.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-10 w-10"
                      asChild
                    >
                      <Link
                        href={item.href!}
                        target={item.target}
                        aria-label={item.label}
                      >
                        {item.icon && <item.icon className="h-5 w-5" />}
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ),
          )}
        </Dock>
      </TooltipProvider>
    </div>
  );
}
