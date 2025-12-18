import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SkillsSectionProps {
  skills: string[];
  className?: string;
}

const skillColors = [
  "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
  "bg-success/10 text-success border-success/20 hover:bg-success/20",
  "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20",
  "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20",
];

export function SkillsSection({ skills, className }: SkillsSectionProps) {
  return (
    <div className={cn("glass-card rounded-2xl p-6 hover-lift", className)}>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        <h3 className="text-lg font-semibold text-foreground">Detected Skills</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge
            key={skill}
            variant="outline"
            className={cn(
              "px-3 py-1.5 text-sm font-medium transition-all duration-200 cursor-default",
              skillColors[index % skillColors.length]
            )}
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}
