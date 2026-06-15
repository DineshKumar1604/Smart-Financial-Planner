'use client';

import { useMemo, useState } from 'react';
import {
  Banknote,
  Lightbulb,
  PiggyBank,
  Receipt,
  Scale,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InputSlider } from '@/components/shared/input-slider';
import { StatCard } from '@/components/shared/stat-card';
import { EducationalCard } from '@/components/shared/educational-card';
import { WealthCharts } from '@/components/wealth/wealth-charts';
import { DEFAULT_SIP_INPUTS } from '@/constants';
import { calculateSIPAnalysis, generateInsights } from '@/lib/calculations';
import { formatCurrency, formatPercent } from '@/lib/utils';
import type { SIPInputs } from '@/types';

export function WealthCalculator() {
  const [inputs, setInputs] = useState<SIPInputs>(DEFAULT_SIP_INPUTS);

  const result = useMemo(() => calculateSIPAnalysis(inputs), [inputs]);
  const insights = useMemo(() => generateInsights(result, inputs), [result, inputs]);

  const update = <K extends keyof SIPInputs>(key: K, value: SIPInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      <EducationalCard
        title="What This Calculator Does"
        description="This isn't just a SIP calculator — it's a complete wealth analysis tool. We calculate your future corpus, then adjust for inflation (real purchasing power), LTCG tax, and show you what your money is actually worth."
        example={`₹${inputs.monthlySIP.toLocaleString('en-IN')}/month for ${inputs.years} years at ${inputs.annualReturn}% with ${inputs.stepUpPercent}% step-up → Expected corpus ${formatCurrency(result.futureCorpus, { compact: true })}`}
      />

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Investment Inputs</CardTitle>
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
              tooltip="The fixed amount you invest every month in your mutual fund SIP."
            />
            <InputSlider
              label="Expected Return"
              value={inputs.annualReturn}
              onChange={(v) => update('annualReturn', v)}
              min={5}
              max={20}
              step={0.5}
              unit="percent"
              tooltip="Expected annual rate of return from your equity mutual fund investments."
            />
            <InputSlider
              label="Investment Period"
              value={inputs.years}
              onChange={(v) => update('years', v)}
              min={1}
              max={40}
              step={1}
              unit="years"
              tooltip="Number of years you plan to continue your SIP investments."
            />
            <InputSlider
              label="Step-Up SIP"
              value={inputs.stepUpPercent}
              onChange={(v) => update('stepUpPercent', v)}
              min={0}
              max={20}
              step={1}
              unit="percent"
              tooltip="Annual increase in your monthly SIP amount. Mirrors salary hikes."
            />
            <InputSlider
              label="Inflation Rate"
              value={inputs.inflationRate}
              onChange={(v) => update('inflationRate', v)}
              min={2}
              max={10}
              step={0.5}
              unit="percent"
              tooltip="Expected annual inflation rate. Reduces your real purchasing power over time."
            />
            <InputSlider
              label="LTCG Tax Rate"
              value={inputs.ltcgTaxRate}
              onChange={(v) => update('ltcgTaxRate', v)}
              min={0}
              max={20}
              step={0.5}
              unit="percent"
              tooltip="Long-Term Capital Gains tax rate on equity mutual fund profits."
            />
            <InputSlider
              label="Exemption Limit"
              value={inputs.exemptionLimit}
              onChange={(v) => update('exemptionLimit', v)}
              min={0}
              max={500000}
              step={25000}
              unit="currency"
              tooltip="Annual LTCG exemption limit. Gains below this are tax-free."
            />
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Invested"
              value={result.totalInvested}
              icon={Wallet}
              subtitle="From your pocket"
            />
            <StatCard
              title="Wealth Created"
              value={result.wealthCreated}
              icon={TrendingUp}
              variant="success"
              subtitle="Compounding returns"
            />
            <StatCard
              title="Future Corpus"
              value={result.futureCorpus}
              icon={PiggyBank}
              subtitle="Nominal value"
            />
            <StatCard
              title="Real Wealth"
              value={result.inflationAdjustedWealth}
              icon={Scale}
              variant="warning"
              subtitle="Today's purchasing power"
            />
            <StatCard
              title="LTCG Tax"
              value={result.ltcgTax}
              icon={Receipt}
              variant="destructive"
              subtitle="Tax on gains"
            />
            <StatCard
              title="Post-Tax Wealth"
              value={result.postTaxWealth}
              icon={Banknote}
              subtitle="What you keep"
            />
            <StatCard
              title="Inflation Adjusted"
              value={result.inflationAdjustedWealth}
              icon={Scale}
              variant="warning"
            />
            <StatCard
              title="Real CAGR"
              value={result.realCAGR}
              icon={TrendingUp}
              subtitle="After inflation adjustment"
              format="percent"
            />
          </div>

          <WealthCharts data={result.yearWiseData} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
          <Lightbulb className="h-5 w-5 text-warning" />
          Educational Insights
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight) => (
            <Card key={insight.id}>
              <CardContent className="p-4">
                <Badge
                  variant={
                    insight.type === 'positive'
                      ? 'success'
                      : insight.type === 'warning'
                        ? 'warning'
                        : 'secondary'
                  }
                  className="mb-2"
                >
                  {insight.type}
                </Badge>
                <h3 className="font-semibold">{insight.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{insight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
