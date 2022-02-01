# Generated by Django 3.2.8 on 2022-01-29 20:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0034_auto_20220129_2334'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cardsprices',
            name='price_f_5',
        ),
        migrations.RemoveField(
            model_name='cardsprices',
            name='price_f_label_5',
        ),
        migrations.RemoveField(
            model_name='cardsprices',
            name='price_l_5',
        ),
        migrations.RemoveField(
            model_name='cardsprices',
            name='price_l_label_5',
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='description',
            field=models.TextField(max_length=300, null=True, verbose_name='Описание услуги (напр. что входит в стоим.)'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_f_1',
            field=models.CharField(blank=True, max_length=7, null=True, verbose_name='Стоимость полн. 1'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_f_2',
            field=models.CharField(blank=True, max_length=7, null=True, verbose_name='Стоимость полн. 2'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_f_3',
            field=models.CharField(blank=True, max_length=7, null=True, verbose_name='Стоимость полн. 3'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_f_4',
            field=models.CharField(blank=True, max_length=7, null=True, verbose_name='Стоимость полн. 4'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_f_color',
            field=models.CharField(max_length=10, null=True, verbose_name='Красный текст (напр. льготный)'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_f_label_1',
            field=models.CharField(blank=True, max_length=5, null=True, verbose_name='Стоим. полн. 1 ед. изм.'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_f_label_2',
            field=models.CharField(blank=True, max_length=5, null=True, verbose_name='Стоим. полн. 2 ед. изм.'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_f_label_3',
            field=models.CharField(blank=True, max_length=5, null=True, verbose_name='Стоим. полн. 3 ед. изм.'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_f_label_4',
            field=models.CharField(blank=True, max_length=5, null=True, verbose_name='Стоим. полн. 4 ед. изм.'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_l_1',
            field=models.CharField(blank=True, max_length=7, null=True, verbose_name='Стоимость льгот. 1'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_l_2',
            field=models.CharField(blank=True, max_length=7, null=True, verbose_name='Стоимость льгот. 2'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_l_3',
            field=models.CharField(blank=True, max_length=7, null=True, verbose_name='Стоимость льгот. 3'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_l_4',
            field=models.CharField(blank=True, max_length=7, null=True, verbose_name='Стоимость льгот. 4'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_l_color',
            field=models.CharField(max_length=10, null=True, verbose_name='Красный текст (напр. льготный)'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_l_label_1',
            field=models.CharField(blank=True, max_length=5, null=True, verbose_name='Стоим. льгот. 1 ед. изм.'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_l_label_2',
            field=models.CharField(blank=True, max_length=5, null=True, verbose_name='Стоим. льгот. 2 ед. изм.'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_l_label_3',
            field=models.CharField(blank=True, max_length=5, null=True, verbose_name='Стоим. льгот. 3 ед. изм.'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='price_l_label_4',
            field=models.CharField(blank=True, max_length=5, null=True, verbose_name='Стоим. льгот. 4 ед. изм.'),
        ),
        migrations.AlterField(
            model_name='cardsprices',
            name='title',
            field=models.CharField(max_length=50, null=True, verbose_name='Наименование услуги'),
        ),
    ]