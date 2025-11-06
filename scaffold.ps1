# ==========================
# CV.io Folder Scaffold (Add to Existing Root)
# ==========================
# Adds src folder structure into the current project root (no deletion)

Write-Host "Adding CV.io src folder structure to current directory..." -ForegroundColor Cyan

# Get current working directory as root
$root = Get-Location
Write-Host "Current root: $root" -ForegroundColor Yellow

# ==========================
# Create src directories
# ==========================
Write-Host "Creating src directories..."

$folders = @(
    "src",
    "src/app",
    "src/assets",
    "src/components",
    "src/components/ui",
    "src/constants",
    "src/contexts",
    "src/data",
    "src/hooks",
    "src/hooks/query",
    "src/lib",
    "src/services",
    "src/stores",
    "src/types",
    "src/utils",
    "src/features"
)

foreach ($folder in $folders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-Host "Created: $folder" -ForegroundColor Green
    } else {
        Write-Host "Exists: $folder" -ForegroundColor DarkGray
    }
    New-Item -Path "$folder/.gitkeep" -ItemType File -Force | Out-Null
}

# ==========================
# Optional root files
# ==========================
# (Only creates if they don't exist)
Write-Host "Ensuring base files exist..."

if (-not (Test-Path ".gitignore")) {
@"
# Node
node_modules
.next
dist
*.log

# System
.DS_Store
.env
"@ | Out-File -Encoding utf8 ".gitignore" -Force
    Write-Host "Created: .gitignore" -ForegroundColor Green
} else {
    Write-Host "Exists: .gitignore" -ForegroundColor DarkGray
}

if (-not (Test-Path "README.md")) {
@"
# CV.io

This project follows the standardized Next.js 14 project structure.

## Structure Overview
src/
├── app/          - Next.js App Router
├── assets/       - Shared assets
├── components/   - Shared components (UI in ./ui)
├── constants/    - Shared constants
├── contexts/     - React Context modules
├── data/         - Data access layer (API, DB, etc.)
├── hooks/        - Custom hooks (query/ for TanStack)
├── lib/          - Third-party integrations
├── services/     - Business logic layer (optional)
├── stores/       - Zustand stores
├── types/        - Shared TypeScript types
├── utils/        - Utility functions
└── features/     - Feature modules (optional)
"@ | Out-File -Encoding utf8 "README.md" -Force
    Write-Host "Created: README.md" -ForegroundColor Green
} else {
    Write-Host "Exists: README.md" -ForegroundColor DarkGray
}

Write-Host ""
Write-Host "✅ CV.io src structure added successfully!" -ForegroundColor Green
Write-Host "Location: $root"
