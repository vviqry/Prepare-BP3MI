Add-Type -AssemblyName System.Drawing

$srcPath = "f:\New Project\New BP3MI\BP3MI.png"
$src = [System.Drawing.Image]::FromFile($srcPath)

function Resize-ImageSquare {
    param(
        [System.Drawing.Image]$source,
        [int]$targetSize,
        [string]$outputPath,
        [double]$paddingRatio = 0.0
    )

    $bmp = New-Object System.Drawing.Bitmap($targetSize, $targetSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    $availSize = $targetSize * (1.0 - (2.0 * $paddingRatio))
    $scale = [Math]::Min($availSize / $source.Width, $availSize / $source.Height)
    
    $drawW = [int]($source.Width * $scale)
    $drawH = [int]($source.Height * $scale)
    $posX = [int](($targetSize - $drawW) / 2)
    $posY = [int](($targetSize - $drawH) / 2)

    $g.DrawImage($source, $posX, $posY, $drawW, $drawH)
    $g.Dispose()

    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Generated: $outputPath ($targetSize x $targetSize)"
}

# Generate all required icon sizes
Resize-ImageSquare -source $src -targetSize 16 -outputPath "f:\New Project\New BP3MI\icon-16.png" -paddingRatio 0.0
Resize-ImageSquare -source $src -targetSize 32 -outputPath "f:\New Project\New BP3MI\icon-32.png" -paddingRatio 0.0
Resize-ImageSquare -source $src -targetSize 48 -outputPath "f:\New Project\New BP3MI\icon-48.png" -paddingRatio 0.0
Resize-ImageSquare -source $src -targetSize 72 -outputPath "f:\New Project\New BP3MI\icon-72.png" -paddingRatio 0.0
Resize-ImageSquare -source $src -targetSize 96 -outputPath "f:\New Project\New BP3MI\icon-96.png" -paddingRatio 0.0
Resize-ImageSquare -source $src -targetSize 128 -outputPath "f:\New Project\New BP3MI\icon-128.png" -paddingRatio 0.0
Resize-ImageSquare -source $src -targetSize 144 -outputPath "f:\New Project\New BP3MI\icon-144.png" -paddingRatio 0.0
Resize-ImageSquare -source $src -targetSize 152 -outputPath "f:\New Project\New BP3MI\icon-152.png" -paddingRatio 0.0
Resize-ImageSquare -source $src -targetSize 180 -outputPath "f:\New Project\New BP3MI\apple-touch-icon.png" -paddingRatio 0.05
Resize-ImageSquare -source $src -targetSize 192 -outputPath "f:\New Project\New BP3MI\icon-192.png" -paddingRatio 0.0
Resize-ImageSquare -source $src -targetSize 384 -outputPath "f:\New Project\New BP3MI\icon-384.png" -paddingRatio 0.0
Resize-ImageSquare -source $src -targetSize 512 -outputPath "f:\New Project\New BP3MI\icon-512.png" -paddingRatio 0.0
Resize-ImageSquare -source $src -targetSize 512 -outputPath "f:\New Project\New BP3MI\icon-maskable-512.png" -paddingRatio 0.1

$src.Dispose()
Write-Host "All icons generated successfully!"
