# Generated by Django 3.2.8 on 2022-02-01 21:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0051_alter_achieves_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='objectaddres',
            name='phone',
            field=models.CharField(blank=True, max_length=20, null=True, verbose_name='Телефон'),
        ),
        migrations.AddField(
            model_name='objectaddres',
            name='publish',
            field=models.BooleanField(default=False, help_text='разместить контакты в footer', verbose_name='Опубликовать'),
        ),
        migrations.AlterField(
            model_name='achieves',
            name='description',
            field=models.TextField(max_length=100, null=True, verbose_name='Описание'),
        ),
        migrations.AlterField(
            model_name='achieves',
            name='title',
            field=models.CharField(max_length=35, null=True, verbose_name='Заголовок'),
        ),
        migrations.AlterField(
            model_name='objectaddres',
            name='data_map',
            field=models.CharField(blank=True, max_length=40, null=True, verbose_name='data-map'),
        ),
    ]