# Main Ref https://hatching.io/blog/cuckoo-sandbox-setup/
# Video Ref 1: https://www.youtube.com/watch?v=QlQS4gk_lFU
# Video Ref 2: https://www.youtube.com/watch?v=FsF56772ZvU


# create cuckoo account and log out your current account and log into
# cuckoo account

sudo apt-get install -y python python-pip python-dev libffi-dev libssl-dev
sudo apt-get install -y python-virtualenv python-setuptools
sudo apt-get install -y libjpeg-dev zlib1g-dev swig
sudo apt-get install -y mongodb
sudo apt-get install -y postgresql libpq-dev

sudo apt-get install -y virtualbox

sudo apt-get install -y tcpdump apparmor-utils
sudo aa-disable /usr/sbin/tcpdump

#sudo adduser cuckoo
sudo usermod -a -G vboxusers cuckoo
sudo groupadd pcap
sudo usermod -a -G pcap cuckoo
sudo chgrp pcap /usr/sbin/tcpdump
sudo setcap cap_net_raw,cap_net_admin=eip /usr/sbin/tcpdump

sudo pip install m2crypto
