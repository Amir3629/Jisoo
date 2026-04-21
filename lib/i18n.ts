import { notFound } from 'next/navigation'

export const locales = ['en', 'ar', 'fr', 'de', 'ko'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export function isLocale(value: string): value is Locale { return locales.includes(value as Locale) }
export function assertLocale(value: string): Locale { if (!isLocale(value)) notFound(); return value }
export function getDirection(locale: Locale): 'ltr' | 'rtl' { return locale === 'ar' ? 'rtl' : 'ltr' }
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith('/')) return href
  if (href === '/') return `/${locale}`
  if (href.startsWith(`/${locale}/`) || href === `/${locale}`) return href
  const hasLocale = locales.some((l) => href.startsWith(`/${l}/`) || href === `/${l}`)
  if (hasLocale) { const [, , ...parts] = href.split('/'); return `/${locale}/${parts.join('/')}`.replace(/\/$/, '') }
  return `/${locale}${href}`
}

export type Dictionary = {
  common: { language: string; region: string; shop: string; help: string; company: string; legal: string }
  header: { freeShipping: string; nav: { shop: string; new: string; bestSellers: string; story: string; help: string }; actions: { search: string; account: string; wishlist: string; cart: string; openMenu: string } }
  footer: { newsletterTitle: string; newsletterBody: string; emailPlaceholder: string; subscribe: string; subscribed: string; sections: { help: string; company: string; legal: string } }
  home: { discoverCollection: string; ourStory: string; browseAllCategories: string; exploreChapter: string; viewEntireEdit: string; addToCart: string; notAvailable: string; shopTheRitual: string; tryAiAssistant: string; viewShippingInfo: string; followInstagram: string; followTiktok: string; lovedBy: string; shopByConcern: string; joinCommunity: string }
  product: { addToCart: string; notAvailable: string }
  cart: { addToCart: string }
  ai: { title: string; subtitle: string; inputPlaceholder: string; startOver: string; typing: string; suggested: string; askPrompt: string }
  admin: {
    nav: Record<'dashboard'|'suppliers'|'products'|'regions'|'compliance'|'translations'|'media'|'social'|'ai'|'analytics'|'orders'|'customers', string>
    notifications: { title: string; markRead: string }
    searchPlaceholder: string
    aiCopilot: { title: string; description: string; draft: string; final: string; apply: string; generator: string; translator: string; marketer: string; tagging: string }
    translationCenter: { title: string; description: string; search: string; source: string; target: string; generate: string; improve: string; approve: string; saveDraft: string; preview: string }
  }
  regionMessages: Record<'visible_and_buyable'|'visible_but_not_buyable'|'hidden'|'pending_review', string>
}

const en: Dictionary = {
  common: { language: 'Language', region: 'Region', shop: 'Shop', help: 'Help', company: 'Company', legal: 'Legal' },
  header: { freeShipping: 'Free shipping on orders over {{amount}}', nav: { shop: 'Shop', new: 'New', bestSellers: 'Best Sellers', story: 'Our Story', help: 'Help' }, actions: { search: 'Search', account: 'Account', wishlist: 'Wishlist', cart: 'Cart', openMenu: 'Open menu' } },
  footer: { newsletterTitle: 'Join the JISOO Beauty Circle', newsletterBody: 'Be the first to know about new arrivals, exclusive offers, and K-beauty secrets.', emailPlaceholder: 'Enter your email', subscribe: 'Subscribe', subscribed: 'Thank you for subscribing! Welcome to the beauty circle.', sections: { help: 'Help', company: 'Company', legal: 'Legal' } },
  home: { discoverCollection: 'Discover Collection', ourStory: 'Our Story', browseAllCategories: 'Browse All Categories', exploreChapter: 'Explore Chapter', viewEntireEdit: 'View Entire Edit', addToCart: 'Add to Cart', notAvailable: 'Not Available', shopTheRitual: 'Shop the Ritual', tryAiAssistant: 'Try AI Assistant', viewShippingInfo: 'View Shipping Info', followInstagram: 'Follow on Instagram', followTiktok: 'Follow on TikTok', lovedBy: 'Loved by Beauty Enthusiasts', shopByConcern: 'Shop by Concern', joinCommunity: 'Join the Beauty Community' },
  product: { addToCart: 'Add to Cart', notAvailable: 'Not Available' },
  cart: { addToCart: 'Add to Cart' },
  ai: { title: 'JISOO AI Consultant', subtitle: 'Grounded recommendations from your catalog and region', inputPlaceholder: 'Ask about concerns, availability, or product comparison…', startOver: 'Start Over', typing: 'JISOO AI is thinking…', suggested: 'Suggested questions', askPrompt: 'Ask for availability, concerns, or product comparisons.' },
  admin: { nav: { dashboard: 'Dashboard', suppliers: 'Suppliers', products: 'Products', regions: 'Regions', compliance: 'Compliance', translations: 'Translations', media: 'Media', social: 'Social', ai: 'AI Copilot', analytics: 'Analytics', orders: 'Orders', customers: 'Customers' }, notifications: { title: 'Notifications', markRead: 'Mark all read' }, searchPlaceholder: 'Search products, orders, customers...', aiCopilot: { title: 'AI Operations Copilot', description: 'Generate product copy, translations, marketing text, and tags from local catalog context.', draft: 'Draft', final: 'Final', apply: 'Apply', generator: 'Description Generator', translator: 'Translation Generator', marketer: 'Luxury Tone Rewriter', tagging: 'Tag & Category Assistant' }, translationCenter: { title: 'Translation Center', description: 'Manage source text, AI drafts, edits, approvals, and preview across locales.', search: 'Search fields…', source: 'Source', target: 'Target', generate: 'Generate Translation', improve: 'Improve Luxury Tone', approve: 'Approve', saveDraft: 'Save Draft', preview: 'Preview' } },
  regionMessages: { visible_and_buyable: 'Available in your region', visible_but_not_buyable: 'Visible now, purchasing opens soon in your region', hidden: 'Unavailable in your selected region', pending_review: 'Pending compliance review for your region' },
}

