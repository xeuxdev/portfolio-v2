"use client";

import BlurFade from "@/components/magicui/blur-fade";
import React from "react";

export function EducationSection() {
  return (
    <section id="education" className="w-full max-w-2xl">
      <BlurFade delay={0.4} inView>
        <div className="mb-8">
          <p className="eyebrow mb-2">Background</p>
          <h2 className="font-display text-4xl italic">
            Community &amp; Education
          </h2>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Bayero University, Kano</h3>
              <p className="text-muted-foreground">Community Engagement</p>
              <p className="text-sm text-muted-foreground mt-1">
                Co-Lead: Cowrywise@BUK & GDG (Google Developers Group)
              </p>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
