@echo off
setlocal
cd /d "%~dp0"

echo ========================================
echo Crest Automotive Care - Astro Website
echo ========================================

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Install Node.js 22 LTS from https://nodejs.org/ and run this file again.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm was not found. Reinstall Node.js 22 LTS and run this file again.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo Dependency installation failed.
    pause
    exit /b 1
  )
)

echo Starting the website at http://localhost:4321
call npm run dev

if errorlevel 1 (
  echo.
  echo The Astro server stopped with an error.
  pause
)
endlocal
