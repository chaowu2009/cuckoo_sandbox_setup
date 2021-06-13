echo "Starting Cuckoo"

cuckoo --debug


echo "Starting Cuckoo in the background - Advanced"
sudo apt-get install supervisord

supervisord -c /home/cuckoo/.cuckoo/supervisord.conf

supervisorctl start cuckoo:
supervisorctl stop cuckoo: