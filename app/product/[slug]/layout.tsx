import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/data";
import { isLocale, type Locale } from "@/lib/i18n";
import {
  localizeProduct,
  localizedProductSeoTitle,
} from "@/lib/product-localization";
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
  const locale: Locale = lang && isLocale(lang) ? lang : "en";
  const localePrefix = lang ? `/${lang}` : "";
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: { index: false, follow: true },
    };
  }

  const localizedProduct = localizeProduct(product, locale);
  const productUrl = absoluteUrl(`${localePrefix}/product/${product.slug}`);
  const image = product.images[0]?.src
    ? absoluteUrl(product.images[0].src)
    : absoluteUrl("/assets/hero/home-desktop.png");

  return {
    title: localizedProductSeoTitle(product, locale),
    description: localizedProduct.shortDescription,
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
      title: `${localizedProduct.name} | ${siteName}`,
      description: localizedProduct.shortDescription,
      url: productUrl,
      type: "website",
      siteName,
      images: [
        { url: image, width: 1200, height: 1200, alt: localizedProduct.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${localizedProduct.name} | ${siteName}`,
      description: localizedProduct.shortDescription,
      images: [image],
    },
  };
}

export default async function ProductLayout({
  children,
  params,
}: ProductLayoutProps) {
  const { slug, lang } = await params;
  const locale: Locale = lang && isLocale(lang) ? lang : "en";
  const localePrefix = lang ? `/${lang}` : "";
  const product = getProductBySlug(slug);
  const localizedProduct = product ? localizeProduct(product, locale) : null;
  const jsonLd = product
    ? [
        getProductJsonLd(product, locale),
        getBreadcrumbJsonLd([
          { name: "Home", url: localePrefix || "/" },
          { name: "Shop", url: `${localePrefix}/shop` },
          {
            name: localizedProduct?.category ?? product.category,
            url: `${localePrefix}/shop/${product.category}`,
          },
          {
            name: localizedProduct?.name ?? product.name,
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
