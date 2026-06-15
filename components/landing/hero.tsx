'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/constants';
import { formatCurrency } from '@/lib/utils';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-sm font-medium text-primary">
              {SITE_CONFIG.tagline}
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              <span className="text-gradient">{SITE_CONFIG.name}</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Know what your investments will <strong className="text-foreground">ACTUALLY</strong>{' '}
              be worth — after inflation, taxes, and real purchasing power.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/wealth">
                  Calculate Wealth
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/goal">
                  <Target className="mr-2 h-4 w-4" />
                  Plan A Goal
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
            aria-hidden="true"
          >
            <DashboardPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  const bars = [40, 55, 45, 70, 60, 85, 75, 95];

  return (
    <div className="glass animate-float rounded-2xl p-6 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <BarChart3 className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="space-y-4">
        <div className="rounded-xl bg-primary/10 p-4">
          <p className="text-xs text-muted-foreground">Future Corpus</p>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(9200000, { compact: true })}
          </p>
          <div className="mt-2 flex items-center gap-1 text-xs text-success">
            <TrendingUp className="h-3 w-3" />
            +12.4% CAGR
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">Real Wealth</p>
            <p className="font-semibold">{formatCurrency(2870000, { compact: true })}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">Post-Tax</p>
            <p className="font-semibold">{formatCurrency(8450000, { compact: true })}</p>
          </div>
        </div>

        <div className="flex h-24 items-end gap-1.5">
          {bars.map((height, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-primary/60 to-primary"
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
