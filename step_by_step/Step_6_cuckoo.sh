echo "Adding VMs
We are using VirtualBox in our setup, this is the default Machinery module that Cuckoo uses. We have to remove some default settings from its configuration file virtualbox.conf.

All Cuckoo configuration files can be found at $CWD/conf/. Open $CWD/conf/virtualbox.conf and remove the entries in the machines = cuckoo1 line.

Time to add the created VMs to Cuckoo. We will use the cuckoo machine --add <vm name> <ip> to tell Cuckoo to add the machine to its configuration. This has to be done for each machine, so let’s make life easier and use vmcloak list vms:"

while read -r vm ip; do cuckoo machine --add $vm $ip; done < <(vmcloak list vms)

To install the Cuckoo signatures and latest monitor, we run the following command:

cuckoo community --force