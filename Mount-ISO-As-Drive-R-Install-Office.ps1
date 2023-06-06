#Check if elevated

[Security.Principal.WindowsPrincipal]$user = [Security.Principal.WindowsIdentity]::GetCurrent();
$Admin = $user.IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator);
    
if ($Admin) {
    Write-Host "Administrator rights detected, continuing install.";

    # ISO image
    $isoImg = Read-Host -Prompt "Enter Image Path";
    $isoImg = $isoImg.Replace("`"","");
    #[System.IO.FileInfo] $p = $isoImg;
    #$p.Exists;
    while ( !([System.IO.File]::Exists($isoImg)) -OR !($isoImg -Match ".*\.(iso|img)") ) {
        Write-Host "Wrong ISO file, Please try Again.";
        $isoImg = Read-Host -Prompt "Enter Iso Path";
        $isoImg = $isoImg.Replace("`"","");
    }
    
    #Drive letter
    $driveLetter = "R:"

    # Mount the ISO, without having a drive letter auto-assigned
    $diskImg = Mount-DiskImage -ImagePath $isoImg -NoDriveLetter

    # Get mounted ISO volume
    $volInfo = $diskImg | Get-Volume

    
    # Mount volume with specified drive letter (requires Administrator access)
    mountvol $driveLetter $volInfo.UniqueId

    Read-Host -Prompt "Press Enter to Continue installing Office? "
    
    .\bin\setup.exe /configure .\bin\2021_3Essential.xml

    Read-Host -Prompt "Wait untill office is installed then Press Enter to Continue and Dismount?"
    # Unmount drive
    # DisMount-DiskImage -ImagePath $isoImg  
}
else {
    Write-Error "This script must be executed as Administrator.";
    cmd /c pause
    exit 1;
}


