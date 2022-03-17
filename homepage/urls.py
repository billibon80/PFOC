from django.urls import path
from . import views
from django.conf.urls import url

# app_name = "homepage"

urlpatterns = [
    path('', views.PfocView.as_view()),

]
