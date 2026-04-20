'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  Search,
  Upload,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Eye,
  Trash2,
  Plus,
  Calendar,
  ChevronRight,
  Filter,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { complianceDocuments, complaintRecords, marketAvailability } from '@/lib/admin/data'
import { products } from '@/lib/data'
import type { ComplianceDocType } from '@/lib/admin/types'
import { cn } from '@/lib/utils'

const docTypes: { value: ComplianceDocType; label: string }[] = [
  { value: 'COA', label: 'Certificate of Analysis' },
  { value: 'MSDS', label: 'Material Safety Data Sheet' },
  { value: 'STABILITY_REPORT', label: 'Stability Report' },
  { value: 'LABEL', label: 'Label Artwork' },
  { value: 'INCI', label: 'INCI Declaration' },
  { value: 'ALLERGEN', label: 'Allergen Statement' },
  { value: 'OTHER', label: 'Other' },
]

export default function CompliancePage() {
  const [search, setSearch] = useState('')
  const [selectedTab, setSelectedTab] = useState('documents')
  const [showUploadDialog, setShowUploadDialog] = useState(false)

  // Calculate stats
  const compliantProducts = marketAvailability.filter(p =>
    Object.values(p.complianceStatus).every(s => s === 'compliant')
  ).length
  const pendingProducts = marketAvailability.filter(p =>
    Object.values(p.complianceStatus).some(s => s === 'pending_review')
  ).length
  const issuesProducts = marketAvailability.filter(p =>
    Object.values(p.complianceStatus).some(s => s === 'non_compliant' || s === 'missing')
  ).length
  const expiringDocs = complianceDocuments.filter(d =>
    d.expiresAt && new Date(d.expiresAt) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  ).length

  const openComplaints = complaintRecords.filter(c => c.status !== 'closed').length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Compliance Vault"
        description="Manage safety documents, certifications, and regulatory compliance"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Compliance' }]}
        actions={
          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Upload Compliance Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Product</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Document Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {docTypes.map(t => (
                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Region</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Regions</SelectItem>
                      <SelectItem value="UAE">UAE</SelectItem>
                      <SelectItem value="EU">Europe</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>File</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-plum transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Drop file here or click to upload</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, DOC up to 10MB</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Add any relevant notes..." />
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

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{compliantProducts}</p>
                <p className="text-xs text-muted-foreground">Compliant</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{pendingProducts}</p>
                <p className="text-xs text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100">
                <XCircle className="h-5 w-5 text-rose-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{issuesProducts}</p>
                <p className="text-xs text-muted-foreground">Issues</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{expiringDocs}</p>
                <p className="text-xs text-muted-foreground">Expiring Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <AlertTriangle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{openComplaints}</p>
                <p className="text-xs text-muted-foreground">Open Complaints</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="products">Product Status</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="labels">Label Versions</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {docTypes.map(t => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Card className="border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complianceDocuments.map((doc, index) => (
                  <motion.tr
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="border-b border-border/50 hover:bg-secondary/20"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-secondary">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="font-medium text-sm truncate max-w-[200px]">{doc.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{doc.type}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {products.find(p => p.id === doc.productId)?.name || doc.productId}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{doc.region}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">v{doc.version}</TableCell>
                    <TableCell>
                      {doc.expiresAt ? (
                        <span className={cn(
                          'text-sm',
                          new Date(doc.expiresAt) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                            ? 'text-amber-600 font-medium'
                            : 'text-muted-foreground'
                        )}>
                          {new Date(doc.expiresAt).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={doc.status} size="sm" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card className="border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                  <TableHead>Product</TableHead>
                  <TableHead className="text-center">UAE</TableHead>
                  <TableHead className="text-center">Europe</TableHead>
                  <TableHead className="text-center">Canada</TableHead>
                  <TableHead>Last Audit</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marketAvailability.map((product, index) => (
                  <motion.tr
                    key={product.productId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="border-b border-border/50 hover:bg-secondary/20"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blush-pink to-nude-beige" />
                        <span className="font-medium">{product.productName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <StatusBadge status={product.complianceStatus.UAE} size="sm" />
                    </TableCell>
                    <TableCell className="text-center">
                      <StatusBadge status={product.complianceStatus.EU} size="sm" />
                    </TableCell>
                    <TableCell className="text-center">
                      <StatusBadge status={product.complianceStatus.CA} size="sm" />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(product.lastUpdated).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="complaints" className="space-y-4">
          <Card className="border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                  <TableHead>ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaintRecords.map((complaint, index) => (
                  <motion.tr
                    key={complaint.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="border-b border-border/50 hover:bg-secondary/20"
                  >
                    <TableCell className="font-mono text-sm">{complaint.id}</TableCell>
                    <TableCell>
                      {products.find(p => p.id === complaint.productId)?.name || complaint.productId}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {complaint.type.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{complaint.region}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        complaint.severity === 'critical' && 'bg-rose-500',
                        complaint.severity === 'high' && 'bg-orange-500',
                        complaint.severity === 'medium' && 'bg-amber-500',
                        complaint.severity === 'low' && 'bg-blue-500',
                        'text-white'
                      )}>
                        {complaint.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        status={
                          complaint.status === 'resolved' ? 'success' :
                          complaint.status === 'investigating' ? 'warning' :
                          complaint.status === 'closed' ? 'neutral' : 'pending'
                        }
                        label={complaint.status}
                        size="sm"
                      />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="labels" className="space-y-4">
          <div className="py-12 text-center text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Label version management coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
