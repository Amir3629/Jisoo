import type { Metadata } from "next";
import { CartProvider } from "@/components/providers/cart-provider";
import { RegionProvider } from "@/components/providers/region-provider";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { LocaleHtmlSync } from "@/components/i18n/locale-html-sync";
import { assertLocale, getDictionary, getDirection, locales } from "@/lib/i18n";
import { absoluteUrl, seoKeywords, siteDescription, siteName } from "@/lib/seo";

const localeMetadata = {
  en: {
    title: "JISOO Cosmetic | Korean Skincare & Korean Beauty Rituals",
    description: siteDescription,
  },
  fr: {
    title: "JISOO Cosmetic | Soins coréens et Korean Beauty",
    description:
      "Découvrez JISOO Cosmetic, une boutique de soins coréens et Korean Beauty avec nettoyants, sérums, protections solaires, crèmes et routines quotidiennes.",
  },
  de: {
    title: "JISOO Cosmetic | Koreanische Hautpflege und Korean Beauty",
    description:
      "Entdecke JISOO Cosmetic für koreanische Hautpflege, Korean Beauty Routinen, Seren, Sonnenschutz, Cremes und tägliche Pflege.",
  },
  ar: {
    title: "JISOO Cosmetic | عناية كورية بالبشرة وجمال كوري",
    description:
      "اكتشفي JISOO Cosmetic للعناية الكورية بالبشرة وروتين الجمال الكوري مع منظفات وسيرومات وواقي شمس وكريمات مختارة.",
  },
  ko: {
    title: "JISOO Cosmetic | 한국 스킨케어와 한국 뷰티 리추얼",
    description:
      "JISOO Cosmetic에서 한국 스킨케어 루틴, 세럼, 선케어, 크림, 마스크와 데일리 케어 제품을 만나보세요.",
  },
  tr: {
    title: "JISOO Cosmetic | Kore cilt bakımı ve Korean Beauty",
    description:
      "JISOO Cosmetic ile Kore cilt bakımı, Korean Beauty rutinleri, serumlar, güneş kremleri, kremler ve günlük bakım ürünlerini keşfedin.",
  },
} satisfies Record<
  (typeof locales)[number],
  { title: string; description: string }
>;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = assertLocale(lang);
  const copy = localeMetadata[locale];

  return {
    title: copy.title,
    description: copy.description,
    keywords: seoKeywords,
    alternates: {
      canonical: absoluteUrl(`/${locale}`),
      languages: Object.fromEntries(
        locales.map((item) => [item, absoluteUrl(`/${item}`)]),
      ),
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: absoluteUrl(`/${locale}`),
      siteName,
      locale,
      images: [
        {
          url: absoluteUrl("/assets/hero/home-desktop.png"),
          width: 1200,
          height: 630,
          alt: "JISOO Cosmetic Korean skincare ritual collection",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [absoluteUrl("/assets/hero/home-desktop.png")],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = assertLocale(lang);
  const dictionary = await getDictionary(locale);
  const dir = getDirection(locale);

  return (
    <LocaleProvider value={{ locale, dictionary, dir }}>
      <LocaleHtmlSync />
      <RegionProvider initialLanguage={locale}>
        <CartProvider>{children}</CartProvider>
      </RegionProvider>
    </LocaleProvider>
  );
}
