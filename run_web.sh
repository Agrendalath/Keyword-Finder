#!/bin/bash

sleep 4 &&
cd keyword_finder &&
su -m finder -c "./manage.py makemigrations keyword_finder user task &&
    ./manage.py migrate &&
    ./manage.py runserver 0.0.0.0:8000"
