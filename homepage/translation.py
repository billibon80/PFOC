from modeltranslation.translator import register, TranslationOptions
from .models import  *


@register(News)
class NewsTranslationOption(TranslationOptions):
    fields = ('front_title', 'title', 'content')