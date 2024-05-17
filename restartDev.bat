@echo off
setlocal enabledelayedexpansion

rem 查找占用3002端口的进程ID
for /f "tokens=5" %%i in ('netstat -ano ^| findstr :3002') do (
    set PID=%%i
    echo Killing process on port 3002 with PID: !PID!
    taskkill /F /PID !PID! >nul 2>&1
)

echo "指定端口的服务已清除，现在开始重新运行"


npm run dev