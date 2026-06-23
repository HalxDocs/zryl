$ErrorActionPreference = "Stop"

$repo = "HalxDocs/zryl"
$installDir = "$env:USERPROFILE\.zryl"
$exeName = "zryl.exe"
$dest = "$installDir\$exeName"
$asset = "zryl-windows-amd64.exe"
$uri = "https://github.com/$repo/releases/latest/download/$asset"

Write-Host "Installing zryl..." -ForegroundColor Cyan

# Create install dir
New-Item -ItemType Directory -Force -Path $installDir | Out-Null

# Download binary
Write-Host "Downloading $asset..." -ForegroundColor Yellow
Invoke-WebRequest $uri -OutFile $dest

# Add to PATH if needed
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($currentPath -notlike "*$installDir*") {
  [Environment]::SetEnvironmentVariable("Path", "$currentPath;$installDir", "User")
  $env:Path = "$env:Path;$installDir"
  Write-Host "Added $installDir to PATH" -ForegroundColor Green
}

Write-Host ""
Write-Host "zryl installed!" -ForegroundColor Green
Write-Host "Restart your terminal, then run:" -ForegroundColor Yellow
Write-Host "  zryl run --help"
