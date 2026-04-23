import { ContentPlaceholder } from '@/components/shared/content-placeholder'

export default function CareersPage() {
  return (
    <ContentPlaceholder
      title="Careers at JISOO"
      description="We are building a global beauty team across operations, brand, and technology."
      actions={[
        { label: 'Contact Us', href: '/help/contact' },
        { label: 'Back to Home', href: '/' },
      ]}
    />
  )
}
