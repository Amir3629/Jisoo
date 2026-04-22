import { ContentPlaceholder } from '@/components/shared/content-placeholder'

const legalContent: Record<string, { title: string; description: string }> = {
  privacy: {
    title: 'Privacy Policy',
    description: 'Learn how JISOO handles customer data, account records, and region-specific privacy responsibilities.',
  },
  terms: {
    title: 'Terms of Service',
    description: 'Our terms define order handling, payment responsibilities, and regional restrictions for safe purchasing.',
  },
  cookies: {
    title: 'Cookie Policy',
    description: 'We use cookies to deliver a refined browsing experience, remember preferences, and improve platform performance.',
  },
  accessibility: {
    title: 'Accessibility',
    description: 'JISOO is committed to inclusive, accessible shopping experiences across devices and locales.',
  },
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = legalContent[slug] ?? legalContent.privacy

  return (
    <ContentPlaceholder
      title={content.title}
      description={content.description}
      actions={[
        { label: 'Back to Home', href: '/' },
        { label: 'Contact Support', href: '/help/contact' },
      ]}
    />
  )
}
