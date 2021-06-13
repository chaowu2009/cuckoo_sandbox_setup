# Main Ref https://hatching.io/blog/cuckoo-sandbox-setup/
# Video Ref 1: https://www.youtube.com/watch?v=QlQS4gk_lFU
# Video Ref 2: https://www.youtube.com/watch?v=FsF56772ZvU

cuckoo init

ls ~/.cuckoo

# modify some configurations

# update cuckoo signature
cuckoo community

cd ~/.cuckoo/conf
# nano virtualbox.conf
# mode = gui
# Open $CWD/conf/virtualbox.conf and remove the entries in the machines = cuckoo1 line.
while read -r vm ip; do cuckoo machine --add $vm $ip; done < <(vmcloak list vms)

# network configuration. note eth0 need to be replaced using ip a
sudo sysctl -w net.ipv4.conf.vboxnet0.forwarding=1
#sudo sysctl -w net.ipv4.conf.eth0.forwarding=1
sudo sysctl -w net.ipv4.conf.enp3s0.forwarding=1

# running cuckoo
cuckoo rooter --sudo --group cuckoo

# modify routing.conf file
# internet = none to enp3s0

# modify reporting.conf file
# mongodb : enabled= yes (changed)

#please check ".cuckoo/conf/cuckoo.conf" file
# make sure that the IP(under [resultserver]) has the private IP of your machine.
# use ifconfig to find your private IP address

# run cuckoo in another terminal cuckoo
cuckoo

# run web server
cuckoo web --host 127.0.0.1 --port 8080

# go to 127.0.0.1:8080 you can submit files or website for evaluation
