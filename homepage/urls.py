from django.urls import path
from . import views
from django.conf.urls import url

app_name = "homepage"

urlpatterns = [
    path('', views.index, name='index'),
    path("home/", views.index, name="home"),
    url(r'^books/$', views.BookListView.as_view(), name='books'),
    url(r'^book/(?P<pk>\d+)$', views.BookDetailView.as_view(), name='book-detail'),
    url(r'^author/(?P<pk>\d+)$', views.AuthorDetailView.as_view(), name='author-detail'),
    url(r'^authors/$', views.AuthorListView.as_view(), name='authors'),
]
