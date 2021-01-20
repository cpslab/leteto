from django.urls import path
from .views import *

urlpatterns = [
    path('', HandsonList.as_view()),
]

