import type { Metadata } from 'next';
import { WealthCalculator } from '@/components/wealth/wealth-calculator';

export const metadata: Metadata = {
  title: 'SIP Wealth Calculator',
  description:
    'Calculate future SIP wealth with inflation adjustment, LTCG tax estimation, step-up SIP, and real purchasing power analysis.',
};

export default function WealthPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">SIP Wealth Calculator</h1>
        <p className="mt-2 text-muted-foreground">
          See your complete wealth picture — nominal, post-tax, and inflation-adjusted.
        </p>
      </div>
      <WealthCalculator />
    </div>
  );
}
