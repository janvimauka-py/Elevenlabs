@echo off
title VoxAI Studio Launcher
echo ========================================================
echo    VOXAI DUBBING STUDIO - STARTING DEV SERVER
echo ========================================================
echo.
echo Launching API Backend (Port 5000) and Web App (Port 5173)...
echo.

start "" "http://localhost:5173"
call npm.cmd run dev

pause
