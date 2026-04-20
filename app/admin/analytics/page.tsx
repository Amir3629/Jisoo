"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Filter,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "@/components/admin/ui/page-header"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 65000, orders: 420, customers: 380 },
  { month: "Feb", revenue: 72000, orders: 480, customers: 420 },
  { month: "Mar", revenue: 85000, orders: 550, customers: 490 },
  { month: "Apr", revenue: 78000, orders: 510, customers: 460 },
  { month: "May", revenue: 92000, orders: 620, customers: 540 },
  { month: "Jun", revenue: 105000, orders: 710, customers: 620 },
  { month: "Jul", revenue: 118000, orders: 780, customers: 690 },
  { month: "Aug", revenue: 125000, orders: 820, customers: 740 },
  { month: "Sep", revenue: 132000, orders: 870, customers: 780 },
  { month: "Oct", revenue: 145000, orders: 950, customers: 850 },
  { month: "Nov", revenue: 168000, orders: 1100, customers: 980 },
  { month: "Dec", revenue: 195000, orders: 1280, customers: 1120 },
]

const categoryData = [
  { name: "Serums", value: 35, revenue: 342500, color: "#E8B4B8" },
  { name: "Moisturizers", value: 25, revenue: 245000, color: "#D4A574" },
  { name: "Cleansers", value: 18, revenue: 176400, color: "#A6C4A6" },
  { name: "Sunscreens", value: 12, revenue: 117600, color: "#B8D4E8" },
  { name: "Masks", value: 10, revenue: 98000, color: "#D8C4E8" },
]

const regionalData = [
  { region: "North America", revenue: 450000, growth: 15.2, orders: 2850 },
  { region: "Europe", revenue: 380000, growth: 22.5, orders: 2400 },
  { region: "Asia Pacific", revenue: 290000, growth: 18.7, orders: 1850 },
  { region: "Middle East", revenue: 85000, growth: 35.2, orders: 520 },
  { region: "Latin America", revenue: 45000, growth: 28.9, orders: 280 },
]

const topProducts = [
  { name: "COSRX Snail Mucin Essence", sales: 2840, revenue: 85200, growth: 24.5 },
  { name: "Beauty of Joseon Sunscreen", sales: 2650, revenue: 50350, growth: 32.1 },
  { name: "Sulwhasoo First Care Serum", sales: 1890, revenue: 226800, growth: 18.2 },
  { name: "Glow Recipe Watermelon Mask", sales: 1720, revenue: 60200, growth: 15.8 },
  { name: "SKIN1004 Centella Ampoule", sales: 1580, revenue: 36340, growth: 21.3 },
]

const trafficSources = [
  { source: "Organic Search", visitors: 45200, conversion: 3.2 },
  { source: "Social Media", visitors: 32800, conversion: 4.5 },
  { source: "Direct", visitors: 28500, conversion: 5.1 },
  { source: "Email", visitors: 18200, conversion: 6.8 },
  { source: "Referral", visitors: 12400, conversion: 3.9 },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("year")

  const stats = [
    {
      title: "Total Revenue",
      value: "$1.38M",
      change: "+18.2%",
      trend: "up" as const,
      icon: DollarSign,
      description: "vs last year",
    },
    {
      title: "Total Orders",
      value: "9,090",
      change: "+12.5%",
      trend: "up" as const,
      icon: ShoppingCart,
      description: "vs last year",
    },
    {
      title: "Customers",
      value: "7,170",
      change: "+24.8%",
      trend: "up" as const,
      icon: Users,
      description: "vs last year",
    },
    {
      title: "Avg Order Value",
      value: "$151.82",
      change: "+5.1%",
      trend: "up" as const,
      icon: Package,
      description: "vs last year",
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics Dashboard"
        description="Comprehensive insights into your business performance"
        icon={<TrendingUp className="h-6 w-6" />}
        actions={
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-lg bg-rose-50 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-rose-600" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-medium ${
                      stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E8B4B8" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#E8B4B8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#888" fontSize={12} />
                    <YAxis stroke="#888" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
                    <Tooltip
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                      contentStyle={{ borderRadius: "8px", border: "1px solid #e5e5e5" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#E8B4B8"
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Orders Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#888" fontSize={12} />
                    <YAxis stroke="#888" fontSize={12} />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e5e5" }} />
                    <Bar dataKey="orders" fill="#D4A574" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customer Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#888" fontSize={12} />
                    <YAxis stroke="#888" fontSize={12} />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e5e5" }} />
                    <Line
                      type="monotone"
                      dataKey="customers"
                      stroke="#A6C4A6"
                      strokeWidth={2}
                      dot={{ fill: "#A6C4A6", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [`${value}%`, name]}
                    contentStyle={{ borderRadius: "8px", border: "1px solid #e5e5e5" }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                    <span>{category.name}</span>
                  </div>
                  <span className="font-medium">${(category.revenue / 1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regional Performance */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Regional Performance</CardTitle>
              <Globe className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionalData.map((region, index) => (
                <motion.div
                  key={region.region}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{region.region}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">${(region.revenue / 1000).toFixed(0)}k</span>
                      <span className="text-xs text-emerald-600 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-0.5" />
                        {region.growth}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-rose-400 to-amber-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(region.revenue / 450000) * 100}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sales.toLocaleString()} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">${product.revenue.toLocaleString()}</p>
                    <p className="text-xs text-emerald-600">+{product.growth}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={source.source} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{source.source}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">{source.visitors.toLocaleString()} visitors</span>
                      <span className="text-emerald-600">{source.conversion}% conv.</span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-rose-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(source.visitors / 45200) * 100}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
