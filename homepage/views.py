from django.shortcuts import render
from django.http import HttpResponseRedirect, Http404
from django.urls import reverse
from django.http import HttpResponse


def index(request):

    return render(request, "homepage/index.html")
