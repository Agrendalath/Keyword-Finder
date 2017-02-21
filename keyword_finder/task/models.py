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
    arguments = models.PositiveIntegerField()
    results = models.IntegerField(null=True)

    def __str__(self):
        return str(self.pk)

    def save(self, *args, **kwargs):
        """
        Save Task and schedule it if status is 'pending'.
        If user changes argument, Task automatically gets 'pending' status.
        """

        if self.pk is not None:
            previous = Task.objects.get(pk=self.pk)
            if previous.arguments != self.arguments:
                self.status = self.STATUS[0][0]

        super(Task, self).save(*args, **kwargs)
        if self.status == self.STATUS[0][0]:
            from .tasks import power
            task = power
            task.delay(task_id=self.id, n=self.arguments)
