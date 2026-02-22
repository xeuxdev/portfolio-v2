"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { formatDate, getFeaturedPosts } from "@/lib/blog";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function BlogSection() {
  const featuredPosts = getFeaturedPosts();

  return (
    <section id="blog" className="w-full max-w-2xl">
      <BlurFade delay={0.65} inView>
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow mb-2">Writing</p>
            <h2 className="font-display text-4xl italic text-foreground">
              Selected Posts
            </h2>
          </div>
          <Link
            href="/blog"
            className="group flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors pb-1"
          >
            All posts
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Indexed post list */}
        <ol className="flex flex-col">
          {featuredPosts.map((post, i) => (
            <BlurFade key={post.slug} delay={0.68 + i * 0.07} inView>
              <li>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid grid-cols-[2rem_1fr] gap-x-4 items-start py-5 border-b border-border/60 last:border-0 transition-all duration-200"
                >
                  {/* Index number — full muted-foreground, no opacity stacking */}
                  <span className="font-mono text-[11px] text-muted-foreground pt-[3px] select-none tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex flex-col gap-1.5 min-w-0">
                    {/* Title row */}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-medium leading-snug text-foreground group-hover:text-foreground/70 transition-colors">
                        {post.title}
                      </h3>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground mt-0.5 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5 -translate-x-0.5 group-hover:translate-y-0 group-hover:translate-x-0" />
                    </div>

                    {/* Excerpt */}
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta — use text-muted-foreground directly, no opacity stacking */}
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {formatDate(post.date)}
                      </span>
                      <span className="text-muted-foreground text-[10px]">
                        ·
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {post.readTime}
                      </span>
                      <span className="text-muted-foreground text-[10px]">
                        ·
                      </span>
                      <div className="flex gap-1.5">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            </BlurFade>
          ))}
        </ol>
      </BlurFade>
    </section>
  );
}
