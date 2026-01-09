"""Pydantic schemas for request/response payloads."""

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    text: str = Field(..., min_length=1, description="Raw CV/resume text")


class AnalyzeResponse(BaseModel):
    id: Optional[int] = None
    created_at: Optional[datetime] = None
    ats_score: int
    skills: List[str]
    strengths: List[str]
    gaps: List[str]
    recommended_roles: List[str]
    summary_rewrite: str

    model_config = {"from_attributes": True}


class RewriteRequest(BaseModel):
    text: str = Field(..., min_length=1, description="Summary text to rewrite")


class RewriteResponse(BaseModel):
    rewritten: str