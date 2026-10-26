import { AppIcon } from "@/components/app-icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PERIODS } from "@/lib/dashboard-data";

export function PeriodSelect() {
  return (
    <Select items={PERIODS} defaultValue={PERIODS[0].value}>
      <SelectTrigger aria-label="Periode" className="min-w-40">
        <AppIcon name="calendar" className="text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {PERIODS.map((period) => (
          <SelectItem key={period.value} value={period.value}>
            {period.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
