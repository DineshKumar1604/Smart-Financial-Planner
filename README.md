# Smart SIP Planner


**Build Wealth. Beat Inflation. Reach Your Goals.**

Advanced SIP calculator with inflation adjustment, LTCG tax estimation, step-up SIP planning, and goal-based investment planning. Built for Indian investors who want the complete picture — not misleading headline numbers.

![Smart SIP Planner](public/og-image.png)

## Features

- **SIP Wealth Calculator** — Future corpus with step-up SIP, inflation adjustment, and LTCG tax
- **Goal Planner** — Calculate required monthly SIP for bike, car, house, education, and custom goals
- **What-If Simulator** — Interactive sliders for return, inflation, step-up, and tenure
- **Educational Hub** — Learn SIP, compounding, inflation, LTCG tax, CAGR, and real returns
- **Dynamic Insights** — Personalized wealth insights based on your inputs
- **Rich Charts** — Wealth growth, invested vs returns, inflation impact, post-tax breakdown
- **Dark Mode** — System-aware theme with manual toggle
- **Responsive Design** — Mobile bottom navigation, sticky navbar, touch-friendly sliders
- **SEO Optimized** — Metadata, OpenGraph, sitemap, robots.txt

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | App Router, Server Components, SEO |
| TypeScript | Type-safe financial calculations |
| Tailwind CSS | Utility-first styling |
| ShadCN UI | Accessible component primitives |
| Recharts | Interactive financial charts |
| Framer Motion | Landing page animations |
| Lucide React | Icon system |
| next-themes | Dark mode support |

## Getting Started

### Prerequisites

- Node.js 22 LTS
- npm or yarn

### Installation

```bash
git clone <your-repo-url>
cd smart-sip-planner
npm install
```

### Development
=======
Build Wealth. Beat Inflation. Reach Your Goals.

Smart SIP Planner is a modern financial planning platform built using Next.js, TypeScript, Tailwind CSS, and Recharts. Unlike traditional SIP calculators, it helps users understand the real impact of inflation, taxation, and compounding on long-term investments.

## Features

### SIP Wealth Calculator

* Calculate future SIP corpus
* Step-Up SIP support
* Year-wise growth analysis
* Compounding visualization

### Inflation Analysis

* Inflation-adjusted wealth calculations
* Purchasing power comparison
* Real wealth estimation

### LTCG Tax Estimator

* Long Term Capital Gains tax calculation
* Post-tax wealth analysis
* Tax impact visualization

### Goal Planner

* Goal-based investment planning
* Required SIP calculation
* Inflation-adjusted goal forecasting

### What-If Simulator

* Adjust expected returns
* Modify inflation assumptions
* Test different SIP amounts
* Explore Step-Up SIP scenarios

### Educational Insights

* Learn about SIP investing
* Understand compounding
* Inflation awareness
* Tax impact explanations

---

## Tech Stack

### Frontend

* Next.js 15
* React
* TypeScript

### UI

* Tailwind CSS
* ShadCN UI
* Lucide Icons
* Framer Motion

### Data Visualization

* Recharts

### Deployment

* Vercel

---

## Project Structure

```text
app/
components/
lib/
hooks/
types/
public/
```

---


Install dependencies:

```bash
npm install
```

Run development server:
>>>>>>> bf32b1fac01877efab7e941848de6f53f9ba4663

```bash
npm run dev
```

<<<<<<< HEAD
**WEBSITE:
**Open https://smart-financial-planner-gamma.vercel.app/wealth

### Build

```bash
npm run build
npm start
```

### Lint & Format

```bash
npm run lint
npm run format
```

## Project Structure

```
app/
  (main)/           # Route group — pages
    page.tsx        # Landing page
    wealth/         # SIP Wealth Calculator
    goal/           # Goal Planner
    simulator/      # What-If Simulator
    about/          # Education hub
    retirement/     # Coming soon
    fire/           # Coming soon
    ...
  layout.tsx        # Root layout
  globals.css       # Theme variables
  sitemap.ts
  robots.ts
components/
  ui/               # ShadCN primitives
  layout/           # Navbar, footer, theme
  landing/          # Landing sections
  wealth/           # Calculator components
  charts/           # Recharts (dynamic import)
lib/
  calculations.ts   # Financial engine
  utils.ts          # Formatting helpers
types/              # TypeScript interfaces
constants/          # Config, presets, nav links
hooks/              # useMounted, useDebounce
```

## Deployment (Vercel)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Login with GitHub
3. Import repository → Deploy
4. Set environment variable (optional):
   - `NEXT_PUBLIC_SITE_URL` = your production URL

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Financial Calculations

All calculations live in `lib/calculations.ts`:

| Function | Description |
|---|---|
| `calculateFutureValueSIP` | Standard SIP future value |
| `calculateStepUpSIP` | SIP with annual step-up |
| `calculateInflationAdjustedValue` | Real purchasing power |
| `calculateRealCAGR` | Inflation-adjusted return |
| `calculateLTCGTax` | Long-term capital gains tax |
| `calculatePostTaxWealth` | Corpus after tax |
| `generateYearWiseGrowth` | Year-by-year breakdown |
| `calculateGoalAnalysis` | Goal-based SIP requirement |

## Screenshots

> Add screenshots after deployment:
> - Landing page hero
> - Wealth calculator with charts
> - Goal planner journey
> - What-if simulator
> - Dark mode view

## Disclaimer

For educational purposes only. Not financial advice. Consult a SEBI-registered advisor before investing. Tax rules subject to change.

## License

MIT

## Resume

**Smart SIP Planner – Advanced Financial Planning Dashboard**

Built a production-ready financial planning platform using Next.js, TypeScript, Tailwind CSS, ShadCN UI, and Recharts. Features include SIP wealth forecasting, goal-based investment planning, inflation-adjusted purchasing power analysis, LTCG tax estimation, interactive simulations, responsive dashboards, and modern data visualizations. Deployed on Vercel with a scalable component-based architecture.
=======
Open:

```text
http://localhost:3000
```

---

## Build

```bash
npm run build
```

---

## Deployment

The application is optimized for deployment on Vercel.

```bash
npm run build
```

Push to GitHub and import the repository into Vercel.

---

## Future Enhancements

* Retirement Planner
* FIRE Calculator
* SWP Calculator
* Lumpsum Calculator
* Net Worth Tracker
* Mutual Fund Comparison
* Portfolio Analytics
* AI Financial Assistant

---

## Disclaimer

This project is intended for educational and informational purposes only. Investment returns are not guaranteed and should not be considered financial advice.

---

## Author

Dinesh Kumar

Final Year Engineering Student

Passionate about Financial Technology, Web Development, Data Science, and AI.
>>>>>>> bf32b1fac01877efab7e941848de6f53f9ba4663
