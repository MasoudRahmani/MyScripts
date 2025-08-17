@echo off
cls

 

for %%i in (*) do md "%%~ni" && move "%%~i" "%%~ni"


pause
