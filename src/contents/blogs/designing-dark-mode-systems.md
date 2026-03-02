# Designing Dark Mode Systems That Don't Just Invert Colors

Bad dark mode: take light mode, invert everything. Good dark mode: design for darkness from the ground up.

## Semantic Color Tokens Over Literal Names

Never name tokens by their value. Name them by their role:

```css
/* Bad */
--color-gray-900: #111827;

/* Good */
--color-surface-primary: #111827;       /* Card backgrounds */
--color-surface-secondary: #1f2937;    /* Input backgrounds */
--color-on-surface: #f9fafb;           /* Text on surfaces */
--color-border-subtle: rgba(255,255,255,0.08);
```

In dark mode, swap the values — not refactor every component.

## Shadows Need to Be Redesigned, Not Just Darkened

Shadows look great on white backgrounds because they simulate depth. On dark surfaces, dark shadows are invisible. The solution: use colored, glow-style shadows.

```css
/* Light mode */
.card { box-shadow: 0 4px 24px rgba(0,0,0,0.08); }

/* Dark mode */
.dark .card { box-shadow: 0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04); }
```

The white outline at 4% opacity is the real trick — it creates a sense of elevation without a visible border.

## Image Handling in Dark Contexts

Bright images jarring on dark backgrounds. Two techniques:

**Dimming overlays:**
```css
.dark .hero-image { filter: brightness(0.85) contrast(1.05); }
```

**Theme-adaptive images in Next.js:**
```tsx
<picture>
  <source media="(prefers-color-scheme: dark)" srcSet="/hero-dark.webp" />
  <img src="/hero-light.webp" alt="Hero" />
</picture>
```

## The Transition

Avoid flashing on theme toggle. Animate only specific properties:

```css
*, *::before, *::after {
  transition: background-color 200ms ease, border-color 200ms ease, color 50ms ease;
}
```

Shorter transition on `color` makes text feel snappy rather than sluggish.

## Don't Forget: Reduce Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition: none !important;
    animation: none !important;
  }
}
```

Dark mode and accessibility go hand in hand. Build both thoughtfully.
