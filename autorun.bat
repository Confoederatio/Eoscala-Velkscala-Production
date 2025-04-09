@echo off
:loop
cls
echo Eoscala 1.0/Velkscala 0.5. Historical Economic Statistics.
node --max-old-space-size=128000 --expose-gc --trace-uncaught "main.js"
pause
goto loop
