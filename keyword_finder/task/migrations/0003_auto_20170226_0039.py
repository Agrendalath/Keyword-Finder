# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-02-26 00:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0002_task_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='results',
            field=models.TextField(null=True),
        ),
    ]
