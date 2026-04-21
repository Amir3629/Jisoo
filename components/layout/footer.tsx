'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Youtube, Send } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'

const footerLinks = {
  shop: [
    { label: 'Skincare', href: '/shop/skincare' },
    { label: 'Makeup', href: '/shop/makeup' },
    { label: 'Best Sellers', href: '/shop/best-sellers' },
    { label: 'New Arrivals', href: '/shop/new-arrivals' },
    { label: 'Gift Sets', href: '/shop/sets' },
  ],
  help: [
    { label: 'Contact Us', href: '/help/contact' },
    { label: 'FAQs', href: '/help/faq' },
    { label: 'Shipping Info', href: '/help/shipping' },
    { label: 'Returns & Exchanges', href: '/help/returns' },
    { label: 'Track Order', href: '/account/orders' },
  ],
  company: [
    { label: 'Our Story', href: '/about' },
    { label: 'Korean Partners', href: '/about#partners' },
    { label: 'Sustainability', href: '/about/sustainability' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Cookie Policy', href: '/legal/cookies' },
    { label: 'Accessibility', href: '/legal/accessibility' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { locale, dictionary } = useLocale()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-plum text-warm-ivory">
      {/* Newsletter Section */}
      <div className="border-b border-rose-mauve/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h3 className="text-2xl lg:text-3xl font-serif mb-3">
              {dictionary.footer.newsletterTitle}
            </h3>
            <p className="text-blush-pink/80 mb-8">
              {dictionary.footer.newsletterBody}
            </p>

            {isSubscribed ? (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-champagne-gold font-medium"
              >
                {dictionary.footer.subscribed}
              </motion.p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={dictionary.footer.emailPlaceholder}
                  className={cn(
                    'flex-1 px-5 py-3.5 rounded-full',
                    'bg-warm-ivory/10 border border-warm-ivory/20',
                    'text-warm-ivory placeholder:text-warm-ivory/50',
                    'focus:outline-none focus:border-champagne-gold',
                    'transition-colors duration-300'
                  )}
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={cn(
                    'px-8 py-3.5 rounded-full',
                    'bg-champagne-gold text-charcoal font-medium',
                    'hover:bg-champagne-gold/90 transition-colors',
                    'flex items-center justify-center gap-2'
                  )}
                >
                  <span>{dictionary.footer.subscribe}</span>
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link href={localizeHref('/', locale)} className="inline-block">
              <h2 className="text-3xl font-serif font-bold mb-4">JISOO</h2>
            </Link>
            <p className="text-blush-pink/70 text-sm leading-relaxed mb-6">
              Curating the finest Korean beauty for the world. 
              Premium skincare and makeup, delivered with care.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-warm-ivory/10 hover:bg-champagne-gold hover:text-charcoal transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="font-medium text-champagne-gold mb-4 text-sm uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map(link => (
                <li key={link.href}>
                  <Link
                    href={localizeHref(link.href, locale)}
                    className="text-sm text-blush-pink/70 hover:text-warm-ivory transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-champagne-gold mb-4 text-sm uppercase tracking-wider">
              Help
            </h4>
            <ul className="space-y-3">
              {footerLinks.help.map(link => (
                <li key={link.href}>
                  <Link
                    href={localizeHref(link.href, locale)}
                    className="text-sm text-blush-pink/70 hover:text-warm-ivory transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-champagne-gold mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map(link => (
                <li key={link.href}>
                  <Link
                    href={localizeHref(link.href, locale)}
                    className="text-sm text-blush-pink/70 hover:text-warm-ivory transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-champagne-gold mb-4 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map(link => (
                <li key={link.href}>
                  <Link
                    href={localizeHref(link.href, locale)}
                    className="text-sm text-blush-pink/70 hover:text-warm-ivory transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-rose-mauve/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-blush-pink/60">
            <p>&copy; {new Date().getFullYear()} JISOO Beauty. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span>Made with care from Seoul to the world</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
