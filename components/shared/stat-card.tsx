import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn, formatCurrency, formatPercent } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon?: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  compact?: boolean;
  format?: 'currency' | 'percent' | 'number';
  className?: string;
}

const variantStyles = {
  default: 'border-border',
  success: 'border-success/30 bg-success/5',
  warning: 'border-warning/30 bg-warning/5',
  destructive: 'border-destructive/30 bg-destructive/5',
};

const iconStyles = {
  default: 'bg-primary/10 text-primary',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  destructive: 'bg-destructive/15 text-destructive',
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'default',
  compact = true,
  format = 'currency',
  className,
}: StatCardProps) {
  const displayValue =
    format === 'percent'
      ? formatPercent(value)
      : format === 'number'
        ? value.toLocaleString('en-IN')
        : formatCurrency(value, { compact });

  return (
    <Card className={cn('transition-shadow hover:shadow-md', variantStyles[variant], className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-muted-foreground">{title}</p>
            <p className="mt-1 truncate text-lg font-bold sm:text-xl">{displayValue}</p>
            {subtitle && (
              <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {Icon && (
            <div className={cn('rounded-lg p-2', iconStyles[variant])}>
              <Icon className="h-4 w-4" aria-hidden="true" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
