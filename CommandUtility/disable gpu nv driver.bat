@echo off
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
echo					Driver Disable - Enable
echo			use this script to Control Nvidia Driver
echo			Right Now:
devcon.exe status *VEN_10DE*
echo --------------------------------------------------------------

echo	To Disable Press "D"
echo	To Enable Press "E"


set /p Command=Your Choise: 
if %Command% EQU E (goto Enable) else (
if %Command% EQU D (goto Disable) else (goto Done) )

:Enable
echo --------------------------------------------------------------
echo					 Enable Started
echo --------------------------------------------------------------

devcon.exe enable *VEN_10DE*

GOTO :Done

:Disable
echo --------------------------------------------------------------
echo					 Disable Started
echo --------------------------------------------------------------

devcon.exe disable *VEN_10DE*

GOTO :Done

:Done
echo --------------------------------------------------------------
echo					 		Done
echo --------------------------------------------------------------
pause
goto :eof
