"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Package,
  Search,
  Filter,
  Download,
  Eye,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  MapPin,
  CreditCard,
  User,
  Calendar,
  DollarSign,
  TrendingUp,
  ShoppingBag,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { PageHeader } from "@/components/admin/ui/page-header"
import { StatCard } from "@/components/admin/ui/stat-card"

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"

interface OrderItem {
  id: string
  productName: string
  variant: string
  quantity: number
  price: number
  image: string
}

interface Order {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    avatar?: string
  }
  items: OrderItem[]
  total: number
  subtotal: number
  shipping: number
  tax: number
  status: OrderStatus
  paymentMethod: string
  shippingAddress: {
    line1: string
    line2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  region: string
  createdAt: string
  updatedAt: string
  trackingNumber?: string
  notes?: string
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001234",
    customer: {
      name: "Emma Thompson",
      email: "emma@example.com",
    },
    items: [
      { id: "1", productName: "COSRX Snail Mucin Essence", variant: "100ml", quantity: 2, price: 25.00, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&h=100&fit=crop" },
      { id: "2", productName: "Beauty of Joseon Sunscreen", variant: "50ml", quantity: 1, price: 18.00, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop" },
    ],
    total: 76.00,
    subtotal: 68.00,
    shipping: 5.00,
    tax: 3.00,
    status: "processing",
    paymentMethod: "Credit Card",
    shippingAddress: {
      line1: "123 Main Street",
      line2: "Apt 4B",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
    },
    region: "North America",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T14:20:00Z",
  },
  {
    id: "2",
    orderNumber: "ORD-2024-001235",
    customer: {
      name: "Sophie Martin",
      email: "sophie@example.com",
    },
    items: [
      { id: "3", productName: "Sulwhasoo First Care Serum", variant: "90ml", quantity: 1, price: 120.00, image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=100&h=100&fit=crop" },
    ],
    total: 138.00,
    subtotal: 120.00,
    shipping: 12.00,
    tax: 6.00,
    status: "shipped",
    paymentMethod: "PayPal",
    shippingAddress: {
      line1: "45 Rue de la Paix",
      city: "Paris",
      state: "Île-de-France",
      postalCode: "75002",
      country: "France",
    },
    region: "Europe",
    createdAt: "2024-01-14T16:45:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
    trackingNumber: "FR123456789EU",
  },
  {
    id: "3",
    orderNumber: "ORD-2024-001236",
    customer: {
      name: "Yuki Tanaka",
      email: "yuki@example.com",
    },
    items: [
      { id: "4", productName: "Glow Recipe Watermelon Mask", variant: "80ml", quantity: 1, price: 35.00, image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=100&h=100&fit=crop" },
      { id: "5", productName: "SKIN1004 Centella Ampoule", variant: "100ml", quantity: 2, price: 23.00, image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=100&h=100&fit=crop" },
    ],
    total: 92.00,
    subtotal: 81.00,
    shipping: 8.00,
    tax: 3.00,
    status: "delivered",
    paymentMethod: "Credit Card",
    shippingAddress: {
      line1: "1-2-3 Shibuya",
      city: "Tokyo",
      state: "Tokyo",
      postalCode: "150-0002",
      country: "Japan",
    },
    region: "Asia Pacific",
    createdAt: "2024-01-10T08:15:00Z",
    updatedAt: "2024-01-14T15:30:00Z",
    trackingNumber: "JP987654321AP",
  },
  {
    id: "4",
    orderNumber: "ORD-2024-001237",
    customer: {
      name: "Anna Schmidt",
      email: "anna@example.com",
    },
    items: [
      { id: "6", productName: "Laneige Water Sleeping Mask", variant: "70ml", quantity: 1, price: 28.00, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop" },
    ],
    total: 39.50,
    subtotal: 28.00,
    shipping: 8.50,
    tax: 3.00,
    status: "pending",
    paymentMethod: "Bank Transfer",
    shippingAddress: {
      line1: "Hauptstraße 42",
      city: "Berlin",
      state: "Berlin",
      postalCode: "10115",
      country: "Germany",
    },
    region: "Europe",
    createdAt: "2024-01-15T18:00:00Z",
    updatedAt: "2024-01-15T18:00:00Z",
  },
  {
    id: "5",
    orderNumber: "ORD-2024-001238",
    customer: {
      name: "Michael Chen",
      email: "michael@example.com",
    },
    items: [
      { id: "7", productName: "Innisfree Green Tea Serum", variant: "80ml", quantity: 1, price: 32.00, image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=100&h=100&fit=crop" },
      { id: "8", productName: "Etude House SoonJung Toner", variant: "180ml", quantity: 1, price: 15.00, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=100&h=100&fit=crop" },
    ],
    total: 52.00,
    subtotal: 47.00,
    shipping: 0,
    tax: 5.00,
    status: "cancelled",
    paymentMethod: "Credit Card",
    shippingAddress: {
      line1: "500 Market Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94102",
      country: "United States",
    },
    region: "North America",
    createdAt: "2024-01-13T12:30:00Z",
    updatedAt: "2024-01-14T10:00:00Z",
    notes: "Customer requested cancellation - found cheaper alternative",
  },
]

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Pending", color: "bg-amber-100 text-amber-800 border-amber-200", icon: Clock },
  processing: { label: "Processing", color: "bg-blue-100 text-blue-800 border-blue-200", icon: RefreshCw },
  shipped: { label: "Shipped", color: "bg-purple-100 text-purple-800 border-purple-200", icon: Truck },
  delivered: { label: "Delivered", color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
  refunded: { label: "Refunded", color: "bg-gray-100 text-gray-800 border-gray-200", icon: RefreshCw },
}

export default function OrdersPage() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [regionFilter, setRegionFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = mockOrders.filter((order) => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesRegion = regionFilter === "all" || order.region === regionFilter
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesRegion && matchesSearch
  })

  const stats = [
    { title: "Total Orders", value: "1,234", change: 12.5, trend: "up" as const, icon: <ShoppingBag className="h-5 w-5" /> },
    { title: "Revenue", value: "$156,789", change: 18.2, trend: "up" as const, icon: <DollarSign className="h-5 w-5" /> },
    { title: "Pending", value: "23", change: -5.3, trend: "down" as const, icon: <Clock className="h-5 w-5" /> },
    { title: "Avg. Order Value", value: "$127.05", change: 3.8, trend: "up" as const, icon: <TrendingUp className="h-5 w-5" /> },
  ]

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    )
  }

  const toggleAllOrders = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredOrders.map((o) => o.id))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Order Management"
        description="Track and manage customer orders across all regions"
        icon={<Package className="h-6 w-6" />}
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders, customers..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="North America">North America</SelectItem>
                <SelectItem value="Europe">Europe</SelectItem>
                <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader className="py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Orders ({filteredOrders.length})</CardTitle>
            {selectedOrders.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{selectedOrders.length} selected</span>
                <Button variant="outline" size="sm">
                  Bulk Update
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-medium">
                    <Checkbox
                      checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                      onCheckedChange={toggleAllOrders}
                    />
                  </th>
                  <th className="text-left p-4 font-medium text-sm">Order</th>
                  <th className="text-left p-4 font-medium text-sm">Customer</th>
                  <th className="text-left p-4 font-medium text-sm">Items</th>
                  <th className="text-left p-4 font-medium text-sm">Total</th>
                  <th className="text-left p-4 font-medium text-sm">Status</th>
                  <th className="text-left p-4 font-medium text-sm">Region</th>
                  <th className="text-left p-4 font-medium text-sm">Date</th>
                  <th className="text-left p-4 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => {
                  const status = statusConfig[order.status]
                  const StatusIcon = status.icon
                  return (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <Checkbox
                          checked={selectedOrders.includes(order.id)}
                          onCheckedChange={() => toggleOrderSelection(order.id)}
                        />
                      </td>
                      <td className="p-4">
                        <span className="font-mono text-sm font-medium">{order.orderNumber}</span>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-sm">{order.customer.name}</p>
                          <p className="text-xs text-muted-foreground">{order.customer.email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex -space-x-2">
                          {order.items.slice(0, 3).map((item, idx) => (
                            <img
                              key={item.id}
                              src={item.image}
                              alt={item.productName}
                              className="h-8 w-8 rounded-md border-2 border-white object-cover"
                            />
                          ))}
                          {order.items.length > 3 && (
                            <div className="h-8 w-8 rounded-md bg-muted border-2 border-white flex items-center justify-center text-xs font-medium">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
                        </p>
                      </td>
                      <td className="p-4">
                        <span className="font-medium">${order.total.toFixed(2)}</span>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className={`${status.color} flex items-center gap-1 w-fit`}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className="text-sm">{order.region}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</span>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Truck className="h-4 w-4 mr-2" />
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="h-4 w-4 mr-2" />
                              Cancel Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t">
            <p className="text-sm text-muted-foreground">Showing 1-5 of 1,234 orders</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-charcoal text-white">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <span className="text-muted-foreground">...</span>
              <Button variant="outline" size="sm">
                247
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order {selectedOrder.orderNumber}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Status */}
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={`${statusConfig[selectedOrder.status].color} flex items-center gap-1`}
                  >
                    {(() => {
                      const StatusIcon = statusConfig[selectedOrder.status].icon
                      return <StatusIcon className="h-3 w-3" />
                    })()}
                    {statusConfig[selectedOrder.status].label}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(selectedOrder.createdAt)}
                  </span>
                </div>

                <Separator />

                {/* Customer Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Customer
                    </h4>
                    <p className="font-medium">{selectedOrder.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedOrder.customer.email}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Shipping Address
                    </h4>
                    <p className="text-sm">{selectedOrder.shippingAddress.line1}</p>
                    {selectedOrder.shippingAddress.line2 && (
                      <p className="text-sm">{selectedOrder.shippingAddress.line2}</p>
                    )}
                    <p className="text-sm">
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}{" "}
                      {selectedOrder.shippingAddress.postalCode}
                    </p>
                    <p className="text-sm">{selectedOrder.shippingAddress.country}</p>
                  </div>
                </div>

                <Separator />

                {/* Order Items */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Order Items</h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{item.productName}</p>
                          <p className="text-xs text-muted-foreground">{item.variant}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Order Summary */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Order Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${selectedOrder.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{selectedOrder.shipping === 0 ? "Free" : `$${selectedOrder.shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${selectedOrder.tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment & Tracking */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Payment Method
                    </h4>
                    <p className="text-sm">{selectedOrder.paymentMethod}</p>
                  </div>
                  {selectedOrder.trackingNumber && (
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        Tracking Number
                      </h4>
                      <p className="text-sm font-mono">{selectedOrder.trackingNumber}</p>
                    </div>
                  )}
                </div>

                {selectedOrder.notes && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium mb-2">Notes</h4>
                      <p className="text-sm text-muted-foreground">{selectedOrder.notes}</p>
                    </div>
                  </>
                )}

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1">Update Status</Button>
                  <Button variant="outline" className="flex-1">
                    Print Invoice
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
