import type { Locale } from "@/lib/i18n";

export type LegalSlug =
  | "privacy"
  | "terms"
  | "cookies"
  | "accessibility"
  | "shipping"
  | "returns";

export type LegalSection = {
  title: string;
  body: string[];
};

export type LegalDocument = {
  title: string;
  eyebrow: string;
  summary: string;
  updated: string;
  regionNotice: string;
  sections: LegalSection[];
};

const updated = "May 11, 2026";

const commonRegions = {
  en: "JISOO supports region-aware experiences for the United Arab Emirates, Europe, Canada, and Turkey. Product availability, currency, tax display, payment methods, shipping rules, returns, and customer rights may vary by selected region.",
  fr: "JISOO adapte l’expérience par région pour les Émirats arabes unis, l’Europe, le Canada et la Turquie. Disponibilité, devise, taxes, paiement, livraison, retours et droits clients peuvent varier selon la région sélectionnée.",
  de: "JISOO nutzt regionabhängige Erlebnisse für die Vereinigten Arabischen Emirate, Europa, Kanada und die Türkei. Verfügbarkeit, Währung, Steuern, Zahlarten, Versand, Rückgaben und Kundenrechte können je Region abweichen.",
  ko: "JISOO는 아랍에미리트, 유럽, 캐나다, 터키에 맞춘 지역별 경험을 제공합니다. 상품 제공, 통화, 세금 표시, 결제 수단, 배송, 반품, 고객 권리는 선택 지역에 따라 달라질 수 있습니다.",
  ar: "تقدم JISOO تجربة مخصصة للمنطقة في الإمارات العربية المتحدة وأوروبا وكندا وتركيا. قد تختلف المنتجات والعملة والضرائب وطرق الدفع والشحن والإرجاع وحقوق العملاء حسب المنطقة المختارة.",
  tr: "JISOO Birleşik Arap Emirlikleri, Avrupa, Kanada ve Türkiye için bölgeye duyarlı deneyimler sunar. Ürün uygunluğu, para birimi, vergi gösterimi, ödeme, kargo, iade ve müşteri hakları seçilen bölgeye göre değişebilir.",
} satisfies Record<Locale, string>;

