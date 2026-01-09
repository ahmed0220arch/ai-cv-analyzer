"""ORM models for persistence."""

from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text

from .database import Base


class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    text = Column(Text, nullable=False)
    ats_score = Column(Integer, nullable=False)
    skills = Column(Text, nullable=False)  # JSON string
    strengths = Column(Text, nullable=False)  # JSON string
    gaps = Column(Text, nullable=False)  # JSON string
    recommended_roles = Column(Text, nullable=False)  # JSON string
    summary_rewrite = Column(Text, nullable=False)