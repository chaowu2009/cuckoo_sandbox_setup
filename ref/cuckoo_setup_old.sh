echo "Ref : https://utopianknight.com/malware/cuckoo-installation-on-ubuntu-20/"

echo "Step 8: Make sure that your Ubuntu Desktop is fully updated by running"
sudo apt-get update && sudo apt-get upgrade -y

echo "Step 11: It is good security practice to have a separate user to run the sandbox. Now we will create our user:"
sudo adduser cuckoo

echo "Step 14: Now we are going to add that user to the sudo group. Type"
sudo adduser cuckoo sudo

echo "virtual machine virtualization"
vboxmanage modifyvm "cuckoo1" --nested-hw-virt on

echo "Step 16: We need to install curl so type sudo apt-get install curl and then we need to download the get python pip command, so type curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py"
sudo apt-get install curl
curl https://bootstrap.pypa.io/pip/2.7/get-pip.py -o get-pip.py

echo "Step 17: Now we need to install python so type"
sudo apt-get install python

echo "Step 18: Now we need to install python-pip and this can be done using the downloaded file from step 16. So type"
sudo python get-pip.py

echo "Step 19: Now we are going to install the pre-requisites needed to install both VirtualBox and Cuckoo so type"
sudo apt-get install -y python-dev libffi-dev libssl-dev libfuzzy-dev libtool flex autoconf libjansson-dev git

echo "Step 20: Once these have installed now we need to install the Python supporting tools so type"
sudo apt-get install -y python-setuptools

echo "Step 21: Now we will install jpeg and interface supporting tools"
sudo apt-get install -y libjpeg-dev zlib1g-dev swig

echo "Step 22: Now to install mongodb by typing"
sudo apt-get install -y mongodb

echo "Step 23: Cuckoo’s recommended database is PostgreSQL so install it by running"
sudo apt-get install -y postgresql libpq-dev

echo "Step 25: Now we will install Virtual Box 6.1 so type"
sudo apt-get install -y virtualbox

echo "enable virtualization VT-X assuming cuckoo1 is the VM name"
sudo vboxmanage modifyvm "cuckoo1" --nested-hw-virt on

echo "Step 26: Now we will download and install all the plugins needed for cuckoo to work. Change to your Downloads folder by typing cd Downloads/ or if you are not currently in your home directory type ~/Downloads"
cd ~/Downloads

echo "Step 27: So now we start with installing Volatility type"
git clone https://github.com/volatilityfoundation/volatility.git  
cd volatility

echo "Step 28: Next we are going to build it type sudo python setup.py build now install it"
sudo python setup.py install

echo "Step 29: Now go back up to your Downloads directory type"
cd ..

echo "Step 30: Now were going to install Distorm3 type"
sudo -H pip install distorm3==3.4.4

echo "Step 31: Now were going to install Yara so type"
sudo -H pip install yara-python==3.6.3

echo "Step 32: Now were going to install ssdeep so type"
sudo apt-get install -y ssdeep

echo "Step 33: Now we will install pydeep by typing"
sudo -H pip install pydeep

echo "Step 34: Now we will install openpyxl by typing" 
sudo -H pip install openpyxl

echo "Step 35: Now install ujson by typing"
sudo -H pip install ujson

echo "Step 36: Now install jupyter by typing"
sudo -H pip install jupyter

echo "Step 37: Now we will install TCPDump to enable packet capture analysis."
sudo apt-get install tcpdump  
sudo apt-get install libcap2-bin 
sudo setcap cap_net_raw,cap_net_admin=eip /usr/sbin/tcpdump 
getcap /usr/sbin/tcpdump

echo "Step 38: We need to install and disable apparmor due to it silently protecting the Ubuntu operating system by securing applications and we want TCP Dump to run correctly"
sudo apt-get install -y apparmor-utils
sudo aa-disable /usr/sbin/tcpdump

echo "Step 40: Type pip install -U pip setuptools it may say that the requirements are already met"
pip install -U pip setuptools

echo "Step 41: Now we will install Cuckoo"
sudo -H pip install -U cuckoo

echo "Step 42: Now to create the default directory’s for Cuckoo"
cuckoo

echo "Step 43: Now we need to setup the virtualbox environment. We need to install net-tools"
sudo apt install -y net-tools

echo "Step 44: Now type ifconfig to find the IP address information of your Virtual machine."
ipconfig

echo "Step 45: Now we want to create a host only network adapter"
vboxmanage hostonlyif create

echo "Step 46: We now want to set the IP address for the virtual interface"
vboxmanage hostonlyif ipconfig vboxnet0 --ip 192.168.56.1

echo "Step 48: We want to make these changes survive a reboot and set automatically during system startup. So we need to make a new directory"
sudo mkdir /opt/systemd/ 
sudo nano /opt/systemd/vboxhostonly and copy the following code into the file: 
!/bin/bash
hostonlyif create
vboxmanage hostonlyif ipconfig vboxnet0 --ip 192.168.56.1

echo "Step 49: Now we need to make the file executable"
cd /opt/systemd/ then 
sudo chmod a+x vboxhostonly

echo "Step 50: now we need to create a service"
sudo touch /etc/systemd/system/vboxhostonlynic.service

echo "Step 51: Edit the file"
sudo nano /etc/systemd/system/vboxhostonlynic.service and then typing in:
Description=Setup VirtualBox Hostonly Adapter
After=vboxdrv.service
[Service]
Type=oneshot
ExecStart=/opt/systemd/vboxhostonly
[Install]
WantedBy=multi-user.target

echo "Step 52: Now to install the service and ensure it loads at boot time"
sudo systemctl daemon-reload
sudo systemctl enable vboxhostonlynic.service