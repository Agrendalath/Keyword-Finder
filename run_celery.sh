#!/bin/bash

sleep 4 &&
cd keyword_finder &&
su -m finder -c "celery worker -A keyword_finder.celeryconf -Q default -n default@%h"
