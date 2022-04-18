from django.db import models
from django.conf import settings
from django.utils import timezone
from django.urls import reverse
import uuid
from django.contrib.auth.models import User


class ViewOfSport(models.Model):
    """
    Create type of sport for block Preview
    """
    type_sport = models.CharField("Вид спорта/услуги", max_length=100)
    content = models.TextField("Описание", max_length=100, blank=True)
    imgAdd = models.ImageField("Добавить фото", blank=True, upload_to="tabs/")
    rang = models.IntegerField("Позиция", null=True, blank=True, help_text="Позиция на странице", default=99)
    # imgChoice = models.FilePathField("Выбрать фото", blank=True, path="tabs/")

    class Meta:
        ordering = ["type_sport", "rang"]
        verbose_name_plural = "Виды спорта"
        verbose_name = "Вид спорта"

    def __str__(self):
        return self.type_sport.capitalize()


class ObjectAddres(models.Model):
    """
    Address of object
    """
    address = models.CharField("Адрес объекта", max_length=100, default='-')
    data_map = models.CharField("data-map", max_length=40, blank=True, null=True,
                                help_text= """
                                пер. Уральский, 9 - uralski, ул. Ваупшасова, 46 - vaupshasova,
                                ул. Связистов, 6 - sviazistov, ул. Столетова, 1 - stoletova
                                """)
    phone = models.CharField("Телефон", max_length=20, null=True, blank=True)
    publish = models.BooleanField("Опубликовать", help_text="разместить контакты в footer", default=True)
    description = models.TextField("Описание", blank=True, default='-')

    class Meta:
        ordering = ["address"]
        verbose_name_plural = "Адреса объектов"
        verbose_name = "Адрес объекта"

    def __str__(self):
        return self.address


class Group(models.Model):
    """
    Group of participant
    """
    group = models.CharField("Группа", max_length=5)

    class Meta:
        ordering = ["group"]
        verbose_name_plural = "Группа"
        verbose_name = "Группы ПФОЦ"

    def __str__(self):
        return self.group


class Coach(models.Model):
    """
    Create coach for block Preview
    """
    coach_surname = models.CharField("Фамилия", max_length=100)
    coach_name = models.CharField("Имя", max_length=100)
    coach_second_name = models.CharField("Отчество", null=True, blank=True, max_length=100)
    imgAdd = models.ImageField("Добавить фото", blank=True, upload_to="coach_org/")
    # imgChoice = models.FilePathField("Выбрать фото", blank=True, path="coach_org/")

    class Meta:
        ordering = ["coach_surname"]
        verbose_name_plural = "Тренера"
        verbose_name = "Тренер"

    def __str__(self):
        coach_s = f' {self.coach_second_name[0].upper()}. ' if self.coach_second_name is not None else ''
        return f'{self.coach_surname.capitalize()} {self.coach_name[0].upper()}. {coach_s}. '


class Organization(models.Model):
    """
    Create coach for block Preview
    """
    short_name = models.CharField("Краткое наименование", max_length=100)
    full_name = models.TextField("Полное наименование", null=True, blank=True, max_length=200)
    imgAdd = models.ImageField("Добавить фото", blank=True, upload_to="coach_org/")
    # imgChoice = models.FilePathField("Выбрать фото", blank=True, path="coach_org/")

    class Meta:
        ordering = ["short_name"]
        verbose_name_plural = "Организации"
        verbose_name = "Организация"

    def __str__(self):
        return self.short_name


class TimeListCoach(models.Model):
    """
    Create model Tabs for coach
    """

    DAY_WEEK = (
        ("0", "Понедельник"),
        ("1", "Вторник"),
        ("2", "Среда"),
        ("3", "Четверг"),
        ("4", "Пятница"),
        ("5", "Суббота"),
        ("6", "Воскресенье"),
        ("7", "-")
    )
    d_week = models.CharField("День недели", max_length=11, choices=DAY_WEEK, default=7)
    type_sport = models.ForeignKey(ViewOfSport, on_delete=models.SET_NULL, null=True, verbose_name="Вид спорта")
    coach = models.ForeignKey(Coach, on_delete=models.CASCADE, null=True, verbose_name="Тренер")
    group = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True, blank=True)
    time_list = models.TextField("Расписание", max_length=200, blank=True)
    address = models.ForeignKey(ObjectAddres, on_delete=models.SET_NULL, null=True, verbose_name="Адрес")

    def __str__(self):
        return str(self.coach)

    class Meta:
        ordering = ["coach", "group", "d_week", "type_sport", "address"]
        verbose_name = "Расписание тренера"
        verbose_name_plural = "Расписание тренеров"


