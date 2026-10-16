@echo off
REM Start Gurukripa Peeth React Frontend Dev Server
echo Starting React Vite Dev Server on http://localhost:5173 ...
pushd "%~dp0frontend"
npm run dev
popd
