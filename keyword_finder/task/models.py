from django.db import models


class Task(models.Model):
    """Class describing searching task."""

    STATUS = (
        ('pending', 'pending'),
        ('running', 'running'),
        ('succeeded', 'succeeded'),
        ('failed', 'failed'),
    )

    owner = models.ForeignKey('user.User', related_name='tasks', on_delete=models.CASCADE)
    status = models.CharField(choices=STATUS, max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    site = models.TextField(null=False)
    keywords = models.TextField(null=False)
    is_regex = models.BooleanField(default=False)
    results = models.TextField(null=True)

    def __str__(self):
        return str(self.pk)

    def save(self, *args, **kwargs):
        """
        Save Task and schedule it if status is 'pending'.
        If user changes argument, Task automatically gets 'pending' status.
        """

        if self.pk:
            previous = Task.objects.get(pk=self.pk)
            if previous.keywords != self.keywords:
                self.status = self.STATUS[0][0]

        super(Task, self).save(*args, **kwargs)
        if self.status == self.STATUS[0][0]:
            from .tasks import find
            task = find
            task.delay(task_id=self.id, site=self.site, keywords=self.keywords, is_regex=self.is_regex)