class TimeListOrganization(models.Model):
    """
    Create model Tabs for organization
    """

    DAY_WEEK = (
        ("0", "Понедельник"),
        ("1", "Вторник"),
        ("2", "Среда"),
        ("3", "Четверг"),
        ("4", "Пятница"),
        ("5", "Суббота"),
        ("6", "Воскресенье"),
        ("7", "-")
    )
    d_week = models.CharField("День недели", max_length=11, choices=DAY_WEEK, default=7)
    type_sport = models.ForeignKey(ViewOfSport, on_delete=models.SET_NULL, null=True, verbose_name="Вид спорта")
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, null=True, verbose_name="Организация")
    time_list = models.TextField("Расписание", max_length=200, blank=True)
    address = models.ForeignKey(ObjectAddres, on_delete=models.SET_NULL, null=True, verbose_name="Адрес")

    def __str__(self):
        return str(self.organization)

    class Meta:
        ordering = ["organization", "d_week", "type_sport", "address"]
        verbose_name = "Расписание организаций"
        verbose_name_plural = "Расписание организации"


class SliderViewsOfSport(models.Model):
    """
    Create slider in the block views of sport
    """
    rang = models.IntegerField("Позиция", null=True, blank=True, help_text="Позиция в слайдере объекта", default=99)
    type_sport = models.ForeignKey(ViewOfSport, on_delete=models.SET_NULL, null=True, verbose_name="Вид спорта")
    left_block = models.CharField("Левый блок", max_length=50, null=True, blank=True, default="")
    title = models.CharField("Заголовок", max_length=50, null=True, blank=True, default="")
    sign = models.CharField("Подпись", max_length=50, null=True, blank=True, default="")
    content = models.TextField("Текст", max_length=200, null=True, blank=True, default="")
    bottom_block = models.CharField("Нижний блок", max_length=20, null=True, blank=True, default="")
    imgAdd = models.ImageField("Добавить фото", blank=True, upload_to="object-photo/")
    # imgChoice = models.FilePathField("Выбрать фото", blank=True, path="object-photo/")

    def __str__(self):
        return '{0} :  {1} '.format(self.type_sport, self.title)

    class Meta:
        ordering = ["type_sport", "rang"]
        verbose_name = "Слайд вид спорта"
        verbose_name_plural = "Слайды виды спорта"


class CardsObject(models.Model):
    """
    Create card object in block Object & price
    """

    COLOR = (
        ("--city", "малиновый"),
        ("--ski", "голубой"),
        ("--beach", "оранжевый"),
        ("--camping", "зеленый")
    )

    obj = models.OneToOneField(ObjectAddres, on_delete=models.CASCADE, primary_key=True, verbose_name="Адрес Объекта")
    front_title = models.CharField("Лицевой заголовок", max_length=50, null=True)
    front_text = models.CharField("Лицевой текст", max_length=30, null=True)
    inside_title = models.CharField("Внутренний заголовок", max_length=35, null=True)
    inside_text = models.TextField("Внутренний текст", max_length=110, null=True)
    icons = models.FileField("Иконка", blank=True, upload_to="icons/")
    color = models.CharField("Цвет", max_length=15, choices=COLOR, default="--city")
    link = models.SlugField("Интернет ссылка", max_length=160, null=True, blank=True, unique=True)
    imgAdd = models.FileField("Добавить медиа", blank=True, upload_to="video_obj/")
    # imgChoice = models.FilePathField("Выбрать медиа", blank=True, path="card_obj/")
    t_work_wd = models.CharField("Рабочие дни", max_length=60, null=True)
    t_work_wh = models.CharField("Время работы рабочие дни", max_length=60, null=True)
    t_work_hd = models.CharField("Выходные дни", max_length=60, null=True)
    t_work_hh = models.CharField("Время работы выходные дни", max_length=60, null=True)
    publish = models.BooleanField("Опубликовать", help_text="опубликовать карточку на сайте", default=True)

    def __str__(self):
        return self.obj.address

    class Meta:
        ordering = ["obj"]
        verbose_name = "Карточка объекта"
        verbose_name_plural = "Карточки объектов"


