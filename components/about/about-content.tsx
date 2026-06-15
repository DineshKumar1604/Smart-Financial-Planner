'use client';

import { EDUCATION_TOPICS } from '@/constants';
import { EducationalCard } from '@/components/shared/educational-card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';

const detailedTopics = [
  {
    id: 'sip-detail',
    title: 'What is SIP?',
    content: `A Systematic Investment Plan (SIP) is a method of investing a fixed sum regularly in mutual funds. Instead of timing the market, you invest consistently — monthly, quarterly, or any frequency.

**How it works:** You authorize your bank to debit a fixed amount (e.g., ₹5,000) on a specific date each month. This amount buys mutual fund units at the prevailing NAV (Net Asset Value).

**Why SIP works:** It enforces discipline, averages out market volatility (rupee cost averaging), and harnesses the power of compounding over long periods.`,
    example: '₹5,000/month × 12 months = ₹60,000 invested yearly, growing with market returns.',
  },
  {
    id: 'compounding-detail',
    title: 'What is Compounding?',
    content: `Compounding is earning returns on both your principal and previously earned returns. Albert Einstein reportedly called it the "eighth wonder of the world."

**The magic:** In early years, growth seems slow. But as your corpus grows, returns generate more returns, creating exponential growth in later years.

**Rule of 72:** Divide 72 by your return rate to estimate doubling time. At 12% return, your money doubles every 6 years.`,
    example: '₹1 lakh at 12% becomes ₹2L in 6 years, ₹4L in 12 years, ₹8L in 18 years.',
  },
  {
    id: 'inflation-detail',
    title: 'What is Inflation?',
    content: `Inflation is the rate at which prices of goods and services increase over time. It silently erodes your purchasing power.

**Impact on investments:** If your investment grows 12% but inflation is 6%, your real return is only ~5.7%. A ₹1 Crore corpus in 20 years might only buy what ₹31 Lakhs buys today.

**Why it matters:** Always evaluate investments in real (inflation-adjusted) terms, not just nominal numbers.`,
    example: 'At 6% inflation, ₹100 today will need ₹320 in 20 years to buy the same things.',
  },
  {
    id: 'ltcg-detail',
    title: 'What is LTCG Tax?',
    content: `Long-Term Capital Gains (LTCG) tax applies to profits from equity mutual funds held for more than 1 year.

**Current rules (FY 2024-25):** LTCG on equity is taxed at 12.5% on gains exceeding ₹1.25 lakh per financial year. STCG (held < 1 year) is taxed at 20%.

**Planning tip:** Factor in taxes when calculating goal amounts. You need a larger corpus than your goal because tax reduces your take-home amount.`,
    example: '₹50L corpus with ₹30L gains → Tax on (₹30L - ₹1.25L) × 12.5% = ~₹3.6L',
  },
  {
    id: 'cagr-detail',
    title: 'What is CAGR?',
    content: `Compound Annual Growth Rate (CAGR) is the mean annual growth rate of an investment over a specified time period longer than one year.

**Formula:** CAGR = (Ending Value / Beginning Value)^(1/years) - 1

It smooths out volatility and gives you a single number to compare investments.`,
    example: '₹1L growing to ₹5L in 15 years → CAGR = (5/1)^(1/15) - 1 = 11.3%',
  },
  {
    id: 'real-cagr-detail',
    title: 'What is Real CAGR?',
    content: `Real CAGR adjusts nominal returns for inflation, showing your actual wealth increase in purchasing power terms.

**Formula:** Real Return = (1 + Nominal Return) / (1 + Inflation) - 1

This is the number that truly matters for financial planning. A 12% nominal return with 6% inflation gives only ~5.7% real CAGR.`,
    example: '12% nominal - 6% inflation = 5.66% real CAGR. Your wealth grows slower than it appears.',
  },
];

export function AboutContent() {
  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Financial Education Hub
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Master the concepts behind smart investing. Knowledge is your best investment.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {EDUCATION_TOPICS.map((topic) => (
          <EducationalCard
            key={topic.id}
            title={topic.title}
            description={topic.summary}
            example={topic.example}
          />
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="mb-6 text-xl font-semibold">Deep Dive Guides</h2>
          <Accordion type="single" collapsible className="w-full">
            {detailedTopics.map((topic) => (
              <AccordionItem key={topic.id} value={topic.id}>
                <AccordionTrigger className="text-left">{topic.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    {topic.content.split('\n\n').map((paragraph, i) => (
                      <p key={i}>
                        {paragraph.split('**').map((part, j) =>
                          j % 2 === 1 ? <strong key={j}>{part}</strong> : part,
                        )}
                      </p>
                    ))}
                    <p className="rounded-lg bg-accent/50 px-3 py-2 font-medium text-accent-foreground">
                      Example: {topic.example}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="border-warning/30 bg-warning/5">
        <CardContent className="p-6">
          <h2 className="font-semibold">Disclaimer</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Smart SIP Planner is for educational purposes only. Calculations are based on
            assumptions and historical patterns. Actual returns may vary. This is not financial
            advice. Consult a SEBI-registered financial advisor before making investment decisions.
            Tax rules are subject to change.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
