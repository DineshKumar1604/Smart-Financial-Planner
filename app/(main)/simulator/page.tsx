import type { Metadata } from 'next';
import { WhatIfSimulator } from '@/components/simulator/what-if-simulator';

export const metadata: Metadata = {
  title: 'What-If Simulator',
  description:
    'Interactive SIP simulator — adjust return, inflation, step-up, and years to see instant results.',
};

export default function SimulatorPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">What-If Simulator</h1>
        <p className="mt-2 text-muted-foreground">
          Experiment with different assumptions and watch your wealth projections update instantly.
        </p>
      </div>
      <WhatIfSimulator />
    </div>
  );
}
