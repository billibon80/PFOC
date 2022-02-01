# Generated by Django 3.2.8 on 2022-01-26 16:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0019_auto_20220126_1827'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='timelistcoach',
            options={'verbose_name': 'Расписание тренера', 'verbose_name_plural': 'Расписание тренеров'},
        ),
        migrations.RemoveField(
            model_name='timelistcoach',
            name='d_week',
        ),
        migrations.AddField(
            model_name='objectaddres',
            name='data_map',
            field=models.CharField(blank=True, max_length=40, verbose_name='data-map'),
        ),
        migrations.AddField(
            model_name='timelistcoach',
            name='address',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='homepage.objectaddres', verbose_name='Адрес'),
        ),
    ]