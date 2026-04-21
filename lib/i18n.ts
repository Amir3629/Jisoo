import { notFound } from 'next/navigation'

export const locales = ['en', 'ar', 'fr', 'de'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function normalizeLocale(value: string | undefined): Locale {
  if (!value) return defaultLocale
  return isLocale(value) ? value : defaultLocale
}

export function assertLocale(value: string): Locale {
  if (!isLocale(value)) notFound()
  return value
}

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr'
}

export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith('/')) return href
  if (href === '/') return `/${locale}`
  if (href.startsWith(`/${locale}/`) || href === `/${locale}`) return href

  const hasLocale = locales.some((l) => href.startsWith(`/${l}/`) || href === `/${l}`)
  if (hasLocale) {
    const [, , ...parts] = href.split('/')
    return `/${locale}/${parts.join('/')}`.replace(/\/$/, '')
  }

  return `/${locale}${href}`
}

export type Dictionary = {
  common: {
    language: string
    region: string
    shop: string
    help: string
    store: string
    admin: string
  }
  header: {
    freeShipping: string
    nav: {
      shop: string
      new: string
      bestSellers: string
      story: string
      help: string
    }
    actions: {
      search: string
      account: string
      wishlist: string
      cart: string
      openMenu: string
    }
  }
  footer: {
    newsletterTitle: string
    newsletterBody: string
    emailPlaceholder: string
    subscribe: string
    subscribed: string
  }
  regionMessages: Record<'visible_and_buyable' | 'visible_but_not_buyable' | 'hidden' | 'pending_review', string>
  admin: {
    nav: Record<'dashboard' | 'suppliers' | 'products' | 'regions' | 'compliance' | 'translations' | 'media' | 'social' | 'ai' | 'analytics' | 'orders' | 'customers', string>
    notifications: {
      title: string
      markRead: string
    }
    searchPlaceholder: string
  }
}

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    common: { language: 'Language', region: 'Region', shop: 'Shop', help: 'Help', store: 'Storefront', admin: 'Admin' },
    header: {
      freeShipping: 'Free shipping on orders over {{amount}}',
      nav: { shop: 'Shop', new: 'New', bestSellers: 'Best Sellers', story: 'Our Story', help: 'Help' },
      actions: { search: 'Search', account: 'Account', wishlist: 'Wishlist', cart: 'Cart', openMenu: 'Open menu' },
    },
    footer: {
      newsletterTitle: 'Join the JISOO Beauty Circle',
      newsletterBody: 'Be the first to know about new arrivals, exclusive offers, and K-beauty secrets.',
      emailPlaceholder: 'Enter your email',
      subscribe: 'Subscribe',
      subscribed: 'Thank you for subscribing! Welcome to the beauty circle.',
    },
    regionMessages: {
      visible_and_buyable: 'Available in your region',
      visible_but_not_buyable: 'Visible now, purchasing opens soon in your region',
      hidden: 'Unavailable in your selected region',
      pending_review: 'Pending compliance review for your region',
    },
    admin: {
      nav: { dashboard: 'Dashboard', suppliers: 'Suppliers', products: 'Products', regions: 'Regions', compliance: 'Compliance', translations: 'Translations', media: 'Media', social: 'Social', ai: 'AI Copilot', analytics: 'Analytics', orders: 'Orders', customers: 'Customers' },
      notifications: { title: 'Notifications', markRead: 'Mark all read' },
      searchPlaceholder: 'Search products, orders, customers...',
    },
  },
  ar: {
    common: { language: 'اللغة', region: 'المنطقة', shop: 'المتجر', help: 'المساعدة', store: 'واجهة المتجر', admin: 'الإدارة' },
    header: {
      freeShipping: 'شحن مجاني للطلبات فوق {{amount}}',
      nav: { shop: 'تسوّق', new: 'جديد', bestSellers: 'الأكثر مبيعًا', story: 'قصتنا', help: 'المساعدة' },
      actions: { search: 'بحث', account: 'الحساب', wishlist: 'المفضلة', cart: 'السلة', openMenu: 'فتح القائمة' },
    },
    footer: {
      newsletterTitle: 'انضمي إلى دائرة جيسو للجمال',
      newsletterBody: 'كوني أول من يعرف عن الإصدارات الجديدة والعروض الحصرية وأسرار الجمال الكوري.',
      emailPlaceholder: 'أدخلي بريدك الإلكتروني',
      subscribe: 'اشترك',
      subscribed: 'شكرًا لاشتراكك! أهلاً بك في دائرة الجمال.',
    },
    regionMessages: {
      visible_and_buyable: 'متاح للشراء في منطقتك',
      visible_but_not_buyable: 'مرئي الآن، وسيُفتح الشراء قريبًا في منطقتك',
      hidden: 'غير متاح في منطقتك المحددة',
      pending_review: 'بانتظار مراجعة الامتثال في منطقتك',
    },
    admin: {
      nav: { dashboard: 'لوحة التحكم', suppliers: 'الموردون', products: 'المنتجات', regions: 'المناطق', compliance: 'الامتثال', translations: 'الترجمات', media: 'الوسائط', social: 'الاجتماعي', ai: 'مساعد الذكاء', analytics: 'التحليلات', orders: 'الطلبات', customers: 'العملاء' },
      notifications: { title: 'الإشعارات', markRead: 'تعيين الكل كمقروء' },
      searchPlaceholder: 'ابحث عن منتجات أو طلبات أو عملاء...',
    },
  },
  fr: {
    common: { language: 'Langue', region: 'Région', shop: 'Boutique', help: 'Aide', store: 'Vitrine', admin: 'Admin' },
    header: {
      freeShipping: 'Livraison offerte dès {{amount}}',
      nav: { shop: 'Boutique', new: 'Nouveautés', bestSellers: 'Best-sellers', story: 'Notre histoire', help: 'Aide' },
      actions: { search: 'Rechercher', account: 'Compte', wishlist: 'Favoris', cart: 'Panier', openMenu: 'Ouvrir le menu' },
    },
    footer: {
      newsletterTitle: 'Rejoignez le Cercle Beauté JISOO',
      newsletterBody: 'Soyez informé(e) en premier des nouveautés, offres exclusives et secrets K-beauty.',
      emailPlaceholder: 'Saisissez votre e-mail',
      subscribe: 'S’abonner',
      subscribed: 'Merci pour votre inscription ! Bienvenue dans notre cercle beauté.',
    },
    regionMessages: {
      visible_and_buyable: 'Disponible dans votre région',
      visible_but_not_buyable: 'Visible, achat bientôt disponible dans votre région',
      hidden: 'Indisponible dans votre région sélectionnée',
      pending_review: 'En attente de validation conformité pour votre région',
    },
    admin: {
      nav: { dashboard: 'Tableau de bord', suppliers: 'Fournisseurs', products: 'Produits', regions: 'Régions', compliance: 'Conformité', translations: 'Traductions', media: 'Médias', social: 'Social', ai: 'Copilote IA', analytics: 'Analyses', orders: 'Commandes', customers: 'Clients' },
      notifications: { title: 'Notifications', markRead: 'Tout marquer lu' },
      searchPlaceholder: 'Rechercher produits, commandes, clients...',
    },
  },
  de: {
    common: { language: 'Sprache', region: 'Region', shop: 'Shop', help: 'Hilfe', store: 'Storefront', admin: 'Admin' },
    header: {
      freeShipping: 'Kostenloser Versand ab {{amount}}',
      nav: { shop: 'Shop', new: 'Neu', bestSellers: 'Bestseller', story: 'Unsere Geschichte', help: 'Hilfe' },
      actions: { search: 'Suche', account: 'Konto', wishlist: 'Merkliste', cart: 'Warenkorb', openMenu: 'Menü öffnen' },
    },
    footer: {
      newsletterTitle: 'Trete dem JISOO Beauty Circle bei',
      newsletterBody: 'Erfahre zuerst von Neuheiten, exklusiven Angeboten und K-Beauty-Geheimnissen.',
      emailPlaceholder: 'E-Mail eingeben',
      subscribe: 'Abonnieren',
      subscribed: 'Danke fürs Abonnieren! Willkommen im Beauty Circle.',
    },
    regionMessages: {
      visible_and_buyable: 'In deiner Region verfügbar',
      visible_but_not_buyable: 'Sichtbar, Kauf in deiner Region bald möglich',
      hidden: 'In deiner gewählten Region nicht verfügbar',
      pending_review: 'Wartet auf Compliance-Prüfung für deine Region',
    },
    admin: {
      nav: { dashboard: 'Dashboard', suppliers: 'Lieferanten', products: 'Produkte', regions: 'Regionen', compliance: 'Compliance', translations: 'Übersetzungen', media: 'Medien', social: 'Social', ai: 'KI-Copilot', analytics: 'Analysen', orders: 'Bestellungen', customers: 'Kunden' },
      notifications: { title: 'Benachrichtigungen', markRead: 'Alle als gelesen markieren' },
      searchPlaceholder: 'Produkte, Bestellungen, Kunden suchen...',
    },
  },
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]
}
