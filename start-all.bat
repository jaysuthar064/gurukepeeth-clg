@echo off
REM Start Gurukripa Peeth Full Headless Stack (WordPress + React)
echo ============================================================
echo   GURUKRIPA PEETH — HEADLESS STACK LAUNCHER
echo ============================================================
echo.
echo [1/2] Starting WordPress Backend (Laragon Apache/MySQL) ...
call "%~dp0start-wordpress.bat" -NoBrowser
echo.
echo [2/2] Starting React Frontend Dev Server ...
start "Gurukripa React Frontend" cmd /c "%~dp0start-frontend.bat"
echo.
echo ============================================================
echo   STACK READY!
echo   React Frontend: http://localhost:5173
echo   WP Auto-Login:  http://localhost:8884/?gurukapeeth_login=1^&token=gurukapeeth-dev-token-001
echo   REST API:       http://localhost:8884/wp-json/gurukapeeth/v1/homepage
echo ============================================================
start http://localhost:5173
start http://localhost:8884/?gurukapeeth_login=1^&token=gurukapeeth-dev-token-001
