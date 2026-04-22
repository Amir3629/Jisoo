import { ContentPlaceholder } from '@/components/shared/content-placeholder'

export default function SustainabilityPage() {
  return (
    <ContentPlaceholder
      title="Sustainability"
      description="Our sustainability program is being expanded with supplier traceability and packaging impact disclosures."
      actions={[
        { label: 'Our Story', href: '/about' },
        { label: 'Shop Collection', href: '/shop' },
      ]}
    />
  )
}
