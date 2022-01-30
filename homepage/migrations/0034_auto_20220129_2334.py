# Generated by Django 3.2.8 on 2022-01-29 20:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0033_cardsobject_cardsprices'),
    ]

    operations = [
        migrations.AddField(
            model_name='cardsprices',
            name='price_l_1',
            field=models.CharField(max_length=7, null=True, verbose_name='Стоимость льгот. 1'),
        ),
        migrations.AddField(
            model_name='cardsprices',
            name='price_l_2',
            field=models.CharField(max_length=7, null=True, verbose_name='Стоимость льгот. 2'),
        ),
        migrations.AddField(
            model_name='cardsprices',
            name='price_l_3',
            field=models.CharField(max_length=7, null=True, verbose_name='Стоимость льгот. 3'),
        ),
        migrations.AddField(
            model_name='cardsprices',
            name='price_l_4',
            field=models.CharField(max_length=7, null=True, verbose_name='Стоимость льгот. 4'),
        ),
        migrations.AddField(
            model_name='cardsprices',
            name='price_l_5',
            field=models.CharField(max_length=7, null=True, verbose_name='Стоимость льгот. 5'),
        ),
        migrations.AddField(
            model_name='cardsprices',
            name='price_l_color',
            field=models.CharField(max_length=10, null=True, verbose_name='Выделенный текст (напр. льготный)'),
        ),
        migrations.AddField(
            model_name='cardsprices',
            name='price_l_label_1',
            field=models.CharField(max_length=5, null=True, verbose_name='Стоим. льгот. 1 ед. изм.'),
        ),
        migrations.AddField(
            model_name='cardsprices',
            name='price_l_label_2',
            field=models.CharField(max_length=5, null=True, verbose_name='Стоим. льгот. 2 ед. изм.'),
        ),
        migrations.AddField(
            model_name='cardsprices',
            name='price_l_label_3',
            field=models.CharField(max_length=5, null=True, verbose_name='Стоим. льгот. 3 ед. изм.'),
        ),
        migrations.AddField(
            model_name='cardsprices',
            name='price_l_label_4',
            field=models.CharField(max_length=5, null=True, verbose_name='Стоим. льгот. 4 ед. изм.'),
        ),
        migrations.AddField(
            model_name='cardsprices',
            name='price_l_label_5',
            field=models.CharField(max_length=5, null=True, verbose_name='Стоим. льгот. 5 ед. изм.'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='obj',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='homepage.objectaddres', verbose_name='Объект'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_f_color',
            field=models.CharField(max_length=10, null=True, verbose_name='Выделенный текст (напр. льготный)'),
        ),
    ]
