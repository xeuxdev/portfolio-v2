"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import React from "react";
import Link from "next/link";

export function ContactSection() {
  return (
    <section id="contact" className="w-full max-w-2xl text-center">
      <BlurFade delay={0.7} inView>
        <h2 className="mb-4 text-3xl font-bold tracking-tight">Get in Touch</h2>
        <p className="mb-8 text-muted-foreground">
          I&apos;m currently looking for new opportunities. Whether you have a
          question or just want to say hi, I&apos;ll try my best to get back to
          you!
        </p>
        <Link href="mailto:tochukwujohn24@gmail.com">
          <Button size="lg" className="rounded-full">
            <Mail className="mr-2 h-4 w-4" /> Say Hello
          </Button>
        </Link>
      </BlurFade>
    </section>
  );
}
