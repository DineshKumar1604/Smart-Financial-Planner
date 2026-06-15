import type { Metadata } from 'next';
import { GoalPlanner } from '@/components/goal/goal-planner';

export const metadata: Metadata = {
  title: 'Goal Planner',
  description:
    'Calculate the exact monthly SIP needed to reach your financial goals — adjusted for inflation and taxes.',
};

export default function GoalPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Goal Planner</h1>
        <p className="mt-2 text-muted-foreground">
          How much SIP do you need? Plan for bike, car, house, education, and more.
        </p>
      </div>
      <GoalPlanner />
    </div>
  );
}
