import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number,
  options?: { compact?: boolean; decimals?: number },
): string {
  const { compact = false, decimals = 0 } = options ?? {};

  if (compact) {
    const abs = Math.abs(value);
    if (abs >= 1_00_00_000) {
      return `₹${(value / 1_00_00_000).toFixed(1)} Cr`;
    }
    if (abs >= 1_00_000) {
      return `₹${(value / 1_00_000).toFixed(1)} L`;
    }
    if (abs >= 1_000) {
      return `₹${(value / 1_000).toFixed(1)}K`;
    }
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatMultiplier(value: number): string {
  return `${value.toFixed(1)}x`;
}
