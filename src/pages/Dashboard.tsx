import { useEffect, useMemo, useState } from "react";
import { PenLine, Download, ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ScoreCard } from "@/components/dashboard/ScoreCard";
import { SkillsSection } from "@/components/dashboard/SkillsSection";
import { StrengthsWeaknesses } from "@/components/dashboard/StrengthsWeaknesses";
import { JobRolesSection } from "@/components/dashboard/JobRolesSection";
import { SkillsRadarChart } from "@/components/dashboard/SkillsRadarChart";
import { Button } from "@/components/ui/button";

type AnalysisResult = {
  id?: number;
  created_at?: string;
  ats_score: number;
  skills: string[];
  strengths: string[];
  gaps: string[];
  recommended_roles: string[];
  summary_rewrite: string;
};

const deriveRadarData = (skills: string[]) => {
  const buckets = [
    { label: "Backend", keywords: ["Python", "Java", "FastAPI", "Spring", "SQL", "REST", "JWT"] },
    { label: "Frontend", keywords: ["React", "Angular", "TypeScript"] },
    { label: "Data", keywords: ["Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", "SQL"] },
    { label: "Cloud / DevOps", keywords: ["Docker", "AWS", "Azure", "Linux", "Git"] },
    { label: "APIs", keywords: ["REST", "JWT"] },
  ];

  const lower = skills.map((s) => s.toLowerCase());

  return buckets.map(({ label, keywords }) => {
    const hits = keywords.filter((k) => lower.includes(k.toLowerCase())).length;
    const score = Math.min(100, Math.max(20, Math.round((hits / keywords.length) * 100)));
    return { skill: label, score };
  });
};

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const locationState = (location.state as { analysis?: AnalysisResult } | null) ?? null;
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(locationState?.analysis ?? null);

  useEffect(() => {
    if (locationState?.analysis) {
      setAnalysis(locationState.analysis);
      localStorage.setItem("latestAnalysis", JSON.stringify(locationState.analysis));
      return;
    }

    const stored = localStorage.getItem("latestAnalysis");
    if (stored) {
      try {
        setAnalysis(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse stored analysis", error);
        localStorage.removeItem("latestAnalysis");
      }
    }
  }, [locationState]);

  const roles = useMemo(() => {
    if (!analysis?.recommended_roles) return [];
    const baseMatch = 90;
    return analysis.recommended_roles.map((title, index) => ({
      title,
      match: Math.max(60, baseMatch - index * 5),
      industry: "Suggested role",
    }));
  }, [analysis?.recommended_roles]);

  const radarData = useMemo(() => deriveRadarData(analysis?.skills ?? []), [analysis?.skills]);

  if (!analysis) {
    return (
      <DashboardLayout>
        <div className="flex h-full flex-col items-center justify-center gap-4 py-20 text-center">
          <div className="text-2xl font-semibold text-foreground">No analysis yet</div>
          <p className="max-w-md text-muted-foreground">
            Upload a CV to run an analysis and see your ATS score, strengths, gaps, recommended roles, and rewritten summary.
          </p>
          <Button onClick={() => navigate("/upload")}>Upload a CV</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analysis Results</h1>
            <p className="mt-1 text-muted-foreground">
              Here's what our AI found in your CV
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="glass">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button
              variant="hero"
              onClick={() => navigator.clipboard?.writeText(analysis.summary_rewrite).catch(() => {})}
            >
              <PenLine className="mr-2 h-4 w-4" />
              Copy Summary Rewrite
            </Button>
          </div>
        </div>

        {/* Score and Chart Row */}
        <div className="grid gap-6 lg:grid-cols-2 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <ScoreCard score={analysis.ats_score} />
          <SkillsRadarChart data={radarData} />
        </div>

        {/* Summary rewrite */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <div className="glass-card rounded-2xl p-6 hover-lift">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <ArrowRight className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Rewritten Summary</h3>
            </div>
            <p className="text-sm leading-6 text-foreground/80 whitespace-pre-line">{analysis.summary_rewrite}</p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <SkillsSection skills={analysis.skills} />
        </div>

        {/* Strengths & Weaknesses */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <StrengthsWeaknesses
            strengths={analysis.strengths}
            weaknesses={analysis.gaps}
          />
        </div>

        {/* Job Roles */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <JobRolesSection roles={roles} />
        </div>
      </div>
    </DashboardLayout>
  );
}
