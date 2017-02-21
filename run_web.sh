#!/bin/bash

sleep 4 &&
    cd keyword_finder &&
    su -m finder -c "./manage.py makemigrations keyword_finder task user" &&
    su -m finder -c "./manage.py migrate" &&
    su -m finder -c "./manage.py runserver 0.0.0.0:8000"
