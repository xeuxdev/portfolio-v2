"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { Meteors } from "@/components/magicui/meteors";
import TypingAnimation from "@/components/magicui/typing-animation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex w-full max-w-2xl flex-col items-start justify-center overflow-hidden rounded-lg"
    >
      <Meteors number={30} />
      <BlurFade delay={0.25} inView>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-border">
              <AvatarImage
                src="/me.jpg"
                alt="Profile"
                className="object-cover rounded-full"
              />
              <AvatarFallback>TO</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h2 className="">
                <TypingAnimation
                  text="Hi I'm Xeux"
                  className="text-left text-2xl font-extrabold leading-none tracking-wider sm:text-2xl md:text-2xl lg:text-3xl"
                  duration={50}
                />
              </h2>
            </div>
          </div>

          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Frontend Developer with 4+ years of experience specializing in AI,
            Fintech, and Web3. I build pixel-perfect, scalable web applications
            with a focus on performance optimization and intuitive UX.
          </p>
          <div className="mt-6 flex gap-4">
            <Link href="#projects">
              <Button className="rounded-full shadow-2xl transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                View My Work
              </Button>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full">
                  Contact Me
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Contact Me</DialogTitle>
                  <DialogDescription>
                    Get in touch with me for any opportunities or
                    collaborations.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <a
                      href="mailto:tochukwujohn24@gmail.com"
                      className="text-sm font-medium hover:underline"
                    >
                      tochukwujohn24@gmail.com
                    </a>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
