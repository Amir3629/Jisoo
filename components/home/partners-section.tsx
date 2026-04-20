'use client'

import { motion } from 'framer-motion'
import { partners } from '@/lib/data'
import { cn } from '@/lib/utils'

export function PartnersSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#f8efea] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(183,110,138,0.15),transparent_32%),radial-gradient(circle_at_85%_75%,rgba(201,164,106,0.18),transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 divider-luxury" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-kicker text-rose-mauve">Korean Excellence Network</p>
          <h2 className="mt-4 text-4xl lg:text-5xl font-serif text-charcoal">
            Three Houses. One Signature Standard.
          </h2>
          <p className="mt-4 text-charcoal/75">
            Each partner brings a distinct discipline—from fermented heritage to clinical precision—forming JISOO&apos;s formula identity.
          </p>
        </motion.div>

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
    </section>
  )
}

