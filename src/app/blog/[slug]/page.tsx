import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPost, BLOG_POSTS, formatDate } from "@/lib/blog";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
  };
}

// Minimal Markdown-to-HTML renderer
function renderContent(content: string): string {
  return content
    .replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      (_, lang, code) =>
        `<pre><code class="language-${lang ?? "text"}">${code
          .trim()
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}</code></pre>`,
    )
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]+?<\/li>)(?!\s*<li>)/g, "<ul>$1</ul>")
    .replace(/^(?!<[a-z]).+$/gm, (line) =>
      line.trim() ? `<p>${line}</p>` : "",
    )
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = renderContent(post.content);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-2xl px-6 md:px-0 pt-20 pb-32">
        {/* Back nav */}
        <BlurFade delay={0.05} inView>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-16 group"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
            Writing
          </Link>
        </BlurFade>

        {/* Post header */}
        <BlurFade delay={0.1} inView>
          <header className="mb-12">
            {/* Tags — solid text-muted-foreground */}
            <div className="flex gap-3 mb-5 flex-wrap">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl italic leading-tight text-foreground mb-5">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-base text-muted-foreground leading-relaxed mb-7 max-w-xl">
              {post.excerpt}
            </p>

            {/* Metadata — solid text-muted-foreground, no opacity stacking */}
            <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>

            <div className="mt-8 h-px bg-border" />
          </header>
        </BlurFade>

        {/* Post content */}
        <BlurFade delay={0.2} inView>
          <article
            className="
              prose prose-neutral dark:prose-invert max-w-none
              prose-headings:font-sans prose-headings:font-semibold prose-headings:tracking-tight
              prose-h1:text-2xl prose-h1:mt-10 prose-h1:mb-4
              prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3
              prose-h3:text-base prose-h3:mt-8 prose-h3:mb-2
              prose-p:text-sm prose-p:leading-[1.8] prose-p:text-muted-foreground prose-p:mb-5
              prose-li:text-sm prose-li:text-muted-foreground prose-li:leading-relaxed
              prose-ul:my-5 prose-ul:ml-4 prose-ul:list-disc prose-ul:space-y-1.5
              prose-strong:text-foreground prose-strong:font-semibold
              prose-code:text-[0.8em] prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']
              prose-pre:bg-muted/60 prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-5 prose-pre:overflow-x-auto prose-pre:my-6 prose-pre:text-[0.8em] prose-pre:leading-relaxed
              prose-pre:code:bg-transparent prose-pre:code:px-0 prose-pre:code:py-0 prose-pre:code:rounded-none
            "
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </BlurFade>

        {/* Footer */}
        <BlurFade delay={0.3} inView>
          <footer className="mt-20 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors group inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
                All posts
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
          </footer>
        </BlurFade>
      </main>
    </div>
  );
}
