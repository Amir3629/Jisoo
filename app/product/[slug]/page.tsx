'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/product/product-card'
import { getProductBySlug, getRelatedProducts, getProductReviews, formatPrice, products as catalogProducts } from '@/lib/data'
import { useCart } from '@/components/providers/cart-provider'
import { useRegion } from '@/components/providers/region-provider'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'
import {
  Heart, Share2, Star, Minus, Plus, Check,
  Sparkles, Info, Trophy, Eye, type LucideIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { evaluateRegionAccess } from '@/lib/services/region-access'
import { resolveImageSrc } from '@/lib/image-fallbacks'
import { getProductJsonLd } from '@/lib/seo'
import { getProductCareFocus, getProductStatusBadge, getRoutineFlowForProduct, getRoutinePlacementForProduct, getRoutineSuggestionProducts, type ProductStatusBadgeKind } from '@/lib/product-merchandising'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

const statusIconMap: Record<ProductStatusBadgeKind, LucideIcon> = {
  'best-seller': Trophy,
  'most-viewed': Eye,
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params)
  const product = getProductBySlug(slug)
  const relatedProducts = product ? getRelatedProducts(product.id) : []
  const reviews = product ? getProductReviews(product.id) : []

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'reviews'>('details')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null)

  const { addToCart } = useCart()
  const { region } = useRegion()
  const { locale, dictionary } = useLocale()
  const t = dictionary.home
  const copy = {
    share: locale === 'ar' ? 'مشاركة' : locale === 'fr' ? 'Partager' : locale === 'de' ? 'Teilen' : locale === 'ko' ? '공유' : locale === 'tr' ? 'Paylaş' : 'Share',
    askAi: locale === 'ar' ? 'اسأل مساعد الذكاء الاصطناعي' : locale === 'fr' ? 'Demander à l’assistant IA' : locale === 'de' ? 'KI-Assistent fragen' : locale === 'ko' ? 'AI 어시스턴트에게 묻기' : locale === 'tr' ? 'AI Asistanına Sor' : 'Ask AI Assistant',
    size: locale === 'ar' ? 'الحجم' : locale === 'fr' ? 'Taille' : locale === 'de' ? 'Größe' : locale === 'ko' ? '용량' : locale === 'tr' ? 'Boyut' : 'Size',
    texture: locale === 'ar' ? 'الملمس' : locale === 'fr' ? 'Texture' : locale === 'de' ? 'Textur' : locale === 'ko' ? '텍스처' : locale === 'tr' ? 'Doku' : 'Texture',
    finish: locale === 'ar' ? 'اللمسة النهائية' : locale === 'fr' ? 'Fini' : locale === 'de' ? 'Finish' : locale === 'ko' ? '피니시' : locale === 'tr' ? 'Bitiş' : 'Finish',
    skinTypes: locale === 'ar' ? 'أنواع البشرة' : locale === 'fr' ? 'Types de peau' : locale === 'de' ? 'Hauttypen' : locale === 'ko' ? '피부 타입' : locale === 'tr' ? 'Cilt Tipleri' : 'Skin Types',
    detailsTab: locale === 'ar' ? 'التفاصيل وطريقة الاستخدام' : locale === 'fr' ? 'Détails & Utilisation' : locale === 'de' ? 'Details & Anwendung' : locale === 'ko' ? '상세 정보 & 사용법' : locale === 'tr' ? 'Detaylar ve Kullanım' : 'Details & How to Use',
    about: locale === 'ar' ? 'عن هذا المنتج' : locale === 'fr' ? 'À propos de ce produit' : locale === 'de' ? 'Über dieses Produkt' : locale === 'ko' ? '제품 소개' : locale === 'tr' ? 'Bu Ürün Hakkında' : 'About This Product',
    howToUse: locale === 'ar' ? 'طريقة الاستخدام' : locale === 'fr' ? 'Mode d’utilisation' : locale === 'de' ? 'Anwendung' : locale === 'ko' ? '사용 방법' : locale === 'tr' ? 'Kullanım Şekli' : 'How to Use',
    keyBenefits: locale === 'ar' ? 'الفوائد الرئيسية' : locale === 'fr' ? 'Bénéfices clés' : locale === 'de' ? 'Hauptvorteile' : locale === 'ko' ? '핵심 효능' : locale === 'tr' ? 'Temel Faydalar' : 'Key Benefits',
    keyIngredients: locale === 'ar' ? 'المكونات الرئيسية' : locale === 'fr' ? 'Ingrédients clés' : locale === 'de' ? 'Hauptinhaltsstoffe' : locale === 'ko' ? '주요 성분' : locale === 'tr' ? 'Temel İçerikler' : 'Key Ingredients',
    verified: locale === 'ar' ? 'موثق' : locale === 'fr' ? 'Vérifié' : locale === 'de' ? 'Verifiziert' : locale === 'ko' ? '인증됨' : locale === 'tr' ? 'Doğrulandı' : 'Verified',
    noReviews: locale === 'ar' ? 'ستظهر المراجعات بعد التحقق.' : locale === 'fr' ? 'Les avis apparaîtront après validation.' : locale === 'de' ? 'Bewertungen erscheinen nach Prüfung.' : locale === 'ko' ? '검증 후 리뷰가 표시됩니다.' : locale === 'tr' ? 'Yorumlar doğrulamadan sonra gösterilecek.' : 'Verified reviews will appear after approval.',
    youMayAlsoLike: locale === 'ar' ? 'قد يعجبك أيضًا' : locale === 'fr' ? 'Vous aimerez aussi' : locale === 'de' ? 'Das könnte dir auch gefallen' : locale === 'ko' ? '함께 보면 좋은 제품' : locale === 'tr' ? 'Bunlar da İlginizi Çekebilir' : 'You May Also Like',
    ingredientsTab: locale === 'ar' ? 'المكونات' : locale === 'fr' ? 'Ingrédients' : locale === 'de' ? 'Inhaltsstoffe' : locale === 'ko' ? '성분' : locale === 'tr' ? 'İçerikler' : 'Ingredients',
    reviewsTab: locale === 'ar' ? 'المراجعات' : locale === 'fr' ? 'Avis' : locale === 'de' ? 'Bewertungen' : locale === 'ko' ? '리뷰' : locale === 'tr' ? 'Yorumlar' : 'Reviews',
    photoUploadTitle: locale === 'ar' ? 'رفع صورة العميل (واجهة تجريبية)' : locale === 'fr' ? 'Téléversement photo client (UI)' : locale === 'de' ? 'Kundenfoto-Upload (UI)' : locale === 'ko' ? '고객 사진 업로드(UI)' : locale === 'tr' ? 'Müşteri Fotoğraf Yükleme (UI)' : 'Customer Photo Upload (UI Scaffold)',
    photoUploadBody: locale === 'ar' ? 'شارك صورة النتيجة بعد أسبوعين من الاستخدام. ميزة الرفع غير متصلة بعد.' : locale === 'fr' ? 'Partagez votre photo résultat après 2 semaines. Le backend d’upload n’est pas encore connecté.' : locale === 'de' ? 'Teile dein Ergebnisfoto nach 2 Wochen Nutzung. Upload-Backend ist noch nicht verbunden.' : locale === 'ko' ? '2주 사용 후 결과 사진을 공유하세요. 업로드 백엔드는 아직 연결되지 않았습니다.' : locale === 'tr' ? '2 haftalık kullanım sonrası sonuç fotoğrafınızı paylaşın. Yükleme altyapısı henüz bağlı değil.' : 'Share your texture/result photo after 2 weeks of use. Upload backend is not connected yet.',
    choosePhoto: locale === 'ar' ? 'اختر صورة' : locale === 'fr' ? 'Choisir une photo' : locale === 'de' ? 'Foto auswählen' : locale === 'ko' ? '사진 선택' : locale === 'tr' ? 'Fotoğraf Seç' : 'Choose Photo',
    careFocus: locale === 'ar' ? 'تركيز العناية' : locale === 'fr' ? 'Objectif soin' : locale === 'de' ? 'Pflegefokus' : locale === 'ko' ? '케어 포커스' : locale === 'tr' ? 'Bakım odağı' : 'Care focus',
    routineTitle: locale === 'ar' ? 'كيف يدخل هذا المنتج في الروتين' : locale === 'fr' ? 'Où placer ce produit dans la routine' : locale === 'de' ? 'So passt dieses Produkt in die Routine' : locale === 'ko' ? '이 제품을 루틴에 넣는 순서' : locale === 'tr' ? 'Bu ürün rutinde nereye gelir' : 'Where this fits in your routine',
    routineBody: locale === 'ar' ? 'مثال سريع للترتيب حتى يعرف العميل ماذا يستخدم أولاً وما يأتي بعده.' : locale === 'fr' ? 'Un guide court pour montrer quoi utiliser d’abord et quoi appliquer ensuite.' : locale === 'de' ? 'Eine kurze Reihenfolge, damit Kund:innen wissen, was zuerst und danach kommt.' : locale === 'ko' ? '무엇을 먼저 쓰고 다음에 무엇을 바르는지 보여주는 간단한 순서입니다.' : locale === 'tr' ? 'Müşterinin önce neyi, sonra neyi kullanacağını görmesi için kısa bir sıra.' : 'A simple order guide so customers know what to use first and what comes next.',
    highlightedStep: locale === 'ar' ? 'خطوة هذا المنتج' : locale === 'fr' ? 'Étape de ce produit' : locale === 'de' ? 'Schritt dieses Produkts' : locale === 'ko' ? '이 제품 단계' : locale === 'tr' ? 'Bu ürünün adımı' : 'This product step',
    before: locale === 'ar' ? 'قبل ذلك' : locale === 'fr' ? 'Avant' : locale === 'de' ? 'Davor' : locale === 'ko' ? '이전 단계' : locale === 'tr' ? 'Önce' : 'Before',
    after: locale === 'ar' ? 'بعد ذلك' : locale === 'fr' ? 'Après' : locale === 'de' ? 'Danach' : locale === 'ko' ? '다음 단계' : locale === 'tr' ? 'Sonra' : 'After',
    completeRoutine: locale === 'ar' ? 'أكملي روتين العناية' : locale === 'fr' ? 'Compléter le rituel' : locale === 'de' ? 'Routine vervollständigen' : locale === 'ko' ? '루틴 완성하기' : locale === 'tr' ? 'Rutini tamamla' : 'Complete your care ritual',
    pairsWith: locale === 'ar' ? 'يتناغم بشكل جميل مع' : locale === 'fr' ? 'S’accorde avec' : locale === 'de' ? 'Passt wunderbar zu' : locale === 'ko' ? '함께 쓰기 좋은 제품' : locale === 'tr' ? 'Şunlarla güzel eşleşir' : 'Pairs beautifully with',
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-warm-ivory">
        <Header />
        <div className="pt-32 pb-24 text-center">
          <h1 className="text-2xl font-serif text-charcoal">{dictionary.common.productNotFound}</h1>
          <Link href={localizeHref('/shop', locale)} className="mt-4 inline-block text-plum hover:text-rose-mauve">
            {dictionary.common.backToShop}
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const access = evaluateRegionAccess(product, region)
  const isBuyable = access.isBuyable
  const isVisibleOnly = access.status === 'visible_but_not_buyable'
  const statusBadge = getProductStatusBadge(product)
  const careFocus = getProductCareFocus(product)
  const routinePlacement = getRoutinePlacementForProduct(product)
  const routineSuggestions = getRoutineSuggestionProducts(product, catalogProducts, 3)
  const routineFlow = getRoutineFlowForProduct(product)
  const StatusIcon = statusBadge ? statusIconMap[statusBadge.kind] : null

  const handleAddToCart = () => {
    if (isBuyable) {
      addToCart(product, quantity, selectedVariant || undefined)
    }
  }

  return (
    <main className="min-h-screen bg-warm-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getProductJsonLd(product)) }}
      />
      <Header />

      {/* Breadcrumb */}
      <div className="pt-28 lg:pt-32 pb-4 bg-nude-beige/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <nav className="flex items-center gap-2 text-sm">
            <Link href={localizeHref('/', locale)} className="text-muted-foreground hover:text-plum transition-colors">
              {dictionary.product.breadcrumbHome}
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href={localizeHref('/shop', locale)} className="text-muted-foreground hover:text-plum transition-colors">
              {dictionary.product.breadcrumbShop}
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href={localizeHref(`/shop/${product.category}`, locale)} className="text-muted-foreground hover:text-plum transition-colors capitalize">
              {product.category}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-charcoal">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-square rounded-3xl overflow-hidden bg-white"
              >
                <Image
                  src={resolveImageSrc(product.images[selectedImage]?.src)}
                  alt={product.images[selectedImage]?.alt || product.name}
                  fill
                  className="object-cover"
                  priority
                />

                {/* JISOO Watermark */}
                <div className="absolute bottom-4 right-4 rounded-full bg-white/80 px-4 py-2 backdrop-blur-sm">
                  <span className="text-sm font-serif font-semibold text-plum">JISOO</span>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {statusBadge && StatusIcon && (
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-warm-ivory/70 bg-white/86/90 px-3 py-1 text-xs font-medium text-charcoal shadow-sm backdrop-blur-xl">
                      <StatusIcon className="h-3.5 w-3.5 text-rose-mauve" />
                      {statusBadge.label}
                    </span>
                  )}
                  {product.isNew && (
                    <span className="px-3 py-1 text-xs font-medium bg-plum text-warm-ivory rounded-full">
                      {dictionary.common.new}
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="px-3 py-1 text-xs font-medium bg-champagne-gold text-charcoal rounded-full">
                      {dictionary.common.bestSeller}
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        'relative w-20 h-20 rounded-xl overflow-hidden',
                        'border-2 transition-all',
                        selectedImage === index
                          ? 'border-plum'
                          : 'border-transparent hover:border-blush-pink'
                      )}
                    >
                      <Image
                        src={resolveImageSrc(image.src)}
                        alt={image.alt}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              {/* Category & Brand */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-medium text-rose-mauve uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-blush-pink" />
                <span className="text-sm text-muted-foreground">{product.brand}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-charcoal">
                {product.name}
              </h1>
              {product.subtitle && (
                <p className="mt-2 text-lg text-muted-foreground">{product.subtitle}</p>
              )}

              {product.reviewCount ? (
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-5 h-5',
                          i < Math.floor(product.rating ?? 0)
                            ? 'text-champagne-gold fill-current'
                            : 'text-blush-pink'
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">
                  Product copy pending supplier verification.
                </p>
              )}

              {/* Price */}
              <div className="flex items-center gap-3 mt-6">
                <span className="text-3xl font-bold text-plum">
                  {formatPrice(selectedVariant?.price ?? product.price, product.currency)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>

              {/* Region Availability */}
              {(isVisibleOnly || access.status === 'pending_review') && (
                <div className="mt-4 p-4 rounded-xl bg-rose-mauve/10 border border-rose-mauve/20">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-rose-mauve flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-charcoal">{dictionary.product.notAvailableInRegionTitle}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {access.complianceWarning ?? dictionary.product.notAvailableInRegionBody}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mt-6 overflow-hidden rounded-3xl border border-blush-pink/30 bg-white/70 p-5 shadow-[0_18px_60px_rgba(79,54,60,0.075)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-mauve">{copy.careFocus}</p>
                <h2 className="mt-2 text-xl font-serif font-semibold text-charcoal">{careFocus.title}</h2>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {careFocus.description}
                </p>
                <p className="mt-3 text-sm leading-6 text-charcoal/58">
                  {product.shortDescription}
                </p>
              </div>

              {/* Benefits Quick View */}
              <div className="mt-6 flex flex-wrap gap-3">
                {product.keyBenefits.slice(0, 3).map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-blush-pink/50"
                  >
                    <Sparkles className="w-4 h-4 text-rose-mauve" />
                    <span className="text-sm text-charcoal">{benefit}</span>
                  </div>
                ))}
              </div>



              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-medium text-charcoal mb-3">{dictionary.product.selectShade}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map(variant => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        disabled={!variant.inStock}
                        className={cn(
                          'px-4 py-2 rounded-full text-sm font-medium transition-all',
                          selectedVariant?.id === variant.id
                            ? 'bg-gradient-to-r from-rose-mauve to-[#d3af84] text-white'
                            : 'bg-white border border-blush-pink text-charcoal hover:border-rose-mauve',
                          !variant.inStock && 'opacity-50 cursor-not-allowed line-through'
                        )}
                      >
                        {variant.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-full border border-blush-pink flex items-center justify-center hover:bg-blush-pink/20 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-full border border-blush-pink flex items-center justify-center hover:bg-blush-pink/20 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={!isBuyable}
                  className={cn(
                    'flex-1 py-4 px-8 rounded-full font-medium text-lg transition-all',
                    isBuyable
                      ? 'bg-gradient-to-r from-rose-mauve to-[#d3af84] text-white hover:brightness-105'
                      : 'bg-gradient-to-r from-rose-mauve to-[#d3af84] text-white cursor-not-allowed opacity-70'
                  )}
                >
                  {isBuyable ? t.addToCart : dictionary.product.notAvailable}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={cn(
                    'w-14 h-14 rounded-full border flex items-center justify-center transition-all',
                    isWishlisted
                      ? 'bg-rose-mauve text-white border-rose-mauve'
                      : 'border-blush-pink text-charcoal hover:border-rose-mauve'
                  )}
                >
                  <Heart className={cn('w-5 h-5', isWishlisted && 'fill-current')} />
                </button>
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center gap-6 text-sm">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-plum transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>{copy.share}</span>
                </button>
              </div>

              {/* Size & Info */}
              <div className="mt-8 pt-8 border-t border-blush-pink/30 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">{copy.size}</span>
                  <p className="font-medium text-charcoal">{product.size}</p>
                </div>
                {product.texture && (
                  <div>
                    <span className="text-muted-foreground">{copy.texture}</span>
                    <p className="font-medium text-charcoal">{product.texture}</p>
                  </div>
                )}
                {product.finish && (
                  <div>
                    <span className="text-muted-foreground">{copy.finish}</span>
                    <p className="font-medium text-charcoal">{product.finish}</p>
                  </div>
                )}
                <div>
                  <span className="text-muted-foreground">{copy.skinTypes}</span>
                  <p className="font-medium text-charcoal">{product.skinType.slice(0, 2).join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Tab Headers */}
          <div className="flex items-center gap-8 border-b border-blush-pink/30">
            {(['details', 'ingredients', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'pb-4 text-lg font-medium transition-colors relative',
                  activeTab === tab
                    ? 'text-plum'
                    : 'text-muted-foreground hover:text-charcoal'
                )}
              >
                {tab === 'details' && copy.detailsTab}
                {tab === 'ingredients' && copy.ingredientsTab}
                {tab === 'reviews' && `${copy.reviewsTab} (${product.reviewCount ?? 0})`}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-plum"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-8">
            <AnimatePresence mode="wait">
              {activeTab === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid md:grid-cols-2 gap-12"
                >
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-charcoal mb-4">
                      {copy.about}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.longDescription}
                    </p>

                    <h3 className="text-xl font-serif font-semibold text-charcoal mt-8 mb-4">
                      {copy.howToUse}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.usageInstructions}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-serif font-semibold text-charcoal mb-6">
                      {copy.keyBenefits}
                    </h3>
                    <div className="space-y-4">
                      {product.keyBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-nude-beige/50">
                          <div className="p-2 rounded-lg bg-white">
                            <Sparkles className="w-5 h-5 text-rose-mauve" />
                          </div>
                          <div>
                            <h4 className="font-medium text-charcoal">{benefit}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Pending verified supplier documentation.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'ingredients' && (
                <motion.div
                  key="ingredients"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h3 className="text-xl font-serif font-semibold text-charcoal mb-6">
                    {copy.keyIngredients}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {product.ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="p-6 rounded-2xl bg-gradient-to-br from-blush-pink/10 to-nude-beige/30"
                      >
                        <h4 className="font-semibold text-charcoal">{ingredient}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Details pending verified INCI documentation.
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {reviews.length > 0 ? (
                    <div className="space-y-6">
                      {reviews.map(review => (
                        <div key={review.id} className="p-6 rounded-2xl bg-nude-beige/30">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-plum/20 flex items-center justify-center">
                              <span className="font-semibold text-plum">
                                {review.customerName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-charcoal">{review.customerName}</p>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={cn(
                                        'w-4 h-4',
                                        i < review.rating
                                          ? 'text-champagne-gold fill-current'
                                          : 'text-blush-pink'
                                      )}
                                    />
                                  ))}
                                </div>
                                {review.isVerified && (
                                  <span className="text-xs text-green-600 flex items-center gap-1">
                                    <Check className="w-3 h-3" /> {copy.verified}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <h4 className="font-medium text-charcoal mb-2">{review.title}</h4>
                          <p className="text-muted-foreground">{review.content}</p>
                        </div>
                      ))}
                      <div className="p-6 rounded-2xl border border-dashed border-rose-mauve/30 bg-white/70">
                        <h4 className="font-medium text-charcoal">{copy.photoUploadTitle}</h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {copy.photoUploadBody}
                        </p>
                        <button className="mt-4 rounded-full border border-rose-mauve/25 px-4 py-2 text-sm text-charcoal hover:border-rose-mauve/45">
                          {copy.choosePhoto}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">{copy.noReviews}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>


      {/* Routine Guide */}
      <section className="py-12 bg-warm-ivory">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-mauve">{copy.highlightedStep}</p>
              <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight text-charcoal lg:text-3xl">{copy.routineTitle}</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{copy.routineBody}</p>
            </div>

            <div className="space-y-5">
              <div className="relative pl-7">
                <div aria-hidden="true" className="absolute left-2.5 top-2 bottom-2 w-px bg-blush-pink/60" />
                <div className="space-y-5">
                  {routineFlow.map((step) => {
                    const label = step.isCurrent ? copy.highlightedStep : step.key === routinePlacement.before?.key ? copy.before : copy.after

                    return (
                      <div key={step.key} className="relative">
                        <span
                          className={cn(
                            'absolute -left-[1.95rem] top-1 h-5 w-5 rounded-full border bg-warm-ivory',
                            step.isCurrent ? 'border-rose-mauve bg-rose-mauve shadow-[0_0_0_5px_rgba(154,98,118,0.10)]' : 'border-blush-pink'
                          )}
                        />
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-mauve/85">{label}</p>
                        <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className={cn('font-serif text-xl font-semibold', step.isCurrent ? 'text-charcoal' : 'text-charcoal/80')}>{step.step}. {step.title}</h3>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {routineSuggestions.length > 0 && (
            <div className="mt-12 border-t border-blush-pink/30 pt-8">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-mauve">{copy.pairsWith}</p>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-charcoal">{copy.completeRoutine}</h3>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {routineSuggestions.map((suggestion) => (
                  <Link
                    key={suggestion.id}
                    href={localizeHref(`/product/${suggestion.slug}`, locale)}
                    className="group grid grid-cols-[84px_1fr] gap-4 border-b border-blush-pink/25 pb-5 transition duration-300 hover:border-rose-mauve/40"
                  >
                    <div className="relative h-24 overflow-hidden rounded-2xl bg-white">
                      <Image
                        src={resolveImageSrc(suggestion.images[0]?.src)}
                        alt={suggestion.name}
                        fill
                        sizes="96px"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0 py-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-mauve">{suggestion.category}</p>
                      <h4 className="mt-2 line-clamp-2 text-sm font-medium leading-5 text-charcoal group-hover:text-plum">{suggestion.name}</h4>
                      <p className="mt-2 text-sm text-muted-foreground">{formatPrice(suggestion.price, suggestion.currency)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 lg:py-24 bg-warm-ivory">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-charcoal mb-8">
              {copy.youMayAlsoLike}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
