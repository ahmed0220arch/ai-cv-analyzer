import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface SkillData {
  skill: string;
  score: number;
}

interface SkillsRadarChartProps {
  data: SkillData[];
  className?: string;
}

export function SkillsRadarChart({ data, className }: SkillsRadarChartProps) {
  return (
    <div className={cn("glass-card rounded-2xl p-6 hover-lift", className)}>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        <h3 className="text-lg font-semibold text-foreground">Skills Overview</h3>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid 
              stroke="hsl(var(--border))"
              strokeDasharray="3 3"
            />
            <PolarAngleAxis 
              dataKey="skill"
              tick={{ 
                fill: "hsl(var(--muted-foreground))",
                fontSize: 12,
                fontWeight: 500
              }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              axisLine={false}
            />
            <Radar
              name="Skills"
              dataKey="score"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
