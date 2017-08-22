forever stop server.js
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8888 ^|findstr LISTENING') DO TaskKill.exe /PID %%P /F
@echo off
echo Press enter to exit....
set /p input=