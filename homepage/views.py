from django.shortcuts import render
from django.views.generic.base import View
from django.db.models import Q
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
                    if TimeListCoach.objects.filter(type_sport=sport.id,
                                                    address=id_address).values('address').count() > 0:
                        if address_map[key] not in map_key:
                            map_key.append(address_map[key])
                except AttributeError:
                    pass

            address_view.append(map_key)

        dict_length = {1: 12, 2: 6, 3: 4}
        len_card = len(CardsObject.objects.filter(publish=True))
        list_length = []

        for key in CardsObject.objects.filter(publish=True):

            if len_card <= 3 and len(list_length) == 0:
                k = dict_length[len_card]
            else:
                k = 4
                if len(list_length) < 3:
                    list_length.append(k)
                if len(list_length) == 3:
                    list_length = []

                len_card -= 1

            try:
                card_object.append({
                    'obj': CardsObject.objects.filter(obj=key),
                    'column': k
                })

                # price_object.append(
                #     CardsPrices.objects.filter(obj=CardsObject.objects.filter(obj=key).first().obj.id).order_by('rang')
                # )
            except AttributeError:
                pass

        return render(request, "homepage/index.html",
                      context={
                          'views_sport': viewOfSport,
                          'banners': Banners.objects.filter(publish=True)[:5],
                          'badges': Badges.objects.filter(publish=True),
                          # 'coach_view': coach_view,
                          # 'org_view': org_view,
                          # 'slider_view': slider_view,
                          # 'address_view': address_view,
                          'card_object': card_object,
                          'price_object': price_object,
                          'news': News.objects.filter(publish=True).order_by('rang')[:5],
                          'contact': Contact.objects.filter(publish=True),
                          'achieves': Achieves.objects.filter(publish=True),
                          'footer_contact': ObjectAddres.objects.filter(publish=True),
                      }
                      )


class ViewsOfSport(View):

    def get(self, request, num):

        viewOfSport = ViewOfSport.objects.filter(id=num)
        org_view = []
        coach_view = []
        slider_view = []
        address_view = []
        address_map = {
            "пер. Уральский, 9": "uralski",
            "ул. Ваупшасова, 46": "vaupshasova",
            "ул. Связистов, 6": "sviazistov",
            "ул. Столетова, 1": "stoletova",
        }

        if viewOfSport:
            org_view.append(
                TimeListOrganization.objects.filter(type_sport=num)
            )
            coach_view.append(
                TimeListCoach.objects.filter(type_sport=num)
            )
            slider_view.append(
                SliderViewsOfSport.objects.filter(type_sport=num).order_by('rang')
            )
        map_key = []
        for key, value in address_map.items():
            try:
                id_address = ObjectAddres.objects.filter(data_map=value).first().id
                if TimeListCoach.objects.filter(type_sport=num,
                                                address=id_address).values('address').count() > 0:
                    if address_map[key] not in map_key:
                        map_key.append(address_map[key])
            except AttributeError:
                pass

            address_view.append(map_key)

        return render(request, 'homepage/viewsOfSport_content.html',
                      context={
                          'views_sport': viewOfSport,
                          'coach_view': coach_view,
                          'org_view': org_view,
                          'slider_view': slider_view,
                          'address_view': address_view,
                      })


class PriceBlock(View):

    def get(self, request, num):
        card_object = []
        price_object = []

        try:
            card_object.append({
                'obj': CardsObject.objects.filter(obj_id=num),
            })
            price_object.append(
                CardsPrices.objects.filter(obj_id=num).order_by('rang')
            )
        except AttributeError:
            pass

        return render(request, 'homepage/priceBlock_content.html',
                      context={
                          'card_object': card_object,
                          'price_object': price_object,
                      })


class NewsContent(View):

    def get(self, request, num):
        return render(request, 'homepage/news/newsContent.html',
                      context={
                          'news': News.objects.filter(id=num).first()
                      })


