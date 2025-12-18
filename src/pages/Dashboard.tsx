import { PenLine, Download } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ScoreCard } from "@/components/dashboard/ScoreCard";
import { SkillsSection } from "@/components/dashboard/SkillsSection";
import { StrengthsWeaknesses } from "@/components/dashboard/StrengthsWeaknesses";
import { JobRolesSection } from "@/components/dashboard/JobRolesSection";
import { SkillsRadarChart } from "@/components/dashboard/SkillsRadarChart";
import { Button } from "@/components/ui/button";

// Mock data - would come from API in production
const mockData = {
  score: 78,
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "SQL",
    "Git",
    "Agile",
    "REST APIs",
  ],
  strengths: [
    "Strong technical skills in modern web technologies",
    "Demonstrated experience with cloud platforms",
    "Clear and quantified achievements in work history",
    "Good educational background with relevant certifications",
  ],
  weaknesses: [
    "Summary section could be more impactful",
    "Missing keywords for senior-level positions",
    "Work experience descriptions lack action verbs",
    "Could benefit from more project portfolio links",
  ],
  jobRoles: [
    { title: "Senior Frontend Developer", match: 92, industry: "Technology" },
    { title: "Full Stack Engineer", match: 85, industry: "Software" },
    { title: "React Developer", match: 88, industry: "Web Development" },
    { title: "Technical Lead", match: 72, industry: "Engineering" },
  ],
  skillsRadar: [
    { skill: "Frontend", score: 90 },
    { skill: "Backend", score: 75 },
    { skill: "DevOps", score: 65 },
    { skill: "Database", score: 70 },
    { skill: "Soft Skills", score: 80 },
    { skill: "Leadership", score: 60 },
  ],
};

export default function Dashboard() {
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
            <Button variant="hero">
              <PenLine className="mr-2 h-4 w-4" />
              Rewrite CV Summary
            </Button>
          </div>
        </div>

        {/* Score and Chart Row */}
        <div className="grid gap-6 lg:grid-cols-2 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <ScoreCard score={mockData.score} />
          <SkillsRadarChart data={mockData.skillsRadar} />
        </div>

        {/* Skills Section */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <SkillsSection skills={mockData.skills} />
        </div>

        {/* Strengths & Weaknesses */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <StrengthsWeaknesses
            strengths={mockData.strengths}
            weaknesses={mockData.weaknesses}
          />
        </div>

        {/* Job Roles */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <JobRolesSection roles={mockData.jobRoles} />
        </div>
      </div>
    </DashboardLayout>
  );
}
