from functools import wraps
from time import sleep

from keyword_finder.celeryconf import app
from .models import Task


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
def power(n):
    """Return 2 to the n'th power"""
    # sleep(10)
    return 2 ** n


# @app.task
# @update_job
# def fib(n):
#     return n

# @app.task
# @update_job
# def find(args):
#     pass
