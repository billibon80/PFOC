# Generated by Django 3.2.8 on 2022-02-02 13:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0056_auto_20220202_1638'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contact',
            name='rang',
            field=models.IntegerField(blank=True, default=99, help_text='Позиция в блоке контакты', null=True, verbose_name='Ранг'),
        ),
    ]
