'use client'

import { motion } from 'framer-motion'
import { partners } from '@/lib/data'
import { cn } from '@/lib/utils'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'

export function PartnersSection() {
  return (
    <AtmosphereSection atmosphere="blush" className="py-24 lg:py-32">
      <div className="absolute inset-x-0 top-0 divider-luxury" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <ChapterHeading
          kicker="Korean Excellence Network"
          title="Three Houses. One Signature Standard."
          description="Each partner brings a distinct discipline—from fermented heritage to clinical precision—forming JISOO&apos;s formula identity."
          align="center"
          ghostLabel="LABS"
          className="max-w-4xl mx-auto"
        />

        <div className="mt-14 space-y-5">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn(
                'grid lg:grid-cols-[220px_1fr_240px] gap-6 lg:gap-8 items-center rounded-[1.8rem] p-7 lg:p-8',
                'surface-velvet shadow-editorial'
              )}
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-rose-mauve">Partner {index + 1}</p>
                <h3 className="mt-2 text-2xl font-serif text-charcoal">{partner.name}</h3>
                <p className="mt-2 text-sm text-charcoal/60">{partner.location}</p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.16em] text-rose-mauve/85">{partner.specialization}</p>
                <p className="mt-3 text-charcoal/80 leading-relaxed">{partner.description}</p>
              </div>

              <div className="flex flex-wrap lg:justify-end gap-2">
                {partner.certifications.map(cert => (
                  <span
                    key={cert}
                    className="rounded-full border border-rose-mauve/25 bg-white/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-charcoal/75"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AtmosphereSection>
  )
}
