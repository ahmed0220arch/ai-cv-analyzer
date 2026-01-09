import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, FileText, Zap, Shield } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CVDropzone } from "@/components/upload/CVDropzone";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { icon: FileText, label: "Upload CV", description: "PDF or TXT format" },
  { icon: Zap, label: "AI Analysis", description: "Instant processing" },
  { icon: Shield, label: "Get Results", description: "Detailed insights" },
];

export default function Upload() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({ title: "No file selected", description: "Please upload a CV before analyzing.", variant: "destructive" });
      return;
    }

    setAnalyzeError(null);
    setIsAnalyzing(true);

    try {
      const text = await file.text();

      if (!text.trim()) {
        throw new Error("Could not read CV text. Please upload a TXT file or try a different PDF.");
      }

      const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Analysis failed");
      }

      const data = await response.json();

      // Persist for dashboard rendering and refresh resilience
      localStorage.setItem("latestAnalysis", JSON.stringify(data));

      navigate("/dashboard", { state: { analysis: data, source: "upload" } });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to analyze CV";
      setAnalyzeError(message);
      toast({ title: "Analysis failed", description: message, variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center animate-fade-in-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Step 1 of 3
          </div>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Upload Your CV
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Upload your resume to get AI-powered insights and recommendations
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-8 flex items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {steps.map((step, index) => (
            <div key={step.label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                  index === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="mt-2 text-sm font-medium text-foreground">{step.label}</span>
                <span className="text-xs text-muted-foreground">{step.description}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="mx-4 h-px w-12 bg-border" />
              )}
            </div>
          ))}
        </div>

        {/* Dropzone */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <CVDropzone onFileSelect={handleFileSelect} />
        </div>

        {analyzeError && (
          <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            {analyzeError}
          </div>
        )}

        {/* Analyze Button */}
        <div className="mt-8 flex justify-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <Button
            variant="hero"
            size="xl"
            disabled={!file || isAnalyzing}
            onClick={handleAnalyze}
            className="group min-w-[200px]"
          >
            {isAnalyzing ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Analyzing...
              </>
            ) : (
              <>
                Analyze CV
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </div>

        {/* Helper Text */}
        <div className="mt-8 rounded-xl bg-muted/50 p-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <h3 className="font-semibold text-foreground">What happens next?</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Our AI will analyze your CV structure and content
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              You'll receive an ATS compatibility score
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Get personalized job role recommendations
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Discover strengths and areas for improvement
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
