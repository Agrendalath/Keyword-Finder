import re
from functools import wraps

import requests

from keyword_finder.celeryconf import app
from .models import Task

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) ' +
                  'Chrome/39.0.2171.95 Safari/537.36'}


def update_job(function):
    """Decorator to update Task with result."""

    @wraps(function)
    def wrapper(task_id, *args, **kwargs):
        task = Task.objects.get(id=task_id)
        task.status = Task.STATUS[1][0]
        task.save()
        try:
            result = function(*args, **kwargs)
            task.results = result
            task.status = Task.STATUS[2][0]
            task.save()
        except:
            task.results = None
            task.status = Task.STATUS[3][0]
            task.save()

    return wrapper


@app.task
@update_job
def find(site, keywords, is_regex):
    if not is_regex:
        keywords = re.escape(keywords).replace('_', '|')

    r = requests.get(site, headers=headers)
    return ', '.join(set(re.findall(keywords, r.text)))
