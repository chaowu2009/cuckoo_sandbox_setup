# Main Ref https://hatching.io/blog/cuckoo-sandbox-setup/
# Video Ref 1: https://www.youtube.com/watch?v=QlQS4gk_lFU
# Video Ref 2: https://www.youtube.com/watch?v=FsF56772ZvU


sudo -u cuckoo ./virtualenv_cuckoo.sh
source ~/.bashrc
mkvirtualenv -p python2.7 cuckoo-test

# inside the virtualenv cuckoo-test, install the following
pip install -U pip setuptools
pip install -U cuckoo

## download win 7 ISO
wget https://cuckoo.sh/win7ultimate.iso --no-check-certificate
mkdir /mnt/win7
sudo chown cuckoo:cuckoo /mnt/win7
sudo mount -o ro,loop win7ultimate.iso /mnt/win7
