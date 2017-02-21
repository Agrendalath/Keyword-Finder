import os

from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'keyword_finder.settings')
app = Celery('keyword_finder')

CELERY_TIMEZONE = 'Europe/Warsaw' #TODO: Remove redundant.

app.config_from_object('django.conf:settings')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
