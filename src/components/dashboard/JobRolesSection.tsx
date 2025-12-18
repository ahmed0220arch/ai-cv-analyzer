import { Briefcase, TrendingUp, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface JobRole {
  title: string;
  match: number;
  industry: string;
}

interface JobRolesSectionProps {
  roles: JobRole[];
  className?: string;
}

export function JobRolesSection({ roles, className }: JobRolesSectionProps) {
  const getMatchColor = (match: number) => {
    if (match >= 80) return "text-success bg-success/10";
    if (match >= 60) return "text-primary bg-primary/10";
    return "text-warning bg-warning/10";
  };

  return (
    <div className={cn("glass-card rounded-2xl p-6 hover-lift", className)}>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Briefcase className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Suggested Job Roles</h3>
      </div>
      <div className="space-y-3">
        {roles.map((role, index) => (
          <div
            key={index}
            className="group flex items-center justify-between rounded-xl border border-border/50 bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-soft"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Building2 className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">{role.title}</p>
                <p className="text-sm text-muted-foreground">{role.industry}</p>
              </div>
            </div>
            <Badge className={cn("font-semibold", getMatchColor(role.match))}>
              <TrendingUp className="mr-1 h-3 w-3" />
              {role.match}% Match
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
