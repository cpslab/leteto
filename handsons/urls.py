from django.urls import path
from .views import HandsonList

urlpatterns = [
    path('', HandsonList.as_view()),
]

