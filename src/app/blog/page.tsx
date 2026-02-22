import BlurFade from "@/components/magicui/blur-fade";
import { BLOG_POSTS, formatDate } from "@/lib/blog";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writings on frontend development, performance, Web3, and building scalable products from a developer with 4+ years of experience.",
};

function groupByYear(posts: typeof BLOG_POSTS) {
  const groups: Record<string, typeof BLOG_POSTS> = {};
  for (const post of posts) {
    const year = new Date(post.date).getFullYear().toString();
    if (!groups[year]) groups[year] = [];
    groups[year].push(post);
  }
  return Object.entries(groups).sort(([a], [b]) => Number(b) - Number(a));
}

export default function BlogPage() {
  const grouped = groupByYear(BLOG_POSTS);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-2xl px-6 md:px-0 pt-20 pb-32">
        {/* Back */}
        <BlurFade delay={0.05} inView>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors mb-16 group tracking-wider uppercase"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
            Home
          </Link>
        </BlurFade>

        {/* Page header */}
        <BlurFade delay={0.1} inView>
          <div className="mb-16">
            <p className="eyebrow mb-3">Xeuxdev</p>
            <h1 className="font-display text-6xl italic text-foreground leading-none mb-5">
              Writing
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Thoughts on building fast, scalable frontends — performance
              engineering, DeFi UX, TypeScript, and the craft of shipping great
              software.
            </p>
          </div>
        </BlurFade>

        {/* Posts grouped by year */}
        <div className="flex flex-col gap-12">
          {grouped.map(([year, posts], gi) => (
            <BlurFade key={year} delay={0.15 + gi * 0.06} inView>
              <div>
                {/* Year marker — text-muted-foreground, no opacity stacking */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-xs text-muted-foreground tracking-widest">
                    {year}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <ol className="flex flex-col">
                  {posts.map((post, i) => (
                    <BlurFade
                      key={post.slug}
                      delay={0.15 + gi * 0.06 + i * 0.05}
                      inView
                    >
                      <li>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group grid grid-cols-[2rem_1fr] gap-x-4 items-start py-5 border-b border-border/60 last:border-0 transition-colors duration-200"
                        >
                          {/* Counter — solid muted-foreground */}
                          <span className="font-mono text-[11px] text-muted-foreground pt-[3px] select-none tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>

                          <div className="min-w-0 flex flex-col gap-1.5">
                            {/* Title + arrow */}
                            <div className="flex items-start justify-between gap-3">
                              <h2 className="text-sm font-medium text-foreground group-hover:text-foreground/70 transition-colors leading-snug">
                                {post.title}
                                {post.featured && (
                                  <span className="ml-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground not-italic">
                                    Featured
                                  </span>
                                )}
                              </h2>
                              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground mt-0.5 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5 -translate-x-0.5 group-hover:translate-y-0 group-hover:translate-x-0" />
                            </div>

                            {/* Excerpt */}
                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                              {post.excerpt}
                            </p>

                            {/* Meta — all at solid text-muted-foreground */}
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
                              {post.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground"
                                >
                                  · {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </Link>
                      </li>
                    </BlurFade>
                  ))}
                </ol>
              </div>
            </BlurFade>
          ))}
        </div>
      </main>
    </div>
  );
}
