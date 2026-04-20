'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Copy,
  Star,
  Package,
  Image as ImageIcon,
  Tag,
  Globe2,
  Sparkles,
} from 'lucide-react'
import { PageHeader } from '@/components/admin/ui/page-header'
import { StatusBadge } from '@/components/admin/ui/status-badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { products, partners } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedProducts)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedProducts(newSelected)
  }

  const toggleSelectAll = () => {
    if (selectedProducts.size === filteredProducts.length) {
      setSelectedProducts(new Set())
    } else {
      setSelectedProducts(new Set(filteredProducts.map(p => p.id)))
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Product Management"
        description="Manage your product catalog, pricing, and availability"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Products' }]}
        actions={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        }
      />

      {/* Filters */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="skincare">Skincare</SelectItem>
                <SelectItem value="makeup">Makeup</SelectItem>
                <SelectItem value="sets">Gift Sets</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedProducts.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 rounded-lg border border-plum/20 bg-plum/5 p-3"
        >
          <span className="text-sm font-medium text-foreground">
            {selectedProducts.size} selected
          </span>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="outline" size="sm">Edit Pricing</Button>
          <Button variant="outline" size="sm">Update Status</Button>
          <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
          <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setSelectedProducts(new Set())}>
            Clear
          </Button>
        </motion.div>
      )}

      {/* Products Table */}
      <Card className="border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/30 hover:bg-secondary/30">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedProducts.size === filteredProducts.length && filteredProducts.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="min-w-[300px]">Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product, index) => {
              const supplier = partners.find(p => p.id === product.partnerId)
              return (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedProducts.has(product.id)}
                      onCheckedChange={() => toggleSelect(product.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blush-pink to-nude-beige shrink-0 overflow-hidden">
                        {/* Product image placeholder */}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground truncate">{product.name}</p>
                          {product.isBestSeller && (
                            <Badge variant="secondary" className="shrink-0 text-[10px] px-1.5">
                              <Star className="h-2.5 w-2.5 mr-0.5 fill-current" />
                              Best
                            </Badge>
                          )}
                          {product.isNew && (
                            <Badge className="shrink-0 text-[10px] px-1.5 bg-emerald-100 text-emerald-700 border-emerald-200">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">SKU: JISOO-{product.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">{product.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">€{product.price}</div>
                    {product.compareAtPrice && (
                      <div className="text-xs text-muted-foreground line-through">€{product.compareAtPrice}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{supplier?.name || 'N/A'}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status="published" size="sm" />
                  </TableCell>
                  <TableCell>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedProduct(product)}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
                        <SheetHeader>
                          <SheetTitle>{product.name}</SheetTitle>
                        </SheetHeader>
                        <ProductEditDrawer product={product} />
                      </SheetContent>
                    </Sheet>
                  </TableCell>
                </motion.tr>
              )
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

function ProductEditDrawer({ product }: { product: typeof products[0] }) {
  return (
    <div className="mt-6 space-y-6">
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-secondary/50 w-full justify-start">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="space-y-2">
            <Label>Product Name</Label>
            <Input defaultValue={product.name} />
          </div>
          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Input defaultValue={product.subtitle || ''} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea defaultValue={product.description} rows={4} />
          </div>
          <div className="space-y-2">
            <Label>Short Description</Label>
            <Textarea defaultValue={product.shortDescription} rows={2} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select defaultValue={product.category}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="skincare">Skincare</SelectItem>
                  <SelectItem value="makeup">Makeup</SelectItem>
                  <SelectItem value="sets">Gift Sets</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Brand</Label>
              <Input defaultValue={product.brand} />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch id="bestseller" defaultChecked={product.isBestSeller} />
              <Label htmlFor="bestseller">Best Seller</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="new" defaultChecked={product.isNew} />
              <Label htmlFor="new">New Arrival</Label>
            </div>
          </div>
          <Button className="w-full">
            <Sparkles className="h-4 w-4 mr-2" />
            Generate AI Description
          </Button>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {product.images.map((image, i) => (
              <div key={image.id} className="relative aspect-square rounded-lg bg-secondary overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blush-pink to-nude-beige" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {image.isMain && (
                  <Badge className="absolute top-2 left-2 text-[10px]">Main</Badge>
                )}
              </div>
            ))}
            <button className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-plum transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-plum">
              <Plus className="h-6 w-6" />
              <span className="text-xs">Add Image</span>
            </button>
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Price (€)</Label>
              <Input type="number" defaultValue={product.price} />
            </div>
            <div className="space-y-2">
              <Label>Compare at Price</Label>
              <Input type="number" defaultValue={product.compareAtPrice || ''} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Size</Label>
            <Input defaultValue={product.size} />
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <div className="space-y-2">
            <Label>SEO Title</Label>
            <Input defaultValue={product.name} />
          </div>
          <div className="space-y-2">
            <Label>Meta Description</Label>
            <Textarea defaultValue={product.shortDescription} rows={3} />
          </div>
          <div className="space-y-2">
            <Label>URL Slug</Label>
            <Input defaultValue={product.slug} />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-2 pt-4 border-t">
        <Button variant="outline" className="flex-1">Cancel</Button>
        <Button className="flex-1">Save Changes</Button>
      </div>
    </div>
  )
}
