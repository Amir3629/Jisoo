'use client'

import { useMemo, useState } from 'react'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { PageHeader } from '@/components/admin/ui/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { products } from '@/lib/data'
import { useLocale } from '@/components/providers/locale-provider'
import { generateTranslationDraft, improveMarketingCopy } from '@/lib/ai/admin-ai'

type Lang = 'ar' | 'fr' | 'de'
type Status = 'draft' | 'ai_generated' | 'approved'

interface Row {
  id: string
  entityType: 'product' | 'ui' | 'marketing'
  entityName: string
  field: 'title' | 'subtitle' | 'short_description' | 'long_description' | 'bullets' | 'cta_text' | 'warning'
  sourceText: string
  targetLang: Lang
  targetText: string
  status: Status
}

const uiFields = [
  { id: 'ui-hero-title', entityType: 'ui' as const, entityName: 'Homepage Hero', field: 'title' as const, sourceText: 'Seoul Beauty, Curated With Precision' },
  { id: 'mk-cta', entityType: 'marketing' as const, entityName: 'Summer Campaign', field: 'cta_text' as const, sourceText: 'Shop the ritual' },
]

export default function TranslationsPage() {
  const { locale, dictionary } = useLocale()
  const copy = dictionary.admin.translationCenter

  const seedRows: Row[] = useMemo(() => {
    const productRows = products.slice(0, 6).flatMap((p) => [
      { id: `${p.id}-title`, entityType: 'product' as const, entityName: p.name, field: 'title' as const, sourceText: p.name, targetLang: 'ar' as Lang, targetText: '', status: 'draft' as Status },
      { id: `${p.id}-short`, entityType: 'product' as const, entityName: p.name, field: 'short_description' as const, sourceText: p.shortDescription, targetLang: 'ar' as Lang, targetText: '', status: 'draft' as Status },
      { id: `${p.id}-long`, entityType: 'product' as const, entityName: p.name, field: 'long_description' as const, sourceText: p.description ?? '', targetLang: 'ar' as Lang, targetText: '', status: 'draft' as Status },
      { id: `${p.id}-warn`, entityType: 'product' as const, entityName: p.name, field: 'warning' as const, sourceText: 'Availability varies by region', targetLang: 'ar' as Lang, targetText: '', status: 'draft' as Status },
    ])
    return [...productRows, ...uiFields.map((f) => ({ ...f, targetLang: 'ar' as Lang, targetText: '', status: 'draft' as Status }))]
  }, [])

  const [rows, setRows] = useState<Row[]>(seedRows)
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(seedRows[0]?.id ?? '')

  const selected = rows.find((r) => r.id === selectedId) ?? rows[0]
  const filtered = rows.filter((r) => `${r.entityName} ${r.field} ${r.sourceText}`.toLowerCase().includes(query.toLowerCase()))

  const updateSelected = (patch: Partial<Row>) => {
    if (!selected) return
    setRows((prev) => prev.map((r) => (r.id === selected.id ? { ...r, ...patch } : r)))
  }

  return (
    <div className="space-y-6">
      <PageHeader title={copy.title} description={copy.description} breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Translations' }]} />

      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <Input placeholder={copy.search} value={query} onChange={(e) => setQuery(e.target.value)} />
          </CardHeader>
          <CardContent className="space-y-2 max-h-[70vh] overflow-auto">
            {filtered.map((row) => (
              <button key={row.id} onClick={() => setSelectedId(row.id)} className={`w-full text-left border rounded-lg p-2 ${selected?.id === row.id ? 'bg-secondary' : ''}`}>
                <p className="text-sm font-medium">{row.entityName}</p>
                <p className="text-xs text-muted-foreground">{row.field} · {row.status}</p>
              </button>
            ))}
          </CardContent>
        </Card>

        {selected && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{selected.entityName} · {selected.field}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{copy.source}</p>
                  <Textarea value={selected.sourceText} readOnly rows={4} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-muted-foreground">{copy.target}</p>
                    <Select value={selected.targetLang} onValueChange={(v: Lang) => updateSelected({ targetLang: v })}>
                      <SelectTrigger className="h-7 w-24"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">ar</SelectItem>
                        <SelectItem value="fr">fr</SelectItem>
                        <SelectItem value="de">de</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea value={selected.targetText} onChange={(e) => updateSelected({ targetText: e.target.value, status: 'draft' })} rows={4} />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => updateSelected({ targetText: generateTranslationDraft(selected.sourceText, selected.targetLang), status: 'ai_generated' })}><Sparkles className="h-4 w-4 mr-2" />{copy.generate}</Button>
                <Button variant="outline" onClick={() => updateSelected({ targetText: improveMarketingCopy(selected.targetText || selected.sourceText), status: 'ai_generated' })}>{copy.improve}</Button>
                <Button variant="outline" onClick={() => updateSelected({ status: 'draft' })}>{copy.saveDraft}</Button>
                <Button onClick={() => updateSelected({ status: 'approved' })}><CheckCircle2 className="h-4 w-4 mr-2" />{copy.approve}</Button>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">{copy.preview}</p>
                <div className="rounded-lg border p-3 bg-card" dir={selected.targetLang === 'ar' ? 'rtl' : 'ltr'}>
                  {selected.targetText || selected.sourceText}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
