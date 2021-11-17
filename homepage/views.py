from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.
from django.views.generic import UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin

def home(request):
    return render(request, "homepage/index.html")

