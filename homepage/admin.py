from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import *
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django import forms
from modeltranslation.admin import TranslationAdmin


class PostAdminForm(forms.ModelForm):
    description_ru = forms.CharField(label="Описание", widget=CKEditorUploadingWidget())
    description_en = forms.CharField(label="Описание", widget=CKEditorUploadingWidget())

    class Meta:
        model = ObjectAddres
        fields = '__all__'


@admin.register(CardsPrices)
class PriceAdmin(TranslationAdmin):
    list_display = ['title', 'obj', 'get_image', 'description', 'price_f', 'price_l', 'publish']
    search_fields = ['^title']
    list_filter = ['title', 'obj']
    ordering = ['obj']
    actions = ['duplicate_event']
    save_as = True
    save_on_top = True
    readonly_fields = ['get_image']
    list_editable = ['publish']

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.imgAdd.url} width="50" height="50" ')

    get_image.short_description = "Фото"

    fieldsets = (
        (None, {
            'fields': (('obj', 'title'), 'description')
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
        ('None', {
            'fields': (
                ('publish'),
            )
        })
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


@admin.register(News)
class NewsAdmin(TranslationAdmin):
    list_display = ['title', 'get_image', 'front_title', 'publish']
    list_filter = ['publish']
    ordering = ['-publish', '-id']
    actions = ['publish_event', 'exclude_publish_event']
    list_editable = ['publish']
    save_as = True
    readonly_fields = ['get_image']

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.imgAdd.url} width="50" height="50" ')

    get_image.short_description = "Фото"

    fieldsets = [
        (None, {
            'fields': (
                ('title', 'front_title'),
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


@admin.register(ViewOfSport)
class ViewOfSportAdmin(TranslationAdmin):
    list_display = ['type_sport', 'content']
    list_display_links = ['type_sport']
    readonly_fields = ["get_image"]
    inlines = [SliderViewsOfSportInLine]
    fieldsets = (
        (None, {
            "fields": (('type_sport', 'content', ),)
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
    list_display = ['type_sport', 'title', 'get_image']
    readonly_fields = ["get_image"]

    fieldsets = (
        (None, {
            "fields": ('type_sport', )
        }),
        ("Поля для перевода", {
            "fields": (('title', 'left_block', 'sign', 'content', 'bottom_block'),)
        }),
        ("Изображение", {
            "fields": (('imgAdd', 'get_image',),)
        })
    )

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.imgAdd.url} width="50" height="50" ')

    get_image.short_description = "Фото"


admin.site.register(Group)

admin.site.site_title = "Сайт Партизанский ФОЦ"
admin.site.site_header = "Сайт Партизанский ФОЦ"
