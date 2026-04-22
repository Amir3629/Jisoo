import { ContentPlaceholder } from '@/components/shared/content-placeholder'

const helpContent: Record<string, { title: string; description: string }> = {
  root: {
    title: 'Help Center',
    description: 'Explore support resources for shipping, returns, and order assistance. Our beauty concierge team is here to help.',
  },
  contact: {
    title: 'Contact JISOO Concierge',
    description: 'Speak with our team for order support, product guidance, or market-specific availability questions.',
  },
  faq: {
    title: 'Frequently Asked Questions',
    description: 'We are curating a full FAQ library. In the meantime, our concierge can help you right away.',
  },
  shipping: {
    title: 'Shipping Information',
    description: 'Shipping timelines and service levels vary by UAE, EU, and Canada. Final delivery details appear at checkout.',
  },
  returns: {
    title: 'Returns & Exchanges',
    description: 'Review our return policy guidance and contact support for region-specific return handling and compliance needs.',
  },
}

export default async function HelpPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  const key = slug?.[0] ?? 'root'
  const content = helpContent[key] ?? helpContent.root

  return (
    <ContentPlaceholder
      title={content.title}
      description={content.description}
      actions={[
        { label: 'Contact Support', href: '/help/contact' },
        { label: 'Continue Shopping', href: '/shop' },
      ]}
    />
  )
}
