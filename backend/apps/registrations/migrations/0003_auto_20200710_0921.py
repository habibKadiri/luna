# Generated by Django 3.0.3 on 2020-07-10 07:21

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('registrations', '0002_registration_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registration',
            name='code_expiration',
            field=models.DateTimeField(default=datetime.datetime(2020, 7, 12, 7, 21, 27, 524064, tzinfo=utc)),
        ),
    ]
