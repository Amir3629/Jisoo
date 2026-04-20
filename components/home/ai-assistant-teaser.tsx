'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, MessageCircle, Search, Heart, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-plum to-charcoal text-warm-ivory relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-rose-mauve/30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-champagne-gold/20 blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blush-pink text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Beauty Guidance</span>
            </div>

            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold leading-tight">
              Meet Your Personal
              <span className="block text-champagne-gold">Beauty Advisor</span>
            </h2>

            <p className="mt-6 text-lg text-blush-pink/80 max-w-lg">
              Our AI assistant understands K-beauty inside and out. Get instant answers 
              about products, ingredients, and routines tailored to your unique skin.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                    <feature.icon className="w-5 h-5 text-champagne-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-warm-ivory">{feature.title}</h3>
                    <p className="text-sm text-blush-pink/70 mt-1">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10"
            >
              <Link
                href="/assistant"
                className={cn(
                  'inline-flex items-center gap-2 px-8 py-4 rounded-full',
                  'bg-champagne-gold text-charcoal font-medium',
                  'hover:bg-champagne-gold/90 transition-all duration-300',
                  'shadow-lg shadow-champagne-gold/20'
                )}
              >
                Try AI Assistant
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Interactive Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Chat Window Preview */}
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              {/* Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-champagne-gold to-rose-mauve flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-warm-ivory">JISOO AI</h4>
                  <p className="text-xs text-blush-pink/60">Online</p>
                </div>
              </div>

              {/* Sample Messages */}
              <div className="py-6 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-end"
                >
                  <div className="bg-rose-mauve/30 px-4 py-3 rounded-2xl rounded-br-md max-w-[80%]">
                    <p className="text-sm text-warm-ivory">What serum is best for dull skin?</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-md max-w-[80%]">
                    <p className="text-sm text-warm-ivory">
                      For dull skin, I recommend our <strong>Luminous Glow Serum</strong>. 
                      It contains 15% Vitamin C and fermented rice water for instant radiance!
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Sample Questions */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-blush-pink/60 mb-3">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {sampleQuestions.slice(0, 2).map((q, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="px-3 py-1.5 rounded-full bg-white/5 text-xs text-blush-pink hover:bg-white/10 transition-colors truncate max-w-full"
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 p-3 rounded-xl bg-champagne-gold/20 backdrop-blur-sm"
            >
              <Sparkles className="w-6 h-6 text-champagne-gold" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
