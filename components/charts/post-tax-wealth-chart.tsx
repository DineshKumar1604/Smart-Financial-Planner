'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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

export function PostTaxWealthChart({ data }: ChartProps) {
  const lastYear = data[data.length - 1];
  const chartData = lastYear
    ? [
        {
          name: 'Final Year',
          corpus: Math.round(lastYear.corpus),
          postTax: Math.round(lastYear.postTaxCorpus),
          tax: Math.round(lastYear.corpus - lastYear.postTaxCorpus),
        },
      ]
    : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Post-Tax Wealth Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full" role="img" aria-label="Post-tax wealth breakdown chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
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
              <Legend />
              <Bar
                dataKey="postTax"
                stackId="a"
                fill="hsl(160, 84%, 39%)"
                name="Post-Tax Wealth"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="tax"
                stackId="a"
                fill="hsl(0, 84%, 60%)"
                name="LTCG Tax"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
