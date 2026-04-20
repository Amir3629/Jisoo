'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Truck,
  RefreshCw,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  ChevronRight,
  ArrowUpDown,
  Filter,
  Clock,
  AlertTriangle,
  Package,
  Bell,
  X,
} from 'lucide-react'
import { PageHeader } from '@/components/admin/ui/page-header'
import { StatCard } from '@/components/admin/ui/stat-card'
import { StatusBadge } from '@/components/admin/ui/status-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { suppliers, supplierProducts, supplierNotifications } from '@/lib/admin/data'
import type { SupplierProduct, Supplier } from '@/lib/admin/types'
import { cn } from '@/lib/utils'

export default function SuppliersPage() {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<SupplierProduct | null>(null)
  const [showDiffDialog, setShowDiffDialog] = useState(false)
  const [notifications, setNotifications] = useState(supplierNotifications)

  const pendingProducts = supplierProducts.filter(p => p.status === 'pending')
  const stagedProducts = supplierProducts.filter(p => p.status === 'staged')
  const approvedProducts = supplierProducts.filter(p => p.status === 'approved')

  const handleApprove = (product: SupplierProduct) => {
    console.log('Approving product:', product.id)
  }

  const handleReject = (product: SupplierProduct) => {
    console.log('Rejecting product:', product.id)
  }

  const handleStage = (product: SupplierProduct) => {
    console.log('Staging product:', product.id)
  }

  const handlePublish = (product: SupplierProduct) => {
    console.log('Publishing product:', product.id)
  }

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Supplier Ingestion Center"
        description="Manage incoming products from Korean partner suppliers"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Suppliers' }]}
        actions={
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                  {notifications.filter(n => !n.isRead).length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-mauve text-[10px] text-white flex items-center justify-center">
                      {notifications.filter(n => !n.isRead).length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Supplier Notifications</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-100px)] mt-4">
                  <div className="space-y-3">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={cn(
                          'rounded-lg border p-3 relative',
                          notif.isRead ? 'bg-card border-border/50' : 'bg-blue-50 border-blue-200'
                        )}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6"
                          onClick={() => dismissNotification(notif.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <p className="text-sm font-medium pr-6">{notif.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                        <p className="text-xs text-muted-foreground/70 mt-2">
                          {new Date(notif.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
            <Button size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync All
            </Button>
          </div>
        }
      />

      {/* Supplier Overview Cards */}
      <div className="grid gap-4 lg:grid-cols-3">
        {suppliers.map((supplier, index) => (
          <motion.div
            key={supplier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={cn(
                'cursor-pointer transition-all hover:shadow-luxury border-border/50',
                selectedSupplier?.id === supplier.id && 'ring-2 ring-plum'
              )}
              onClick={() => setSelectedSupplier(supplier)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-plum/20 to-rose-mauve/20 flex items-center justify-center">
                      <Truck className="h-6 w-6 text-plum" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{supplier.name}</h3>
                      <p className="text-xs text-muted-foreground">{supplier.code}</p>
                    </div>
                  </div>
                  <StatusBadge
                    status={supplier.syncStatus === 'synced' ? 'success' : supplier.syncStatus === 'syncing' ? 'pending' : 'error'}
                    label={supplier.syncStatus}
                    size="sm"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{supplier.specialization}</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-secondary/50 p-2">
                    <p className="text-lg font-semibold text-foreground">{supplier.activeProducts}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Active</p>
                  </div>
                  <div className="rounded-lg bg-amber-50 p-2">
                    <p className="text-lg font-semibold text-amber-700">{supplier.pendingProducts}</p>
                    <p className="text-[10px] text-amber-600 uppercase">Pending</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-2">
                    <p className="text-lg font-semibold text-foreground">{supplier.totalProducts}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Total</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Last sync: {new Date(supplier.lastSyncAt).toLocaleString()}</span>
                  <Button variant="ghost" size="sm" className="h-auto p-0">
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Product Ingestion Workflow */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-serif">Product Ingestion Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="space-y-4">
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="pending" className="data-[state=active]:bg-card">
                Pending Review
                <Badge variant="outline" className="ml-2">{pendingProducts.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="staged" className="data-[state=active]:bg-card">
                Staging
                <Badge variant="outline" className="ml-2">{stagedProducts.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="approved" className="data-[state=active]:bg-card">
                Ready to Publish
                <Badge variant="outline" className="ml-2">{approvedProducts.length}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-3">
              {pendingProducts.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No products pending review</p>
                </div>
              ) : (
                pendingProducts.map((product, index) => (
                  <ProductIngestionCard
                    key={product.id}
                    product={product}
                    supplier={suppliers.find(s => s.id === product.supplierId)}
                    onApprove={() => handleStage(product)}
                    onReject={() => handleReject(product)}
                    onViewDiff={() => {
                      setSelectedProduct(product)
                      setShowDiffDialog(true)
                    }}
                    index={index}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="staged" className="space-y-3">
              {stagedProducts.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No products in staging</p>
                </div>
              ) : (
                stagedProducts.map((product, index) => (
                  <ProductIngestionCard
                    key={product.id}
                    product={product}
                    supplier={suppliers.find(s => s.id === product.supplierId)}
                    onApprove={() => handleApprove(product)}
                    onReject={() => handleReject(product)}
                    onViewDiff={() => {
                      setSelectedProduct(product)
                      setShowDiffDialog(true)
                    }}
                    isStaged
                    index={index}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="approved" className="space-y-3">
              {approvedProducts.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No products ready to publish</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-end mb-4">
                    <Button>
                      Publish All to Site
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                  {approvedProducts.map((product, index) => (
                    <ProductIngestionCard
                      key={product.id}
                      product={product}
                      supplier={suppliers.find(s => s.id === product.supplierId)}
                      onPublish={() => handlePublish(product)}
                      isApproved
                      index={index}
                    />
                  ))}
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Diff Dialog */}
      <Dialog open={showDiffDialog} onOpenChange={setShowDiffDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Product Changes</DialogTitle>
          </DialogHeader>
          {selectedProduct && selectedProduct.diff && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border/50 overflow-hidden">
                <div className="bg-secondary/30 px-4 py-2 border-b border-border/50">
                  <p className="font-medium">{selectedProduct.name}</p>
                  <p className="text-sm text-muted-foreground">SKU: {selectedProduct.supplierSku}</p>
                </div>
                <div className="p-4 space-y-3">
                  {selectedProduct.diff.map((change, index) => (
                    <div key={index} className="rounded-lg bg-card border border-border/50 p-3">
                      <p className="text-sm font-medium text-foreground capitalize mb-2">{change.field}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-rose-50 border border-rose-200 p-2">
                          <p className="text-xs text-rose-600 mb-1">Previous</p>
                          <p className="text-sm text-rose-900">{String(change.oldValue)}</p>
                        </div>
                        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2">
                          <p className="text-xs text-emerald-600 mb-1">New</p>
                          <p className="text-sm text-emerald-900">{String(change.newValue)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDiffDialog(false)}>Close</Button>
            <Button onClick={() => setShowDiffDialog(false)}>Approve Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface ProductIngestionCardProps {
  product: SupplierProduct
  supplier?: Supplier
  onApprove?: () => void
  onReject?: () => void
  onPublish?: () => void
  onViewDiff?: () => void
  isStaged?: boolean
  isApproved?: boolean
  index: number
}

function ProductIngestionCard({
  product,
  supplier,
  onApprove,
  onReject,
  onPublish,
  onViewDiff,
  isStaged,
  isApproved,
  index,
}: ProductIngestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-xl border border-border/50 bg-card p-4 hover:shadow-sm transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-blush-pink to-nude-beige shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-medium text-foreground">{product.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">SKU: {product.supplierSku}</span>
                {supplier && (
                  <>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{supplier.name}</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={product.changeType} size="sm" />
              <span className="text-sm font-semibold text-foreground">€{product.price}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center gap-2 mt-3">
            {product.changeType === 'updated' && onViewDiff && (
              <Button variant="outline" size="sm" onClick={onViewDiff}>
                <ArrowUpDown className="h-3 w-3 mr-1" />
                View Changes
              </Button>
            )}
            {!isApproved && onReject && (
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={onReject}>
                <XCircle className="h-3 w-3 mr-1" />
                Reject
              </Button>
            )}
            {!isApproved && onApprove && (
              <Button size="sm" onClick={onApprove}>
                <CheckCircle className="h-3 w-3 mr-1" />
                {isStaged ? 'Approve' : 'Stage'}
              </Button>
            )}
            {isApproved && onPublish && (
              <Button size="sm" onClick={onPublish}>
                <CheckCircle className="h-3 w-3 mr-1" />
                Publish
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
