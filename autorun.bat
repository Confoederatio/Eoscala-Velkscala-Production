@echo off
:loop
cls
echo Eoscala 1.2.1/Velkscala 0.7.1 - Historical Economic and PopulationStatistics.
node --max-old-space-size=128000 --expose-gc --trace-uncaught "main.js"
pause
goto loop
