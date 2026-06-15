'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import type { YearWiseGrowth } from '@/types';

const WealthGrowthChart = dynamic(
  () => import('@/components/charts/wealth-growth-chart').then((m) => m.WealthGrowthChart),
  { ssr: false, loading: () => <ChartSkeleton /> },
);

const InvestedVsReturnsChart = dynamic(
  () =>
    import('@/components/charts/invested-vs-returns-chart').then((m) => m.InvestedVsReturnsChart),
  { ssr: false, loading: () => <ChartSkeleton /> },
);

const InflationImpactChart = dynamic(
  () => import('@/components/charts/inflation-impact-chart').then((m) => m.InflationImpactChart),
  { ssr: false, loading: () => <ChartSkeleton /> },
);

const PostTaxWealthChart = dynamic(
  () => import('@/components/charts/post-tax-wealth-chart').then((m) => m.PostTaxWealthChart),
  { ssr: false, loading: () => <ChartSkeleton /> },
);

function ChartSkeleton() {
  return <Skeleton className="h-[300px] w-full rounded-xl" />;
}

interface WealthChartsProps {
  data: YearWiseGrowth[];
}

export function WealthCharts({ data }: WealthChartsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <WealthGrowthChart data={data} />
      </div>
      <InvestedVsReturnsChart data={data} />
      <InflationImpactChart data={data} />
      <div className="lg:col-span-2">
        <PostTaxWealthChart data={data} />
      </div>
    </div>
  );
}

export { WealthGrowthChart, InvestedVsReturnsChart, InflationImpactChart, PostTaxWealthChart };
