from django.shortcuts import render
from django.views.generic.base import View
from django.db.models import Count
import pandas as pd

from django.http import HttpResponseRedirect, Http404
from django.urls import reverse
from django.http import HttpResponse
from .models import *


class PfocView(View):

    def get(self, request):

        viewOfSport = ViewOfSport.objects.all().order_by('rang')
        org_view = []
        coach_view = []
        slider_view = []
        address_view = []
        card_object = []
        price_object = []
        address_map = {
            "пер. Уральский, 9": "uralski",
            "ул. Ваупшасова, 46": "vaupshasova",
            "ул. Связистов, 6": "sviazistov",
            "ул. Столетова, 1": "stoletova",

        }

        for sport in viewOfSport:
            if sport.id:
                org_view.append(
                    TimeListOrganization.objects.filter(type_sport=sport.id)
                )
                coach_view.append(
                    TimeListCoach.objects.filter(type_sport=sport.id)
                )
                slider_view.append(
                    SliderViewsOfSport.objects.filter(type_sport=sport.id).order_by('rang')
                )
            map_key = []
            for key, value in address_map.items():
                try:
                    id_address = ObjectAddres.objects.filter(data_map=value).first().id
                    if TimeListCoach.objects.filter(type_sport=sport.id, address=id_address).values('address').count() > 0:
                        if address_map[key] not in map_key:
                            map_key.append(address_map[key])
                except AttributeError:
                    pass

            address_view.append(map_key)

        for key in CardsObject.objects.filter(publish=True):
            try:
                card_object.append(
                    CardsObject.objects.filter(obj=key)
                )
                price_object.append(
                    CardsPrices.objects.filter(obj=CardsObject.objects.filter(obj=key).first().obj.id).order_by('rang')
                )
            except AttributeError:
                pass

        return render(request, "homepage/index.html",
                      context={
                          'views_sport': viewOfSport,
                          'coach_view': coach_view,
                          'org_view': org_view,
                          'slider_view': slider_view,
                          'address_view': address_view,
                          'card_object': card_object,
                          'price_object': price_object,
                          'news': News.objects.filter(publish=True).order_by('rang')[:5],
                          'contact': Contact.objects.filter(publish=True),
                          'achieves': Achieves.objects.filter(publish=True),
                          'footer_contact': ObjectAddres.objects.filter(publish=True),
                        }
                      )
