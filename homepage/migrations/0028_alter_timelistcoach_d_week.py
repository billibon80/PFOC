# Generated by Django 3.2.8 on 2022-01-27 22:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0027_auto_20220128_0106'),
    ]

    operations = [
        migrations.AlterField(
            model_name='timelistcoach',
            name='d_week',
            field=models.CharField(choices=[('0', 'Понедельник'), ('1', 'Вторник'), ('2', 'Среда'), ('3', 'Четверг'), ('4', 'Пятница'), ('5', 'Суббота'), ('6', 'Воскресенье')], default=0, max_length=11, verbose_name='День недели'),
        ),
    ]
