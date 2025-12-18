import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Target, TrendingUp, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Target,
    title: "ATS Score Analysis",
    description: "Get a detailed score showing how well your CV performs against Applicant Tracking Systems.",
  },
  {
    icon: TrendingUp,
    title: "Skills Detection",
    description: "AI identifies and categorizes your skills to highlight your strongest competencies.",
  },
  {
    icon: Shield,
    title: "Job Matching",
    description: "Receive personalized job role suggestions based on your experience and skills.",
  },
];

const benefits = [
  "Instant AI-powered analysis",
  "Actionable improvement tips",
  "Industry-specific recommendations",
  "Track your progress over time",
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl" />
        </div>

        <nav className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CV Analyzer</span>
          </div>
          <Link to="/upload">
            <Button variant="outline" className="hidden sm:inline-flex">
              Get Started
            </Button>
          </Link>
        </nav>

        <div className="container py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="animate-fade-in-up">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                AI-Powered Resume Analysis
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Land Your Dream Job with an{" "}
                <span className="gradient-text">Optimized CV</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
                Upload your CV and get instant AI-powered insights. Improve your ATS score, 
                discover your strengths, and find job roles that match your skills.
              </p>
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/upload">
                <Button variant="hero" size="xl" className="group">
                  Upload Your CV
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="glass" size="xl">
                  View Demo Dashboard
                </Button>
              </Link>
            </div>

            {/* Benefits list */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-success" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="border-t border-border/50 bg-muted/30 py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Everything you need to succeed
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our AI analyzes your CV against industry standards and provides actionable insights.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card rounded-2xl p-8 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-sidebar p-12 md:p-16">
            <div className="absolute inset-0 -z-10">
              <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-primary/20 blur-3xl" />
            </div>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-sidebar-foreground sm:text-4xl">
                Ready to optimize your CV?
              </h2>
              <p className="mt-4 text-lg text-sidebar-foreground/70">
                Join thousands of job seekers who have improved their chances with AI-powered insights.
              </p>
              <Link to="/upload" className="mt-8 inline-block">
                <Button variant="hero" size="xl" className="group">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">CV Analyzer</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 CV Analyzer. Built with AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
