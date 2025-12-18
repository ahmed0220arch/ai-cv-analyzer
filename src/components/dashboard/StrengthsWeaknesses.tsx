import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StrengthsWeaknessesProps {
  strengths: string[];
  weaknesses: string[];
  className?: string;
}

export function StrengthsWeaknesses({ strengths, weaknesses, className }: StrengthsWeaknessesProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2", className)}>
      {/* Strengths */}
      <div className="glass-card rounded-2xl p-6 hover-lift">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
            <CheckCircle2 className="h-5 w-5 text-success" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Strengths</h3>
        </div>
        <ul className="space-y-3">
          {strengths.map((strength, index) => (
            <li
              key={index}
              className="flex items-start gap-3 rounded-lg bg-success/5 p-3 transition-colors hover:bg-success/10"
            >
              <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-success flex-shrink-0" />
              <span className="text-sm text-foreground/80">{strength}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className="glass-card rounded-2xl p-6 hover-lift">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10">
            <AlertCircle className="h-5 w-5 text-warning" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Areas to Improve</h3>
        </div>
        <ul className="space-y-3">
          {weaknesses.map((weakness, index) => (
            <li
              key={index}
              className="flex items-start gap-3 rounded-lg bg-warning/5 p-3 transition-colors hover:bg-warning/10"
            >
              <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-warning flex-shrink-0" />
              <span className="text-sm text-foreground/80">{weakness}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
