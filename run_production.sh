#!/bin/bash

sleep 4 &&
/etc/init.d/nginx start &&
cd keyword_finder &&
su -m finder -c "gunicorn keyword_finder.wsgi"
