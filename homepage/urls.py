from django.urls import path
from . import views
from django.conf.urls import url

# app_name = "homepage"

urlpatterns = [
    path('', views.PfocView.as_view()),
    path('views_of_sport/<int:num>', views.ViewsOfSport.as_view())

]
