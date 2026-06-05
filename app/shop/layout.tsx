import type { Metadata } from "next";
import { absoluteUrl, siteDescription, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Shop Korean Skincare Products",
  description:
    "Shop JISOO Cosmetic Korean skincare products including cleansers, toner pads, vitamin C serums, sunscreens, moisturizers, masks, and Korean Beauty care formulas.",
  alternates: {
    canonical: absoluteUrl("/shop"),
  },
  openGraph: {
    title: `Shop Korean Skincare Products | ${siteName}`,
    description: siteDescription,
    url: absoluteUrl("/shop"),
    siteName,
    images: [
      {
        url: absoluteUrl("/assets/hero/home-desktop.png"),
        width: 1200,
        height: 630,
        alt: "JISOO Cosmetic Korean skincare shop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Shop Korean Skincare Products | ${siteName}`,
    description: siteDescription,
    images: [absoluteUrl("/assets/hero/home-desktop.png")],
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
