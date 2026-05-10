import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import GlobalScrollBlur from "@/components/GradualBlur/GlobalScrollBlur";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const passionOne = localFont({
  src: [
    { path: "../../fonts/PassionOne-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../fonts/PassionOne-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../fonts/PassionOne-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-passion-one",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Bump when replacing `public/favicon.png` so browsers pick up the new tab icon. */
const FAVICON_VERSION = "12thico-v5";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1a4336",
};

export const metadata: Metadata = {
  title: {
    default: "12th Fan",
    template: "%s | 12th Fan",
  },
  description: "Experience women's sport together",
  icons: {
    icon: [{ url: `/favicon.png?v=${FAVICON_VERSION}`, type: "image/png", sizes: "320x320" }],
    shortcut: `/favicon.png?v=${FAVICON_VERSION}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${passionOne.variable} ${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased sm:snap-y sm:snap-proximity`}
    >
      <body className="relative z-[1] min-h-full max-w-[100dvw] touch-manipulation overflow-x-clip text-center">
        <div className="relative flex min-h-full min-w-0 max-w-[100dvw] flex-col overflow-x-clip pb-0 sm:pb-[calc(16rem+env(safe-area-inset-bottom,0px))]">
          <SiteHeader />
          <div className="min-w-0 max-sm:bg-transparent max-sm:pt-2 sm:contents">{children}</div>
          <SiteFooter />
          <GlobalScrollBlur />
        </div>
      </body>
    </html>
  );
}
