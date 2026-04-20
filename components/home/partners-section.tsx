'use client'

import { motion } from 'framer-motion'
import { partners } from '@/lib/data'
import { Award, Leaf, FlaskConical } from 'lucide-react'
import { cn } from '@/lib/utils'

const icons = [FlaskConical, Leaf, Award]

export function PartnersSection() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--plum)_1px,_transparent_1px)] bg-[length:40px_40px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-sm font-medium text-rose-mauve uppercase tracking-widest">
            Our Korean Partners
          </span>
          <h2 className="mt-4 text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-charcoal">
            Three Pillars of Excellence
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            We partner with Korea&apos;s most innovative beauty houses, each bringing 
            decades of expertise and breakthrough formulations to JISOO.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {partners.map((partner, index) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div
                  className={cn(
                    'relative p-8 lg:p-10 rounded-3xl',
                    'bg-gradient-to-b from-warm-ivory to-nude-beige/50',
                    'border border-blush-pink/30',
                    'transition-all duration-500',
                    'hover:shadow-luxury hover:-translate-y-2'
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      'w-16 h-16 rounded-2xl flex items-center justify-center mb-6',
                      'bg-white shadow-lg',
                      'group-hover:bg-plum group-hover:text-warm-ivory',
                      'transition-colors duration-300'
                    )}
                  >
                    <Icon className="w-8 h-8 text-plum group-hover:text-warm-ivory transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-serif font-semibold text-charcoal mb-2">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-rose-mauve font-medium mb-4">
                    {partner.specialization}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {partner.description}
                  </p>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-2">
                    {partner.certifications.map(cert => (
                      <span
                        key={cert}
                        className={cn(
                          'px-3 py-1.5 rounded-full text-xs font-medium',
                          'bg-white text-plum border border-blush-pink/50'
                        )}
                      >
                        {cert}
                      </span>
                    ))}
                  </div>

                  {/* Location */}
                  <div className="mt-6 pt-6 border-t border-blush-pink/30">
                    <p className="text-sm text-muted-foreground">
                      {partner.location}
                    </p>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-blush-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 lg:mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-plum/5 border border-plum/10">
            <div className="w-2 h-2 rounded-full bg-champagne-gold" />
            <span className="text-sm text-charcoal">
              <strong>100% Authentic</strong> products direct from Korean manufacturers
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