const fr: Dictionary = { ...en, common: { language: 'Langue', region: 'Région', shop: 'Boutique', help: 'Aide', company: 'Entreprise', legal: 'Légal' }, home: { ...en.home, discoverCollection: 'Découvrir la collection', ourStory: 'Notre histoire', browseAllCategories: 'Parcourir toutes les catégories', exploreChapter: 'Explorer ce chapitre', viewEntireEdit: 'Voir toute la sélection', addToCart: 'Ajouter au panier', notAvailable: 'Indisponible', shopTheRitual: 'Acheter le rituel', tryAiAssistant: 'Essayer l’Assistant IA', viewShippingInfo: 'Voir les infos de livraison', followInstagram: 'Suivre sur Instagram', followTiktok: 'Suivre sur TikTok', lovedBy: 'Adoré par les passionnés de beauté', shopByConcern: 'Acheter par besoin', joinCommunity: 'Rejoindre la communauté beauté' }, product: { addToCart: 'Ajouter au panier', notAvailable: 'Indisponible' }, cart: { addToCart: 'Ajouter au panier' } }
const de: Dictionary = { ...en, common: { language: 'Sprache', region: 'Region', shop: 'Shop', help: 'Hilfe', company: 'Unternehmen', legal: 'Rechtliches' }, home: { ...en.home, discoverCollection: 'Kollektion entdecken', ourStory: 'Unsere Geschichte', browseAllCategories: 'Alle Kategorien ansehen', exploreChapter: 'Kapitel entdecken', viewEntireEdit: 'Gesamte Auswahl anzeigen', addToCart: 'In den Warenkorb', notAvailable: 'Nicht verfügbar', shopTheRitual: 'Ritual shoppen', tryAiAssistant: 'KI-Assistent testen', viewShippingInfo: 'Versandinfos anzeigen', followInstagram: 'Auf Instagram folgen', followTiktok: 'Auf TikTok folgen', lovedBy: 'Beliebt bei Beauty-Fans', shopByConcern: 'Nach Hautthema shoppen', joinCommunity: 'Der Beauty-Community beitreten' }, product: { addToCart: 'In den Warenkorb', notAvailable: 'Nicht verfügbar' }, cart: { addToCart: 'In den Warenkorb' } }
const ko: Dictionary = { ...en, common: { language: '언어', region: '지역', shop: '쇼핑', help: '도움말', company: '회사', legal: '법률' }, home: { ...en.home, discoverCollection: '컬렉션 보기', ourStory: '브랜드 스토리', browseAllCategories: '전체 카테고리 보기', exploreChapter: '챕터 보기', viewEntireEdit: '전체 에디트 보기', addToCart: '장바구니 담기', notAvailable: '구매 불가', shopTheRitual: '리추얼 쇼핑', tryAiAssistant: 'AI 어시스턴트 체험', viewShippingInfo: '배송 정보 보기', followInstagram: '인스타그램 팔로우', followTiktok: '틱톡 팔로우', lovedBy: '뷰티 애호가들의 선택', shopByConcern: '피부 고민별 쇼핑', joinCommunity: '뷰티 커뮤니티 참여' }, product: { addToCart: '장바구니 담기', notAvailable: '구매 불가' }, cart: { addToCart: '장바구니 담기' } }
const ar: Dictionary = { ...en, common: { language: 'اللغة', region: 'المنطقة', shop: 'المتجر', help: 'المساعدة', company: 'الشركة', legal: 'القانونية' }, home: { ...en.home, discoverCollection: 'اكتشفي المجموعة', ourStory: 'قصتنا', browseAllCategories: 'تصفح كل الفئات', exploreChapter: 'استكشفي الفصل', viewEntireEdit: 'عرض التحرير الكامل', addToCart: 'أضف إلى السلة', notAvailable: 'غير متاح', shopTheRitual: 'تسوّق الطقس', tryAiAssistant: 'جرّب مساعد الذكاء', viewShippingInfo: 'عرض معلومات الشحن', followInstagram: 'تابع على إنستغرام', followTiktok: 'تابع على تيك توك', lovedBy: 'محبوب من عشاق الجمال', shopByConcern: 'تسوّق حسب المشكلة', joinCommunity: 'انضم إلى مجتمع الجمال' }, product: { addToCart: 'أضف إلى السلة', notAvailable: 'غير متاح' }, cart: { addToCart: 'أضف إلى السلة' } }

export const dictionaries: Record<Locale, Dictionary> = { en, ar, fr, de, ko }
export function getDictionary(locale: Locale): Dictionary { return dictionaries[locale] }
