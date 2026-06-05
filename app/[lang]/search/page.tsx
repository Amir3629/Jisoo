import { Suspense } from 'react'
import RouteModule from '@/app/shop/page'

export default function LocalizedSearchPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-warm-ivory" />}>
      <RouteModule />
    </Suspense>
  )
}
