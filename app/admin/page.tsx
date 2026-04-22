'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Package,
  AlertTriangle,
  Globe2,
  Languages,
  Share2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  FileText,
  CheckCircle,
  Clock,
} from 'lucide-react'
import { PageHeader } from '@/components/admin/ui/page-header'
import { StatCard } from '@/components/admin/ui/stat-card'
import { StatusBadge } from '@/components/admin/ui/status-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { adminDashboardData, aiInsights, topProductsPerformance } from '@/lib/admin/data'
import { cn } from '@/lib/utils'

const activityIcons: Record<string, React.ElementType> = {
  'shopping-bag': ShoppingBag,
  'refresh-cw': RefreshCw,
  'check-circle': CheckCircle,
  'file-text': FileText,
  'globe': Globe2,
}

export default function AdminDashboard() {
  const { overview, recentActivity, pendingActions } = adminDashboardData

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here&apos;s what&apos;s happening with JISOO today."
        actions={
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        }
      />

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Sales"
          value={`€${overview.totalSales.toLocaleString()}`}
          change={overview.salesGrowth}
          changeLabel="vs last month"
          icon={<DollarSign className="h-5 w-5 text-rose-mauve" />}
          variant="primary"
        />
        <StatCard
          title="Orders"
          value={overview.totalOrders.toLocaleString()}
          change={overview.ordersGrowth}
          changeLabel="vs last month"
          icon={<ShoppingBag className="h-5 w-5 text-plum" />}
        />
        <StatCard
          title="Conversion Rate"
          value={`${overview.conversionRate}%`}
          change={overview.conversionGrowth}
          changeLabel="vs last month"
          icon={<TrendingUp className="h-5 w-5 text-plum" />}
        />
        <StatCard
          title="Pending Products"
          value={overview.pendingSupplierProducts}
          icon={<Package className="h-5 w-5 text-rose-mauve" />}
          variant="accent"
        />
      </div>

      {/* Alert Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/suppliers" className="group">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-xl border border-champagne-gold/35 bg-champagne-gold/10 p-4 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-champagne-gold/20">
                <Package className="h-5 w-5 text-plum" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-plum">{overview.pendingSupplierProducts}</p>
                <p className="text-sm text-plum">Supplier Products</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-rose-mauve opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </motion.div>
        </Link>

        <Link href="/admin/products" className="group">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-xl border border-rose-200 bg-rose-50 p-4 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100">
                <AlertTriangle className="h-5 w-5 text-rose-700" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-rose-900">{overview.lowStockAlerts}</p>
                <p className="text-sm text-rose-700">Low Stock Alerts</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-rose-600 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </motion.div>
        </Link>

        <Link href="/admin/regions" className="group">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-xl border border-champagne-gold/35 bg-nude-beige p-4 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-champagne-gold/20">
                <Globe2 className="h-5 w-5 text-plum" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-plum">{overview.regionRestrictionAlerts}</p>
                <p className="text-sm text-plum">Region Restrictions</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-rose-mauve opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </motion.div>
        </Link>

        <Link href="/admin/translations" className="group">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-xl border border-rose-mauve/30 bg-blush-pink/40 p-4 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blush-pink/60">
                <Languages className="h-5 w-5 text-plum" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-plum">{overview.translationTasks}</p>
                <p className="text-sm text-plum">Translation Tasks</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-rose-mauve opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </motion.div>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Products */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-serif">Top Products</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/analytics">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProductsPerformance.slice(0, 5).map((product, index) => (
                <motion.div
                  key={product.productId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-medium">
                    {index + 1}
                  </span>
                  <div className="h-12 w-12 rounded-lg bg-secondary overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-br from-blush-pink to-nude-beige" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{product.productName}</p>
                    <p className="text-xs text-muted-foreground">{product.unitsSold} sold</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">€{product.revenue.toLocaleString()}</p>
                    <p className={cn(
                      'text-xs',
                      product.trend === 'up' ? 'text-rose-mauve' : product.trend === 'down' ? 'text-rose-600' : 'text-muted-foreground'
                    )}>
                      {product.trend === 'up' ? '↑' : product.trend === 'down' ? '↓' : '→'} {product.conversionRate}% conv.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-serif flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-rose-mauve" />
              AI Insights
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/ai-copilot">
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[280px] pr-4">
              <div className="space-y-3">
                {aiInsights.slice(0, 4).map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      'rounded-lg border p-3 transition-all hover:shadow-sm cursor-pointer',
                      insight.priority === 'high' ? 'border-rose-200 bg-rose-50/50' :
                      insight.priority === 'medium' ? 'border-champagne-gold/35 bg-champagne-gold/10/50' :
                      'border-border/50 bg-card'
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <div className={cn(
                        'mt-0.5 h-2 w-2 rounded-full shrink-0',
                        insight.priority === 'high' ? 'bg-rose-500' :
                        insight.priority === 'medium' ? 'bg-amber-500' :
                        'bg-rose-mauve'
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{insight.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{insight.summary}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Actions */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-serif">Pending Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingActions.map((action, index) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={action.link}
                    className="flex items-center gap-4 rounded-lg border border-border/50 p-3 transition-all hover:bg-secondary/50 hover:shadow-sm"
                  >
                    <div className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-lg',
                      action.priority === 'high' ? 'bg-rose-100' :
                      action.priority === 'medium' ? 'bg-champagne-gold/20' :
                      'bg-blush-pink/60'
                    )}>
                      <Clock className={cn(
                        'h-5 w-5',
                        action.priority === 'high' ? 'text-rose-600' :
                        action.priority === 'medium' ? 'text-rose-mauve' :
                        'text-rose-mauve'
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{action.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{action.description}</p>
                    </div>
                    <StatusBadge
                      status={action.priority === 'high' ? 'error' : action.priority === 'medium' ? 'warning' : 'info'}
                      label={action.priority}
                      size="sm"
                      showIcon={false}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-serif">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activityIcons[activity.icon] || FileText
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary shrink-0">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                    </div>
                    <time className="text-xs text-muted-foreground shrink-0">
                      {new Date(activity.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </time>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
