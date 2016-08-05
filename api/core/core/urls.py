from django.conf.urls import patterns, include, url

from django.contrib import admin
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from navori import views
from navori.views import NavoriService

admin.autodiscover()

nav = NavoriService()
urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'core.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^navori/$', views.checkNavori),
    url(r'^navori/login/$', nav.login),
    url(r'^navori/getPlayers/$', nav.getPlayers),
    url(r'^navori/getPlaylist/$', nav.getPlaylist),
    url(r'^navori/getPlaylistComponent/$', nav.getPlaylistComponent),
    url(r'^navori/getMedia/$', nav.getMedia),
    url(r'^navori/getFolder/$', nav.getFolder),
    url(r'^navori/getTemplate/$', nav.getTemplate),
    url(r'^navori/getGroup/$', nav.getGroup),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
)
