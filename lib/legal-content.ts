import type { Locale } from '@/lib/i18n'

export type LegalSlug = 'privacy' | 'terms' | 'cookies' | 'accessibility'

export type LegalSection = {
  title: string
  body: string[]
}

export type LegalDocument = {
  title: string
  eyebrow: string
  summary: string
  updated: string
  regionNotice: string
  sections: LegalSection[]
}

const updated = 'May 11, 2026'

const commonRegions = {
  en: 'JISOO supports region-aware experiences for the United Arab Emirates, Europe, Canada, and Turkey. Product availability, currency, tax display, payment methods, shipping rules, returns, and customer rights may vary by selected region.',
  fr: 'JISOO adapte l’expérience par région pour les Émirats arabes unis, l’Europe, le Canada et la Turquie. Disponibilité, devise, taxes, paiement, livraison, retours et droits clients peuvent varier selon la région sélectionnée.',
  de: 'JISOO nutzt regionabhängige Erlebnisse für die Vereinigten Arabischen Emirate, Europa, Kanada und die Türkei. Verfügbarkeit, Währung, Steuern, Zahlarten, Versand, Rückgaben und Kundenrechte können je Region abweichen.',
  ko: 'JISOO는 아랍에미리트, 유럽, 캐나다, 터키에 맞춘 지역별 경험을 제공합니다. 상품 제공, 통화, 세금 표시, 결제 수단, 배송, 반품, 고객 권리는 선택 지역에 따라 달라질 수 있습니다.',
  ar: 'تقدم JISOO تجربة مخصصة للمنطقة في الإمارات العربية المتحدة وأوروبا وكندا وتركيا. قد تختلف المنتجات والعملة والضرائب وطرق الدفع والشحن والإرجاع وحقوق العملاء حسب المنطقة المختارة.',
  tr: 'JISOO Birleşik Arap Emirlikleri, Avrupa, Kanada ve Türkiye için bölgeye duyarlı deneyimler sunar. Ürün uygunluğu, para birimi, vergi gösterimi, ödeme, kargo, iade ve müşteri hakları seçilen bölgeye göre değişebilir.',
} satisfies Record<Locale, string>

