<#
.SYNOPSIS
    Stops Apache and MySQL services for Gurukripa Peeth.
#>
$ErrorActionPreference = 'Stop'
Write-Host 'Stopping Apache and MySQL...' -ForegroundColor Cyan
& (Join-Path $PSScriptRoot 'start-gurukapeeth.ps1') -Stop
