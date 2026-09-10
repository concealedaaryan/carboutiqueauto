@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title Crest Automotive Care - Local Development

echo.
echo ============================================================
echo   Crest Automotive Care - local development setup
echo ============================================================
echo.

where npm >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Node.js/npm was not found on PATH.
  echo Install Node.js 18+ from https://nodejs.org/ and run start.bat again.
  pause
  exit /b 1
)

set "PYTHON_CMD="
where py >nul 2>&1
if not errorlevel 1 set "PYTHON_CMD=py -3"
if not defined PYTHON_CMD (
  where python >nul 2>&1
  if not errorlevel 1 set "PYTHON_CMD=python"
)
if not defined PYTHON_CMD (
  echo [ERROR] Python 3 was not found on PATH.
  echo Install Python 3.10+ from https://www.python.org/downloads/ and run start.bat again.
  pause
  exit /b 1
)

echo [1/4] Installing frontend dependencies with npm...
call npm install
if errorlevel 1 (
  echo [ERROR] Frontend dependency installation failed.
  pause
  exit /b 1
)

echo [2/4] Creating the Python virtual environment...
if not exist "backend\.venv\Scripts\python.exe" (
  %PYTHON_CMD% -m venv backend\.venv
  if errorlevel 1 (
    echo [ERROR] Could not create the Python virtual environment.
    pause
    exit /b 1
  )
)

echo [3/4] Installing backend dependencies...
call "backend\.venv\Scripts\python.exe" -m pip install --upgrade pip
call "backend\.venv\Scripts\python.exe" -m pip install -r requirements.txt
if errorlevel 1 (
  echo [ERROR] Backend dependency installation failed.
  pause
  exit /b 1
)

echo [4/4] Starting frontend and backend servers...
echo Frontend: http://localhost:4321/
echo Backend:  http://127.0.0.1:8000/api/health
echo.

start "Crest Automotive - FastAPI backend" /D "%~dp0" cmd /k "backend\.venv\Scripts\python.exe -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload"
start "Crest Automotive - Astro frontend" /D "%~dp0" cmd /k "npm run dev -- --host 0.0.0.0 --port 4321"

endlocal
exit /b 0
