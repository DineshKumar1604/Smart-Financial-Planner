import type { GoalPreset } from '@/types';

export const SITE_CONFIG = {
  name: 'Smart SIP Planner',
  tagline: 'Build Wealth. Beat Inflation. Reach Your Goals.',
  description:
    'Advanced SIP calculator with inflation adjustment, LTCG tax estimation, step-up SIP planning and goal planning.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smart-sip-planner.vercel.app',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
};

export const DEFAULT_SIP_INPUTS = {
  monthlySIP: 5000,
  annualReturn: 12,
  years: 20,
  stepUpPercent: 10,
  inflationRate: 6,
  ltcgTaxRate: 12.5,
  exemptionLimit: 125000,
};

export const GOAL_PRESETS: GoalPreset[] = [
  { type: 'bike', label: 'Bike', icon: 'Bike', defaultAmount: 150000, defaultYears: 3 },
  { type: 'car', label: 'Car', icon: 'Car', defaultAmount: 800000, defaultYears: 5 },
  { type: 'house', label: 'House', icon: 'Home', defaultAmount: 5000000, defaultYears: 10 },
  {
    type: 'education',
    label: 'Education',
    icon: 'GraduationCap',
    defaultAmount: 2000000,
    defaultYears: 8,
  },
  {
    type: 'marriage',
    label: 'Marriage',
    icon: 'Heart',
    defaultAmount: 1500000,
    defaultYears: 5,
  },
  {
    type: 'vacation',
    label: 'Vacation',
    icon: 'Plane',
    defaultAmount: 300000,
    defaultYears: 2,
  },
  { type: 'custom', label: 'Custom Goal', icon: 'Target', defaultAmount: 1000000, defaultYears: 5 },
];

export const NAV_LINKS = [
  { href: '/wealth', label: 'Wealth Calculator' },
  { href: '/goal', label: 'Goal Planner' },
  { href: '/simulator', label: 'What-If Simulator' },
  { href: '/about', label: 'Learn' },
];

export const COMING_SOON_FEATURES = [
  { href: '/retirement', label: 'Retirement Planner', description: 'Plan your golden years with confidence.' },
  { href: '/fire', label: 'FIRE Calculator', description: 'Calculate your path to Financial Independence.' },
  { href: '/swp', label: 'SWP Calculator', description: 'Systematic Withdrawal Plan simulator.' },
  { href: '/lumpsum', label: 'Lumpsum Calculator', description: 'One-time investment growth estimator.' },
  { href: '/net-worth', label: 'Net Worth Tracker', description: 'Track and visualize your total wealth.' },
  {
    href: '/mutual-funds',
    label: 'Mutual Fund Comparison',
    description: 'Compare funds side by side.',
  },
];

export const EDUCATION_TOPICS = [
  {
    id: 'sip',
    title: 'What is SIP?',
    summary:
      'Systematic Investment Plan (SIP) is a disciplined way to invest a fixed amount regularly in mutual funds.',
    example: '₹5,000/month for 20 years at 12% can create significant wealth through compounding.',
  },
  {
    id: 'compounding',
    title: 'How Compounding Works',
    summary:
      'Compounding means earning returns on your returns. The longer you stay invested, the more powerful it becomes.',
    example: 'Year 1: ₹60K invested → Year 20: Returns exceed total investment by 3-4x.',
  },
  {
    id: 'inflation',
    title: 'What Inflation Does',
    summary:
      'Inflation erodes purchasing power. ₹1 Crore today won\'t buy the same things 20 years from now.',
    example: 'At 6% inflation, ₹1 Crore in 20 years has the buying power of only ₹31 Lakhs today.',
  },
  {
    id: 'ltcg',
    title: 'What is LTCG Tax?',
    summary:
      'Long-Term Capital Gains tax applies on profits from equity investments held over 1 year.',
    example: 'On ₹50L corpus with ₹30L gains, LTCG tax reduces your take-home wealth significantly.',
  },
  {
    id: 'stepup',
    title: 'What is Step-Up SIP?',
    summary:
      'Step-Up SIP increases your monthly investment annually, accelerating wealth creation as income grows.',
    example: 'A 10% annual step-up can add ₹20-30 Lakhs to your corpus over 20 years.',
  },
  {
    id: 'real-wealth',
    title: 'Why Real Wealth Matters',
    summary:
      'Nominal wealth is misleading. Real wealth = post-tax, inflation-adjusted purchasing power.',
    example: '₹1 Crore nominal might be only ₹25 Lakhs in real, post-tax terms.',
  },
];
