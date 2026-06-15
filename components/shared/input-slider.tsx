import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { InfoTooltip } from '@/components/shared/info-tooltip';
import { cn, formatCurrency, formatPercent } from '@/lib/utils';

interface InputSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: 'currency' | 'percent' | 'years' | 'number';
  tooltip?: string;
  className?: string;
}

export function InputSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = 'number',
  tooltip,
  className,
}: InputSliderProps) {
  const formatValue = (v: number) => {
    switch (unit) {
      case 'currency':
        return formatCurrency(v);
      case 'percent':
        return formatPercent(v);
      case 'years':
        return `${v} ${v === 1 ? 'year' : 'years'}`;
      default:
        return String(v);
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Label htmlFor={`slider-${label}`}>{label}</Label>
          {tooltip && <InfoTooltip content={tooltip} />}
        </div>
        <div className="flex items-center gap-2">
          <Input
            id={`slider-${label}`}
            type="number"
            value={value}
            onChange={(e) => {
              const num = Number(e.target.value);
              if (!isNaN(num)) onChange(Math.min(max, Math.max(min, num)));
            }}
            className="h-8 w-24 text-right text-sm"
            min={min}
            max={max}
            step={step}
            aria-label={label}
          />
          {unit === 'percent' && (
            <span className="text-sm text-muted-foreground">%</span>
          )}
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
        aria-label={label}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatValue(min)}</span>
        <span className="font-medium text-foreground">{formatValue(value)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}
