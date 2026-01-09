"""FastAPI entrypoint providing CV analysis endpoints."""

from __future__ import annotations

import json
from typing import List

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session

from . import logic
from .database import Base, engine, get_db
from .models import AnalysisResult
from .schemas import AnalyzeRequest, AnalyzeResponse, RewriteRequest, RewriteResponse


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Career Catalyst Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/analyze", response_model=AnalyzeResponse)
def analyze(request: AnalyzeRequest, db: Session = Depends(get_db)) -> AnalyzeResponse:
    result = logic.analyze_text(request.text)

    db_obj = AnalysisResult(
        text=request.text,
        ats_score=result["ats_score"],
        skills=json.dumps(result["skills"]),
        strengths=json.dumps(result["strengths"]),
        gaps=json.dumps(result["gaps"]),
        recommended_roles=json.dumps(result["recommended_roles"]),
        summary_rewrite=result["summary_rewrite"],
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)

    return AnalyzeResponse(
        id=db_obj.id,
        created_at=db_obj.created_at,
        ats_score=result["ats_score"],
        skills=result["skills"],
        strengths=result["strengths"],
        gaps=result["gaps"],
        recommended_roles=result["recommended_roles"],
        summary_rewrite=result["summary_rewrite"],
    )


@app.post("/api/rewrite-summary", response_model=RewriteResponse)
def rewrite_summary(request: RewriteRequest) -> RewriteResponse:
    rewritten = logic.rewrite_summary(request.text)
    return RewriteResponse(rewritten=rewritten)


@app.get("/api/history", response_model=List[AnalyzeResponse])
def history(limit: int = 20, db: Session = Depends(get_db)) -> List[AnalyzeResponse]:
    stmt = select(AnalysisResult).order_by(AnalysisResult.created_at.desc()).limit(limit)
    rows = db.execute(stmt).scalars().all()
    responses: List[AnalyzeResponse] = []
    for row in rows:
        responses.append(
            AnalyzeResponse(
                id=row.id,
                created_at=row.created_at,
                ats_score=row.ats_score,
                skills=json.loads(row.skills),
                strengths=json.loads(row.strengths),
                gaps=json.loads(row.gaps),
                recommended_roles=json.loads(row.recommended_roles),
                summary_rewrite=row.summary_rewrite,
            )
        )
    return responses


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}