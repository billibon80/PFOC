from django.contrib import admin
from .models import *
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django import forms
from modeltranslation.admin import TranslationAdmin


class UserStaticFilesTranslation(TranslationAdmin):
    class Media:
        js = ('admin/user/js/user.js',
              '//use.fontawesome.com/releases/v5.15.3/js/all.js ',)
        css = {
            "all": ('admin/user/css/user.css',)
        }


@admin.register(CardsPrices)
class PriceAdmin(UserStaticFilesTranslation):
    list_display = ['title', 'obj', 'get_image', 'description', 'price_f', 'price_l', 'rang', 'publish']
    search_fields = ['^title']
    list_filter = ['title', 'obj']
    ordering = ['obj']
    actions = ['duplicate_event']
    save_as = True
    save_on_top = True
    readonly_fields = ['get_image', 'get_block_price']
    list_editable = ['publish', 'rang']

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.imgAdd.url} width="50" height="50" ')

    get_image.short_description = "Фото"

    def get_block_price(self, obj):
        return mark_safe(
            '<div class="style_prevu_kit" >'
            '<div class ="row wrapper shadow">'\
                '<div class ="col-6" >'\
                    f'<div id="img_price" class ="img-price" style="background: center center url({obj.imgAdd.url});" > </div >'\
                    f'<h3 class ="style_prevu_kit__title" > {obj.title} </h3>'\
                    f'<span class ="description" > {obj.description} </span>'\
                '</div>'\
                '<div class ="col-3" >'\
                    '<div class ="wrapper__price" >'\
                    f'<span class ="wrapper__price__u wrapper__price__u--blue" data-for-id="id_price_f"> {obj.price_f} </span >'\
                    f'<span class ="wrapper__price__d wrapper__price__d--blue" data-for-id="id_price_f_label">{obj.price_f_label}</span >'\
                    f'<span class ="pref" data-for-id="id_price_f_color_ru" data-for-id="id_price_f_color_ru" >{obj.price_f_color} </span >'\
                    f'<span class ="hour-price" data-price="{obj.price_f_2}"  data-for-id="id_price_f_2" > {obj.price_f_label_2}</span >'\
                    f'<span class ="hour-price" data-price="{obj.price_f_3}"  data-for-id="id_price_f_3" > {obj.price_f_label_3}</span >'\
                    f'<span class ="hour-price" data-price="{obj.price_f_4}"  data-for-id="id_price_f_4" >  {obj.price_f_label_4}</span >'\
                    '</div >'\
                    '</div >'\
                    '<div class ="col-3" >'\
                    '<div class ="wrapper__price" >'\
                    f'<span class ="wrapper__price__u wrapper__price__u--orange" data-for-id="id_price_l">{obj.price_l} </span >'\
                    f'<span class ="wrapper__price__d wrapper__price__d--orange" data-for-id="id_price_l_label">{obj.price_l_label}</span  >'\
                   f' <span class ="pref" data-for-id="id_price_l_color_ru">{obj.price_l_color} </span >'\
                    f'<span class ="hour-price" data-price="{obj.price_l_2}" data-for-id="id_price_l_2">{obj.price_l_label_2}</span >'\
                    f'<span class ="hour-price" data-price="{obj.price_l_3}" data-for-id="id_price_l_3">{obj.price_l_label_3}</span >'\
                    f'<span class ="hour-price" data-price="{obj.price_l_4}" data-for-id="id_price_l_4">{obj.price_l_label_4} </span >'\
                    '</div >'\
                 '</div >'\
            '</div>'\
            '</div>'
    )

    get_block_price.short_description = ''

    fieldsets = (
        (None, {
            'fields': (('rang', 'obj',), 'publish')
        }),
        (None, {
            'fields': ('title', )
        }),
        (None, {
            'fields': (('description_ru', 'description_en'),)
        }),
        (None, {
            'fields': ('get_block_price',)
        }),
        ('Полная стоимость', {
            'classes': ('collapse',),
            'fields': (
                'price_f_color',
                ('price_f', 'price_f_label'),
                ('price_f_2', 'price_f_label_2'),
                ('price_f_3', 'price_f_label_3'),
                ('price_f_4', 'price_f_label_4'),
            )
        }),
        ('Льготная стоимость', {
            'classes': ('collapse',),
            'fields': (
                'price_l_color',
                ('price_l', 'price_l_label'),
                ('price_l_2', 'price_l_label_2'),
                ('price_l_3', 'price_l_label_3'),
                ('price_l_4', 'price_l_label_4'),
            )
        }),
        ('Картинки', {
            'fields': (
                ('imgAdd', 'get_image'),
            )
        }),

    )

    def duplicate_event(self, request, queryset):
        for obj in queryset:
            obj.id = None
            obj.save()
        self.message_user(request, f'Элемент успешно скопирован')

    duplicate_event.short_description = "Копировать элемент"