class BadgesContent(View):

    def get(self, request, num):
        badge = Badges.objects.filter(id=num).first()
        return render(request, 'homepage/badges/tournamentList.html',
                      context={'badge': badge,
                               'badge_team': self.order(BadgesTeamList.objects.filter(turner=badge))
                               })

    def order(self, obj):
        return obj.order_by('place', 'position')


class TeamInfo(View):

    def get(self, request, num):
        team = BadgesTeamList.objects.filter(id=num).first()
        plays = TeamInfoGames.objects.filter(Q(badgesTeam_id=num) | Q(enemyTeam_id=num)).all()
        players = TeamInfoPlayers.objects.filter(team_id=num).all()
        return render(request, 'homepage/badges/tournament_info.html',
                      context={
                          'team': team,
                          'plays': plays,
                          'players': players,
                      })


class TeamInfoGamesList(View):
    """
    запрос при изменении турнира в таблице игр admin панели
    возвращает список команд (Команда (игрок)) участвующих в турнире
    из таблицы BadgesTeamList (Список турниров)
    """

    def get(self, request, num):

        currentId = None
        dict_var = dict(x.split('=') for x in request.get_full_path().split('?')[1].split('&') if x != "")
        # data request: first_id_select, second_id_select, stage if value doesn't blank
        dict_value_request = {k: int(v) for k, v in dict_var.items() if v != ""}
        # teamList - select all team (participant of turner) by id (from request <int:num>) turner
        team_list = BadgesTeamList.objects.filter(turner_id=num).all()
        # teamInfo - select all register team to the plays or stage
        team_info = TeamInfoGames.objects.filter(turner_id=num).all()

        def get_currentId(selector):
            if dict_value_request.get(selector):
                return team_list.filter(id=dict_value_request.get(selector)).first()
            return None

        if dict_value_request.get('stage'):
            currentId = get_currentId('first_id_select')
            # list participant don't register to the plays or stage
            # list_not_team = [x for x in team_list if not team_info.filter(badgesTeam_id=x.id)]
            return render(request, 'homepage/badges/team_enemy.html',
                          context={
                              'data_list': team_list,
                              'currentId': currentId,
                          })

        dict_team = {t.id: len(team_info.filter(Q(badgesTeam_id=t.id) | Q(enemyTeam_id=t.id)).all())
                     for t in team_list if len(team_info.filter(Q(badgesTeam_id=t.id) |
                                                                Q(enemyTeam_id=t.id)).all()) < len(team_list)}

        if dict_value_request.get('second_id_select'):
            currentId = get_currentId('second_id_select')
            dict_team.pop(currentId.id)

        if dict_var.get('first_id_select'):
            dict_team.pop(int(dict_var.get('first_id_select')))

        return render(request, 'homepage/badges/team_enemy.html',
                      context={
                          'data_list': team_list.filter(id__in=dict_team.keys()),  # .exclude(id__in=exclude_list),
                          'currentId': currentId,
                      })


class TurnerGroup(View):
    """
    Sort command by turner and render html with tags ("optgroup", "option")
    """

    def get(self, request, num):
        data = {k.tournament: BadgesTeamList.objects.filter(turner_id=k.id)
                for k in Badges.objects.all().order_by('-id')}
        return render(request, 'homepage/badges/team_group.html',
                      context={
                          'data_list': data,
                          'select_num': BadgesTeamList.objects.filter(id=int(num)).first() if num > 0 else None,
                      })


class PlayerInfo(View):
    """
    Choice data player
    """

    def get(self, request, num):
        return render(request, 'homepage/badges/player_info.html',
                      context={
                          'player': TeamInfoPlayers.objects.filter(id=num).first(),
                      })


class RulesInfoAll(View):

    def get(self, request):
        return render(request, 'homepage/rules/rulesContent.html',
                      context={
                          'rules': Rules.objects.filter(publish=True).all().order_by('position')
                      })


class RulesInfo(View):

    def get(self, request, num):

        if num > 0:
            rule = Rules.objects.filter(id=num).first()
        else:
            rule = Rules.objects.filter(position=1).first()

        return render(request, 'homepage/rules/ruleText.html',
                      context={
                          'rule': rule
                      })

