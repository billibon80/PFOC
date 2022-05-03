from django.urls import path
from . import views
from django.conf.urls import url

# app_name = "homepage"

urlpatterns = [
    path('', views.PfocView.as_view()),
    path('views_of_sport/<int:num>', views.ViewsOfSport.as_view()),
    path('priceBlock_content/<int:num>', views.PriceBlock.as_view()),
    path('news_content/<int:num>', views.NewsContent.as_view()),
    path('badges/<int:num>', views.BadgesContent.as_view()),
    path('team_info/<int:num>', views.TeamInfo.as_view()),
    path('team_enemy/<int:num>', views.TeamInfoGamesList.as_view()),
    path('turner_group/<int:num>', views.TurnerGroup.as_view()),
]
