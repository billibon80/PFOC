# Generated by Django 3.2.8 on 2022-01-29 07:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0031_auto_20220129_1002'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sliderviewsofsport',
            name='content',
            field=models.TextField(max_length=200, null=True, verbose_name='Текст'),
        ),
    ]