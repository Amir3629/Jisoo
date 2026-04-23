import { ContentPlaceholder } from '@/components/shared/content-placeholder'

export default function PressPage() {
  return (
    <ContentPlaceholder
      title="Press & Media"
      description="Press resources and latest announcements are being prepared for our global launch communications."
      actions={[
        { label: 'Contact Support', href: '/help/contact' },
        { label: 'Our Story', href: '/about' },
      ]}
    />
  )
}
