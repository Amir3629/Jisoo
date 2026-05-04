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
              kicker="AI-Powered Beauty Guidance"
              title="The Concierge Beauty Advisor"
              description="A refined conversational layer trained on JISOO routines, formulas, and ingredient logic—designed for personal luxury consultation."
              className="max-w-xl [&_h2]:text-charcoal [&_p]:text-charcoal/75 [&_.text-kicker]:text-rose-mauve"
            />

            <div className="mt-2" />

            {/* Features */}
            <div className="mt-10 space-y-6">
              {features.map((feature) => (
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
                  <p className="text-xs text-rose-mauve/70">Online</p>
                </div>
              </div>

              {/* Sample Messages */}
              <div className="py-6 space-y-4">
                <div className="flex justify-end">
                  <div className="bg-rose-mauve/20 px-4 py-3 rounded-2xl rounded-br-md max-w-[80%]">
                    <p className="text-sm text-charcoal">Can you help compare draft care products?</p>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-white/80 border border-rose-mauve/15 px-4 py-3 rounded-2xl rounded-bl-md max-w-[80%]">
                    <p className="text-sm text-charcoal">
                      I can help organize draft records, but public claims should wait for verified supplier documentation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sample Questions */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-rose-mauve/70 mb-3">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {sampleQuestions.slice(0, 2).map((q, i) => (
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
