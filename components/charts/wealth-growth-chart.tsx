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

export function WealthGrowthChart({ data }: ChartProps) {
  const chartData = data.map((d) => ({
    year: `Y${d.year}`,
    corpus: Math.round(d.corpus),
    invested: Math.round(d.invested),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Wealth Growth Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full" role="img" aria-label="Wealth growth area chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="corpusGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} className="text-muted-foreground" />
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
                dataKey="corpus"
                stroke="hsl(160, 84%, 39%)"
                fill="url(#corpusGradient)"
                name="Corpus"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="invested"
                stroke="hsl(215, 16%, 47%)"
                fill="transparent"
                name="Invested"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
