'use client';

import { motion } from 'framer-motion';
import { EDUCATION_TOPICS } from '@/constants';
import { EducationalCard } from '@/components/shared/educational-card';

export function EducationSection() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Learn Before You Invest</h2>
          <p className="mt-4 text-muted-foreground">
            Understanding these concepts is the key to building real wealth.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EDUCATION_TOPICS.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <EducationalCard
                title={topic.title}
                description={topic.summary}
                example={topic.example}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-12 max-w-3xl rounded-2xl border bg-card p-8"
        >
          <h3 className="text-xl font-semibold">SIP Example: The Power of Compounding</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            {[
              { label: 'Monthly SIP', value: '₹5,000' },
              { label: 'Duration', value: '20 years' },
              { label: 'Return', value: '12% p.a.' },
              { label: 'Expected Wealth', value: '₹49.5 Lakhs' },
            ].map((item) => (
              <div key={item.label} className="rounded-lg bg-muted/50 p-4 text-center">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="mt-1 text-lg font-bold">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            But here&apos;s what most calculators won&apos;t tell you: after 6% inflation and LTCG
            tax, your real purchasing power could be just ₹12-15 Lakhs in today&apos;s terms. That&apos;s
            why we built Smart SIP Planner.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
