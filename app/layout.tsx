import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: { default: "HUMBL Wallpapers", template: "%s · HUMBL Wallpapers" },
  description: "Curated still and live wallpapers from HUMBLE.",
  icons: { icon: "/assets/humbl-main-logo.svg" },
};
export const viewport: Viewport = { themeColor: "#0a0a0b", viewportFit: "cover", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* decide before first paint whether to show the intro, so it never flashes in late */}
        <script dangerouslySetInnerHTML={{ __html: `try{if(sessionStorage.getItem("humbl-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.introSeen="1"}catch(e){}` }} />
      </head>
      <body>
        <a href="#main" className="btn" style={{ position: "absolute", left: -9999 }}>Skip to content</a>
        <div className="scroll-edge" aria-hidden />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
