# Generated by Django 3.2.8 on 2022-01-26 13:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0015_auto_20220126_1556'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coach',
            name='imgAdd',
            field=models.ImageField(blank=True, upload_to='staticfiles/img/coach_org', verbose_name='Добавить фото'),
        ),
    ]