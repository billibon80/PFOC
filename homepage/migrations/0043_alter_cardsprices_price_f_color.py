# Generated by Django 3.2.8 on 2022-01-30 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0042_cardsobject_color'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cardsprices',
            name='price_f_color',
            field=models.CharField(blank=True, default='', help_text='Текст под полной стоимостью будет выделен красным цветом', max_length=12, null=True, verbose_name='Особый текст'),
        ),
    ]
