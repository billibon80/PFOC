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


admin.site.register(ViewOfSport)
admin.site.register(Coach)
admin.site.register(Organization)
admin.site.register(TimeListCoach)
admin.site.register(TimeListOrganization)
admin.site.register(ObjectAddres)
admin.site.register(Group)
admin.site.register(SliderViewsOfSport)
admin.site.register(CardsObject)
# admin.site.register(CardsPrices, PriceAdmin)
