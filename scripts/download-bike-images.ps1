$ErrorActionPreference = "Continue"
$outDir = Join-Path $PSScriptRoot "..\public\bikes"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$images = @{
  "harley-heritage-softail-classic.jpg" = "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&h=600&q=85"
  "harley-forty-eight.jpg"               = "https://images.unsplash.com/photo-1606011154371-5c228ae25a80?auto=format&fit=crop&w=800&h=600&q=85"
  "harley-sportster-iron-883.jpg"        = "https://images.unsplash.com/photo-1529773479-37b5a337375f?auto=format&fit=crop&w=800&h=600&q=85"
  "harley-street-500.jpg"                = "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&h=600&q=85"
  "honda-rebel-500.jpg"                  = "https://images.unsplash.com/photo-1609630875171-362bf57798c0?auto=format&fit=crop&w=800&h=600&q=85"
  "yamaha-yzf-r6.jpg"                    = "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&h=600&q=85"
  "ducati-monster-795.jpg"               = "https://images.unsplash.com/photo-1625812181697-0428b08ad632?auto=format&fit=crop&w=800&h=600&q=85"
  "kawasaki-z800.jpg"                    = "https://images.unsplash.com/photo-1449426468159-d96dbf54f29f?auto=format&fit=crop&w=800&h=600&q=85"
  "kawasaki-zx-25r.jpg"                  = "https://images.unsplash.com/photo-1611873189125-324514ebd94e?auto=format&fit=crop&w=800&h=600&q=85"
  "bmw-f800gs.jpg"                       = "https://images.unsplash.com/photo-1571068315143-c81fa81fbbe1?auto=format&fit=crop&w=800&h=600&q=85"
  "kawasaki-versys-650.jpg"              = "https://images.unsplash.com/photo-1605898800078-5935baf9b010?auto=format&fit=crop&w=800&h=600&q=85"
  "royal-enfield-himalayan-410.jpg"      = "https://images.unsplash.com/photo-1622185139415-059f0701a7c8?auto=format&fit=crop&w=800&h=600&q=85"
  "royal-enfield-scram-411.jpg"          = "https://images.unsplash.com/photo-1631813004024-5b45a094b629?auto=format&fit=crop&w=800&h=600&q=85"
  "royal-enfield-classic-500.jpg"        = "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&h=600&q=85"
  "yamaha-xmax-250.jpg"                  = "https://images.unsplash.com/photo-1605898800078-5935baf9b010?auto=format&fit=crop&w=800&h=600&q=85"
}

$ok = 0
foreach ($entry in $images.GetEnumerator()) {
  $path = Join-Path $outDir $entry.Key
  try {
    Invoke-WebRequest -Uri $entry.Value -OutFile $path -UseBasicParsing -TimeoutSec 60
    Write-Host "OK $($entry.Key)"
    $ok++
  } catch {
    Write-Host "FAIL $($entry.Key): $_"
  }
}
Write-Host "Downloaded $ok / $($images.Count)"
