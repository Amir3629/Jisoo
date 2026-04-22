'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Instagram, Play, Heart, MessageCircle, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EditorialMedia } from '@/components/ui/editorial-media'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'

const socialPosts = [
  {
    id: 1,
    type: 'instagram',
    image: '/placeholder.jpg',
    likes: '12.4K',
    comments: '234',
    caption: 'Glass skin goals achieved with our new essence',
  },
  {
    id: 2,
    type: 'tiktok',
    image: '/products/glass-skin-essence-1.jpg',
    views: '2.1M',
    caption: 'My 10-step K-beauty routine',
  },
  {
    id: 3,
    type: 'instagram',
    image: '/products/luminous-glow-serum-1.jpg',
    likes: '8.9K',
    comments: '156',
    caption: 'Before & after using Luminous Glow Serum',
  },
  {
    id: 4,
    type: 'instagram',
    image: '/placeholder.jpg',
    likes: '15.2K',
    comments: '342',
    caption: 'Unboxing the new summer collection',
  },
  {
    id: 5,
    type: 'tiktok',
    image: '/products/glass-skin-essence-1.jpg',
    views: '890K',
    caption: 'POV: Your skin after K-beauty',
  },
  {
    id: 6,
    type: 'instagram',
    image: '/products/luminous-glow-serum-1.jpg',
    likes: '11.1K',
    comments: '198',
    caption: 'Cica Repair Ampoule saved my skin',
  },
]

export function SocialSection() {
  const { locale, dictionary } = useLocale()
  const t = dictionary.home
  return (
    <AtmosphereSection atmosphere="blush" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <ChapterHeading
          kicker="@JISOOBeauty"
          title={t.joinCommunity}
          description="Follow us for K-beauty inspiration, skincare tips, and exclusive content from our community."
          align="center"
          className="mb-12 lg:mb-16 max-w-4xl mx-auto"
        />

        {/* Social Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {socialPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
            >
              <EditorialMedia
                src={post.image}
                alt={post.caption}
                className="absolute inset-0"
                overlayClassName="bg-gradient-to-t from-charcoal/60 to-charcoal/10"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/60 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white p-4">
                  {post.type === 'instagram' ? (
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="w-5 h-5" />
                        <span className="text-sm">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{post.comments}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Play className="w-5 h-5" />
                      <span className="text-sm">{post.views} views</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Type Badge */}
              <div className="absolute top-2 right-2">
                {post.type === 'tiktok' && (
                  <div className="w-8 h-8 rounded-full bg-charcoal flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-full',
              'bg-gradient-to-r from-rose-mauve via-rose-mauve to-champagne-gold text-white font-medium shadow-luxury',
              'hover:opacity-90 transition-opacity'
            )}
          >
            <Instagram className="w-5 h-5" />
            <span>{t.followInstagram}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-full',
              'bg-rose-mauve/90 text-white font-medium border border-rose-mauve/25',
              'hover:bg-rose-mauve/80 transition-colors'
            )}
          >
            <Play className="w-5 h-5" />
            <span>{t.followTiktok}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        {/* UGC CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground">
            Tag <strong className="text-rose-mauve">@JISOOBeauty</strong> and use{' '}
            <strong className="text-rose-mauve">#JISOOGlow</strong> to be featured!
          </p>
        </motion.div>
      </div>
    </AtmosphereSection>
  )
}
