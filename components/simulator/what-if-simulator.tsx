'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { InputSlider } from '@/components/shared/input-slider';
import { StatCard } from '@/components/shared/stat-card';
import { DEFAULT_SIP_INPUTS } from '@/constants';
import { calculateSIPAnalysis } from '@/lib/calculations';
import type { SIPInputs } from '@/types';

const WealthGrowthChart = dynamic(
  () => import('@/components/charts/wealth-growth-chart').then((m) => m.WealthGrowthChart),
  { ssr: false, loading: () => <Skeleton className="h-[300px] w-full rounded-xl" /> },
);

const InflationImpactChart = dynamic(
  () => import('@/components/charts/inflation-impact-chart').then((m) => m.InflationImpactChart),
  { ssr: false, loading: () => <Skeleton className="h-[300px] w-full rounded-xl" /> },
);

export function WhatIfSimulator() {
  const [inputs, setInputs] = useState<SIPInputs>(DEFAULT_SIP_INPUTS);

  const result = useMemo(() => calculateSIPAnalysis(inputs), [inputs]);

  const update = <K extends keyof SIPInputs>(key: K, value: SIPInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      <Card className="border-brand/20 bg-accent/30">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">What-If Simulator</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Drag the sliders to instantly see how changes in return, inflation, step-up, and
            investment period affect your wealth. Charts update in real-time.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Adjust Assumptions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <InputSlider
              label="Monthly SIP"
              value={inputs.monthlySIP}
              onChange={(v) => update('monthlySIP', v)}
              min={500}
              max={100000}
              step={500}
              unit="currency"
            />
            <InputSlider
              label="Expected Return"
              value={inputs.annualReturn}
              onChange={(v) => update('annualReturn', v)}
              min={5}
              max={20}
              step={0.5}
              unit="percent"
            />
            <InputSlider
              label="Inflation"
              value={inputs.inflationRate}
              onChange={(v) => update('inflationRate', v)}
              min={2}
              max={10}
              step={0.5}
              unit="percent"
            />
            <InputSlider
              label="Step-Up"
              value={inputs.stepUpPercent}
              onChange={(v) => update('stepUpPercent', v)}
              min={0}
              max={20}
              step={1}
              unit="percent"
            />
            <InputSlider
              label="Years"
              value={inputs.years}
              onChange={(v) => update('years', v)}
              min={1}
              max={40}
              step={1}
              unit="years"
            />
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Future Corpus" value={result.futureCorpus} />
            <StatCard title="Post-Tax" value={result.postTaxWealth} variant="warning" />
            <StatCard title="Real Wealth" value={result.inflationAdjustedWealth} variant="success" />
            <StatCard title="Total Invested" value={result.totalInvested} />
          </div>

          <WealthGrowthChart data={result.yearWiseData} />
          <InflationImpactChart data={result.yearWiseData} />
        </div>
      </div>
    </div>
  );
}
