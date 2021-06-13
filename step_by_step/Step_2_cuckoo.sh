

echo "installing virtualbox"
sudo apt-get update
sudo apt-get install virtualbox
sudo usermod -a -G vboxusers cuckoo

echo "Cuckoo and VMCloak installation"

sudo apt-get -y install build-essential libssl-dev libffi-dev python-dev genisoimage
sudo apt-get -y install zlib1g-dev libjpeg-dev
sudo apt-get -y install python3-pip python3-virtualenv python-setuptools swig

sudo su cuckoo
virtualenv ~/cuckoo
. ~/cuckoo/bin/activate

pip install -U cuckoo vmcloak