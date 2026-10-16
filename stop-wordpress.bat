@echo off
REM Stop Gurukripa Peeth WordPress backend
powershell -ExecutionPolicy Bypass -File "%~dp0stop-gurukapeeth.ps1" %*
