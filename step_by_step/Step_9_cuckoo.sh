echo "The Cuckoo Web Interface"

sudo apt-get install mongodb

echo "We start by opening $CWD/conf/reporting.conf and find the [MongoDB] section. Change enabled = no to enabled = yes. No further configuration changes are required, unless your MongoDB setup requires a user, runs on a non-standard port, or runs remotely."

echo "start server"

cuckoo web --host 127.0.0.1 --port 8080

echo "We can now submit tasks and view results in the web interface. Cuckoo must be running for analyses to start, otherwise tasks will remain on the pending status."