"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Instagram, Facebook, Send } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/providers/locale-provider";
import { localizeHref } from "@/lib/i18n";
import { getLegalDocument, type LegalSlug } from "@/lib/legal-content";

const footerLinks = {
  shop: [
    { label: "Skincare", href: "/shop/skincare" },
    { label: "Makeup", href: "/shop/makeup" },
    { label: "Best Sellers", href: "/shop/best-sellers" },
    { label: "New Arrivals", href: "/shop/new-arrivals" },
    { label: "Gift Sets", href: "/shop/sets" },
    { label: "Gift Cards", href: "/gift-cards" },
  ],
  help: [
    { label: "Contact Us", href: "/help/contact" },
    { label: "FAQs", href: "/help/faq" },
    { label: "Shipping Info", href: "/help/shipping" },
    { label: "Returns & Exchanges", href: "/help/returns" },
    { label: "Track Order", href: "/account/orders" },
  ],
  company: [
    { label: "Our Story", href: "/about" },
    { label: "Korean Partners", href: "/about#partners" },
    { label: "Sustainability", href: "/about/sustainability" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Cookie Policy", href: "/legal/cookies" },
    { label: "Shipping Policy", href: "/legal/shipping" },
    { label: "Return & Refund Policy", href: "/legal/returns" },
    { label: "Accessibility", href: "/legal/accessibility" },
  ],
};

function TiktokFooterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.35h-3.17v12.29a2.9 2.9 0 1 1-2-2.75V8.66a6.06 6.06 0 1 0 6.17 6.05V8.62a8.14 8.14 0 0 0 4.77 1.54V7.02a4.8 4.8 0 0 1-2-.33z" />
    </svg>
  );
}

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: TiktokFooterIcon, href: "https://tiktok.com", label: "TikTok" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [openLegal, setOpenLegal] = useState<string | null>(null);
  const { locale, dictionary } = useLocale();
  const t = dictionary.home;
  const brandBody =
    locale === "ar"
      ? "نقدم أفضل منتجات الجمال الكوري للعالم بعناية."
      : locale === "fr"
        ? "Nous sélectionnons le meilleur de la beauté coréenne pour le monde."
        : locale === "de"
          ? "Wir kuratieren die beste koreanische Beauty für die Welt."
          : locale === "ko"
            ? "프리미엄 한국 뷰티를 전 세계에 전합니다."
            : locale === "tr"
              ? "Dünyaya en iyi Kore güzellik ürünlerini özenle sunuyoruz."
              : "Curated Korean skincare and makeup from trusted Seoul partners, localized for each region we serve.";
  const rights =
    locale === "ar"
      ? "جميع الحقوق محفوظة."
      : locale === "fr"
        ? "Tous droits réservés."
        : locale === "de"
          ? "Alle Rechte vorbehalten."
          : locale === "ko"
            ? "모든 권리 보유."
            : locale === "tr"
              ? "Tüm hakları saklıdır."
              : "All rights reserved.";
  const madeWithCare =
    locale === "ar"
      ? "صُنع بعناية من سيول إلى العالم"
      : locale === "fr"
        ? "Conçu avec soin de Séoul au monde"
        : locale === "de"
          ? "Mit Sorgfalt von Seoul in die Welt"
          : locale === "ko"
            ? "서울에서 세계로, 정성으로"
            : locale === "tr"
              ? "Seul’den dünyaya özenle"
              : "Made with care from Seoul to the world";
  const localizedLink = (label: string) =>
    locale === "ar"
      ? ({
          Skincare: "العناية بالبشرة",
          Makeup: "المكياج",
          "Best Sellers": "الأكثر مبيعًا",
          "New Arrivals": "وصل حديثًا",
          "Gift Sets": "مجموعات هدايا",
          "Gift Cards": "بطاقات هدايا",
          "Contact Us": "اتصل بنا",
          FAQs: "الأسئلة الشائعة",
          "Shipping Info": "معلومات الشحن",
          "Returns & Exchanges": "الإرجاع والاستبدال",
          "Track Order": "تتبع الطلب",
          "Tips & Care": "نصائح وعناية",
          "Our Story": "قصتنا",
          "Korean Partners": "شركاء كوريون",
          Sustainability: "الاستدامة",
          Careers: "الوظائف",
          Press: "الصحافة",
          "Privacy Policy": "سياسة الخصوصية",
          "Terms of Service": "شروط الخدمة",
          "Cookie Policy": "سياسة ملفات الارتباط",
          "Shipping Policy": "سياسة الشحن",
          "Return & Refund Policy": "سياسة الإرجاع والاسترداد",
          Accessibility: "إمكانية الوصول",
        }[label] ?? label)
      : locale === "fr"
        ? ({
            Skincare: "Soin",
            Makeup: "Maquillage",
            "Best Sellers": "Meilleures ventes",
            "New Arrivals": "Nouveautés",
            "Gift Sets": "Coffrets cadeaux",
            "Gift Cards": "Cartes cadeaux",
            "Contact Us": "Contactez-nous",
            FAQs: "FAQ",
            "Shipping Info": "Infos livraison",
            "Returns & Exchanges": "Retours & Échanges",
            "Track Order": "Suivre la commande",
            "Tips & Care": "Conseils & Soin",
            "Korean Partners": "Partenaires coréens",
            Sustainability: "Durabilité",
            Careers: "Carrières",
            Press: "Presse",
            "Privacy Policy": "Politique de confidentialité",
            "Terms of Service": "Conditions de service",
            "Cookie Policy": "Politique cookies",
            "Shipping Policy": "Politique de livraison",
            "Return & Refund Policy": "Retours et remboursements",
            Accessibility: "Accessibilité",
          }[label] ?? label)
        : locale === "de"
          ? ({
              Skincare: "Hautpflege",
              Makeup: "Make-up",
              "Best Sellers": "Bestseller",
              "New Arrivals": "Neuheiten",
              "Gift Sets": "Geschenksets",
              "Gift Cards": "Geschenkkarten",
              "Contact Us": "Kontakt",
              FAQs: "FAQ",
              "Shipping Info": "Versandinfo",
              "Returns & Exchanges": "Rückgabe & Umtausch",
              "Track Order": "Bestellung verfolgen",
              "Tips & Care": "Tipps & Pflege",
              "Our Story": "Unsere Geschichte",
              "Korean Partners": "Koreanische Partner",
              Sustainability: "Nachhaltigkeit",
              Careers: "Karriere",
              Press: "Presse",
              "Privacy Policy": "Datenschutz",
              "Terms of Service": "Nutzungsbedingungen",
              "Cookie Policy": "Cookie-Richtlinie",
              "Shipping Policy": "Versandrichtlinie",
              "Return & Refund Policy": "Rückgabe und Erstattung",
              Accessibility: "Barrierefreiheit",
            }[label] ?? label)
          : locale === "ko"
            ? ({
                Skincare: "스킨케어",
                Makeup: "메이크업",
                "Best Sellers": "베스트셀러",
                "New Arrivals": "신상품",
                "Gift Sets": "기프트 세트",
                "Gift Cards": "기프트 카드",
                "Contact Us": "문의하기",
                FAQs: "자주 묻는 질문",
                "Shipping Info": "배송 정보",
                "Returns & Exchanges": "반품 및 교환",
                "Track Order": "주문 추적",
                "Tips & Care": "팁 & 케어",
                "Our Story": "브랜드 스토리",
                "Korean Partners": "한국 파트너",
                Sustainability: "지속가능성",
                Careers: "채용",
                Press: "보도자료",
                "Privacy Policy": "개인정보 처리방침",
                "Terms of Service": "이용약관",
                "Cookie Policy": "쿠키 정책",
                "Shipping Policy": "배송 정책",
                "Return & Refund Policy": "반품 및 환불 정책",
                Accessibility: "접근성",
              }[label] ?? label)
            : locale === "tr"
              ? ({
                  Skincare: "Cilt Bakımı",
                  Makeup: "Makyaj",
                  "Best Sellers": "Çok Satanlar",
                  "New Arrivals": "Yeni Gelenler",
                  "Gift Sets": "Hediye Setleri",
                  "Gift Cards": "Hediye Kartları",
                  "Contact Us": "Bize Ulaşın",
                  FAQs: "SSS",
                  "Shipping Info": "Kargo Bilgisi",
                  "Returns & Exchanges": "İade ve Değişim",
                  "Track Order": "Sipariş Takibi",
                  "Tips & Care": "İpuçları ve Bakım",
                  "Our Story": "Hikayemiz",
                  "Korean Partners": "Koreli Ortaklar",
                  Sustainability: "Sürdürülebilirlik",
                  Careers: "Kariyer",
                  Press: "Basın",
                  "Privacy Policy": "Gizlilik Politikası",
                  "Terms of Service": "Hizmet Şartları",
                  "Cookie Policy": "Çerez Politikası",
                  "Shipping Policy": "Kargo Politikası",
                  "Return & Refund Policy": "İade ve geri ödeme",
                  Accessibility: "Erişilebilirlik",
                }[label] ?? label)
              : label;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };
  const legalSlugByLabel: Record<string, LegalSlug> = {
    "Privacy Policy": "privacy",
    "Terms of Service": "terms",
    "Cookie Policy": "cookies",
    "Shipping Policy": "shipping",
    "Return & Refund Policy": "returns",
    Accessibility: "accessibility",
  };
  const openLegalDocument = openLegal
    ? getLegalDocument(legalSlugByLabel[openLegal] ?? "privacy", locale)
        .document
    : null;

  return (
    <footer className="bg-warm-ivory text-charcoal">
      {/* Newsletter Section */}
      <div className="border-b border-[#e8d5de]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h3 className="text-2xl lg:text-3xl font-serif mb-3">
              {dictionary.footer.newsletterTitle}
            </h3>
            <p className="text-charcoal/70 mb-8">
              {dictionary.footer.newsletterBody}
            </p>

            {isSubscribed ? (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[#b79263] font-medium"
              >
                {dictionary.footer.subscribed}
              </motion.p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={dictionary.footer.emailPlaceholder}
                  className={cn(
                    "flex-1 px-5 py-3.5 rounded-full",
                    "bg-white/80 border border-[#e8d4c1]",
                    "text-charcoal placeholder:text-charcoal/45",
                    "focus:outline-none focus:border-[#cfac7f]",
                    "transition-colors duration-300",
                  )}
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={cn(
                    "px-8 py-3.5 rounded-full",
                    "bg-gradient-to-r from-[#cfac7f] to-[#d9bd97] text-white font-medium",
                    "hover:brightness-105 transition-colors",
                    "flex items-center justify-center gap-2",
                  )}
                >
                  <span>{dictionary.footer.subscribe}</span>
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link href={localizeHref("/", locale)} className="inline-block">
              <Image
                src="/assets/LOGO/image.png"
                alt="JISOO"
                width={260}
                height={92}
                className="mb-5 h-20 w-auto"
              />
            </Link>
            <p className="text-charcoal/65 text-sm leading-relaxed mb-6">
              {brandBody}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/70 border border-[#ecd8ca] text-charcoal transition-all duration-300 hover:scale-110 hover:bg-white/85 hover:text-charcoal"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="font-medium text-[#b79263] mb-4 text-sm uppercase tracking-wider">
              {dictionary.common.shop}
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localizeHref(link.href, locale)}
                    className="text-sm text-charcoal/70 hover:text-charcoal transition-colors"
                  >
                    {localizedLink(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-[#b79263] mb-4 text-sm uppercase tracking-wider">
              {dictionary.footer.sections.help}
            </h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localizeHref(link.href, locale)}
                    className="text-sm text-charcoal/70 hover:text-charcoal transition-colors"
                  >
                    {localizedLink(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-[#b79263] mb-4 text-sm uppercase tracking-wider">
              {dictionary.footer.sections.company}
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localizeHref(link.href, locale)}
                    className="text-sm text-charcoal/70 hover:text-charcoal transition-colors"
                  >
                    {link.label === "Our Story"
                      ? t.ourStory
                      : localizedLink(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-[#b79263] mb-4 text-sm uppercase tracking-wider">
              {dictionary.footer.sections.legal}
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localizeHref(link.href, locale)}
                    className="text-sm text-charcoal/70 hover:text-charcoal transition-colors"
                  >
                    {localizedLink(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#e8d5de]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-charcoal/55">
            <p>
              &copy; {new Date().getFullYear()} JISOO Cosmetic. {rights}
            </p>
            <div className="flex items-center gap-6">
              <span>{madeWithCare}</span>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {openLegal && openLegalDocument && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-charcoal/38 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={openLegalDocument.title}
            onClick={() => setOpenLegal(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="max-h-[86vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#d3af84]/35 bg-warm-ivory/96 p-6 shadow-[0_34px_90px_rgba(44,37,40,0.24),inset_0_1px_0_rgba(255,255,255,0.52)] backdrop-blur-xl lg:p-8"
              onClick={(event) => event.stopPropagation()}
              initial={{
                opacity: 0,
                scale: 0.965,
                y: 18,
                filter: "blur(12px)",
              }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.972, y: 12, filter: "blur(10px)" }}
              transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-start justify-between gap-4">
                <h5 className="font-serif text-3xl text-charcoal">
                  {openLegalDocument.title}
                </h5>
                <button
                  type="button"
                  onClick={() => setOpenLegal(null)}
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-rose-mauve to-[#d3af84] px-5 py-2.5 text-sm font-medium text-white shadow-[0_12px_26px_rgba(186,130,154,0.22)] transition-all duration-500 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-mauve/35"
                >
                  Close
                </button>
              </div>
              <p className="mt-4 leading-relaxed text-charcoal/75">
                {openLegalDocument.summary}
              </p>
              <div className="mt-5 space-y-4">
                {openLegalDocument.sections.slice(0, 4).map((section) => (
                  <section key={section.title}>
                    <h6 className="font-semibold text-charcoal">
                      {section.title}
                    </h6>
                    <p className="mt-1 text-sm leading-6 text-charcoal/70">
                      {section.body[0]}
                    </p>
                  </section>
                ))}
              </div>
              <Link
                href={localizeHref(
                  footerLinks.legal.find((link) => link.label === openLegal)
                    ?.href ?? "/legal/privacy",
                  locale,
                )}
                className="mt-6 inline-flex rounded-full bg-gradient-to-r from-rose-mauve to-[#d3af84] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
              >
                Read full policy
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
