from django.shortcuts import render
from django.db.models import Count
import pandas as pd

from django.http import HttpResponseRedirect, Http404
from django.urls import reverse
from django.http import HttpResponse
from .models import ViewOfSport, TimeListCoach, TimeListOrganization, SliderViewsOfSport, ObjectAddres,\
                    CardsObject, CardsPrices


def index(request):

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

    for sport in ViewOfSport.objects.all():
        org_view.append(
            TimeListOrganization.objects.filter(type_sport=sport.id)
        )
        coach_view.append(
            TimeListCoach.objects.filter(type_sport=sport.id)
        )
        slider_view.append(
            SliderViewsOfSport.objects.filter(type_sport=sport.id)
        )
        map_key = []
        for key in address_map.keys():
            id_address = ObjectAddres.objects.filter(address=key).first().id
            if TimeListCoach.objects.filter(type_sport=sport.id, address=id_address).values('address').count() > 0:
                if address_map[key] not in map_key:
                    map_key.append(address_map[key])
        address_view.append(map_key)

    for key in address_map.keys():
        id_obj = ObjectAddres.objects.filter(address=key).first().id
        card_object.append(
            CardsObject.objects.filter(obj=id_obj)
        )
        price_object.append(
            CardsPrices.objects.filter(obj=id_obj)
        )
    print(price_object)
    return render(request, "homepage/index.html",
                  context={
                      'views_sport': ViewOfSport.objects.all(),
                      'coach_view': coach_view,
                      'org_view': org_view,
                      'slider_view': slider_view,
                      'address_view': address_view,
                      'card_object': card_object,
                      'price_object': price_object,
                    }
                  )
