@echo off
REM WP-CLI shortcut for Gurukripa Peeth WordPress
pushd "%~dp0wordpress"
C:\laragon\bin\php\php-8.3.30-Win32-vs16-x64\php.exe -d memory_limit=512M "%~dp0tools\wp-cli.phar" %*
popd
