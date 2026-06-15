import { ComingSoon } from '@/components/shared/coming-soon';

export const metadata = {
  title: 'Retirement Planner',
};

export default function RetirementPage() {
  return (
    <ComingSoon
      title="Retirement Planner"
      description="Plan your golden years with confidence. Calculate corpus needed for a comfortable retirement."
    />
  );
}
