# Backend (FastAPI + SQLite)

This backend powers the CV analysis features for the Career Catalyst UI. It uses FastAPI, SQLite, and lightweight offline heuristics (no external AI calls).

## Quickstart

From the repo root:

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Then open the interactive docs at http://localhost:8000/docs.

## API Overview

- `POST /api/analyze` – body `{ "text": "..." }` → ATS score, skills, strengths, gaps, recommended roles, rewritten summary. Persists to SQLite at `app/app.db`.
- `POST /api/rewrite-summary` – body `{ "text": "..." }` → rewritten summary only.
- `GET /api/history?limit=20` – most recent analyses (includes `created_at`).

## Notes

- CORS is open for `http://localhost:5173` and `http://localhost:3000` to match the frontend dev servers.
- SQLite lives at `backend/app/app.db`; remove the file to reset history.
- The analysis is heuristic/keyword-based (offline) and safe to run locally without external services.