import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EducationalCardProps {
  title: string;
  description: string;
  example?: string;
  className?: string;
}

export function EducationalCard({
  title,
  description,
  example,
  className,
}: EducationalCardProps) {
  return (
    <Card className={cn('border-brand/20', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{description}</p>
        {example && (
          <p className="rounded-lg bg-accent/50 px-3 py-2 text-sm font-medium text-accent-foreground">
            Example: {example}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
