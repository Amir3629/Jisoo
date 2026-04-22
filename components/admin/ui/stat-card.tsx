'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  className?: string
  variant?: 'default' | 'primary' | 'accent'
}

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  trend,
  className,
  variant = 'default',
}: StatCardProps) {
  const determinedTrend = trend || (change !== undefined ? (change > 0 ? 'up' : change < 0 ? 'down' : 'neutral') : undefined)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'rounded-xl border p-5 transition-all duration-300 hover:shadow-luxury',
        variant === 'default' && 'bg-card border-border/50',
        variant === 'primary' && 'bg-gradient-to-br from-rose-mauve to-[#c988a0] text-white border-rose-mauve/40',
        variant === 'accent' && 'bg-gradient-to-br from-blush-pink/55 to-nude-beige border-champagne-gold/35',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className={cn(
            'text-sm font-medium',
            variant === 'primary' ? 'text-white/80' : 'text-muted-foreground'
          )}>
            {title}
          </p>
          <p className={cn(
            'text-2xl lg:text-3xl font-semibold tracking-tight',
            variant === 'primary' ? 'text-white' : 'text-foreground'
          )}>
            {value}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5">
              {determinedTrend === 'up' && (
                <div className={cn(
                  'flex items-center gap-0.5 text-sm font-medium',
                  variant === 'primary' ? 'text-white/90' : 'text-rose-mauve'
                )}>
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>+{Math.abs(change)}%</span>
                </div>
              )}
              {determinedTrend === 'down' && (
                <div className={cn(
                  'flex items-center gap-0.5 text-sm font-medium',
                  variant === 'primary' ? 'text-white/90' : 'text-rose-600'
                )}>
                  <TrendingDown className="h-3.5 w-3.5" />
                  <span>-{Math.abs(change)}%</span>
                </div>
              )}
              {determinedTrend === 'neutral' && (
                <div className={cn(
                  'flex items-center gap-0.5 text-sm font-medium',
                  variant === 'primary' ? 'text-white/90' : 'text-muted-foreground'
                )}>
                  <Minus className="h-3.5 w-3.5" />
                  <span>0%</span>
                </div>
              )}
              {changeLabel && (
                <span className={cn(
                  'text-xs',
                  variant === 'primary' ? 'text-white/60' : 'text-muted-foreground'
                )}>
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className={cn(
            'flex h-10 w-10 items-center justify-center rounded-lg',
            variant === 'primary' ? 'bg-white/20' : 'bg-secondary'
          )}>
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  )
}
