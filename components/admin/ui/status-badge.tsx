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
  success: { label: 'Success', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  error: { label: 'Error', color: 'bg-rose-100 text-rose-700 border-rose-200', icon: XCircle },
  warning: { label: 'Warning', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: AlertTriangle },
  pending: { label: 'Pending', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Clock },
  info: { label: 'Info', color: 'bg-sky-100 text-sky-700 border-sky-200', icon: FileText },
  neutral: { label: 'Neutral', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: FileText },

  // Market status
  visible_and_buyable: { label: 'Buyable', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: ShoppingCart },
  visible_but_not_buyable: { label: 'View Only', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Eye },
  hidden: { label: 'Hidden', color: 'bg-gray-100 text-gray-600 border-gray-200', icon: EyeOff },
  pending_compliance: { label: 'Pending Compliance', color: 'bg-orange-100 text-orange-700 border-orange-200', icon: Clock },

  // Compliance status
  compliant: { label: 'Compliant', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  non_compliant: { label: 'Non-Compliant', color: 'bg-rose-100 text-rose-700 border-rose-200', icon: XCircle },
  pending_review: { label: 'Pending Review', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Clock },
  expired: { label: 'Expired', color: 'bg-rose-100 text-rose-700 border-rose-200', icon: AlertTriangle },
  missing: { label: 'Missing', color: 'bg-gray-100 text-gray-600 border-gray-200', icon: XCircle },

  // Product change type
  new: { label: 'New', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  updated: { label: 'Updated', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: FileText },
  removed: { label: 'Removed', color: 'bg-rose-100 text-rose-700 border-rose-200', icon: XCircle },
  unchanged: { label: 'Unchanged', color: 'bg-gray-100 text-gray-600 border-gray-200', icon: FileText },

  // Translation status
  machine_translated: { label: 'Machine', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: Loader2 },
  human_reviewed: { label: 'Reviewed', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Eye },
  approved: { label: 'Approved', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  published: { label: 'Published', color: 'bg-plum/10 text-plum border-plum/20', icon: Globe },

  // Ingestion status
  staged: { label: 'Staged', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock },
  rejected: { label: 'Rejected', color: 'bg-rose-100 text-rose-700 border-rose-200', icon: XCircle },

  // Order status
  confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: CheckCircle2 },
  processing: { label: 'Processing', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Loader2 },
  shipped: { label: 'Shipped', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: ShoppingCart },
  delivered: { label: 'Delivered', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'bg-gray-100 text-gray-600 border-gray-200', icon: XCircle },
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
