@echo off
title SERENLINK SOLUTIONS - Web Server
cd /d "%~dp0"

echo ========================================================
echo   Starting SERENLINK SOLUTIONS Enterprise Website (Sri Lanka)
echo   Theme: OnRamp 2025 + TKWIT Dropdown Architecture
echo ========================================================
echo.
echo Opening browser at http://localhost:8080 ...
start http://localhost:8080

echo Starting local web server on port 8080 (Alternative Localhost)...
echo (Press Ctrl+C to stop the server anytime)
echo.
python -m http.server 8080
if %errorlevel% neq 0 (
    echo Python server stopped or not found. Opening index.html directly...
    start index.html
)
pause
