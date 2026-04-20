'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Image as ImageIcon,
  Upload,
  Search,
  Grid,
  List,
  MoreHorizontal,
  Eye,
  Download,
  Trash2,
  Crop,
  Droplet,
  Tag,
  Link2,
  CheckCircle,
  X,
  ZoomIn,
  Move,
} from 'lucide-react'
import { PageHeader } from '@/components/admin/ui/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { mediaAssets } from '@/lib/admin/data'
import type { CropPreset } from '@/lib/admin/types'
import { cn } from '@/lib/utils'

const cropPresets: { value: CropPreset; label: string; ratio: string }[] = [
  { value: 'website_hero', label: 'Website Hero', ratio: '16:9' },
  { value: 'website_product', label: 'Product Image', ratio: '1:1' },
  { value: 'website_thumbnail', label: 'Thumbnail', ratio: '4:3' },
  { value: 'instagram_square', label: 'Instagram Square', ratio: '1:1' },
  { value: 'instagram_story', label: 'Instagram Story', ratio: '9:16' },
  { value: 'tiktok_vertical', label: 'TikTok Video', ratio: '9:16' },
]

export default function MediaPage() {
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedAssets, setSelectedAssets] = useState<Set<string>>(new Set())
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState(mediaAssets[0])
  const [showWatermark, setShowWatermark] = useState(true)
  const [focalPoint, setFocalPoint] = useState({ x: 50, y: 50 })

  const filteredAssets = mediaAssets.filter(asset =>
    asset.name.toLowerCase().includes(search.toLowerCase()) ||
    asset.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  )

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedAssets)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedAssets(newSelected)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Media Center"
        description="Manage product images, apply watermarks, and create social crops"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Media' }]}
        actions={
          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <Button onClick={() => setShowUploadDialog(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Media
            </Button>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Upload Media</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-plum transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm font-medium text-foreground mb-1">Drop files here or click to upload</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, WebP up to 10MB each</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="auto-watermark" defaultChecked />
                  <Label htmlFor="auto-watermark">Apply JISOO watermark automatically</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowUploadDialog(false)}>Cancel</Button>
                <Button onClick={() => setShowUploadDialog(false)}>Upload</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-1 border rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedAssets.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 rounded-lg border border-plum/20 bg-plum/5 p-3"
        >
          <span className="text-sm font-medium">{selectedAssets.size} selected</span>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="outline" size="sm">Add Watermark</Button>
          <Button variant="outline" size="sm">Generate Crops</Button>
          <Button variant="outline" size="sm">Add Tags</Button>
          <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
          <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setSelectedAssets(new Set())}>
            Clear
          </Button>
        </motion.div>
      )}

      {/* Media Grid */}
      <div className={cn(
        'grid gap-4',
        viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1'
      )}>
        {filteredAssets.map((asset, index) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.02 }}
          >
            {viewMode === 'grid' ? (
              <Card
                className={cn(
                  'group cursor-pointer transition-all hover:shadow-luxury border-border/50 overflow-hidden',
                  selectedAssets.has(asset.id) && 'ring-2 ring-plum'
                )}
              >
                <div className="relative aspect-square bg-gradient-to-br from-blush-pink to-nude-beige">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8"
                        onClick={() => {
                          setSelectedAsset(asset)
                          setShowEditDialog(true)
                        }}
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Checkbox
                      checked={selectedAssets.has(asset.id)}
                      onCheckedChange={() => toggleSelect(asset.id)}
                      className="bg-white/80"
                    />
                  </div>
                  {asset.watermarkedUrl && (
                    <Badge className="absolute top-2 right-2 text-[10px] bg-plum">
                      <Droplet className="h-2.5 w-2.5 mr-0.5" />
                      WM
                    </Badge>
                  )}
                </div>
                <CardContent className="p-3">
                  <p className="text-sm font-medium text-foreground truncate">{asset.name}</p>
                  <p className="text-xs text-muted-foreground">{asset.width} x {asset.height} • {formatFileSize(asset.fileSize)}</p>
                  <div className="flex items-center gap-1 mt-2 flex-wrap">
                    {asset.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="text-[10px] px-1.5">{tag}</Badge>
                    ))}
                    {asset.tags.length > 2 && (
                      <Badge variant="outline" className="text-[10px] px-1.5">+{asset.tags.length - 2}</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className={cn(
                'transition-all hover:shadow-sm border-border/50',
                selectedAssets.has(asset.id) && 'ring-2 ring-plum'
              )}>
                <CardContent className="p-4 flex items-center gap-4">
                  <Checkbox
                    checked={selectedAssets.has(asset.id)}
                    onCheckedChange={() => toggleSelect(asset.id)}
                  />
                  <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-blush-pink to-nude-beige shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{asset.name}</p>
                    <p className="text-sm text-muted-foreground">{asset.width} x {asset.height} • {formatFileSize(asset.fileSize)}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {asset.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {asset.watermarkedUrl && <Badge className="text-[10px] bg-plum">WM</Badge>}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => { setSelectedAsset(asset); setShowEditDialog(true); }}>
                          <Eye className="h-4 w-4 mr-2" /> View & Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Crop className="h-4 w-4 mr-2" /> Generate Crops
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Droplet className="h-4 w-4 mr-2" /> Add Watermark
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit Media</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Preview */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg bg-gradient-to-br from-blush-pink to-nude-beige overflow-hidden">
                <div
                  className="absolute w-4 h-4 bg-plum rounded-full border-2 border-white shadow-lg cursor-move transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ left: `${focalPoint.x}%`, top: `${focalPoint.y}%` }}
                />
                {showWatermark && (
                  <div className="absolute bottom-4 right-4 text-white/60 text-sm font-serif">
                    JISOO
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    id="show-watermark"
                    checked={showWatermark}
                    onCheckedChange={setShowWatermark}
                  />
                  <Label htmlFor="show-watermark">Show Watermark</Label>
                </div>
              </div>
            </div>

            {/* Settings */}
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Focal Point</Label>
                  <p className="text-xs text-muted-foreground">Click on the image to set the focal point for automatic cropping</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">X Position ({focalPoint.x}%)</Label>
                      <Slider
                        value={[focalPoint.x]}
                        onValueChange={([x]) => setFocalPoint(prev => ({ ...prev, x }))}
                        max={100}
                        step={1}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Y Position ({focalPoint.y}%)</Label>
                      <Slider
                        value={[focalPoint.y]}
                        onValueChange={([y]) => setFocalPoint(prev => ({ ...prev, y }))}
                        max={100}
                        step={1}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Crop Presets</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {cropPresets.map(preset => (
                      <Button
                        key={preset.value}
                        variant="outline"
                        className="justify-start h-auto py-2"
                      >
                        <div className="text-left">
                          <p className="text-sm font-medium">{preset.label}</p>
                          <p className="text-xs text-muted-foreground">{preset.ratio}</p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-1">
                    {selectedAsset.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button className="hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <Input placeholder="Add tag..." className="w-24 h-6 text-xs" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Linked Products</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedAsset.productIds.map(id => (
                      <Badge key={id} variant="outline" className="gap-1">
                        <Link2 className="h-3 w-3" />
                        {id}
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm" className="h-6 text-xs">
                      Link Product
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowEditDialog(false)}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
