import { Hero } from '@/components/landing/hero';
import { MisleadingSection } from '@/components/landing/misleading-section';
import { Features } from '@/components/landing/features';
import { EducationSection } from '@/components/landing/education-section';

export default function HomePage() {
  return (
    <>
      <Hero />
      <MisleadingSection />
      <Features />
      <EducationSection />
    </>
  );
}
