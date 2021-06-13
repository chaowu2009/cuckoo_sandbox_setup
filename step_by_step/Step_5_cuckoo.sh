
echo "set up Postgres as DBMS"
sudo apt-get postgresql postgresql-contrib
pip install psycopg2
sudo -u postgres psql
CREATE DATABASE cuckoo;
CREATE USER cuckoo WITH ENCRYPTED PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE cuckoo TO cuckoo;
\q

echo "set up database path"
echo "Open the $CWD/conf/cuckoo.conf file and find the [database] section. Change the connection = line to:"
connection = postgresql://cuckoo:password@localhost/cuckoo
