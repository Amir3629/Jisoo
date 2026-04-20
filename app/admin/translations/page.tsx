'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Languages,
  Search,
  Wand2,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  Globe,
  ChevronRight,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
} from 'lucide-react'
import { PageHeader } from '@/components/admin/ui/page-header'
import { StatusBadge } from '@/components/admin/ui/status-badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { translationTasks, translationEntries } from '@/lib/admin/data'
import type { Language } from '@/lib/types'
import { cn } from '@/lib/utils'

const languages: { code: Language; name: string; flag: string; rtl?: boolean }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'Arabic', flag: '🇦🇪', rtl: true },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
]

export default function TranslationsPage() {
  const [search, setSearch] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('ar')
  const [selectedEntry, setSelectedEntry] = useState(translationEntries[0])
  const [isRTLPreview, setIsRTLPreview] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredEntries = translationEntries.filter(entry =>
    entry.entityName.toLowerCase().includes(search.toLowerCase()) ||
    entry.sourceText.toLowerCase().includes(search.toLowerCase())
  )

  const pendingCount = translationEntries.filter(e => e.status === 'pending' || e.status === 'machine_translated').length
  const reviewCount = translationEntries.filter(e => e.status === 'human_reviewed').length
  const approvedCount = translationEntries.filter(e => e.status === 'approved').length
  const publishedCount = translationEntries.filter(e => e.status === 'published').length

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleAutoTranslate = () => {
    console.log('Auto-translating...')
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Translation Center"
        description="Manage multilingual content for global markets"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Translations' }]}
        actions={
          <Button onClick={handleAutoTranslate}>
            <Wand2 className="h-4 w-4 mr-2" />
            Auto-Translate All
          </Button>
        }
      />

      {/* Language Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={cn(
                'cursor-pointer transition-all hover:shadow-luxury border-border/50',
                selectedLanguage === lang.code && 'ring-2 ring-plum'
              )}
              onClick={() => setSelectedLanguage(lang.code)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <div>
                      <p className="font-medium text-foreground">{lang.name}</p>
                      <p className="text-xs text-muted-foreground">{lang.code.toUpperCase()}</p>
                    </div>
                  </div>
                  {lang.rtl && (
                    <Badge variant="outline" className="text-[10px]">RTL</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{pendingCount}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Eye className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{reviewCount}</p>
              <p className="text-xs text-muted-foreground">In Review</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{approvedCount}</p>
              <p className="text-xs text-muted-foreground">Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-plum/10">
              <Globe className="h-5 w-5 text-plum" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{publishedCount}</p>
              <p className="text-xs text-muted-foreground">Published</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Translation Editor */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Entry List */}
        <Card className="border-border/50 lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search entries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              <div className="space-y-1 p-4 pt-0">
                {filteredEntries.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => setSelectedEntry(entry)}
                    className={cn(
                      'w-full text-left rounded-lg p-3 transition-all hover:bg-secondary/50',
                      selectedEntry.id === entry.id && 'bg-secondary'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{entry.entityName}</p>
                        <p className="text-xs text-muted-foreground capitalize">{entry.field}</p>
                      </div>
                      <StatusBadge status={entry.status} size="sm" showIcon={false} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{entry.sourceText}</p>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Editor Panel */}
        <Card className="border-border/50 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg font-serif">Translation Editor</CardTitle>
            <div className="flex items-center gap-2">
              {selectedLanguage === 'ar' && (
                <div className="flex items-center gap-2">
                  <Label htmlFor="rtl-preview" className="text-sm">RTL Preview</Label>
                  <Switch
                    id="rtl-preview"
                    checked={isRTLPreview}
                    onCheckedChange={setIsRTLPreview}
                  />
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedEntry && (
              <>
                {/* Entry Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{selectedEntry.entityName}</h3>
                    <p className="text-sm text-muted-foreground capitalize">Field: {selectedEntry.field}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">
                      {languages.find(l => l.code === selectedEntry.sourceLanguage)?.flag}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {languages.find(l => l.code === selectedEntry.targetLanguage)?.flag}
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Source Text */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <span className="text-lg">{languages.find(l => l.code === selectedEntry.sourceLanguage)?.flag}</span>
                      Source Text (English)
                    </Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8"
                      onClick={() => handleCopy(selectedEntry.sourceText, 'source')}
                    >
                      {copiedId === 'source' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <p className="text-sm">{selectedEntry.sourceText}</p>
                  </div>
                </div>

                {/* Machine Translation */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Wand2 className="h-4 w-4 text-purple-500" />
                      Machine Translation
                    </Label>
                    <Button variant="outline" size="sm" className="h-8">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Re-translate
                    </Button>
                  </div>
                  <div className={cn(
                    'rounded-lg bg-purple-50 border border-purple-200 p-3',
                    isRTLPreview && selectedEntry.targetLanguage === 'ar' && 'text-right'
                  )} dir={isRTLPreview && selectedEntry.targetLanguage === 'ar' ? 'rtl' : 'ltr'}>
                    <p className="text-sm">{selectedEntry.machineTranslation || 'No machine translation available'}</p>
                  </div>
                </div>

                {/* Human Translation */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <span className="text-lg">{languages.find(l => l.code === selectedEntry.targetLanguage)?.flag}</span>
                    Human-Edited Translation
                  </Label>
                  <Textarea
                    defaultValue={selectedEntry.humanTranslation || selectedEntry.machineTranslation || ''}
                    rows={4}
                    className={cn(
                      isRTLPreview && selectedEntry.targetLanguage === 'ar' && 'text-right'
                    )}
                    dir={isRTLPreview && selectedEntry.targetLanguage === 'ar' ? 'rtl' : 'ltr'}
                    placeholder="Enter human-edited translation..."
                  />
                </div>

                {/* Preview */}
                {isRTLPreview && selectedEntry.targetLanguage === 'ar' && (
                  <div className="space-y-2">
                    <Label>RTL Preview</Label>
                    <div className="rounded-lg border border-border p-4 bg-card" dir="rtl">
                      <p className="text-sm text-right font-medium">
                        {selectedEntry.finalText || selectedEntry.humanTranslation || selectedEntry.machineTranslation}
                      </p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t">
                  <Button variant="outline" className="flex-1">
                    Save as Draft
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Submit for Review
                  </Button>
                  <Button className="flex-1">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve & Publish
                  </Button>
                </div>

                {/* Metadata */}
                <div className="text-xs text-muted-foreground space-y-1 pt-2">
                  {selectedEntry.translatedBy && <p>Translated by: {selectedEntry.translatedBy}</p>}
                  {selectedEntry.reviewedBy && <p>Reviewed by: {selectedEntry.reviewedBy}</p>}
                  <p>Last updated: {new Date(selectedEntry.lastUpdatedAt).toLocaleString()}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