@admin.register(CardsObject)
class CardsObjectAdmin(TranslationAdmin):
    list_display = ['obj', 't_work_wd', 't_work_wh', 't_work_hd', 't_work_hh', 'publish']
    list_editable = ['publish']
    ordering = ['obj']

    fieldsets = (
        (None, {
            'fields': (
                ('obj', 'icons', 'color'),
                ('front_title', 'front_text'),
                ('inside_title', 'inside_text'),
            )
        }),
        ('Медиа внутренняя сторона', {
            'fields': (
                'link',
                'imgAdd',
            )
        }),
        ('Время работы', {
            'fields': (
                ('t_work_wd', 't_work_wh'),
                ('t_work_hd', 't_work_hh'),
            )
        }),
        ('None', {
            'fields': ('publish',)
        })
    )


@admin.register(TimeListCoach)
class TimeListCoachAdmin(admin.ModelAdmin):
    list_display = ['d_week', 'coach', 'type_sport', 'group', 'time_list', 'address']
    list_display_links = ["coach"]
    list_filter = ['coach', 'group', 'type_sport']
    ordering = ['coach']
    actions = ['duplicate_event']

    fieldsets = (
        (None, {
            'fields': (('coach', 'type_sport'), ('d_week', 'group'))
        }),
        ('Расписание', {
            'fields': (
                'address',
                'time_list',
            )
        }),
    )

    def duplicate_event(self, request, queryset):
        for obj in queryset:
            obj.id = None
            obj.save()
        self.message_user(request, f'Элемент успешно скопирован')

    duplicate_event.short_description = "Копировать элемент"


@admin.register(TimeListOrganization)
class TimeListOrganizationAdmin(admin.ModelAdmin):
    list_display = ['organization', 'd_week', 'type_sport', 'time_list', 'address']
    list_filter = ['organization', 'type_sport', 'address']
    ordering = ['organization']
    actions = ['duplicate_event']

    fieldsets = [
        (None, {
            'fields': ('d_week', ('organization', 'type_sport'),)
        }),
        ('Расписание', {
            'fields': ('address', 'time_list',)}),
    ]

    def duplicate_event(self, request, queryset):
        for obj in queryset:
            obj.id = None
            obj.save()
        self.message_user(request, f'Расписание организации успешно скопирован')

    duplicate_event.short_description = "Копировать расписание"


class PostAdminFormNews(forms.ModelForm):
    description_ru = forms.CharField(label="Статья", widget=CKEditorUploadingWidget())
    description_en = forms.CharField(label="Статья_en", widget=CKEditorUploadingWidget())

    class Meta:
        model = News
        fields = '__all__'


