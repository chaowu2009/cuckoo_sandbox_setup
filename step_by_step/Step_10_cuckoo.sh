echo "Using uWSGI and nginx - Advanced"

pip install uwsgi
sudo apt-get install uwsgi uwsgi-plugin-python nginx

cuckoo web --uwsgi > cuckoo-web.ini
sudo cp cuckoo-web.ini /etc/uwsgi/apps-available/cuckoo-web.ini
sudo ln -s /etc/uwsgi/apps-available/cuckoo-web.ini /etc/uwsgi/apps-enabled/cuckoo-web.ini

sudo adduser www-data cuckoo
sudo systemctl restart uwsgi

cuckoo web --nginx > cuckoo-web.conf
sudo cp cuckoo-web.conf /etc/nginx/sites-available/cuckoo-web.conf
sudo ln -s /etc/nginx/sites-available/cuckoo-web.conf /etc/nginx/sites-enabled/cuckoo-web.conf
sudo systemctl restart nginx