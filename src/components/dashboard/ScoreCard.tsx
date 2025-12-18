import { cn } from "@/lib/utils";

interface ScoreCardProps {
  score: number;
  label?: string;
  className?: string;
}

export function ScoreCard({ score, label = "ATS Score", className }: ScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-warning";
    return "text-destructive";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-success/20 to-success/5";
    if (score >= 60) return "from-primary/20 to-primary/5";
    if (score >= 40) return "from-warning/20 to-warning/5";
    return "from-destructive/20 to-destructive/5";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Work";
  };

  return (
    <div className={cn("glass-card rounded-2xl p-8 hover-lift", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={cn("text-6xl font-bold tracking-tight", getScoreColor(score))}>
              {score}
            </span>
            <span className="text-2xl font-semibold text-muted-foreground">/100</span>
          </div>
          <p className={cn("mt-2 text-sm font-medium", getScoreColor(score))}>
            {getScoreLabel(score)}
          </p>
        </div>
        
        {/* Circular Progress */}
        <div className="relative h-32 w-32">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${score * 2.51} 251`}
              className={cn("transition-all duration-1000 ease-out", getScoreColor(score))}
            />
          </svg>
          <div className={cn(
            "absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br",
            getScoreGradient(score)
          )}>
            <span className={cn("text-lg font-bold", getScoreColor(score))}>
              {score}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