@admin.register(News)
class NewsAdmin(TranslationAdmin):
    list_display = ['title', 'get_image', 'front_title', 'rang', 'publish']
    list_filter = ['publish']
    ordering = ['rang', '-publish', '-id']
    actions = ['publish_event', 'exclude_publish_event']
    list_editable = ['rang', 'publish']
    save_as = True
    readonly_fields = ['get_image']
    form = PostAdminFormNews

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.imgAdd.url} width="50" height="50" ')

    get_image.short_description = "Фото"

    fieldsets = [
        (None, {
            'fields': (
                'rang',
                ('title', 'front_title'),
                'content',
                'publish',
            )
        }),
        ('Фото обложки', {
            'fields': (
                ('imgAdd', 'get_image'),
            )
        }),
        ('Статья', {
            'fields': (
                ('description'),
            )
        }),
    ]

    def publish_event(self, request, queryset):
        row_update = queryset.update(publish=True)
        if row_update == 1:
            message_bit = "Выбранная статья опубликована"
        else:
            message_bit = "Выбранные статьи опубликованы"
        self.message_user(request, f'{message_bit}')

    publish_event.short_description = "Опубликовать выбранные статьи"
    publish_event.allowed_permissions = ('change',)

    def exclude_publish_event(self, request, queryset):
        row_update = queryset.update(publish=False)
        if row_update == 1:
            message_bit = "Выбранная статья снята с публикации"
        else:
            message_bit = "Выбранные статьи сняты с публикации"
        self.message_user(request, f'{message_bit}')

    exclude_publish_event.short_description = "Снять с публикации"
    exclude_publish_event.allowed_permissions = ('change',)


@admin.register(Contact)
class ContactAdmin(TranslationAdmin):
    list_display = ['name', 'get_image', 'position', 'phone', 'fax',
                    'email', 'content', 'publish']
    ordering = ['rang']
    actions = ['publish_event', 'exclude_publish_event']
    list_editable = ['phone', 'fax',
                     'email', 'content', 'publish']
    readonly_fields = ['get_image']

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.imgAdd.url} width="50" height="50" ')

    get_image.short_description = "Фото"

    fieldsets = [
        (None, {
            'fields': (
                ('name', 'position', 'rang'),
                ('phone', 'fax'),
                'email',
                'content',
                'publish',
            )
        }),
        ('Фото', {
            'fields': (
                ('imgAdd', 'get_image'),
            )
        }),
    ]

    def publish_event(self, request, queryset):
        for obj in queryset:
            obj.publish = True
            obj.save()
        self.message_user(request, f'Выбранные контакты успешно опубликованы')

    publish_event.short_description = "Опубликовать выбранные контакты"

    def exclude_publish_event(self, request, queryset):
        for obj in queryset:
            obj.publish = False
            obj.save()
        self.message_user(request, f'Выбранные контакты успешно изъяты')

    exclude_publish_event.short_description = "Изъять выбранные контакты"


@admin.register(Achieves)
class AchievesAdmin(TranslationAdmin):
    list_display = ['title', 'description', 'get_image_com', 'get_image_award', 'publish']
    readonly_fields = ['get_image_com', 'get_image_award']
    ordering = ['id']
    actions = ['publish_event', 'exclude_publish_event']
    list_editable = ['publish']

    fieldsets = [
        (None, {
            'fields': (
                ('title', 'description'),
                'publish',
            )
        }),
        ('Фото команды', {
            'fields': (
                ('imgAdd', 'get_image_com'),
            )
        }),
        ('Фото награды', {
            'fields': (
                ('imgAdd_award', 'get_image_award'),
            )
        }),
    ]

    def get_image_com(self, obj):
        return mark_safe(f'<img src={obj.imgAdd.url} width="50" height="50" ')

    get_image_com.short_description = "Фото команды"

    def get_image_award(self, obj):
        return mark_safe(f'<img src={obj.imgAdd_award.url} width="50" height="50" ')

    get_image_award.short_description = "Фото приза"

    def publish_event(self, request, queryset):
        for obj in queryset:
            obj.publish = True
            obj.save()
        self.message_user(request, f'Выбранные слайды успешно опубликованы')

    publish_event.short_description = "Опубликовать выбранные слайды"

    def exclude_publish_event(self, request, queryset):
        for obj in queryset:
            obj.publish = False
            obj.save()
        self.message_user(request, f'Выбранные слайды успешно изъяты')

    exclude_publish_event.short_description = "Изъять выбранные слайды"


class PostAdminForm(forms.ModelForm):
    description_ru = forms.CharField(label="Описание", widget=CKEditorUploadingWidget())
    description_en = forms.CharField(label="Описание", widget=CKEditorUploadingWidget())

    class Meta:
        model = ObjectAddres
        fields = '__all__'


