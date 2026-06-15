'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calculator,
  LineChart,
  Percent,
  SlidersHorizontal,
  Target,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'SIP Wealth Calculator',
    description: 'Calculate future wealth using SIP with step-up, inflation, and tax adjustments.',
    icon: Calculator,
    href: '/wealth',
  },
  {
    title: 'Goal Planner',
    description: 'Calculate the exact SIP needed to reach your financial goals on time.',
    icon: Target,
    href: '/goal',
  },
  {
    title: 'Inflation Impact',
    description: 'Understand how inflation erodes your purchasing power over time.',
    icon: Percent,
    href: '/wealth',
  },
  {
    title: 'LTCG Tax Estimator',
    description: 'Estimate post-tax wealth after Long-Term Capital Gains tax.',
    icon: LineChart,
    href: '/wealth',
  },
  {
    title: 'Step-Up SIP Simulator',
    description: 'See the power of increasing your SIP amount annually.',
    icon: TrendingUp,
    href: '/wealth',
  },
  {
    title: 'What-If Simulator',
    description: 'Adjust return, inflation, and step-up assumptions instantly.',
    icon: SlidersHorizontal,
    href: '/simulator',
  },
];

export function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Everything You Need to Plan Smart</h2>
          <p className="mt-4 text-muted-foreground">
            Powerful tools designed to educate and empower your investment decisions.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={feature.href} className="group block h-full">
                  <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="inline-flex items-center text-sm font-medium text-primary">
                        Explore
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
