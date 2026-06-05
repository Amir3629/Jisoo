import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/data";
import {
  absoluteUrl,
  getBreadcrumbJsonLd,
  getProductJsonLd,
  siteName,
} from "@/lib/seo";

type ProductLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string; lang?: string }>;
};

export async function generateMetadata({
  params,
}: ProductLayoutProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const localePrefix = lang ? `/${lang}` : "";
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: { index: false, follow: true },
    };
  }

  const productUrl = absoluteUrl(`${localePrefix}/product/${product.slug}`);
  const image = product.images[0]?.src
    ? absoluteUrl(product.images[0].src)
    : absoluteUrl("/assets/hero/home-desktop.png");

  return {
    title: `${product.name} Korean Skincare`,
    description: product.shortDescription,
    alternates: {
      canonical: productUrl,
      languages: {
        en: absoluteUrl(`/en/product/${product.slug}`),
        fr: absoluteUrl(`/fr/product/${product.slug}`),
        de: absoluteUrl(`/de/product/${product.slug}`),
        ar: absoluteUrl(`/ar/product/${product.slug}`),
        ko: absoluteUrl(`/ko/product/${product.slug}`),
        tr: absoluteUrl(`/tr/product/${product.slug}`),
      },
    },
    openGraph: {
      title: `${product.name} | ${siteName}`,
      description: product.shortDescription,
      url: productUrl,
      type: "website",
      siteName,
      images: [{ url: image, width: 1200, height: 1200, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${siteName}`,
      description: product.shortDescription,
      images: [image],
    },
  };
}

export default async function ProductLayout({
  children,
  params,
}: ProductLayoutProps) {
  const { slug, lang } = await params;
  const localePrefix = lang ? `/${lang}` : "";
  const product = getProductBySlug(slug);
  const jsonLd = product
    ? [
        getProductJsonLd(product),
        getBreadcrumbJsonLd([
          { name: "Home", url: localePrefix || "/" },
          { name: "Shop", url: `${localePrefix}/shop` },
          {
            name: product.category,
            url: `${localePrefix}/shop/${product.category}`,
          },
          {
            name: product.name,
            url: `${localePrefix}/product/${product.slug}`,
          },
        ]),
      ]
    : [];

  return (
    <>
      {jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
      {children}
    </>
  );
}
