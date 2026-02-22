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
    slug: "building-real-time-defi-dashboards",
    title: "Building Real-Time DeFi Dashboards with WebSockets & React",
    excerpt:
      "How I architected a high-performance DeFi dashboard that streams live on-chain data with sub-100ms updates, handling thousands of concurrent price feeds without killing the browser.",
    date: "2025-01-15",
    readTime: "8 min read",
    tags: ["Web3", "React", "WebSockets", "Performance"],
    featured: true,
    content: `
# Building Real-Time DeFi Dashboards with WebSockets & React

When building the Magmar Infra dashboard, I faced a brutal challenge: display live price feeds for hundreds of token pairs simultaneously, update every 300ms, and keep the UI responsive. Here's how I solved it.

## The Problem with Naive Implementations

The obvious approach — subscribing to a WebSocket and calling \`setState\` on every message — falls apart at scale. At 20 messages/second across 50 pairs, you're triggering 1,000 React re-renders per second. The browser simply can't keep up.

## Architecture: Batched Updates with a Shared Store

The key insight is to decouple data ingestion from rendering:

\`\`\`typescript
// 1. Ingest raw WebSocket messages into a mutable buffer
const priceBuffer = new Map<string, number>();

ws.on("message", (data) => {
  const { pair, price } = JSON.parse(data);
  priceBuffer.set(pair, price);
});

// 2. Flush the buffer to React state on a fixed interval
useEffect(() => {
  const interval = setInterval(() => {
    if (priceBuffer.size > 0) {
      setPrices(new Map(priceBuffer));
      priceBuffer.clear();
    }
  }, 100); // 10 FPS max render rate
  return () => clearInterval(interval);
}, []);
\`\`\`

This pattern reduced CPU usage by 82% and eliminated jank entirely.

## Virtualization for Large Lists

With hundreds of pairs visible, \`react-window\` is non-negotiable. The trick is using a stable \`itemKey\` function so that React can properly reconcile rows without full remounts:

\`\`\`typescript
<VariableSizeList
  itemKey={(index, data) => data.pairs[index].id}
  itemCount={pairs.length}
  itemSize={(index) => rowHeights[index]}
>
  {PriceRow}
</VariableSizeList>
\`\`\`

## Color-Flash Animations Without Layout Thrash

Price change flashes are a UX staple in trading UIs. The naive approach of toggling a class in JS causes forced reflows. Instead, use CSS custom properties:

\`\`\`css
.price-cell {
  transition: color 0.3s ease;
  color: oklch(var(--price-color));
}
\`\`\`

\`\`\`typescript
// Update the CSS variable directly — no React re-render
cellRef.current?.style.setProperty(
  "--price-color",
  newPrice > oldPrice ? "0.72 0.17 142" : "0.65 0.25 27"
);
\`\`\`

## Key Takeaways

- **Never drive render frequency from WebSocket message rate** — buffer, then batch.
- **Virtualize lists** aggressively; even 50 rows can cause issues with complex cell content.
- **Use CSS custom properties** for micro-animations to avoid React rerenders entirely.
- **Profile first** — Chrome's performance timeline is your best friend before optimizing anything.
    `,
  },
  {
    slug: "ab-testing-frontend-without-framework",
    title: "A/B Testing UI Without a Framework: Lessons from a Fintech Product",
    excerpt:
      "I ran 14 A/B tests across a fintech dashboard with zero third-party experimentation tooling. Here's the lightweight infrastructure I built and what the data taught me about developer assumptions.",
    date: "2025-02-10",
    readTime: "6 min read",
    tags: ["Fintech", "UX", "Performance", "TypeScript"],
    featured: true,
    content: `
# A/B Testing UI Without a Framework

At Gbikna, we needed to test several dashboard layout variants but couldn't justify the cost of Optimizely or LaunchDarkly for our scale. I built a minimal in-house system that served us well for 14 sequential experiments.

## The Core: A Feature Flag Hook

\`\`\`typescript
type Experiment<T extends string> = {
  name: string;
  variants: Record<T, number>; // variant -> weight
};

function useExperiment<T extends string>(exp: Experiment<T>): T {
  const userId = useUserId();
  const hash = murmurhash(userId + exp.name);
  
  let cumulative = 0;
  const roll = (hash % 100) / 100;
  
  for (const [variant, weight] of Object.entries(exp.variants)) {
    cumulative += weight as number;
    if (roll < cumulative) return variant as T;
  }
  
  return Object.keys(exp.variants)[0] as T;
}
\`\`\`

User assignment is deterministic — the same user always sees the same variant, which is critical for avoiding flickering and ensuring consistent experiences across sessions.

## Logging Without a Data Warehouse

We piped experiment exposure and conversion events to a simple Next.js API route that wrote to a PostgreSQL table. Not glamorous, but sufficient.

\`\`\`typescript
// Exposure logged on mount
useEffect(() => {
  logEvent("experiment_exposure", { experiment: "dashboard_layout", variant });
}, [variant]);

// Conversion logged on action
const handleTransfer = () => {
  logEvent("conversion", { experiment: "dashboard_layout", variant });
  initiateTransfer();
};
\`\`\`

## What the Data Revealed

The most counterintuitive finding: our "compact" layout variant — which I assumed users would hate — outperformed the spacious default by 23% on task completion rate. Power users hated whitespace they couldn't disable.

The second insight: colorful status badges (red/yellow/green) increased anxiety and support tickets. Neutral, text-based status labels with subtle icons performed dramatically better in a financial context.

## Lesson

Don't assume you know what your users want. Build the infrastructure to measure it, make it cheap to run experiments, and let the data challenge your instincts.
    `,
  },
  {
    slug: "account-abstraction-ux-patterns",
    title: "Account Abstraction & UX: Making Web3 Feel Like Web2",
    excerpt:
      "ERC-4337 eliminates seed phrases and gas headaches, but the real challenge is the UX layer. Here's how I designed onboarding flows for Magmar Infra that get non-crypto users transacting in under 60 seconds.",
    date: "2024-11-20",
    readTime: "10 min read",
    tags: ["Web3", "ERC-4337", "UX", "Account Abstraction"],
    featured: false,
    content: `
# Account Abstraction & UX: Making Web3 Feel Like Web2

ERC-4337 is a technical breakthrough, but users don't care about the internals. They care about: "Can I send money without storing 24 words in a notebook?"

## The Old Onboarding Funnel (And Why It Fails)

Traditional Web3 onboarding asks new users to:
1. Install MetaMask
2. Write down 12–24 seed words
3. Fund their wallet with ETH for gas
4. Sign transactions

We measured a 78% drop-off at step 1. Users aren't afraid of crypto — they're afraid of responsibility for their own security.

## The AA-Powered Flow

With account abstraction, we replaced this with:
1. **Social login** (Google/Twitter via passkey-linked smart account)
2. **Gasless transactions** — a paymaster sponsoring initial transactions
3. **Progressive disclosure** — advanced features revealed only after user confidence builds

The smart account is created silently on first login. The user never sees an address or a seed phrase until they opt into "advanced mode."

## Designing the Transaction Confirmation Modal

The standard "Sign this cryptographic blob" experience is a UX crime. I replaced it with a human-readable summary:

\`\`\`tsx
function TransactionPreview({ tx }: { tx: ParsedTransaction }) {
  return (
    <div className="transaction-preview">
      <TransactionIcon type={tx.type} />
      <h2>Send {tx.amount} {tx.token}</h2>
      <p>To: <ENSName address={tx.to} /></p>
      <FeeEstimate sponsored={tx.sponsored} />
      {tx.sponsored && (
        <Badge variant="success">No gas fee — sponsored</Badge>
      )}
    </div>
  );
}
\`\`\`

The "sponsored" badge was crucial: users were confused why there was no gas fee, and without explanation, 40% of them assumed something was wrong.

## Error Handling That Doesn't Terrify Users

When a transaction fails, never show raw revert reasons. Map common errors to human language:

\`\`\`typescript
const USER_FRIENDLY_ERRORS: Record<string, string> = {
  "insufficient funds": "Your balance is too low for this transaction",
  "execution reverted: ST": "Slippage too high — try again or increase tolerance",
  "user rejected": "You cancelled the transaction",
};
\`\`\`

## Results

After implementing the AA-powered flow, our new user activation rate went from 22% to 61% in the first 30 days. The single biggest driver: removing the seed phrase step entirely from the default path.
    `,
  },
  {
    slug: "nextjs-performance-audit",
    title: "Auditing a Next.js App from 68 to 97 Lighthouse Score",
    excerpt:
      "A Lighthouse score audit walk-through on a production Next.js app — INP, LCP, layout shift culprits, and the specific optimizations that moved the needle.",
    date: "2024-09-05",
    readTime: "7 min read",
    tags: ["Next.js", "Performance", "Lighthouse", "Web Vitals"],
    featured: false,
    content: `
# Auditing a Next.js App from 68 to 97 Lighthouse Score

Performance audits are most valuable when they're surgical. Here's the exact sequence of changes that improved the LearnLoom platform's Lighthouse score by 29 points.

## Starting Point: The Audit

Initial scores (mobile):
- Performance: 68
- LCP: 4.1s
- INP: 280ms
- CLS: 0.18

## Fix 1: Image Optimization (LCP: 4.1s → 1.8s)

The hero image was a 2.4MB PNG served without \`next/image\`. Switching to \`<Image>\` with \`priority\` and proper \`sizes\`:

\`\`\`tsx
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={630}
  priority
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
/>
\`\`\`

This alone dropped LCP to 1.8s and reduced the image payload from 2.4MB to 180KB (WebP, optimized).

## Fix 2: Eliminating Layout Shift (CLS: 0.18 → 0.02)

Two culprits:
1. **Font swap** — fixed with \`font-display: optional\` on the custom font.
2. **Dynamic content without reserved space** — course cards loaded asynchronously and pushed content down.

The card skeleton solution:

\`\`\`tsx
function CourseCardSkeleton() {
  return (
    <div
      className="animate-pulse"
      style={{ height: "280px" }} // exact card height
    >
      <div className="h-48 bg-muted rounded-lg" />
      <div className="h-4 bg-muted rounded mt-3 w-3/4" />
      <div className="h-3 bg-muted rounded mt-2 w-1/2" />
    </div>
  );
}
\`\`\`

## Fix 3: Interaction Responsiveness (INP: 280ms → 65ms)

The search filter was running synchronously on every keystroke — filtering 800 courses on the main thread. Fix: \`useDeferredValue\` + move filtering off the critical path.

\`\`\`typescript
const deferredQuery = useDeferredValue(searchQuery);

const filteredCourses = useMemo(
  () => courses.filter((c) => c.title.toLowerCase().includes(deferredQuery)),
  [courses, deferredQuery]
);
\`\`\`

## Final Scores

- Performance: 97
- LCP: 1.6s  
- INP: 65ms
- CLS: 0.02

The entire audit took 4 hours. Most of the gain came from two changes: image optimization and layout shift elimination. Don't over-engineer — audit first, fix the biggest bottlenecks, measure again.
    `,
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
    content: `
# Designing Dark Mode Systems That Don't Just Invert Colors

Bad dark mode: take light mode, invert everything. Good dark mode: design for darkness from the ground up.

## Semantic Color Tokens Over Literal Names

Never name tokens by their value. Name them by their role:

\`\`\`css
/* Bad */
--color-gray-900: #111827;

/* Good */
--color-surface-primary: #111827;       /* Card backgrounds */
--color-surface-secondary: #1f2937;    /* Input backgrounds */
--color-on-surface: #f9fafb;           /* Text on surfaces */
--color-border-subtle: rgba(255,255,255,0.08);
\`\`\`

In dark mode, swap the values — not refactor every component.

## Shadows Need to Be Redesigned, Not Just Darkened

Shadows look great on white backgrounds because they simulate depth. On dark surfaces, dark shadows are invisible. The solution: use colored, glow-style shadows.

\`\`\`css
/* Light mode */
.card { box-shadow: 0 4px 24px rgba(0,0,0,0.08); }

/* Dark mode */
.dark .card { box-shadow: 0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04); }
\`\`\`

The white outline at 4% opacity is the real trick — it creates a sense of elevation without a visible border.

## Image Handling in Dark Contexts

Bright images jarring on dark backgrounds. Two techniques:

**Dimming overlays:**
\`\`\`css
.dark .hero-image { filter: brightness(0.85) contrast(1.05); }
\`\`\`

**Theme-adaptive images in Next.js:**
\`\`\`tsx
<picture>
  <source media="(prefers-color-scheme: dark)" srcSet="/hero-dark.webp" />
  <img src="/hero-light.webp" alt="Hero" />
</picture>
\`\`\`

## The Transition

Avoid flashing on theme toggle. Animate only specific properties:

\`\`\`css
*, *::before, *::after {
  transition: background-color 200ms ease, border-color 200ms ease, color 50ms ease;
}
\`\`\`

Shorter transition on \`color\` makes text feel snappy rather than sluggish.

## Don't Forget: Reduce Motion

\`\`\`css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition: none !important;
    animation: none !important;
  }
}
\`\`\`

Dark mode and accessibility go hand in hand. Build both thoughtfully.
    `,
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
    content: `
# TypeScript Patterns I Reach For Every Day in React

TypeScript is only as good as how you model your domain. Here are the patterns I install on every new React project.

## 1. Discriminated Unions for Component Variants

Instead of a grab-bag of optional props, use discriminated unions to make illegal states unrepresentable:

\`\`\`typescript
type ButtonProps =
  | { variant: "primary"; onClick: () => void }
  | { variant: "link"; href: string }
  | { variant: "submit" };

function Button(props: ButtonProps & { children: React.ReactNode }) {
  if (props.variant === "link") {
    return <a href={props.href}>{props.children}</a>;
  }
  // ...
}
\`\`\`

Now TypeScript enforces that a "link" button MUST have \`href\`, not just optionally.

## 2. The \`satisfies\` Operator for Config Objects

\`satisfies\` lets you get inference AND validation without widening the type:

\`\`\`typescript
const ROUTES = {
  home: "/",
  blog: "/blog",
  about: "/about",
} satisfies Record<string, string>;

type Route = typeof ROUTES; // { home: string; blog: string; about: string }
type RouteName = keyof typeof ROUTES; // "home" | "blog" | "about"
\`\`\`

## 3. Generic Fetch with Full Type Safety

\`\`\`typescript
async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json() as Promise<T>;
}

// Usage — T is inferred from the generic parameter
const user = await api<User>("/api/user/1");
\`\`\`

## 4. Template Literal Types for Event Names

When you have a system-wide event bus or analytics:

\`\`\`typescript
type Module = "auth" | "dashboard" | "checkout";
type Action = "view" | "click" | "submit" | "error";
type EventName = \`\${Module}:\${Action}\`;

// "auth:view" | "auth:click" | "dashboard:view" | ... (12 combinations, all typed)
function track(event: EventName, data?: Record<string, unknown>) { ... }

track("auth:click"); // ✅
track("payment:click"); // ❌ Type error
\`\`\`

## 5. Branded Types for IDs

Stop passing the wrong ID to the wrong function:

\`\`\`typescript
type UserId = string & { readonly _brand: "UserId" };
type PostId = string & { readonly _brand: "PostId" };

function createUserId(id: string): UserId { return id as UserId; }

function getUser(id: UserId) { ... }
function getPost(id: PostId) { ... }

const userId = createUserId("abc");
const postId = "xyz" as PostId;

getUser(postId); // ❌ Type error — postId is not UserId
\`\`\`

These five patterns consistently prevent entire categories of bugs and make code reviews much easier because intent is encoded directly in the types.
    `,
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