@admin.register(ObjectAddres)
class ObjectAddresAdmin(TranslationAdmin):
    list_display = ['address', 'phone', 'publish']
    ordering = ['address']
    actions = ['publish_event', 'exclude_publish_event']
    form = PostAdminForm

    fieldsets = [
        (None, {
            'fields': (
                ('address', 'data_map'),
            )
        }),
        ('Телефон', {
            'fields': (
                ('phone', 'publish'),
            )
        }),
        ('Описание', {
            'fields': (
                'description',
            )
        }),
    ]

    def publish_event(self, request, queryset):
        for obj in queryset:
            obj.publish = True
            obj.save()
        self.message_user(request, f'Выбранные контакты успешно размещены в footer')

    publish_event.short_description = "Разместить контакты в footer"

    def exclude_publish_event(self, request, queryset):
        for obj in queryset:
            obj.publish = False
            obj.save()
        self.message_user(request, f'Выбранные контакты успешно изъяты')

    exclude_publish_event.short_description = "Изъять выбранные контакты из footer"


class TimeListCoachInLine(admin.TabularInline):
    model = TimeListCoach
    extra = 1


@admin.register(Coach)
class CoachAdmin(admin.ModelAdmin):
    list_display = ['coach_surname', 'get_image', ]
    list_display_links = ['coach_surname']
    search_fields = ['^coach_surname']
    save_on_top = True
    inlines = [TimeListCoachInLine]
    readonly_fields = ["get_image"]
    fieldsets = (
        (None, {
            "fields": (('coach_name', 'coach_surname', 'coach_second_name'),)
        }),
        ("Изображение", {
            "fields": (('imgAdd', 'get_image',),)
        })
    )

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.imgAdd.url} width="50" height="50" ')

    get_image.short_description = "Фото"


class TimeListOrganizationInLine(admin.TabularInline):
    model = TimeListOrganization
    extra = 1


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ['get_image', 'short_name']
    list_display_links = ['short_name']
    readonly_fields = ["get_image"]
    search_fields = ['^short_name']
    save_on_top = True
    inlines = [TimeListOrganizationInLine]

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.imgAdd.url} width="50" height="50" ')

    get_image.short_description = "Фото"


class SliderViewsOfSportInLine(admin.StackedInline):
    model = SliderViewsOfSport
    extra = 1
    readonly_fields = ["get_image"]

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.imgAdd.url} width="50" height="50" ')

    get_image.short_description = "Фото"


@admin.register(ViewOfSport)
class ViewOfSportAdmin(TranslationAdmin):
    list_display = ['type_sport', 'content', 'rang']
    list_display_links = ['type_sport']
    readonly_fields = ["get_image"]
    inlines = [SliderViewsOfSportInLine]
    list_editable = ['rang']
    fieldsets = (
        (None, {
            "fields": ('rang', ('type_sport', 'content',),)
        }),
        ("Изображение", {
            "fields": (('imgAdd', 'get_image',),)
        })
    )

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.imgAdd.url} width="50" height="50" ')

    get_image.short_description = "Фото"


@admin.register(SliderViewsOfSport)
class SliderViewsOfSportAdmin(TranslationAdmin):
    list_display = ['type_sport', 'title', 'sign', 'left_block', 'bottom_block', 'rang', 'get_image']
    list_filter = ['type_sport']
    readonly_fields = ["get_image"]
    list_editable = ['rang']

    fieldsets = (
        (None, {
            "fields": ('type_sport',)
        }),
        ("Поля слайдера", {
            "fields": ('rang', ('title', 'left_block', 'sign', 'content', 'bottom_block'),)
        }),
        ("Изображение", {
            "fields": (('imgAdd', 'get_image',),)
        })
    )

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.imgAdd.url} width="50" height="50" ')

    get_image.short_description = "Фото"


class UserStaticFiles(admin.ModelAdmin):
    class Media:
        js = ('admin/user/js/user.js',
              '//use.fontawesome.com/releases/v5.15.3/js/all.js ',)
        css = {
            "all": ('admin/user/css/user.css',)
        }


