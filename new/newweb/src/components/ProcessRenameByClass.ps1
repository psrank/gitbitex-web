$files = Get-ChildItem *.vue -Recurse # | Add-Content -Value '</script>'

$files | ForEach-Object {

    $originalText = Get-Content -Raw -Path $_
    #Write-Host $originalText
    $textToSearch = 'export class '
    $posStart = $originalText.IndexOf($textToSearch)
    #Write-Host $posStart
    if($posStart -ne -1){
        $substringText = $originalText.Substring($posStart + $textToSearch.Length)
        #Write-Host $substringText
        $posEnd = $substringText.IndexOf(' extends')
        $className = $substringText.Substring(0, $posEnd )
        Write-Host "${className}.vue"

        Rename-Item -Path $_ -NewName "${className}.vue"
    }

}

