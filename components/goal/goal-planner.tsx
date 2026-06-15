'use client';

import { useMemo, useState } from 'react';
import {
  Bike,
  Car,
  GraduationCap,
  Heart,
  Home,
  Plane,
  Target,
  ArrowDown,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InputSlider } from '@/components/shared/input-slider';
import { StatCard } from '@/components/shared/stat-card';
import { GOAL_PRESETS, DEFAULT_SIP_INPUTS } from '@/constants';
import { calculateGoalAnalysis } from '@/lib/calculations';
import { cn, formatCurrency } from '@/lib/utils';
import type { GoalInputs, GoalType } from '@/types';

const iconMap = {
  Bike,
  Car,
  Home,
  GraduationCap,
  Heart,
  Plane,
  Target,
};

export function GoalPlanner() {
  const [goalType, setGoalType] = useState<GoalType>('house');
  const preset = GOAL_PRESETS.find((p) => p.type === goalType) ?? GOAL_PRESETS[0];

  const [inputs, setInputs] = useState<GoalInputs>({
    goalAmountToday: preset.defaultAmount,
    years: preset.defaultYears,
    annualReturn: DEFAULT_SIP_INPUTS.annualReturn,
    inflationRate: DEFAULT_SIP_INPUTS.inflationRate,
    stepUpPercent: DEFAULT_SIP_INPUTS.stepUpPercent,
    ltcgTaxRate: DEFAULT_SIP_INPUTS.ltcgTaxRate,
    exemptionLimit: DEFAULT_SIP_INPUTS.exemptionLimit,
  });

  const selectGoal = (type: GoalType) => {
    const p = GOAL_PRESETS.find((g) => g.type === type)!;
    setGoalType(type);
    setInputs((prev) => ({
      ...prev,
      goalAmountToday: p.defaultAmount,
      years: p.defaultYears,
    }));
  };

  const result = useMemo(() => calculateGoalAnalysis(inputs), [inputs]);

  const update = <K extends keyof GoalInputs>(key: K, value: GoalInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const journeySteps = [
    {
      label: 'Goal Today',
      value: inputs.goalAmountToday,
      description: 'What your goal costs right now',
    },
    {
      label: 'Future Cost',
      value: result.inflationAdjustedGoal,
      description: `After ${inputs.inflationRate}% inflation for ${inputs.years} years`,
    },
    {
      label: 'Tax Adjusted Cost',
      value: result.taxAdjustedGoal,
      description: 'Corpus needed after LTCG tax',
    },
    {
      label: 'Required SIP',
      value: result.requiredSIP,
      description: 'Monthly investment needed',
      isMonthly: true,
    },
  ];

  return (
    <div className="space-y-8">
      <Card className="border-brand/20 bg-accent/30">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">How much SIP do I need?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Select your goal, and we&apos;ll calculate the exact monthly SIP — adjusted for
            inflation, taxes, and step-up increases.
          </p>
        </CardContent>
      </Card>

      <div>
        <h3 className="mb-3 text-sm font-medium">Choose Your Goal</h3>
        <div className="flex flex-wrap gap-2">
          {GOAL_PRESETS.map((preset) => {
            const Icon = iconMap[preset.icon as keyof typeof iconMap] ?? Target;
            return (
              <button
                key={preset.type}
                type="button"
                onClick={() => selectGoal(preset.type)}
                className={cn(
                  'flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all',
                  goalType === preset.type
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50',
                )}
              >
                <Icon className="h-4 w-4" />
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Goal Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <InputSlider
              label="Goal Amount Today"
              value={inputs.goalAmountToday}
              onChange={(v) => update('goalAmountToday', v)}
              min={50000}
              max={50000000}
              step={50000}
              unit="currency"
              tooltip="Current cost of your goal in today's rupees."
            />
            <InputSlider
              label="Years to Goal"
              value={inputs.years}
              onChange={(v) => update('years', v)}
              min={1}
              max={30}
              step={1}
              unit="years"
              tooltip="How many years until you need this money."
            />
            <InputSlider
              label="Expected Return"
              value={inputs.annualReturn}
              onChange={(v) => update('annualReturn', v)}
              min={5}
              max={20}
              step={0.5}
              unit="percent"
              tooltip="Expected annual return from your investments."
            />
            <InputSlider
              label="Inflation Rate"
              value={inputs.inflationRate}
              onChange={(v) => update('inflationRate', v)}
              min={2}
              max={10}
              step={0.5}
              unit="percent"
              tooltip="Expected inflation — your goal will cost more in the future."
            />
            <InputSlider
              label="Step-Up SIP"
              value={inputs.stepUpPercent}
              onChange={(v) => update('stepUpPercent', v)}
              min={0}
              max={20}
              step={1}
              unit="percent"
              tooltip="Annual increase in monthly SIP."
            />
            <InputSlider
              label="LTCG Tax Rate"
              value={inputs.ltcgTaxRate}
              onChange={(v) => update('ltcgTaxRate', v)}
              min={0}
              max={20}
              step={0.5}
              unit="percent"
            />
            <InputSlider
              label="Exemption Limit"
              value={inputs.exemptionLimit}
              onChange={(v) => update('exemptionLimit', v)}
              min={0}
              max={500000}
              step={25000}
              unit="currency"
            />
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your Goal Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-2">
                {journeySteps.map((step, i) => (
                  <div key={step.label} className="w-full">
                    <div className="rounded-xl border bg-card p-4 text-center">
                      <p className="text-xs text-muted-foreground">{step.label}</p>
                      <p className="mt-1 text-2xl font-bold text-primary">
                        {step.isMonthly
                          ? `${formatCurrency(step.value)}/mo`
                          : formatCurrency(step.value, { compact: true })}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{step.description}</p>
                    </div>
                    {i < journeySteps.length - 1 && (
                      <div className="flex justify-center py-1">
                        <ArrowDown className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard
              title="Required SIP"
              value={result.requiredSIP}
              subtitle="With step-up"
            />
            <StatCard
              title="Without Step-Up"
              value={result.requiredSIPWithoutStepUp}
              subtitle="Flat monthly SIP"
              variant="warning"
            />
            <StatCard
              title="Savings with Step-Up"
              value={result.savingsImprovement}
              subtitle="Less per month initially"
              variant="success"
            />
            <StatCard
              title="Future Corpus"
              value={result.futureCorpus}
              subtitle="Expected at goal date"
            />
          </div>

          {result.savingsImprovement > 0 && (
            <Card className="border-success/30 bg-success/5">
              <CardContent className="p-4">
                <Badge variant="success" className="mb-2">
                  Step-Up Benefit
                </Badge>
                <p className="text-sm">
                  With a {inputs.stepUpPercent}% annual step-up, you start with{' '}
                  <strong>{formatCurrency(result.requiredSIP)}/month</strong> instead of{' '}
                  <strong>{formatCurrency(result.requiredSIPWithoutStepUp)}/month</strong> — saving{' '}
                  <strong>{formatCurrency(result.savingsImprovement)}</strong> monthly initially
                  while still reaching your goal.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