const en: Record<LegalSlug, LegalDocument> = {
  privacy: {
    title: 'Privacy Policy',
    eyebrow: 'Legal care',
    updated,
    summary: 'This policy explains how JISOO collects, uses, shares, stores, and protects information across shopping, account, AI concierge, region, newsletter, support, and review experiences.',
    regionNotice: commonRegions.en,
    sections: [
      { title: 'Information we collect', body: ['We collect account details such as name, email, password credentials, addresses, wishlist items, region, language, and communication preferences.', 'When you place or attempt an order, we process cart contents, product choices, shipping details, billing details, payment authorization status, refund records, fraud-prevention signals, and customer-service notes.', 'When you use the AI concierge, search, reviews, quizzes, or support tools, we may process your messages, skin concerns you choose to share, product preferences, region availability questions, and interaction logs needed to provide the service.'] },
      { title: 'How we use information', body: ['We use information to operate the storefront, personalize region-aware catalog visibility, process orders, provide customer support, prevent fraud, manage returns, improve product recommendations, and send service messages.', 'With your consent or where permitted by law, we use email or SMS for product launches, routine notes, offers, survey requests, and loyalty updates. You can opt out of marketing without losing access to essential order messages.', 'We analyze aggregated behavior to improve navigation, accessibility, performance, translation quality, product data, and stock planning.'] },
      { title: 'Region and legal bases', body: ['For Europe and other GDPR-style regions, our legal bases may include contract performance, consent, legitimate interests, legal obligations, and vital security interests where applicable.', 'For Canada, we use personal information for identified purposes and rely on consent, contractual necessity, legal obligations, and reasonable business purposes.', 'For the UAE, Turkey, and other supported regions, we follow applicable data protection, e-commerce, consumer, and record-keeping requirements and adjust local notices where required.'] },
      { title: 'Sharing and processors', body: ['We share data only with service providers needed to run JISOO: hosting, analytics, payments, fraud screening, shipping, warehouse, customer support, translation, email, review moderation, and compliance tools.', 'Payment card details are handled by payment processors and are not stored as full card numbers by JISOO. Shipping carriers receive the information needed to deliver orders.', 'We may disclose information if required by law, to protect customers and the service, or in connection with a business transfer subject to appropriate safeguards.'] },
      { title: 'Retention and security', body: ['We keep information only as long as needed for orders, warranties, returns, tax and accounting records, fraud prevention, legal claims, customer support, and product safety duties.', 'Security measures include access controls, encryption in transit, environment separation, logging, vendor review, and limited staff access based on role. No online system is risk-free, so we also monitor and improve controls over time.'] },
      { title: 'Your choices and rights', body: ['Depending on your region, you may request access, correction, deletion, portability, restriction, objection, consent withdrawal, or review of automated decisions. Some rights may be limited by fraud prevention, order records, tax, legal, or safety obligations.', 'You can update account details, unsubscribe from marketing, change region/language settings, and contact support for privacy requests. We may need to verify your identity before completing a request.'] },
      { title: 'Children, sensitive data, and AI', body: ['JISOO is not intended for children under the age required by local law. We do not knowingly sell children’s personal information.', 'Do not send medical diagnoses, highly sensitive health data, or emergency requests to the AI concierge. The concierge provides product and routine guidance, not medical advice.'] },
      { title: 'Contact', body: ['For privacy questions, data requests, or regional concerns, contact JISOO support through the help center. We will route the request according to your selected region and applicable law.'] },
    ],
  },
  terms: {
    title: 'Terms of Service',
    eyebrow: 'Store terms',
    updated,
    summary: 'These terms govern browsing, account use, AI concierge features, product information, orders, payments, shipping, returns, and region-specific availability on JISOO.',
    regionNotice: commonRegions.en,
    sections: [
      { title: 'Using JISOO', body: ['You agree to use JISOO lawfully, provide accurate account and order information, protect your login credentials, and avoid interfering with the operation, security, content, pricing, or inventory systems.', 'We may suspend access, cancel orders, or refuse service when behavior appears fraudulent, abusive, unlawful, automated at scale, or harmful to customers, partners, or the platform.'] },
      { title: 'Products and content', body: ['Product descriptions, images, ingredients, availability, pricing, promotions, and region labels are provided for shopping guidance and may change. We try to keep them accurate, but errors can occur.', 'Skin care and beauty information is not medical advice. Patch testing, ingredient review, and professional advice are recommended where you have allergies, medical conditions, pregnancy-related concerns, medication interactions, or severe reactions.'] },
      { title: 'Orders, payments, and taxes', body: ['An order is accepted only when confirmed by JISOO. Items in a cart are not reserved until checkout is complete. We may reject or cancel orders due to stock, pricing errors, payment failure, fraud risk, address issues, regional restrictions, or compliance requirements.', 'Prices, currency, VAT/GST/sales tax display, duties, shipping fees, and payment methods vary by region. Your bank or payment provider may apply separate fees.'] },
      { title: 'Shipping, returns, and regional rights', body: ['Shipping times are estimates and may be affected by carrier delays, customs, weather, address checks, or local restrictions. Risk may transfer according to the applicable checkout terms and consumer law.', 'Returns, exchanges, cancellation rights, cooling-off periods, hygiene exclusions, damaged item processes, and refund timing vary by region and product type. Where local consumer law gives stronger rights, those rights apply.'] },
      { title: 'Accounts, reviews, and community', body: ['You are responsible for activity under your account. Reviews and community content must be truthful, respectful, relevant, and free from unlawful, misleading, medical, defamatory, or infringing content.', 'We may moderate, translate, refuse, or remove content to protect customers, comply with law, or keep the experience useful.'] },
      { title: 'AI concierge and recommendations', body: ['The AI concierge provides general beauty guidance from catalog and routine context. It may be incomplete or incorrect, and you should confirm ingredients, regional availability, and product suitability before purchase.', 'Do not rely on AI output for medical diagnosis, urgent care, or treatment. Stop using a product and seek appropriate professional help if you experience a serious reaction.'] },
      { title: 'Liability and changes', body: ['To the extent permitted by law, JISOO is not responsible for indirect losses, unavailable features, third-party services, or issues outside our reasonable control. Nothing in these terms limits rights that cannot be limited under local law.', 'We may update these terms as the platform, regions, products, or laws change. Continued use after an update means the updated terms apply.'] },
      { title: 'Contact', body: ['For order, region, or terms questions, contact JISOO support through the help center.'] },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    eyebrow: 'Preferences and tracking',
    updated,
    summary: 'This policy explains how JISOO uses cookies, pixels, local storage, and similar technologies to operate the storefront, remember choices, measure performance, and personalize content.',
    regionNotice: commonRegions.en,
    sections: [
      { title: 'What cookies do', body: ['Cookies and similar technologies help the site remember language, region, cart, account session, consent choices, recently viewed products, search behavior, and display preferences.', 'Some technologies are placed by JISOO and others by trusted providers such as hosting, analytics, payment, security, marketing, review, or customer-support tools.'] },
      { title: 'Categories', body: ['Strictly necessary technologies keep the site secure and functional, including login, cart, checkout, region routing, fraud prevention, consent storage, and load balancing.', 'Performance and analytics technologies help us understand page speed, errors, device types, navigation paths, product interest, and feature quality.', 'Preference technologies remember language, region, currency, display choices, and saved experience settings.', 'Marketing technologies may measure campaigns, limit ad repetition, understand product interest, and personalize offers where allowed.'] },
      { title: 'Consent and region differences', body: ['In regions requiring consent for non-essential cookies, we ask before using analytics or marketing technologies and let you change choices later.', 'In other regions, we provide notice and opt-out choices where required. Essential technologies remain active because the storefront cannot operate without them.'] },
      { title: 'Managing cookies', body: ['You can adjust browser settings to block or delete cookies, but checkout, cart, region, and account features may break or become less reliable.', 'You can also use platform or device privacy controls for advertising identifiers where available.'] },
      { title: 'Retention', body: ['Session cookies expire when the browser session ends. Persistent cookies remain for the period needed for their purpose, unless you delete them earlier or withdraw consent where applicable.'] },
      { title: 'Updates', body: ['We update this policy when we add or change technologies, regions, providers, or consent tools.'] },
    ],
  },
  accessibility: {
    title: 'Accessibility Statement',
    eyebrow: 'Inclusive experience',
    updated,
    summary: 'JISOO is committed to making the storefront, account, help, and beauty guidance experiences usable for customers across devices, languages, input methods, and assistive technologies.',
    regionNotice: commonRegions.en,
    sections: [
      { title: 'Our standard', body: ['We aim to align with WCAG 2.2 AA principles: perceivable content, operable controls, understandable flows, and robust markup. Accessibility is treated as an ongoing product responsibility, not a one-time checklist.', 'We design for keyboard navigation, screen reader labels, visible focus states, sufficient contrast, responsive layouts, reduced motion where possible, and clear form errors.'] },
      { title: 'Current coverage', body: ['Core areas include homepage navigation, product listings, product cards, cart, checkout, account pages, region and language menus, search, help pages, and AI concierge controls.', 'We review interactive components such as menus, modals, drawers, sliders, region selectors, language switchers, carousels, and review marquees for focus management and semantic labels.'] },
      { title: 'Known limitations', body: ['Some editorial visuals, generated campaign imagery, third-party embeds, translated text, and experimental testing controls may need continued refinement. We prioritize issues that block purchasing, account access, customer support, or legal information.', 'Motion-heavy sections are designed to be decorative. If motion causes discomfort, browser or operating-system reduced-motion settings should reduce nonessential animation where supported.'] },
      { title: 'Regional and language access', body: ['We support multiple locales and RTL layout for Arabic. Translations are reviewed over time to improve clarity, legal meaning, product accuracy, and accessibility labels.', 'If a translation is unclear, the English version may be used for operational interpretation while we correct the localized copy.'] },
      { title: 'Feedback and support', body: ['If you find an accessibility barrier, include the page URL, device, browser, assistive technology if any, and what you were trying to do. We will prioritize fixes that affect core shopping and support tasks.', 'Support can help with order access, policy information, product guidance, and alternate ways to complete a request while a technical issue is reviewed.'] },
    ],
  },
}

const titleTranslations: Record<Locale, Partial<Record<LegalSlug, string>>> = {
  en: {},
  fr: { privacy: 'Politique de confidentialité', terms: 'Conditions de service', cookies: 'Politique cookies', accessibility: 'Déclaration d’accessibilité' },
  de: { privacy: 'Datenschutz', terms: 'Nutzungsbedingungen', cookies: 'Cookie-Richtlinie', accessibility: 'Barrierefreiheitserklärung' },
  ko: { privacy: '개인정보 처리방침', terms: '이용약관', cookies: '쿠키 정책', accessibility: '접근성 안내' },
  ar: { privacy: 'سياسة الخصوصية', terms: 'شروط الخدمة', cookies: 'سياسة ملفات الارتباط', accessibility: 'بيان إمكانية الوصول' },
  tr: { privacy: 'Gizlilik Politikası', terms: 'Hizmet Şartları', cookies: 'Çerez Politikası', accessibility: 'Erişilebilirlik Bildirimi' },
}

const uiTranslations: Record<Locale, { updated: string; region: string; contact: string; home: string; disclaimer: string }> = {
  en: { updated: 'Last updated', region: 'Regional notice', contact: 'Contact Support', home: 'Back to Home', disclaimer: 'This content is a practical website policy draft and should be reviewed by qualified counsel before publication as final legal advice.' },
  fr: { updated: 'Dernière mise à jour', region: 'Note régionale', contact: 'Contacter le support', home: 'Retour à l’accueil', disclaimer: 'Ce contenu est une base pratique de politique de site et doit être relu par un conseil qualifié avant publication finale.' },
  de: { updated: 'Zuletzt aktualisiert', region: 'Regionaler Hinweis', contact: 'Support kontaktieren', home: 'Zur Startseite', disclaimer: 'Dieser Inhalt ist ein praktischer Richtlinienentwurf und sollte vor endgültiger Veröffentlichung rechtlich geprüft werden.' },
  ko: { updated: '마지막 업데이트', region: '지역 안내', contact: '지원 문의', home: '홈으로 돌아가기', disclaimer: '이 내용은 웹사이트 정책 초안이며 최종 법적 고지로 게시하기 전에 전문가 검토가 필요합니다.' },
  ar: { updated: 'آخر تحديث', region: 'إشعار إقليمي', contact: 'اتصل بالدعم', home: 'العودة للرئيسية', disclaimer: 'هذا المحتوى مسودة عملية لسياسات الموقع ويجب مراجعته قانونيًا قبل نشره كنص نهائي.' },
  tr: { updated: 'Son güncelleme', region: 'Bölgesel not', contact: 'Destekle iletişime geç', home: 'Ana sayfaya dön', disclaimer: 'Bu içerik pratik bir web sitesi politika taslağıdır ve nihai hukuki metin olarak yayımlanmadan önce uzman hukuk incelemesi gerektirir.' },
}

export function isLegalSlug(value: string): value is LegalSlug {
  return value === 'privacy' || value === 'terms' || value === 'cookies' || value === 'accessibility'
}

export function getLegalDocument(slug: string, locale: Locale = 'en') {
  const legalSlug = isLegalSlug(slug) ? slug : 'privacy'
  const base = en[legalSlug]
  return {
    slug: legalSlug,
    document: {
      ...base,
      title: titleTranslations[locale][legalSlug] ?? base.title,
      regionNotice: commonRegions[locale],
    },
    ui: uiTranslations[locale],
  }
}
