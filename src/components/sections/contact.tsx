"use client";

import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";

export function ContactSection() {
  return (
    <section id="contact" className="w-full max-w-2xl">
      <BlurFade delay={0.75} inView>
        <div className="relative rounded-2xl border border-border/60 bg-muted/30 p-8 md:p-10 overflow-hidden">
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(0 0% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 50%) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative">
            <p className="eyebrow mb-3">Contact</p>
            <h2 className="font-display text-4xl italic mb-4 leading-tight">
              Let&apos;s build something together
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm">
              I&apos;m open to new opportunities — whether it&apos;s a contract,
              full-time role, or an interesting project. My inbox is always
              open.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="mailto:tochukwujohn24@gmail.com"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground border border-border/80 rounded-full px-5 py-2.5 hover:bg-foreground hover:text-background transition-all duration-200"
              >
                Say Hello
                <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
              <Link
                href="https://x.com/xeuxdev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                @xeuxdev
              </Link>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
