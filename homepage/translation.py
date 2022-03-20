from modeltranslation.translator import register, TranslationOptions
from .models import  *


@register(News)
class NewsTranslationOption(TranslationOptions):
    fields = ('front_title', 'title', 'content')


@register(Achieves)
class AchievesTranslationOption(TranslationOptions):
    fields = ('title', 'description',)


@register(CardsPrices)
class CardsPricesTranslationOption(TranslationOptions):
    fields = ('title', 'description', 'price_f_color', 'price_l_color')


@register(ObjectAddres)
class ObjectAddresTranslationOption(TranslationOptions):
    fields = ('address', 'description')


@register(CardsObject)
class CardsObjectTranslationOption(TranslationOptions):
    fields = ('front_title', 'front_text', 'inside_title', 'inside_text', 't_work_wd',
              't_work_wh', 't_work_hd', 't_work_hh')


@register(SliderViewsOfSport)
class SliderViewsOfSportTranslationOption(TranslationOptions):
    fields = ('left_block', 'title', 'sign', 'content', 'bottom_block')


@register(ViewOfSport)
class ViesOfSportTranslationOption(TranslationOptions):
    fields = ('type_sport', 'content')


@register(Contact)
class ContactTranslationOption(TranslationOptions):
    fields = ('position', 'name', 'content')
