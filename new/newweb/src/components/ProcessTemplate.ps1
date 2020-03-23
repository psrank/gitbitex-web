
$files = Get-ChildItem *.vue -Recurse # | Add-Content -Value '</script>'

$files | ForEach-Object {

 $originalText = Get-Content -Path $_
 Write-Host $originalText
 if(Test-Path -Path $_.FullName.Replace('.vue','.jade')){
  $template = Get-Content -Path $_.FullName.Replace('.vue','.jade')
  Write-Host $template
  Set-Content -Path $_ -Value $text
  Add-Content -Path $_ -Value '<template lang="jade">'
  Add-Content -Path $_ -Value $template
  Add-Content -Path $_ -Value '</template>'
  Add-Content -Path $_ -Value ''
  Add-Content -Path $_ -Value '<script lang="ts">'
  Add-Content -Path $_ -Value $originalText
 }
 elseif(Test-Path -Path $_.FullName.Replace('.vue','.html')){
  $template = Get-Content -Path $_.FullName.Replace('.vue','.html')
  Write-Host $template
  Set-Content -Path $_ -Value $text
  Add-Content -Path $_ -Value '<template>'
  Add-Content -Path $_ -Value $template
  Add-Content -Path $_ -Value '</template>'
  Add-Content -Path $_ -Value ''
  Add-Content -Path $_ -Value '<script lang="ts">'
  Add-Content -Path $_ -Value $originalText
 }
 else {
  Write-Host '--------------------------------------------------------------------------'
  Write-Host 'NO TEMPLATE'
  Write-Host '--------------------------------------------------------------------------'
 }

}

