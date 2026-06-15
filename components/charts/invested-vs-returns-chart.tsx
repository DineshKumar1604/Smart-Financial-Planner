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

export function InvestedVsReturnsChart({ data }: ChartProps) {
  const lastYear = data[data.length - 1];
  const chartData = lastYear
    ? [
        { name: 'Invested', value: Math.round(lastYear.invested) },
        { name: 'Returns', value: Math.round(lastYear.returns) },
      ]
    : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Invested vs Returns</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full" role="img" aria-label="Invested versus returns bar chart">
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
              <Bar dataKey="value" fill="hsl(160, 84%, 39%)" radius={[6, 6, 0, 0]} name="Amount" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
