'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Package,
  Truck,
  Globe2,
  Shield,
  Languages,
  Image,
  Share2,
  Sparkles,
  BarChart3,
  ShoppingBag,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Menu,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent } from '@/components/ui/sheet'

type AdminNavKey = 'dashboard' | 'suppliers' | 'products' | 'regions' | 'compliance' | 'translations' | 'media' | 'social' | 'ai' | 'analytics' | 'orders' | 'customers'

const navigation: Array<{ key: AdminNavKey; href: string; icon: any; badge?: number }> = [
  { key: 'dashboard', href: '/admin', icon: LayoutDashboard },
  { key: 'suppliers', href: '/admin/suppliers', icon: Truck, badge: 16 },
  { key: 'products', href: '/admin/products', icon: Package },
  { key: 'regions', href: '/admin/regions', icon: Globe2, badge: 4 },
  { key: 'compliance', href: '/admin/compliance', icon: Shield },
  { key: 'translations', href: '/admin/translations', icon: Languages, badge: 8 },
  { key: 'media', href: '/admin/media', icon: Image },
  { key: 'social', href: '/admin/social', icon: Share2, badge: 3 },
  { key: 'ai', href: '/admin/ai-copilot', icon: Sparkles },
  { key: 'analytics', href: '/admin/analytics', icon: BarChart3 },
  { key: 'orders', href: '/admin/orders', icon: ShoppingBag },
  { key: 'customers', href: '/admin/customers', icon: Users },
]

const notifications = [
  { id: 1, title: 'New supplier products', message: '3 products from Hanbang Lab pending review', time: '5 min ago', unread: true },
  { id: 2, title: 'Compliance alert', message: 'Aura Tone-Up Sun Cream needs CA docs', time: '1 hour ago', unread: true },
  { id: 3, title: 'Translation complete', message: 'French translations approved', time: '3 hours ago', unread: false },
]

function SidebarContent({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (v: boolean) => void }) {
  const pathname = usePathname()
  const { locale, dictionary } = useLocale()

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border/50">
        <Link href={localizeHref('/admin', locale)} className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-rose-mauve to-rose-mauve">
            <span className="font-serif text-lg font-bold text-white">J</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <span className="font-serif text-lg font-semibold text-foreground">JISOO</span>
                <span className="ml-1 text-xs text-muted-foreground">Admin</span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:flex h-8 w-8"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          {navigation.map((item) => {
            const isActive = pathname === localizeHref(item.href, locale) || (item.href !== '/admin' && pathname.startsWith(localizeHref(item.href, locale)))
            return (
              <Link
                key={item.key}
                href={localizeHref(item.href, locale)}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-rose-mauve text-white shadow-sm'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <item.icon className={cn('h-5 w-5 shrink-0', isActive ? 'text-white' : 'text-muted-foreground group-hover:text-foreground')} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="flex-1 overflow-hidden whitespace-nowrap"
                    >
                      {dictionary.admin.nav[item.key]}
                    </motion.span>
                  )}
                </AnimatePresence>
                {!collapsed && item.badge && (
                  <Badge variant={isActive ? 'secondary' : 'outline'} className={cn('h-5 px-1.5 text-xs', isActive && 'bg-white/20 text-white border-transparent')}>
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* User */}
      <div className="border-t border-border/50 p-4">
        <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback className="bg-rose-mauve text-white">JA</AvatarFallback>
          </Avatar>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 overflow-hidden"
              >
                <p className="text-sm font-medium text-foreground truncate">Admin User</p>
                <p className="text-xs text-muted-foreground truncate">admin@jisoo.com</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { locale, dictionary } = useLocale()

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col border-r border-border/50 bg-card"
      >
        <SidebarContent collapsed={collapsed} setCollapsed={setCollapsed} />
      </motion.aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SidebarContent collapsed={false} setCollapsed={() => {}} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-border/50 bg-card px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden sm:flex relative w-64 lg:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={dictionary.admin.searchPlaceholder}
                className="pl-9 bg-secondary/50 border-transparent focus:border-border"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* {dictionary.admin.notifications.title} */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-rose-mauve text-[10px] font-medium text-white flex items-center justify-center">
                    2
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  {dictionary.admin.notifications.title}
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground">
                    {dictionary.admin.notifications.markRead}
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notif) => (
                  <DropdownMenuItem key={notif.id} className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                    <div className="flex items-center gap-2">
                      {notif.unread && <span className="h-2 w-2 rounded-full bg-rose-mauve" />}
                      <span className="font-medium text-sm">{notif.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{notif.message}</span>
                    <span className="text-xs text-muted-foreground/70">{notif.time}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Settings */}
            <Button variant="ghost" size="icon" asChild>
              <Link href={localizeHref('/admin/settings', locale)}>
                <Settings className="h-5 w-5" />
              </Link>
            </Button>

            {/* Back to Store */}
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href={localizeHref('/', locale)}>
                <LogOut className="h-4 w-4 mr-2" />
                Store
              </Link>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
