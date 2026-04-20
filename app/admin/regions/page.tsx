'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Globe2,
  Search,
  Filter,
  Eye,
  EyeOff,
  ShoppingCart,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
  Save,
  Info,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { marketAvailability } from '@/lib/admin/data'
import type { MarketStatus } from '@/lib/admin/types'
import { cn } from '@/lib/utils'

const regions = [
  { code: 'UAE', name: 'United Arab Emirates', flag: '🇦🇪', currency: 'AED' },
  { code: 'EU', name: 'Europe', flag: '🇪🇺', currency: 'EUR' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD' },
] as const

const statusOptions: { value: MarketStatus; label: string; description: string; icon: React.ElementType }[] = [
  { value: 'visible_and_buyable', label: 'Buyable', description: 'Visible and available for purchase', icon: ShoppingCart },
  { value: 'visible_but_not_buyable', label: 'View Only', description: 'Visible but cannot be purchased', icon: Eye },
  { value: 'hidden', label: 'Hidden', description: 'Not visible to customers', icon: EyeOff },
  { value: 'pending_compliance', label: 'Pending', description: 'Awaiting compliance approval', icon: Clock },
]

export default function RegionsPage() {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState(marketAvailability)
  const [hasChanges, setHasChanges] = useState(false)
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null)

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(search.toLowerCase())
  )

  const updateMarketStatus = (productId: string, region: 'UAE' | 'EU' | 'CA', status: MarketStatus) => {
    setProducts(prev => prev.map(p => {
      if (p.productId === productId) {
        return {
          ...p,
          markets: { ...p.markets, [region]: status },
          lastUpdated: new Date().toISOString(),
        }
      }
      return p
    }))
    setHasChanges(true)
  }

  const getRegionStats = (region: 'UAE' | 'EU' | 'CA') => {
    const stats = {
      buyable: products.filter(p => p.markets[region] === 'visible_and_buyable').length,
      viewOnly: products.filter(p => p.markets[region] === 'visible_but_not_buyable').length,
      hidden: products.filter(p => p.markets[region] === 'hidden').length,
      pending: products.filter(p => p.markets[region] === 'pending_compliance').length,
    }
    return stats
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Region Availability Control"
        description="Manage product visibility and purchasing status across markets"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Regions' }]}
        actions={
          hasChanges && (
            <Button onClick={() => setHasChanges(false)}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          )
        }
      />

      {/* Region Overview Cards */}
      <div className="grid gap-4 lg:grid-cols-3">
        {regions.map((region, index) => {
          const stats = getRegionStats(region.code as 'UAE' | 'EU' | 'CA')
          return (
            <motion.div
              key={region.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border/50 hover:shadow-luxury transition-all">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{region.flag}</span>
                    <div>
                      <h3 className="font-semibold text-foreground">{region.name}</h3>
                      <p className="text-xs text-muted-foreground">{region.currency}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="rounded-lg bg-emerald-50 p-2">
                      <p className="text-lg font-semibold text-emerald-700">{stats.buyable}</p>
                      <p className="text-[9px] text-emerald-600 uppercase">Buyable</p>
                    </div>
                    <div className="rounded-lg bg-amber-50 p-2">
                      <p className="text-lg font-semibold text-amber-700">{stats.viewOnly}</p>
                      <p className="text-[9px] text-amber-600 uppercase">View Only</p>
                    </div>
                    <div className="rounded-lg bg-gray-100 p-2">
                      <p className="text-lg font-semibold text-gray-700">{stats.hidden}</p>
                      <p className="text-[9px] text-gray-600 uppercase">Hidden</p>
                    </div>
                    <div className="rounded-lg bg-orange-50 p-2">
                      <p className="text-lg font-semibold text-orange-700">{stats.pending}</p>
                      <p className="text-[9px] text-orange-600 uppercase">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Filters */}
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
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="issues">With Issues</SelectItem>
            <SelectItem value="pending">Pending Compliance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Table */}
      <Card className="border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/30 hover:bg-secondary/30">
              <TableHead className="min-w-[250px]">Product</TableHead>
              {regions.map(region => (
                <TableHead key={region.code} className="text-center min-w-[150px]">
                  <div className="flex items-center justify-center gap-2">
                    <span>{region.flag}</span>
                    <span>{region.code}</span>
                  </div>
                </TableHead>
              ))}
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product, index) => (
              <motion.tr
                key={product.productId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className="border-b border-border/50 hover:bg-secondary/20"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blush-pink to-nude-beige shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate">{product.productName}</p>
                      <p className="text-xs text-muted-foreground">ID: {product.productId}</p>
                    </div>
                  </div>
                </TableCell>
                {(['UAE', 'EU', 'CA'] as const).map(region => (
                  <TableCell key={region} className="text-center">
                    <div className="flex flex-col items-center gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <Select
                                value={product.markets[region]}
                                onValueChange={(value) => updateMarketStatus(product.productId, region, value as MarketStatus)}
                              >
                                <SelectTrigger className="w-32 h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {statusOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                      <div className="flex items-center gap-2">
                                        <option.icon className="h-3 w-3" />
                                        {option.label}
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{statusOptions.find(o => o.value === product.markets[region])?.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      {product.complianceStatus[region] !== 'compliant' && (
                        <StatusBadge
                          status={product.complianceStatus[region]}
                          size="sm"
                          showIcon={false}
                        />
                      )}
                    </div>
                  </TableCell>
                ))}
                <TableCell>
                  <Collapsible
                    open={expandedProduct === product.productId}
                    onOpenChange={(open) => setExpandedProduct(open ? product.productId : null)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronDown className={cn(
                          'h-4 w-4 transition-transform',
                          expandedProduct === product.productId && 'rotate-180'
                        )} />
                      </Button>
                    </CollapsibleTrigger>
                  </Collapsible>
                </TableCell>
              </motion.tr>
            ))}
            {/* Expanded Row */}
            {filteredProducts.map(product => (
              expandedProduct === product.productId && (
                <motion.tr
                  key={`${product.productId}-expanded`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-secondary/20"
                >
                  <TableCell colSpan={5} className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Notes</p>
                          <p className="text-sm text-muted-foreground">{product.notes || 'No notes'}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {(['UAE', 'EU', 'CA'] as const).map(region => (
                          <div key={region} className="rounded-lg border border-border/50 p-3 bg-card">
                            <p className="text-sm font-medium mb-2">{region} Preview Message</p>
                            <Textarea
                              placeholder={`Message for ${region} customers...`}
                              className="text-sm"
                              rows={2}
                              defaultValue={
                                product.markets[region] === 'visible_but_not_buyable'
                                  ? 'This product is not available for purchase in your region yet.'
                                  : product.markets[region] === 'pending_compliance'
                                  ? 'Coming soon to your region.'
                                  : ''
                              }
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last updated: {new Date(product.lastUpdated).toLocaleString()}
                      </p>
                    </div>
                  </TableCell>
                </motion.tr>
              )
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
