from django.shortcuts import render
from django.db.models import Count
import pandas as pd

from django.http import HttpResponseRedirect, Http404
from django.urls import reverse
from django.http import HttpResponse
from .models import ViewOfSport, TimeListCoach, TimeListOrganization, SliderViewsOfSport, ObjectAddres


def index(request):

    org_view = []
    coach_view = []
    slider_view = []
    address_view = []
    address_map = {
        "пер. Уральский, 9": "uralski",
        "ул. Связистов, 6": "sviazistov",
        "ул. Столетова, 1": "stoletova",
        "ул. Ваупшасова, 46": "vaupshasova"
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
            if TimeListCoach.objects.filter(type_sport=sport.id, address=ObjectAddres.objects
                                            .filter(address=key).first().id).values('address').count() > 0:
                if address_map[key] not in map_key:
                    map_key.append(address_map[key])
        address_view.append(map_key)

    return render(request, "homepage/index.html",
                  context={
                      'views_sport': ViewOfSport.objects.all(),
                      'coach_view': coach_view,
                      'org_view': org_view,
                      'slider_view': slider_view,
                      'address_view': address_view,
                    }
                  )
