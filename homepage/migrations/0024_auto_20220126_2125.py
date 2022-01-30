# Generated by Django 3.2.8 on 2022-01-26 18:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0023_auto_20220126_2010'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='timelistcoach',
            options={'ordering': ['coach', 'group', 'd_week', 'type_sport', 'address'], 'verbose_name': 'Расписание тренера', 'verbose_name_plural': 'Расписание тренеров'},
        ),
        migrations.AddField(
            model_name='organization',
            name='imgAdd',
            field=models.ImageField(blank=True, upload_to='staticfiles/img/coach_org', verbose_name='Добавить фото'),
        ),
        migrations.AddField(
            model_name='organization',
            name='imgChoice',
            field=models.FilePathField(blank=True, path='staticfiles/img/coach_org', verbose_name='Выбрать фото'),
        ),
        migrations.AddField(
            model_name='viewofsport',
            name='content',
            field=models.CharField(blank=True, max_length=100, verbose_name='Описание'),
        ),
        migrations.AddField(
            model_name='viewofsport',
            name='imgAdd',
            field=models.ImageField(blank=True, upload_to='staticfiles/img/tabs', verbose_name='Добавить фото'),
        ),
        migrations.AddField(
            model_name='viewofsport',
            name='imgChoice',
            field=models.FilePathField(blank=True, path='staticfiles/img/tabs', verbose_name='Выбрать фото'),
        ),
    ]
