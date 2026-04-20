'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Star, Quote } from 'lucide-react'
import { testimonials } from '@/lib/data'
import { cn } from '@/lib/utils'

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollXProgress } = useScroll({
    container: containerRef,
  })

  return (
    <section className="py-24 lg:py-32 bg-nude-beige/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="text-sm font-medium text-rose-mauve uppercase tracking-widest">
            Customer Stories
          </span>
          <h2 className="mt-4 text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-charcoal">
            Loved by Beauty Enthusiasts
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Join thousands of satisfied customers who have discovered the transformative power of K-beauty.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex-shrink-0 w-[85%] sm:w-[400px] snap-center"
            >
              <div
                className={cn(
                  'h-full p-8 rounded-3xl',
                  'bg-white border border-blush-pink/30',
                  'shadow-luxury'
                )}
              >
                {/* Quote Icon */}
                <div className="w-12 h-12 rounded-full bg-blush-pink/20 flex items-center justify-center mb-6">
                  <Quote className="w-6 h-6 text-rose-mauve" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'w-5 h-5',
                        i < testimonial.rating
                          ? 'text-champagne-gold fill-current'
                          : 'text-blush-pink'
                      )}
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-charcoal leading-relaxed mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Product */}
                {testimonial.productName && (
                  <p className="text-sm text-rose-mauve font-medium mb-4">
                    Purchased: {testimonial.productName}
                  </p>
                )}

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-blush-pink/30">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blush-pink to-rose-mauve flex items-center justify-center">
                    <span className="text-lg font-semibold text-white">
                      {testimonial.customerName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-charcoal">
                      {testimonial.customerName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.customerLocation}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={cn(
                'w-2 h-2 rounded-full transition-colors',
                index === 0 ? 'bg-plum' : 'bg-blush-pink'
              )}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '50K+', label: 'Happy Customers' },
            { value: '4.8', label: 'Average Rating' },
            { value: '98%', label: 'Would Recommend' },
            { value: '25K+', label: 'Reviews' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl lg:text-4xl font-serif font-bold text-plum">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
