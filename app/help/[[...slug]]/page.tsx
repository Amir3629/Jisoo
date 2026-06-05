import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { absoluteUrl, getFaqJsonLd, siteName } from "@/lib/seo";

const faqCards = [
  {
    icon: "/icons/faq/shopping-bag.png",
    title: "How can I choose the right product?",
    body: "Start with your skin type, main concern, and preferred texture. Product pages show the care focus, routine step, and simple benefits to guide the choice.",
  },
  {
    icon: "/icons/faq/korean-flag.png",
    title: "What makes JISOO Korean beauty inspired?",
    body: "JISOO combines Korean ritual care, soft textures, and modern cosmetic precision for a polished daily routine.",
  },
  {
    icon: "/icons/faq/gold-cup.png",
    title: "What does Best Seller mean?",
    body: "Best Seller highlights selected products that JISOO wants to feature more strongly in the shop experience and product routine.",
  },
];

const helpContent: Record<string, { title: string; description: string }> = {
  root: {
    title: "Help Center",
    description:
      "Explore support resources for shipping, returns, and order assistance. Our beauty concierge team is here to help.",
  },
  contact: {
    title: "Contact JISOO Concierge",
    description:
      "Speak with our team for order support, product guidance, or market-specific availability questions.",
  },
  faq: {
    title: "Frequently Asked Questions",
    description:
      "Helpful answers about choosing products, Korean beauty rituals, and JISOO shopping details.",
  },
  shipping: {
    title: "Shipping Information",
    description:
      "Shipping timelines and service levels vary by UAE, EU, and Canada. Final delivery details appear at checkout.",
  },
  returns: {
    title: "Returns & Exchanges",
    description:
      "Review our return policy guidance and contact support for region-specific return handling and compliance needs.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[]; lang?: string }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const localePrefix = lang ? `/${lang}` : "";
  const key = slug?.[0] ?? "root";
  const content = helpContent[key] ?? helpContent.root;
  const path = key === "root" ? "/help" : `/help/${key}`;

  return {
    title: `${content.title} | ${siteName}`,
    description: content.description,
    alternates: {
      canonical: absoluteUrl(`${localePrefix}${path}`),
      languages: {
        en: absoluteUrl(`/en${path}`),
        fr: absoluteUrl(`/fr${path}`),
        de: absoluteUrl(`/de${path}`),
        ar: absoluteUrl(`/ar${path}`),
        ko: absoluteUrl(`/ko${path}`),
        tr: absoluteUrl(`/tr${path}`),
      },
    },
    openGraph: {
      title: `${content.title} | ${siteName}`,
      description: content.description,
      url: absoluteUrl(`${localePrefix}${path}`),
      siteName,
      images: [
        {
          url: absoluteUrl("/assets/hero/home-desktop.png"),
          width: 1200,
          height: 630,
          alt: "JISOO Cosmetic Korean skincare help center",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${content.title} | ${siteName}`,
      description: content.description,
      images: [absoluteUrl("/assets/hero/home-desktop.png")],
    },
  };
}

function HelpPlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <main className="min-h-screen bg-warm-ivory">
      <Header />
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="max-w-3xl mx-auto px-4 lg:px-6 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.26em] text-rose-mauve">
            JISOO Experience
          </p>
          <h1 className="mb-5 font-serif text-4xl text-charcoal lg:text-5xl">
            {title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/help/contact"
              className="rounded-full bg-gradient-to-r from-rose-mauve to-[#d3af84] px-6 py-3 text-sm font-medium text-white transition-all hover:brightness-105"
            >
              Contact Support
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-blush-pink px-6 py-3 text-sm font-medium text-charcoal transition-all hover:border-rose-mauve"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function FaqPage() {
  return (
    <main className="min-h-screen bg-warm-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getFaqJsonLd(
              faqCards.map((card) => ({
                question: card.title,
                answer: card.body,
              })),
            ),
          ),
        }}
      />
      <Header />
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-nude-beige/70 to-transparent"
        />
        <div className="relative mx-auto max-w-6xl px-4 lg:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-rose-mauve">
              JISOO Concierge
            </p>
            <h1 className="font-serif text-4xl font-medium text-charcoal lg:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-charcoal/65">
              Simple answers for product choice, JISOO rituals, and shopping
              details.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {faqCards.map((card) => (
              <article
                key={card.title}
                className="group relative overflow-hidden rounded-[2rem] border border-blush-pink/35 bg-nude-beige/55 p-7 shadow-[0_18px_60px_rgba(79,54,60,0.08)] transition duration-300 hover:-translate-y-1 hover:border-rose-mauve/35 hover:bg-nude-beige/70"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/35 blur-2xl"
                />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-warm-ivory/80 shadow-sm ring-1 ring-blush-pink/30">
                  <Image
                    src={card.icon}
                    alt=""
                    width={42}
                    height={42}
                    className="h-10 w-10 object-contain transition duration-300 group-hover:scale-110"
                  />
                </div>
                <h2 className="relative mt-7 font-serif text-2xl font-semibold leading-tight text-charcoal">
                  {card.title}
                </h2>
                <p className="relative mt-4 text-sm leading-7 text-charcoal/65">
                  {card.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl rounded-[2rem] border border-blush-pink/30 bg-nude-beige/45 px-6 py-8 text-center shadow-[0_18px_60px_rgba(79,54,60,0.06)]">
            <h2 className="font-serif text-2xl font-medium text-charcoal">
              Need a more personal answer?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-charcoal/65">
              Contact the JISOO concierge for product guidance, order questions,
              or region-specific availability.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/help/contact"
                className="rounded-full bg-gradient-to-r from-rose-mauve to-[#d3af84] px-7 py-3 text-sm font-medium text-white transition-all hover:brightness-105"
              >
                Contact Support
              </Link>
              <Link
                href="/shop"
                className="rounded-full border border-blush-pink px-7 py-3 text-sm font-medium text-charcoal transition-all hover:border-rose-mauve"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default async function HelpPage({
  params,
}: {
  params: Promise<{ slug?: string[]; lang?: string }>;
}) {
  const { slug, lang } = await params;
  const localePrefix = lang ? `/${lang}` : "";
  const key = slug?.[0] ?? "root";
  const content = helpContent[key] ?? helpContent.root;

  if (key === "faq") {
    return <FaqPage />;
  }

  return (
    <HelpPlaceholder title={content.title} description={content.description} />
  );
}
