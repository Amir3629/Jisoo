'use client'

import { cn } from '@/lib/utils'
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  EyeOff,
  ShoppingCart,
  Loader2,
  FileText,
  Globe,
} from 'lucide-react'

type StatusType =
  | 'success'
  | 'error'
  | 'warning'
  | 'pending'
  | 'info'
  | 'neutral'
  // Market status
  | 'visible_and_buyable'
  | 'visible_but_not_buyable'
  | 'hidden'
  | 'pending_compliance'
  // Compliance status
  | 'compliant'
  | 'non_compliant'
  | 'pending_review'
  | 'expired'
  | 'missing'
  // Product change type
  | 'new'
  | 'updated'
  | 'removed'
  | 'unchanged'
  // Translation status
  | 'machine_translated'
  | 'human_reviewed'
  | 'approved'
  | 'published'
  // Ingestion status
  | 'staged'
  | 'rejected'
  // Order status
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

interface StatusBadgeProps {
  status: StatusType
  label?: string
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  className?: string
}

const statusConfig: Record<StatusType, { label: string; color: string; icon: React.ElementType }> = {
  // Generic
  success: { label: 'Success', color: 'bg-champagne-gold/20 text-charcoal border-champagne-gold/35', icon: CheckCircle2 },
  error: { label: 'Error', color: 'bg-rose-100 text-rose-700 border-rose-200', icon: XCircle },
  warning: { label: 'Warning', color: 'bg-champagne-gold/20 text-charcoal border-champagne-gold/35', icon: AlertTriangle },
  pending: { label: 'Pending', color: 'bg-blush-pink/60 text-charcoal border-rose-mauve/30', icon: Clock },
  info: { label: 'Info', color: 'bg-nude-beige text-charcoal border-blush-pink/45', icon: FileText },
  neutral: { label: 'Neutral', color: 'bg-warm-ivory text-charcoal/80 border-blush-pink/40', icon: FileText },

  // Market status
  visible_and_buyable: { label: 'Buyable', color: 'bg-champagne-gold/20 text-charcoal border-champagne-gold/35', icon: ShoppingCart },
  visible_but_not_buyable: { label: 'View Only', color: 'bg-champagne-gold/20 text-charcoal border-champagne-gold/35', icon: Eye },
  hidden: { label: 'Hidden', color: 'bg-warm-ivory text-charcoal/70 border-blush-pink/40', icon: EyeOff },
  pending_compliance: { label: 'Pending Compliance', color: 'bg-champagne-gold/15 text-charcoal border-champagne-gold/35', icon: Clock },

  // Compliance status
  compliant: { label: 'Compliant', color: 'bg-champagne-gold/20 text-charcoal border-champagne-gold/35', icon: CheckCircle2 },
  non_compliant: { label: 'Non-Compliant', color: 'bg-rose-100 text-rose-700 border-rose-200', icon: XCircle },
  pending_review: { label: 'Pending Review', color: 'bg-blush-pink/60 text-charcoal border-rose-mauve/30', icon: Clock },
  expired: { label: 'Expired', color: 'bg-rose-100 text-rose-700 border-rose-200', icon: AlertTriangle },
  missing: { label: 'Missing', color: 'bg-warm-ivory text-charcoal/70 border-blush-pink/40', icon: XCircle },

  // Product change type
  new: { label: 'New', color: 'bg-champagne-gold/20 text-charcoal border-champagne-gold/35', icon: CheckCircle2 },
  updated: { label: 'Updated', color: 'bg-blush-pink/60 text-charcoal border-rose-mauve/30', icon: FileText },
  removed: { label: 'Removed', color: 'bg-rose-100 text-rose-700 border-rose-200', icon: XCircle },
  unchanged: { label: 'Unchanged', color: 'bg-warm-ivory text-charcoal/70 border-blush-pink/40', icon: FileText },

  // Translation status
  machine_translated: { label: 'Machine', color: 'bg-blush-pink/50 text-charcoal border-rose-mauve/25', icon: Loader2 },
  human_reviewed: { label: 'Reviewed', color: 'bg-blush-pink/60 text-charcoal border-rose-mauve/30', icon: Eye },
  approved: { label: 'Approved', color: 'bg-champagne-gold/20 text-charcoal border-champagne-gold/35', icon: CheckCircle2 },
  published: { label: 'Published', color: 'bg-blush-pink/45 text-charcoal border-rose-mauve/25', icon: Globe },

  // Ingestion status
  staged: { label: 'Staged', color: 'bg-champagne-gold/20 text-charcoal border-champagne-gold/35', icon: Clock },
  rejected: { label: 'Rejected', color: 'bg-rose-100 text-rose-700 border-rose-200', icon: XCircle },

  // Order status
  confirmed: { label: 'Confirmed', color: 'bg-blush-pink/60 text-charcoal border-rose-mauve/30', icon: CheckCircle2 },
  processing: { label: 'Processing', color: 'bg-champagne-gold/20 text-charcoal border-champagne-gold/35', icon: Loader2 },
  shipped: { label: 'Shipped', color: 'bg-blush-pink/50 text-charcoal border-rose-mauve/25', icon: ShoppingCart },
  delivered: { label: 'Delivered', color: 'bg-champagne-gold/20 text-charcoal border-champagne-gold/35', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'bg-warm-ivory text-charcoal/70 border-blush-pink/40', icon: XCircle },
}

export function StatusBadge({ status, label, size = 'md', showIcon = true, className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.neutral
  const Icon = config.icon

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        config.color,
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'md' && 'px-2.5 py-1 text-xs',
        size === 'lg' && 'px-3 py-1.5 text-sm',
        className
      )}
    >
      {showIcon && (
        <Icon className={cn(
          size === 'sm' && 'h-3 w-3',
          size === 'md' && 'h-3.5 w-3.5',
          size === 'lg' && 'h-4 w-4'
        )} />
      )}
      {label || config.label}
    </span>
  )
}
