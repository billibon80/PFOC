from django.db import models
from django.forms import ModelForm
from django.utils.safestring import mark_safe
from django.core.validators import MaxValueValidator
from django.forms.widgets import Select
from django import forms


class ViewOfSport(models.Model):
    """
    Create type of sport for block Preview
    """
    type_sport = models.CharField("Вид спорта/услуги", max_length=100)
    content = models.TextField("Описание", max_length=100, blank=True)
    imgAdd = models.ImageField("Добавить фото", default="pfoc.jpg", upload_to="tabs/")
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
                                help_text="""
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
    imgAdd = models.ImageField("Добавить фото", default="default.png", upload_to="coach_org/")

    # imgChoice = models.FilePathField("Выбрать фото", blank=True, path="coach_org/")

    class Meta:
        ordering = ["coach_surname"]
        verbose_name_plural = "Тренера"
        verbose_name = "Тренер"

    def __str__(self):
        coach_s = f' {self.coach_second_name[0].upper()}. ' if self.coach_second_name is not None else ''
        return f'{self.coach_surname.capitalize()} {self.coach_name[0].upper()}. {coach_s}'


class Organization(models.Model):
    """
    Create coach for block Preview
    """
    short_name = models.CharField("Краткое наименование", max_length=100)
    full_name = models.TextField("Полное наименование", null=True, blank=True, max_length=200)
    imgAdd = models.ImageField("Добавить фото", default="pfoc.jpg", upload_to="coach_org/")

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
        ordering = ["d_week", "coach", "group", "type_sport", "address"]
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
    imgAdd = models.ImageField("Добавить фото", default="pfoc.jpg", upload_to="object-photo/")

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
    icons = models.FileField("Иконка", blank=True, default="icons/city.svg", upload_to="icons/")
    color = models.CharField("Цвет", max_length=15, choices=COLOR, default="--city")
    link = models.SlugField("Интернет ссылка", max_length=160, null=True, blank=True, unique=True)
    imgAdd = models.FileField("Добавить медиа", default="video_obj/Skiing_-_2496.mp4", upload_to="video_obj/")
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
        exec(f'price_f_{i} = models.CharField("Стоимость полн. {i}", max_length=12, null=True, blank=True, '
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
        exec(f'price_l_{i} = models.CharField("Стоимость льгот. {i}", max_length=12, null=True, blank=True, '
             f'help_text="Льготная стоимость услуги за одну единицу, например: за 1,5ч, 2ч, 3ч")')
        exec(f'price_l_label_{i} = models.CharField("Стоим. льгот. {i} ед. изм.", max_length=5, null=True, blank=True, '
             f'help_text="Единица измерения оплачиваемого времени, например: р/ч, р/д")')

    imgAdd = models.ImageField("Добавить медиа", default="pfoc.jpg", upload_to="prices/")
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
    imgAdd = models.ImageField("Добавить фото обложки", default="pfoc.jpg", upload_to="news/")
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
    imgAdd = models.ImageField("Добавить фото", upload_to="managment/", default="default.png")

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
    imgAdd = models.ImageField("Добавить фото команды", upload_to="cup/", default="pfoc.jpg")
    # imgChoice = models.FilePathField("Выбрать фото", blank=True, path="cup/")
    imgAdd_award = models.ImageField("Добавить фото награды", default="pfoc.jpg", upload_to="cup_award/")

    # imgChoice_award = models.FilePathField("Выбрать фото награды", blank=True, path="cup/")

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["-id"]
        verbose_name = "Слайдер достижения"
        verbose_name_plural = "Слайдеры достижения"


class BadgesTeamListHeader(models.Model):
    """
    Create TeamListHeader
    """
    header_name = models.CharField("Имя", max_length=30, blank="")
    header_color = models.CharField("Цвет", max_length=30, default="#bbaaaa",
                                    help_text=mark_safe("<a target='_blank' rel='noopener noreferrer'"
                                                        "href='https://www.w3.org/wiki/CSS/Properties/color/keywords'>"
                                                        "Выбор CSS цвета</a>")
                                    )
    header_number_column = models.CharField("Колонка нумерации", max_length=2, default="#")
    header_logo_column = models.CharField("Колонка логотипа", max_length=6, default="logo")
    header_name_column = models.CharField("Колонка имени", max_length=15, default="команда")
    header_place_columnIcon = models.ImageField("Колонка место (значок)", default="place.png",
                                                upload_to="icons/", )
    header_place_columnTxt = models.CharField("Колонка место (текст)", max_length=2, blank=True,
                                              help_text="при вводе текста значок отображаться не будет")
    header_points_column = models.CharField("Колонка oчки", max_length=6, default="очки")

    def __str__(self):
        return self.header_name

    class Meta:
        ordering = ["header_name"]
        verbose_name = "Шапка турнирной таблицы"
        verbose_name_plural = "Шапки турнирных таблиц"


class Badges(models.Model):
    """
    Create block badges main block
    """

    COLOR = (
        ("yellow", 'yellow'),
        ("orange", 'orange'),
        ("pink", 'pink'),
        ("red", 'red'),
        ("purple", 'purple'),
        ("blue", 'blue'),
        ("blue-dark", 'blue-dark'),
        ("green", 'green'),
        ("green-dark", 'green-dark'),
        ("silver", 'silver'),
        ("gold", 'gold')
    )

    tournament = models.CharField('Турнир', max_length=10, default='-')
    run_string = models.TextField('Бегущая строка', default="Партизанский ФОЦ")
    run_time = models.IntegerField('Время прокрутки', validators=[MaxValueValidator(200)], default=30)
    publish = models.BooleanField("Опубликовать", default=True)
    color = models.CharField('Цвет иконки', max_length=12, choices=COLOR, default="gold")
    fa_icon = models.CharField("Значок иконки", max_length=100,
                               default='<i class="fas fa-question"></i>',
                               help_text=mark_safe("<a target='_blank' rel='noopener noreferrer'"
                                                   "href='https://fontawesome.com/v5/search?m=free'>"
                                                   "Выбор HTML иконки</a>"))
    list_header = models.ForeignKey(BadgesTeamListHeader, on_delete=models.SET_NULL,
                                    null=True, verbose_name="Заголовок таблицы")

    def __str__(self):
        return self.tournament

    class Meta:
        ordering = ["-id", "publish"]
        verbose_name = "Турнир"
        verbose_name_plural = "Турниры"


class BadgesTeamList(models.Model):
    """
    Create TeamList
    """
    turner = models.ForeignKey(Badges, on_delete=models.SET_NULL, verbose_name="Выбирите турнир для участия",
                               null=True)
    name = models.CharField("Название команды/игрока", max_length=20, default="Player")
    color = models.CharField("Цвет команды/игрока", max_length=30, default="#bbaaaa",
                             help_text=mark_safe("<a target='_blank' rel='noopener noreferrer'"
                                                 "href='https://www.w3.org/wiki/CSS/Properties/color/keywords'>"
                                                 "Выбор CSS цвета</a>")
                             )
    description = models.TextField("Описание команды/игрока", max_length=300, default="Описание отсутствует")
    position = models.IntegerField("Номер команды", validators=[MaxValueValidator(99)], default="0")
    logo = models.ImageField("Эмблема команды", default="pfoc.jpg", upload_to="icons/")
    place = models.IntegerField("Место в турнирной таблице", validators=[MaxValueValidator(99)], default=0)
    points = models.FloatField("Количество очков, время", default=0)
    link_1 = models.CharField("Homepage", max_length=255, default='#')
    link_2 = models.CharField("Wiki", max_length=255, default='#')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["turner", "position"]
        verbose_name = "Команда (игрок)"
        verbose_name_plural = "Команды (игроки)"


class TeamInfoGameStage(models.Model):
    name = models.CharField("Этап", max_length=40)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
        verbose_name = "Этап"
        verbose_name_plural = "Этапы"


class TeamInfoGames(models.Model):
    turner = models.ForeignKey(Badges, verbose_name="Турнир", on_delete=models.SET_NULL, null=True, blank=True)
    badgesTeam = models.ForeignKey(BadgesTeamList, related_name="team", on_delete=models.CASCADE,
                                   verbose_name="Команда(игрок)")
    enemyTeam = models.ForeignKey(BadgesTeamList, related_name="enemy_team", on_delete=models.CASCADE,
                                  verbose_name="Команда(игрок) противник", blank=True, null=True)
    stage = models.ForeignKey(TeamInfoGameStage, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Этап")
    description = models.CharField("Примечания (результат)", max_length=55,
                                   help_text="Например: счет 1:0", default="-")
    first_team_win = models.BooleanField(verbose_name="Win pl.", default=False)
    second_team_win = models.BooleanField(verbose_name="Win en.", default=False)

    def __str__(self):
        return f"Турнир:{self.turner.tournament.upper() if self.turner else '-'} " \
               f"Соперники: {self.badgesTeam.name.upper() if self.badgesTeam else '-'} vs " \
               f"{self.enemyTeam.name.upper() if self.enemyTeam else '-'}" \
               f" Этап: {self.stage.name.upper() if self.stage else '-'}"

    class Meta:
        ordering = ['turner']
        verbose_name = "Таблица игры"
        verbose_name_plural = "Таблицы игр"


class TeamInfoPlayers(models.Model):
    """
    Create member of team
    """

    team = models.ForeignKey(BadgesTeamList, on_delete=models.CASCADE, verbose_name="Выберите команду участника")
    name = models.CharField("Имя игрока", max_length=20, default="Иванов И.И.")
    position = models.IntegerField("Номер игрока", validators=[MaxValueValidator(99)], default="0")
    charInfo = models.CharField("Буквенный символ", max_length=3, default=" ", blank=True)
    logo = models.ImageField("Фото игрока", default="default.png", upload_to="coach_org/")
    description = models.TextField("Информация об игроке", max_length=300, default="информация отсутствует")
    link_1 = models.CharField("Homepage", max_length=255, default='#')
    link_2 = models.CharField("Wiki", max_length=255, default='#')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["team", "position"]
        verbose_name = "Карточка игрока"
        verbose_name_plural = "Карточки игроков"


class Banners(models.Model):
    """
    Create banners
    """

    name = models.CharField("Имя баннера", max_length=20, default="img banners")
    link_1 = models.CharField("Ссылка на страницу баннера", max_length=255, default='#')
    position = models.IntegerField("Позиция в ленте", validators=[MaxValueValidator(99)], default="0")
    publish = models.BooleanField("Опубликовать", default=True)
    imgAdd = models.ImageField("Добавить фото", upload_to="banner_img/", default="pfoc.jpg", blank=True)
    imgLink = models.CharField("Ссылка на банер", max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['position']
        verbose_name = "Банер"
        verbose_name_plural = "Банеры"


class Rules(models.Model):
    """
    Create page rules
    """
    name = models.CharField("Короткое имя", max_length=40, default="Правило")
    title = models.CharField("Описание правила", max_length=250, null=True)
    description = models.TextField("Содержание правила", null=True, default="")
    publish = models.BooleanField("Опубликовать", default=True)
    imgAdd = models.ImageField("Добавить фото", upload_to="banner_img/", default="pfoc.jpg", blank=True)
    position = models.IntegerField("Позиция правила", validators=[MaxValueValidator(99)], default="99")

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = "Правило"
        verbose_name_plural = "Правила"
