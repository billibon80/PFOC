# Generated by Django 3.2.8 on 2022-01-26 12:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0010_auto_20220126_1532'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coach',
            name='imgPath',
            field=models.FilePathField(path='/assets/img/coach_org'),
        ),
    ]
