'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

export function MisleadingSection() {
  return (
    <section className="border-y bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight">
            Why Most SIP Calculators Are Misleading
          </h2>
          <p className="mt-4 text-muted-foreground">
            They show you a big number. We show you the complete picture.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-destructive/30">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-2 text-destructive">
                  <XCircle className="h-5 w-5" />
                  <span className="font-semibold">Most calculators show</span>
                </div>
                <p className="text-4xl font-bold">{formatCurrency(10000000, { compact: true })}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  A flashy number with no context about what it&apos;s actually worth.
                </p>
                <ul className="mt-6 space-y-3">
                  {['Ignores inflation', 'Ignores LTCG tax', 'Ignores purchasing power'].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <AlertTriangle className="h-4 w-4 shrink-0 text-warning" />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-success/30 bg-success/5">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-2 text-success">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-semibold">Our platform shows</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Nominal Corpus</p>
                    <p className="text-2xl font-bold">{formatCurrency(9200000, { compact: true })}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Post-Tax Wealth</p>
                    <p className="text-2xl font-bold text-warning">
                      {formatCurrency(8450000, { compact: true })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Real Purchasing Power</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(2870000, { compact: true })}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  The complete picture — so you can plan with confidence.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
