from django.contrib import admin
from .models import *


@admin.register(CardsPrices)
class PriceAdmin(admin.ModelAdmin):
    list_display = ['title', 'obj', 'description', 'price_f', 'price_l']
    list_filter = ['title', 'obj']
    ordering = ['obj']
    actions = ['duplicate_event']

    fieldsets = (
        (None, {
            'fields': (('obj', 'title'), 'description')
        }),
        ('Полная стоимость', {
            'fields': (
                'price_f_color',
                ('price_f', 'price_f_label'),
                ('price_f_2', 'price_f_label_2'),
                ('price_f_3', 'price_f_label_3'),
                ('price_f_4', 'price_f_label_4'),
            )
        }),
        ('Льготная стоимость', {
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
                ('imgAdd', 'imgChoice'),
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
class CardsObjectAdmin(admin.ModelAdmin):
    list_display = ['obj', 't_work_wd', 't_work_wh', 't_work_hd', 't_work_hh']
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
                ('imgAdd', 'imgChoice'),
            )
        }),
        ('Время работы', {
            'fields': (
                ('t_work_wd', 't_work_wh'),
                ('t_work_hd', 't_work_hh'),
            )
        }),
    )


@admin.register(TimeListCoach)
class TimeListCoachAdmin(admin.ModelAdmin):
    list_display = ['coach', 'd_week', 'type_sport', 'group', 'time_list', 'address']
    list_filter = ['coach', 'group', 'type_sport']
    ordering = ['coach']
    actions = ['duplicate_event']

    fieldsets = (
        (None, {
            'fields': (('coach', 'type_sport'), 'group')
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
class NewsAdmin(admin.ModelAdmin):
    list_display = ['title', 'id', 'front_title', 'publish']
    list_filter = ['publish']
    ordering = ['-publish', '-id']
    actions = ['publish_event', 'exclude_publish_event']

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
                ('imgAdd', 'imgChoice'),
            )
        }),
    ]

    def publish_event(self, request, queryset):
        for obj in queryset:
            obj.publish = True
            obj.save()
        self.message_user(request, f'Выбранные статьи успешно опубликованы')

    publish_event.short_description = "Опубликовать выбранные статьи"

    def exclude_publish_event(self, request, queryset):
        for obj in queryset:
            obj.publish = False
            obj.save()
        self.message_user(request, f'Выбранные статьи успешно изъяты')

    exclude_publish_event.short_description = "Изъять выбранные статьи"


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['name', 'position', 'phone', 'fax',
                    'email', 'content', 'publish']
    ordering = ['name']
    actions = ['publish_event', 'exclude_publish_event']

    fieldsets = [
        (None, {
            'fields': (
                ('name', 'position'),
                ('phone', 'fax'),
                'email',
                'content',
                'publish',
            )
        }),
        ('Фото', {
            'fields': (
                ('imgAdd', 'imgChoice'),
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


admin.site.register(ViewOfSport)
admin.site.register(Coach)
admin.site.register(Organization)
admin.site.register(ObjectAddres)
admin.site.register(Group)
admin.site.register(SliderViewsOfSport)

