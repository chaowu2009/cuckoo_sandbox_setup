echo "Per-analysis routing - Advanced"

cuckoo rooter --sudo --group cuckoo
/home/cuckoo/cuckoo/bin/cuckoo rooter --sudo --group cuckoo

echo "Next, we have to edit $CWD/conf/routing.conf to tell Cuckoo what our outgoing interface is. Open routing.conf and change internet = none to internet = eth0."

echo "This config file also contains a route = none line. This is the default routing it will use. This can be changed to internet to give each analysis internet access, unless a different routing option is provided upon sample submission. A command line submission example: cuckoo submit <file path> --options "route=internet"."

