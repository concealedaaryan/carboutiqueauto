@echo off
setlocal

cd /d "%~dp0"

echo Crest Automotive Astro
where pnpm >nul 2>&1
if errorlevel 1 (
  echo.
  echo pnpm was not found on PATH.
  echo Install Node.js and pnpm, then run this file again.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\.bin\astro.cmd" (
  echo Installing locked dependencies...
  call pnpm install --frozen-lockfile
  if errorlevel 1 (
    echo.
    echo Dependency installation failed.
    pause
    exit /b 1
  )
)

echo Starting Astro at http://localhost:4321/
call pnpm dev --host 0.0.0.0 --port 4321

endlocal
