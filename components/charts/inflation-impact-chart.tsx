'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import type { YearWiseGrowth } from '@/types';

interface ChartProps {
  data: YearWiseGrowth[];
}

export function InflationImpactChart({ data }: ChartProps) {
  const chartData = data.map((d) => ({
    year: `Y${d.year}`,
    nominal: Math.round(d.corpus),
    real: Math.round(d.inflationAdjustedCorpus),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Inflation Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full" role="img" aria-label="Inflation impact chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis
                tickFormatter={(v) => formatCurrency(v, { compact: true })}
                tick={{ fontSize: 12 }}
                width={60}
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="nominal"
                stroke="hsl(38, 92%, 50%)"
                fill="hsl(38, 92%, 50%)"
                fillOpacity={0.1}
                name="Nominal"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="real"
                stroke="hsl(160, 84%, 39%)"
                fill="hsl(160, 84%, 39%)"
                fillOpacity={0.2}
                name="Real Value"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
