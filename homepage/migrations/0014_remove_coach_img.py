# Generated by Django 3.2.8 on 2022-01-26 12:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0013_alter_coach_img'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='coach',
            name='img',
        ),
    ]
