export interface SIPInputs {
  monthlySIP: number;
  annualReturn: number;
  years: number;
  stepUpPercent: number;
  inflationRate: number;
  ltcgTaxRate: number;
  exemptionLimit: number;
}

export interface SIPResult {
  totalInvested: number;
  wealthCreated: number;
  futureCorpus: number;
  inflationAdjustedWealth: number;
  ltcgTax: number;
  postTaxWealth: number;
  realCAGR: number;
  yearWiseData: YearWiseGrowth[];
}

export interface YearWiseGrowth {
  year: number;
  invested: number;
  returns: number;
  corpus: number;
  monthlySIP: number;
  inflationAdjustedCorpus: number;
  postTaxCorpus: number;
}

export interface GoalInputs {
  goalAmountToday: number;
  years: number;
  annualReturn: number;
  inflationRate: number;
  stepUpPercent: number;
  ltcgTaxRate: number;
  exemptionLimit: number;
}

export interface GoalResult {
  inflationAdjustedGoal: number;
  taxAdjustedGoal: number;
  requiredSIP: number;
  requiredSIPWithoutStepUp: number;
  savingsImprovement: number;
  totalInvested: number;
  futureCorpus: number;
}

export type GoalType =
  | 'bike'
  | 'car'
  | 'house'
  | 'education'
  | 'marriage'
  | 'vacation'
  | 'custom';

export interface GoalPreset {
  type: GoalType;
  label: string;
  icon: string;
  defaultAmount: number;
  defaultYears: number;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'positive' | 'warning' | 'info';
}
