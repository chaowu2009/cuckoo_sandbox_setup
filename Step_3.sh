# Main Ref https://hatching.io/blog/cuckoo-sandbox-setup/
# Video Ref 1: https://www.youtube.com/watch?v=QlQS4gk_lFU
# Video Ref 2: https://www.youtube.com/watch?v=FsF56772ZvU

sudo apt-get -y install build-essential libssl-dev libffi-dev python-dev genisoimage
sudo apt-get -y install zlib1g-dev libjpeg-dev
sudo apt-get -y install python-pip python-virtualenv python-setuptools swig

pip install -U vmcloak

vmcloak-vboxnet0

vmcloak init --verbose --win7x64 win7x64base --cpus 2 --ramsize 2048
#vmcloak init --verbose --win7x64 win7x64base --cpus 8 --ramsize 16384

vmcloak clone win7x64base win7x64cuckoo

vmcloak install win7x64cuckoo ie11

vmcloak snapshot --count 4 win7x64cuckoo 192.168.56.101

vmcloak list vms