class BadgesInLine(admin.StackedInline):
    model = BadgesTeamList
    extra = 0
    readonly_fields = ['get_logo']

    fieldsets = (
        (None, {
            "fields": (('name',), ('description',), ('logo', 'get_logo', 'color'))
        }),
        (None, {
            "fields": (('position', 'place', 'points',),)
        }),
        (None, {
            "fields": (('link_1', 'link_2'),)
        })
    )

    def get_logo(self, obj):
        return mark_safe(f'<div class="in-line" style="background: {obj.color}; padding: 5px; '
                         f'display: flex; justify-content: center">'
                         f'<img id="img-logo-{obj.id}" class="img-logo" style="object-fit: cover;"'
                         f' src={obj.logo.url} width="50" height="50">'
                         f'</div> ')

    get_logo.short_description = 'logo'


@admin.register(Badges)
class BadgesAdmin(UserStaticFiles):
    list_display = ['tournament', 'color', 'get_icon', 'get_number_participants', 'publish']
    list_editable = ['color', 'publish']
    inlines = [BadgesInLine]
    readonly_fields = ['get_icon', 'get_run_string']

    fieldsets = (
        ("Бэйдж турника", {
            "fields": (('tournament', 'color', 'publish'), ('fa_icon', 'get_icon'))
        }),
        ("Бегущая строка", {
            "fields": ('get_run_string', ('run_string', 'run_time',),)
        }),
        ("Заголовок Таблицы", {
            "fields": ('list_header',)
        })
    )

    def get_icon(self, obj):
        return mark_safe(f'<div id="change_color_class" style=" padding: 5px; display: flex; justify-content: center;'
                         f' width: 60px; align-items: center; font-size: 2rem" class="{obj.color}">'
                         f'<div style="background: white; border-radius: 50%;'
                         f'width: 50px; height: 50px; display: flex; justify-content: center;'
                         f' align-items: center;" >{obj.fa_icon}</div>'
                         f'</div>')

    get_icon.short_description = "Значок турнира"

    def get_number_participants(self, obj):
        return mark_safe(len(BadgesTeamList.objects.filter(turner=obj.id)))

    get_number_participants.short_description = "Кол-во уч."

    def get_run_string(self, obj):
        return mark_safe(
            f'<div class="marquee">'
            f'<span style="animation: marquee {obj.run_time}s infinite linear;">{obj.run_string}</span>'
            '</div>'
        )


@admin.register(BadgesTeamListHeader)
class BadgesTeamListHeaderAdmin(UserStaticFiles):
    list_display = ['header_name']
    readonly_fields = ['get_header_tab']

    fieldsets = (
        ("Шапка таблицы", {
            "fields": (('header_name', 'get_header_tab'), 'header_color')
        }),
        ("Колонки", {
            "fields": (('header_number_column', 'header_logo_column', 'header_name_column', 'header_points_column'),)
        }),
        ("Значок", {
            "fields": (('header_place_columnIcon', 'header_place_columnTxt'),)
        })
    )

    def get_header_tab(self, obj):
        return mark_safe("""
            <div class="tl__main_block tl__main_block-header" style="border-color: {0};
            box-shadow: 0 0.5rem 0.5rem {0};">
                <div class="tl__main_block-position" style="background: unset; 
                    border-radius: unset; border: unset;">{1}</div>
                <div class="tl__main_block-img">{2}</div>
                <div class="tl__main_block-text">{3}</div>
                <div style="background: center / contain no-repeat url({4})" class="tl__main_block-icon">{5}</div>
                <div class="tl__main_block-points">{6}</div>
            </div>
        """.format(
            obj.header_color,
            obj.header_number_column,
            obj.header_logo_column,
            obj.header_name_column,
            "" if obj.header_place_columnTxt != "" else obj.header_place_columnIcon.url,
            obj.header_place_columnTxt,
            obj.header_points_column,
        )
        )

    get_header_tab.short_description = "Заголовок"


