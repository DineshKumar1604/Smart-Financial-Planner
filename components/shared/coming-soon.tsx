import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface ComingSoonProps {
  title: string;
  description: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      <Card className="text-center">
        <CardContent className="py-16">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Clock className="h-8 w-8 text-primary" aria-hidden="true" />
          </div>
          <Badge variant="secondary" className="mb-4">
            Coming Soon
          </Badge>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-3 text-muted-foreground">{description}</p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild>
              <Link href="/wealth">Try Wealth Calculator</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/goal">Try Goal Planner</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
