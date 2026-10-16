@echo off
REM Stop Gurukripa Peeth Full Stack
echo Stopping WordPress Apache and MySQL services...
powershell -ExecutionPolicy Bypass -File "%~dp0stop-gurukapeeth.ps1"
echo Done.
