"""Offline heuristic CV analysis logic."""

from __future__ import annotations

from datetime import datetime
from typing import List, Sequence


SKILL_KEYWORDS: Sequence[str] = (
    "Python",
    "Java",
    "Spring",
    "SQL",
    "MySQL",
    "PostgreSQL",
    "Docker",
    "Git",
    "Linux",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "TensorFlow",
    "PyTorch",
    "FastAPI",
    "Angular",
    "React",
    "TypeScript",
    "REST",
    "JWT",
    "AWS",
    "Azure",
)


ROLE_SIGNATURES = {
    "Data Analyst": {"SQL", "MySQL", "PostgreSQL", "Python", "Pandas", "NumPy"},
    "Junior ML Engineer": {"Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch"},
    "Backend Developer": {"Python", "FastAPI", "Java", "Spring", "REST", "JWT", "SQL"},
    "Full-Stack Developer": {"React", "Angular", "TypeScript", "REST", "FastAPI", "Docker"},
    "DevOps Intern": {"Docker", "Linux", "Git", "AWS", "Azure"},
}


def _find_skills(text: str) -> List[str]:
    lowered = text.lower()
    skills = [kw for kw in SKILL_KEYWORDS if kw.lower() in lowered]
    return skills


def _ats_score(text: str, matched_skills: Sequence[str]) -> int:
    lowered = text.lower()
    section_hits = sum(
        1
        for token in ("experience", "education", "project", "projects", "skills", "summary")
        if token in lowered
    )
    skill_score = min(len(matched_skills) * 3, 30)
    section_score = min(section_hits * 10, 40)
    length_score = min(max(len(text) // 200, 0), 30)  # reward reasonable length
    total = skill_score + section_score + length_score
    return max(0, min(100, total))


def _strengths_gaps(matched_skills: Sequence[str]) -> tuple[list[str], list[str]]:
    matched_set = set(matched_skills)
    strengths = [f"Strong with {skill}" for skill in matched_skills]
    common_missing = [
        skill
        for skill in ("Python", "SQL", "Docker", "Git", "AWS", "React")
        if skill not in matched_set
    ]
    gaps = [f"Consider adding {skill}" for skill in common_missing]
    return strengths or ["Add more concrete skills"], gaps


def _recommend_roles(matched_skills: Sequence[str]) -> List[str]:
    matched_set = set(matched_skills)
    scored = []
    for role, signature in ROLE_SIGNATURES.items():
        overlap = len(signature & matched_set)
        scored.append((overlap, role))
    scored.sort(reverse=True)
    top = [role for score, role in scored if score == scored[0][0] and score > 0]
    return top or ["Data Analyst"]


def _summary_rewrite(text: str, matched_skills: Sequence[str], role: str) -> str:
    skills_phrase = ", ".join(matched_skills[:6]) if matched_skills else "foundational skills"
    lines = [
        f"Motivated candidate targeting {role} roles with hands-on exposure to {skills_phrase}.",
        "Focuses on building reliable solutions, documenting work, and collaborating with cross-functional teams.",
        "Eager to learn quickly, refine delivery, and contribute to projects end-to-end.",
    ]
    if len(text) < 400:
        lines.append("Currently strengthening portfolio with tangible projects to showcase impact.")
    return " ".join(lines)


def analyze_text(text: str) -> dict:
    """Run offline heuristics to extract structured CV insights."""
    matched_skills = _find_skills(text)
    ats_score = _ats_score(text, matched_skills)
    strengths, gaps = _strengths_gaps(matched_skills)
    recommended_roles = _recommend_roles(matched_skills)
    summary_rewrite = _summary_rewrite(text, matched_skills, recommended_roles[0])

    return {
        "ats_score": ats_score,
        "skills": matched_skills,
        "strengths": strengths,
        "gaps": gaps,
        "recommended_roles": recommended_roles,
        "summary_rewrite": summary_rewrite,
    }


def rewrite_summary(text: str) -> str:
    """Standalone summary rewriting helper."""
    matched = _find_skills(text)
    role = _recommend_roles(matched)[0]
    return _summary_rewrite(text, matched, role)