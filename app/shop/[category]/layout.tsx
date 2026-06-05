import type { Metadata } from "next";
import { categories } from "@/lib/data";
import {
  absoluteUrl,
  getBreadcrumbJsonLd,
  siteDescription,
  siteName,
} from "@/lib/seo";

type CategoryLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ category: string; lang?: string }>;
};

const allCategories = categories.flatMap((category) => [
  category,
  ...(category.subcategories ?? []),
]);

function getCategoryName(slug: string) {
  return (
    allCategories.find((category) => category.slug === slug)?.name ??
    slug.replace(/-/g, " ")
  );
}

export async function generateMetadata({
  params,
}: CategoryLayoutProps): Promise<Metadata> {
  const { category, lang } = await params;
  const localePrefix = lang ? `/${lang}` : "";
  const name = getCategoryName(category);
  const url = absoluteUrl(`${localePrefix}/shop/${category}`);
  const title = `${name} Korean Skincare | ${siteName}`;
  const description = `Shop JISOO Cosmetic ${name} products curated for Korean Beauty routines, skin comfort, and everyday skincare rituals.`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: absoluteUrl(`/en/shop/${category}`),
        fr: absoluteUrl(`/fr/shop/${category}`),
        de: absoluteUrl(`/de/shop/${category}`),
        ar: absoluteUrl(`/ar/shop/${category}`),
        ko: absoluteUrl(`/ko/shop/${category}`),
        tr: absoluteUrl(`/tr/shop/${category}`),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [
        {
          url: absoluteUrl("/assets/hero/home-desktop.png"),
          width: 1200,
          height: 630,
          alt: `${name} products from JISOO Cosmetic`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: siteDescription,
      images: [absoluteUrl("/assets/hero/home-desktop.png")],
    },
  };
}

export default async function CategoryLayout({
  children,
  params,
}: CategoryLayoutProps) {
  const { category, lang } = await params;
  const localePrefix = lang ? `/${lang}` : "";
  const name = getCategoryName(category);
  const breadcrumb = getBreadcrumbJsonLd([
    { name: "Home", url: localePrefix || "/" },
    { name: "Shop", url: `${localePrefix}/shop` },
    { name, url: `${localePrefix}/shop/${category}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {children}
    </>
  );
}
