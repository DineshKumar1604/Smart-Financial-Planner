import type { GoalInputs, GoalResult, SIPInputs, SIPResult, YearWiseGrowth } from '@/types';

/**
 * Standard SIP future value (end-of-month investments).
 * FV = P × [((1 + r)^n - 1) / r] × (1 + r)
 */
export function calculateFutureValueSIP(
  monthlySIP: number,
  annualReturn: number,
  years: number,
): number {
  if (monthlySIP <= 0 || years <= 0) return 0;
  if (annualReturn === 0) return monthlySIP * years * 12;

  const monthlyRate = annualReturn / 100 / 12;
  const months = years * 12;
  const factor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
  return monthlySIP * factor * (1 + monthlyRate);
}

/**
 * Step-up SIP: monthly contribution increases by stepUpPercent each year.
 */
export function calculateStepUpSIP(
  monthlySIP: number,
  annualReturn: number,
  years: number,
  stepUpPercent: number,
): number {
  if (monthlySIP <= 0 || years <= 0) return 0;

  const monthlyRate = annualReturn / 100 / 12;
  let corpus = 0;
  let currentMonthlySIP = monthlySIP;

  for (let year = 0; year < years; year++) {
    for (let month = 0; month < 12; month++) {
      corpus = corpus * (1 + monthlyRate) + currentMonthlySIP;
    }
    currentMonthlySIP *= 1 + stepUpPercent / 100;
  }

  return corpus;
}

/**
 * Inflation-adjusted (real) value in today's purchasing power.
 */
export function calculateInflationAdjustedValue(
  futureValue: number,
  inflationRate: number,
  years: number,
): number {
  if (years <= 0) return futureValue;
  return futureValue / Math.pow(1 + inflationRate / 100, years);
}

/**
 * Real CAGR = ((1 + nominal) / (1 + inflation)) - 1
 */
export function calculateRealCAGR(nominalReturn: number, inflationRate: number): number {
  const nominal = 1 + nominalReturn / 100;
  const inflation = 1 + inflationRate / 100;
  return (nominal / inflation - 1) * 100;
}

/**
 * LTCG tax on equity mutual funds.
 * Tax applies only on gains above exemption limit.
 */
export function calculateLTCGTax(
  corpus: number,
  totalInvested: number,
  exemptionLimit: number,
  taxRate: number,
): number {
  const gains = Math.max(0, corpus - totalInvested);
  const taxableGains = Math.max(0, gains - exemptionLimit);
  return taxableGains * (taxRate / 100);
}

/**
 * Post-tax wealth after LTCG deduction.
 */
export function calculatePostTaxWealth(corpus: number, ltcgTax: number): number {
  return Math.max(0, corpus - ltcgTax);
}

/**
 * Corpus needed so that post-tax wealth meets the target goal.
 * Solves: corpus - LTCG_tax(corpus) >= targetGoal
 */
export function calculateTaxAdjustedGoal(
  inflationAdjustedGoal: number,
  exemptionLimit: number,
  taxRate: number,
): number {
  const rate = taxRate / 100;

  // Binary search for required corpus
  let low = inflationAdjustedGoal;
  let high = inflationAdjustedGoal * 3;

  while (high - low > 1) {
    const mid = (low + high) / 2;
    // Assume gains ≈ corpus (conservative for goal planning)
    const gains = mid;
    const taxableGains = Math.max(0, gains - exemptionLimit);
    const tax = taxableGains * rate;
    const postTax = mid - tax;

    if (postTax >= inflationAdjustedGoal) {
      high = mid;
    } else {
      low = mid;
    }
  }

  return Math.ceil(high);
}

/**
 * Required monthly SIP to reach a target corpus (no step-up).
 */
export function calculateRequiredSIP(
  targetCorpus: number,
  annualReturn: number,
  years: number,
): number {
  if (targetCorpus <= 0 || years <= 0) return 0;
  if (annualReturn === 0) return targetCorpus / (years * 12);

  const monthlyRate = annualReturn / 100 / 12;
  const months = years * 12;
  const factor = ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  return targetCorpus / factor;
}

/**
 * Required monthly SIP with step-up to reach target corpus.
 * Uses binary search.
 */
