@echo off
cls
::==========================================
:: Get Administrator Rights
set _Args=%*
if "%~1" NEQ "" (
  set _Args=%_Args:"=%
)
fltmc 1>nul 2>nul || (
  cd /d "%~dp0"
  cmd /u /c echo Set UAC = CreateObject^("Shell.Application"^) : UAC.ShellExecute "cmd.exe", "/k cd ""%~dp0"" && ""%~dpnx0"" ""%_Args%""", "", "runas", 1 > "%temp%\GetAdmin.vbs"
  "%temp%\GetAdmin.vbs"
  del /f /q "%temp%\GetAdmin.vbs" 1>nul 2>nul
  exit
)
::==========================================

echo --------------------------------------------------------------
echo --------------------------------------------------------------
echo				 [32mControl Device[0m
echo		 [32mEnable[0m		[31mDisable[0m		[33mRestart[0m
echo Default config is set in script. change script or just query
echo your device.
echo --------------------------------------------------------------
echo --------------------------------------------------------------
set device="USB\VID_8087&PID_0029"
GOTO status

:start
echo.
echo 	0- [33mRestart[0m
echo 	1- [31mDisable[0m
echo 	2- [92mEnable[0m
echo 	3- [45mChange Device ID[0m
echo 	4- [96mStatus[0m
echo 	5- Problem Devices
echo 	9- [7mExit[0m

set /p Command=Your Choise: 
if %Command% EQU 0 (goto restart) 
if %Command% EQU 1 (goto Disable) 
if %Command% EQU 2 (goto Enable) 
if %Command% EQU 3 (goto ChangeDevice) 
if %Command% EQU 4 (goto Status) 
if %Command% EQU 5 (goto Problems) 
if %Command% EQU 8 (goto debug) 
if %Command% EQU 9 (goto exit) 

goto exit
:Problems
echo.
echo						[36mDevice with Problem[0m

pnputil /enum-devices /Problem
goto start
:debug
echo %device%

:ChangeDevice
set /p device=New device Id: 

goto Status

:Status
echo.
echo						[36mDevice Status[0m

pnputil /enum-devices /deviceid %device%
goto start

:restart
echo.
echo  /\/\/\/\/\/\/\/\/\/\/\/\/\/\ Restarting /\/\/\/\/\/\/\/\/\/\/\/\/\/\
echo.

pnputil /restart-device /deviceid %device%

GOTO status

:Enable
echo.
echo /\/\/\/\/\/\/\/\/\/\/\/\/\/\ Enabling /\/\/\/\/\/\/\/\/\/\/\/\/\/\
echo.

pnputil /enable-device /deviceid %device%

GOTO status

:Disable
echo.
echo /\/\/\/\/\/\/\/\/\/\/\/\/\/\ Disabling /\/\/\/\/\/\/\/\/\/\/\/\/\/\
echo.

pnputil /disable-device /deviceid %device%

GOTO status

:exit
echo --------------------------------------------------------------
echo 						Finished
set /p Command=repeat (Y/n): 
if %Command% EQU n (goto exit) else (
(goto start) )
pause

