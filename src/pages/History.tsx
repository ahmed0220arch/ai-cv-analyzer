import { Link } from "react-router-dom";
import { FileText, Calendar, TrendingUp, ChevronRight, Clock } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

// Mock history data
const historyData = [
  {
    id: 1,
    filename: "resume_v3_final.pdf",
    date: "2024-01-15",
    score: 78,
    preview: "Senior Frontend Developer with 5+ years of experience...",
  },
  {
    id: 2,
    filename: "resume_v2.pdf",
    date: "2024-01-10",
    score: 65,
    preview: "Frontend Developer with experience in React and TypeScript...",
  },
  {
    id: 3,
    filename: "resume_v1.pdf",
    date: "2024-01-05",
    score: 52,
    preview: "Web Developer seeking opportunities in tech industry...",
  },
];

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-success bg-success/10";
  if (score >= 60) return "text-primary bg-primary/10";
  if (score >= 40) return "text-warning bg-warning/10";
  return "text-destructive bg-destructive/10";
};

export default function History() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-foreground">Analysis History</h1>
          <p className="mt-2 text-muted-foreground">
            View and compare your previous CV analyses
          </p>
        </div>

        {/* History List */}
        {historyData.length > 0 ? (
          <div className="space-y-4">
            {historyData.map((item, index) => (
              <Link
                key={item.id}
                to="/dashboard"
                className="block animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="glass-card group rounded-2xl p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-soft-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {item.filename}
                        </h3>
                        <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(item.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold",
                        getScoreColor(item.score)
                      )}>
                        <TrendingUp className="h-4 w-4" />
                        {item.score}/100
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                    {item.preview}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="glass-card rounded-2xl p-12 text-center animate-fade-in-up">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-foreground">
              No analyses yet
            </h3>
            <p className="mt-2 text-muted-foreground">
              Upload your first CV to start tracking your progress
            </p>
            <Link to="/upload" className="mt-6 inline-block">
              <button className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                Upload CV
              </button>
            </Link>
          </div>
        )}

        {/* Progress Summary */}
        {historyData.length > 1 && (
          <div className="mt-8 glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <h3 className="font-semibold text-foreground">Progress Overview</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your ATS score has improved by{" "}
              <span className="font-semibold text-success">
                +{historyData[0].score - historyData[historyData.length - 1].score} points
              </span>{" "}
              since your first analysis. Keep optimizing!
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