class CardsPrices(models.Model):
    """
    Create prices block for modals Object & price
    """

    obj = models.ForeignKey(ObjectAddres, on_delete=models.SET_NULL, null=True, verbose_name="Объект")
    title = models.CharField("Наименование услуги", max_length=50, null=True, default='-')
    description = models.TextField("Описание услуги", max_length=300, null=True,
                                   help_text="Например: что входит в стоимость услуги")
    price_f_color = models.CharField("Особый текст", max_length=12, null=True, blank=True, default="",
                                     help_text="Текст под полной стоимостью будет выделен красным цветом")
    price_f = models.CharField("Полная стоимость", max_length=7, null=True, blank=True,
                               help_text="Полная стоимость услуги за одну единицу, например: за 1ч, 1д, 1с")
    price_f_label = models.CharField("Ярлык полной стоимости", max_length=5, null=True, blank=True, default="р/ч",
                                     help_text="Единица измерения оплачиваемого времени, например: р/ч, р/д")

    for i in range(2, 5):
        exec(f'price_f_{i} = models.CharField("Стоимость полн. {i}", max_length=7, null=True, blank=True, '
             f'help_text="Полная стоимость услуги за одну единицу, например: за 1,5ч, 2ч, 3ч")')

        exec(f'price_f_label_{i} = models.CharField("Стоим. полн. {i} ед. изм.", max_length=5, null=True, blank=True, '
             f'help_text="Единица измерения оплачиваемого времени, например: р/ч, р/д")')

    price_l_color = models.CharField("Особый текст", max_length=12, null=True, default="льготный", blank=True,
                                     help_text="Текст под льготной стоимостью будет выделен красным цветом")
    price_l = models.CharField("Льготная стоимость", max_length=7, null=True, blank=True,
                               help_text="Льготная стоимость услуги за одну единицу, например: за 1ч, 1д, 1с")
    price_l_label = models.CharField("Ярлык льготной стоимости", max_length=5, null=True, blank=True, default="р/ч",
                                     help_text="Единица измерения оплачиваемого времени, например: р/ч, р/д")
    publish = models.BooleanField("Опубликовать", default=True)

    for i in range(2, 5):
        exec(f'price_l_{i} = models.CharField("Стоимость льгот. {i}", max_length=7, null=True, blank=True, '
             f'help_text="Льготная стоимость услуги за одну единицу, например: за 1,5ч, 2ч, 3ч")')
        exec(f'price_l_label_{i} = models.CharField("Стоим. льгот. {i} ед. изм.", max_length=5, null=True, blank=True, '
             f'help_text="Единица измерения оплачиваемого времени, например: р/ч, р/д")')

    imgAdd = models.ImageField("Добавить медиа", blank=True, upload_to="prices/")
    rang = models.IntegerField("Ранг", null=True, blank=True, help_text="Позиция в прайсе", default=99)
    # imgChoice = models.FilePathField("Выбрать медиа", blank=True, path="prices/")

    def __str__(self):
        return self.title.upper()

    class Meta:
        ordering = ["obj", "rang"]
        verbose_name = "Стоимость услуги"
        verbose_name_plural = "Прайсы на услуги"


class News(models.Model):
    """
    Create  block news
    """

    front_title = models.CharField("Фронтальный заголовок", max_length=50, null=True)
    title = models.CharField("Заголовок статьи", max_length=50, null=True)
    content = models.TextField("Релиз", max_length=765, null=True)
    publish = models.BooleanField("Опубликовать", default=True)
    imgAdd = models.ImageField("Добавить фото обложки", blank=True, upload_to="news/")
    rang = models.IntegerField("Позиция", null=True, blank=True, help_text="Позиция в блоке новости", default=99)
    description = models.TextField("Статья", blank=True, default='')
    # imgChoice = models.FilePathField("Выбрать фото", blank=True, path="news/")

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["rang", "publish"]
        verbose_name = "Новость"
        verbose_name_plural = "Новости"


class Contact(models.Model):
    """
    Create  block contact
    """

    position = models.CharField("Должность", max_length=15, null=True)
    name = models.CharField("ФИО", max_length=30, null=True)
    rang = models.IntegerField("Ранг", null=True, blank=True, help_text="Позиция в блоке контакты", default=99)
    phone = models.CharField("Телефон", max_length=20, null=True)
    fax = models.CharField("Факс", max_length=20, null=True, blank=True)
    email = models.EmailField(max_length=254, blank=True)
    content = models.CharField("Примечания", max_length=100, null=True, blank=True)
    publish = models.BooleanField("Опубликовать", default=True)
    imgAdd = models.ImageField("Добавить фото", blank=True, upload_to="managment/")
    # imgChoice = models.FilePathField("Выбрать фото", blank=True, path="managment/")

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["rang"]
        verbose_name = "Руководство контакт"
        verbose_name_plural = "Руководство контакты"


class Achieves(models.Model):
    """
    Create  block our achieves
    """

    title = models.CharField("Заголовок", max_length=35, null=True, default="-")
    description = models.TextField("Описание", max_length=100, null=True, default='-')
    publish = models.BooleanField("Опубликовать", default=True)
    imgAdd = models.ImageField("Добавить фото команды", blank=True, upload_to="cup/")
    # imgChoice = models.FilePathField("Выбрать фото", blank=True, path="cup/")
    imgAdd_award = models.ImageField("Добавить фото награды", blank=True, upload_to="cup_award/")
    # imgChoice_award = models.FilePathField("Выбрать фото награды", blank=True, path="cup/")

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["-id"]
        verbose_name = "Слайдер достижения"
        verbose_name_plural = "Слайдеры достижения"