class TeamInfoPlayersInline(admin.StackedInline):
    model = TeamInfoPlayers
    extra = 0
    readonly_fields = ['get_block_team', ]

    fieldsets = (
        (None, {
            "fields": ('get_block_team',)
        }),
        (None, {
            "fields": (('position', 'name', 'description', 'charInfo'),)
        }),
        (None, {
            "fields": (('link_1', 'link_2', ),)
        }),
        (None, {
            "fields": ('logo',)
        }),
    )

    def get_block_team(self, obj):
        return mark_safe(
            f'<div  data-key-player="" class ="ti__player-item" style="width: 391px;">'\
            f'<div class="ti__player-item--play number" '\
            f'style="background: {obj.team.color if obj.id is not None else "gray"}; '\
            f'margin-right: 5px;" > {obj.position} </div>'\
            f'<div style="background: center / cover no-repeat url({obj.logo.url})"'
            f' class ="ti__player-item--iconplayer" > </div>'\
            f'<div style="width: 100%; padding: 0 5px;" class ="ti__player-item--play-teamplayer">{obj.name}</div>'\
            f'<div class="ti__player-item--play-text" >{obj.description}</div>'
            '</div>'
        )

    get_block_team.short_description = ""


@admin.register(BadgesTeamList)
class BadgesTeamListAdmin(UserStaticFiles):
    list_display = ['name', 'turner', 'get_logo', 'position', 'points', 'place']
    list_editable = ['turner', 'position', 'points', 'place']
    inlines = [TeamInfoPlayersInline]
    list_filter = ['turner']
    readonly_fields = ['get_team_position']

    fieldsets = (
        (None, {
            "fields": (('turner', 'get_team_position'),)
        }),
        ("Данные команды", {
            "fields": (('name', 'color'), ('description', 'logo',))
        }),
        (None, {
            "fields": (('position', 'place', 'points',),)
        }),
        ("Ссылки", {
            "fields": (('link_1', 'link_2'),)
        })
    )

    def get_team_position(self, obj):
        return mark_safe(
            f'<div class="tl__main_block" style="border-color: {obj.color}">'
            f'<div class="tl__main_block-position">{obj.position}</div>'
            f'<div style="background: {obj.color} center / contain no-repeat url({obj.logo.url});" class="tl__main_block-img"></div>'
            f'<div style="background-color: white;" class="tl__main_block-text">{obj.name}</div>'
            f'<div style="color: {obj.color}; background: center / contain no-repeat url()" class="tl__main_block-icon number">{obj.place}</div>'
            f'<div style="background-color: white;" class="tl__main_block-points number">{obj.points}</div>'
            '</div>'
        )

    def get_logo(self, obj):
        return mark_safe(f'<div style="background: {obj.color}; padding: 5px; display: flex; justify-content: center">'
                         f'<img style="object-fit: cover;" src={obj.logo.url} width="50" height="50">'
                         f'</div> ')

    get_logo.short_description = 'logo'


