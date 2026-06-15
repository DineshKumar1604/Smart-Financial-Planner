'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Calculator,
  Home,
  SlidersHorizontal,
  Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const mobileLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/wealth', label: 'Wealth', icon: Calculator },
  { href: '/goal', label: 'Goals', icon: Target },
  { href: '/simulator', label: 'Simulator', icon: SlidersHorizontal },
  { href: '/about', label: 'Learn', icon: BookOpen },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-xl md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {mobileLinks.map((link) => {
          const Icon = link.icon;
          const isActive =
            link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground',
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
