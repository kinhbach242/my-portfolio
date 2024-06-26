import "./global.css"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Navbar } from "./components/nav"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SandpackCSS } from "./blog/[slug]/sandpack"
import Script from "next/script"

export const metadata: Metadata = {
  metadataBase: new URL("https://kinhdev.id.vn"),
  title: {
    default: "Kinh Bach - Developer",
    template: "%s | Kinh Bach",
  },
  description: "Developer.",
  openGraph: {
    title: "Kinh Bach",
    description: "Developer.",
    url: "https://kinhdev.id.vn",
    siteName: "Kinh Bach",
    locale: "en_US",
    type: "website",
    images: "./opengraph-image.jpg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Kinh Bach",
    card: "summary_large_image",
  },
  verification: {
    google: "eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw",
    yandex: "14d2e73487fa6c71",
  },
}

const cx = (...classes) => classes.filter(Boolean).join(" ")

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-[#111010]",
        GeistSans.variable,
        GeistMono.variable
      )}
      suppressHydrationWarning
    >
      <head>
        <SandpackCSS />
      </head>
      <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
      <Script
        async
        defer
        src="https://tools.luckyorange.com/core/lo.js?site-id=297b4235"
      ></Script>
    </html>
  )
}
