# Script PowerShell per ridimensionare immagini con ImageMagick
param(
    [Parameter(Mandatory=$true)]
    [string]$InputPath,
    
    [Parameter(Mandatory=$true)]
    [int]$Width,
    
    [Parameter(Mandatory=$false)]
    [string]$OutputPath = "",
    
    [Parameter(Mandatory=$false)]
    [int]$Quality = 85,
    
    [Parameter(Mandatory=$false)]
    [switch]$ReplaceOriginal = $false
)

# Verifica che ImageMagick sia installato
try {
    $null = magick -version
    Write-Host "ImageMagick trovato" -ForegroundColor Green
} catch {
    Write-Error "ImageMagick non installato"
    exit 1
}

# Verifica che il file di input esista
if (-not (Test-Path $InputPath)) {
    Write-Error "File non trovato: $InputPath"
    exit 1
}

# Determina il percorso di output
if ($OutputPath -eq "") {
    $directory = Split-Path $InputPath -Parent
    $filename = [System.IO.Path]::GetFileNameWithoutExtension($InputPath)
    $extension = [System.IO.Path]::GetExtension($InputPath)
    
    if ($ReplaceOriginal) {
        $OutputPath = $InputPath
        $tempPath = Join-Path $directory "$filename-temp$extension"
    } else {
        $OutputPath = Join-Path $directory "$filename-resized$extension"
    }
}

# Ottieni informazioni sull'immagine originale
$originalInfo = magick identify -format "%wx%h %B" $InputPath
$originalSize = (Get-Item $InputPath).Length

Write-Host "Immagine originale: $originalInfo" -ForegroundColor Cyan
Write-Host "Dimensione file: $([math]::Round($originalSize/1MB, 2)) MB" -ForegroundColor Cyan

# Ridimensiona l'immagine
Write-Host "Ridimensionamento in corso..." -ForegroundColor Yellow

if ($ReplaceOriginal) {
    $actualOutput = $tempPath
} else {
    $actualOutput = $OutputPath
}

try {
    # Usa auto-orient, sRGB e strip per massima compatibilità; JPEG progressivo per caricamento più rapido
    magick $InputPath -auto-orient -colorspace sRGB -strip -resize "${Width}x>" -interlace JPEG -quality $Quality $actualOutput
    
    if ($ReplaceOriginal) {
        Move-Item $tempPath $InputPath -Force
        $actualOutput = $InputPath
    }
    
    # Ottieni informazioni sull'immagine ridimensionata
    $newInfo = magick identify -format "%wx%h %B" $actualOutput
    $newSize = (Get-Item $actualOutput).Length
    
    Write-Host "Ridimensionamento completato!" -ForegroundColor Green
    Write-Host "Nuova immagine: $newInfo" -ForegroundColor Green
    Write-Host "Nuova dimensione: $([math]::Round($newSize/1MB, 2)) MB" -ForegroundColor Green
    Write-Host "Riduzione: $([math]::Round((1 - $newSize/$originalSize) * 100, 1))%" -ForegroundColor Green
    Write-Host "Salvata in: $actualOutput" -ForegroundColor Green
    
} catch {
    Write-Error "Errore durante il ridimensionamento: $_"
    exit 1
}