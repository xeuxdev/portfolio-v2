import type { Metadata } from "next";
import { Geist, Raleway } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "Xeuxdev | Frontend Developer",
    template: "%s | Xeuxdev",
  },
  description:
    "Frontend Developer specializing in AI, Fintech, and Web3. Building pixel-perfect, scalable web applications with a focus on performance and UX.",
  keywords: [
    "Frontend Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Web3",
    "Fintech",
    "Software Engineer",
    "Portfolio",
    "Xeuxdev",
    "Tochukwu John",
  ],
  authors: [{ name: "Xeuxdev", url: "https://github.com/xeuxdev" }],
  creator: "Xeuxdev",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://xeuxdev.com",
    title: "Xeuxdev | Frontend Developer",
    description:
      "Frontend Developer specializing in AI, Fintech, and Web3. Building pixel-perfect, scalable web applications.",
    siteName: "Xeuxdev Portfolio",
    images: [
      {
        url: "/og-image.png", // User needs to provide this
        width: 1200,
        height: 630,
        alt: "Xeuxdev Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xeuxdev | Frontend Developer",
    description:
      "Frontend Developer specializing in AI, Fintech, and Web3. Building pixel-perfect, scalable web applications.",
    images: ["/og-image.png"], // User needs to provide this
    creator: "@xeuxdev", // Placeholder
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // User needs to provide this
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${raleway.variable} antialiased scroll-smooth`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