export function calculateRequiredStepUpSIP(
  targetCorpus: number,
  annualReturn: number,
  years: number,
  stepUpPercent: number,
): number {
  if (targetCorpus <= 0 || years <= 0) return 0;

  let low = 0;
  let high = targetCorpus / (years * 12);

  for (let i = 0; i < 50; i++) {
    const mid = (low + high) / 2;
    const corpus = calculateStepUpSIP(mid, annualReturn, years, stepUpPercent);
    if (corpus >= targetCorpus) {
      high = mid;
    } else {
      low = mid;
    }
  }

  return Math.ceil(high);
}

/**
 * Year-wise growth breakdown for charts and insights.
 */
export function generateYearWiseGrowth(
  monthlySIP: number,
  annualReturn: number,
  years: number,
  stepUpPercent: number,
  inflationRate: number,
  ltcgTaxRate: number,
  exemptionLimit: number,
): YearWiseGrowth[] {
  const monthlyRate = annualReturn / 100 / 12;
  let corpus = 0;
  let totalInvested = 0;
  let currentMonthlySIP = monthlySIP;
  const data: YearWiseGrowth[] = [];

  for (let year = 1; year <= years; year++) {
    for (let month = 0; month < 12; month++) {
      corpus = corpus * (1 + monthlyRate) + currentMonthlySIP;
      totalInvested += currentMonthlySIP;
    }

    const returns = corpus - totalInvested;
    const inflationAdjustedCorpus = calculateInflationAdjustedValue(
      corpus,
      inflationRate,
      year,
    );
    const ltcgTax = calculateLTCGTax(
      corpus,
      totalInvested,
      exemptionLimit,
      ltcgTaxRate,
    );
    const postTaxCorpus = calculatePostTaxWealth(corpus, ltcgTax);

    data.push({
      year,
      invested: totalInvested,
      returns,
      corpus,
      monthlySIP: currentMonthlySIP,
      inflationAdjustedCorpus,
      postTaxCorpus,
    });

    currentMonthlySIP *= 1 + stepUpPercent / 100;
  }

  return data;
}

/**
 * Total invested amount for step-up SIP.
 */
export function calculateTotalInvestedStepUp(
  monthlySIP: number,
  years: number,
  stepUpPercent: number,
): number {
  let total = 0;
  let currentMonthlySIP = monthlySIP;

  for (let year = 0; year < years; year++) {
    total += currentMonthlySIP * 12;
    currentMonthlySIP *= 1 + stepUpPercent / 100;
  }

  return total;
}

/**
 * Complete SIP analysis combining all calculations.
 */
export function calculateSIPAnalysis(inputs: SIPInputs): SIPResult {
  const {
    monthlySIP,
    annualReturn,
    years,
    stepUpPercent,
    inflationRate,
    ltcgTaxRate,
    exemptionLimit,
  } = inputs;

  const futureCorpus =
    stepUpPercent > 0
      ? calculateStepUpSIP(monthlySIP, annualReturn, years, stepUpPercent)
      : calculateFutureValueSIP(monthlySIP, annualReturn, years);

  const totalInvested =
    stepUpPercent > 0
      ? calculateTotalInvestedStepUp(monthlySIP, years, stepUpPercent)
      : monthlySIP * years * 12;

  const wealthCreated = futureCorpus - totalInvested;
  const inflationAdjustedWealth = calculateInflationAdjustedValue(
    futureCorpus,
    inflationRate,
    years,
  );
  const ltcgTax = calculateLTCGTax(
    futureCorpus,
    totalInvested,
    exemptionLimit,
    ltcgTaxRate,
  );
  const postTaxWealth = calculatePostTaxWealth(futureCorpus, ltcgTax);
  const realCAGR = calculateRealCAGR(annualReturn, inflationRate);

  const yearWiseData = generateYearWiseGrowth(
    monthlySIP,
    annualReturn,
    years,
    stepUpPercent,
    inflationRate,
    ltcgTaxRate,
    exemptionLimit,
  );

  return {
    totalInvested,
    wealthCreated,
    futureCorpus,
    inflationAdjustedWealth,
    ltcgTax,
    postTaxWealth,
    realCAGR,
    yearWiseData,
  };
}

/**
 * Complete goal planning analysis.
 */
