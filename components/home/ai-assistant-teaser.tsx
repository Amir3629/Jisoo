'use client'

import Link from 'next/link'
import { Sparkles, MessageCircle, Search, Heart, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'

const features = [
  {
    icon: Search,
    title: 'Product Recommendations',
    description: 'Get personalized suggestions based on your skin type and concerns',
  },
  {
    icon: MessageCircle,
    title: 'Ingredient Q&A',
    description: 'Ask about ingredients, compatibility, and how to layer products',
  },
  {
    icon: Heart,
    title: 'Routine Builder',
    description: 'Create your perfect K-beauty routine with expert guidance',
  },
]

const sampleQuestions = [
  'Is this serum good for sensitive skin?',
  'Can I use vitamin C with retinol?',
  'What products help with dehydration?',
  'Is this available in Canada?',
]

export function AiAssistantTeaser() {
  const { locale, dictionary } = useLocale()
  const t = dictionary.home
  const copy = {
    kicker: locale === 'ar' ? 'إرشاد جمال بالذكاء الاصطناعي' : locale === 'fr' ? 'Conseil beauté par IA' : locale === 'de' ? 'KI-gestützte Beauty-Beratung' : locale === 'ko' ? 'AI 뷰티 가이드' : locale === 'tr' ? 'AI destekli güzellik rehberi' : 'AI-Powered Beauty Guidance',
    title: locale === 'ar' ? 'مستشارة الجمال الشخصية' : locale === 'fr' ? 'La conseillère beauté concierge' : locale === 'de' ? 'Die Concierge-Beauty-Beratung' : locale === 'ko' ? '컨시어지 뷰티 어드바이저' : locale === 'tr' ? 'Concierge güzellik danışmanı' : 'The Concierge Beauty Advisor',
    description: locale === 'ar' ? 'طبقة محادثة راقية مدرّبة على روتينات JISOO وتركيباتها ومنطق المكونات للاستشارة الشخصية الفاخرة.' : locale === 'fr' ? 'Une couche conversationnelle raffinée, entraînée sur les routines, formules et logiques d’ingrédients JISOO.' : locale === 'de' ? 'Eine verfeinerte Konversationsschicht, trainiert auf JISOO Routinen, Formeln und Inhaltsstofflogik.' : locale === 'ko' ? 'JISOO 루틴, 포뮬러, 성분 로직을 기반으로 한 개인 맞춤 럭셔리 상담 레이어입니다.' : locale === 'tr' ? 'JISOO rutinleri, formülleri ve içerik mantığıyla eğitilmiş rafine bir sohbet katmanı.' : 'A refined conversational layer trained on JISOO routines, formulas, and ingredient logic—designed for personal luxury consultation.',
    online: locale === 'ar' ? 'متصل' : locale === 'fr' ? 'En ligne' : locale === 'de' ? 'Online' : locale === 'ko' ? '온라인' : locale === 'tr' ? 'Çevrimiçi' : 'Online',
    userMessage: locale === 'ar' ? 'هل يمكنك مساعدتي في مقارنة منتجات العناية الأولية؟' : locale === 'fr' ? 'Pouvez-vous aider à comparer des produits de soin brouillons ?' : locale === 'de' ? 'Kannst du Entwurfsprodukte für Pflege vergleichen?' : locale === 'ko' ? '초안 케어 제품을 비교해 줄 수 있나요?' : locale === 'tr' ? 'Taslak bakım ürünlerini karşılaştırmaya yardım eder misin?' : 'Can you help compare draft care products?',
    assistantMessage: locale === 'ar' ? 'يمكنني تنظيم السجلات الأولية، لكن الادعاءات العامة يجب أن تنتظر مستندات الموردين الموثقة.' : locale === 'fr' ? 'Je peux organiser les fiches brouillon, mais les promesses publiques doivent attendre les documents fournisseur vérifiés.' : locale === 'de' ? 'Ich kann Entwurfsdaten ordnen, aber öffentliche Claims sollten auf verifizierte Lieferantendokumente warten.' : locale === 'ko' ? '초안 기록 정리는 도울 수 있지만 공개 표현은 검증된 공급사 문서를 기다려야 합니다.' : locale === 'tr' ? 'Taslak kayıtları düzenleyebilirim, ancak genel iddialar doğrulanmış tedarikçi belgelerini beklemeli.' : 'I can help organize draft records, but public claims should wait for verified supplier documentation.',
    tryAsking: locale === 'ar' ? 'جرّبي السؤال:' : locale === 'fr' ? 'Essayez de demander :' : locale === 'de' ? 'Frag zum Beispiel:' : locale === 'ko' ? '이렇게 물어보세요:' : locale === 'tr' ? 'Şunu sormayı deneyin:' : 'Try asking:',
  }
  const localizedFeatures = features.map((feature) => {
    const translations: Record<string, Partial<Record<typeof locale, { title: string; description: string }>>> = {
      'Product Recommendations': { ar: { title: 'توصيات المنتجات', description: 'اقتراحات شخصية حسب نوع بشرتك واحتياجاتها' }, fr: { title: 'Recommandations produits', description: 'Des suggestions personnalisées selon votre type de peau et vos besoins' }, de: { title: 'Produktempfehlungen', description: 'Personalisierte Vorschläge nach Hauttyp und Anliegen' }, ko: { title: '제품 추천', description: '피부 타입과 고민에 맞춘 개인화 추천' }, tr: { title: 'Ürün önerileri', description: 'Cilt tipinize ve ihtiyaçlarınıza göre kişisel öneriler' } },
      'Ingredient Q&A': { ar: { title: 'أسئلة المكونات', description: 'اسألي عن المكونات والتوافق وطريقة ترتيب الطبقات' }, fr: { title: 'Questions ingrédients', description: 'Posez vos questions sur les ingrédients, compatibilités et superpositions' }, de: { title: 'Inhaltsstoff-Fragen', description: 'Frage nach Inhaltsstoffen, Kompatibilität und Layering' }, ko: { title: '성분 Q&A', description: '성분, 궁합, 레이어링 방법을 질문하세요' }, tr: { title: 'İçerik soru-cevap', description: 'İçerikler, uyumluluk ve katmanlama hakkında sorun' } },
      'Routine Builder': { ar: { title: 'بناء الروتين', description: 'كوّني روتين K-beauty المثالي بإرشاد خبير' }, fr: { title: 'Créateur de routine', description: 'Créez votre routine K-beauty idéale avec un accompagnement expert' }, de: { title: 'Routine-Builder', description: 'Erstelle deine perfekte K-Beauty-Routine mit Expertinnenführung' }, ko: { title: '루틴 빌더', description: '전문 가이드로 완벽한 K-뷰티 루틴을 만드세요' }, tr: { title: 'Rutin oluşturucu', description: 'Uzman rehberliğiyle ideal K-beauty rutininizi kurun' } },
    }
    return { ...feature, ...(translations[feature.title]?.[locale] ?? {}) }
  })
  const localizedQuestions = sampleQuestions.slice(0, 2).map((question) => {
    const translations: Record<string, Partial<Record<typeof locale, string>>> = {
      'Is this serum good for sensitive skin?': { ar: 'هل هذا السيروم مناسب للبشرة الحساسة؟', fr: 'Ce sérum convient-il aux peaux sensibles ?', de: 'Ist dieses Serum gut für empfindliche Haut?', ko: '이 세럼은 민감성 피부에 좋나요?', tr: 'Bu serum hassas cilt için uygun mu?' },
      'Can I use vitamin C with retinol?': { ar: 'هل يمكنني استخدام فيتامين C مع الريتينول؟', fr: 'Puis-je utiliser la vitamine C avec le rétinol ?', de: 'Kann ich Vitamin C mit Retinol verwenden?', ko: '비타민 C와 레티놀을 함께 써도 되나요?', tr: 'C vitamini retinol ile kullanılabilir mi?' },
    }
    return translations[question]?.[locale] ?? question
  })
  return (
    <AtmosphereSection atmosphere="champagne" withAtmosphereOverlay={false} className="py-24 lg:py-32 text-charcoal">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-rose-mauve/18 blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-champagne-gold/14 blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <ChapterHeading
              kicker={copy.kicker}
              title={copy.title}
              description={copy.description}
              className="max-w-xl [&_h2]:text-charcoal [&_p]:text-charcoal/75 [&_.text-kicker]:text-rose-mauve"
            />

            <div className="mt-2" />

            {/* Features */}
            <div className="mt-10 space-y-6">
              {localizedFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/80 border border-rose-mauve/20">
                    <feature.icon className="w-5 h-5 text-champagne-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal">{feature.title}</h3>
                    <p className="text-sm text-charcoal/65 mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href={localizeHref('/ai-consultant', locale)}
                className={cn(
                  'inline-flex items-center gap-2 px-8 py-4 rounded-full',
                  'bg-champagne-gold text-charcoal font-medium',
                  'hover:bg-champagne-gold/90 transition-all duration-300',
                  'shadow-lg shadow-champagne-gold/20'
                )}
              >
                {t.tryAiAssistant}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Interactive Preview */}
          <div className="relative">
            {/* Chat Window Preview */}
            <div className="relative bg-white/85 rounded-3xl p-6 border border-rose-mauve/20 shadow-luxury">
              {/* Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-champagne-gold to-rose-mauve flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-charcoal">JISOO AI</h4>
                  <p className="text-xs text-rose-mauve/70">{copy.online}</p>
                </div>
              </div>

              {/* Sample Messages */}
              <div className="py-6 space-y-4">
                <div className="flex justify-end">
                  <div className="bg-rose-mauve/20 px-4 py-3 rounded-2xl rounded-br-md max-w-[80%]">
                    <p className="text-sm text-charcoal">{copy.userMessage}</p>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-white/80 border border-rose-mauve/15 px-4 py-3 rounded-2xl rounded-bl-md max-w-[80%]">
                    <p className="text-sm text-charcoal">
                      {copy.assistantMessage}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sample Questions */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-rose-mauve/70 mb-3">{copy.tryAsking}</p>
                <div className="flex flex-wrap gap-2">
                  {localizedQuestions.map((q, i) => (
                    <button
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-white text-xs text-rose-mauve border border-rose-mauve/20 hover:bg-rose-mauve/10 transition-colors truncate max-w-full"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 p-3 rounded-xl bg-champagne-gold/20">
              <Sparkles className="w-6 h-6 text-champagne-gold" />
            </div>
          </div>
        </div>
      </div>
    </AtmosphereSection>
  )
}
