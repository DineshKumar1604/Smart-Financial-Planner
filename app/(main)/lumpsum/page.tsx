import { ComingSoon } from '@/components/shared/coming-soon';

export const metadata = {
  title: 'Lumpsum Calculator',
};

export default function LumpsumPage() {
  return (
    <ComingSoon
      title="Lumpsum Calculator"
      description="Estimate growth from one-time investments with inflation and tax adjustments."
    />
  );
}
