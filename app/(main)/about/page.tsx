import type { Metadata } from 'next';
import { AboutContent } from '@/components/about/about-content';

export const metadata: Metadata = {
  title: 'Learn — Financial Education',
  description:
    'Understand SIP, compounding, inflation, LTCG tax, CAGR, and real returns with examples and guides.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <AboutContent />
    </div>
  );
}
