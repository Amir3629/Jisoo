import type { Metadata } from "next";
import { absoluteUrl, siteName } from "@/lib/seo";
import { getLegalDocument, isLegalSlug } from "@/lib/legal-content";

type LegalLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug?: string; lang?: string }>;
};

export async function generateMetadata({
  params,
}: LegalLayoutProps): Promise<Metadata> {
  const { slug = "privacy", lang } = await params;
  const localePrefix = lang ? `/${lang}` : "";
  const legalSlug = isLegalSlug(slug) ? slug : "privacy";
  const { document } = getLegalDocument(legalSlug, "en");
  const url = absoluteUrl(`${localePrefix}/legal/${legalSlug}`);

  return {
    title: `${document.title} | ${siteName}`,
    description: document.summary,
    alternates: {
      canonical: url,
      languages: {
        en: absoluteUrl(`/en/legal/${legalSlug}`),
        fr: absoluteUrl(`/fr/legal/${legalSlug}`),
        de: absoluteUrl(`/de/legal/${legalSlug}`),
        ar: absoluteUrl(`/ar/legal/${legalSlug}`),
        ko: absoluteUrl(`/ko/legal/${legalSlug}`),
        tr: absoluteUrl(`/tr/legal/${legalSlug}`),
      },
    },
    openGraph: {
      title: `${document.title} | ${siteName}`,
      description: document.summary,
      url,
      siteName,
    },
  };
}

export default function LegalLayout({ children }: LegalLayoutProps) {
  return children;
}
