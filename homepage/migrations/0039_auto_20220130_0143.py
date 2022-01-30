# Generated by Django 3.2.8 on 2022-01-29 22:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0038_auto_20220130_0120'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cardsprices',
            name='price_f',
            field=models.CharField(blank=True, help_text='Полная стоимость услуги за одну единицу, например: за 1ч, 1д, 1с', max_length=7, null=True, verbose_name='Полная стоимость'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_f_label',
            field=models.CharField(blank=True, help_text='Единица измерения оплачиваемого времени, например: р/ч, р/д', max_length=5, null=True, verbose_name='Ярлык полной стоимости'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_f_label_2',
            field=models.CharField(blank=True, help_text='Единица измерения оплачиваемого времени, например: р/ч, р/д', max_length=5, null=True, verbose_name='Стоим. полн. 2 ед. изм.'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_f_label_3',
            field=models.CharField(blank=True, help_text='Единица измерения оплачиваемого времени, например: р/ч, р/д', max_length=5, null=True, verbose_name='Стоим. полн. 3 ед. изм.'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_f_label_4',
            field=models.CharField(blank=True, help_text='Единица измерения оплачиваемого времени, например: р/ч, р/д', max_length=5, null=True, verbose_name='Стоим. полн. 4 ед. изм.'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_l',
            field=models.CharField(blank=True, help_text='Льготная стоимость услуги за одну единицу, например: за 1ч, 1д, 1с', max_length=7, null=True, verbose_name='Льготная стоимость'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_l_label',
            field=models.CharField(blank=True, help_text='Единица измерения оплачиваемого времени, например: р/ч, р/д', max_length=5, null=True, verbose_name='Ярлык льготной стоимости'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_l_label_2',
            field=models.CharField(blank=True, help_text='Единица измерения оплачиваемого времени, например: р/ч, р/д', max_length=5, null=True, verbose_name='Стоим. льгот. 2 ед. изм.'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_l_label_3',
            field=models.CharField(blank=True, help_text='Единица измерения оплачиваемого времени, например: р/ч, р/д', max_length=5, null=True, verbose_name='Стоим. льгот. 3 ед. изм.'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_l_label_4',
            field=models.CharField(blank=True, help_text='Единица измерения оплачиваемого времени, например: р/ч, р/д', max_length=5, null=True, verbose_name='Стоим. льгот. 4 ед. изм.'),
        ),
    ]
