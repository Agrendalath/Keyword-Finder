# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-02-19 21:54
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='arguments',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='task',
            name='results',
            field=models.TextField(blank=True, null=True),
        ),
    ]