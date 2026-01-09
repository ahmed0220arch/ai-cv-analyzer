# AI CV Analyzer

An intelligent CV/Resume analyzer that helps job seekers improve their resumes and find matching job roles.

## Project Overview

This application uses AI to analyze CVs and provide:
- Skills assessment and radar chart visualization
- Strengths and weaknesses analysis
- Job role recommendations
- Overall score and feedback

## Technologies Used

**Frontend:**
- React with TypeScript
- Vite
- shadcn-ui components
- Tailwind CSS
- Recharts for visualizations

**Backend:**
- FastAPI (Python)
- SQLAlchemy
- SQLite database

## Getting Started

### Frontend Setup

```sh
# Install dependencies
npm i

# Start the development server
npm run dev
```

### Backend Setup

```sh
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment (Windows)
.venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload
```

## Project Structure

- `/src` - Frontend React application
- `/backend` - FastAPI backend server
- `/src/components` - Reusable UI components
- `/src/pages` - Application pages

## Features

- CV upload and analysis
- Skills radar chart visualization
- Job role recommendations
- Analysis history tracking
- Responsive design

