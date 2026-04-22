import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/admin/ui/page-header'
import Link from 'next/link'

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Control administrative preferences, workflow defaults, and platform guardrails." />

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="font-serif">Platform Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Administrative settings are being finalized for launch governance.</p>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/admin">Back to Dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/compliance">Open Compliance</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
