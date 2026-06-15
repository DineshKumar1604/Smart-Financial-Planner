import Link from 'next/link';
import { Github, Linkedin, TrendingUp } from 'lucide-react';
import { COMING_SOON_FEATURES, SITE_CONFIG } from '@/constants';

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <TrendingUp className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
              </div>
              {SITE_CONFIG.name}
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              {SITE_CONFIG.tagline} Advanced SIP calculator with inflation adjustment, LTCG tax
              estimation, and goal planning.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={SITE_CONFIG.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/wealth" className="hover:text-foreground">
                  Wealth Calculator
                </Link>
              </li>
              <li>
                <Link href="/goal" className="hover:text-foreground">
                  Goal Planner
                </Link>
              </li>
              <li>
                <Link href="/simulator" className="hover:text-foreground">
                  What-If Simulator
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground">
                  Learn
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Coming Soon</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {COMING_SOON_FEATURES.slice(0, 4).map((feature) => (
                <li key={feature.href}>
                  <Link href={feature.href} className="hover:text-foreground">
                    {feature.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/about" className="hover:text-foreground">
              About
            </Link>
            <span>Disclaimer: For educational purposes only. Not financial advice.</span>
            <span>Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