const en: Record<LegalSlug, LegalDocument> = {
  privacy: {
    title: "Privacy Policy",
    eyebrow: "Legal care",
    updated,
    summary:
      "This policy explains how JISOO collects, uses, shares, stores, and protects information across shopping, account, AI concierge, region, newsletter, support, and review experiences.",
    regionNotice: commonRegions.en,
    sections: [
      {
        title: "Information we collect",
        body: [
          "We collect account details such as name, email, password credentials, addresses, wishlist items, region, language, and communication preferences.",
          "When you place or attempt an order, we process cart contents, product choices, shipping details, billing details, payment authorization status, refund records, fraud-prevention signals, and customer-service notes.",
          "When you use the AI concierge, search, reviews, quizzes, or support tools, we may process your messages, skin concerns you choose to share, product preferences, region availability questions, and interaction logs needed to provide the service.",
        ],
      },
      {
        title: "How we use information",
        body: [
          "We use information to operate the storefront, personalize region-aware catalog visibility, process orders, provide customer support, prevent fraud, manage returns, improve product recommendations, and send service messages.",
          "With your consent or where permitted by law, we use email or SMS for product launches, routine notes, offers, survey requests, and loyalty updates. You can opt out of marketing without losing access to essential order messages.",
          "We analyze aggregated behavior to improve navigation, accessibility, performance, translation quality, product data, and stock planning.",
        ],
      },
      {
        title: "Region and legal bases",
        body: [
          "For Europe and other GDPR-style regions, our legal bases may include contract performance, consent, legitimate interests, legal obligations, and vital security interests where applicable.",
          "For Canada, we use personal information for identified purposes and rely on consent, contractual necessity, legal obligations, and reasonable business purposes.",
          "For the UAE, Turkey, and other supported regions, we follow applicable data protection, e-commerce, consumer, and record-keeping requirements and adjust local notices where required.",
        ],
      },
      {
        title: "Sharing and processors",
        body: [
          "We share data only with service providers needed to run JISOO: hosting, analytics, payments, fraud screening, shipping, warehouse, customer support, translation, email, review moderation, and compliance tools.",
          "Payment card details are handled by payment processors and are not stored as full card numbers by JISOO. Shipping carriers receive the information needed to deliver orders.",
          "We may disclose information if required by law, to protect customers and the service, or in connection with a business transfer subject to appropriate safeguards.",
        ],
      },
      {
        title: "Retention and security",
        body: [
          "We keep information only as long as needed for orders, warranties, returns, tax and accounting records, fraud prevention, legal claims, customer support, and product safety duties.",
          "Security measures include access controls, encryption in transit, environment separation, logging, vendor review, and limited staff access based on role. No online system is risk-free, so we also monitor and improve controls over time.",
        ],
      },
      {
        title: "Your choices and rights",
        body: [
          "Depending on your region, you may request access, correction, deletion, portability, restriction, objection, consent withdrawal, or review of automated decisions. Some rights may be limited by fraud prevention, order records, tax, legal, or safety obligations.",
          "You can update account details, unsubscribe from marketing, change region/language settings, and contact support for privacy requests. We may need to verify your identity before completing a request.",
        ],
      },
      {
        title: "Children, sensitive data, and AI",
        body: [
          "JISOO is not intended for children under the age required by local law. We do not knowingly sell children’s personal information.",
          "Do not send medical diagnoses, highly sensitive health data, or emergency requests to the AI concierge. The concierge provides product and routine guidance, not medical advice.",
        ],
      },
      {
        title: "Contact",
        body: [
          "For privacy questions, data requests, or regional concerns, contact JISOO support through the help center. We will route the request according to your selected region and applicable law.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    eyebrow: "Store terms",
    updated,
    summary:
      "These terms govern browsing, account use, AI concierge features, product information, orders, payments, shipping, returns, and region-specific availability on JISOO.",
    regionNotice: commonRegions.en,
    sections: [
      {
        title: "Using JISOO",
        body: [
          "You agree to use JISOO lawfully, provide accurate account and order information, protect your login credentials, and avoid interfering with the operation, security, content, pricing, or inventory systems.",
          "We may suspend access, cancel orders, or refuse service when behavior appears fraudulent, abusive, unlawful, automated at scale, or harmful to customers, partners, or the platform.",
        ],
      },
      {
        title: "Products and content",
        body: [
          "Product descriptions, images, ingredients, availability, pricing, promotions, and region labels are provided for shopping guidance and may change. We try to keep them accurate, but errors can occur.",
          "Skin care and beauty information is not medical advice. Patch testing, ingredient review, and professional advice are recommended where you have allergies, medical conditions, pregnancy-related concerns, medication interactions, or severe reactions.",
        ],
      },
      {
        title: "Orders, payments, and taxes",
        body: [
          "An order is accepted only when confirmed by JISOO. Items in a cart are not reserved until checkout is complete. We may reject or cancel orders due to stock, pricing errors, payment failure, fraud risk, address issues, regional restrictions, or compliance requirements.",
          "Prices, currency, VAT/GST/sales tax display, duties, shipping fees, and payment methods vary by region. Your bank or payment provider may apply separate fees.",
        ],
      },
      {
        title: "Shipping, returns, and regional rights",
        body: [
          "Shipping times are estimates and may be affected by carrier delays, customs, weather, address checks, or local restrictions. Risk may transfer according to the applicable checkout terms and consumer law.",
          "Returns, exchanges, cancellation rights, cooling-off periods, hygiene exclusions, damaged item processes, and refund timing vary by region and product type. Where local consumer law gives stronger rights, those rights apply.",
        ],
      },
      {
        title: "Accounts, reviews, and community",
        body: [
          "You are responsible for activity under your account. Reviews and community content must be truthful, respectful, relevant, and free from unlawful, misleading, medical, defamatory, or infringing content.",
          "We may moderate, translate, refuse, or remove content to protect customers, comply with law, or keep the experience useful.",
        ],
      },
      {
        title: "AI concierge and recommendations",
        body: [
          "The AI concierge provides general beauty guidance from catalog and routine context. It may be incomplete or incorrect, and you should confirm ingredients, regional availability, and product suitability before purchase.",
          "Do not rely on AI output for medical diagnosis, urgent care, or treatment. Stop using a product and seek appropriate professional help if you experience a serious reaction.",
        ],
      },
      {
        title: "Liability and changes",
        body: [
          "To the extent permitted by law, JISOO is not responsible for indirect losses, unavailable features, third-party services, or issues outside our reasonable control. Nothing in these terms limits rights that cannot be limited under local law.",
          "We may update these terms as the platform, regions, products, or laws change. Continued use after an update means the updated terms apply.",
        ],
      },
      {
        title: "Contact",
        body: [
          "For order, region, or terms questions, contact JISOO support through the help center.",
        ],
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    eyebrow: "Preferences and tracking",
    updated,
    summary:
      "This policy explains how JISOO uses cookies, pixels, local storage, and similar technologies to operate the storefront, remember choices, measure performance, and personalize content.",
    regionNotice: commonRegions.en,
    sections: [
      {
        title: "What cookies do",
        body: [
          "Cookies and similar technologies help the site remember language, region, cart, account session, consent choices, recently viewed products, search behavior, and display preferences.",
          "Some technologies are placed by JISOO and others by trusted providers such as hosting, analytics, payment, security, marketing, review, or customer-support tools.",
        ],
      },
      {
        title: "Categories",
        body: [
          "Strictly necessary technologies keep the site secure and functional, including login, cart, checkout, region routing, fraud prevention, consent storage, and load balancing.",
          "Performance and analytics technologies help us understand page speed, errors, device types, navigation paths, product interest, and feature quality.",
          "Preference technologies remember language, region, currency, display choices, and saved experience settings.",
          "Marketing technologies may measure campaigns, limit ad repetition, understand product interest, and personalize offers where allowed.",
        ],
      },
      {
        title: "Consent and region differences",
        body: [
          "In regions requiring consent for non-essential cookies, we ask before using analytics or marketing technologies and let you change choices later.",
          "In other regions, we provide notice and opt-out choices where required. Essential technologies remain active because the storefront cannot operate without them.",
        ],
      },
      {
        title: "Managing cookies",
        body: [
          "You can adjust browser settings to block or delete cookies, but checkout, cart, region, and account features may break or become less reliable.",
          "You can also use platform or device privacy controls for advertising identifiers where available.",
        ],
      },
      {
        title: "Retention",
        body: [
          "Session cookies expire when the browser session ends. Persistent cookies remain for the period needed for their purpose, unless you delete them earlier or withdraw consent where applicable.",
        ],
      },
      {
        title: "Updates",
        body: [
          "We update this policy when we add or change technologies, regions, providers, or consent tools.",
        ],
      },
    ],
  },

  shipping: {
    title: "Shipping Policy",
    eyebrow: "Delivery guidance",
    updated,
    summary:
      "This shipping policy explains how JISOO Cosmetic handles delivery options, regional timelines, duties, tracking, and customer support for international skincare orders.",
    regionNotice: commonRegions.en,
    sections: [
      {
        title: "Where we ship",
        body: [
          "JISOO Cosmetic is preparing region-aware shopping experiences for Canada, Europe, Turkey, and the United Arab Emirates. Available destinations, carriers, and service levels may vary at checkout.",
          "Some products may not be available in every region because of supplier, ingredient, import, labeling, or compliance requirements.",
        ],
      },
      {
        title: "Delivery timing and tracking",
        body: [
          "Estimated delivery windows are shown during checkout where available. Timelines can change because of carrier capacity, customs review, address validation, weather, holidays, or local restrictions.",
          "When tracking is available, order updates will be provided through account order history or customer support. TODO: add official carrier names and support contact details before final publication.",
        ],
      },
      {
        title: "Duties, taxes, and delivery issues",
        body: [
          "Taxes, duties, brokerage, and import fees may vary by destination and checkout configuration. The checkout experience should be treated as the source for region-specific totals.",
          "If a parcel appears delayed, damaged, or missing, contact JISOO Cosmetic support with the order number, shipping address, and any carrier notice so the team can review next steps.",
        ],
      },
    ],
  },
  returns: {
    title: "Return & Refund Policy",
    eyebrow: "Customer care",
    updated,
    summary:
      "This return and refund policy gives practical guidance for JISOO Cosmetic skincare orders while final region-specific legal terms are confirmed.",
    regionNotice: commonRegions.en,
    sections: [
      {
        title: "Return eligibility",
        body: [
          "Because cosmetics and skincare can be hygiene-sensitive, return eligibility may depend on product condition, seal status, destination, local consumer law, and the reason for the request.",
          "Items that are opened, used, damaged after delivery, or unsuitable for resale may be excluded unless local law requires a different outcome.",
        ],
      },
      {
        title: "How to request help",
        body: [
          "Contact JISOO Cosmetic support with your order number, product name, photos if relevant, and a short explanation of the issue. The team will advise the available options for your region.",
          "Damaged, incorrect, or missing items should be reported promptly after delivery so the package condition and fulfillment record can be reviewed.",
        ],
      },
      {
        title: "Refund timing",
        body: [
          "Approved refunds are generally returned to the original payment method where possible. Processing time can depend on payment providers, banks, and local rules.",
          "TODO: add official return address, return window, and final refund timing once company operations and regional legal review are complete.",
        ],
      },
    ],
  },
  accessibility: {
    title: "Accessibility Statement",
    eyebrow: "Inclusive experience",
    updated,
    summary:
      "JISOO is committed to making the storefront, account, help, and beauty guidance experiences usable for customers across devices, languages, input methods, and assistive technologies.",
    regionNotice: commonRegions.en,
    sections: [
      {
        title: "Our standard",
        body: [
          "We aim to align with WCAG 2.2 AA principles: perceivable content, operable controls, understandable flows, and robust markup. Accessibility is treated as an ongoing product responsibility, not a one-time checklist.",
          "We design for keyboard navigation, screen reader labels, visible focus states, sufficient contrast, responsive layouts, reduced motion where possible, and clear form errors.",
        ],
      },
      {
        title: "Current coverage",
        body: [
          "Core areas include homepage navigation, product listings, product cards, cart, checkout, account pages, region and language menus, search, help pages, and AI concierge controls.",
          "We review interactive components such as menus, modals, drawers, sliders, region selectors, language switchers, carousels, and review marquees for focus management and semantic labels.",
        ],
      },
      {
        title: "Known limitations",
        body: [
          "Some editorial visuals, generated campaign imagery, third-party embeds, translated text, and experimental testing controls may need continued refinement. We prioritize issues that block purchasing, account access, customer support, or legal information.",
          "Motion-heavy sections are designed to be decorative. If motion causes discomfort, browser or operating-system reduced-motion settings should reduce nonessential animation where supported.",
        ],
      },
      {
        title: "Regional and language access",
        body: [
          "We support multiple locales and RTL layout for Arabic. Translations are reviewed over time to improve clarity, legal meaning, product accuracy, and accessibility labels.",
          "If a translation is unclear, the English version may be used for operational interpretation while we correct the localized copy.",
        ],
      },
      {
        title: "Feedback and support",
        body: [
          "If you find an accessibility barrier, include the page URL, device, browser, assistive technology if any, and what you were trying to do. We will prioritize fixes that affect core shopping and support tasks.",
          "Support can help with order access, policy information, product guidance, and alternate ways to complete a request while a technical issue is reviewed.",
        ],
      },
    ],
  },
};

const localizedLegalDocuments: Partial<
  Record<
    Locale,
    Partial<Record<LegalSlug, Omit<LegalDocument, "updated" | "regionNotice">>>
  >
> = {
  fr: {
    privacy: {
      title: "Politique de confidentialité",
      eyebrow: "Protection juridique",
      summary:
        "Cette politique explique comment JISOO collecte, utilise, partage, conserve et protège les informations liées aux achats, comptes, concierge IA, régions, newsletter, support et avis.",
      sections: [
        {
          title: "Données collectées",
          body: [
            "Nous collectons les informations de compte, préférences de langue et région, adresses, panier, commandes, paiement, livraison, retours, support et interactions nécessaires au service.",
            "Lorsque vous utilisez la recherche, les avis, les quiz ou le concierge IA, nous pouvons traiter vos messages, préférences produit, besoins de peau partagés volontairement et journaux d’interaction.",
          ],
        },
        {
          title: "Utilisation et partage",
          body: [
            "Nous utilisons les données pour exploiter la boutique, personnaliser le catalogue par région, traiter les commandes, prévenir la fraude, gérer les retours, améliorer les recommandations et envoyer les messages de service.",
            "Nous partageons les données uniquement avec les prestataires nécessaires : hébergement, paiement, sécurité, transport, entrepôt, support, traduction, e-mail, avis, analytics et conformité.",
          ],
        },
        {
          title: "Sécurité, conservation et droits",
          body: [
            "Les données sont conservées seulement le temps nécessaire aux commandes, garanties, retours, obligations fiscales, prévention de fraude, support, sécurité et obligations légales.",
            "Selon votre région, vous pouvez demander accès, correction, suppression, portabilité, restriction, opposition ou retrait du consentement. Une vérification d’identité peut être requise.",
          ],
        },
        {
          title: "Enfants, IA et contact",
          body: [
            "JISOO n’est pas destiné aux enfants en dessous de l’âge légal local. Le concierge IA fournit des conseils beauté généraux, pas un avis médical.",
            "Pour toute question de confidentialité ou demande liée à vos données, contactez le support JISOO via le centre d’aide.",
          ],
        },
      ],
    },
    terms: {
      title: "Conditions de service",
      eyebrow: "Conditions boutique",
      summary:
        "Ces conditions encadrent la navigation, les comptes, le concierge IA, les informations produits, commandes, paiements, livraison, retours et disponibilité régionale sur JISOO.",
      sections: [
        {
          title: "Utilisation de JISOO",
          body: [
            "Vous acceptez d’utiliser JISOO légalement, de fournir des informations exactes et de ne pas perturber les systèmes de contenu, prix, stock ou sécurité.",
            "Nous pouvons refuser ou suspendre un accès ou une commande en cas de fraude, abus, automatisation excessive, illégalité ou risque pour la plateforme.",
          ],
        },
        {
          title: "Produits, commandes et taxes",
          body: [
            "Les descriptions, images, ingrédients, prix, promotions et disponibilités sont fournis à titre d’aide et peuvent changer. Une commande est acceptée seulement après confirmation par JISOO.",
            "Prix, devise, taxes, droits, frais de livraison, moyens de paiement, retours et droits de rétractation varient selon la région et la loi locale.",
          ],
        },
        {
          title: "Communauté et IA",
          body: [
            "Les avis doivent être vrais, respectueux et pertinents. Nous pouvons modérer, traduire ou supprimer les contenus pour protéger les clients et respecter la loi.",
            "Le concierge IA offre des recommandations générales pouvant être incomplètes. Vérifiez ingrédients, disponibilité régionale et adéquation avant achat.",
          ],
        },
        {
          title: "Responsabilité et contact",
          body: [
            "Dans la limite de la loi, JISOO n’est pas responsable des pertes indirectes, services tiers ou événements hors de son contrôle raisonnable.",
            "Pour les questions de commande, région ou conditions, contactez le support JISOO via le centre d’aide.",
          ],
        },
      ],
    },
    cookies: {
      title: "Politique cookies",
      eyebrow: "Préférences et suivi",
      summary:
        "Cette politique explique comment JISOO utilise cookies, pixels, stockage local et technologies similaires pour faire fonctionner la boutique, mémoriser les choix, mesurer la performance et personnaliser le contenu.",
      sections: [
        {
          title: "Rôle des cookies",
          body: [
            "Les cookies mémorisent langue, région, panier, session, consentement, produits consultés, recherche et préférences d’affichage.",
            "Certains outils sont placés par JISOO et d’autres par des prestataires fiables comme hébergement, analytics, paiement, sécurité, marketing, avis ou support.",
          ],
        },
        {
          title: "Catégories et consentement",
          body: [
            "Les technologies nécessaires gardent le site sécurisé et fonctionnel. Les outils de performance, préférences et marketing sont utilisés selon les choix et règles régionales applicables.",
            "Dans les régions exigeant le consentement, nous demandons l’accord avant les cookies non essentiels et permettons de modifier les choix.",
          ],
        },
        {
          title: "Gestion et conservation",
          body: [
            "Vous pouvez bloquer ou supprimer les cookies dans votre navigateur, mais le panier, la région, le compte ou le paiement peuvent moins bien fonctionner.",
            "Les cookies de session expirent à la fermeture du navigateur. Les cookies persistants restent pendant la durée nécessaire ou jusqu’à suppression/retrait du consentement.",
          ],
        },
      ],
    },
    accessibility: {
      title: "Déclaration d’accessibilité",
      eyebrow: "Expérience inclusive",
      summary:
        "JISOO veut rendre la boutique, le compte, l’aide et les conseils beauté utilisables sur tous appareils, langues, méthodes de saisie et technologies d’assistance.",
      sections: [
        {
          title: "Notre standard",
          body: [
            "Nous visons les principes WCAG 2.2 AA : contenu perceptible, contrôles utilisables, parcours compréhensibles et balisage robuste.",
            "Nous travaillons le clavier, les libellés lecteurs d’écran, focus visible, contraste, responsive, réduction de mouvement et erreurs de formulaire claires.",
          ],
        },
        {
          title: "Couverture et limites",
          body: [
            "Les zones clés incluent navigation, listes produits, cartes, panier, paiement, compte, menus région/langue, recherche, aide et concierge IA.",
            "Certains visuels éditoriaux, contenus générés, intégrations tierces, traductions et contrôles expérimentaux peuvent encore être améliorés.",
          ],
        },
        {
          title: "Langues et support",
          body: [
            "Nous prenons en charge plusieurs langues et la mise en page RTL pour l’arabe. Les traductions sont améliorées dans le temps.",
            "Si vous trouvez un obstacle, envoyez l’URL, l’appareil, le navigateur, la technologie d’assistance éventuelle et l’action souhaitée.",
          ],
        },
      ],
    },
  },
  de: {
    privacy: {
      title: "Datenschutz",
      eyebrow: "Rechtliche Sorgfalt",
      summary:
        "Diese Richtlinie erklärt, wie JISOO Informationen rund um Shop, Konto, KI-Concierge, Region, Newsletter, Support und Bewertungen erhebt, nutzt, teilt, speichert und schützt.",
      sections: [
        {
          title: "Erhobene Daten",
          body: [
            "Wir verarbeiten Konto-, Sprach- und Regionseinstellungen, Adressen, Warenkorb, Bestellungen, Zahlung, Versand, Rückgaben, Supportnotizen und für den Service nötige Interaktionen.",
            "Bei Suche, Bewertungen, Quiz oder KI-Concierge können Nachrichten, freiwillig geteilte Hautanliegen, Produktpräferenzen und Interaktionsprotokolle verarbeitet werden.",
          ],
        },
        {
          title: "Nutzung und Weitergabe",
          body: [
            "Wir nutzen Daten für den Shopbetrieb, regionale Kataloganzeige, Bestellungen, Support, Betrugsprävention, Rückgaben, Empfehlungen und Servicenachrichten.",
            "Daten werden nur an notwendige Dienstleister weitergegeben, etwa Hosting, Zahlung, Sicherheit, Versand, Lager, Support, Übersetzung, E-Mail, Bewertungen, Analyse und Compliance.",
          ],
        },
        {
          title: "Sicherheit, Aufbewahrung und Rechte",
          body: [
            "Wir speichern Daten nur so lange wie für Bestellungen, Gewährleistung, Rückgaben, Steuern, Betrugsprävention, Support, Sicherheit und rechtliche Pflichten nötig.",
            "Je nach Region können Sie Auskunft, Berichtigung, Löschung, Übertragbarkeit, Einschränkung, Widerspruch oder Widerruf der Einwilligung verlangen.",
          ],
        },
        {
          title: "Kinder, KI und Kontakt",
          body: [
            "JISOO richtet sich nicht an Kinder unter dem lokal vorgeschriebenen Alter. Der KI-Concierge bietet allgemeine Beauty-Hinweise und keine medizinische Beratung.",
            "Für Datenschutzfragen kontaktieren Sie den JISOO-Support über das Hilfe-Center.",
          ],
        },
      ],
    },
    terms: {
      title: "Nutzungsbedingungen",
      eyebrow: "Shop-Bedingungen",
      summary:
        "Diese Bedingungen regeln Nutzung, Konten, KI-Concierge, Produktinformationen, Bestellungen, Zahlungen, Versand, Rückgaben und regionale Verfügbarkeit bei JISOO.",
      sections: [
        {
          title: "Nutzung von JISOO",
          body: [
            "Sie nutzen JISOO rechtmäßig, geben korrekte Daten an und stören keine Betriebs-, Sicherheits-, Inhalts-, Preis- oder Bestandssysteme.",
            "Wir können Zugriff oder Bestellungen bei Betrug, Missbrauch, Rechtsverstoß, schädlicher Automatisierung oder Plattformrisiken ablehnen.",
          ],
        },
        {
          title: "Produkte, Bestellungen und Steuern",
          body: [
            "Beschreibungen, Bilder, Inhaltsstoffe, Preise, Aktionen und Verfügbarkeit dienen der Orientierung und können sich ändern. Bestellungen gelten erst nach Bestätigung durch JISOO.",
            "Preise, Währung, Steuern, Zölle, Versand, Zahlarten, Rückgaben und Widerrufsrechte variieren nach Region und lokalem Recht.",
          ],
        },
        {
          title: "Community und KI",
          body: [
            "Bewertungen müssen wahr, respektvoll und relevant sein. Inhalte können moderiert, übersetzt oder entfernt werden.",
            "KI-Empfehlungen sind allgemeine Hinweise und können unvollständig sein. Prüfen Sie Inhaltsstoffe, Verfügbarkeit und Eignung vor dem Kauf.",
          ],
        },
        {
          title: "Haftung und Kontakt",
          body: [
            "Soweit gesetzlich zulässig haftet JISOO nicht für indirekte Schäden, Drittanbieter oder Ereignisse außerhalb angemessener Kontrolle.",
            "Bei Fragen zu Bestellung, Region oder Bedingungen wenden Sie sich an den JISOO-Support.",
          ],
        },
      ],
    },
    cookies: {
      title: "Cookie-Richtlinie",
      eyebrow: "Präferenzen und Tracking",
      summary:
        "Diese Richtlinie erklärt, wie JISOO Cookies, Pixel, lokalen Speicher und ähnliche Technologien für Shopbetrieb, Auswahl, Leistungsmessung und Personalisierung nutzt.",
      sections: [
        {
          title: "Funktion von Cookies",
          body: [
            "Cookies speichern Sprache, Region, Warenkorb, Sitzung, Einwilligungen, zuletzt angesehene Produkte, Suche und Anzeigepräferenzen.",
            "Einige Technologien stammen von JISOO, andere von vertrauenswürdigen Anbietern für Hosting, Analyse, Zahlung, Sicherheit, Marketing, Bewertungen oder Support.",
          ],
        },
        {
          title: "Kategorien und Einwilligung",
          body: [
            "Notwendige Technologien sichern Grundfunktionen. Performance-, Präferenz- und Marketingtechnologien werden je nach Einwilligung und regionalen Regeln eingesetzt.",
            "Wo erforderlich fragen wir vor nicht notwendigen Cookies und ermöglichen spätere Änderungen.",
          ],
        },
        {
          title: "Verwaltung und Aufbewahrung",
          body: [
            "Browser können Cookies blockieren oder löschen; Warenkorb, Checkout, Region und Konto können dadurch beeinträchtigt werden.",
            "Sitzungscookies enden mit der Sitzung, persistente Cookies bleiben für den Zweckzeitraum oder bis zur Löschung bzw. zum Widerruf.",
          ],
        },
      ],
    },
    accessibility: {
      title: "Barrierefreiheitserklärung",
      eyebrow: "Inklusive Erfahrung",
      summary:
        "JISOO möchte Shop, Konto, Hilfe und Beauty-Beratung auf Geräten, in Sprachen, Eingabemethoden und assistiven Technologien nutzbar machen.",
      sections: [
        {
          title: "Unser Standard",
          body: [
            "Wir orientieren uns an WCAG 2.2 AA: wahrnehmbare Inhalte, bedienbare Kontrollen, verständliche Abläufe und robustes Markup.",
            "Wir achten auf Tastaturbedienung, Screenreader-Labels, sichtbaren Fokus, Kontrast, responsive Layouts, reduzierte Bewegung und klare Fehler.",
          ],
        },
        {
          title: "Abdeckung und Grenzen",
          body: [
            "Kernbereiche sind Navigation, Produktlisten, Karten, Warenkorb, Checkout, Konto, Regions- und Sprachmenüs, Suche, Hilfe und KI-Concierge.",
            "Einige Editorial-Bilder, generierte Inhalte, Drittanbieter, Übersetzungen und experimentelle Kontrollen werden weiter verbessert.",
          ],
        },
        {
          title: "Sprachen und Support",
          body: [
            "Wir unterstützen mehrere Sprachen und RTL für Arabisch. Übersetzungen werden laufend verbessert.",
            "Melden Sie Barrieren mit URL, Gerät, Browser, assistiver Technologie und gewünschter Aktion.",
          ],
        },
      ],
    },
  },
  ar: {
    privacy: {
      title: "سياسة الخصوصية",
      eyebrow: "العناية القانونية",
      summary:
        "توضح هذه السياسة كيف تجمع JISOO المعلومات وتستخدمها وتشاركها وتحفظها وتحميها عبر التسوق والحساب ومساعد الذكاء الاصطناعي والمنطقة والنشرة والدعم والتقييمات.",
      sections: [
        {
          title: "المعلومات التي نجمعها",
          body: [
            "نجمع بيانات الحساب وتفضيلات اللغة والمنطقة والعناوين والسلة والطلبات والدفع والشحن والإرجاع وملاحظات خدمة العملاء والتفاعلات اللازمة لتقديم الخدمة.",
            "عند استخدام البحث أو التقييمات أو الاختبارات أو مساعد الذكاء الاصطناعي قد نعالج رسائلك واحتياجات البشرة التي تشاركينها طوعًا وتفضيلات المنتجات وسجلات التفاعل.",
          ],
        },
        {
          title: "كيفية الاستخدام والمشاركة",
          body: [
            "نستخدم المعلومات لتشغيل المتجر وتخصيص ظهور المنتجات حسب المنطقة ومعالجة الطلبات وتقديم الدعم ومنع الاحتيال وإدارة الإرجاع وتحسين التوصيات وإرسال رسائل الخدمة.",
            "نشارك البيانات فقط مع مزودي الخدمة اللازمين مثل الاستضافة والدفع والأمان والشحن والمستودع والدعم والترجمة والبريد الإلكتروني والتقييمات والتحليلات والامتثال.",
          ],
        },
        {
          title: "الأمان والاحتفاظ والحقوق",
          body: [
            "نحتفظ بالمعلومات فقط للمدة اللازمة للطلبات والضمانات والإرجاع والسجلات الضريبية ومنع الاحتيال والدعم والأمان والالتزامات القانونية.",
            "بحسب منطقتك يمكنك طلب الوصول أو التصحيح أو الحذف أو نقل البيانات أو التقييد أو الاعتراض أو سحب الموافقة. قد نحتاج إلى التحقق من هويتك.",
          ],
        },
        {
          title: "الأطفال والذكاء الاصطناعي والتواصل",
          body: [
            "JISOO غير مخصص للأطفال دون السن المطلوب محليًا. مساعد الذكاء الاصطناعي يقدم إرشادًا تجميليًا عامًا وليس نصيحة طبية.",
            "لأسئلة الخصوصية أو طلبات البيانات، تواصلي مع دعم JISOO عبر مركز المساعدة.",
          ],
        },
      ],
    },
    terms: {
      title: "شروط الخدمة",
      eyebrow: "شروط المتجر",
      summary:
        "تنظم هذه الشروط التصفح والحساب ومساعد الذكاء الاصطناعي ومعلومات المنتجات والطلبات والمدفوعات والشحن والإرجاع والتوفر حسب المنطقة في JISOO.",
      sections: [
        {
          title: "استخدام JISOO",
          body: [
            "توافقين على استخدام JISOO بشكل قانوني وتقديم معلومات دقيقة وعدم التدخل في أنظمة التشغيل أو الأمان أو المحتوى أو الأسعار أو المخزون.",
            "قد نعلّق الوصول أو نلغي الطلبات عند وجود احتيال أو إساءة أو مخالفة قانونية أو استخدام آلي ضار أو خطر على العملاء أو المنصة.",
          ],
        },
        {
          title: "المنتجات والطلبات والضرائب",
          body: [
            "الأوصاف والصور والمكونات والأسعار والعروض والتوفر إرشادية وقد تتغير. لا يُقبل الطلب إلا بعد تأكيده من JISOO.",
            "تختلف الأسعار والعملة والضرائب والرسوم والشحن وطرق الدفع والإرجاع وحقوق الإلغاء حسب المنطقة والقانون المحلي.",
          ],
        },
        {
          title: "المجتمع والذكاء الاصطناعي",
          body: [
            "يجب أن تكون التقييمات صادقة ومحترمة وذات صلة. يمكننا مراجعة المحتوى أو ترجمته أو رفضه أو إزالته لحماية العملاء والالتزام بالقانون.",
            "توصيات الذكاء الاصطناعي عامة وقد تكون غير مكتملة. تحققي من المكونات والتوفر الإقليمي وملاءمة المنتج قبل الشراء.",
          ],
        },
        {
          title: "المسؤولية والتواصل",
          body: [
            "بالقدر الذي يسمح به القانون، لا تتحمل JISOO مسؤولية الخسائر غير المباشرة أو خدمات الأطراف الثالثة أو الأمور الخارجة عن السيطرة المعقولة.",
            "لأسئلة الطلبات أو المنطقة أو الشروط، تواصلي مع دعم JISOO عبر مركز المساعدة.",
          ],
        },
      ],
    },
    cookies: {
      title: "سياسة ملفات الارتباط",
      eyebrow: "التفضيلات والتتبع",
      summary:
        "توضح هذه السياسة كيف تستخدم JISOO ملفات الارتباط والبكسلات والتخزين المحلي والتقنيات المشابهة لتشغيل المتجر وتذكر الاختيارات وقياس الأداء وتخصيص المحتوى.",
      sections: [
        {
          title: "وظيفة ملفات الارتباط",
          body: [
            "تساعد ملفات الارتباط الموقع على تذكر اللغة والمنطقة والسلة والجلسة والموافقة والمنتجات التي تمت مشاهدتها والبحث وتفضيلات العرض.",
            "بعض التقنيات تضعها JISOO وأخرى يضعها مزودون موثوقون للاستضافة والتحليلات والدفع والأمان والتسويق والتقييمات والدعم.",
          ],
        },
        {
          title: "الفئات والموافقة",
          body: [
            "التقنيات الضرورية تحفظ أمان الموقع ووظائفه. تقنيات الأداء والتفضيلات والتسويق تُستخدم حسب اختياراتك والقواعد الإقليمية.",
            "في المناطق التي تتطلب موافقة، نطلب الإذن قبل ملفات الارتباط غير الضرورية ونتيح تغيير الاختيارات لاحقًا.",
          ],
        },
        {
          title: "الإدارة والاحتفاظ",
          body: [
            "يمكنك حظر أو حذف ملفات الارتباط من المتصفح، لكن السلة والدفع والمنطقة والحساب قد لا تعمل بشكل موثوق.",
            "تنتهي ملفات الجلسة عند إغلاق المتصفح، وتبقى الملفات الدائمة للمدة اللازمة أو حتى حذفها أو سحب الموافقة.",
          ],
        },
      ],
    },
    accessibility: {
      title: "بيان إمكانية الوصول",
      eyebrow: "تجربة شاملة",
      summary:
        "تلتزم JISOO بجعل المتجر والحساب والمساعدة وإرشادات الجمال قابلة للاستخدام عبر الأجهزة واللغات وطرق الإدخال وتقنيات المساعدة.",
      sections: [
        {
          title: "معيارنا",
          body: [
            "نسعى للالتزام بمبادئ WCAG 2.2 AA: محتوى قابل للإدراك، عناصر قابلة للتشغيل، مسارات مفهومة وبنية قوية.",
            "نصمم لدعم لوحة المفاتيح وتسميات قارئات الشاشة وحالات التركيز الواضحة والتباين والتجاوب وتقليل الحركة ورسائل الأخطاء الواضحة.",
          ],
        },
        {
          title: "التغطية والقيود",
          body: [
            "تشمل المناطق الأساسية التنقل وقوائم المنتجات والبطاقات والسلة والدفع والحساب وقوائم المنطقة واللغة والبحث والمساعدة ومساعد الذكاء الاصطناعي.",
            "قد تحتاج بعض الصور التحريرية والمحتوى المولد والتضمينات الخارجية والترجمات وعناصر الاختبار إلى تحسين مستمر.",
          ],
        },
        {
          title: "اللغات والدعم",
          body: [
            "ندعم عدة لغات وتخطيطًا من اليمين إلى اليسار للعربية. تتم مراجعة الترجمات بمرور الوقت لتحسين الوضوح والدقة.",
            "إذا وجدتِ عائقًا، أرسلي رابط الصفحة والجهاز والمتصفح وتقنية المساعدة إن وجدت وما كنت تحاولين فعله.",
          ],
        },
      ],
    },
  },
};

localizedLegalDocuments.ko = {
  privacy: {
    title: "개인정보 처리방침",
    eyebrow: "법적 안내",
    summary:
      "이 정책은 JISOO가 쇼핑, 계정, AI 컨시어지, 지역, 뉴스레터, 지원 및 리뷰 경험에서 정보를 수집, 사용, 공유, 보관, 보호하는 방식을 설명합니다.",
    sections: [
      {
        title: "수집하는 정보",
        body: [
          "계정 정보, 언어와 지역, 주소, 장바구니, 주문, 결제, 배송, 반품, 고객 지원 기록 및 서비스 제공에 필요한 상호작용 정보를 처리합니다.",
          "검색, 리뷰, 퀴즈 또는 AI 컨시어지를 사용할 때 메시지, 자발적으로 공유한 피부 고민, 제품 선호도와 상호작용 기록을 처리할 수 있습니다.",
        ],
      },
      {
        title: "이용 및 공유",
        body: [
          "스토어 운영, 지역별 카탈로그 표시, 주문 처리, 지원, 사기 방지, 반품 관리, 추천 개선과 서비스 안내에 사용합니다.",
          "호스팅, 결제, 보안, 배송, 창고, 지원, 번역, 이메일, 리뷰, 분석 및 컴플라이언스 등 필요한 제공업체와만 데이터를 공유합니다.",
        ],
      },
      {
        title: "보관, 보안 및 권리",
        body: [
          "주문, 보증, 반품, 세무 기록, 사기 방지, 지원, 보안 및 법적 의무에 필요한 기간 동안만 보관합니다.",
          "지역에 따라 열람, 정정, 삭제, 이동, 제한, 이의 제기 또는 동의 철회를 요청할 수 있으며 신원 확인이 필요할 수 있습니다.",
        ],
      },
    ],
  },
  terms: {
    title: "이용약관",
    eyebrow: "스토어 약관",
    summary:
      "이 약관은 JISOO의 탐색, 계정, AI 컨시어지, 제품 정보, 주문, 결제, 배송, 반품 및 지역별 제공 여부를 규정합니다.",
    sections: [
      {
        title: "JISOO 이용",
        body: [
          "JISOO를 합법적으로 이용하고 정확한 정보를 제공하며 운영, 보안, 콘텐츠, 가격 또는 재고 시스템을 방해하지 않아야 합니다.",
          "사기, 남용, 불법 행위, 유해한 자동화 또는 플랫폼 위험이 있는 경우 접근이나 주문을 제한할 수 있습니다.",
        ],
      },
      {
        title: "제품과 주문",
        body: [
          "설명, 이미지, 성분, 가격, 프로모션과 재고는 안내용이며 변경될 수 있습니다. 주문은 JISOO 확인 후 수락됩니다.",
          "가격, 통화, 세금, 관세, 배송, 결제수단, 반품 및 취소권은 지역과 현지 법률에 따라 달라집니다.",
        ],
      },
      {
        title: "AI와 문의",
        body: [
          "AI 컨시어지는 일반적인 뷰티 안내를 제공하며 불완전할 수 있습니다. 구매 전 성분, 지역 제공 여부와 적합성을 확인하세요.",
          "주문, 지역 또는 약관 문의는 도움말 센터를 통해 JISOO 지원팀에 연락하세요.",
        ],
      },
    ],
  },
  cookies: {
    title: "쿠키 정책",
    eyebrow: "기본 설정 및 추적",
    summary:
      "이 정책은 JISOO가 스토어 운영, 선택 기억, 성능 측정 및 콘텐츠 개인화를 위해 쿠키, 픽셀, 로컬 저장소와 유사 기술을 사용하는 방식을 설명합니다.",
    sections: [
      {
        title: "쿠키의 역할",
        body: [
          "쿠키는 언어, 지역, 장바구니, 세션, 동의, 최근 본 제품, 검색 및 표시 설정을 기억하는 데 도움을 줍니다.",
          "일부 기술은 JISOO가, 일부는 호스팅, 분석, 결제, 보안, 마케팅, 리뷰 또는 지원 제공업체가 배치합니다.",
        ],
      },
      {
        title: "동의와 관리",
        body: [
          "필수 기술은 사이트 보안과 기능에 필요합니다. 비필수 분석 또는 마케팅 기술은 지역 규칙과 선택에 따라 사용합니다.",
          "브라우저에서 쿠키를 차단하거나 삭제할 수 있지만 장바구니, 결제, 지역 및 계정 기능이 불안정해질 수 있습니다.",
        ],
      },
    ],
  },
  accessibility: {
    title: "접근성 안내",
    eyebrow: "포용적인 경험",
    summary:
      "JISOO는 스토어, 계정, 도움말과 뷰티 안내를 다양한 기기, 언어, 입력 방식 및 보조 기술에서 사용할 수 있도록 노력합니다.",
    sections: [
      {
        title: "기준",
        body: [
          "WCAG 2.2 AA 원칙에 맞춰 인지 가능한 콘텐츠, 작동 가능한 컨트롤, 이해하기 쉬운 흐름과 견고한 마크업을 목표로 합니다.",
          "키보드 탐색, 스크린 리더 라벨, 보이는 포커스, 대비, 반응형 레이아웃, 동작 감소와 명확한 오류 안내를 개선합니다.",
        ],
      },
      {
        title: "지원과 피드백",
        body: [
          "주요 영역은 내비게이션, 제품 목록, 장바구니, 결제, 계정, 지역/언어 메뉴, 검색, 도움말과 AI 컨시어지입니다.",
          "장벽을 발견하면 URL, 기기, 브라우저, 보조 기술과 수행하려던 작업을 알려주세요.",
        ],
      },
    ],
  },
};

localizedLegalDocuments.tr = {
  privacy: {
    title: "Gizlilik Politikası",
    eyebrow: "Yasal bakım",
    summary:
      "Bu politika JISOO’nun alışveriş, hesap, AI danışmanı, bölge, bülten, destek ve yorum deneyimlerinde bilgileri nasıl topladığını, kullandığını, paylaştığını, sakladığını ve koruduğunu açıklar.",
    sections: [
      {
        title: "Topladığımız bilgiler",
        body: [
          "Hesap bilgileri, dil ve bölge tercihleri, adresler, sepet, sipariş, ödeme, kargo, iade, destek kayıtları ve hizmet için gerekli etkileşimleri işleriz.",
          "Arama, yorumlar, testler veya AI danışmanı kullanıldığında mesajlarınız, gönüllü paylaştığınız cilt ihtiyaçları, ürün tercihleri ve etkileşim kayıtları işlenebilir.",
        ],
      },
      {
        title: "Kullanım ve paylaşım",
        body: [
          "Mağazayı işletmek, bölgeye göre katalog göstermek, siparişleri işlemek, destek sağlamak, sahtekarlığı önlemek, iadeleri yönetmek, önerileri iyileştirmek ve hizmet mesajları göndermek için kullanırız.",
          "Verileri yalnızca barındırma, ödeme, güvenlik, kargo, depo, destek, çeviri, e-posta, yorum, analiz ve uyum gibi gerekli sağlayıcılarla paylaşırız.",
        ],
      },
      {
        title: "Saklama, güvenlik ve haklar",
        body: [
          "Bilgiler yalnızca sipariş, garanti, iade, vergi, sahtekarlık önleme, destek, güvenlik ve yasal yükümlülükler için gereken süre boyunca saklanır.",
          "Bölgenize göre erişim, düzeltme, silme, taşıma, kısıtlama, itiraz veya onay geri çekme talep edebilirsiniz; kimlik doğrulaması gerekebilir.",
        ],
      },
    ],
  },
  terms: {
    title: "Hizmet Şartları",
    eyebrow: "Mağaza şartları",
    summary:
      "Bu şartlar JISOO’da gezinme, hesap, AI danışmanı, ürün bilgileri, siparişler, ödemeler, kargo, iadeler ve bölgesel uygunluğu düzenler.",
    sections: [
      {
        title: "JISOO kullanımı",
        body: [
          "JISOO’yu yasal şekilde kullanmayı, doğru bilgi sağlamayı ve işletim, güvenlik, içerik, fiyat veya stok sistemlerine müdahale etmemeyi kabul edersiniz.",
          "Sahtekarlık, kötüye kullanım, hukuka aykırılık, zararlı otomasyon veya platform riski varsa erişimi ya da siparişleri sınırlayabiliriz.",
        ],
      },
      {
        title: "Ürünler ve siparişler",
        body: [
          "Açıklamalar, görseller, içerikler, fiyatlar, kampanyalar ve stok alışveriş rehberliği içindir ve değişebilir. Sipariş yalnızca JISOO onayıyla kabul edilir.",
          "Fiyat, para birimi, vergiler, gümrük, kargo, ödeme yöntemleri, iadeler ve cayma hakları bölgeye ve yerel hukuka göre değişir.",
        ],
      },
      {
        title: "AI ve iletişim",
        body: [
          "AI danışmanı genel güzellik rehberliği verir ve eksik olabilir. Satın almadan önce içerikleri, bölgesel uygunluğu ve ürün uyumunu kontrol edin.",
          "Sipariş, bölge veya şart soruları için yardım merkezi üzerinden JISOO destek ekibiyle iletişime geçin.",
        ],
      },
    ],
  },
  cookies: {
    title: "Çerez Politikası",
    eyebrow: "Tercihler ve izleme",
    summary:
      "Bu politika JISOO’nun mağazayı çalıştırmak, seçimleri hatırlamak, performansı ölçmek ve içeriği kişiselleştirmek için çerez, piksel, yerel depolama ve benzer teknolojileri nasıl kullandığını açıklar.",
    sections: [
      {
        title: "Çerezlerin görevi",
        body: [
          "Çerezler dil, bölge, sepet, oturum, onay, son görüntülenen ürünler, arama ve görünüm tercihlerini hatırlamaya yardımcı olur.",
          "Bazı teknolojiler JISOO tarafından, bazıları barındırma, analiz, ödeme, güvenlik, pazarlama, yorum veya destek sağlayıcıları tarafından yerleştirilir.",
        ],
      },
      {
        title: "Onay ve yönetim",
        body: [
          "Zorunlu teknolojiler site güvenliği ve işlevi için gereklidir. Zorunlu olmayan analiz veya pazarlama teknolojileri bölgesel kurallara ve seçimlerinize göre kullanılır.",
          "Tarayıcıdan çerezleri engelleyebilir veya silebilirsiniz; sepet, ödeme, bölge ve hesap özellikleri daha az güvenilir çalışabilir.",
        ],
      },
    ],
  },
  accessibility: {
    title: "Erişilebilirlik Bildirimi",
    eyebrow: "Kapsayıcı deneyim",
    summary:
      "JISOO mağaza, hesap, yardım ve güzellik rehberliği deneyimlerini cihazlar, diller, giriş yöntemleri ve yardımcı teknolojilerde kullanılabilir kılmaya çalışır.",
    sections: [
      {
        title: "Standardımız",
        body: [
          "WCAG 2.2 AA ilkelerine uygun algılanabilir içerik, çalıştırılabilir kontroller, anlaşılır akışlar ve sağlam işaretleme hedefleriz.",
          "Klavye gezintisi, ekran okuyucu etiketleri, görünür odak, kontrast, duyarlı düzen, azaltılmış hareket ve net form hataları üzerinde çalışırız.",
        ],
      },
      {
        title: "Destek ve geri bildirim",
        body: [
          "Temel alanlar gezinme, ürün listeleri, kartlar, sepet, ödeme, hesap, bölge/dil menüleri, arama, yardım ve AI danışmanıdır.",
          "Bir engel bulursanız URL, cihaz, tarayıcı, varsa yardımcı teknoloji ve yapmak istediğiniz işlemi paylaşın.",
        ],
      },
    ],
  },
};

const titleTranslations: Record<Locale, Partial<Record<LegalSlug, string>>> = {
  en: {},
  fr: {
    privacy: "Politique de confidentialité",
    terms: "Conditions de service",
    cookies: "Politique cookies",
    accessibility: "Déclaration d’accessibilité",
    shipping: "Politique de livraison",
    returns: "Politique de retours et remboursements",
  },
  de: {
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
    cookies: "Cookie-Richtlinie",
    accessibility: "Barrierefreiheitserklärung",
    shipping: "Versandrichtlinie",
    returns: "Rückgabe- und Erstattungsrichtlinie",
  },
  ko: {
    privacy: "개인정보 처리방침",
    terms: "이용약관",
    cookies: "쿠키 정책",
    accessibility: "접근성 안내",
    shipping: "배송 정책",
    returns: "반품 및 환불 정책",
  },
  ar: {
    privacy: "سياسة الخصوصية",
    terms: "شروط الخدمة",
    cookies: "سياسة ملفات الارتباط",
    accessibility: "بيان إمكانية الوصول",
    shipping: "سياسة الشحن",
    returns: "سياسة الإرجاع والاسترداد",
  },
  tr: {
    privacy: "Gizlilik Politikası",
    terms: "Hizmet Şartları",
    cookies: "Çerez Politikası",
    accessibility: "Erişilebilirlik Bildirimi",
    shipping: "Kargo Politikası",
    returns: "İade ve Geri Ödeme Politikası",
  },
};

const uiTranslations: Record<
  Locale,
  {
    updated: string;
    region: string;
    contact: string;
    home: string;
    disclaimer: string;
  }
> = {
  en: {
    updated: "Last updated",
    region: "Regional notice",
    contact: "Contact Support",
    home: "Back to Home",
    disclaimer:
      "This content is a practical website policy draft and should be reviewed by qualified counsel before publication as final legal advice.",
  },
  fr: {
    updated: "Dernière mise à jour",
    region: "Note régionale",
    contact: "Contacter le support",
    home: "Retour à l’accueil",
    disclaimer:
      "Ce contenu est une base pratique de politique de site et doit être relu par un conseil qualifié avant publication finale.",
  },
  de: {
    updated: "Zuletzt aktualisiert",
    region: "Regionaler Hinweis",
    contact: "Support kontaktieren",
    home: "Zur Startseite",
    disclaimer:
      "Dieser Inhalt ist ein praktischer Richtlinienentwurf und sollte vor endgültiger Veröffentlichung rechtlich geprüft werden.",
  },
  ko: {
    updated: "마지막 업데이트",
    region: "지역 안내",
    contact: "지원 문의",
    home: "홈으로 돌아가기",
    disclaimer:
      "이 내용은 웹사이트 정책 초안이며 최종 법적 고지로 게시하기 전에 전문가 검토가 필요합니다.",
  },
  ar: {
    updated: "آخر تحديث",
    region: "إشعار إقليمي",
    contact: "اتصل بالدعم",
    home: "العودة للرئيسية",
    disclaimer:
      "هذا المحتوى مسودة عملية لسياسات الموقع ويجب مراجعته قانونيًا قبل نشره كنص نهائي.",
  },
  tr: {
    updated: "Son güncelleme",
    region: "Bölgesel not",
    contact: "Destekle iletişime geç",
    home: "Ana sayfaya dön",
    disclaimer:
      "Bu içerik pratik bir web sitesi politika taslağıdır ve nihai hukuki metin olarak yayımlanmadan önce uzman hukuk incelemesi gerektirir.",
  },
};

export function isLegalSlug(value: string): value is LegalSlug {
  return (
    value === "privacy" ||
    value === "terms" ||
    value === "cookies" ||
    value === "accessibility" ||
    value === "shipping" ||
    value === "returns"
  );
}

export function getLegalDocument(slug: string, locale: Locale = "en") {
  const legalSlug = isLegalSlug(slug) ? slug : "privacy";
  const base = en[legalSlug];
  const localized = localizedLegalDocuments[locale]?.[legalSlug];
  return {
    slug: legalSlug,
    document: {
      ...base,
      ...localized,
      updated,
      title:
        localized?.title ?? titleTranslations[locale][legalSlug] ?? base.title,
      regionNotice: commonRegions[locale],
    },
    ui: uiTranslations[locale],
  };
}
