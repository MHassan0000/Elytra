# Load environment variables from .env file and run Spring Boot application
# Usage: .\run-with-env.ps1

Write-Host "Loading environment variables from .env file..." -ForegroundColor Cyan

if (!(Test-Path .env)) {
    Write-Host "Error: .env file not found!" -ForegroundColor Red
    Write-Host "Please copy .env.example to .env and configure your secrets." -ForegroundColor Yellow
    exit 1
}

# Load environment variables from .env file
Get-Content .env | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]+)=(.+)$') {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim()
        [System.Environment]::SetEnvironmentVariable($key, $value, 'Process')
        Write-Host "  ✓ Loaded: $key" -ForegroundColor Green
    }
}

Write-Host "`nStarting Spring Boot application..." -ForegroundColor Cyan
mvn spring-boot:run