@admin.register(TeamInfoGames)
class TeamInfoGamesAdmin(UserStaticFiles):
    list_display = ['turner', 'positionBT', 'badgesTeam', 'first_team_win',
                    'positionET', 'enemyTeam', 'second_team_win', 'stage', 'description']
    readonly_fields = ['choice_team', 'block_description', 'positionBT', 'positionET']
    list_filter = ['turner', 'badgesTeam', 'enemyTeam']
    list_editable = ['description', 'first_team_win', 'second_team_win']
    fieldsets = (
        (None, {
            "fields": (('turner', 'choice_team',),)
        }),
        (None, {
            "fields": (('badgesTeam', 'first_team_win',), ('enemyTeam', 'second_team_win',))
        }),
        (None, {
            "fields": ('stage', 'description', 'block_description',)
        }),
    )

    def choice_team(self, obj):

        img_path = '/media/handshake.png' if obj.first_team_win and obj.second_team_win else '/media/win.png' \
            if obj.first_team_win or obj.second_team_win else None
        position = 'left: 85%' if obj.first_team_win else 'left: -85%' if obj.second_team_win else None

        if obj.enemyTeam:
            text = f' <div class="ti__player-item--play">{obj.badgesTeam.name}</div>' \
                   f' <div style="background: center / contain no-repeat url(/media/vs.png); max-width:10%;" class="ti__player-item--icon"></div>' \
                   f'<div class="ti__player-item--play">{obj.enemyTeam.name}</div>' \
                   f'<div id="img-icon" style="background: center / contain no-repeat url({img_path});' \
                   f' position: absolute; bottom: 0; height: 65%; {position}" ' \
                   f'class="ti__player-item--icon"></div>'

        elif obj.stage:
            text = f' <div class="ti__player-item--play">{obj.stage}</div>'
        else:
            text = f' <div class="ti__player-item--play">Новый объект</div>'

        return mark_safe(
            f'<div id="badges-id" data-index-page="{obj.id}" class="ti__player">Игры (этапы):</div>'
            '<ul class="ti__player-list">'
            '<li data-key="1" class="ti__player-item" style="font-size: 1rem; width: 330px; '
            'position: relative; height: 26px;">'
            f'<div id="contentEnemy" > {text} </div>'
            f'<div class=" info">{obj.description}</div>'
            '</li>'
            '</ul>'
        )

    choice_team.short_description = ""

    def block_description(self, obj):
        return mark_safe(
            f'<div class="ti__player-item" style="width: 330px; height: 26px; color: white;">'
            f'<div style="opacity:1;" class="info">{obj.description}</div>'
            f'</div>'
        )

    block_description.short_description = ""

    def positionBT(self, obj):
        return mark_safe(
            f'<div class="tl__main_block-position">{obj.badgesTeam.position if obj.badgesTeam else "-"}</div>'
        )

    positionBT.short_description = "#"

    def positionET(self, obj):
        return mark_safe(
            f'<div class="tl__main_block-position">{obj.enemyTeam.position if obj.enemyTeam else "-"}</div>'
        )

    positionET.short_description = "#"


@admin.register(TeamInfoPlayers)
class TeamInfoPlayersAdmin(UserStaticFiles):
    list_display = ['get_team_turner', 'team', 'get_icon', 'position', 'name', 'charInfo']
    readonly_fields = ['get_icon', 'get_team_turner', 'get_block_team']
    list_filter = ['team', ]
    list_editable = ['position', 'name', 'charInfo', ]
    list_display_links = ['team']
    fieldsets = (
        (None, {
            "fields": ('get_block_team',)
        }),
        (None, {
            "fields": (('position', 'name', 'description', 'charInfo'),)
        }),
        (None, {
            "fields": (('link_1', 'link_2',),)
        }),
        (None, {
            "fields": ('logo',)
        }),
    )

    def get_icon(self, obj):
        return mark_safe(f'<div id="change_color_class" style=" padding: 5px; display: flex; justify-content: center;'\
                         f' width: 60px; align-items: center; font-size: 2rem" class="{obj.team.color}">'\
                         f'<div style="background: white; overflow: hidden;'\
                         f'width: 50px; height: 50px; display: flex; justify-content: center;'\
                         f' align-items: center;"><div style="background: center / cover no-repeat url({obj.logo.url});'
                         f'width: 80%; height: 80%;" class="ti__player-item--iconplayer"></div></div>'
                         f'</div>')
    get_icon.short_description = "Фото"

    def get_team_turner(self, obj):

        return mark_safe(f'<div id="label_turner">{ obj.team.turner if obj.id is not None else "Команда не выбрана"}</div>')
    get_team_turner.short_description = "Турнир"

    def get_block_team(self, obj):
        return mark_safe(
            f'<div  data-key-player="" class ="ti__player-item" style="width: 391px;">'\
                f'<div class="ti__player-item--play number" '\
                    f'style="background: {obj.team.color if obj.id is not None else "gray"}; '\
                    f'margin-right: 5px;" > {obj.position} </div>'\
                f'<div style="background: center / cover no-repeat url({obj.logo.url})"'
                    f' class ="ti__player-item--iconplayer" > </div>'\
                f'<div style="width: 100%; padding: 0 5px;" class ="ti__player-item--play-teamplayer">{obj.name}</div>'\
                f'<div class="ti__player-item--play-text" >{obj.description}</div>'
            '</div>'
        )
    get_block_team.short_description = ""


admin.site.register(TeamInfoGameStage)
admin.site.register(Group)
admin.site.site_title = "Сайт Партизанский ФОЦ"
admin.site.site_header = "Сайт Партизанский ФОЦ"
