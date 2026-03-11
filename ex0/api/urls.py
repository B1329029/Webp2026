from django.urls import path
from .views import hello_cgu

urlpatterns = [
    path('hello/', hello_cgu),
]