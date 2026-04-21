'use client'

import { useState } from 'react'
import { Copy, Sparkles } from 'lucide-react'
import { PageHeader } from '@/components/admin/ui/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { products } from '@/lib/data'
import { useLocale } from '@/components/providers/locale-provider'
import { i18nContent } from '@/lib/i18n-content'
import { generateProductDescription, generateTranslationDraft, improveMarketingCopy, suggestTagsAndCategory } from '@/lib/ai/admin-ai'

export default function AICopilotPage() {
  const { locale } = useLocale()
  const copy = i18nContent[locale].adminAi

  const [productSlug, setProductSlug] = useState(products[0]?.slug ?? '')
  const [sourceText, setSourceText] = useState('')
  const [targetLocale, setTargetLocale] = useState<'ar' | 'fr' | 'de'>('ar')
  const [output, setOutput] = useState('')
  const [status, setStatus] = useState<'draft' | 'final'>('draft')

  const tags = suggestTagsAndCategory(sourceText || products[0]?.name || '')

  return (
    <div className="space-y-6">
      <PageHeader title={copy.title} description={copy.description} breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'AI Copilot' }]} />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>{copy.generator}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Select value={productSlug} onValueChange={setProductSlug}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {products.map((p) => <SelectItem key={p.id} value={p.slug}>{p.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { setOutput(generateProductDescription(productSlug, 'clinical')); setStatus('draft') }}>{copy.draft}</Button>
              <Button onClick={() => { setOutput(generateProductDescription(productSlug, 'luxury')); setStatus('final') }}>{copy.final}</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{copy.translator}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Textarea value={sourceText} onChange={(e) => setSourceText(e.target.value)} placeholder="Source text" />
            <Select value={targetLocale} onValueChange={(v: 'ar' | 'fr' | 'de') => setTargetLocale(v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">Arabic</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => { setOutput(generateTranslationDraft(sourceText, targetLocale)); setStatus('draft') }}>{copy.translator}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{copy.marketer}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Input value={sourceText} onChange={(e) => setSourceText(e.target.value)} placeholder="Marketing line" />
            <Button onClick={() => { setOutput(improveMarketingCopy(sourceText)); setStatus('final') }}><Sparkles className="h-4 w-4 mr-2" />{copy.marketer}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{copy.tagging}</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>Category:</strong> {tags.category}</p>
            <p><strong>Tags:</strong> {tags.tags.join(', ')}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Output ({status})</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Textarea value={output} onChange={(e) => setOutput(e.target.value)} rows={6} />
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigator.clipboard.writeText(output)}><Copy className="h-4 w-4 mr-2" />Copy</Button>
            <Button>{copy.apply}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
