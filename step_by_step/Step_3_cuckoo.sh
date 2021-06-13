
echo "Automatic VM creation"
vmcloak-vboxnet0
vmcloak init --verbose --win7x64 win7x64base --cpus 2 --ramsize 2048
vmcloak clone win7x64base win7x64cuckoo
vmcloak list deps
vmcloak install win7x64cuckoo adobepdf pillow dotnet java flash vcredist vcredist.version=2015u3 wallpaper
vmcloak install win7x64cuckoo ie11
#vmcloak install win7x64cuckoo office office.version=2007 office.isopath=/path/to/office2007.iso office.serialkey=XXXXX-XXXXX-XXXXX-XXXXX-XXXXX

vmcloak snapshot --count 4 win7x64cuckoo 192.168.56.101
vmcloak list vms