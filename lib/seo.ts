import { products, categories } from "./data";
import { locales } from "./i18n";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.jisoocosmetic.com"
).replace(/\/$/, "");

export const siteName = "JISOO Cosmetic";

export const siteDescription =
  "Shop JISOO Cosmetic Korean skincare rituals, Korean Beauty cleansers, vitamin C serums, toner pads, sunscreen, creams, masks, and daily care formulas for a refined skincare routine.";

export const seoKeywords = [
  "JISOO Cosmetic",
  "JISOO Korean skincare",
  "JISOO Cosmetic Korean Beauty",
  "JISOO skincare store",
  "Korean skincare",
  "Korean Beauty",
  "Korean beauty products",
  "Korean skincare products",
  "Korean beauty ritual",
  "glass skin routine",
  "vitamin C serum",
  "Korean sunscreen",
  "Korean cleanser",
  "toner pads",
  "barrier cream",
  "moisturizer",
  "sheet mask",
  "Dubai Korean skincare",
  "Europe Korean skincare",
  "Canada Korean skincare",
];

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    alternateName: ["JISOO Korean Skincare", "JISOO Cosmetic Korean Beauty"],
    url: siteUrl,
    logo: absoluteUrl("/assets/LOGO/image.png"),
    image: absoluteUrl("/assets/hero/home-desktop.png"),
    sameAs: [
      "https://www.instagram.com/",
      "https://www.tiktok.com/",
      "https://www.pinterest.com/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: [
        "English",
        "French",
        "German",
        "Arabic",
        "Korean",
        "Turkish",
      ],
      url: absoluteUrl("/help/contact"),
    },
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    alternateName: "JISOO Cosmetic Korean skincare store",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function getProductJsonLd(product: (typeof products)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((image) => absoluteUrl(image.src)),
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    sku: product.id,
    category: product.category,
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/product/${product.slug}`),
      priceCurrency: product.currency,
      price: product.price > 0 ? product.price.toFixed(2) : undefined,
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1),
      )
        .toISOString()
        .slice(0, 10),
      availability:
        product.price > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

export function getSitemapPaths() {
  const staticPaths = [
    "",
    "/shop",
    "/shop/new-arrivals",
    "/shop/best-sellers",
    "/shop/sets",
    "/new",
    "/best-sellers",
    "/our-story",
    "/about",
    "/about/sustainability",
    "/tips",
    "/help",
    "/help/faq",
    "/help/contact",
    "/help/shipping",
    "/help/returns",
    "/legal/privacy",
    "/legal/terms",
    "/legal/cookies",
    "/legal/accessibility",
    "/legal/shipping",
    "/legal/returns",
    "/press",
    "/careers",
    "/gift-cards",
  ];

  const categoryPaths = categories.flatMap((category) => [
    `/shop/${category.slug}`,
    ...(category.subcategories?.map(
      (subcategory) => `/shop/${subcategory.slug}`,
    ) ?? []),
  ]);
  const productPaths = products.map((product) => `/product/${product.slug}`);
  const localizedStaticPaths = locales.flatMap((locale) =>
    staticPaths.map((path) => `/${locale}${path}`),
  );
  const localizedProductPaths = locales.flatMap((locale) =>
    productPaths.map((path) => `/${locale}${path}`),
  );
  const localizedCategoryPaths = locales.flatMap((locale) =>
    categoryPaths.map((path) => `/${locale}${path}`),
  );

  return [
    ...staticPaths,
    ...categoryPaths,
    ...productPaths,
    ...localizedStaticPaths,
    ...localizedCategoryPaths,
    ...localizedProductPaths,
  ];
}

export function getBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : absoluteUrl(item.url),
    })),
  };
}

export function getFaqJsonLd(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
