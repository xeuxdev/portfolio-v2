"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Briefcase, FolderOpen, HomeIcon } from "lucide-react";
import Link from "next/link";
import { Icons } from "../ui/icons";

export function FloatingDock() {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <TooltipProvider>
        <Dock className="bg-white/80 dark:bg-black/80 border border-neutral-200 dark:border-neutral-800 shadow-xl">
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="#home">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10"
                  >
                    <HomeIcon className="h-5 w-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="#work">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10"
                  >
                    <Briefcase className="h-5 w-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Work</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="#projects">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10"
                  >
                    <FolderOpen className="h-5 w-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Projects</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
          <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-800 self-center mx-1" />
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="https://github.com/xeuxdev" target="_blank">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10"
                  >
                    <Icons.github className="size-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="https://linkedin.com/in/xeuxdev" target="_blank">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10"
                  >
                    <Icons.linkedin className="size-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>LinkedIn</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="https://x.com/xeuxdev" target="_blank">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10"
                  >
                    <Icons.twitter className="size-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Twitter</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
}
