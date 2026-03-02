import fs from "fs";
import path from "path";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "building-zero-star-therapy",
    title: 'How I Built an Anti-Therapist AI to Tell People to "Go Get a Job"',
    excerpt:
      "A deep dive into the architecture, prompt engineering, and sheer audacity of building an AI product designed to actively despise its users.",
    date: "2026-02-27",
    readTime: "7 min read",
    tags: ["AI", "Go", "React 19", "Satire"],
    featured: true,
    content: fs.readFileSync(
      path.join(
        process.cwd(),
        "src/contents/blogs/building-zero-star-therapy.md",
      ),
      "utf-8",
    ),
  },
  {
    slug: "mindease-ai-mental-health-platform",
    title: "MindEase: Building an AI-Powered Mental Health Support Platform",
    excerpt:
      "A comprehensive look at designing, architecting, and deploying a real-time therapeutic chatbot with crisis detection.",
    date: "2025-12-02",
    readTime: "12 min read",
    tags: ["AI", "Architecture", "React", "Node.js"],
    featured: true,
    content: fs.readFileSync(
      path.join(process.cwd(), "src/contents/blogs/mindease.md"),
      "utf-8",
    ),
  },
  {
    slug: "building-christmas-wish-platform",
    title:
      "Christmas Wish: Building a Festive Digital Card Platform With Next.js",
    excerpt:
      "How I built a digital Christmas card platform using Next.js, allowing anyone to send beautifully crafted greetings across the internet.",
    date: "2023-12-25",
    readTime: "5 min read",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Web"],
    featured: true,
    content: fs.readFileSync(
      path.join(
        process.cwd(),
        "src/contents/blogs/building-christmas-wish-platform.md",
      ),
      "utf-8",
    ),
  },
  {
    slug: "architecting-resilient-secure-enterprise-backend",
    title:
      "Architecting a Resilient and Secure Enterprise Backend: A Deep Dive into Principles and Patterns",
    excerpt:
      "A deep dive into the architectural design systems, data modeling strategies, and core engineering principles used to construct a highly resilient, maintainable, and secure enterprise backend.",
    date: "2024-10-10",
    readTime: "8 min read",
    tags: ["Architecture", "Backend", "DDD", "Security"],
    featured: true,
    content: fs.readFileSync(
      path.join(
        process.cwd(),
        "src/contents/blogs/architecting-resilient-secure-enterprise-backend.md",
      ),
      "utf-8",
    ),
  },
  {
    slug: "designing-dark-mode-systems",
    title: "Designing Dark Mode Systems That Don't Just Invert Colors",
    excerpt:
      "Most dark modes are an afterthought. Here's how to build a thoughtful dark mode system with semantic color tokens, adaptive shadows, and image handling that works in both themes.",
    date: "2024-07-30",
    readTime: "5 min read",
    tags: ["CSS", "Design Systems", "Dark Mode", "Tailwind"],
    featured: false,
    content: fs.readFileSync(
      path.join(
        process.cwd(),
        "src/contents/blogs/designing-dark-mode-systems.md",
      ),
      "utf-8",
    ),
  },
  {
    slug: "typescript-patterns-react",
    title: "TypeScript Patterns I Reach For Every Day in React",
    excerpt:
      "After 4+ years of TypeScript in production React codebases, these are the patterns I install on day one of every new project — from discriminated unions to template literal types.",
    date: "2024-05-12",
    readTime: "9 min read",
    tags: ["TypeScript", "React", "Patterns", "DX"],
    featured: true,
    content: fs.readFileSync(
      path.join(
        process.cwd(),
        "src/contents/blogs/typescript-patterns-react.md",
      ),
      "utf-8",
    ),
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.featured);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
