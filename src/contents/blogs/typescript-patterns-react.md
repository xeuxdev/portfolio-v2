# TypeScript Patterns I Reach For Every Day in React

TypeScript is only as good as how you model your domain. Here are the patterns I install on every new React project.

## 1. Discriminated Unions for Component Variants

Instead of a grab-bag of optional props, use discriminated unions to make illegal states unrepresentable:

```typescript
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
```

Now TypeScript enforces that a "link" button MUST have `href`, not just optionally.

## 2. The `satisfies` Operator for Config Objects

`satisfies` lets you get inference AND validation without widening the type:

```typescript
const ROUTES = {
  home: "/",
  blog: "/blog",
  about: "/about",
} satisfies Record<string, string>;

type Route = typeof ROUTES; // { home: string; blog: string; about: string }
type RouteName = keyof typeof ROUTES; // "home" | "blog" | "about"
```

## 3. Generic Fetch with Full Type Safety

```typescript
async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

// Usage — T is inferred from the generic parameter
const user = await api<User>("/api/user/1");
```

## 4. Template Literal Types for Event Names

When you have a system-wide event bus or analytics:

```typescript
type Module = "auth" | "dashboard" | "checkout";
type Action = "view" | "click" | "submit" | "error";
type EventName = `${Module}:${Action}`;

// "auth:view" | "auth:click" | "dashboard:view" | ... (12 combinations, all typed)
function track(event: EventName, data?: Record<string, unknown>) { ... }

track("auth:click"); // ✅
track("payment:click"); // ❌ Type error
```

## 5. Branded Types for IDs

Stop passing the wrong ID to the wrong function:

```typescript
type UserId = string & { readonly _brand: "UserId" };
type PostId = string & { readonly _brand: "PostId" };

function createUserId(id: string): UserId { return id as UserId; }

function getUser(id: UserId) { ... }
function getPost(id: PostId) { ... }

const userId = createUserId("abc");
const postId = "xyz" as PostId;

getUser(postId); // ❌ Type error — postId is not UserId
```

These five patterns consistently prevent entire categories of bugs and make code reviews much easier because intent is encoded directly in the types.