export function calculateGoalAnalysis(inputs: GoalInputs): GoalResult {
  const {
    goalAmountToday,
    years,
    annualReturn,
    inflationRate,
    stepUpPercent,
    ltcgTaxRate,
    exemptionLimit,
  } = inputs;

  const inflationAdjustedGoal = goalAmountToday * Math.pow(1 + inflationRate / 100, years);
  const taxAdjustedGoal = calculateTaxAdjustedGoal(
    inflationAdjustedGoal,
    exemptionLimit,
    ltcgTaxRate,
  );

  const requiredSIP =
    stepUpPercent > 0
      ? calculateRequiredStepUpSIP(taxAdjustedGoal, annualReturn, years, stepUpPercent)
      : calculateRequiredSIP(taxAdjustedGoal, annualReturn, years);

  const requiredSIPWithoutStepUp = calculateRequiredSIP(
    taxAdjustedGoal,
    annualReturn,
    years,
  );

  const savingsImprovement = requiredSIPWithoutStepUp - requiredSIP;

  const futureCorpus = calculateStepUpSIP(
    requiredSIP,
    annualReturn,
    years,
    stepUpPercent,
  );
  const totalInvested = calculateTotalInvestedStepUp(requiredSIP, years, stepUpPercent);

  return {
    inflationAdjustedGoal,
    taxAdjustedGoal,
    requiredSIP,
    requiredSIPWithoutStepUp,
    savingsImprovement,
    totalInvested,
    futureCorpus,
  };
}

/**
 * Generate dynamic educational insights from SIP results.
 */
export function generateInsights(
  result: SIPResult,
  inputs: SIPInputs,
): { id: string; title: string; description: string; type: 'positive' | 'warning' | 'info' }[] {
  const insights: {
    id: string;
    title: string;
    description: string;
    type: 'positive' | 'warning' | 'info';
  }[] = [];

  const wealthMultiplier = result.futureCorpus / result.totalInvested;
  insights.push({
    id: 'multiplier',
    title: `${wealthMultiplier.toFixed(1)}x Your Investment`,
    description: `Your wealth is ${wealthMultiplier.toFixed(1)}x your total investment of ₹${(result.totalInvested / 100000).toFixed(1)} Lakhs.`,
    type: 'positive',
  });

  const inflationReduction =
    ((result.futureCorpus - result.inflationAdjustedWealth) / result.futureCorpus) * 100;
  insights.push({
    id: 'inflation',
    title: `Inflation Impact: ${inflationReduction.toFixed(0)}%`,
    description: `Inflation at ${inputs.inflationRate}% reduced your purchasing power. Real value is ₹${(result.inflationAdjustedWealth / 100000).toFixed(1)} Lakhs.`,
    type: 'warning',
  });

  if (inputs.stepUpPercent > 0) {
    const withoutStepUp = calculateFutureValueSIP(
      inputs.monthlySIP,
      inputs.annualReturn,
      inputs.years,
    );
    const stepUpBenefit = result.futureCorpus - withoutStepUp;
    if (stepUpBenefit > 0) {
      insights.push({
        id: 'stepup',
        title: `Step-Up Added ₹${(stepUpBenefit / 100000).toFixed(1)} Lakhs`,
        description: `A ${inputs.stepUpPercent}% annual step-up increased your corpus significantly over flat SIP.`,
        type: 'positive',
      });
    }
  }

  const taxImpact = (result.ltcgTax / result.futureCorpus) * 100;
  insights.push({
    id: 'tax',
    title: `LTCG Tax: ₹${(result.ltcgTax / 100000).toFixed(1)} Lakhs`,
    description: `Tax takes ${taxImpact.toFixed(1)}% of your corpus. Post-tax wealth: ₹${(result.postTaxWealth / 100000).toFixed(1)} Lakhs.`,
    type: 'warning',
  });

  insights.push({
    id: 'real-cagr',
    title: `Real CAGR: ${result.realCAGR.toFixed(1)}%`,
    description: `After adjusting for ${inputs.inflationRate}% inflation, your real return is ${result.realCAGR.toFixed(1)}% — not ${inputs.annualReturn}%.`,
    type: 'info',
  });

  const compoundingShare = (result.wealthCreated / result.futureCorpus) * 100;
  insights.push({
    id: 'compounding',
    title: `${compoundingShare.toFixed(0)}% from Compounding`,
    description: `₹${(result.wealthCreated / 100000).toFixed(1)} Lakhs of your corpus came from compounding returns, not your pocket.`,
    type: 'positive',
  });

  return insights;
}
