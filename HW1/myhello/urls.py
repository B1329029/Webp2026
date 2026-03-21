from django.urls import path
from . import views

urlpatterns = [
    path('courselist', views.courselist),
    path('addcourse', views.addcourse),
]