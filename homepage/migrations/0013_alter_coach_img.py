# Generated by Django 3.2.8 on 2022-01-26 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0012_remove_coach_imgpath'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coach',
            name='img',
            field=models.FileField(blank=True, upload_to='staticfiles/img/coach_org', verbose_name='Добавить фото'),
        ),
    ]