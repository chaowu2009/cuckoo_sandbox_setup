echo "ref: https://hatching.io/blog/cuckoo-sandbox-setup/"

echo "system setup at Ubuntu 20.04 LTS"

sudo apt-get update
sudo apt-get -y install python virtualenv python-pip python-dev build-essential

sudo adduser --disabled-password --gecos "" cuckoo

sudo groupadd pcap
sudo usermod -a -G pcap cuckoo
sudo chgrp pcap /usr/sbin/tcpdump
sudo setcap cap_net_raw,cap_net_admin=eip /usr/sbin/tcpdump

wget https://cuckoo.sh/win7ultimate.iso --no-check-certificate
sudo mkdir /mnt/win7
sudo mount -o ro,loop win7ultimate.iso /mnt/win7